# Validate SBOM signatures

This topic describes how to validate software bill of materials (SBOM) signatures for Replicated KOTS, Replicated kURL, Troubleshoot, and Embedded Cluster v3 releases.

## About Software Bills of Materials

A _software bill of materials_ (SBOM) is an inventory of all components used to create a software package. SBOMs have emerged as critical building blocks in software security and software supply chain risk management.

When you install software, validating an SBOM signature can help you understand exactly what the software package is installing. This information can help you ensure that the files are compatible with your licensing policies and help determine whether there is exposure to CVEs.

For information about validating SLSA provenance and image signatures for Replicated images, see [Validate container image provenance](/vendor/image-provenance-validating).

For information about validating Embedded Cluster v3 release archives and installer binaries, see [Validate Embedded Cluster v3 release files](/vendor/embedded-cluster-v3-release-files-validating).

## Prerequisite

Before you perform these tasks, install cosign v3. For more information, see the [sigstore repository](https://github.com/sigstore/cosign) in GitHub.


## Validate a KOTS SBOM signature

Each KOTS release includes a signed SBOM for KOTS Go dependencies. 

To validate a KOTS SBOM signature:

1. Go to the [KOTS GitHub repository](https://github.com/replicatedhq/kots/releases) and download the specific KOTS release that you want to validate.
1. Extract the tar.gz file.

    **Example:**

    ```
    tar -zxvf kots_darwin_all.tar.gz
    ```
    A KOTS binary and SBOM folder are created.
    The SBOM folder contains the following files:

    - `kots-sbom.tgz` contains the SBOM for KOTS Go dependencies
    - `kots-sbom.tgz.bundle` contains the signature and verification material for the SBOM
    - `key.pub` is the public key used to verify the SBOM signature
1. Run the following cosign command to validate the signatures:
    ```
    cosign verify-blob --key sbom/key.pub --bundle sbom/kots-sbom.tgz.bundle sbom/kots-sbom.tgz
    ```

## Validate a kURL SBOM signature

If a kURL installer is used, then signed SBOMs for kURL Go and Javascript dependencies are combined into a TAR file and are included with the release.

To validate a kURL SBOM signature:

1. Go to the [kURL GitHub repository](https://github.com/replicatedhq/kURL/releases) and download the specific kURL release files that you want to validate. 

    There are three assets related to the SBOM:

    - `kurl-sbom.tgz` contains SBOMs for Go and Javascript dependencies
    - `kurl-sbom.tgz.bundle` contains the signature and verification material for `kurl-sbom.tgz`
    - `key.pub` is the public key from the key pair used to `sign kurl-sbom.tgz`

2. Run the following cosign command to validate the signature:

    ```bash
    cosign verify-blob --key key.pub --bundle kurl-sbom.tgz.bundle kurl-sbom.tgz
    ```

## Validate a Troubleshoot SBOM signature

A signed SBOM for Troubleshoot dependencies is included in each release.

To validate a Troubleshoot SBOM signature:

1. Go to the [Troubleshoot GitHub repository](https://github.com/replicatedhq/troubleshoot/releases) and download the specific Troubleshoot release files that you want to validate.

    There are three assets related to the SBOM:

    - `troubleshoot-sbom.tgz` contains a software bill of materials for Troubleshoot.
    - `troubleshoot-sbom.tgz.bundle` contains the signature and verification material for `troubleshoot-sbom.tgz`.
    - `key.pub` is the public key from the key pair used to sign `troubleshoot-sbom.tgz`.

2. Run the following cosign command to validate the signature:

    ```bash
    cosign verify-blob --key key.pub --bundle troubleshoot-sbom.tgz.bundle troubleshoot-sbom.tgz
    ```

## Validate an Embedded Cluster v3 SBOM signature

Beginning with release 3.14.0-beta.1, each Embedded Cluster v3 release includes an SBOM for the Go and npm dependencies used to build Embedded Cluster v3.

To validate an Embedded Cluster v3 SBOM signature:

1. Replace `VERSION` with the complete Embedded Cluster v3 release version. Do not include a Kubernetes version suffix. For example, use `3.14.0-beta.1`, not `3.14.0-beta.1+k8s-1.36`.

1. Download the SBOM archive and its Sigstore bundle:

   ```bash
   curl -LO https://tf-embedded-cluster-binaries.s3.us-east-1.amazonaws.com/releases/VERSION-sbom.tgz
   curl -LO https://tf-embedded-cluster-binaries.s3.us-east-1.amazonaws.com/releases/VERSION-sbom.sigstore.json
   ```

   The SBOM archive contains `ec-VERSION-sbom.spdx.json` in SPDX JSON format.

1. Run the following command:

   ```bash
   cosign verify-blob \
     --bundle VERSION-sbom.sigstore.json \
     --certificate-identity "https://github.com/replicatedhq/ec/.github/workflows/release.yml@refs/tags/VERSION" \
     --certificate-oidc-issuer https://token.actions.githubusercontent.com \
     VERSION-sbom.tgz
   ```

Successful verification confirms that the SBOM archive has not changed and that the expected Embedded Cluster release workflow signed it. Cosign returns a nonzero exit status if verification fails. Do not use the SBOM if verification fails.
