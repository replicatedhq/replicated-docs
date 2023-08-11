import Help from "../partials/replicated-cli/_help.mdx"


# cluster prepare (Beta)

Create a cluster without promoting a release to a channel, and deploy applications for compatibility testing. This method is not recommended for production testing. For production testing, use `cluster create` instead.

## Usage
```bash
replicated cluster prepare [flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td>--disk</td>
    <td>integer</td>
    <td>The disk size (GiB) to request per node. <strong>Default:</strong> 50</td>
  </tr>
  <tr>
    <td>--distribution</td>
    <td>string</td>
    <td>The Kubernetes cluster distribution type to provision. <strong>Default:</strong> kind</td>
  </tr>
  <tr>
    <td>--instance-type</td>
    <td>string</td>
    <td>The type of instance to use for nodes in the cluster. See <a href="/vendor/testing-supported-clusters">Supported Clusters and Requirements (Beta)</a>.</td>
  </tr>
  <tr>
    <td>--name</td>
    <td>string</td>
    <td>The name of the cluster. If no name is specified, a name will be generated.</td>
  </tr>
  <tr>
    <td>--node-count</td>
    <td>integer</td>
    <td>The node count. <strong>Default:</strong> 1</td>
  </tr>
  <tr>
    <td>--ttl</td>
    <td>string</td>
    <td>The cluster Time to Live (TTL) duration, in hours, before the cluster is automatically deleted by the service. TTL starts when the cluster is in a Ready state. <strong>Valid values:</strong> 1 - 48. <strong>Default:</strong> 1</td>
  </tr>
  <tr>
    <td>--version</td>
    <td>string</td>
    <td>(Required) The Kubernetes version to provision. For OpenShift clusters, provide the supported OpenShift version. The format is distribution dependent. For supported versions, see <a href="/vendor/testing-supported-clusters">Supported Clusters and Requirements (Beta)</a>.</td>
  </tr>
  <tr>
    <td>--wait</td>
    <td>duration</td>
    <td>The wait duration for the cluster to be ready. <strong>Default:</strong> 5 minutes</td>
  </tr>
  <tr>
    <td>--cluster-id</td>
    <td>string</td>
    <td>The ID of an existing cluster to use instead of creating a new ID.</td>
  </tr>
  <tr>
    <td>--entitlements</td>
    <td>string</td>
    <td>The entitlements to set on the customer. You can specify multiple entitlements.</td>
  </tr>
  <tr>
    <td>--namespace</td>
    <td>string</td>
    <td>The namespace in which to deploy the KOTS or Helm chart release. <strong>Default:</strong> default</td>
  </tr>
  <tr>
    <td>--app-ready-timeout</td>
    <td>string</td>
    <td>Timeout to wait for the application to be ready. Requires the Go duration format (e.g., 10s, 2m). <strong>Default:</strong> 5 minutes</td>
  </tr>
  <tr>
    <td>--chart</td>
    <td>string</td>
    <td>The path to the Helm chart for a release.</td>
  </tr>
  <tr>
    <td>--values</td>
    <td>string</td>
    <td>Specify values in a YAML file or a URL. You can specify multiple values.</td>
  </tr>
  <tr>
    <td>--set</td>
    <td>string</td>
    <td>Set values using the command line. Specify multiple or separate values with commas: key1=val1,key2=val2.</td>
  </tr>
  <tr>
    <td>--set-string</td>
    <td>string</td>
    <td>Set String values using the command line. Specify multiple or separate values with commas: key1=val1,key2=val2.</td>
  </tr>
  <tr>
    <td>--set-file</td>
    <td>string</td>
    <td>Set values from respective files specified using the command line. Specify multiple or separate values with commas: key1=path1,key2=path2.</td>
  </tr>
  <tr>
    <td>--set-json</td>
    <td>string</td>
    <td>Set JSON values using the command line. Specify multiple or separate values with commas: key1=jsonval1,key2=jsonval2.</td>
  </tr>
  <tr>
    <td>--set-literal</td>
    <td>string</td>
    <td>Set a literal String value using the command line.</td>
  </tr>
  <tr>
    <td>--yaml</td>
    <td>string</td>
    <td>The YAML config for this release. Use <code>-</code> to read from stdin. Cannot be used with the <code>--yaml-file</code> flag.</td>
  </tr>
  <tr>
    <td>--yaml-file</td>
    <td>string</td>
    <td>The YAML config for this release. Cannot be used with the <code>--yaml</code> flag.</td>
  </tr>
  <tr>
    <td>--yaml-dir</td>
    <td>string</td>
    <td>The directory containing multiple YAML files for a KOTS release. Cannot be used with the <code>--yaml</code> flag.</td>
  </tr>
  <tr>
    <td>--config-values-file</td>
    <td>string</td>
    <td>Path to a manifest containing config values. Must use <code>apiVersion: kots.io/v1beta1</code>, <code>kind: ConfigValues</code>.</td>
  </tr>
  <tr>
    <td>--shared-password</td>
    <td>string</td>
    <td>Shared password for the KOTS admin console.</td>
  </tr>
  
</table>

## Examples

- For a helm app with kind distribution:

    ```bash
    replicated cluster cluster prepare \
    --distribution kind \
    --version 1.27.0 \
    --chart nginx-chart-0.0.14.tgz \
    --set key1=val1,key2=val2 \
    --set-string s1=val1,s2=val2 \
    --set-json j1='{"key1":"val1","key2":"val2"}' \
    --set-literal l1=val1,l2=val2 \
    --values values.yaml
    ```

- For a KOTS app with k3s distribution:

    ```bash
    replicated cluster prepare \
    --distribution k3s \
    --version 1.26 \
    --namespace config-validation \
    --shared-password password \
    --app-ready-timeout 10m \
    --yaml-dir config-validation \
    --config-values-file conifg-values.yaml \
    --entitlements "num_of_queues=5"
    ```

