# Avoid Docker Hub Rate Limits

This topic describes how to avoid rate limiting for Docker Hub images used by your application.

The information in this topic applies to installations with a Replicated installer (Embedded Cluster, KOTS existing cluster, kURL).

## Overview

On November 20, 2020, rate limits for anonymous and free authenticated use of Docker Hub went into effect.
Anonymous and Free Docker Hub users are limited to 100 and 200 container image pull requests per six hours, respectively.
Docker Pro and Docker Team accounts continue to have unlimited access to pull container images from Docker Hub. For more information, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

If your application has Docker Hub images that are rate limited, then an error occurs when the rate limit is reached. To avoid rate limiting errors, your users can generate a Docker Hub pull secret (`<app-slug>-kotsadm-dockerhub`) by passing credentials for a Docker Pro and Docker Team with the `kots docker ensure-secret` command.

## Update Your Helm Chart to Access the KOTS Docker Hub Pull Secret

If you are distributing a Helm chart with one or more rate-limited Docker Hub images, any Pod definitions in your chart templates that reference the images must be updated to access the `<app-slug>-kotsadm-dockerhub` pull secret. You can do this by configuring the HelmChart `values` key so that KOTS adds the pull secret in your Helm values during deployment, then updating your chart templates to access the value.

:::note
Skip this task if you distribute your chart with the [HelmChart v1 (Deprecated)](/reference/custom-resource-helmchart) resource, or if your application is not packaged with Helm.
:::

To access the `<app-slug>-kotsadm-dockerhub` pull secret in your Helm chart:

1. In your Helm chart `values.yaml` file, add a value for the KOTS Docker Hub pull secret.

     **Example:**

       ```yaml
       # Helm chart values.yaml file
       image:
         registry: docker.io
         repository: your-org/your-docker-hub-image
         # include the new pullSecrets array
         pullSecrets: []
       ```

1. In your Helm chart templates, update any Pod definitions that reference rate-limited Docker Hub images to include the pull secret.

     **Example:**

        ```yaml
        apiVersion: v1
        kind: Pod
        metadata:
          name: example
        spec:
          containers:
          - name: example
            image: {{ .Values.image.registry }}/{{ .Values.image.repository }}
          # the kotsadm-dockerhub pull secret is accessed from
          # the Helm values and added to this array  
          {{- with .Values.image.pullSecrets }}
          imagePullSecrets:
          {{- toYaml . | nindent 2 }}
          {{- end }}
        ```

1. If you deploy your application as multiple Helm charts, repeat these steps for each chart that references rate-limited Docker Hub images.

1. Package the chart(s) and add them to a new release.

1. In the [`values`](/reference/custom-resource-helmchart-v2#values) key of each [HelmChart v2](/reference/custom-resource-helmchart-v2) resource in the release, add a value with the same name as the one you added to the corresponding chart's `values.yaml`. Set this new value to the `APP_SLUG-kotsadm-dockerhub` pull secret, where `APP_SLUG` is the unique slug for your application.

      **Example:**

      ```yaml
      # HelmChart v2 custom resource
      apiVersion: kots.io/v1beta2
      kind: HelmChart
      metadata:
        name: samplechart
      spec:
        values:
          image:
            registry: docker.io
            repository: your-org/example-docker-hub-image
            # Add a new pullSecrets array with the <app-slug>-kotsadm-dockerhub pull secret
            pullSecrets:
            - name: your-app-slug-kotsadm-dockerhub
      ```

1. Promote the release and install in a development environment. Continue to [Generate the KOTS Docker Hub Pull Secret](#gen-pull-secret) below to test your changes.              

## Generate the KOTS Docker Hub Pull Secret {#gen-pull-secret}

Your end users can pass a username and password for a Docker Hub Pro or Team account using the [`kots docker ensure-secret`](/reference/kots-cli-docker-ensure-secret) command. KOTS uses these credentials to create a Docker Hub image pull secret.

To generate the Docker Hub image pull secret: 

1. In the cluster where the application is installed, run the following command to generate the pull secret:

     ```bash
     kubectl kots docker ensure-secret --dockerhub-username USERNAME --dockerhub-password PASSWORD --namespace NAMESPACE
     ```

     Where:
      * `USERNAME` is the username for the Docker Pro or Docker Team account
      * `PASSWORD` is the password for the account
        :::note
        The Docker Hub username and password are used only to increase rate limits and do not need access to any private repositories on Docker Hub.
        :::
      * `NAMESPACE` is the namespace in the cluster where the application is installed. For Embedded Cluster installations, the application is installed in the `kotsadm` namespace by default.

      For more information, see [docker ensure-secret](/reference/kots-cli-docker-ensure-secret) in the KOTS CLI documentation.

1. Deploy the new version either from the Admin Console or the KOTS CLI.