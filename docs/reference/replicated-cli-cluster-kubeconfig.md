import Help from "../partials/replicated-cli/_help.mdx"

# cluster kubeconfig (Beta)

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
    <td>--name</td>
    <td>string</td>
    <td>The name of the cluster to download credentials for, when an ID is not provided.</td>
  </tr>
  <tr>
    <td>--output-path</td>
    <td>string</td>
    <td>The path to kubeconfig file to write to. If a path is not specified, the output will be merged to your existing kubeconfig.</td>
  </tr>
  <tr>
    <td>--stdout</td>
    <td></td>
    <td>Writes kubeconfig to stdout.</td>
  </tr>
</table>

                   
                
                     
