import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"
import NginxKotsApp from "../partials/application-links/_nginx-kots-app.mdx"
import NginxK8sApp from "../partials/application-links/_nginx-k8s-app.mdx"
import NginxService from "../partials/application-links/_nginx-service.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NginxDeployment from "../partials/application-links/_nginx-deployment.mdx"

# Exposing Services Using NodePorts

This topic describes how to create a NodePort service for exposing services in embedded cluster installations with Replicated kURL. 

## Overview

Unlike installations into existing clusters, KOTS does _not_ automatically open the port forward tunnel for installations in embedded clusters provisioned on virtual machines (VMs) or bare metal servers by kURL. This is because it cannot be verified that the ports are secure and authenticated.

For more information about KOTS port forwarding for existing cluster installations, see [Port Forwarding Services with KOTS](admin-console-port-forwarding).

To expose the admin console in embedded cluster installations, KOTS creates the admin console as a NodePort service so it can be accessed at the node's IP address on port 8800. The UIs of Prometheus, Grafana, and Alertmanager are also exposed using NodePorts.

For each application service that you want to expose for embedded cluster installations, Replicated recommends that you configure a NodePort type service to allow users to access the service from their local machine outside the cluster.

## Create a NodePort Service

Services with `type: NodePort` are able to be contacted from outside the cluster by connecting to any node using the appropriate protocol and port. This is helpful for embedded cluster installations where users must be able access your application from their local machine rather than from inside the cluster.

For more information about working with the NodePort service type, see [type: NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in the Kubernetes documentation.

The following shows an example of a NodePort type service:

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: sentry
    labels:
      app: sentry
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

## Use KOTS Annotations to Conditionally Deploy NodePort Services 

You can use the KOTS `kots.io/when` annotation in your application resources to deploy resources based on a conditional statement. For more information, see [Conditionally Including or Excluding Resources](/vendor/packaging-include-resources).

When you use the Replicated [IsKurl](/reference/template-functions-static-context#iskurl) template function in the conditional statement of the `kots.io/when` annotation, you can control the resources that are deployed for existing cluster installations versus embedded cluster installations with kURL. This is useful if you want to deploy a ClusterIP or LoadBalancer service for existing cluster installations, and deploy a NodePort service for embedded cluster installations only.

For example, the following `sentry` service with `type: NodePort` includes `annotation.kots.io/when: "{{repl IsKurl}}"`. This creates a NodePort service _only_ when installing in embedded clusters with kURL.:

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: sentry
    labels:
      app: sentry
  annotations:
  # This annotation prevents the NodePort service 
  # from being created in non-kURL clusters
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

Similarly, to ensure that a `sentry` service with `type: ClusterIP` is only created in existing cluster installations, add `annotations.kots.io/when: "{{repl not IsKurl}}"` to the ClusterIP specification:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sentry
  labels:
    app: sentry
annotations:
  # This annotation prevents the ClusterIP service 
  # from being created in kURL clusters
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

## Access NodePort Services

Users can access NodePort services by clicking a link to the service on the admin console dashboard. Additional configuration is required to add a link to the dashboard. For more information, see [Adding Application Links to the Dashboard](/vendor/admin-console-adding-buttons-links).

To be able to access the service, the firewall for the VM where the user installed must allow HTTP traffic and allow inbound traffic to the port where the service is exposed from their workstation. Users can consult their cloud provider's documentation for more information about updating firewall rules.

The following example shows an **Open App** button on the dashboard of the admin console for an application named Gitea:

![admin console dashboard with Open App link](/images/gitea-open-app.png)

[View a larger version of this image](/images/gitea-open-app.png)

During embedded cluster installations with kURL, the admin console is automatically created and exposed on port 8800 on the node. In most cases, the user can navigate to the admin console URL provided in the output of the installation command at `vm-ip-address:8800` from their local workstation.

If the user is not able to access the admin console from this URL (for example, if the VM firewall does not allow inbound traffic to 8800), then they can access the admin console by forwarding a port on their local machine to the target port on the remote VM using the SSH client. For information about how to forward a port on a local machine to the admin console port 8800 on a remote VM, see [Accessing the Admin Console](/enterprise/installing-existing-cluster-automation#optional-access-the-admin-console) in _Installing with Automation_.

## Example: NGINX Application with ClusterIP and NodePort Services

The following example demonstrates how to expose a basic NGINX service for both existing cluster and embedded cluster installations.

To test this example:

1. Add the `example-service.yaml`, `example-deployment.yaml`, `kots-app.yaml`, and `k8s-app.yaml` files provided below to a new, empty release in the vendor portal. Promote to the channel that you use for internal testing.

  For more information, see [Managing Releases with the Vendor Portal](releases-creating-releases).

  <Tabs>
<TabItem value="service" label="example-service.yaml" default>
<h5>Description</h5>
<p>The YAML below contains ClusterIP and NodePort specifications for a service named <code>nginx</code>. Each specification uses the <code>kots.io/when</code> annotation with the Replicated IsKurl template function to conditionally include the service based on the installation type (existing cluster or embedded kURL cluster). For more information, see <a href="/vendor/packaging-include-resources">Conditionally Including or Excluding Resources</a> and <a href="/reference/template-functions-static-context#iskurl">IsKurl</a>.</p>
<p>As shown below, both the ClusterIP and NodePort <code>nginx</code> services are exposed on port 80.</p>
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

