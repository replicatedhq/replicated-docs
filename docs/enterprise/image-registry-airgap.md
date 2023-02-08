import DockerCompatibility from "../partials/image-registry/_docker-compatibility.mdx"

# Image Registry Requirements for Air Gap Clusters

The app manager can be used to download and prepare an application to be installed onto a secured, air gapped Kubernetes cluster.
When doing this, there are a few additional steps and configuration needed.

## Docker Image Registry Requirements for Air Gapped Clusters

To install an application into an air gapped network, you must have a Docker image registry that is available inside the network.
The app manager rewrites the application image names in all application manifests to read from the on-premises registry, and it re-tags and pushes the images to the on-premises registry.
When authenticating to the registry, credentials with `push` permissions are required.

A single application expects to use a single namespace in the Docker image registry.

The namespace name can be any valid URL-safe string, supplied at installation time.
Keep in mind that a registry typically expects the namespace to exist before any images can be pushed into it.

:::note
ECR does not use namespaces.
:::

## Docker Image Registry Compatibility

The app manager has been tested for compatibility with the following registries:

<DockerCompatibility/>
