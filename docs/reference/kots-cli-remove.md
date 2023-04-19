# remove

Remove application reference from the Replicated admin console.

You can use the `kots remove` command to remove one or more installed applications from the admin console.
By default, the deployed application is not removed from the cluster. Only the reference for the application is removed from the admin console. To completely remove the application and delete its resources from the cluster, use the `--undeploy` flag.

### Usage
```bash
kubectl kots remove [app-slug] -n [namespace]
```
* _`[app-slug]` is the slug of the installed application to be removed (required)_
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:

<table>
  <tr>
    <th width="20%">Flag</th>
    <th width="10%">Type</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>--force</code></td>
    <td><code>bool</code></td>
    <td><p>Removes the reference even if the application has already been deployed.</p></td>
  </tr>
  <tr>
    <td><code>--undeploy</code></td>
    <td><code>bool</code></td>
    <td><p>Un-deploys the application by deleting all its resources from the cluster. When `--undeploy` is set, the `--force` flag is set automatically.</p>
      <p>To un-deploy an application, <code>kots remove</code> uses the <code>kots.io/app-slug:</code> annotation that the app manager adds to all resources deployed with <code>kubectl apply</code>. So any standalone manifests in the release, and any resources deployed by the Replicated Helm method, are identified by that annotation and removed. Resources are only created in the namespace where the app manager is deployed and the list of additionalNamespaces (docs), so resources are only deleted in those namespaces.</p></td>
  </tr>
  <tr>
    <td><code>-n</code></td>
    <td><code>string</code></td>
    <td><p>The namespace of the application to remove. Use `default` for the default namespace.</p></td>
  </tr>
</table>

| Flag         | Type   | Description                                                            |
|:-------------|--------|------------------------------------------------------------------------|
| `--force`    |  bool  | Removes the reference even if the application has already been deployed. |
| `--undeploy` |  bool  | Undeploys the application by deleting all its resources from the cluster. When `--undeploy` is set, the `--force` flag is set automatically. KOTS adds the `kots.io/app-slug: <app-slug>` annotation to all resources it deploys. This annotation is used to delete the resources that were deployed by kubectl apply. So any standalone manifests in the release, and any resources deployed by the Replicated Helm method, are identified by that annotation and removed. Resources are only created in the namespace where the app manager is deployed and the list of additionalNamespaces (docs), so resources are only deleted in those namespaces.|
| `-n`         | string | The namespace of the application to remove. Use `default` for the default namespace. |

### Example
```bash
kubectl kots remove sentry -n default
```
