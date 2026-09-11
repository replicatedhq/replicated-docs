# Validate CLI provenance

This topic describes how to use Cosign to verify keyless Supply Chain Levels for Software Artifacts (SLSA) provenance for Replicated CLI release archives.

## About CLI provenance

Replicated CLI releases can include a Sigstore bundle containing signed SLSA provenance. The provenance associates each release archive's digest with the workflow and release tag that produced it. The keyless signature uses a short-lived certificate issued through the build system's OpenID Connect (OIDC) identity.

To verify a CLI archive, download the archive and its Sigstore bundle from the same release. Then, use Cosign to confirm that the archive's digest is included in the signed provenance and that the expected workflow identity produced the attestation.

For information about validating Replicated container images, see [Validate image provenance](/enterprise/image-provenance-validating). For information about validating SBOM signatures, see [Validate SBOM signatures](/enterprise/sbom-validating).

## Prerequisite

Before you perform this task, install [Cosign](https://github.com/sigstore/cosign) v3.1.3 or later.

## Validate Troubleshoot CLI provenance

Troubleshoot releases provide the `preflight` and `support-bundle` CLIs for multiple operating systems and architectures. CLI provenance is available for Troubleshoot release 0.135.0 and later. Each supported release includes a `troubleshoot_VERSION_provenance.sigstore.json` bundle containing signed SLSA provenance for all `preflight` and `support-bundle` archives in that release.

To validate a Troubleshoot CLI archive:

1. Go to [Troubleshoot releases](https://github.com/replicatedhq/troubleshoot/releases) and select the release that you want to validate.

1. Download one `preflight` or `support-bundle` archive and the `troubleshoot_VERSION_provenance.sigstore.json` bundle from the same release.

1. In the following command, replace:

   - `VERSION` with the complete release tag, including the `v` prefix. For example, `v0.135.0`.
   - `ARCHIVE` with the name of the downloaded archive. For example, `preflight_linux_amd64.tar.gz`.

1. Run:

   ```bash
   cosign verify-blob-attestation \
     --bundle troubleshoot_VERSION_provenance.sigstore.json \
     --type https://slsa.dev/provenance/v1 \
     --certificate-identity "https://github.com/replicatedhq/troubleshoot/.github/workflows/release.yaml@refs/tags/VERSION" \
     --certificate-oidc-issuer https://token.actions.githubusercontent.com \
     ARCHIVE
   ```

Successful verification confirms that the archive's digest is included in the signed SLSA provenance. It also confirms that the expected Troubleshoot release workflow produced the attestation for the selected tag. Cosign verifies the signing certificate and transparency log information in the Sigstore bundle.

Cosign returns a nonzero exit status if verification fails. Do not use the archive if verification fails.
