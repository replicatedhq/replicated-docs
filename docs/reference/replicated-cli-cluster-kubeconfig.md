import Help from "../partials/replicated-cli/_help.mdx"

# cluster kubeconfig (Beta)

Download the kubeconfig for a cluster created with the Replicated compatibility matrix. For more information, see [About the Compatibility Matrix](/vendor/testing-about).

## Usage

```bash
replicated cluster kubeconfig ID [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td><code>--id</code></td>
    <td>string</td>
    <td>The ID of the cluster to download credentials for, when a name is not specified.</td>
  </tr>
  <tr>
    <td><code>--name</code></td>
    <td>string</td>
    <td>The name of the cluster to download credentials for, when an ID is not provided.</td>
  </tr>
  <tr>
    <td><code>--output-path</code></td>
    <td>string</td>
    <td>The path to write to. If a path is not specified, the output is merged to your existing kubeconfig.</td>
  </tr>
  <tr>
    <td><code>--stdout</code></td>
    <td></td>
    <td>Writes kubeconfig to stdout.</td>
  </tr>
</table>

                   
                
                     
