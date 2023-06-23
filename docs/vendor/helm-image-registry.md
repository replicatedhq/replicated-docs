# Using External Private Registries for Helm Installations (Beta)

This topic describes the steps required to connect to an external private registry for installations with Helm.

## Overview

If your application images are available in a private image registry exposed to the Internet, such as Docker Hub or Amazon Elastic Container Registry (ECR), then the unique customer licenses that you create for your application can grant proxy, or _pull-through_, access to the assignee without exposing registry credentials to your customer.

To grant access to an external private registry for Helm installations, you can use the Replicated SDK and the Replicated proxy service. When you include the Replicated SDK with your Helm chart application, a `global.replicated.dockerconfigjson` field is automatically injected in the Helm chart values after customers provide their license ID during installation. The `global.replicated.dockerconfigjson` field contains a base64 encoded Docker configuration file that you can use to create a pull secret for accessing your private images through the Replicated proxy service at `proxy.replicated.com`.

For more information about the Replicated SDK, see [About the Replicated SDK (Alpha)](https://deploy-preview-1200--replicated-docs.netlify.app/vendor/replicated-sdk-overview).

For information about how Kubernetes uses the `kubernetes.io/dockerconfigjson` Secret type to authenticate to a private image registry, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) in the Kubernetes documentation.

## Prerequisites

* Declare the Replicated SDK as a dependency in your Helm chart. See [Using the SDK With Your Application (Alpha)](https://deploy-preview-1200--replicated-docs.netlify.app/vendor/replicated-sdk-using).
* Provide read-only credentials for the external private registry in your Replicated account. This allows Replicated to access the images through the Replicated proxy service. See [Configure Access to an External Registry](packaging-private-images#configure-access-to-an-external-registry) in _Connecting to an Image Registry_.
* (Optional) To use a custom domain for the proxy service instead of `proxy.replicated.com`, see [Using Custom Domains for the Replicated Registry and Proxy Service](custom-domains).
## Deliver Image Pull Secrets to the Proxy Service

This procedure shows how to create an image pull secret for the proxy service and then template the image names in your Helm chart to use `proxy.replicated.com` instead of your private registry URL.

To use an external registry and the proxy service for Helm installations:

1. In your Helm chart templates, create a Kubernetes Secret with the following to evaluate if the `global.replicated.dockerconfigjson` value is set, and then write the rendered value into a Secret on the cluster:

   ```yaml
   # /templates/replicated-secret.yaml

   {{ if .Values.global.replicated.dockerconfigjson }}
   apiVersion: v1
   kind: Secret
   metadata:
     name: replicated
   type: kubernetes.io/dockerconfigjson
   data:
     .dockerconfigjson: {{ .Values.global.replicated.dockerconfigjson }}
   {{ end }}
   ```

1. Create a field in your Helm chart values file with the location of the private image on `proxy.replicated.com`:

   ```yaml
   # values.yaml

   FIELD_NAME: PROXY_SERVICE_IMAGE_URL
   ```
   Replace:
   * `FIELD_NAME` with any name for the field.
   * `PROXY_SERVICE_IMAGE_URL` with the URL for the private image on `proxy.replicated.com`.
      The proxy service URL uses the following format: `proxy.replicated.com/proxy/APP_SLUG/EXTERNAL_REGISTRY_IMAGE_URL`, where `APP_SLUG` is the name of your application and `EXTERNAL_REGISTRY_IMAGE_URL` is the path to the private image on your external registry.

    :::note
    If you configured a custom domain for the proxy service, use the custom domain instead of `proxy.replicated.com`. For more information, see [Using Custom Domains for the Replicated Registry and Proxy Service](custom-domains).
    :::

   **Example:**

   ```yaml
   # values.yaml
   ...
   images:
     myapp:
       apiImageRepository: proxy.replicated.com/proxy/my-kots-app/quay.io/my-org/api
       apiImageTag: v1.0.1
   ```

1. In your Helm chart templates, add the `imagePullSecret` that you created to any manifests that reference the private image:

   ```yaml
   # /templates/example.yaml
   ...
   {{ if .Values.global.replicated.dockerconfigjson }}
   imagePullSecrets:
     - name: replicated
   {{ end }}
   ```

   **Example:**

    ```yaml
    # /templates/deployment.yaml
    ...
    image: "{{ .Values.images.myapp.apiImageRepository }}:{{ .Values.images.myapp.taapiImageTag }}"
    {{ if .Values.global.replicated.dockerconfigjson }}
    imagePullSecrets:
      - name: replicated
    {{ end }}
    name: myapp
    ports:
    - containerPort: 3000
      name: http
    ``` 

1. Update any references to the image in your Helm chart to access the field you created in your values file:

   ```yaml
   image: '{{ .Values.FIELD_NAME }}'
   ```

   **Example:**

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
    name: example
   spec:
     template:
       spec:
         containers:
           - name: api
             image: '{{ .Values.images.myapp.apiImageRepository }}:{{ .Values.images.myapp.apiImageTag }}'
   ```

1. Package your Helm chart and add it to a release. See [Managing Releases with Vendor Portal](releases-creating-releases).

1. Promote the release to a development environment to test your changes.