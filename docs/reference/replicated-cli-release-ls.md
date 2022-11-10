import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# release ls

List all of an app's releases.

## Usage
```bash
replicated release ls
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

## Example
```bash
replicated release ls
SEQUENCE    CREATED                      EDITED                  ACTIVE_CHANNELS
26          2020-01-20T17:53:22-08:00    0001-01-01T00:00:00Z    Unstable
25          2019-12-12T15:40:58-08:00    0001-01-01T00:00:00Z    
24          2019-10-28T19:41:23-07:00    0001-01-01T00:00:00Z    Beta
1           2019-10-17T15:01:16-07:00    0001-01-01T00:00:00Z    Stable   
```
