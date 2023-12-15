import Help from "../partials/replicated-cli/_help.mdx"
import Output from "../partials/replicated-cli/_output.mdx"

# cluster update ttl

Increase the Time to Live (TTL) for a cluster provisioned with the Replicated compatibility matrix. The `cluster update ttl` command updates the expiration timestamp for a cluster and does _not_ change the creation timestamp.

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
    <p>The updated TTL for the cluster, in hours. <strong>Valid values:</strong> 1h through 48h. For example, to update the TTL to ten hours, use <code>--ttl 10h</code>.</p>
    <p>The updated TTL must be higher than the current TTL. You cannot reduce the TTL of a cluster.</p>
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
