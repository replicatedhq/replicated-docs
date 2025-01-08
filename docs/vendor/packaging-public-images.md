# Connecting to an Public Registry

This topic describes how to pull images from public registries using the Replicated proxy registry. This can simplify network access requirements for your customers, as they only need to allowlist a single domain (`proxy.replicated.com` or your custom domain) instead of multiple registry domains.

For more information about the Replicated proxy registry, see [About the Replicated Proxy Registry](private-images-about).

## Pull public images through the Replicated proxy registry

You can use the Replicated proxy registry to pull both public and private images. Using the Replicated proxy registry for public images can simplify network access requirements for your customers, as they only need to whitelist a single domain (`proxy.replicated.com` or your custom domain) instead of multiple registry domains.

For public images, you can use anonymous access without configuring registry credentials. The URL structure for pulling public images is:

```
proxy.replicated.com/anonymous/<upstream registry hostname>/<image>:<tag>
```

### Pulling images

Pull public images from DockerHub (default registry when no registry hostname is specified):

```bash
# DockerHub/index.docker.io is the default when no registry hostname is specified
docker pull proxy.replicated.com/anonymous/busybox
docker pull proxy.replicated.com/anonymous/nginx:1.16.0

# You can also explicitly specify docker.io
docker pull proxy.replicated.com/anonymous/docker.io/replicated/replicated-sdk:1.0.0
```

Pull public images from other registries:

```bash
# Pull from Amazon ECR Public Gallery
docker pull proxy.replicated.com/anonymous/public.ecr.aws/nginx/nginx:latest
```

If you have configured a custom domain for your proxy registry, replace `proxy.replicated.com` with your custom domain in the examples above:

```bash
docker pull {your proxy custom domain}/anonymous/public.ecr.aws/nginx/nginx:latest
```

:::note
When you need to use specific credentials for quasi-public registries, configure the registry as an private external registry first and use `/proxy/` instead of `/anonymous/` in the URL path.
:::

## Related Topic

[Connecting to an External Registry](packaging-private-images)