import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# customer create

Create a new customer in your application and associate a customer to a channel.
Customer information returned on success.

## Usage
```bash
replicated customer create [Flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>--name</code></td>
    <td>string</td>
    <td>The name of the customer. <strong>(Required)</strong></td>
  </tr>
  <tr>
    <td><code>--channel</code></td>
    <td>string</td>
    <td>The channel name to associate with the customer. Case-sensitive. <strong>(Required)</strong></td>
  </tr>
  <tr>
    <td><code>--ensure-channel</code></td>
    <td></td>
    <td>If set, channel is created if it does not exist.</td>
  </tr>
  <tr>
    <td><code>--expires-in</code></td>
    <td>duration</td>
    <td>If set, license will expire a specified number of units from the current time. For example, <code>2h</code> or <code>1h60m</code> or <code>120m</code> are all the same duration.</td>
  </tr>
  <tr>
    <td><code>--custom-id</code></td>
    <td>string</td>
    <td>If set, this custom alphanumeric ID is associated with this customer to more easily tie this record to your external data systems (i.e. Salesforce, Hubspot, etc.) </td>
  </tr>
</table>

## Global Flags

<GlobalFlags/>

## Examples
```bash
replicated customer create --channel Megacorp_Beta --name "Megacorp" --ensure-channel --expires-in "8760h" --custom-id "salesforceid-123"
```

```bash
ID                                  NAME        CHANNELS         EXPIRES                          TYPE    CUSTOM_ID
2u4KGXSY65SAUW0ltG_pPhxBGPJ4XNSS    Megacorp    Megacorp_Beta    2021-01-20 00:17:38 +0000 UTC    dev     salesforceid-123
```
