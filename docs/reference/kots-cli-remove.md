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
    <td>
      <p>Removes the reference even if the application has already been deployed.</p>
    </td>
  </tr>
  <tr>
    <td><code>--undeploy</code></td>
    <td><code>bool</code></td>
    <td>
      <p>Un-deploys the application by deleting all its resources from the cluster. When <code>--undeploy</code> is set, the <code>--force</code> flag is set automatically.</p>
      <p><strong>Note:</strong> <code>--undeploy</code> can remove application resources only from the namespace where KOTS is installed and from any namespaces provided in the <a href="custom-resource-application#additionalnamespaces">additionalNamespaces</a> field in the Application custom resource.</p>
      <p>The following describes how <code>--undeploy</code> removes application resources:</p>
      <ul>
        <li>For applications deployed with <code>kubectl apply</code> (including standalone manifest files and Helm charts deployed with <a href="/vendor/helm-native-about#replicated">Replicated Helm</a>), <code>--undeploy</code> identifies and removes resources based on a <code>kots.io/app-slug: &lt;app_slug&gt;</code> annotation that is applied to all application resources during deployment. </li>
        <li>For Helm chart applications deployed with HelmChart custom resources with <code>apiVersion: kots.io/v1beta2</code> or <code>apiVersion: kots.io/v1beta1</code> and <code>useHelmInstall: true</code>, <code>--undeploy</code> runs <code>helm uninstall</code>.</li>
      </ul>  
      </td>
  </tr>
  <tr>
    <td><code>-n</code></td>
    <td><code>string</code></td>
    <td><p>The namespace where the target application is deployed. Use <code>default</code> for the default namespace.</p></td>
  </tr>
</table>

### Example
```bash
kubectl kots remove sentry -n default
```
