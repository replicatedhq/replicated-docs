import Help from "../partials/replicated-cli/_help.mdx"
import Output from "../partials/replicated-cli/_output.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# cluster nodegroup ls

List node groups for a cluster.

For more information, see [About the Compatibility Matrix](/vendor/testing-about).

## Usage

```bash
replicated cluster nodegroup ls [ID]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <Token/>
</table>

## Example

A cluster with three node groups:

```bash
ID          NAME       DEFAULT    INSTANCE TYPE    NODES    DISK
c1955ee4    default    true       Standard_B2ms    1        50
4073a716    lkfsqe     false      Standard_B2ms    1        100
47124127    zrbwpm     false      Standard_B2ms    1        100
```

