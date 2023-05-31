# Using Private Registries for helm CLI Installations (Beta)

This topic describes the steps required to connect to an external private registry or the Replicated private registry to support installations with the helm CLI. For more information about supporting installations with the helm CLI, see [Supporting helm CLI Installations (Beta)](helm-install).

:::note
Allowing users to install with the helm CLI is an Beta feature. To enable this feature on your account, log in to your vendor portal account. Select **Support** > **Request a feature**, and submit a feature request for "Helm CLI install option".
:::

## Overview of Using Private Registries

Using an external private image registry or the Replicated private registry for your application requires an image pull secret for access. The unique license for each customer can grant access to the Replicated private registry, or grant proxy access to an external registry without exposing registry credentials to the customer.

In addition to the image pull secret, using an external private registry also requires that you add credentials for the registry to the vendor portal so that Replicated can access the image through the Replicated proxy service.

For installations that use the helm CLI rather than Replicated KOTS, Replicated cannot automatically inject an image pull secret nor patch the image name to reference the proxy service in the Helm chart for your application, so additional configuration is required.

To use a private registry for helm CLI installations, complete the following procedures:
1. [Deliver Image Pull Secrets](#pull-secret)
1. [Reference the Proxy Service](#proxy-service)
1. [(Optional) Support Both Helm CLI and KOTS Installations](#helm-and-kots)

## Deliver Image Pull Secrets {#pull-secret}

For helm CLI installations, you must use a template function to inject a customer-specific image pull secret.

To deliver customer-specific image pull secrets for a private registry:

1. Add the `LicenseDockerCfg` template function to a field in your Helm chart `values.yaml` file using the following format:

   ```yaml
   FIELD_NAME: "repl{{ LicenseDockerCfg }}"
   ```
   Replace `FIELD_NAME` with any name for the field.
   
   You can add `"repl{{ LicenseDockerCfg }}"` as a flat or nested value. For more information, see [Flat or Nested Values](https://helm.sh/docs/chart_best_practices/values/#flat-or-nested-values) in the Helm documentation. For more information about the `LicenseDockerCfg` template function, see [LicenseDockerCfg](/reference/template-functions-license-context#licensedockercfg) in _License Context_.

   **Example:**

   ```yaml
   images:
     pullSecrets:
       replicated:
         dockerconfigjson: "repl{{ LicenseDockerCfg }}"
   ```   

1. In the `templates` directory of your Helm chart, create a Kubernetes Secret manifest file (`kind: Secret`). Add the following YAML to the file to evaluate if the secret value is set, and then write the rendered value into a Secret on the cluster:

   ```yaml
   {{ if .Values.FIELD_NAME }}
   apiVersion: v1
   kind: Secret
   metadata:
     name: SECRET_NAME
   # Kubernetes clusters use the kubernetes.io/dockerconfigjson Secret type
   # to authenticate with a private image registry.
   type: kubernetes.io/dockerconfigjson
   data:
     .dockerconfigjson: {{ .Values.FIELD_NAME }}
   {{ end }}
   ```

   Replace:
   * `FIELD_NAME` with the name of the field from the previous step where you added `"repl{{ LicenseDockerCfg }}"`. For example, `.Values.images.pullSecrets.replicated.dockerconfigjson`.
   * `SECRET_NAME` with any name for the secret. For example, `replicated`.

   **Example:**

   ```yaml
   {{ if .Values.images.pullSecrets.replicated.dockerconfigjson }}
   apiVersion: v1
   kind: Secret
   metadata:
     name: replicated
   type: kubernetes.io/dockerconfigjson
   data:
     .dockerconfigjson: {{ .Values.images.pullSecrets.replicated.dockerconfigjson }}
   {{ end }}
   ```

1. Add the following to any manifests in the Helm chart `templates` directory that reference private images, to inject the pull secret that you created in the previous step:

   ```yaml
        ...
        {{ if .Values.FIELD_NAME }}
        imagePullSecrets:
          - name: SECRET_NAME
        {{ end }}
   ```
   Replace:
   * `FIELD_NAME` with the name of the field where you where you added `"repl{{ LicenseDockerCfg }}"`.
   * `SECRET_NAME` with the name of the Secret that you created in the previous step.

   **Example:**

   The following example shows the `imagePullSecrets` field in a `templates/deployment.yaml` file that also injects values for the image registry URL, image tag, and `imagePullPolicy`.

    ```yaml
        ...
        image: {{ .Values.images.myapp.repository }}{{ .Values.images.myapp.tag }}
        imagePullPolicy: {{ .Values.images.myapp.pullPolicy }}
        {{ if .Values.images.pullSecrets.replicated.dockerconfigjson }}
        imagePullSecrets:
          - name: replicated
        {{ end }}
        name: myapp
        ports:
        - containerPort: 3000
          name: http
    ```

1. Package your Helm chart and add the packaged chart to a release in the Replicated vendor portal. For more information, see [Creating Releases with the Vendor Portal](releases-creating-release).

1. Save and promote the release to a development environment to test your changes.  

1. If you are using an external private registry, continue to [Update the Image Name to Reference the Proxy Service](#proxy-service) below to allow Replicated to access your private image through the proxy service.

## Reference the Proxy Service {#proxy-service}

:::note
This procedure is required only for external private registries. Skip this procedure if you are using the Replicated private registry.
:::

This procedure describes how to update your Helm chart to allow Replicated to access the external registry through the proxy service when your users install with the helm CLI.

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

1. Package your Helm chart and add the packaged chart to a release in the Replicated vendor portal. For more information, see [Creating Releases with Vendor Portal](releases-creating-release).

1. Save and promote the release to a development environment to test your changes.

1. To use the same private registry for both helm CLI and KOTS installations, continue to [(Optional) Support Both Helm CLI and KOTS Installations](#helm-and-kots) below.

## (Optional) Support Both helm CLI and KOTS Installations {#helm-and-kots}

As an application vendor, you can support both helm CLI and KOTS installations from the same release. For more information, see [About Supporting helm CLI installations](helm-install) in _Supporting helm CLI Installations (Beta)_.

To support both types of installations with your private registry from a single release, you must update the release to add your registry URL as a static value in the HelmChart custom resource. This allows KOTS to automatically patch the image name to reference `proxy.replicated.com`. Helm Install installations ignore this static value, and instead use the `proxy.replicated.com` URL that you added to the `values.yaml` file previously.

To use your private registry in both helm CLI and KOTS installations:

1. In the release that you want to update, open the HelmChart custom resource manifest file. A HelmChart custom resource manifest file has `kind: HelmChart` and `apiVersion: kots.io/v1beta1`.

   **Template:**

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: HelmChart
   metadata:
     name: samplechart
   spec:
     ...
   ```

   The Replicated HelmChart custom resource allows Replicated to process and deploy Helm charts. For more information, see [HelmChart](/reference/custom-resource-helmchart) in _Custom Resources_.

1. Under the HelmChart custom resource `values` field, create a new field and add a static key value pair with the location of the private image on the external registry:

   ```yaml
   values:
     FIELD_NAME: REGISTRY_URL
   ```
   Replace:
   * `FIELD_NAME` with the same field name that you created in the previous step in the `values.yaml` file. For example, `apiImageRepository`.
   * `REGISTRY_URL` with the URL for the image on your external registry.

   **Example:**

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: HelmChart
   metadata:
     name: samplechart
   spec:
     chart:
       name: samplechart
       chartVersion: 3.1.7
       releaseName: samplechart-release-v1
     values:
       apiImageRepository: quay.io/my-org/api:v1.0.1
   ```

1. Save and promote the release to a development environment to test that you can install with both the helm CLI and KOTS.
