# About custom resources

You can include custom resources in your releases to configure how Replicated builds, distributes, and installs your application. For example, custom resources define the configuration screen that customers see, the container images included in air gap bundles, preflight checks, support bundles, and backups.

Custom resources are packaged with your release but are _not_ deployed to the cluster. They are read by the Replicated Vendor Portal, the Replicated installers (Embedded Cluster, KOTS, and kURL), and the Troubleshoot kubectl plugins. Which custom resources apply depends on how your customers install your application. See [Supported installation methods](#supported-installation-methods).

:::note
Several custom resources use the `kots.io` API group, such as the `kots.io/v1beta2` HelmChart custom resource. The `kots.io` name is a historical naming convention. These custom resources are not limited to KOTS installations. For example, Embedded Cluster v3 requires the HelmChart custom resource, and the Vendor Portal uses the HelmChart `builder` key to generate the list of images for Helm air gap installations.
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

The following table shows which custom resources apply to each installation method. KOTS includes installations with KOTS in an existing cluster and with Replicated kURL. HelmChart v2 (`kots.io/v1beta2`) is the current version of the HelmChart custom resource.

<table>
    <tr>
        <th width="20%">Custom resource</th>
        <th width="20%">Helm CLI</th>
        <th width="20%">Embedded Cluster v3</th>
        <th width="20%">Embedded Cluster v2</th>
        <th width="20%">KOTS</th>
    </tr>
    <tr>
        <td>[Application](custom-resource-application)</td>
        <td>Optional (<a href="#cr-note-1">note 1</a>)</td>
        <td>Partial (<a href="#cr-note-2">note 2</a>)</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>[Config](custom-resource-config)</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>[ConfigValues](custom-resource-configvalues)</td>
        <td>No</td>
        <td>With the <code>--config-values</code> flag (<a href="#cr-note-3">note 3</a>)</td>
        <td>With the <code>--config-values</code> flag</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>[HelmChart v2](custom-resource-helmchart-v2)</td>
        <td>Recommended (<a href="#cr-note-4">note 4</a>)</td>
        <td>Required</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>[HelmChart v1 (deprecated)](custom-resource-helmchart)</td>
        <td>Deprecated. Use HelmChart v2.</td>
        <td>Not supported. Use HelmChart v2.</td>
        <td>Deprecated. Use HelmChart v2.</td>
        <td>Deprecated. Use HelmChart v2.</td>
    </tr>
    <tr>
        <td>[Preflight](custom-resource-preflight)</td>
        <td>Yes (<a href="#cr-note-5">note 5</a>)</td>
        <td><code>v1beta3</code> only</td>
        <td><code>v1beta2</code>, and <code>v1beta3</code> in 2.19.16 and later</td>
        <td><code>v1beta2</code>, and <code>v1beta3</code> in v1.134.0 and later</td>
    </tr>
    <tr>
        <td>[Redactor](custom-resource-redactor)</td>
        <td>In a labeled Secret (<a href="#cr-note-6">note 6</a>)</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>[Support Bundle](custom-resource-preflight)</td>
        <td>In a labeled Secret (<a href="#cr-note-6">note 6</a>)</td>
        <td>In a labeled Secret (<a href="#cr-note-6">note 6</a>)</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>[Backup](https://velero.io/docs/v1.17/api-types/backup/)</td>
        <td>No</td>
        <td>Yes (<a href="#cr-note-7">note 7</a>)</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>[Restore](https://velero.io/docs/v1.17/api-types/restore/)</td>
        <td>No</td>
        <td>Yes</td>
        <td>With a Backup (<a href="#cr-note-8">note 8</a>)</td>
        <td>No</td>
    </tr>
    <tr>
        <td>[Embedded Cluster Config](/embedded-cluster/v3/embedded-config)</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>No</td>
    </tr>
    <tr>
        <td>[kURL Installer](https://kurl.sh/docs/create-installer/)</td>
        <td>No</td>
        <td>No</td>
        <td>No</td>
        <td>kURL installations only</td>
    </tr>
    <tr>
        <td>[SIG Application](https://github.com/kubernetes-sigs/application#kubernetes-applications)</td>
        <td>No</td>
        <td>Yes</td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
</table>

The LintConfig custom resource applies to release linting, not to installation, so it isn't included in this table. For more information, see [LintConfig](custom-resource-lintconfig).

### Notes {#notes}

1. <a id="cr-note-1"></a>**Application for Helm CLI:** Optional. Use `additionalImages` to add images that the HelmChart `builder` key can't render, such as images that a Kubernetes Operator pulls at runtime, to the list of images for air gap installations. Use `excludedImages` to remove images from that list. For more information, see [When to use additionalImages](/vendor/operator-defining-additional-images#when-to-use-additionalimages) in _Define additional images_.

1. <a id="cr-note-2"></a>**Application for Embedded Cluster v3:** Embedded Cluster v3 uses the `title`, `icon`, `releaseNotes`, `statusInformers`, `additionalNamespaces`, `additionalImages`, `excludedImages`, and `proxyPublicImages` fields. `additionalNamespaces` requires explicit namespace names; `"*"` is not supported. For more information, see [Changes to Application custom resource fields](/embedded-cluster/v3/embedded-v3-migrate#application-cr-changes) in _Upgrade from Embedded Cluster v2_.

1. <a id="cr-note-3"></a>**ConfigValues for Embedded Cluster v3:** Embedded Cluster v3 reads ConfigValues only from the `--config-values` flag. A ConfigValues file in the release is not used.

1. <a id="cr-note-4"></a>**HelmChart v2 for Helm CLI:** Recommended. The Vendor Portal uses the `builder` key to build the list of images for air gap installations, and uses `weight` to order the Helm installation steps in the Enterprise Portal. Template functions in the HelmChart custom resource are not rendered for Helm CLI installations. For more information, see [builder](custom-resource-helmchart-v2#builder) in _HelmChart v2_.

1. <a id="cr-note-5"></a>**Preflight for Helm CLI:** Customers run preflight checks with the preflight kubectl plugin.

1. <a id="cr-note-6"></a>**Labeled Secret:** Package the spec in a Secret in your Helm chart, labeled `troubleshoot.sh/kind: support-bundle`. Put a Redactor spec in the `redactor-spec` data key. For more information, see [Redactor](custom-resource-redactor) and [Helm and troubleshoot template example](/vendor/preflight-sb-helm-templates-about#troubleshoot).

1. <a id="cr-note-7"></a>**Backup for Embedded Cluster v3:** The Backup custom resource defines the application backup policy. For more information, see [Back up and restore Embedded Cluster v3](/embedded-cluster/v3/embedded-disaster-recovery-v3).

1. <a id="cr-note-8"></a>**Restore for Embedded Cluster v2:** Embedded Cluster v2 uses the Restore custom resource only when the release also includes a Backup custom resource.
