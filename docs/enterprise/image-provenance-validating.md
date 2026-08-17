# Validate image provenance

This topic describes how to verify the authenticity and integrity of Replicated container images, including Supply Chain Levels for Software Artifacts (SLSA) provenance, image signatures, and Software Bill of Materials (SBOM) attestations.

## About SLSA and SBOMs

[SLSA](https://slsa.dev/), pronounced "salsa," is a security framework that provides standards and controls designed to prevent tampering, improve integrity, and secure software packages and infrastructure. SLSA provenance provides information about an image's origin, creator, and build process.

An SBOM is an inventory of the components used to create an image. A signed SBOM attestation helps you confirm the contents of an image and assess its exposure to vulnerabilities.

Because signatures and attestations apply to a specific image digest, Replicated recommends verifying images by digest.

## KOTS images

The following KOTS images have SLSA provenance attestations, image signatures, and SBOM attestations:

- `index.docker.io/kotsadm/kotsadm`
- `index.docker.io/kotsadm/kotsadm-migrations`
- `index.docker.io/kotsadm/kurl-proxy`

## Replicated SDK images

The following Replicated SDK image has SLSA provenance attestations, image signatures, and SBOM attestations:

- `proxy.replicated.com/library/replicated-sdk-image`

## Validate an image

Before performing these tasks, install [cosign](https://github.com/sigstore/cosign) v3.

The KOTS and Replicated SDK images are signed with the following identity:

- Certificate identity: `sb-attestor@cve0-issuer.iam.gserviceaccount.com`
- OpenID Connect (OIDC) issuer: `https://accounts.google.com`

In the following commands, replace `IMAGE` with one of the image names listed above and replace `IMAGE_DIGEST` with the digest of the image that you want to verify.

### Verify SLSA provenance

Run:

```bash
cosign verify-attestation \
  --type https://slsa.dev/provenance/v1 \
  --certificate-identity sb-attestor@cve0-issuer.iam.gserviceaccount.com \
  --certificate-oidc-issuer https://accounts.google.com \
  IMAGE@sha256:IMAGE_DIGEST
```

Successful verification confirms that the provenance attestation applies to the image and was signed by the expected identity. The command also verifies the signing certificate and the attestation's inclusion in the Rekor transparency log.

### Verify the image signature

Run:

```bash
cosign verify \
  --certificate-identity sb-attestor@cve0-issuer.iam.gserviceaccount.com \
  --certificate-oidc-issuer https://accounts.google.com \
  IMAGE@sha256:IMAGE_DIGEST
```

### Verify the SBOM attestation

Run:

```bash
cosign verify-attestation \
  --type https://spdx.dev/Document \
  --certificate-identity sb-attestor@cve0-issuer.iam.gserviceaccount.com \
  --certificate-oidc-issuer https://accounts.google.com \
  IMAGE@sha256:IMAGE_DIGEST
```
