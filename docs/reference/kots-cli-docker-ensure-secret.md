# docker ensure-secret

Creates an image pull secret that the Admin Console can utilize in case of [rate limiting](../enterprise/image-registry-rate-limits).
Will validate the credentials before creating the image pull secret.
Running this command will create a new application version based on the latest one with the new pull secrets added to all kubernetes specs that have images.
In order for this secret to take effect, the new version must be deployed.

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
