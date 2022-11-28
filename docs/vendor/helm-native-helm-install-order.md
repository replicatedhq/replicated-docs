# Defining Installation Order for Native Helm Charts

When deploying applications with native Helm charts, the Replicated app manager directs Helm v3 to install your `HelmChart` resources on the cluster. In parallel, the app manager deploys any other manifest files within your application.

Native Helm charts are `HelmChart` custom resources in your application that are installed and managed directly by Helm v3. Native Helm charts have the `useHelmInstall` property set to `true`. For more information about using native Helm charts with Replicated, see [Helm Overview](helm-overview).

## About Native Helm Chart Installation Weight

For native Helm charts, you can add a `weight` property to the `HelmChart` custom resource manifest file to define the order in which Helm installs the charts.

This is useful if you have multiple `HelmChart` custom resources in your application, and it is important that the resources referenced in one or more Helm charts are deployed before one or more other Helm charts.

Assigning a `weight` also helps you avoid relying on Helm dependencies and subcharts to define a chart installation order in Replicated. This is particularly useful when you include hooks in your native Helm charts, as Helm waits for certain hooks to complete before continuing. For more information about how Replicated handles dependencies and hooks for Helm charts, see [Subcharts and Dependencies](#subcharts-and-dependencies) and [Hooks](#hooks) below.

The app manager directs Helm to install the native Helm charts in your application based on the value of `weight` in ascending order, deploying the chart with the lowest weight first. For example, a chart with a `weight` of `-1` deploys before a chart with a `weight` of `0`.

The value for the `weight` property can be any negative or positive integer or `0`. By default, when you do not provide a `weight` for a native Helm chart, the `weight` is `0`.

## Assign Installation Weight to Native Helm Charts

You can add a `weight` property to any native Helm charts in your application to define the order in which they are installed.

To add a `weight` to native Helm charts:

1. Open the manifest file for the `HelmChart` custom resource you want to assign an installation order.

1. Add the following line to the `HelmChart` custom resource manifest file at the same level as `useHelmInstall: true`:

   ```yaml
   weight: INSTALL-WEIGHT
   ```
   Where `INSTALL-WEIGHT` is any negative or positive integer or `0`.

   **Example:**:

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: HelmChart
   metadata:
     name: samplechart
   spec:
     chart:
       name: samplechart
       chartVersion: 3.1.7

     exclude: "repl{{ ConfigOptionEquals `include_chart` `include_chart_no`}}"

     helmVersion: v3

     useHelmInstall: true
     weight: 1

     values:
       ...

     namespace: samplechart-namespace
   ```
1. Save your changes.

## Subcharts and Dependencies

When you add a `weight` property to `HelmChart` custom resources in your application, the app manager instructs Helm to install any dependencies, including subcharts, along with the parent chart.

For example, if you have two native Helm charts in your application, one with a `weight` of `-1` and one with a `weight` of `0`, then Helm installs the chart with a `weight` of `-1` first, including any subcharts and dependencies listed in the `dependencies` field for that chart.

If you do not add a `weight` to native Helm charts in your application, you can still use dependencies and subcharts to define installation order constraints during application deployment.

For more information about using Helm dependencies, see [Chart Dependencies](https://helm.sh/docs/topics/charts/#chart-dependencies) in the Helm documentation.


## Hooks

Helm hooks enable more control over when Helm installs the resources in your Helm charts. Replicated supports using some Helm hooks with native Helm charts. For information about using hooks with native Helm charts in Replicated, see [Helm hooks and weights](helm-installing-native-helm#helm-hooks-and-weights) in _Installing with Native Helm_.

If you use hooks in your native Helm charts, you can use the `weight` property to further manage the installation order of resources. For example, if you include a pre-install hook in Helm chart A that requires a resource from Helm chart B, you can add a lower `weight` to chart B to ensure that the app manager directs Helm to install chart B before chart A.
