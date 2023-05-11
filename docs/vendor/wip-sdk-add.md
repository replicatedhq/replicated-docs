# Add the Replicated SDK to an App

To begin using the SDK, it must be declared as a dependency of your application Helm chart. This will ensure that the SDK is installed whenever your application Helm chart is installed.

Note: Replicated recommends installing your application as a single umbrella chart that includes all necessary charts. But if your application is installed as multiple charts, declare the SDK as a dependency for the chart that customers install first.

## Declare the Replicated SDK Helm Chart as a Dependency

To declare the SDK as a dependency:

1. Edit your chart’s Chart.yaml file to add the SDK as a dependency.

    Example:

    ```yaml
    # Chart.yaml
    dependencies:
    - name: kots-sdk
    repository: oci://registry.replicated.com/library
    version: 0.0.1-alpha.8
    ```

1. Run the following command in the chart’s directory to update the chart’s dependencies:

    ```bash
    helm dependency update
    ```

1. Run the following command to package the chart:

    ```
    helm package .
    ```

	A .tgz file should be created as a result.

## Display Status in VP

To show the correct status for your application in the Replicated Vendor Portal, you must include the recommended labels showing the name of your application, its instance, and that it is managed by Helm. 

For example:

```yaml
labels:
  app.kubernetes.io/instance: {{ .Release.Name }}
  app.kubernetes.io/managed-by: {{ .Service.Name }}
  app.kubernetes.io/name: {{ .Chart.Name }}
```

