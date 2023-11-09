# Adding Application Links to the Dashboard

This topic describes how to use the Kubernetes SIG Application and KOTS Application custom resources to add links to the Replicated admin console dashboard.

## Overview

Replicated recommends that every application include a Kubernetes SIG Application custom resource. The Kubernetes Application custom resource provides a standard API for creating, viewing, and managing applications. For more information, see [Kubernetes Applications](https://github.com/kubernetes-sigs/application#kubernetes-applications) in the `kubernetes-sigs/application` GitHub repository.

You can configure the Kubernetes Application custom resource to add links to the Replicated admin console dashboard. A common use case for this is adding a button to the dashboard that users can click on to navigate to a landing page for your application.

:::note
KOTS uses the Kubernetes Application custom resource as metadata and does not require or use an in-cluster controller to handle this custom resource. An application that follows best practices does not require cluster admin privileges or any cluster-wide components to be installed.
:::

## Prerequisites

Before you can add application links to the dashboard, ensure that

* **Existing cluster installations**: KOTS port-forwarding for existing cluster installations and create NodePort services to expose services for embedded cluster installations. 

## Add an Application Link to the Dashboard

Replicated recommends that you provide a link on the admin console dashboard where users can open your application. This link can point to a port-forwarded service for existing cluster installations, or to a NodePort service for embedded cluster installations with kURL. For more information, see [Port Forwarding Service with KOTS](/vendor/admin-console-port-forward).

The Kubernetes Application custom resource `spec.descriptor.links` field is an array of links that reference the application, after the application is deployed. The `spec.descriptor.links` field can be used to configure buttons on the Replicated admin console that link to application dashboards or landing pages.

To add a link to a service on the admin console dashboard:

1. Configure a Kubernetes Application custom resource that includes the same URL as the `ports.applicationURL` field in the KOTS custom resource

  Given the `applicationUrl` in the example KOTS Application custom resource in the previous step, the following Kubernetes Application custom resource adds an **Open App** button to the admin console dashboard that the user can click to open the application:

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
    * `description`: The title of the button that will be added to the admin console.
    * `url` : The URL of your application. You can use the service name in place of the host name and KOTS rewrites the URL with hostname in the browser. It is recommended to use `http` instead of `https`, unless TLS termination takes place in the application Pod.

1. For any services that you want to link to, ensure that the KOTS Application custom resource includes a `ports.applicationURL` field.

  **Example:**

  ```yaml
  # kots.io/v1beta1 Application custom resource

  apiVersion: kots.io/v1beta1
  kind: Application
  metadata:
    name: gitea
  spec:
    ports:
      - serviceName: "gitea"
        servicePort: 3000
        localPort: 8888
        applicationUrl: "http://gitea"
  ```    