import Help from "../partials/replicated-cli/_help.mdx"

# cluster addon ls

List cluster add-ons for a cluster

## Usage

```bash
replicated cluster addon ls CLUSTER_ID [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. <strong>Value values:</strong> json, table or wide. <strong>Default:</strong> table</td>
  </tr>
  <Help/>
</table>

## Example

```bash
$ replicated cluster addon ls 4d2f7e70
ID          TYPE            STATUS          DATA
05929b24    Object Store    ready           {"bucket_prefix":"mybucket","bucket_name":"mybucket-05929b24-cmx","service_account_namespace":"cmx","service_account_name":"mybucket-05929b24-cmx","service_account_name_read_only":"mybucket-05929b24-cmx-ro"}
```
