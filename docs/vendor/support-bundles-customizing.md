# Customizing a Support Bundle

Customizing a support bundle is unique to your application. Replicated app manager provides the ability to generate support bundles from the admin console without vendors needing to configure anything. However, there may be application-related data that you want to collect and analyze for troubleshooting.

By default, support bundles contain a large number of commonly used, best practice collectors. The default `clusterInfo` and `clusterResources` collectors gather a large amount of data that is useful when remotely installing or debugging a Kubernetes application. You can supplement, edit, or exclude the default collectors and analyzers. You can also add redactors to the default redactors.

## Customize an App Manager Support Bundle

This procedure provides a basic understanding and some key considerations to help guide you. For more information about configuring support bundles, see [Collecting Data](https://troubleshoot.sh/docs/collect/), [Redacting Data](https://troubleshoot.sh/docs/redact/), and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation. You can also see the entire default specification at [spec.yaml](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

To customize a support bundle for app manager installations:

1. Create a SupportBundle custom resource manifest file (`kind: SupportBundle`) in your release.
1. Use one of the following support bundle template options to start populating your manifest file:

      - To add collectors to the default collectors, copy the following basic support bundle template to your manifest file. In this template, the collectors field is empty, so only the default collectors run until you customize this file.

        ```yaml
        apiVersion: troubleshoot.sh/v1beta2
        kind: SupportBundle
        metadata:
           name: collectors
        spec:
           collectors: []
       ```
      - To fully customize the support bundle, including editing or excluding the default collectors and analyzers, copy the default `spec.yaml` file to your manifest file. For the default YAML file, see [spec.yaml](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

1. (Optional) Although Replicated recommends including the default `clusterInfo` and `clusterResources` collectors because they collect a large amount of data to help with installation and debugging, you can set the `exclude` field to `true` to exclude them:

  ```yaml
  apiVersion: troubleshoot.sh/v1beta2
  kind: SupportBundle
  metadata:
    name: collectors
  spec:
    collectors:
      - clusterInfo:
        exclude: true
      - clusterResources:
        exclude: true
  ```
1. (Optional) You can edit the default collector properties. If  `clusterResources` is defined in your specification, the default namespace cannot be removed, but you can add a namespace to the `namespaces` field.

  ```yaml
  apiVersion: troubleshoot.sh/v1beta2
  kind: SupportBundle
  metadata:
    name: collectors
  spec:
    collectors:
      - clusterInfo:
        exclude: false
      - clusterResources:
        namespaces:
        - default
        - APP_NAMESPACE
  ```
  Replace `APP_NAMESPACE` with the name of the namespace.

1. (Recommended) Add application Pod logs and set the collection limits for the number of lines logged. Typically the selector attribute is matched to the labels.

    1. To get the labels for an application, either inspect the YAML or run the following command to see what labels are used:

      ```
      kubectl get pods --show-labels
      ```

    1. After the labels are discovered, create collectors to include logs from these pods in a bundle. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector specification multiple times.

      The limits field can support `maxAge` or `maxLines`. This limits the output to the constraints provided. **Default:** `maxLines: 10000`

      **Example:**

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: SupportBundle
      metadata:
        name: collectors
      spec:
        collectors:
          - logs:
            selector:
              - app=api
            namespace: default
            limits:
              maxLines: 10000
      ```            

1. Add any custom collectors to the file. Collectors that Replicated recommends considering are:

    - **Kubernetes resources:** Use for custom resource definitions (CRDs), secrets, and ConfigMaps, if they are required for your application to work.
    - **Databases:** Return a selection of rows or entire tables.
    - **Volumes:** Ensure that an application's persistent state files exist, are readable/writeable, and have the right permissions.
    - **Pods:** Run a pod from a custom image.
    - **Files:** Copy files from pods and hosts.
    - **HTTP:** Consume your own application APIs with HTTP requests. If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.

1. Add analyzers based on conditions that you expect for your application. For example, you might require that a cluster have at least 2 CPUs and 4GB memory available.

  Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

  At a minimum, include application log analyzers. A simple text analyzer can detect specific log lines and inform an end user of remediation steps.

  Analyzers that Replicated recommends considering are:

    - **Resource statuses:** Check the status of various resources, such as Deployments, StatefulSets, Jobs, and so on.
    - **Regular expressions:** Analyze arbitrary data.
    - **Databases:** Check the version and connection status.

1. (Optional) To add redactors to the default redactors that are automatically provided by the app manager, add the Redactor custom resource manifest (`kind: Redactor`) to your release. Then add Redactor custom resource fields to the manifest as needed. For more information, see [Redactor](/reference/custom-resource-redactor) in the Reference section.

  :::note
  The default redactors included with Replicated app manager cannot be disabled.
  :::

1. Add the manifest files to the application that you are packaging and distributing with Replicated.

1. Save and promote your release. To test this feature, generate a support bundle from the Troubleshoot tab in the admin console and do one of the following:

    - If you have the Support Bundle Upload Enabled license entitlement, click **Send bundle to vendor**. You can also open the TAR file to review the files. For more information about license entitlements, see [Create a Customer](releases-creating-customer#create-a-customer).
    - Download the `support-bundle.tar.gz` file. Copy the file to the Troubleshoot tab in the [vendor portal](https://vendor.replicated.com) to see the analysis and use the file inspector.
