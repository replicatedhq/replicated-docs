# Validating SBOM of a KOTS Release

<!-- This template is used for a single procedures. For a workflow that contains multiple procedures/tasks, use the process/multiple procedure template.-->

A software bill of materials (SBOM) is an inventory of all components used to create a software package. SBOM has emerged as a critical building block in software security and software supply chain risk management.

Each KOTS release includes signed SBOMs for KOTS Go dependencies. These directions describe the process to perform the SBOM validation.


**Prerequisites**

Complete the following items before you perform this task:
* Install cosign by following the [directions at sigstore github repo](https://github.com/sigstore/cosign)

To validate the SBOM signature on the KOTS release follow these directions.

1. Retrieve the specific KOTS release you would like to validate. The releases can be found on [github repo](https://github.com/replicatedhq/kots/releases).
2. Once you have downloaded the specific tar.gz file, you will need to uncompress and untar the file by running a command such as: 
```
tar -zxvf kots_darwin_all.tar.gz
```
3. You should now have the kots binary and an `sbom` folder.
4. Use the cosign command to validate the signatures as follows:
```
cosign verify-blob --key sbom/key.pub --signature sbom/kots-sbom.tgz.sig sbom/kots-sbom.tgz
```
