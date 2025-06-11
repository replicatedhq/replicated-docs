# Validate Provenance of Releases for the Replicated SDK

This topic describes how to verify the authenticity and integrity of Replicated SDK container images using SLSA provenance, image signatures, and Software Bill of Materials (SBOM) attestations.

## About Supply Chain Levels for Software Artifacts (SLSA)

[Supply Chain Levels for Software Artifacts (SLSA)](https://slsa.dev/), pronounced "salsa," is a security framework that comprises standards and controls designed to prevent tampering, enhance integrity, and secure software packages and infrastructure.

## Purpose of Attestations

Attestations enable the inspection of an image to determine its origin, the identity of its creator, the creation process, and its contents. When building software using the Replicated SDK, the image's Software Bill of Materials (SBOM) and SLSA-based provenance attestations empower your customers to make informed decisions regarding the impact of an image on the supply chain security of your application.

The Replicated SDK build process uses Chainguard's Wolfi-based images to minimize the number of CVEs. The build process automatically generates:
- SLSA provenance attestations
- Image signatures 
- Software Bill of Materials (SBOM)

## Prerequisites
Before performing these tasks, install the following tools:
- [slsa-verifier](https://github.com/slsa-framework/slsa-verifier)
- [cosign](https://github.com/sigstore/cosign)
- [jq](https://stedolan.github.io/jq/)

## Verify SDK Image Integrity
### Using the Verification Script
Replicated provides a verification script within the replicated-sdk repo that you can use directly or use it as a basis to develop your own verification automation. The script is located at https://github.com/replicatedhq/replicated-sdk/blob/main/certs/verify-image.sh

The verification script performs three key security checks:
1. SBOM attestation verification
2. SLSA Provenance verification
3. Image signature verification

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

### Verification Process

The script performs the following checks:

1. **SLSA Provenance Verification**
   - Validates the build chain integrity
   - Verifies the build was performed through the secure build pipeline
   - Displays build details

2. **Image Signature Verification**
   - Uses environment-specific public keys for verification
   - The repo contains the public located in the /certs directory. For example the `cosign-prod.pub` key is used to validate a production release of the SDK.

3. **SBOM Attestation Verification**
   - Validates the Software Bill of Materials
   - Displays SBOM details including:
     - Document name
     - Creation timestamp
     - Creator information
     - Total number of packages
   - Optionally shows full SBOM content with `--show-sbom` flag

For more information about the SDK release process and security measures, see the [Replicated SDK Release Process documentation](https://docs.replicated.com/vendor/releases-creating).
