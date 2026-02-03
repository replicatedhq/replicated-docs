# About Custom Resources

You can include custom resources in your releases to control the experience for installations with a Replicated installer, add support air gap installations, and configure functionality like preflight checks, support bundles, and disaster recovery.

Custom resources are consumed by Replicated installers, the Replicated Admin Console, or by other kubectl plugins. Custom resources are packaged as part of the application, but are _not_ deployed to the cluster.

## Custom Resources

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
        <td>Defines metadata about the application for installations with a Replicated installer (Embedded Cluster, KOTS, kURL)</td>
    </tr>
    <tr>
        <td>embeddedcluster.replicated.com/v1beta1</td>
        <td>[Config](/installer/embedded-config)</td>
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
        <td>Adds metadata (such as branding, release notes and more) to the Admin Console for installations with a Replicated installer</td>
    </tr>
    <tr>
        <td>kots.io/v1beta1</td>
        <td>[Config](custom-resource-config)</td>
        <td>Defines a user-facing configuration screen in the Admin Console for installations with a Replicated installer</td>
    </tr>
    <tr>
        <td>kots.io/v1beta2</td>
        <td>[HelmChart](custom-resource-helmchart-v2)</td>
        <td>Identifies an instantiation of a Helm Chart. Used for installations with a Replicated installer and for air gap installations with the Helm CLI</td>
    </tr>
    <tr>
        <td>kots.io/v1beta1</td>
        <td>[LintConfig](custom-resource-lintconfig)</td>
        <td>Customizes the default rule levels for the release linter</td>
    </tr>
    <tr>
        <td>troubleshoot.sh/v1beta2</td>
        <td>[Preflight](custom-resource-preflight)</td>
        <td>Defines collectors and analyzers for preflight checks</td>
    </tr>
    <tr>
        <td>troubleshoot.sh/v1beta2</td>
        <td>[Redactor](https://troubleshoot.sh/docs/redact/)</td>
        <td>Defines custom redactors for support bundles and preflight checks. Supported for installations with a Replicated installer</td>
    </tr>
    <tr>
        <td>troubleshoot.sh/v1beta2</td>
        <td>[Support Bundle](custom-resource-preflight)</td>
        <td>Defines collectors and analyzers for support bundles</td>
    </tr>
    <tr>
        <td>velero.io/v1</td>
        <td>[Backup](https://velero.io/docs/v1.17/api-types/backup/)</td>
        <td>Defines a Velero backup request. Velero provides backup and restore functionality for installations with a Replicated installer. For more information about Velero, see the [Velero](https://velero.io/docs/v1.17/) documentation.</td>
    </tr>
</table>
