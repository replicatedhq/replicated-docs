import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"
import NginxKotsApp from "../partials/application-links/_nginx-kots-app.mdx"
import NginxK8sApp from "../partials/application-links/_nginx-k8s-app.mdx"
import NginxService from "../partials/application-links/_nginx-service.mdx"
import NginxDeployment from "../partials/application-links/_nginx-deployment.mdx"
import GiteaHelmChart from "../partials/getting-started/_gitea-helmchart-cr.mdx"
import GiteaKotsApp from "../partials/getting-started/_gitea-kots-app-cr.mdx"
import GiteaK8sApp from "../partials/getting-started/_gitea-k8s-app-cr.mdx"

# Port Forwarding Services with KOTS

This topic describes how to add one or more ports to the Replicated KOTS port forward tunnel by configuring the `ports` key in the KOTS Application custom resource.

The information in this topic applies to existing cluster installations. For information about exposing services for embedded cluster installations with Replicated kURL, see [Exposing Services Using NodePorts](kurl-nodeport-services).

## Overview

When distributing an application, it is helpful to ensure that the person or process installing the application is able to easily verify that the application is running. However, networking and ingress is handled differently in each cluster, and this makes it difficult to provide a consistent application URL at installation. Additionally, the cluster operator might be required to create firewall rules before they can open the application.

To address these challenges with installations into existing clusters, KOTS automatically creates a port forward tunnel and exposes the admin console on port 8800 where it can be accessed by users at installation.

In addition to the 8800 admin console port, you can configure the KOTS Application custom resource to add one or more extra ports to the port forward tunnel so that users installing in exsting clusters can easily access your application at installation. For example, you can:
* List the primary application ports to provide one or more links directly to the application before ingress and firewalls are configured 
* List the ports for internal services, such as application admin controls and other services that are not exposed to all users
## Configure Port Forwarding

This section describes how to configure port forwarding for existing cluster installations by adding extra ports to the `ports` key in the KOTS Application custom resource

You can configure the `ports` key in the KOTS Application custom resource to add extra ports to the KOTS port forward tunnel.

The following example KOTS Application custom resource includes a `ports` key that allows users to access a `gitea` service at port 8888 on the local machine at installation: 

<GiteaKotsApp/>

As shown in the example above, the `ports` key has the following fields:

<ul>

<p><PortsServiceName/></p>

<PortsServicePort/>

<ServicePortNote/>

<PortsLocalPort/>

<PortsApplicationURL/>

:::note
When adding a link to a port-forwarded service, it is recommended to use `http` instead of `https`, unless TLS termination takes place in the application Pod.
:::

For more information about how to add a link to a port-forwarded service from the admin console, see [Add a Link on the Admin Console Dashboard](#link) below.

</ul>

For more information, see [Adding Buttons and Links](admin-console-adding-buttons-links).

## Access Port-Forwarded Services

When you configure port forwarding for your application, your users can access the port-forwarded services by getting the URL from the kots CLI, or by clicking a link on the admin console dashboard.

### From the Command Line

Users can run [`kubectl kots admin-console`](/reference/kots-cli-admin-console-index) to open the KOTS port forward tunnel.

The `kots admin-console` command runs the equivalent of `kubectl port-forward svc/myapplication-service <local-port>:<remote-port>`, then prints a message with the URLs where the user can access the admin console and any port-forwarded services. For more information about the `kubectl port-forward` command, see [port-forward](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#port-forward) in the Kubernetes documentation.

**Example:**

```bash
kubectl kots admin-console --namespace gitea
```
```
• Press Ctrl+C to exit
• Go to http://localhost:8800 to access the Admin Console
• Go to http://localhost:8888 to access the application
```

### From the Admin Console

Users can access port-forwarded services by clicking a link on the admin console dashboard. Additional configuration is required to add a link to the dashboard. For more information, see [Add a Link on the Admin Console Dashboard](#link) above. 

The following example shows an **Open App** button on the dashboard of the admin console for an application named Gitea:

![admin console dashboard with Open App link](/images/gitea-open-app.png)

[View a larger version of this image](/images/gitea-open-app.png)

## Examples

This section includes examples for configuring port forwarding for Helm chart-based applications and applications that use standard manifests.

### NGINX Application with ClusterIP and NodePort Services

The following example demonstrates how to expose a basic NGINX service for both existing cluster and embedded cluster installations.

To test this example:

1. Add the `example-service.yaml`, `example-deployment.yaml`, `kots-app.yaml`, and `k8s-app.yaml` files provided below to a new, empty release in the vendor portal. Promote to the channel that you use for internal testing.

  For more information, see [Managing Releases with the Vendor Portal](releases-creating-releases).

  <Tabs>
<TabItem value="service" label="example-service.yaml" default>
<h5>Description</h5>
<p>The YAML below contains ClusterIP and NodePort specifications for a service named <code>nginx</code>. Each specification uses the <code>kots.io/when</code> annotation with the Replicated IsKurl template function to conditionally include the service based on the installation type (existing cluster or embedded kURL cluster). For more information, see <a href="/vendor/packaging-include-resources">Conditionally Including or Excluding Resources</a> and <a href="/reference/template-functions-static-context#iskurl">IsKurl</a>.</p>
<p>As shown below, both the ClusterIP and LoadBalancer <code>nginx</code> services are exposed on port 80.</p>
<h5>YAML</h5>
<NginxService/>
</TabItem>
<TabItem value="deployment" label="example-deployment.yaml" default>
<h5>Description</h5>
<p>A basic Deployment specification for the NGINX application.</p>
<h5>YAML</h5>
<NginxDeployment/>
</TabItem>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<p>The KOTS Application custom resource below adds port 80 to the KOTS port forward tunnel and maps port 8888 on the local machine. The specification also includes <code>applicationUrl: "http://nginx"</code> so that a link to the service can be added to the admin console dashboard.</p>
<h5>YAML</h5>
<NginxKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<p>Using the value of <code>ports.applicationUrl</code> in <code>kots-app.yaml</code>, the Kubernetes Application custom resource below adds a link to the port-forwarded service from the admin console dashboard. The label to be used for the link in the admin console is "Open App".</p>
<h5>YAML</h5>
<NginxK8sApp/>
</TabItem>
</Tabs>

1. Install the release into an existing cluster and confirm that the service was port-forwarded successfully by clicking **Open App** on the admin console dashboard. For more information, see [Online Installation in Existing Clusters](enterprise/installing-existing-cluster).

1. If there is not already a Kubernetes installer promoted to the channel, add a Kubernetes installer to the release to support embedded cluster installs. For more information, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

   **Example:**

   ```yaml
   apiVersion: cluster.kurl.sh/v1beta1
  kind: Installer
  metadata:
    name: ""
   spec:
    containerd:
      version: 1.6.24
    contour:
      version: 1.27.0
    ekco:
      version: 0.28.3
    flannel:
      version: 0.23.0
    kotsadm:
      version: 1.103.3
    kubernetes:
      version: 1.27.6
    minio:
      version: 2023-11-01T18-37-25Z
    openebs:
      isLocalPVEnabled: true
      localPVStorageClassName: local
      version: 3.9.0
    prometheus:
      version: 0.68.0-51.0.0
    registry:
      version: 2.8.3
   ```

1. Install the release into an embedded cluster on a VM and confirm that the service was exposed successfully by clicking **Open App** on the admin console dashboard. For more information, see [Online Installation in Embedded Clusters](enterprise/installing-embedded-cluster).

  :::note
  Ensure that the VM where you install allows HTTP traffic.
  :::

### Bitnami Gitea Helm Chart with LoadBalancer Service

This example provides a KOTS Application custom resource and Kubernetes Application custom resource to configure port forwarding for the Bitnami Gitea Helm chart in existing cluster installations. To view the Gitea Helm chart source, see [bitnami/gitea](https://github.com/bitnami/charts/blob/main/bitnami/gitea) in GitHub.

To test this example:
1. Pull version 1.0.6 of the Gitea Helm chart from Bitnami:

   ```
   helm pull oci://registry-1.docker.io/bitnamicharts/gitea --version 1.0.6
   ```
1. Add the `gitea-1.0.6.tgz` chart archive to a new, empty release in the vendor portal along with the `kots-app.yaml`, `k8s-app.yaml`, and `gitea.yaml` files provided below. Promote to the channel that you use for internal testing.

  For more information, see [Managing Releases with the Vendor Portal](releases-creating-releases).

  <Tabs>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<p>Based on the <a href="https://github.com/bitnami/charts/blob/main/bitnami/gitea/templates/svc.yaml">templates/svc.yaml</a> and <a href="https://github.com/bitnami/charts/blob/main/bitnami/gitea/values.yaml">values.yaml</a> files in the Gitea Helm chart, the following KOTS Application custom resource adds port 3000 to the port forward tunnel and maps local port 8888. Port 3000 is the container port of the Pod where the <code>gitea</code> service runs.</p>
<h5>YAML</h5>
<GiteaKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<p>Using the value of <code>ports.applicationUrl</code> in <code>kots-app.yaml</code>, the Kubernetes Application custom resource below adds a link to the port-forwarded service from the admin console dashboard. The label to be used for the link in the admin console is "Open App".</p>
<h5>YAML</h5>
<GiteaK8sApp/>
</TabItem>
<TabItem value="helmchart" label="gitea.yaml" default>
<h5>Description</h5>
<p>The KOTS HelmChart custom resource provides instructions to KOTS about how to deploy the Helm chart. The <code>name</code> and <code>chartVersion</code> listed in the HelmChart custom resource must match the name and version of a Helm chart archive in the release. Each Helm chart archive in a release requires a unique HelmChart custom resource.</p>
<h5>YAML</h5>
<GiteaHelmChart/>
</TabItem>
</Tabs>

1. Install the release into an existing cluster and confirm that the service was port-forwarded successfully by clicking **Open App** on the admin console dashboard. For more information, see [Online Installation in Existing Clusters](enterprise/installing-existing-cluster).

## Additional Resources and Examples

The following articles on the Replicated Community site provide additional information and examples related to configuring port forwarding:

* [Port forwarding for embedded cluster](https://community.replicated.com/t/port-forwarding-for-embedded-cluster/472)
* [Issues getting port forward / dashboard links working](https://community.replicated.com/t/issues-getting-port-forward-dashboard-links-working/809)