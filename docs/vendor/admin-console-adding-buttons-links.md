# Adding Buttons and Links

This topic describes how to use the Kubernetes and KOTS Application custom resources to add buttons and links to the Replicated admin console dashboard.

## Overview

When distributing an application, it is helpful to make sure that the person or process performing the installation can easily verify that the application is running.
Networking and ingress is handled differently in each cluster and this makes it difficult to provide a consistent URL at application packaging time, and even likely requires that the cluster operator creates firewall rules before they can test the application installation.

To provide an easy way for the cluster operator to open one or more links directly to the application before ingress and firewalls are configured, you can configure Replicated KOTS to provide a port-forward tunnel. You can also add a button to the admin console dashboard that links users to the application through the port-forward. 

## Add A Button to the Dashboard

Replicated recommends that every application include a Kubernetes SIG Application custom resource. The Kubernetes SIG Application custom resource provides a standard API for creating, viewing, and managing applications. For more information, see [Kubernetes Applications](https://github.com/kubernetes-sigs/application#kubernetes-applications) in the `kubernetes-sigs/application` Github repository.

KOTS uses this as metadata and will not require or use an in-cluster controller to handle this custom resource.
An application that follows best practices will never require cluster admin privileges or any cluster-wide components to be installed.

The Kubernetes Application custom resource `spec.descriptor.links` field is an array of links that reference the application, after the application is deployed. The `spec.descriptor.links` field can be used to configure buttons on the Replicated admin console that link to application dashboards or landing pages.

Each link contains two fields:
* `description`: The title of the button that will be added to the admin console.
* `url` : The URL of your application. You can use the service name in place of the host name and KOTS rewrites the URL with hostname in the browser.

For example:

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

## Additional Ports and Port Forwarding

KOTS can add additional ports that are defined in the application to the port-forward tunnel.
This is useful for internal services such as application admin controls and other services that should not be exposed to all users.
It's also recommended to list the primary application port(s) here to make verification of the installation possible before ingress is installed.

In order to define additional ports, add a `ports` key to the Application custom resource manifest file.

<table>
  <tr>
    <th>Field</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>serviceName</td>
    <td>Service should reference the service name that the application deployed without the namespace.</td>
  </tr>
  <tr>
    <td>servicePort</td>
    <td>The container port</td>
  </tr>
  <tr>
    <td>localPort</td>
    <td>A local port </td>
  </tr>
  <tr>
    <td>applicationURL</td>
    <td>When doing this, it's recommended to not use https but instead use http, unless TLS termination is happening in the application pod.</td>
  </tr>
</table>

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

