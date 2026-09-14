# Validate Troubleshoot CLI provenance

This topic describes how to use Cosign to verify keyless Supply Chain Levels for Software Artifacts (SLSA) provenance for Troubleshoot CLI release archives.

## About Troubleshoot CLI provenance

Troubleshoot releases include a Sigstore bundle containing signed SLSA provenance for the `preflight` and `support-bundle` CLI archives beginning with release 0.134.1. The provenance associates each release archive's digest with the Troubleshoot release workflow and release tag that produced it. The keyless signature uses a short-lived certificate issued through the GitHub Actions OpenID Connect (OIDC) identity.

To verify a Troubleshoot CLI archive, download the archive and its Sigstore bundle from the same release. Then, use Cosign to confirm that the archive's digest is included in the signed provenance and that the expected workflow identity produced the attestation.

For information about validating Replicated container images, see [Validate image provenance](/vendor/image-provenance-validating). For information about validating SBOM signatures, see [Validate SBOM signatures](/vendor/sbom-validating).

## Prerequisite

Before you perform this task, install [Cosign](https://github.com/sigstore/cosign). These instructions were tested with Cosign v3.1.3.

## Validate a Troubleshoot CLI archive

Troubleshoot releases provide the `preflight` and `support-bundle` CLIs for multiple operating systems and architectures.

To validate a Troubleshoot CLI archive:

1. Go to [Troubleshoot releases](https://github.com/replicatedhq/troubleshoot/releases) and select the release that you want to validate.

1. Download one `preflight` or `support-bundle` archive and the `troubleshoot_VERSION_provenance.sigstore.json` bundle from the same release.

   Unlike Troubleshoot checksum filenames, the provenance bundle filename includes the `v` prefix from the release tag.

1. In the following command, replace the following placeholder values, and then run the command:

   - Replace `VERSION` in both the bundle filename and `refs/tags/VERSION` with the complete release tag, including the `v` prefix. For example, `v0.134.1`.
   - Replace `ARCHIVE` with the name of the downloaded archive. Linux and macOS archives use `.tar.gz`, and Windows archives use `.zip`. For example, `preflight_linux_amd64.tar.gz` or `preflight_windows_amd64.zip`.

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
