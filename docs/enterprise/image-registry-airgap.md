# Image registry for air gap clusters

Kots can be used to download and prepare an application to be installed onto a secured, airgapped Kubernetes cluster.
When doing this, there are a few additional steps and configuration needed.

## Docker image registry requirements

To install an application into an airgapped network, you must have a docker image registry that’s available inside the network.
Kots will manage rewriting the application image names in all application manifests to read from the on-prem registry, and it will retag and push the images to the on-prem registry.
When authenticating to the registry, credentials with `push` permissions are required.

A single Kots application expects to use a single “namespace” in the docker image registry.

The namespace name can be any valid URL-safe string, supplied at installation time.
Keep in mind that a registry typically expects the namespace to exist before any images can be pushed into it.

NOTE: ECR does not use namespaces.

## Docker image registry compatibility

Kots has been tested for compatibility with the following registries:

- Docker Hub

  **Note**: To avoid the November 20, 2020 Docker Hub rate limits, use the `kots docker ensure-secret` CLI command. For more information, see [Avoiding Docker Hub Rate Limits](image-registry-rate-limits).
- Quay
- Amazon Elastic Container Registry (ECR)
- Google Container Registry (GCR)
- Harbor
- Sonatype Nexus
