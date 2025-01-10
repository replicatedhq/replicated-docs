import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# customer ls

List the customers for your application.

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
  <td><code>--app-version</code></td><td>string</td><td>The application version. Used to list customers and their instances for a specific application version.</td>
</table>

## Global Flags

<GlobalFlags/>

## Examples

List all customers:

```bash
replicated customer ls
ID                                  NAME                            CHANNELS         EXPIRES    TYPE    CUSTOM_ID
iEgJuVDHy2pi-AqOjLXbZCTX9bqlV6YH    John Smith                      Unstable         Never              Not Set
YAg7ripYbK0tM5MVn_81nMy0YrhBsHrm    Megacorp                        Megacorp_Beta    Never              salesforceid-123
```

List customers and their instances for a specific application version:

```bash
replicated customer ls --app-version 1.1.0

CUSTOMER NAME       INSTANCE ID                         LAST ACTIVE                         VERSION
ACME Corp           iEgJuVDHy2pi-AqOjLXbZCTX9bqlV6YH    2023-05-23 23:13:01.403 +0000 UTC   1.1.0
Megacorp            YAg7ripYbK0tM5MVn_81nMy0YrhBsHrm    2023-05-24 00:00:02.937 +0000 UTC   1.1.0
