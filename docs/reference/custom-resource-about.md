import Deprecated from "../partials/helm/_replicated-deprecated.mdx"

# About custom resources

You can include custom resources in your releases to configure how Replicated builds, distributes, and installs your application. For example, custom resources define the configuration screen that customers see, the container images included in air gap bundles, preflight checks, support bundles, and backups.

Custom resources are packaged with your release but are _not_ deployed to the cluster. They are read by the Replicated Vendor Portal, the Replicated installers (Embedded Cluster, KOTS, and kURL), and the Troubleshoot kubectl plugins. Which custom resources apply depends on how your customers install your application. See [Supported installation methods](#supported-installation-methods).

:::note
Several custom resources use the `kots.io` API group, such as the `kots.io/v1beta2` HelmChart custom resource. The `kots.io` name is historical. These custom resources are not limited to KOTS installations. For example, Embedded Cluster v3 requires the HelmChart custom resource, and the Vendor Portal uses the HelmChart `builder` key to generate the list of images for Helm air gap installations.
:::

## Custom resources

The following custom resources can be used in releases distributed with Replicated:

<table>
    <tr>
        <td width="40%">API Group/Version</td>
        <td width="25%">Kind</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>app.k8s.io/v1beta1</td>
        <td>[SIG Application](https://github.com/kubernetes-sigs/application#kubernetes-applications)</td>
        <td>Defines links to the application that display on the Admin Console dashboard</td>
    </tr>
    <tr>
        <td>embeddedcluster.replicated.com/v1beta1</td>
        <td>[Config](/embedded-cluster/v3/embedded-config)</td>
        <td>Defines a Replicated Embedded Cluster distribution</td>
    </tr>
    <tr>
        <td>cluster.kurl.sh/v1beta1</td>
        <td>[Installer](https://kurl.sh/docs/create-installer/)</td>
        <td>Defines a Replicated kURL distribution</td>
    </tr>
    <tr>
        <td>kots.io/v1beta1</td>
        <td>[Application](custom-resource-application)</td>
        <td>Adds metadata to the user-facing UI for installations with a Replicated installer</td>
    </tr>
    <tr>
        <td>kots.io/v1beta1</td>
        <td>[Config](custom-resource-config)</td>
        <td>Defines a user-facing configuration screen for installations with a Replicated installer</td>
    </tr>
    <tr>
        <td>kots.io/v1beta1</td>
        <td>[ConfigValues](custom-resource-configvalues)</td>
        <td>Provides values for the fields defined in the Config custom resource, such as for automated installations</td>
    </tr>
    <tr>
        <td>kots.io/v1beta2</td>
        <td>[HelmChart](custom-resource-helmchart-v2)</td>
        <td>Identifies an instantiation of a Helm chart</td>
    </tr>
    <tr>
        <td>kots.io/v1beta1</td>
        <td>[HelmChart (Deprecated)](custom-resource-helmchart)</td>
        <td>Identifies an instantiation of a Helm chart. Use <code>kots.io/v1beta2</code> instead.</td>
    </tr>
    <tr>
        <td>kots.io/v1beta1</td>
        <td>[LintConfig](custom-resource-lintconfig)</td>
        <td>Customizes the default rule levels for the release linter</td>
    </tr>
    <tr>
        <td>troubleshoot.sh/v1beta2<br/>troubleshoot.sh/v1beta3</td>
        <td>[Preflight](custom-resource-preflight)</td>
        <td>Defines collectors and analyzers for preflight checks. The <code>v1beta3</code> API version applies only to the Preflight custom resource.</td>
    </tr>
    <tr>
        <td>troubleshoot.sh/v1beta2</td>
        <td>[Redactor](custom-resource-redactor)</td>
        <td>Defines custom redactors for support bundles</td>
    </tr>
    <tr>
        <td>troubleshoot.sh/v1beta2</td>
        <td>[Support Bundle](custom-resource-preflight)</td>
        <td>Defines collectors and analyzers for support bundles. <code>v1beta3</code> is not supported for support bundles on any installer.</td>
    </tr>
    <tr>
        <td>velero.io/v1</td>
        <td>[Backup](https://velero.io/docs/v1.17/api-types/backup/)</td>
        <td>Defines a Velero backup request</td>
    </tr>
    <tr>
        <td>velero.io/v1</td>
        <td>[Restore](https://velero.io/docs/v1.17/api-types/restore/)</td>
        <td>Defines a Velero restore request for disaster recovery with Embedded Cluster</td>
    </tr>
</table>

## Supported installation methods

The following table shows which custom resources apply to each installation method. KOTS includes installations with KOTS in an existing cluster and with Replicated kURL.

<table>
    <tr>
        <th width="16%">Custom resource</th>
        <th width="21%">Helm CLI</th>
        <th width="21%">Embedded Cluster v3</th>
        <th width="21%">Embedded Cluster v2</th>
        <th width="21%">KOTS</th>
    </tr>
    <tr>
        <td>Application</td>
        <td>No</td>
        <td>Partial. Uses the <code>title</code>, <code>icon</code>, <code>releaseNotes</code>, <code>statusInformers</code>, <code>additionalNamespaces</code>, <code>additionalImages</code>, and <code>excludedImages</code> fields.</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Config</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>ConfigValues</td>
        <td>No</td>
        <td>Yes, with the <code>--config-values</code> flag. A ConfigValues file in the release is not used.</td>
        <td>Yes, with the <code>--config-values</code> flag</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>HelmChart v2</td>
        <td>Partial. The Vendor Portal uses the <code>builder</code> key to build the list of images for air gap installations, and uses <code>weight</code> to order the Helm installation steps in the Enterprise Portal. Template functions in the HelmChart custom resource are not rendered.</td>
        <td>Yes (required)</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>HelmChart v1</td>
        <td>Deprecated</td>
        <td>Not supported</td>
        <td>Deprecated</td>
        <td>Deprecated</td>
    </tr>
    <tr>
        <td>LintConfig</td>
        <td colspan="4">Applies when the Vendor Portal or the Replicated CLI lints a release, for all installation methods. Installers do not read the LintConfig custom resource.</td>
    </tr>
    <tr>
        <td>Preflight</td>
        <td>Yes. Customers run preflight checks with the preflight kubectl plugin.</td>
        <td><code>v1beta3</code> only</td>
        <td><code>v1beta2</code>. <code>v1beta3</code> is supported in Embedded Cluster v2 [EC_V2_VERSION] and later.</td>
        <td><code>v1beta2</code>. <code>v1beta3</code> is supported in KOTS [KOTS_VERSION] and later.</td>
    </tr>
    <tr>
        <td>Redactor</td>
        <td>Yes, packaged as a labeled Secret in your Helm chart. See [Redactor](custom-resource-redactor).</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Support Bundle</td>
        <td>Yes, packaged as a labeled Secret in your Helm chart</td>
        <td>Yes, packaged as a labeled Secret in your Helm chart. A Support Bundle custom resource in the release is not used.</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Backup</td>
        <td>No</td>
        <td>Yes. Defines the application backup policy. See [Back up and restore Embedded Cluster v3](/embedded-cluster/v3/embedded-disaster-recovery-v3).</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Restore</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes, when the release also includes a Backup custom resource</td>
        <td>No</td>
    </tr>
    <tr>
        <td>Embedded Cluster Config</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>No</td>
    </tr>
    <tr>
        <td>kURL Installer</td>
        <td>No</td>
        <td>No</td>
        <td>No</td>
        <td>kURL installations only</td>
    </tr>
    <tr>
        <td>SIG Application</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
</table>

:::note
<Deprecated/>
:::
