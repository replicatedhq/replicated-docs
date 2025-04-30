# Avoid Docker Hub Rate Limits

This topic describes how to avoid rate limiting for anonymous and free authenticated use of Docker Hub. The information in this topic applies to applications deployed with Replicated KOTS that have public Docker Hub images that are rate limited.

## Overview

On November 20, 2020, rate limits for anonymous and free authenticated use of Docker Hub went into effect.
Anonymous and Free Docker Hub users are limited to 100 and 200 container image pull requests per six hours, respectively.
Docker Pro and Docker Team accounts continue to have unlimited access to pull container images from Docker Hub.

For more information on rate limits, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

If your application has public Docker Hub images that are rate limited, then an error occurs when the rate limit is reached.

## Prerequisite

For any Helm charts in your application that are deployed with the KOTS HelmChart v2 custom resource, configure the HelmChart v2 custom resource `values` key to add an image pull secret named `APP_SLUG-kotsadm-dockerhub` (where `APP_SLUG` is your application slug) to any Docker images that could be rate-limited. This allows your users to run the `kots docker ensure-secret` command for their installation. 

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
      repository: org-name/example-docker-hub-image
      # Add the dockerhub secret
      pullSecrets:
      - name: gitea-kotsadm-dockerhub
```   

## Provide Docker Hub Credentials with `kots docker ensure-secret`

To avoid errors caused by reaching the Docker Hub rate limit, your users can pass a Docker Hub username and password to the `kots docker ensure-secret` command. The `kots docker ensure-secret` command creates an image pull secret that KOTS can use when pulling Docker Hub images and applies the Secret to application images where necessary.

:::note
The Docker Hub username and password passed with the `kots docker ensure-secret` command are used only to increase rate limits and do not need access to any private repositories on Docker Hub.
:::

1. Run the following command:

     ```bash
     kubectl kots docker ensure-secret --dockerhub-username sentrypro --dockerhub-password password --namespace sentry-pro
     ```
     KOTS then creates a new release sequence for the application to apply the image pull secret to all Kubernetes manifests that have images. 

1. Deploy the new release sequence.

For more information, see [docker ensure-secret](/reference/kots-cli-docker-ensure-secret) in the KOTS CLI documentation.
