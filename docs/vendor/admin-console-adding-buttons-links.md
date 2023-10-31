# Adding Buttons and Links

This topic describes how to use the Kubernetes and KOTS Application custom resources to add buttons and links to the Replicated admin console dashboard.

## Overview

Replicated recommends that every application include a Kubernetes SIG Application custom resource. The Kubernetes Application custom resource provides a standard API for creating, viewing, and managing applications. For more information, see [Kubernetes Applications](https://github.com/kubernetes-sigs/application#kubernetes-applications) in the `kubernetes-sigs/application` GitHub repository.

You can configure the Kubernetes Application custom resource to add buttons and links to the Replicated admin console dashboard. A common use case for this is adding a button to the dashboard that users can click on to navigate to port-forwarded services. For more information, see [Configuring Port Forwarding](/vendor/admin-console-port-forward).

:::note
KOTS uses the Kubernetes Application custom resource as metadata and does not require or use an in-cluster controller to handle this custom resource. An application that follows best practices does not require cluster admin privileges or any cluster-wide components to be installed.
:::

## Add A Button to the Dashboard

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