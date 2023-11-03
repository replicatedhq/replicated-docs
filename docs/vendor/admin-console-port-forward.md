import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"
import NginxKotsApp from "../partials/port-forward/_nginx-kots-app.mdx"
import NginxK8sApp from "../partials/port-forward/_nginx-k8s-app.mdx"
import NginxService from "../partials/port-forward/_nginx-service.mdx"
import NginxDeployment from "../partials/port-forward/_nginx-deployment.mdx"
import GiteaHelmChart from "../partials/getting-started/_gitea-helmchart-cr.mdx"
import GiteaKotsApp from "../partials/getting-started/_gitea-kots-app-cr.mdx"
import GiteaK8sApp from "../partials/getting-started/_gitea-k8s-app-cr.mdx"

# Configuring Port Forwarding

This topic describes how to add one or more ports to the Replicated KOTS port forward tunnel by configuring the `ports` key in the KOTS Application custom resource.

## Overview

When distributing an application, it is helpful to ensure that the person or process installing the application is able to easily verify that the application is running. However, networking and ingress is handled differently in each cluster, and this makes it difficult to provide a consistent application URL at installation. Additionally, the cluster operator might be required to create firewall rules before they can open the application.

To address these challenges, KOTS automatically creates a port forward tunnel and exposes the admin console on port 8800 where it can be accessed by users at installation.

In addition to the 8800 admin console port, you can configure the KOTS Application custom resource to add one or more extra ports to the port forward tunnel so that users can easily access your application at installation. For example, you can:
* List the primary application ports to provide one or more links directly to the application before ingress and firewalls are configured 
* List the ports for internal services, such as application admin controls and other services that are not exposed to all users

## Configure Port Forwarding

This section desribes how to configure port forwarding for an application, including:
* Adding extra ports to the `ports` key in the KOTS Application custom resource
* Adding a NodePort Service specification for port forwarding in embedded cluster installations with Replicated kURL
* Adding a link to a port-forwarded service from the admin console dashboard

### Add Ports to the `ports` Key {#ports-key}

You can configure the `ports` key in the KOTS Application custom resource to add extra ports to the KOTS port forward tunnel.

The following example KOTS Application custom resource includes a `ports` key that allows users to access a `gitea` service at port 8888 on the local machine at installation: 

<GiteaKotsApp/>

As shown in the example above, the `ports` key has the following fields:

<ul>

<p><PortsServiceName/></p>

For embedded cluster installations with kURL, Replicated recommends that you configure a NodePort type service to allow users to access the service from their local machine outside the cluster. For more information, see [Create a NodePort Service for kURL Installations](#nodeport).

<PortsServicePort/>

<ServicePortNote/>

<PortsLocalPort/>

<PortsApplicationURL/>

:::note
When adding a link to a port-forwarded service, it is recommended to use `http` instead of `https`, unless TLS termination takes place in the application Pod.
:::

For more information about how to add a link to a port-forwarded service from the admin console, see [Add a Link on the Admin Console Dashboard](#link) below.

</ul>

### (kURL Only) Create a NodePort Service for kURL Installations {#nodeport}

This section describes how to create a NodePort service for port forwarding in embedded cluster installations with kURL.

#### Overview

Unlike installations into existing clusters, KOTS does _not_ automatically open the port forward tunnel for installations in embedded clusters provisioned on VMs or bare metal servers by kURL. This is because it cannot be verified that the ports are secure and authenticated.

To make the admin console accessible in embedded cluster installations, the admin console is created as a NodePort service so it can be accessed at the node's IP address on port 8800. The UIs of Prometheus, Grafana, and Alertmanager are also exposed using NodePorts.

For more information about working with the NodePort service type, see [type: NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in the Kubernetes documentation.

#### Create a NodePort Service

For each additional service that you want KOTS to port forward, Replicated recommends that you create a specificaton for the service with `type: NodePort`. Additionally, you can use template functions to ensure that the NodePort specification is only deployed for embedded cluster installations.

For example, a release contains the following `sentry` service with `type: ClusterIP`: 

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sentry
  labels:
    app: sentry
spec:
  type: ClusterIP
  ports:
  - port: 9000
    targetPort: 9000
    protocol: TCP
    name: sentry
  selector:
    app: sentry
    role: web
```

To add a NodePort service for embedded cluster installations given the ClusterIP specification above:

1. Add a separate specification for the `sentry` service with `type: NodePort` and `annotation.kots.io/when: "{{repl IsKurl}}"`:

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: sentry
    labels:
      app: sentry
  annotations:
  # This annotation prevents the NodePort service from being created in non-kURL clusters
    kots.io/when: "{{repl IsKurl}}"
  spec:
    type: NodePort
    ports:
    - port: 9000
      targetPort: 9000
      nodePort: 9000
      protocol: TCP
      name: sentry
    selector:
      app: sentry
      role: web
  ```

  This creates a NodePort service _only_ when installing in embedded clusters with kURL. For more information about using the `kots.io/when` annotation, see [Conditionally Including or Excluding Resources](/vendor/packaging-include-resources). For more information about the IsKurl template fuction, see [IsKurl](/reference/template-functions-static-context#iskurl) in _Static Context_.

1. To ensure that the ClusterIP type service is only created in existing cluster installations, add `annotations.kots.io/when: "{{repl not IsKurl}}"` to the ClusterIP specification:

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: sentry
    labels:
      app: sentry
    annotations:
    # This annotation prevents the ClusterIP service from being created in kURL clusters
      kots.io/when: "{{repl not IsKurl}}"
  spec:
    type: ClusterIP
    ports:
    - port: 9000
      targetPort: 9000
      protocol: TCP
      name: sentry
    selector:
      app: sentry
      role: web
  ```

1. Add port 9000 to the KOTS Application custom resource, as described in [Add Ports to the `ports` Key](#ports-key) above.

### Add a Link on the Admin Console Dashboard {#link}

Replicated recommends that you provide a link on the admin console dashboard where users can open the port-forwarded service. 

Providing a link on the admin console dashboard is particularly helpful for embedded cluster installations with kURL because it allows users to easily open the application without needing to forward a port on their local machine to the target port on the remote virtual machine (VM) where the cluster was installed.

:::note
When adding a link to a port-forwarded service, it is recommended to use `http` instead of `https`, unless TLS termination takes place in the application Pod.
:::

To add a link to a port-forwarded service on the admin console dashboard:

1. Edit the KOTS Application custom resource to add a `ports.applicationURL` field.

  **Example:**

  ```yaml
  # kots.io/v1beta1 Application custom resource

  apiVersion: kots.io/v1beta1
  kind: Application
  metadata:
    name: gitea
  spec:
    ports:
      - serviceName: "gitea"
        servicePort: 3000
        localPort: 8888
        applicationUrl: "http://gitea"
  ```

1. Configure a Kubernetes Application custom resource that includes the same URL as the `ports.applicationURL` field in the KOTS custom resource

  Given the `applicationUrl` in the example KOTS Application custom resource in the previous step, the following Kubernetes Application custom resource adds an **Open App** button to the admin console dashboard that the user can click to open the application:

  ```yaml
  # app.k8s.io/v1beta1 Application Custom resource

  apiVersion: app.k8s.io/v1beta1
  kind: Application
  metadata:
    name: "gitea"
  spec:
    descriptor:
      links:
        - description: Open App
          url: "http://gitea"
  ```

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

For embedded cluster installations with kURL, if the user installed in a bare metal server or in a VM where they cannot open a browser window, they must first forward a port on their local machine to the target port on the remote VM using the SSH client before they can run the `kots admin-console` command to open the port forward tunnel. For an example of how to forward a port on a local machine to the admin console port 8800 on a remote VM, see [Accessing the Admin Console](/enterprise/installing-existing-cluster-automation#optional-access-the-admin-console).

### From the Admin Console

Users can access port-forwarded services by clicking a link on the admin console dashboard. Additional configuration is required to add a link to the dashboard. For more information, see [Add a Link on the Admin Console Dashboard](#link) above. 

The following example shows an **Open App** button on the dashboard of the admin console for an application named Gitea:

![admin console dashboard with Open App link](/images/gitea-open-app.png)

[View a larger version of this image](/images/gitea-open-app.png)

## Examples

This section includes examples for configuring port forwarding for Helm chart-based applications and applications that use standard manifests.

### NGINX Application with ClusterIP and NodePort Services

The following example configures port forwarding for a basic NGINX application for both existing cluster and embedded cluster installations.

To test the port forwarding for this example:

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

1. Install the release into an embedded cluster on a VM and confirm that the service was port-forwarded successfully by clicking **Open App** on the admin console dashboard. For more information, see [Online Installation in Embedded Clusters](enterprise/installing-embedded-cluster).

  :::note
  Ensure that the VM where you install allows HTTP traffic.
  :::

### Bitnami Gitea Helm Chart with LoadBalancer Service

This example provides a KOTS Application custom resource and Kubernetes Application custom resource to configure port forwarding for the Bitnami Gitea Helm chart in existing cluster installations. To view the Gitea Helm chart source, see [bitnami/gitea](https://github.com/bitnami/charts/blob/main/bitnami/gitea) in GitHub.

To test the port forwarding for this example:
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