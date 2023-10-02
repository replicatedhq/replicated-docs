import Help from "../partials/replicated-cli/_help.mdx"

# api

Make adhoc calls to the Vendor API v3. Uses your local credentials and prints the response unmodified. For more information, see the [Vendor API v3 documentation](https://replicated-vendor-api.readme.io/reference/createapp).

## Usage

```bash
replicated api [command]
```

Pass the PATH of the request as the final argument. Do not include the host or version. Replicated recommends piping the output to jq for easier reading.

### Available Commands

<table>
  <tr>
    <th>Command</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>get</td>
    <td>Make adhoc GET API calls to the Vendor API v3</td>
  </tr>
  <tr>
    <td>post</td>
    <td>Make adhoc POST API calls to the Vendor API v3</td>
  </tr>
  <tr>
    <td>put</td>
    <td>Make adhoc PUT API calls to the Vendor API v3</td>
  </tr>
</table>

### Flags

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
</table>

## Examples

```bash
replicated api get /v3/apps
```

```bash
replicated api put /v3/app/2EuFxKLDxKjPNk2jxMTmF6Vxvxu/channel/2QLPm10JPkta7jO3Z3Mk4aXTPyZ -b '{"name":"put-example"}'
```

```bash
replicated api post /v3/app/2EuFxKLDxKjPNk2jxMTmF6Vxvxu/channel -b '{"name":"post-example"}'
```