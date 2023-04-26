import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"


# Configuring Native Helm and Replicated Helm Releases

This topic describes how the HelmChart custom resource works with Replicated app manager for native Helm and Replicated Helm releases. It also described the limitations that exist for native Helm and Replicated Helm installations.

## Limitations {#replicated-helm-limitations}

The following limitations apply when using the app manager to install and manage Helm charts to native Helm and Replicated Helm:
* <ReplicatedHelmDeprecated/>
* <TemplateLimitation/>
* <VersionLimitation/>

  For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.
* The name specified in the HelmChart custom resource must be an exact match to the actual Helm chart name that is provided to Replicated. If the Helm chart names do not match, then the installation can error or fail. See [HelmChart](/reference/custom-resource-helmchart) in _Custom Resources_.

* The following limitations apply to the native Helm deployment method only:

  <NativeHelmLimitations/>

  * <HooksLimitation/>

## Adding the HelmChart Custom Resource

Replicated app manager supports using native Helm and Replicated Helm to deliver an enterprise applications as Helm charts, or including Helm charts as components of an application. An application can use more than one Helm chart, and can use more than a single instance of any Helm chart.

You start by adding add one or more Helm charts to a release in the vendor portal by uploading each Helm chart as a `.tgz` file. When you add a Helm chart to a release, Replicated displays a copy of the `Chart.yaml` file and the `values.yaml` file from the Helm chart to the release. For information about how to create a new release, see [Managing Releases with the Vendor Portal](releases-creating-release).

You must also add a HelmChart custom resource manifest file for each Helm chart that you add to a release. When you drag and drop a Helm chart <code>.tgz</code> to a release in the vendor portal, Replicated automatically creates a corresponding HelmChart custom resource manifest that uses the naming convention <code>CHART_NAME.yaml</code>. For example, <code>postgresql.yaml</code>. If you are using the CLI, you must add the HelmChart custom resource manually.

The following table provides more information about these files:

<table>
<tr>
  <th width="30%">File</th>
  <th>Description</th>
</tr>
<tr>
  <td>HelmChart custom resource</td>
  <td>A HelmChart custom resource is a YAML file with <code>kind: HelmChart</code>.
  <br/>
  <br/>
  The HelmChart custom resource references the <code>.tgz</code> export of the Helm chart. You configure this file, which provides the necessary instructions to the app manager for processing and preparing the chart for deployment.
  <br/>
  <br/>
  For more information, see <a href="/reference/custom-resource-helmchart">HelmChart</a> in the <em>Custom Resources</em> section.</td>
</tr>
<tr>
  <td>Chart.yaml</td>
  <td>Replicated extracts the <code>Chart.yaml</code> file from the Helm chart <code>.tgz</code> file that you provide. This file is read-only and cannot be edited in the release.</td>
</tr>
<tr>
  <td>values.yaml</td>
  <td>Replicated extracts the <code>values.yaml</code> file from the Helm chart <code>.tgz</code> file that you provide. This file is read-only and cannot be edited in the release.</td>
</tr>
</table>

For example, the following screenshot shows how a Postgres Helm chart displays in the file tree of a release in the vendor portal:

![Postgres Helm Chart](/images/postgres-helm-chart.png)

[View a larger image](/images/postgres-helm-chart.png)

## Supporting Air Gap Installations

The app manager supports native Helm and Replicated Helm installations into air gap environments. When a user installs a Helm chart-based application in an air gap environment, the chart processing is managed in the end user environment. This means that the app manager can use user-supplied values, license values, and existing values to create deployable manifests.

To create an `.airgap` bundle for a release that uses Helm charts, the Replicated vendor portal renders templates of the Helm charts with `helm template`. To specify which values from the Helm chart `values.yaml` file are included in the `.airgap` bundle, you add a `builder` key in the HelmChart custom resource manifest file. For more information, see [builder](/reference/custom-resource-helmchart#builder) in the _HelmChart_ reference.

:::note
The helm CLI installation method does not support installations into air gap environments. See [helm CLI Limitations](helm-install#limitations) below.
:::

<HelmBuilderRequirements/>

**Example:**

The following example demonstrates how to add a conditional `postgresql` resource to the `builder` key.

`postgresql` is defined as a conditional resource in the `values` key of the HelmChart custom resource:

```yaml
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}
```
As shown above, `postgresql` is included only when the user selects the `embedded_postgres` option.

To ensure the vendor portal includes this conditional `postgresql` resource in `.airgap` bundles, add the same `postgresql` value to the `builder` key with `enabled` set to `true`:

```yaml
  builder:
    postgresql:
      enabled: true
```

## Adding Native Helm to Existing Replicated Helm Releases

Native Helm can only be set for new charts. Charts installed with Replicated Helm cannot be migrated to native Helm. However, you can add native Helm charts to an existing release that already uses Replicated Helm. Each chart is installed using the specified installation method for that chart, indicated by the value of the `useHelmInstall` flag. For more information about this flag, see [`useHelmInstall`](/reference/custom-resource-helmchart#usehelminstall) in _HelmChart_.

