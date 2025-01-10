import Output from "../partials/replicated-cli/_output.mdx"
import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# cluster nodegroup ls

List node groups for a cluster.

For more information, see [About Compatibility Matrix](/vendor/testing-about).

## Usage

```bash
replicated cluster nodegroup ls [ID]
```

## Global Flags

<GlobalFlags/>

## Example

A cluster with three node groups:

```bash
ID          NAME       DEFAULT    INSTANCE TYPE    NODES    DISK
c1955ee4    default    true       Standard_B2ms    1        50
4073a716    lkfsqe     false      Standard_B2ms    1        100
47124127    zrbwpm     false      Standard_B2ms    1        100
```

