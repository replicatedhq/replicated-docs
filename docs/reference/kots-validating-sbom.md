# Validating a KOTS SBOM

<!-- This template is used for a single procedures. For a workflow that contains multiple procedures/tasks, use the process/multiple procedure template.-->

This topic describes the process to perform the validation of a software bill of materials (SBOM) signature for KOTS releases.

A _software bill of materials_ is an inventory of all components used to create a software package. SBOMs have emerged as critical building blocks in software security and software supply chain risk management.

Each KOTS release includes signed SBOMs for KOTS Go dependencies. 


## Prerequisites

Complete the following items before you perform this task:
* Install cosign. For directions, see the [sigstore GitHub repository](https://github.com/sigstore/cosign).

## Validate an SBOM Signature

To validate the SBOM signature on a KOTS release:

1. Go to the [KOTS GitHub repository](https://github.com/replicatedhq/kots/releases) and download the specific KOTS release that you would like to validate.
1. Uncompress and untar the tar.gz file.

    **Example:**

    ```
    tar -zxvf kots_darwin_all.tar.gz
    ```
    A KOTS binary and SBOM folder are created.
1. Run the following cosign command to validate the signatures:
    ```
    cosign verify-blob --key sbom/key.pub --signature sbom/kots-sbom.tgz.sig sbom/kots-sbom.tgz
    ```
