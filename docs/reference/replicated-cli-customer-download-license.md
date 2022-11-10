import Token from "../partials/replicated-cli/_token.mdx"
import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"

# customer download-license

Print the license YAML file for a customer.

## Usage
```bash
replicated customer download-license
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>--customer</code></td>
    <td>string</td>
    <td>The customer name or ID.</td>
  </tr>
  <Help/>
  <App/>
  <Token/>
</table>

## Examples
```bash
replicated customer download-license --customer cli-customer
apiVersion: kots.io/v1beta1
kind: License
metadata:
  name: cli-customer
spec:
  appSlug: cli-app
  channelID: 1xy9tHhAwHyoc0HEybppxPpbPn6
  channelName: Unstable
  customerName: cli-customer
  endpoint: https://staging.replicated.app
  entitlements:
    expires_at:
      description: License Expiration
      title: Expiration
      value: ""
      valueType: String
  licenseID: 1xyCOBjfm5FVkDoCYOAyvVnELfZ
  licenseSequence: 1
  licenseType: dev
  signature: (ommitted)
```
