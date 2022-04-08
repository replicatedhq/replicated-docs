# docker ensure-secret

Creates an image pull secret for Docker Hub that the Admin Console can utilize to avoid [rate limiting](../enterprise/image-registry-rate-limits).
The credentials are validated before creating the image pull secret.
Running this command creates a new application version, based on the latest version, with the new image pull secret added to all Kubernetes manifests that have images.
In order for this secret to take effect to avoid rate limiting, the new version must be deployed.

### Usage

```bash
kubectl kots docker ensure-secret [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| ----------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for ensure-secret |
| `--dockerhub-username` | string | DockerHub username to be used _(required)_ |
| `--dockerhub-password` | string | DockerHub password to be used _(required)_ |
| `-n, --namespace`      | string | the namespace where the admin console is running _(required)_ |

### Example

```bash
kubectl kots docker ensure-secret --dockerhub-username sentrypro --dockerhub-password password --namespace sentry-pro
```
