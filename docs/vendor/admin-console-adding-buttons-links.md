# Adding Buttons and Links

When distributing an application, it’s helpful to make sure that the person or process performing the installation can easily verify that the application is running.
Networking and ingress is handled differently in each cluster and this makes it difficult to provide a consistent URL at application packaging time, and even likely requires that the cluster operator creates firewall rules before they can test the application installation.

The Replicated app manager and admin console can provide a port-forward tunnel that will work more consistently to provide an easy way for the cluster operator to open one or more links directly to the application before ingress and firewalls are configured.

To export a port and a button on the admin console dashboard to the application, a couple of additional steps are necessary.

## Add a button to the dashboard

It’s recommended that every application include an application custom resource as defined by [Kubernetes SIG Apps](https://github.com/kubernetes-sigs/application).
The app manager uses this as metadata and will not require or use an in-cluster controller to handle this custom resource.
An application that follows best practices will never require cluster admin privileges or any cluster-wide components to be installed.

The Application custom resource includes many fields, but the one that we are going to examine in this document is the links:

The `spec.descriptor.links` field is an array of links that reference the application, once it’s deployed.

Each link contains two fields, description and url.

The description field is the title of the button that will be added to the admin console.
The url field should be the url of your application.

You can use the service name in place of the host name and the app manager will rewrite the URL with hostname in the browser.

#### Example

```yaml
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  name: "my-application"
  labels:
    app.kubernetes.io/name: "my-application"
    app.kubernetes.io/version: "1.0.0"
spec:
  selector:
    matchLabels:
     app.kubernetes.io/name: "my-application"
  descriptor:
    links:
      - description: "Open My Application"
        url: https://my-application-url
```

## Additional ports and port forwarding

When running the `kubectl` plugin for the kots CLI, the app manager can add additional ports that are defined in the application to the port-forward tunnel.
This is useful for internal services such as application admin controls and other services that should not be exposed to all users.
It's also recommended to list the primary application port(s) here to make verification of the installation possible before ingress is installed.

In order to define additional ports, add a `ports` key to the Application custom resource manifest file.

#### Example

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: my-application-logo-uri
  ports:
    - serviceName: "myapplication-service"
      servicePort: 9000
      localPort: 9000
      applicationUrl: "http://myapplication-service"
 ```

Given the above example, when the application starts and the service is ready, the kots CLI will run the equivalent of `kubectl port-forward svc/myapplication-service 9000:9000` and print a message in the terminal.
Service should reference the service name that the application deployed without the namespace.

## Using dashboard buttons with port forward

Finally, it's possible to combine these two features and use a dashboard button that links to a port-forwarded service.
When doing this, it's recommended to not use https but instead use http, unless TLS termination is happening in the application pod.
