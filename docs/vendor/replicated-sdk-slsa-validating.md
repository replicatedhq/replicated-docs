# Validate provenance of releases for the Replicated SDK

This topic describes how to verify the authenticity and integrity of Replicated SDK container images using SLSA provenance, image signatures, and Software Bill of Materials (SBOM) attestations.

## About supply chain levels for software artifacts (SLSA)

[Supply Chain Levels for Software Artifacts (SLSA)](https://slsa.dev/), pronounced "salsa," is a security framework that comprises standards and controls designed to prevent tampering, enhance integrity, and secure software packages and infrastructure.

## Purpose of attestations

Attestations enable the inspection of an image to determine its origin, the identity of its creator, the creation process, and its contents. When building software using the Replicated SDK, the image's SBOM and SLSA-based provenance attestations empower your customers to make informed decisions regarding the impact of an image on the supply chain security of your application.

The Replicated SDK build process uses Chainguard's Wolfi-based images to minimize the number of CVEs. The build process automatically generates:
- SLSA provenance attestations
- Image signatures
- SBOM

## About the SDK image verification lifecycle

Replicated SDK images are published in two phases, and the verification method depends on which phase an image is in:

1. **Original release build.** When a new SDK version is released, Replicated builds the image through its own pipeline, which attaches:
    - SLSA L3 provenance from the GitHub Actions build
    - A cosign signature using Replicated's environment-specific keys
    - An SBOM attestation signed with the same keys

    During this phase, verify images using [Verify an original SDK release image](#verify-original) below.

1. **SecureBuild rebuild.** Approximately six hours after a release, [SecureBuild](https://securebuild.com/) rebuilds the image against the latest upstream package versions to remediate any newly-disclosed CVEs. This rebuild produces a new image digest signed with SecureBuild's keyless identity (Sigstore Fulcio and Rekor, backed by a GCP service account). After this rebuild, the upstream verification script fails because the digest, signing identity, and provenance builder have all changed.

    During this phase, verify images using [Verify a SecureBuild-rebuilt SDK image](#verify-securebuild) below.

This lifecycle reflects a trade-off between provenance continuity and CVE remediation: SLSA provenance is bound to a specific build pipeline and digest, so any rebuild by a different builder requires a new attestation chain. Both verification paths provide equivalent cryptographic guarantees, only with different trust anchors.

## Prerequisites

Before performing these tasks, install the following tools:
- [cosign](https://github.com/sigstore/cosign)
- [jq](https://stedolan.github.io/jq/)
- [slsa-verifier](https://github.com/slsa-framework/slsa-verifier) (only required for the original release build)

## Verify an original SDK release image {#verify-original}

Use this method when verifying a Replicated SDK image during the window between the original release and the SecureBuild rebuild.

### Use the verification script

Replicated provides a verification script in the replicated-sdk repository that you can use directly or as a basis for your own verification automation. The script is located at https://github.com/replicatedhq/replicated-sdk/blob/main/certs/verify-image.sh.

The verification script performs three security checks:
1. SLSA provenance verification
1. Image signature verification
1. SBOM attestation verification

**Usage:**
```bash
./verify-image.sh [OPTIONS]

Required Arguments:
  -e, --env ENV      Environment to verify (dev|stage|prod)
  -v, --version VER  Version to verify
  -d, --digest DIG   Image digest to verify

Optional Arguments:
  --show-sbom       Show full SBOM content
  -h, --help        Show this help message
```

**Example:**
```bash
./verify-image.sh --env prod \
  --version 1.5.3 \
  --digest sha256:7cb8e0c8e0fba8e4a7157b4fcef9e7345538f7543a4e5925bb8b30c9c1375400
```

### Verification process

The script performs the following checks:

1. **SLSA provenance verification:**
   - Validates the build chain integrity
   - Verifies that the build was performed through the secure build pipeline
   - Displays build details

1. **Image signature verification:**
   - Uses environment-specific public keys for verification
   - The replicated-sdk repository contains the public keys in the `certs` directory. For example, the `cosign-prod.pub` key validates a production release of the SDK.

1. **SBOM attestation verification:**
   - Validates the SBOM
   - Displays SBOM details, including:
      - Document name
      - Creation timestamp
      - Creator information
      - Total number of packages
   - Optionally shows full SBOM content with the `--show-sbom` flag

## Verify a SecureBuild-rebuilt SDK image {#verify-securebuild}

Use this method when verifying a Replicated SDK image after SecureBuild has rebuilt it (approximately six hours after the release). SecureBuild rebuilds produce a new digest signed using keyless signing through Sigstore Fulcio and Rekor.

### Use the verification script

SecureBuild provides a verification script in the securebuild repository that you can use directly or as a basis for your own verification automation. The script is located at https://github.com/securebuildhq/securebuild/blob/main/scripts/verify-securebuild-image.sh.

The verification script performs three security checks against the SecureBuild signing identity:
1. SLSA v1.0 provenance verification
1. Cosign image signature verification
1. SBOM (SPDX) attestation verification

Contact your Replicated account team for the SecureBuild signing identity (a GCP service account email) that applies to your images.

**Usage:**
```bash
./verify-securebuild-image.sh <image-with-digest> [--identity <email>] [--issuer <url>]

Arguments:
  image-with-digest   Image reference with digest (for example, registry.example.com/image@sha256:abc123)

Options:
  --identity <email>  Fulcio certificate identity (GCP service account email).
                      Can also be set with the SECUREBUILD_IDENTITY environment variable.
  --issuer <url>      OIDC issuer URL. Default: https://accounts.google.com.
                      Can also be set with the SECUREBUILD_OIDC_ISSUER environment variable.
  --help              Show this help message.
```

**Example:**
```bash
./verify-securebuild-image.sh \
  registry.replicated.com/library/replicated-sdk-image@sha256:0a83d01a984fb8d77db882648461021d9cef97113bf6332cc939b30d291a09a3 \
  --identity attestor@your-securebuild-project.iam.gserviceaccount.com
```

To get the digest for a tag, run `crane digest <image:tag>`.

### Verification process

The script performs the following checks:

1. **SLSA provenance verification:**
   - Runs `cosign verify-attestation --type https://slsa.dev/provenance/v1` against the image
   - Validates that the attestation was signed by the SecureBuild keyless identity
   - Displays build details, including the build type, builder ID, build ID, and start and finish timestamps

1. **Image signature verification:**
   - Runs `cosign verify` against the image using the SecureBuild keyless identity
   - Confirms that the image was signed by SecureBuild through Fulcio and recorded in the Rekor transparency log

1. **SBOM attestation verification:**
   - Runs `cosign verify-attestation --type https://spdx.dev/Document` against the image
   - Validates that the SPDX SBOM attestation was signed by the SecureBuild keyless identity

For more information about the SDK release process, see [Manage releases with the Vendor Portal](/vendor/releases-creating-releases).
