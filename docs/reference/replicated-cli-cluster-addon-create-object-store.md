import Help from "../partials/replicated-cli/\_help.mdx"

# cluster addon create object-store (Alpha)

Create an object store bucket for a cluster.

Requires a bucket name prefix (using flag "--bucket-prefix") that will be used to create a unique bucket name with format "[BUCKET_PREFIX]-[ADDON_ID]-cmx".

_NOTE: This add-on currently only support EKS (AWS S3)._

## Usage

```bash
replicated cluster addon create object-store CLUSTER_ID --bucket-prefix BUCKET_PREFIX [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>--bucket-prefix</td>
    <td>string</td>
    <td>A prefix for the bucket name to be created. <strong>(Required)</strong></td>
  </tr>
  <tr>
    <td>--wait</td>
    <td>bool</td>
    <td>Wait duration for add-on to be ready before exiting (leave empty to not wait).</td>
  </tr>
  <tr>
    <td>--dry-run</td>
    <td>bool</td>
    <td>Simulate creation to verify that your inputs are valid without actually creating an add-on.</td>
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
$ replicated cluster addon create object-store 05929b24 --bucket-prefix mybucket
05929b24    Object Store    pending         {"bucket_prefix":"mybucket"}
```
