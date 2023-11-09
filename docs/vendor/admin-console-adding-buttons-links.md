# Adding Application Links to the Dashboard

This topic describes how to use the Kubernetes SIG Application and KOTS Application custom resources to add links to the Replicated admin console dashboard.

## Overview

Replicated recommends that every application include a Kubernetes SIG Application custom resource. The Kubernetes Application custom resource provides a standard API for creating, viewing, and managing applications. For more information, see [Kubernetes Applications](https://github.com/kubernetes-sigs/application#kubernetes-applications) in the `kubernetes-sigs/application` GitHub repository.

You can configure the Kubernetes Application custom resource to add links to the Replicated admin console dashboard. A common use case for this is adding a button to the dashboard that users can click on to navigate to dashboards or landing pages for an application.

:::note
KOTS uses the Kubernetes Application custom resource as metadata and does not require or use an in-cluster controller to handle this custom resource. An application that follows best practices does not require cluster admin privileges or any cluster-wide components to be installed.
:::

## Prerequisites

Before you can add application links to the dashboard, ensure that the target service is exposed using KOTS port forwarding or through a NodePort type service:

* **Existing cluster installations**: KOTS port-forwarding for existing cluster installations. See [Port Forwarding Service with KOTS](/vendor/admin-console-port-forward).
* **Embedded cluster installations**: Create NodePort services to expose services for embedded cluster installations. 

## Add an Application Link to the Dashboard

To add a link to a service on the admin console dashboard, configure a Kubernetes SIG Application custom resource that includes a `spec.descriptor.links` field. The `spec.descriptor.links` field is an array of application links after the application is deployed.

**For example:**

  ```yaml
  # app.k8s.io/v1beta1 Application Custom resource

  apiVersion: app.k8s.io/v1beta1
  kind: Application
  metadata:
    name: "gitea"
  spec:
    descriptor:
      links:
        - description: Open App
          url: "http://gitea"
  ```

As shown in the example above, each link contains two fields:
* `description`: The title of the button that will be added to the admin console. For example, `Open App`.
* `url` : The URL of your application. Consider the following requirements and guidelines:
  * Use `http` instead of `https` unless TLS termination takes place in the application Pod.
  * You can use the service name in place of the hostname in the URL. KOTS rewrites the URL with the hostname in the browser.
  * The URL _must_ match a URL in the `ports.applicationURL` field in the KOTS Application custom resource. For more information, see [ports](/reference/custom-resource-application#ports) in _Application_.
    :::note
    The KOTS Application custom resource `ports` key is designed to port forward services in existing cluster installations. Although KOTS does not port forward services in embedded cluster installations, the `ports` key must be configured in order to add links to the admin console dashboard.
    :::  