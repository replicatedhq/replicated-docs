import Token from "../partials/replicated-cli/_token.mdx"
import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"

# customer ls

List all customers in your application.

## Usage
```bash
replicated customer ls
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
replicated customer ls
ID                                  NAME                            CHANNELS         EXPIRES    TYPE
iEgJuVDHy2pi-AqOjLXbZCTX9bqlV6YH    John Smith                      Unstable         Never      
YAg7ripYbK0tM5MVn_81nMy0YrhBsHrm    Megacorp                        Megacorp_Beta    Never      
```
