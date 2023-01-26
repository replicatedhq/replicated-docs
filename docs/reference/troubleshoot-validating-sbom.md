# Validating a Troubleshoot SBOM

<!-- This template is used for a single procedures. For a workflow that contains multiple procedures/tasks, use the process/multiple procedure template.-->

This topic describes the process to perform the validation of a software bill of materials (SBOM) signature for Troubleshoot releases.

A _software bill of materials_ is an inventory of all components used to create a software package. SBOMs have emerged as critical building blocks in software security and software supply chain risk management.

A signed SBOM that includes Troubleshoot dependencies is included in each release.



## Prerequisites

Complete the following items before you perform this task:
* Install cosign. For more information, see the [sigstore GitHub repository](https://github.com/sigstore/cosign).

## Validate an SBOM Signature

To validate an SBOM signature:

1. Go to the [Troubleshoot GitHub repository](https://github.com/replicatedhq/troubleshoot/releases) and download the specific Troubleshoot release files that you want to validate. You will find 3 assets related to the SBOM that are as follows:

- troubleshoot-sbom.tgz contains a software bill of materials for Troubleshoot.
- troubleshoot-sbom.tgz.sig is the digital signature for troubleshoot-sbom.tgz
- key.pub is the public key from the key pair used to sign troubleshoot-sbom.tgz

2. Run the following cosign command to validate the signatures:
    ```
   $ cosign verify-blob --key key.pub --signature troubleshoot-sbom.tgz.sig troubleshoot-sbom.tgz
    
    ```
