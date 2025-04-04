# Using the Proxy Registry with Helm Installations

This topic describes how to use the Replicated proxy registry to proxy images for installations with the Helm CLI. For more information about the proxy registry, see [About the Replicated Proxy Registry](private-images-about).

## Overview

With the Replicated proxy registry, each customer's unique license can grant proxy access to images in an external private registry. To enable the proxy registry for Helm installations, you must create a Secret with `type: kubernetes.io/dockerconfigjson` to authenticate with the proxy registry.

During Helm installations, after customers provide their license ID, a `global.replicated.dockerconfigjson` field that contains a base64 encoded Docker configuration file is automatically injected in the Helm chart values. You can use this `global.replicated.dockerconfigjson` field to create the required pull secret.

For information about how Kubernetes uses the `kubernetes.io/dockerconfigjson` Secret type to authenticate to a private image registry, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) in the Kubernetes documentation.

## Enable the Proxy Registry

This section describes how to enable the proxy registry for applications deployed with Helm, including how to use the `global.replicated.dockerconfigjson` field that is injected during application deployment to create the required pull secret.

To enable the proxy registry:

1. Provide read-only credentials for the external private registry in your Replicated account. This allows Replicated to access the images through the proxy registry. See [Add Credentials for an External Registry](packaging-private-images#add-credentials-for-an-external-registry) in _Connecting to an External Registry_.

1. (Optional) Add a custom domain for the proxy registry instead of `proxy.replicated.com`. See [Using Custom Domains](custom-domains-using).

1. In your Helm chart templates, create a Kubernetes Secret to evaluate if the `global.replicated.dockerconfigjson` value is set, and then write the rendered value into a Secret on the cluster:

   ```yaml
   # /templates/replicated-pull-secret.yaml

   {{ if .Values.global.replicated.dockerconfigjson }}
   apiVersion: v1
   kind: Secret
   metadata:
     name: replicated-pull-secret
   type: kubernetes.io/dockerconfigjson
   data:
     .dockerconfigjson: {{ .Values.global.replicated.dockerconfigjson }}
   {{ end }}
   ```

   :::note
   If you use the Replicated SDK, do not use `replicated` for the name of the image pull secret because the SDK automatically creates a Secret named `replicated`. Using the same name causes an error.
   :::

1. Ensure that you have a field in your Helm chart values file for your image repository URL, and that any references to the image in your Helm chart access the field from your values file.  

   **Example**:

   ```yaml
   # values.yaml
   ...
   dockerconfigjson: '{{ .Values.global.replicated.dockerconfigjson }}'
   images:
     myapp:
       # Add image URL in the values file
       apiImageRepository: quay.io/my-org/api
       apiImageTag: v1.0.1
   ```
   ```yaml
   # /templates/deployment.yaml

   apiVersion: apps/v1
   kind: Deployment
   metadata:
    name: example
   spec:
     template:
       spec:
         containers:
           - name: api
             # Access the apiImageRepository field from the values file
             image: {{ .Values.images.myapp.apiImageRepository }}:{{ .Values.images.myapp.apiImageTag }}
   ```

1. In your Helm chart templates, add the image pull secret that you created to any manifests that reference the private image:

   ```yaml
   # /templates/example.yaml
   ...
   {{ if .Values.global.replicated.dockerconfigjson }}
   imagePullSecrets:
     - name: replicated-pull-secret
   {{ end }}
   ```

   **Example:**

    ```yaml
    # /templates/deployment.yaml
    ...
    image: "{{ .Values.images.myapp.apiImageRepository }}:{{ .Values.images.myapp.apiImageTag }}"
    {{ if .Values.global.replicated.dockerconfigjson }}
    imagePullSecrets:
      - name: replicated-pull-secret
    {{ end }}
    name: myapp
    ports:
    - containerPort: 3000
      name: http
    ```

1. Package your Helm chart and add it to a release. Promote the release to a development channel. See [Managing Releases with Vendor Portal](releases-creating-releases).

1. Install the chart in a development environment to test your changes:

   1. Create a local `values.yaml` file to override the default external registry image URL with the URL for the image on `proxy.replicated.com`.
   
      The proxy registry URL has the following format: `proxy.replicated.com/proxy/APP_SLUG/EXTERNAL_REGISTRY_IMAGE_URL`
      
      Where:
      * `APP_SLUG` is the slug of your Replicated application.
      * `EXTERNAL_REGISTRY_IMAGE_URL` is the path to the private image on your external registry.

      **Example**
      ```yaml
      # A local values.yaml file
      ...
      images:
        myapp:
          apiImageRepository: proxy.replicated.com/proxy/my-app/quay.io/my-org/api
          apiImageTag: v1.0.1

      ```

      :::note
      If you configured a custom domain for the proxy registry, use the custom domain instead of `proxy.replicated.com`. For more information, see [Using Custom Domains](custom-domains-using).
      :::
   
   1. Log in to the Replicated registry and install the chart, passing the local `values.yaml` file you created with the `--values` flag. See [Installing with Helm](install-with-helm).