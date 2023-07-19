import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"
import WeightLimitation from "../partials/helm/_helm-cr-weight-limitation.mdx"
import HookWeightsLimitation from "../partials/helm/_hook-weights-limitation.mdx"

# Defining Installation Order for Helm Charts

This topic describes how to use the `weight` property in HelmChart custom resources to define the installation order for Helm charts. For more information about installing Helm charts with Replicated KOTS, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

## About Installation Weight

You can add a `weight` property to the HelmChart custom resource manifest file to define the order in which Helm installs the charts. For more information, see [weight](/reference/custom-resource-helmchart-v2#weight) in _HelmChart v2_.

This is useful if you have multiple HelmChart custom resources in your application, and it is important that the resources referenced in one or more Helm charts are deployed before one or more other Helm charts.

Assigning a `weight` also helps you avoid relying on Helm dependencies and subcharts to define a chart installation order in Replicated KOTS. This is particularly useful when you include hooks in your Helm charts, as Helm waits for certain hooks to complete before continuing. For more information about how KOTS handles dependencies and hooks for Helm charts, see [Subcharts and Dependencies](#subcharts-and-dependencies) and [Hooks](#hooks) below.

KOTS directs Helm to install the Helm charts in your application based on the value of `weight` in ascending order, deploying the chart with the lowest weight first. For example, a chart with a `weight` of `-1` deploys before a chart with a `weight` of `0`.

The value for the `weight` property can be any negative or positive integer or `0`. By default, when you do not provide a `weight` for a Helm chart, the `weight` is `0`.

## Limitations

The `weight` field in the HelmChart custom resource has the following limitations:

* <WeightLimitation/>

* <HooksLimitation/>

* <HookWeightsLimitation/>

## Subcharts and Dependencies

When you add a `weight` property to HelmChart custom resources in your application, KOTS instructs Helm to install any dependencies, including subcharts, along with the parent chart.

For example, if you have two Helm charts in your application, one with a `weight` of `-1` and one with a `weight` of `0`, then Helm installs the chart with a `weight` of `-1` first, including any subcharts and dependencies listed in the `dependencies` field for that chart.

If you do not add a `weight` to Helm charts in your application, you can still use dependencies and subcharts to define installation order constraints during application deployment.

For more information about using Helm dependencies, see [Chart Dependencies](https://helm.sh/docs/topics/charts/#chart-dependencies) in the Helm documentation.

## Hooks

Helm hooks enable more control over when Helm installs the resources in your Helm charts. This is useful if you want to bundle actions as part of a release. For example, you can build in a database backup as part of the upgrade process while ensuring that the backup occurs prior to upgrading the rest of the resources.

KOTS supports using some Helm hooks with Helm charts. If you use hooks in your Helm charts, you can use the `weight` property to further manage the installation order of resources. For example, if you include a pre-install hook in Helm chart A that requires a resource from Helm chart B, you can add a lower `weight` to chart B to ensure that Replicated KOTS directs Helm to install chart B before chart A.

The following hooks are supported:
  * `pre-install`: Executes after resources are rendered but before any resources are installed.
  * `post-install`: Executes after resources are installed.
  * `pre-upgrade`: Executes after resources are rendered but before any resources are upgraded.
  * `post-upgrade`: Executes after resources are upgraded.
  * `pre-delete`: Executes before any resources are deleted.
  * `post-delete`: Executes after resources are deleted.

<HooksLimitation/>

For more information about Helm hooks and weights, see the [Chart Hooks](https://helm.sh/docs/topics/charts_hooks/) in the Helm documentation.