# Verify Replicated component artifacts

This topic describes the verification material that Replicated publishes for its components, and where to find the steps to verify each type of artifact.

## Overview

Replicated publishes signatures, Supply Chain Levels for Software Artifacts (SLSA) provenance, and software bills of materials (SBOMs) for its components. You and your customers can use this material to confirm that an artifact was built by Replicated and has not been modified, and to review the components that it contains.

What Replicated publishes depends on the component and the type of artifact. Use the following table to find the verification steps for the artifact that you have. All of the procedures use [Cosign](https://github.com/sigstore/cosign).

## Verification by artifact

<table>
  <tr>
    <th width="20%">Component</th>
    <th width="26%">Artifact</th>
    <th width="18%">SBOM</th>
    <th width="18%">Signature</th>
    <th width="18%">SLSA provenance</th>
  </tr>
  <tr>
    <td>Embedded Cluster v3</td>
    <td>Release archive and installer binary, in releases 3.14.0-beta.1 and later</td>
    <td>[Yes](/vendor/sbom-validating#validate-an-embedded-cluster-v3-sbom-signature)</td>
    <td>[Release archive](/vendor/embedded-cluster-v3-release-files-validating#verify-the-release-archive-signature), [installer binary](/vendor/embedded-cluster-v3-release-files-validating#verify-the-installer-binary-signature)</td>
    <td>[Release archive](/vendor/embedded-cluster-v3-release-files-validating#verify-slsa-provenance-for-the-release-archive), [installer binary](/vendor/embedded-cluster-v3-release-files-validating#verify-slsa-provenance-for-the-installer-binary)</td>
  </tr>
  <tr>
    <td>KOTS</td>
    <td>KOTS CLI release archive</td>
    <td>[Yes](/vendor/sbom-validating#validate-a-kots-sbom-signature)</td>
    <td>Not published</td>
    <td>Not published</td>
  </tr>
  <tr>
    <td>KOTS</td>
    <td>Container images: <code>kotsadm</code>, <code>kotsadm-migrations</code>, and <code>kurl-proxy</code></td>
    <td>[Yes](/vendor/image-provenance-validating#verify-the-sbom-attestation)</td>
    <td>[Yes](/vendor/image-provenance-validating#verify-the-image-signature)</td>
    <td>[Yes](/vendor/image-provenance-validating#verify-slsa-provenance)</td>
  </tr>
  <tr>
    <td>kURL</td>
    <td>kURL release files</td>
    <td>[Yes](/vendor/sbom-validating#validate-a-kurl-sbom-signature)</td>
    <td>Not published</td>
    <td>Not published</td>
  </tr>
  <tr>
    <td>Troubleshoot</td>
    <td><code>preflight</code> and <code>support-bundle</code> CLI archives</td>
    <td>[Yes](/vendor/sbom-validating#validate-a-troubleshoot-sbom-signature)</td>
    <td>Not published</td>
    <td>[Yes](/vendor/troubleshoot-cli-provenance-validating#validate-a-troubleshoot-cli-archive), in releases 0.134.1 and later</td>
  </tr>
  <tr>
    <td>Troubleshoot</td>
    <td>Container images: <code>troubleshoot</code> and <code>preflight</code>, in releases 0.132.2 and later</td>
    <td>[Yes](/vendor/image-provenance-validating#verify-the-sbom-attestation)</td>
    <td>[Yes](/vendor/image-provenance-validating#verify-the-image-signature)</td>
    <td>[Yes](/vendor/image-provenance-validating#verify-slsa-provenance)</td>
  </tr>
  <tr>
    <td>Replicated SDK</td>
    <td>Container image: <code>replicated-sdk-image</code></td>
    <td>[Yes](/vendor/image-provenance-validating#verify-the-sbom-attestation)</td>
    <td>[Yes](/vendor/image-provenance-validating#verify-the-image-signature)</td>
    <td>[Yes](/vendor/image-provenance-validating#verify-slsa-provenance)</td>
  </tr>
</table>

## Choose a procedure

The verification steps are grouped by type of artifact:

* **Release archives and files that you download:** To verify the SBOM signature for a KOTS, kURL, Troubleshoot, or Embedded Cluster v3 release, see [Validate SBOM signatures](/vendor/sbom-validating). To verify the signatures and SLSA provenance for Embedded Cluster v3 release files, see [Validate Embedded Cluster v3 release files](/vendor/embedded-cluster-v3-release-files-validating). To verify SLSA provenance for the Troubleshoot CLI archives, see [Validate Troubleshoot CLI provenance](/vendor/troubleshoot-cli-provenance-validating).

* **Container images:** To verify SLSA provenance, image signatures, and SBOM attestations for KOTS, Troubleshoot, and Replicated SDK images, see [Validate container image provenance](/vendor/image-provenance-validating).
