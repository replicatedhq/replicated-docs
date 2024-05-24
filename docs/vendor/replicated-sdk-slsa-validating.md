import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# SLSA Provenance Validation Process for the Replicated SDK

This topic describes the process to perform provenance validation on the Replicated SDK.

## About Supply Chain Levels for Software Artifacts (SLSA)

[Supply Chain Levels for Software Artifacts (SLSA)](https://slsa.dev/), pronounced “salsa,” is a security framework that comprises standards and controls designed to prevent tampering, enhance integrity, and secure software packages and infrastructure.


## Purpose of Attestations
Attestations enable the inspection of an image to determine its origin, the identity of its creator, the creation process, and its contents. When building software using the Replicated SDK, the image’s Software Bill of Materials (SBOM) and SLSA-based provenance attestations empower your customers to make informed decisions regarding the impact of an image on the supply chain security of your application. This process ultimately enhances the security and assurances provided to both vendors and end customers.

## Prerequisite
Before you perform these tasks, you must install [slsa-verifier](https://github.com/slsa-framework/slsa-verifier) and [crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md).

## Validate the SDK SLSA Attestations

The Replicated SDK build process utilizes Wolfi-based images to minimize the number of CVEs. The build process automatically generates SBOMs and attestations, and then publishes the image along with these metadata components. For instance, you can find all the artifacts readily available on [DockerHub](https://hub.docker.com/r/replicated/replicated-sdk/tags). The following shell script is a tool to easily validate the SLSA attestations for a given Replicated SDK image.

```
#!/bin/bash

# This script verifies the SLSA metadata of a container image
#
# Requires
# - slsa-verifier (https://github.com/slsa-framework/slsa-verifier)
# - crane (https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md)
#


# Define the image and version to verify
VERSION=v1.0.0-beta.20
IMAGE=replicated/replicated-sdk:${VERSION}

# expected source repository that should have produced the artifact, e.g. github.com/some/repo
SOURCE_REPO=github.com/replicatedhq/replicated-sdk


# Use `crane` to retrieve the digest of the image without pulling the image
IMAGE_WITH_DIGEST="${IMAGE}@"$(crane digest "${IMAGE}")

echo "Verifying artifact"
echo "Image: ${IMAGE_WITH_DIGEST}"
echo "Source Repo: ${SOURCE_REPO}"

slsa-verifier verify-image "${IMAGE_WITH_DIGEST}" \
    --source-uri ${SOURCE_REPO} \
    --source-tag ${VERSION} 

```
