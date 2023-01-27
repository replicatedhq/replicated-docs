# Validating SBOM Signatures

This topic describes the process to perform the validation of software bill of material (SBOM) signatures for Replicated app manager (KOTS), Kubernetes installers (kURL), and Troubleshoot releases.

## About Software Bills of Materials

A _software bill of materials_ (SBOM) is an inventory of all components used to create a software package. SBOMs have emerged as critical building blocks in software security and software supply chain risk management.

When you install software, validating an SBOM signature can help you understand exactly what the software package is installing. This information can help you ensure that the files are compatible with your licensing policies and help determine whether there is exposure to CVEs.

## Prerequisite

Before you perform these tasks, you must install cosign. For more information, see the [sigstore repository](https://github.com/sigstore/cosign) in GitHub.


## Validate a KOTS SBOM Signature

Each KOTS release includes a signed SBOM for KOTS Go dependencies. 

To validate a KOTS SBOM signature:

1. Go to the [KOTS GitHub repository](https://github.com/replicatedhq/kots/releases) and download the specific KOTS release that you want to validate.
1. Extract the tar.gz file.

    **Example:**

    ```
    tar -zxvf kots_darwin_all.tar.gz
    ```
    A KOTS binary and SBOM folder are created.
1. Run the following cosign command to validate the signatures:
    ```
    cosign verify-blob --key sbom/key.pub --signature sbom/kots-sbom.tgz.sig sbom/kots-sbom.tgz
    ```

## Validate a kURL SBOM Signature

If a Kubernetes installer used, then signed SBOMs for kURL Go and Javascript dependencies are combined into a TAR file and are included with the release.

To validate a kURL SBOM signature:

1. Go to the [kURL GitHub repository](https://github.com/replicatedhq/kURL/releases) and download the specific kURL release files that you want to validate. 

    There are three assets related to the SBOM:

    - `kurl-sbom.tgz` contains SBOMs for Go and Javascript dependencies
    - `kurl-sbom.tgz.sig` is the digital signature for `kurl-sbom.tgz`
    - `key.pub` is the public key from the key pair used to `sign kurl-sbom.tgz`

2. Run the following cosign command to validate the signatures:
    ```
    cosign verify-blob --key key.pub --signature kurl-sbom.tgz.sig kurl-sbom.tgz
    
    ```

## Validate a Troubleshoot SBOM Signature

A signed SBOM for Troubleshoot dependencies is included in each release.

To validate an Troubleshoot SBOM signature:

1. Go to the [Troubleshoot GitHub repository](https://github.com/replicatedhq/troubleshoot/releases) and download the specific Troubleshoot release files that you want to validate. 

    There are three assets related to the SBOM:

    - `troubleshoot-sbom.tgz` contains a software bill of materials for Troubleshoot.
    - `troubleshoot-sbom.tgz.sig` is the digital signature for `troubleshoot-sbom.tgz`
    - `key.pub` is the public key from the key pair used to sign `troubleshoot-sbom.tgz`

2. Run the following cosign command to validate the signatures:
    ```
   $ cosign verify-blob --key key.pub --signature troubleshoot-sbom.tgz.sig troubleshoot-sbom.tgz
    
    ```
