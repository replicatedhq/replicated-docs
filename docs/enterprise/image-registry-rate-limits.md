# Avoiding Docker Hub Rate Limits

On November 20, 2020, rate limits for anonymous and free authenticated use of Docker Hub went into effect.
Anonymous and Free Docker Hub users are limited to 100 and 200 container image pull requests per six hours.
Docker Pro and Docker Team accounts continue to have unlimited access to pull container images from Docker Hub.

For more information on rate limits, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

In Replicated v1.44.0 and later, Docker Hub username and password can be passed to the `kots docker ensure-secret` CLI command, which will create an image pull secret that the admin console can utilize when pulling images to avoid rate limits.
These credentials are only used to increase limits and do not need access to any private repositories on Docker Hub.

Example:

```bash
kubectl kots docker ensure-secret --dockerhub-username sentrypro --dockerhub-password password --namespace sentry-pro
```

For more information, see [kots docker ensure-secret](https://kots.io/kots-cli/docker/ensure-permissions/) in the kots CLI documentation.
