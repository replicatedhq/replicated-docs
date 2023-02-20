# admin-console upgrade

import EnsureRBAC from "../partials/kots-cli/_ensure-rbac.mdx" 
import Help from "../partials/kots-cli/_help.mdx" 
import KotsadmNamespace from "../partials/kots-cli/_kotsadm-namespace.mdx"
import KotsadmRegistry from "../partials/kots-cli/_kotsadm-registry.mdx" 
import RegistryPassword from "../partials/kots-cli/_registry-password.mdx"
import RegistryUsername from "../partials/kots-cli/_registry-username.mdx"
import SkipRBACCheck from "../partials/kots-cli/_skip-rbac-check.mdx"
import StrictSecurityContext from "../partials/kots-cli/_strict-security-context.mdx"
import WaitDuration from "../partials/kots-cli/_wait-duration.mdx"
import WithMinIO from "../partials/kots-cli/_with-minio.mdx"

Upgrades the Replicated admin console to match the version of kots CLI.


### Usage
```bash
kubectl kots admin-console upgrade [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:                                                                                                                                                                                                                               
<table>
    <tr>
      <th width="30%">Flag</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <EnsureRBAC/>
    <Help/>
    <KotsadmNamespace/>
    <KotsadmRegistry/>
    <RegistryPassword/>
    <RegistryUsername/>
    <SkipRBACCheck/>
    <StrictSecurityContext/>
    <WaitDuration/>
    <WithMinIO/>              
</table>

### Examples
```bash
kubectl kots admin-console upgrade --namespace kots-sentry
kubectl kots admin-console upgrade --ensure-rbac=false
```
