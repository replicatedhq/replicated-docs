import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# installer ls

List the Kubernetes installer manifests for an app. For more information, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL documentation.

## Usage
```bash
replicated installer ls
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <App/>
  <Token/>
</table>

## Examples


```bash
replicated installer ls
SEQUENCE    CREATED                 ACTIVE_CHANNELS
2           2021-09-11T00:06:45Z
1           2021-09-10T23:31:13Z
```
