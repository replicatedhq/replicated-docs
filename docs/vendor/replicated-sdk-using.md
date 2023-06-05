# Deploying the SDK with Your Helm Chart

This topic describes how to begin using the Replicated SDK by declaring it as a dependency in your Helm chart, then promoting a release with the Helm chart in the Replicated vendor portal. 

## About Using the Replicated SDK

To begin using the SDK, you must declared it as a dependency in your application Helm chart. Then, you package the Helm chart with the SDK dependency and add the Helm chart to a release in the vendor portal.

## Step 1: Add Labels

The SDK uses some of Helm’s standard labels to report the status of your application to the vendor portal.

To enable reporting to the vendor portal, add the following labels on resources deployed as part of your chart:

```yaml
labels:
  app.kubernetes.io/instance: {{ .Release.Name }}
  app.kubernetes.io/managed-by: {{ .Release.Service}}
  app.kubernetes.io/name: {{ .Chart.Name }}
```  

## Step 2: Declare the SDK as a Dependency

:::note
Replicated recommends that your application is installed as a single chart that includes all necessary charts as dependencies. However, if your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first.
:::

To declare the Replicated SDK as a dependency:

1. Edit your Helm chart’s `Chart.yaml` file to add the SDK as a dependency.

   **Example:**

   ```yaml
   # Chart.yaml
   dependencies:
   - name: replicated
     repository: oci://registry.replicated.com/library
     version: 0.0.1-alpha.15
   ```

1. From the directory where the `Chart.yaml` file is saved, run the following command to update the chart’s dependencies:

   ```bash
   helm dependency update
   ```

1. Package the chart:

   ```bash
   helm package .
   ```

   The output of this command is a .tgz file.

## Step 3: Add the Helm Chart to a Release   

After you package the Helm chart with the SDK dependency, you can add the `.tgz` file to a release in the vendor portal.