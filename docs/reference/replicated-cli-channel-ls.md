import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# channel ls

List all channels in your application.

## Usage
```bash
replicated channel ls
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
replicated channel ls
ID                                  NAME        RELEASE    VERSION
QE1niv46O6RyHyzYp185mt5on1SOoVhn    Stable                     0.0.1
Ng4EzwjhEdR_XzjOi032qjDKjI4cz3qs    Beta                       0.0.1
BHrujJ-qAJiKQ2jIe8EP_GNukpegEF1o    Unstable                   0.1.2
```
