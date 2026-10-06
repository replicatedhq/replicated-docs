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

Embedded Cluster v3 release files are available for Linux x86-64.

To download the files:

1. Replace `VERSION` with the complete Embedded Cluster v3 release version. Do not include a Kubernetes version suffix. For example, use `3.14.0-beta.1`, not `3.14.0-beta.1+k8s-1.36`.

1. Download the release archive and its Sigstore bundles:

   ```bash
   curl -LO https://tf-embedded-cluster-binaries.s3.us-east-1.amazonaws.com/releases/VERSION-linux-amd64.tgz
   curl -LO https://tf-embedded-cluster-binaries.s3.us-east-1.amazonaws.com/releases/VERSION-linux-amd64.archive.sigstore.json
   curl -LO https://tf-embedded-cluster-binaries.s3.us-east-1.amazonaws.com/releases/VERSION-linux-amd64.binary.sigstore.json
   curl -LO https://tf-embedded-cluster-binaries.s3.us-east-1.amazonaws.com/releases/VERSION-linux-amd64.provenance.sigstore.json
   ```

The archive contains the `cli-linux-amd64`, `daemon-linux-amd64`, and `web-linux-amd64` binaries. Only `cli-linux-amd64` has an individual signature and is an individual subject in the provenance bundle. The archive signature and provenance cover the archive as a whole. Replicated does not publish individual bundles for the other two binaries.

## Verify the release archive signature

Run the following command:

```bash
cosign verify-blob \
  --bundle VERSION-linux-amd64.archive.sigstore.json \
  --certificate-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  VERSION-linux-amd64.tgz
```

Successful verification confirms that the release archive has not changed and that the expected Embedded Cluster release workflow signed it. Cosign returns a nonzero exit status if verification fails. Do not use the archive if verification fails.

## Verify SLSA provenance for the release archive

Run the following command:

```bash
gh attestation verify VERSION-linux-amd64.tgz \
  --repo replicatedhq/ec \
  --bundle VERSION-linux-amd64.provenance.sigstore.json \
  --cert-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
  --cert-oidc-issuer https://token.actions.githubusercontent.com \
  --source-ref refs/tags/VERSION
```

Successful verification confirms that the archive's digest is included in the signed provenance and that the expected Embedded Cluster release workflow produced the attestation.

## Verify the installer binary signature

To verify the installer binary signature:

1. Extract the release archive:

   ```bash
   tar -xzf VERSION-linux-amd64.tgz
   ```

1. Run the following command:

   ```bash
   cosign verify-blob \
     --bundle VERSION-linux-amd64.binary.sigstore.json \
     --certificate-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
     --certificate-oidc-issuer https://token.actions.githubusercontent.com \
     cli-linux-amd64
   ```

Successful verification confirms that the installer binary has not changed and that the expected Embedded Cluster release workflow signed it. Cosign returns a nonzero exit status if verification fails. Do not use the binary if verification fails.

## Verify SLSA provenance for the installer binary

Run the following command:

```bash
gh attestation verify cli-linux-amd64 \
  --repo replicatedhq/ec \
  --bundle VERSION-linux-amd64.provenance.sigstore.json \
  --cert-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
  --cert-oidc-issuer https://token.actions.githubusercontent.com \
  --source-ref refs/tags/VERSION
```

Successful verification confirms that the binary's digest is included in the signed provenance and that the expected Embedded Cluster release workflow produced the attestation. GitHub CLI returns a nonzero exit status if verification fails. Do not use the binary if verification fails.
