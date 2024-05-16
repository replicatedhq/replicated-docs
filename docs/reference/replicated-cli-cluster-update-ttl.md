import Help from "../partials/replicated-cli/\_help.mdx"
import Output from "../partials/replicated-cli/\_output.mdx"

# cluster update ttl

Increase or decrease the Time to Live (TTL) for a running cluster that was provisioned with the Replicated compatibility matrix. The `cluster update ttl` command updates the expiration timestamp for a cluster and does _not_ change the creation timestamp.

For more information, see [About the Compatibility Matrix](/vendor/testing-about).

## Usage

```bash
replicated cluster update ttl [ID] [flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <Output/>
  <tr>
    <td><code>--ttl</code></td>
    <td>string</td>
    <td>
    <p>The updated TTL for the cluster, in hours or minutes. Must be a duration longer than the current lifespan of the cluster. <strong>Valid values:</strong> 10m through 48h. For example, <code>15h</code> or <code>120min</code>.</p>
    </td>
  </tr>
  <tr>
   <td><code>--id</code></td>
   <td>string</td>
   <td>
   <p>id of the cluster to update TTL (when name is not provided)</p>
   </td>
  </tr>
   <tr>
   <td><code>--name</code></td>
   <td>string</td>
   <td>
   <p>Name of the cluster to update TTL.</p>
   </td>
  </tr>
</table>

## Example

Given the following cluster with a TTL of one hour:

```bash
replicated cluster ls 81cd2169
ID          NAME                           DISTRIBUTION    VERSION       STATUS          CREATED                          EXPIRES                          TAGS
81cd2169    gallant_fermat                 gke             1.27          running         2023-12-15 19:16:56 +0000 UTC    2023-12-15 20:21:35 +0000 UTC
```

Update the TTL to two hours:

```bash
replicated cluster update ttl 81cd2169 --ttl 2h
ID          NAME                           DISTRIBUTION    VERSION       STATUS          CREATED                          EXPIRES                          TAGS
81cd2169    gallant_fermat                 gke             1.27          running         2023-12-15 19:16:56 +0000 UTC    2023-12-15 21:21:35 +0000 UTC
```

Update the TTL to two hours using the `name` flag. We first look for [ID]. If not specified, we look for the first matching cluster with the same name as specified by `--name`. If also `--name` is not provided, we look for `--id`.

```bash
replicated cluster update ttl --name gallant_fermat --ttl 2h
ID          NAME                           DISTRIBUTION    VERSION       STATUS          CREATED                          EXPIRES                          TAGS
81cd2169    gallant_fermat                 gke             1.27          running         2023-12-15 19:16:56 +0000 UTC    2023-12-15 21:21:35 +0000 UTC
```
