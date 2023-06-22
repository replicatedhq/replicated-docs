# Using External Private Registries for Helm Installations (Beta)

This topic describes the steps required to connect to an external private registry for installations with Helm.

## Overview

Using an external private image registry or the Replicated private registry for your application requires an image pull secret for access. The unique license for each customer can grant access to the Replicated private registry, or grant proxy access to an external registry without exposing registry credentials to the customer.

In addition to the image pull secret, using an external private registry also requires that you add credentials for the registry to the vendor portal so that Replicated can access the image through the Replicated proxy service.

For installations that use Helm rather than Replicated KOTS, Replicated cannot automatically inject an image pull secret nor patch the image name to reference the proxy service in the Helm chart for your application, so additional configuration is required.

To use a private registry for Helm installations, complete the following procedures:
1. [Deliver Image Pull Secrets](#pull-secret)
1. [Reference the Proxy Service](#proxy-service)

## Prerequisite

To use an external private registry for Helm installations, you must include the Replicated SDK with your application. ADD LINK
## Deliver Image Pull Secrets {#pull-secret}

To deliver customer-specific image pull secrets for an external private registry:

1. In the `templates` directory of your Helm chart, create a Kubernetes Secret manifest file (`kind: Secret`). Add the following to evaluate if the `global.replicated.dockerconfigjson` value is set, and then write the rendered value into a Secret on the cluster:

   ```yaml
   {{ if .Values.global.replicated.dockerconfigjson }}
   apiVersion: v1
   kind: Secret
   metadata:
     name: replicated
   # Kubernetes clusters use the kubernetes.io/dockerconfigjson Secret type
   # to authenticate with a private image registry.
   type: kubernetes.io/dockerconfigjson
   data:
     .dockerconfigjson: {{ .Values.global.replicated.dockerconfigjson }}
   {{ end }}
   ```

1. Add the following to any manifests in the Helm chart `templates` directory that reference private images, to inject the pull secret that you created in the previous step:

   ```yaml
   ...
   {{ if .Values.gloabl.replicated.dockerconfigjson }}
   imagePullSecrets:
     - name: replicated
   {{ end }}
   ```

   **Example:**

   The following example shows the `imagePullSecrets` field in a `templates/deployment.yaml` file that also injects values for the image registry URL, image tag, and `imagePullPolicy`.

    ```yaml
    ...
    image: {{ .Values.images.myapp.repository }}{{ .Values.images.myapp.tag }}
    imagePullPolicy: {{ .Values.images.myapp.pullPolicy }}
    {{ if .Values.gloabl.replicated.dockerconfigjson }}
    imagePullSecrets:
      - name: replicated
    {{ end }}
    name: myapp
    ports:
    - containerPort: 3000
      name: http
    ```

1. Package your Helm chart and add it to a release. See [Managing Releases with the Vendor Portal](releases-creating-release).

1. Promote the release to a development environment to test your changes.  

## Reference the Proxy Service {#proxy-service}

To update the image name to reference the proxy service:

1. Create a field in the Helm chart `values.yaml` file with the location of the private image on `proxy.replicated.com`:

   ```yaml
   FIELD_NAME: PROXY_SERVICE_IMAGE_URL
   ```
   Replace:
   * `FIELD_NAME` with any name for the field.
   * `PROXY_SERVICE_IMAGE_URL` with the URL for the private image on `proxy.replicated.com`. Helm Install installations use this proxy service URL that you add to the `values.yaml` file.

      The proxy service URL uses the following format: `proxy.replicated.com/proxy/APP_NAME/EXTERNAL_REGISTRY_IMAGE_URL`, where `APP_NAME` is the name of your application and `EXTERNAL_REGISTRY_IMAGE_URL` is the path to the private image on your external registry.

   **Example:**

   ```yaml
   apiImageRepository: proxy.replicated.com/proxy/my-kots-app/quay.io/my-org/api
   apiImageTag: v1.0.1
   ```  
   The example above shows a field for the image name and a separate field for the image tag.

1. In any manifest files in your Helm chart that reference the proxied image, set the image name to the field that you created in the `values.yaml` file in the previous step. This ensures that Helm Install installations use the proxy service URL from the `values.yaml` file for the location of the private image.

   Use the following Helm template function format:

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
             image: '{{ .Values.apiImageRepository }}:{{ .Values.apiImageTag }}'
   ```

   The example above shows how to reference both the `apiImageRepository` and `apiImageTag` fields from the previous example.

1. Package your Helm chart and add it to a release. See [Managing Releases with Vendor Portal](releases-creating-release).

1. Promote the release to a development environment to test your changes.