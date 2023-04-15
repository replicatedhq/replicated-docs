import Token from "../partials/replicated-cli/_token.mdx"
import Help from "../partials/replicated-cli/_help.mdx"

# cluster kubeconfig

Retreives the kubeconfig for a running cluter

## Usage
```bash
replicated cluster rm
```


## Examples

Create a kind cluster, using the latest version, that will expire in 1 hour:

```bash
replicated cluster create --distribution kind --ttl 1h
```
