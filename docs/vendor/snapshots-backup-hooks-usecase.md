# Backup hooks advanced use case

This topics describes an optional advanced use case for using backup hooks with snapshots.

In many cases, simply taking a snapshot of a volume is not enough. For example, the recommend way to backup Postgres is to use `pg_dump` and only take a snapshot of the backup.
A similar approach would also be needed for applications that use an 'in memory' database that requires a service shut down before any backup is taken.

Velero provides both pre and post [backup hooks](https://velero.io/docs/v1.4/hooks/#docs).
These can be configured by adding annotations to the pod itself or in the [Backup spec](https://velero.io/docs/v1.2.0/api-types/backup/).
For the purposes of this guide, we'll do the former and use label annotations.

To accomplish this we'll need to:

- Add the *pre.hook.backup.velero.io/command* label annotation to execute `pg_dump` and put the backup in a new folder.
- Add the *pre.hook.backup.velero.io/timeout* label annotation to give the backup time to run and store the output.
  Per the Velero documentation, "The hook is considered in error if the command exceeds the timeout." so make sure this value exceeds how long you expect the command to take.
- Add a new volume to the pod and mount it to the new folder containing the `pg_dump` output.
- Change the *backup.velero.io/backup-volumes:* label to take a snapshot of the new volume.

Below highlights the changes to the Postgres definition file:

```diff
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: app-direct-postgresql
    labels:
      app: postgresql
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: postgresql
    serviceName: postgres-service
    template:
      metadata:
        labels:
          app: postgresql
        annotations:
-         backup.velero.io/backup-volumes: postgresql-vct # this volume will be included in snapshot
+         pre.hook.backup.velero.io/command: '["/bin/bash", "-c", "PGPASSWORD=$POSTGRES_PASSWORD pg_dump -U $POSTGRES_USER -d postgres -h 127.0.0.1 > /backup/backup.sql"]'
+         pre.hook.backup.velero.io/timeout: 3m
+         backup.velero.io/backup-volumes: postgresql-backup
      spec:
```

The snippet below shows the addition of the backup volume.
Note that we are using a local [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir) volume for the backup volume.
Since we only need to use it as a temporary holding place while we take the snapshot, using a persistent volume would be overkill.

```diff
          volumeMounts:
          - name: postgresql-vct
            mountPath: /var/lib/postgresql/data/pgdata
            subPath: postgresql-db
+         - name: postgresql-backup
+           mountPath: /backup
+       volumes:
+       - name: postgresql-backup
+         emptyDir: {}
    volumeClaimTemplates:
    - metadata:
        name: postgresql-vct
      spec:
        accessModes:
        - ReadWriteOnce
        resources:
          requests:
            storage: 2Gi
 ```

 The entire file with these changes is also in the [sample manifests](#postgres-deployment-pgdumpyaml).

### Verify the backup and restore output

Create a new release with the above changes and promote it to the *unstable* channel and then update the running application.
Take a new snapshot and once it completes open it and view the details. It should look something similar to this:

![image](/images/guides/kots/snap_guide_detail_snap.png)

As noted in the image above, we can see under **Scripts** that it ran the command.
Under **Snapshot timeline** we can see how long this took and under **Volumes** the volume it backed up and the size.
To further verify that the backup command did in fact run, let's exec into the `postgresql-0` pod and make sure the backup file was in fact created.
To exec into the pod, ssh into the VM where the application is installed and run:

```shell
   kubectl exec -it postgresql-0 bash
```
once inside the pod let's check if the backup was in fact created:

```shell
   ls -alh /backup

```

The output should be something similar to this:

```shell
  total 12K
  drwxrwxrwx 2 root root 4.0K Oct 13 15:37 .
  drwxr-xr-x 1 root root 4.0K Oct 13 15:35 ..
  -rw-r--r-- 1 root root  911 Oct 13 15:37 backup.sql
```
Here we can see that the size of the file matches the size shown under **Volumes** in the snapshot details.

Take another snapshot, making sure that at least a couple of minutes have passed since the previous snapshot.

If we check the backup directory again, we should see an updated timestamp on the file:

```shell
  total 12K
  drwxrwxrwx 2 root root 4.0K Oct 13 15:37 .
  drwxr-xr-x 1 root root 4.0K Oct 13 15:35 ..
  -rw-r--r-- 1 root root  911 Oct 13 15:39 backup.sql

```

Now, let's test the restore.
In the example above, we are restoring the snapshot taken at 15:37.
Follow the prompts to start the restore process.

Once the restore process finishes, we will need to log back in to the KOTS Admin Console.
To verify that the timestamp of the backup file matches the timestamp of the snapshot, run the `ls -alh` command we ran earlier to check the contents of the directory.
As we can see below, not only has the timestamp changed on the file, but there is also now a `.velero` file.

```shell
  total 16K
  drwxrwxrwx 3 root root 4.0K Oct 13 15:40 .
  drwxr-xr-x 1 root root 4.0K Oct 13 15:40 ..
  -rw-r--r-- 1 root root  911 Oct 13 15:37 backup.sql
  drwxr-xr-x 2 root root 4.0K Oct 13 15:40 .velero
```

### About restore hooks

As of Velero version 1.5.1, there is now support for [restore hooks](https://velero.io/docs/v1.5/restore-hooks/#docs).
This is a new feature, and while it should work with KOTS, it has not been tested.

This means that the process to restore from the backup file will be a manual one. For more information about this process, see [this tutorial](https://www.postgresqltutorial.com/postgresql-restore-database/).

## Sample manifest files

### postgres-deployment.yaml

Postgres Deployment Definition File:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgresql
  labels:
    app: postgresql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgresql
  serviceName: postgres-service
  template:
    metadata:
      labels:
        app: postgresql
    spec:
      containers:
      - name: postgresql
        image: "postgres:9.6"
        env:
        - name: POSTGRES_USER
          value: "postgres"
          # Required for pg_isready in the health probes.
        - name: PGUSER
          value: "postgres"
        - name: POSTGRES_DB
          value: "postgres"
        - name: POSTGRES_INITDB_ARGS
          value: ""
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        - name: POSTGRES_PASSWORD
          value: "postgres"
        - name: POD_IP
          valueFrom: { fieldRef: { fieldPath: status.podIP } }
        ports:
        - name: postgresql
          containerPort: 5432
        livenessProbe:
          exec:
            command:
            - sh
            - -c
            - exec pg_isready --host $POD_IP
          initialDelaySeconds: 60
          timeoutSeconds: 5
          failureThreshold: 6
        readinessProbe:
          exec:
            command:
            - sh
            - -c
            - exec pg_isready --host $POD_IP
          initialDelaySeconds: 5
          timeoutSeconds: 3
          periodSeconds: 5
        resources:
          requests:
            cpu: 100m
            memory: 256Mi

        volumeMounts:
        - name: postgresql-vct
          mountPath: /var/lib/postgresql/data/pgdata
          subPath: postgresql-db
  volumeClaimTemplates:
  - metadata:
      name: postgresql-vct
    spec:
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: 2Gi

```
### postgres-service.yaml

Service Definition File:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgresql-service
  labels:
    app: postgresql
spec:
  type: NodePort
  ports:
  - name: postgresql
    port: 5432
    nodePort: 5432
    targetPort: postgresql
  selector:
    app: postgresql
```

### backup.yaml

```yaml
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: backup
spec: {}
```
### postgres-deployment-pgdump.yaml

```yaml

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: app-direct-postgresql
  labels:
    app: postgresql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgresql
  serviceName: postgres-service
  template:
    metadata:
      labels:
        app: postgresql
      annotations:
        pre.hook.backup.velero.io/command: '["/bin/bash", "-c", "PGPASSWORD=$POSTGRES_PASSWORD pg_dump -U $POSTGRES_USER -d postgres -h 127.0.0.1 > /backup/backup.sql"]'
        pre.hook.backup.velero.io/timeout: 3m
        backup.velero.io/backup-volumes: postgresql-backup
    spec:
      containers:
      - name: app-direct-postgresql
        image: "postgres:9.6"
        env:
        - name: POSTGRES_USER
          value: "postgres"
          # Required for pg_isready in the health probes....
        - name: PGUSER
          value: "postgres"
        - name: POSTGRES_DB
          value: "postgres"
        - name: POSTGRES_INITDB_ARGS
          value: ""
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        - name: POSTGRES_PASSWORD
          value: "postgres"
        - name: POD_IP
          valueFrom: { fieldRef: { fieldPath: status.podIP } }
        ports:
        - name: postgresql
          containerPort: 5432
        livenessProbe:
          exec:
            command:
            - sh
            - -c
            - exec pg_isready --host $POD_IP
          initialDelaySeconds: 60
          timeoutSeconds: 5
          failureThreshold: 6
        readinessProbe:
          exec:
            command:
            - sh
            - -c
            - exec pg_isready --host $POD_IP
          initialDelaySeconds: 5
          timeoutSeconds: 3
          periodSeconds: 5
        resources:
          requests:
            cpu: 100m
            memory: 256Mi

        volumeMounts:
        - name: postgresql-vct
          mountPath: /var/lib/postgresql/data/pgdata
          subPath: postgresql-db
        - name: postgresql-backup
          mountPath: /backup
      volumes:
      - name: postgresql-backup
        emptyDir: {}  
  volumeClaimTemplates:
  - metadata:
      name: postgresql-vct
    spec:
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: 2Gi
```
* * *
## Additional resources

* For another working example of a KOTS application, see [Postgres Snapshot Sample Application](https://github.com/replicatedhq/kotsapps/tree/master/postgres-snapshots).

* [Velero documentation](https://velero.io/docs/)
