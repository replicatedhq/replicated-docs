# Tutorial: Adding Database Configuration Options

In this tutorial, we'll explore ways to give your end user the option to either embed a database instance with the application, or connect your application to an external database instance that they will manage.
We'll use a PostgreSQL database as an example, configuring an example app to connect.

This tutorial explores advanced topics like workload coordination, credential management, and refactoring your application's user-facing configuration in the Replicated admin console. We'll also review best practices for integrating persistent stores like databases, queues, and caches.

It is split into 5 sections:

- [The Example Application](#the-example-application)
- [User-Facing Configuration](#user-facing-configuration)
- [Embedding a Database](#embedding-a-database)
- [Connecting to an External Database](#connecting-to-an-external-database)

### Prerequisites

This guide assumes you have:

* A running instance of the Replicated admin console (`kotsadm`) to iterate against in either an existing cluster or a Replicated Kubernetes installer-created cluster. If you do not have a running instance of the admin console on an existing or Kubernetes installer cluster, complete one of the following getting started tutorials to package and install a sample application:
   * [UI Tutorial](tutorial-ui-setup)
   * [CLI Tutorial](tutorial-cli-setup)
* A local git checkout of your application manifests.

### Accompanying Code Examples

A full example of the code for this guide can be found in the [kotsapps repository](https://github.com/replicatedhq/kotsapps/tree/master/postgres-snapshots).

* * *

## The Example Application

For demonstration purposes, we'll use a simple app that connects to a Postgres database via the `psql` CLI.
Once you've finished this guide, you should feel confident replacing it with any Kubernetes workload(s) that need to connect to a database.
The deployment we'll use can be seen below:

```yaml
# pg-consumer.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pg-consumer
spec:
  selector:
    matchLabels:
      app: pg-consumer
  template:
    metadata:
      labels:
        app: pg-consumer
    spec:
      containers:
        - name: pg-consumer
          image: postgres:10
          # connect to the database every 20 seconds
          command:
            - /bin/sh
            - -ec
            - |
              while :; do
                 sleep 20
                 PGPASSWORD=${DB_PASSWORD} \
                 psql --host ${DB_HOST} \
                      --port ${DB_PORT} \
                      --user ${DB_USER} \
                      --dbname ${DB_NAME} \
                      --command 'SELECT NOW()'
              done
          # hard coded for now, we'll wire these up later
          env:
            - name: DB_HOST
              value: postgres
            - name: DB_PORT
              value: "5432"
            - name: DB_USER
              value: postgres
            - name: DB_PASSWORD
              value: postgres
            - name: DB_NAME
              value: postgres
```

This app simply connects to the database every 20 seconds and writes the server timestamp to stdout.
Even though `psql` supports [default environment variables](https://www.postgresql.org/docs/current/libpq-envars.html) for host, username, etc that can be read transparently, we're intentionally using these generic `DB_` variables for clarity.
Later, you can change these environment variable names to whatever format your application consumes.

For now we'll hard code the DB variable values, in the next sections we'll wire these up to the user-provided configuration.


### Deploying the example application

 Once you've added this deployment to you application's `manifests` directory, create a release by running `replicated release create --auto` locally.
 Then head to the admin console instance and click **Check for Updates** on the Version History tab to pull the new release:

![View Update](/images/guides/kots/view-update.png)

Click **Deploy**. You should be able to review the logs and see `deployment.apps/pg-consumer created` in `applyStdout`:


![Deployed PG Consumer](/images/guides/kots/pg-consumer-deployed.png)


After it is deployed, you can run `kubectl get pods` to inspect the cluster.
We should expect the Pod to be crashlooping at this point, since there's no database to connect to just yet:

```text
$ kubectl get pod
NAME                               READY   STATUS             RESTARTS   AGE
kotsadm-5bbf54df86-p7kqg           1/1     Running            0          12m
kotsadm-api-cbccb97ff-b6qxp        1/1     Running            2          12m
kotsadm-minio-0                    1/1     Running            0          12m
kotsadm-operator-84477b5c4-tplcp   1/1     Running            0          12m
kotsadm-postgres-0                 1/1     Running            0          12m
pg-consumer-75f49bfb69-mljr6       0/1     CrashLoopBackOff   1          10s
```

Checking the logs, we should see a connect error:

```text
$ kubectl logs -l app=pg-consumer
psql: could not translate host name "postgres" to address: Name or service not known
```

If the `kubectl logs` command hangs, you can try using the `--previous` flag to fetch the logs of the most recent crash:


```text
$ kubectl logs -l app=pg-consumer --previous
psql: could not translate host name "postgres" to address: Name or service not known
```

Now that our test app is deployed, we'll walk through presenting options to the end user for connecting a Postgres instance to this app.

* * *

## User-Facing Configuration

The core of this guide will be around how to give your end users the option to do one of the following actions:

* Bring their own PostgreSQL instance for your app to connect to
* Use an "embedded" database bundled in with the application

The first step here is to present that option to the user, then we'll walk through implementing each scenario in the app manager.
The `kots.io/v1beta1` `Config` resource controls what configuration options are presented to the end user.
If you followed one of the "Getting Started" guides, you probably have a `config.yaml` in your manifests that looks something like the following YAML file:

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
    - name: example_settings
      title: My Example Config
      description: Configuration to serve as an example for creating your own. See [https://kots.io/reference/v1beta1/config/](https://kots.io/reference/v1beta1/config/) for configuration docs. In this case, we provide example fields for configuring an Ingress object.
      items:
        - name: use_ingress
          title: Use Ingress?
          help_text: An example field to toggle inclusion of an Ingress Object
          type: bool
          default: "0"
        - name: ingress_hostname
          title: Ingress Hostname
          help_text: If desired, enter the hostname for ingress to this application. You can enter the IP of this instance, or a DNS hostname.
          type: text
          when: repl{{ ConfigOptionEquals "use_ingress" "1" }}
```

To add a database section, we'll modify it to include some database settings.
In this case we'll remove the Ingress toggle that is included as an example, although you might also choose to leave this in. None of these database settings will have any effect yet, but we'll still be able to preview what the end user will see.
Modify your YAML to include this database section:

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
    - name: database
      title: Database
      items:
        - name: postgres_type
          help_text: Would you like to use an embedded postgres instance, or connect to an external instance that you manage?
          type: select_one
          title: Postgres
          default: embedded_postgres
          items:
            - name: embedded_postgres
              title: Embedded Postgres
            - name: external_postgres
              title: External Postgres
        - name: embedded_postgres_password
          hidden: true
          type: password
          value: "{{repl RandomString 32}}"
```

This creates a toggle to allow the user to choose between an embedded or external Postgres instance, and a `hidden` field to generate a unique password for the embedded instance.

As mentioned in the introduction, a full example of the code for this guide can be found in the [kotsapps repository](https://github.com/replicatedhq/kotsapps/tree/master/postgres-snapshots).


### Validating Config Changes

Even though the options aren't wired, let's create a new release to validate the configuration screen was modified.
Create a release by pushing a commit to your [ci-enabled repo](tutorial-ci-cd-integration) or by running `replicated release create --auto` locally.
Then head to the admin console instance and click **Check for Updates** on the Version History tab to pull the new release:

![View Update](/images/guides/kots/view-update.png)

After the update is deployed, click the Config tab and review our new toggle.
You might also notice that we've removed the Ingress settings to simplify things for this guide:

![Database Config](/images/guides/kots/database-config.png)

Now that we have the configuration screen started, we can proceed to implement the "Embedded Postgres" option.

* * *

## Embedding a Database

To implement the embedded Database option, we'll add a Kubernetes [Statefulset](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), and use the [annotations for optional resources](packaging-include-resources/) to control when it will be included in the application.

### Adding the Secret and StatefulSet

First, we'll create a secret to store the root password for our embedded postgres instance:

```yaml
# postgres-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgres
data:
  DB_PASSWORD: '{{repl ConfigOption "embedded_postgres_password" | Base64Encode }}'
```

Next, create a new YAML file in your `manifests` directory with the following contents.
Note the use of `kots.io/when` to only conditionally include this based on end-user inputs:

```yaml
# postgres-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  labels:
    app: pg-provider
  annotations:
    kots.io/when: '{{repl ConfigOptionEquals "postgres_type" "embedded_postgres" }}'
spec:
  replicas: 1
  selector:
    matchLabels:
      app: pg-provider
  serviceName: postgres
  template:
    metadata:
      labels:
        app: pg-provider
    spec:
      containers:
      - env:
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        # create a db called "postgres"
        - name: POSTGRES_DB
          value: postgres
        # create admin user with name "postgres"
        - name: POSTGRES_USER
          value: postgres
        # use admin password from secret
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              key: DB_PASSWORD
              name: postgres
        image: postgres:10
        name: postgres
        volumeMounts:
        - mountPath: /var/lib/postgresql/data
          name: pgdata
      volumes:
      - name: pgdata
        persistentVolumeClaim:
          claimName: pgdata
  volumeClaimTemplates:
  - metadata:
      name: pgdata
    spec:
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
```

Finally, lets add a Service object so we can route traffic to our postgres instance, again using `kots.io/when` to conditionally include this resource:


```yaml
# postgres-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    app: pg-provider
  annotations:
    kots.io/when: '{{repl ConfigOptionEquals "postgres_type" "embedded_postgres" }}'
spec:
  ports:
  - port: 5432
  selector:
    app: pg-provider
  type: ClusterIP
```

### Validating the embedded Database

After you've added these resources, you can push a new release and update in the admin console.
You should see the following in the deployment logs:

![Embedded PG Deployed](/images/guides/kots/embedded-pg-deployed.png)

We should now see an instance of Postgres running in our namespace as well.
The consumer may still be crashlooping, but we can see the error is different now:

```text
$ kubectl logs -l app=pg-consumer
psql: FATAL:  password authentication failed for user "postgres"
```

This is because we still need to deliver the generated password to our workload pod.
In `pg-consumer.yaml`, we'll remove this section:

```yaml
            - name: DB_PASSWORD
              value: postgres
```

and replace it with:

```yaml
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_PASSWORD
```

The full Deployment should now look like the following YAML file:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pg-consumer
spec:
  selector:
    matchLabels:
      app: pg-consumer
  template:
    metadata:
      labels:
        app: pg-consumer
    spec:
      containers:
        - name: pg-consumer
          image: 'postgres:10'
          # connect to the database every 20 seconds
          command:
            - /bin/sh
            - -ec
            - |
              while :; do
                 sleep 20
                 PGPASSWORD=${DB_PASSWORD} \
                 psql --host ${DB_HOST} \
                      --port ${DB_PORT} \
                      --user ${DB_USER} \
                      --dbname ${DB_NAME} \
                      --command 'SELECT NOW()'
              done
          # hard coded for now, we'll wire these up later
          env:
            - name: DB_HOST
              value: postgres
            - name: DB_PORT
              value: "5432"
            - name: DB_USER
              value: postgres
            - name: DB_NAME
              value: postgres
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_PASSWORD
```

From here, make another release and deploy it.
You should see the consumer pod is now able to connect to the database:


```text
$ kubectl get pod
NAME                               READY   STATUS    RESTARTS   AGE
kotsadm-5bbf54df86-p7kqg           1/1     Running   0          144m
kotsadm-api-cbccb97ff-b6qxp        1/1     Running   2          144m
kotsadm-minio-0                    1/1     Running   0          144m
kotsadm-operator-84477b5c4-tplcp   1/1     Running   0          144m
kotsadm-postgres-0                 1/1     Running   0          144m
pg-consumer-77b868d7d8-xdn9v       1/1     Running   0          20s
postgres-0                         1/1     Running   0          6m22s
```

Checking the logs, we can connect now:

```text
$ kubectl logs -l app=pg-consumer
              now
-------------------------------
 2020-04-12 17:11:45.019293+00
(1 row)

              now
-------------------------------
 2020-04-12 17:11:55.072041+00
(1 row)
```

Now that we've configured our application to read from an embedded postgres instance, we'll switch to allowing the end user to provide their own database connection parameters.

* * *

## Connecting to an External Database

In this section, we'll expand our configuration section to allow end users to bring their own Postgres instance.

### Modifying the Config Screen

Let's update our config screen to allow an end user to input some details about their database.
We'll add the following YAML, noting the use of the `when` field to conditionally hide or show fields in the user-facing config screen:

```yaml
        - name: external_postgres_host
          title: Postgres Host
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          default: postgres
        - name: external_postgres_port
          title: Postgres Port
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          default: "5432"
        - name: external_postgres_user
          title: Postgres Username
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          required: true
        - name: external_postgres_password
          title: Postgres Password
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: password
          required: true
        - name: external_postgres_db
          title: Postgres Database
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          default: sentry
```

Your full configuration screen should now look something like the following YAMl file:

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
    - name: database
      title: Database
      items:
        - name: postgres_type
          help_text: Would you like to use an embedded postgres instance, or connect to an external instance that you manage?
          type: select_one
          title: Postgres
          default: embedded_postgres
          items:
            - name: embedded_postgres
              title: Embedded Postgres
            - name: external_postgres
              title: External Postgres
        - name: embedded_postgres_password
          hidden: true
          type: password
          value: "{{repl RandomString 32}}"
        - name: external_postgres_host
          title: Postgres Host
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          default: postgres
        - name: external_postgres_port
          title: Postgres Port
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          default: "5432"
        - name: external_postgres_user
          title: Postgres Username
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          required: true
        - name: external_postgres_password
          title: Postgres Password
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: password
          required: true
        - name: external_postgres_db
          title: Postgres Database
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
          type: text
          default: postgres
```

Let's save this and create a new release. After deploying the release in the admin console, click **Config** and set the toggle to "External Postgres" to see the new fields:

In order to demonstrate that these are working, let's add some values that we know won't work, and just check to confirm that checking "External Postgres" will remove our embedded postgres instance:


![External PG Config Fake](/images/guides/kots/external-pg-config-fake.png)

Save these settings, and then you'll be directed back to the Version History page to apply the change:

![Deploy Config Change](/images/guides/kots/deploy-config-change.png)

after this is deployed, we should see that the postgres statefulset has been removed, and that our sample application is back to failing:


```text
$ kubectl get pod
NAME                               READY   STATUS    RESTARTS   AGE
kotsadm-5bbf54df86-8ws98           1/1     Running   0          12m
kotsadm-api-cbccb97ff-r7mz6        1/1     Running   2          12m
kotsadm-minio-0                    1/1     Running   0          12m
kotsadm-operator-84477b5c4-4gmbm   1/1     Running   0          12m
kotsadm-postgres-0                 1/1     Running   0          12m
pg-consumer-6bd78594d-n7nmw        0/1     Error     2          29s
```

You'll note that it is failing, but it is still using our hardcoded environment variables, not the user-entered config.
In the next step, we'll wire the end-user configuration values into our service.

```text
$ kubectl logs -l app=pg-consumer
psql: could not translate host name "postgres" to address: Name or service not known
```

### Mapping User Inputs

To map the user-supplied configuration, we'll start by expanding our secret we created before, adding fields for additional variables, using `{{repl if ... }}` blocks to switch between embedded/external contexts.

To start, you can add a field for hostname, using Base64Encode. You must use a single line, as shown in the following example.



```yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgres
data:
  DB_PASSWORD: '{{repl ConfigOption "embedded_postgres_password" | Base64Encode }}'
  DB_HOST:
    {{repl if ConfigOptionEquals "postgres_type" "embedded_postgres" }}{{repl Base64Encode "postgres" }}{{repl else}}{{repl ConfigOption"external_postgres_host" | Base64Encode }}{{repl end}}
```

Now that we have the value in our Secret, we can modify our deployment to consume it.
Replace this text:

```yaml
            - name: DB_HOST
              value: postgres
```

with this text:

```yaml
            - name: DB_HOST
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_HOST
```

Your full deployment should look something like the following YAML file:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pg-consumer
spec:
  selector:
    matchLabels:
      app: pg-consumer
  template:
    metadata:
      labels:
        app: pg-consumer
    spec:
      containers:
        - name: pg-consumer
          image: 'postgres:10'
          # connect to the database every 20 seconds
          command:
            - /bin/sh
            - -ec
            - |
              while :; do
                 sleep 20
                 PGPASSWORD=${DB_PASSWORD} \
                 psql --host ${DB_HOST} \
                      --port ${DB_PORT} \
                      --user ${DB_USER} \
                      --dbname ${DB_NAME} \
                      --command 'SELECT NOW()'
              done
          env:
            - name: DB_HOST
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_HOST
            - name: DB_PORT
              value: "5432"
            - name: DB_USER
              value: postgres
            - name: DB_NAME
              value: postgres
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_PASSWORD
```

From here, let's create and deploy a release, and verify that the secret has the customer-provided value, base64 decoding the secret contents:

```text
$ kubectl get secret postgres -o yaml | head -n 4
apiVersion: v1
data:
  DB_HOST: ZmFrZQ==
  DB_PASSWORD: ajNVWDd1RnRfc0NkVTJqOFU3Q25xUkxRQk5fUlh3RjA=
```

You can verify we pulled in our user-provided config by base64-decoding the `DB_HOST` field:

```text
$ echo ZmFrZQ== | base64 --decode
fake
```

Checking on our service itself, we can verify that it's now trying to connect to the `fake` hostname instead of `postgres`:

```text
$ kubectl logs -l app=pg-consumer
psql: could not translate host name "fake" to address: Name or service not known
```

We'll optionally wire this to a real external Postgres database later, but for now we'll proceed to add the rest of the fields.

### Extending this to All Fields

Now that we've wired the DB_HOST field all the way through, we'll do the same for the other fields.
In the end, your Secret and Deployment should look like the following YAML files:

```yaml
# postgres-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgres
data:
  DB_HOST: >-
    {{repl if ConfigOptionEquals "postgres_type" "embedded_postgres" }}
      {{repl Base64Encode "postgres" }}
    {{repl else}}
      {{repl ConfigOption "external_postgres_host" | Base64Encode }}
    {{repl end}}
  DB_PORT: >-
    {{repl if ConfigOptionEquals "postgres_type" "embedded_postgres" }}
      {{repl Base64Encode "5432" }}
    {{repl else}}
      {{repl ConfigOption "external_postgres_port" | Base64Encode }}
    {{repl end}}
  DB_USER: >-
    {{repl if ConfigOptionEquals "postgres_type" "embedded_postgres" }}
      {{repl Base64Encode "postgres" }}
    {{repl else}}
      {{repl ConfigOption "external_postgres_user" | Base64Encode }}
    {{repl end}}
  DB_PASSWORD: >-
    {{repl if ConfigOptionEquals "postgres_type" "embedded_postgres" }}
      {{repl ConfigOption "embedded_postgres_password" | Base64Encode }}
    {{repl else}}
      {{repl ConfigOption "external_postgres_password" | Base64Encode }}
    {{repl end}}
  DB_NAME: >-
    {{repl if ConfigOptionEquals "postgres_type" "embedded_postgres" }}
      {{repl Base64Encode "postgres" }}
    {{repl else}}
      {{repl ConfigOption "external_postgres_db" | Base64Encode }}
    {{repl end}}
```

```yaml
# pg-consumer.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pg-consumer
spec:
  selector:
    matchLabels:
      app: pg-consumer
  template:
    metadata:
      labels:
        app: pg-consumer
    spec:
      containers:
        - name: pg-consumer
          image: 'postgres:10'
          # connect to the database every 20 seconds
          command:
            - /bin/sh
            - -ec
            - |
              while :; do
                 sleep 20
                 PGPASSWORD=${DB_PASSWORD} \
                 psql --host ${DB_HOST} \
                      --port ${DB_PORT} \
                      --user ${DB_USER} \
                      --dbname ${DB_NAME} \
                      --command 'SELECT NOW()'
              done
          env:
            - name: DB_HOST
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_HOST
            - name: DB_PORT
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_PORT
            - name: DB_USER
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_USER
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_PASSWORD
            - name: DB_NAME
              valueFrom:
                secretKeyRef:
                  name: postgres
                  key: DB_NAME
```

Optionally, you can be extra concise and collapse each individual `env` `valueFrom` into a single `envFrom` `secretRef` entry:

```yaml
# pg-consumer.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pg-consumer
spec:
  selector:
    matchLabels:
      app: pg-consumer
  template:
    metadata:
      labels:
        app: pg-consumer
    spec:
      containers:
        - name: pg-consumer
          image: 'postgres:10'
          # connect to the database every 20 seconds
          command:
            - /bin/sh
            - -ec
            - |
              while :; do
                 sleep 20
                 PGPASSWORD=${DB_PASSWORD} \
                 psql --host ${DB_HOST} \
                      --port ${DB_PORT} \
                      --user ${DB_USER} \
                      --dbname ${DB_NAME} \
                      --command 'SELECT NOW()'
              done
          envFrom:
          - secretRef:
              name: postgres
```


After deploying this, you should see all of the fields in the secret:

```text
$ kubectl get secret postgres -o yaml
apiVersion: v1
data:
  DB_HOST: ZmFrZQ==
  DB_NAME: ZmFrZQ==
  DB_PASSWORD: ZXh0cmEgZmFrZQ==
  DB_PORT: NTQzMjE=
  DB_USER: ZmFrZQ==
kind: Secret
# ...snip...
```

We can also print the environment in our sample app to verify that all of the values are piped properly:

```text
$ kubectl exec $(kubectl get pod -l app=pg-consumer -o jsonpath='{.items[0].metadata.name}' ) -- /bin/sh -c 'printenv | grep DB_'
DB_PORT=54321
DB_NAME=fake
DB_PASSWORD=extra fake
DB_HOST=fake
DB_USER=fake
```

### Testing Config Changes

Now let's make some changes to the database credentials. In this case, we'll use a Postgres database provisioned in Amazon RDS, but you can use any external database.
To start, head to the "Config" screen and input your values:

![Real Postgres Values](/images/guides/kots/real-postgres-values.png)

Let's save and apply this config and check in our pod again:

```text
$ kubectl exec $(kubectl get pod -l app=pg-consumer -o jsonpath='{.items[0].metadata.name}' ) -- /bin/sh -c 'printenv | grep DB_'
DB_PORT=54321
DB_NAME=fake
DB_PASSWORD=extra fake
DB_HOST=fake
DB_USER=fake
```

Uh oh, It appears that our values did not get updated! If you've worked with Secrets before, you may know that there's a [long-standing issue in Kubernetes](https://github.com/kubernetes/kubernetes/issues/22368) where pods that load config from Secrets or ConfigMaps won't automatically restart when underlying config is changed.
There are some tricks to make this work, and in the next step we'll implement one of them, but for now we can delete the pod to verify that the configuration is being piped through to our sample application:

```text
$ kubectl delete pod -l app=pg-consumer
pod "pg-consumer-6df9d5d7fd-bd5z6"" deleted
```

If the pod is crashlooping, you might need to add `--force --grace-period 0` to force delete it.
In either case, once a new pod starts, we should now see it loading the correct config:

```text
$ kubectl exec $(kubectl get pod -l app=pg-consumer -o jsonpath='{.items[0].metadata.name}' ) -- /bin/sh -c 'printenv | grep DB_'
DB_PORT=5432
DB_NAME=postgres
DB_PASSWORD=<redacted>
DB_HOST=10.128.0.12
DB_USER=postgres
```

### Triggering Restarts on Changes

In order to automate this restart on changes, we're going to use a hash of all database parameters to trigger a rolling update whenever database parameters are changed.
We'll use a `hidden`, `readonly` field to store this in our config screen:

```yaml
        - name: external_postgres_confighash
          hidden: true
          readonly: true
          type: text
          value: '{{repl (sha256sum (print (ConfigOption "external_postgres_host") (ConfigOption "external_postgres_port") (ConfigOption "external_postgres_user") (ConfigOption "external_postgres_password") (ConfigOption "external_postgres_db") ))}}'
```

The `hidden` flag will hide it from the UI, and the `readonly` flag in this case will cause the value to be re-computed any time an upstream `ConfigOption` value changes.

Next, let's add this as an annotation to our deployment's pod template at `spec.template.metadata.annotations`:

```yaml
annotations:
  kots.io/config-hash: '{{repl ConfigOption "external_postgres_confighash"}}'
```

**Note**: It's worth noting here that there's nothing special about the `kots.io/config-hash` annotation. We could have just as easily called this annotation `my-app-something-fake` instead.
What matters here is that when the value in a Deployment annotation changes, it will cause Kubernetes to roll out a new version of the pod, stopping the old one and thus picking up our config changes.


Your full deployment should now look like the following YAML file:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pg-consumer
spec:
  selector:
    matchLabels:
      app: pg-consumer
  template:
    metadata:
      labels:
        app: pg-consumer
      annotations:
        kots.io/config-hash: '{{repl ConfigOption "external_postgres_confighash"}}'
    spec:
      containers:
        - name: pg-consumer
          image: 'postgres:10'
          # connect to the database every 20 seconds
          command:
            - /bin/sh
            - -ec
            - |
              while :; do
                 sleep 20
                 PGPASSWORD=${DB_PASSWORD} \
                 psql --host ${DB_HOST} \
                      --port ${DB_PORT} \
                      --user ${DB_USER} \
                      --dbname ${DB_NAME} \
                      --command 'SELECT NOW()'
              done
          envFrom:
            - secretRef:
                name: postgres
```


### Integrating a Real Database

If you'd like at this point, you can integrate a real database in your environment, just fill out your configuration fields. You'll know you did it right if your pg-consumer pod can connect.


<!-- Coming Soon!

* * *

## Validating User-supplied Configuration with Preflight Checks

* * *

## Using an InitContainer to Coordinate Workloads

* * *

## Preparing for Disaster Recover with Snapshots

-->
