import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# api

Make adhoc calls to the Vendor API v3. Uses your local credentials and prints the response unmodified. For more information, see the [Vendor API v3 documentation](https://replicated-vendor-api.readme.io/reference/createapp).

## Usage

```bash
replicated api [command] [flags]
```
The following commands are available:

<table>
  <tr>
    <th>Command</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>[get](replicated-cli-api-get)</td>
    <td>Make adhoc GET API calls to the Vendor API v3</td>
  </tr>
  <tr>
    <td>[patch](replicated-cli-api-patch)</td>
    <td>Make adhoc PATCH API calls to the Vendor API v3</td>
  </tr>
  <tr>
    <td>[post](replicated-cli-api-post)</td>
    <td>Make adhoc POST API calls to the Vendor API v3</td>
  </tr>
  <tr>
    <td>[put](replicated-cli-api-put)</td>
    <td>Make adhoc PUT API calls to the Vendor API v3</td>
  </tr>
</table>

## Global Flags

<GlobalFlags/>

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