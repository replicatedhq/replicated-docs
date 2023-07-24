import Help from "../partials/replicated-cli/_help.mdx"

# cluster kubeconfig

Download the credentials for a test cluster.

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
    <td>--id</td>
    <td>string</td>
    <td>id of the cluster to download credentials for (when name is not provided)</td>
  </tr>
  <tr>
    <td>--name</td>
    <td>string</td>
    <td>name of the cluster to download credentials for (when id is not provided)</td>
  </tr>
  <tr>
    <td>--output-path</td>
    <td>string</td>
    <td>path to kubeconfig file to write to, if not provided, it will be merged into your existing kubeconfig</td>
  </tr>
  <tr>
    <td>--stdout</td>
    <td></td>
    <td>write kubeconfig to stdout</td>
  </tr>
</table>

                   
                
                     
