# Avoiding Docker Hub Rate Limits

This topic describes how to avoid rate limiting for anonymous and free authenticated use of Docker Hub by providing a Docker Hub username and password to the `kots docker ensure-secret` command.

## Overview

On November 20, 2020, rate limits for anonymous and free authenticated use of Docker Hub went into effect.
Anonymous and Free Docker Hub users are limited to 100 and 200 container image pull requests per six hours, respectively.
Docker Pro and Docker Team accounts continue to have unlimited access to pull container images from Docker Hub.

For more information on rate limits, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

## Provide Docker Hub Credentials

If the application that you are installing or upgrading has public Docker Hub images that are rate limited, then an error can occur when the rate limit is reached because Replicated KOTS attempts to use the Replicated proxy service to access the rate-limited image.

To avoid errors caused by reaching the Docker Hub rate limit, a Docker Hub username and password can be passed to the `kots docker ensure-secret` command. The Docker Hub username and password are used only to increase rate limits and do not need access to any private repositories on Docker Hub.

The `kots docker ensure-secret` command creates an image pull secret that KOTS can use when pulling images and applies the image pull secret to all Kubernetes manifests that have images.

Example:

```bash
kubectl kots docker ensure-secret --dockerhub-username sentrypro --dockerhub-password password --namespace sentry-pro
```

For more information, see [docker ensure-secret](/reference/kots-cli-docker-ensure-secret) in the kots CLI documentation.
