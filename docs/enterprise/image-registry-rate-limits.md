# Avoid Docker Hub Rate Limits

This topic describes how to avoid rate limiting for anonymous and free authenticated use of Docker Hub by providing a Docker Hub username and password to the `kots docker ensure-secret` command.

## Overview

On November 20, 2020, rate limits for anonymous and free authenticated use of Docker Hub went into effect.
Anonymous and Free Docker Hub users are limited to 100 and 200 container image pull requests per six hours, respectively.
Docker Pro and Docker Team accounts continue to have unlimited access to pull container images from Docker Hub. For more information on rate limits, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

If your application has public Docker Hub images that are rate limited, then an error occurs when the rate limit is reached. To avoid these errors, your users can pass a Docker Hub username and password to the `kots docker ensure-secret` command. This creates an `<app-slug>-kotsadm-dockerhub` secret for pulling Docker Hub images and applies the secret to Kubernetes manifests that have images. For more information about this command, see [Avoiding Docker Hub Rate Limits](/enterprise/image-registry-rate-limits).

If you are deploying a Helm chart with Docker Hub images that could be rate limited, any Pod definitions in your Helm chart templates that reference the rate-limited image must be updated to access the `<app-slug>-kotsadm-dockerhub` pull secret.

## Inject the Docker Hub Pull Secret

For installations with HelmChart v2, you need to configure the `values` key of the HelmChart v2 custom resource to ensure that the KOTS Docker Hub pull secret is added to any Pod definitions that reference rate-limited Docker Hub images. This allows your users to run the `kots docker ensure-secret` command.

To configure the HelmChart v2 custom resource:

1. For each  HelmChart v2 resource in your release, configure the [`values`](/reference/custom-resource-helmchart-v2#values) key to add a new value with the KOTS `APP_SLUG-kotsadm-dockerhub` pull secret, where `APP_SLUG` is your unique application slug.

      **Example:**

      ```yaml
      # kots.io/v1beta2 HelmChart custom resource
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

1. Ensure that there is a matching value in each of the corresponding Helm chart `values.yaml` files.

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

## Provide Docker Hub Credentials

To create an image pull secret for pulling Docker Hub images and apply the secret to all 

1. Run the following command to create an image pull secret that KOTS can use when pulling Docker Hub images:

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

     After `kots docker ensure-secret` runs, KOTS automatically creates a new release sequence for the application.

1. Deploy the new release sequence either from the Admin Console or the KOTS CLI.
   
    This ensures the image pull secret is applied to all Pod definitions that reference .