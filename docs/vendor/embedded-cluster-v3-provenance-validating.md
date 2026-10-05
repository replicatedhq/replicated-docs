# Validate Embedded Cluster v3 release files

This topic describes how to verify signatures and Supply Chain Levels for Software Artifacts (SLSA) provenance for Replicated Embedded Cluster v3 release files.

Beginning with release 3.14.0-beta.1, Replicated publishes the following verification material for each Embedded Cluster v3 release archive:

- A Sigstore bundle for the release archive signature
- A Sigstore bundle for the signature of the installer binary in the archive
- A Sigstore bundle containing SLSA provenance for both files

## Prerequisite

Before you perform these tasks, install the following tools:

- [Cosign](https://github.com/sigstore/cosign) v3.1.3 or later to verify file signatures
- [GitHub CLI](https://cli.github.com/) to verify SLSA provenance

## Download the release files

Embedded Cluster v3 release files are available for Linux AMD64, Linux ARM64, macOS, and Windows AMD64.

To download the files:

1. Choose a version and platform from the following table:

   | Platform | Release archive | Installer binary in the archive |
   | --- | --- | --- |
   | Linux AMD64 | `VERSION-linux-amd64.tgz` | `cli-linux-amd64` |
   | Linux ARM64 | `VERSION-linux-arm64.tgz` | `cli-linux-arm64` |
   | macOS | `VERSION-darwin-all.tgz` | `cli-darwin-all` |
   | Windows AMD64 | `VERSION-windows-amd64.zip` | `cli-windows-amd64.exe` |

   Replace `VERSION` with the complete Embedded Cluster v3 release version. Do not include a Kubernetes version suffix. For example, use `3.14.0-beta.1`, not `3.14.0-beta.1+k8s-1.36`.

1. Download the release archive from the following location:

   ```text
   https://tf-embedded-cluster-binaries.s3.us-east-1.amazonaws.com/releases/ARCHIVE
   ```

   Replace `ARCHIVE` with the release archive filename from the preceding table.

1. Download the following Sigstore bundles from the same location. Replace `VERSION-PLATFORM` with the archive filename without the `.tgz` or `.zip` extension.

   ```text
   VERSION-PLATFORM.archive.sigstore.json
   VERSION-PLATFORM.binary.sigstore.json
   VERSION-PLATFORM.provenance.sigstore.json
   ```

## Verify the release archive signature

In the following command, replace `VERSION`, `PLATFORM`, and `ARCHIVE` with the values for the release that you downloaded:

```bash
cosign verify-blob \
  --bundle VERSION-PLATFORM.archive.sigstore.json \
  --certificate-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  ARCHIVE
```

Successful verification confirms that the release archive has not changed and that the expected Embedded Cluster release workflow signed it. Cosign returns a nonzero exit status if verification fails. Do not use the archive if verification fails.

## Verify SLSA provenance for the release archive

In the following command, replace `VERSION`, `PLATFORM`, and `ARCHIVE` with the values for the release that you downloaded:

```bash
gh attestation verify ARCHIVE \
  --repo replicatedhq/ec \
  --bundle VERSION-PLATFORM.provenance.sigstore.json \
  --cert-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
  --cert-oidc-issuer https://token.actions.githubusercontent.com \
  --source-ref refs/tags/VERSION
```

Successful verification confirms that the archive's digest is included in the signed provenance and that the expected Embedded Cluster release workflow produced the attestation.

## Verify the installer binary signature

To verify the installer binary signature:

1. Extract the release archive.

   For Linux or macOS, run:

   ```bash
   tar -xzf ARCHIVE
   ```

   For Windows, extract the `.zip` archive.

1. In the following command, replace `VERSION`, `PLATFORM`, and `BINARY` with the values for the release that you downloaded:

   ```bash
   cosign verify-blob \
     --bundle VERSION-PLATFORM.binary.sigstore.json \
     --certificate-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
     --certificate-oidc-issuer https://token.actions.githubusercontent.com \
     BINARY
   ```

Successful verification confirms that the installer binary has not changed and that the expected Embedded Cluster release workflow signed it. Cosign returns a nonzero exit status if verification fails. Do not use the binary if verification fails.

## Verify SLSA provenance for the installer binary

In the following command, replace `VERSION`, `PLATFORM`, and `BINARY` with the values for the release that you downloaded:

```bash
gh attestation verify BINARY \
  --repo replicatedhq/ec \
  --bundle VERSION-PLATFORM.provenance.sigstore.json \
  --cert-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
  --cert-oidc-issuer https://token.actions.githubusercontent.com \
  --source-ref refs/tags/VERSION
```

Successful verification confirms that the binary's digest is included in the signed provenance and that the expected Embedded Cluster release workflow produced the attestation. GitHub CLI returns a nonzero exit status if verification fails. Do not use the binary if verification fails.
