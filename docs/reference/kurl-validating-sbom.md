# Validating a kURL SBOM

<!-- This template is used for a single procedures. For a workflow that contains multiple procedures/tasks, use the process/multiple procedure template.-->

This topic describes the process to perform the validation of a software bill of materials (SBOM) signature for kURL releases.

A _software bill of materials_ is an inventory of all components used to create a software package. SBOMs have emerged as critical building blocks in software security and software supply chain risk management.

Signed SBOMs for kURL Go and Javascript dependencies are combined into a tar file and are included with each release.


## Prerequisites

Complete the following items before you perform this task:
* Install cosign. For more information, see the [sigstore GitHub repository](https://github.com/sigstore/cosign).

## Validate an SBOM Signature

To validate an SBOM signature:

1. Go to the [kURL GitHub repository](https://github.com/replicatedhq/kURL/releases) and download the specific kURL release files that you want to validate. You will find 3 assets related to the SBOM that are as follows:

- kurl-sbom.tgz contains SBOMs for Go and Javascript dependencies
- kurl-sbom.tgz.sig is the digital signature for kurl-sbom.tgz
- key.pub is the public key from the key pair used to sign kurl-sbom.tgz

2. Run the following cosign command to validate the signatures:
    ```
    cosign verify-blob --key key.pub --signature kurl-sbom.tgz.sig kurl-sbom.tgz
    
    ```
