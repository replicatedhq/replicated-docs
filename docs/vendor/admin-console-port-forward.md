import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HelmKotsApp from "../partials/port-forward/_helm-kots-app.mdx"
import HelmK8sApp from "../partials/port-forward/_helm-k8s-app.mdx"
import HelmService from "../partials/port-forward/_helm-service.mdx"
import SentryKotsApp from "../partials/port-forward/_sentry-kots-app.mdx"
import SentryK8sApp from "../partials/port-forward/_sentry-k8s-app.mdx"
import SentryNodePort from "../partials/port-forward/_sentry-nodeport.mdx"
import SentryClusterIp from "../partials/port-forward/_sentry-clusterip.mdx"
import NginxKotsApp from "../partials/port-forward/_nginx-kots-app.mdx"
import NginxK8sApp from "../partials/port-forward/_nginx-k8s-app.mdx"
import NginxService from "../partials/port-forward/_nginx-service.mdx"

# Configuring Port Forwarding

This topic describes how to add one or more ports to the Replicated KOTS port forward tunnel by configuring the `ports` key in the KOTS Application custom resource.

## Overview

When distributing an application, it is helpful to ensure that the person or process installing the application is able to easily verify that the application is running. However, networking and ingress is handled differently in each cluster, and this makes it difficult to provide a consistent application URL at installation. Additionally, the cluster operator might be required to create firewall rules before they can open the application.

To address these challenges, KOTS automatically creates a port forward tunnel and exposes the admin console on port 8800 where it can be accessed by users at installation.

In addition to the 8800 admin console port, you can configure the KOTS Application custom resource to add one or more extra ports to the port forward tunnel so that users can easily access your application at installation. For example, you can:
* List the primary application ports to provide one or more links directly to the application before ingress and firewalls are configured 
* List the ports for internal services, such as application admin controls and other services that are not exposed to all users

## Configure Port Forwarding

### Configure the `ports` Key

You can configure the `ports` key in the KOTS Application custom resource to add extra ports to the KOTS port forward tunnel. When you add a port to the `ports` key, users can get the URL to access the specified service from their local machine by running `kubectl kots admin-console`. For more information about accessing port-forwaded services, see [Accessing Port Forwarded Services](#accessing-port-forwarded-services) below.

The following shows an example `ports` key that allows users to access the `gitea` service at port 8888 on the local machine at installation: 

```yaml
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

As shown in the example above, the `ports` key has the following fields:

<ul>

<p><PortsServiceName/></p>

For embedded cluster installations with Replicated kURL, Replicated recommends that you configure a NodePort type service to allow users to access the service from their local machine outside the cluster. For more information, see [Create a NodePort Service for kURL Installations](#nodeport) below.

<PortsServicePort/>

<ServicePortNote/>

<PortsLocalPort/>

<PortsApplicationURL/>

For more information, see [Add a Link on the Admin Console Dashboard](#link) below.

</ul>

### (kURL Only) Create a NodePort Service for kURL Installations {#nodeport}

Unlike installations into existing clusters, KOTS does _not_ automatically open the port forward tunnel for installations in embedded clusters provisioned by Replicated kURL. This is because it cannot be verified that the ports are secure and authenticated.

To work around this limitation, a NodePort service is created for the admin console so that it can be accessed from the user's local machine at the node IP address. Replicated recommends that you use the same method to create NodePort specifications for any services that you want KOTS to port forward.

For more information about the NodePort service type, see [type: NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in the Kubernetes documentation.

### Add a Link on the Admin Console Dashboard {#link}

Replicated recommends that you provide a link on the admin console dashboard where users can open the port-forwarded service. 

Providing a link on the admin console dashboard is particularly helpful for embedded cluster installations with kURL because it allows users to easily open the application without needing to forward a port on their local machine to the target port on the remote virtual machine (VM) where the cluster was installed.

To add a link to a port-forwaded service on the admin console dashboard:

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

## Examples

### Helm Chart

<Tabs>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<p><a href="https://github.com/replicatedhq/enterprise-gtm-starter/blob/main/manifests/kots-app.yaml">kots-app.yaml</a></p>
<h5>YAML</h5>
<HelmKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<p><a href="https://github.com/replicatedhq/enterprise-gtm-starter/blob/main/manifests/k8s-app.yaml">k8s-app.yaml</a></p>
<h5>YAML</h5>
<HelmK8sApp/>
</TabItem>
<TabItem value="service" label="service.yaml" default>
<h5>Description</h5>
<p><a href="https://github.com/replicatedhq/enterprise-gtm-starter/blob/main/templates/service.yaml">service.yaml</a></p>
<h5>YAML</h5>
<HelmService/>
</TabItem>
</Tabs>

### Standard Manifests with Replicated Template Functions

<Tabs>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<h5>YAML</h5>
<SentryKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<h5>YAML</h5>
<SentryK8sApp/>
</TabItem>
<TabItem value="service-cip" label="service-default.yaml" default>
<h5>Description</h5>
<p>The following example shows the default ClusterIP service specification for a service named <code>sentry</code>. This specification includes a <code>kots.io/when</code> annotation, which ensures that the service is only created for existing cluster installations.</p>
<h5>YAML</h5>
<SentryClusterIp/>
</TabItem>
<TabItem value="service-np" label="service-kurl.yaml" default>
<h5>Description</h5>
<p>The following example shows a NodePort specification for the <code>sentry</code> service. This specification includes a <code>kots.io/when</code> annotation that ensures that the service is only created for kURL installations.</p>
<h5>YAML</h5>
<SentryNodePort/>
</TabItem>
</Tabs>

### Standard Manifests with NodePort Service Only

<Tabs>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<h5>YAML</h5>
<NginxKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<h5>YAML</h5>
<NginxK8sApp/>
</TabItem>
<TabItem value="service" label="nginx-service.yaml" default>
<h5>Description</h5>
<p></p>
<h5>YAML</h5>
<NginxService/>
</TabItem>
</Tabs>

## Access Port-Forwarded Services

When you configure port forwarding for your application, your users can access the port-forwarded services by getting the URL from the kots CLI, or by clicking a link on the admin console dashboard.

### From the Command Line

Users can run [`kubectl kots admin-console`](/reference/kots-cli-admin-console-index) to open the KOTS port forward tunnel. The `kots admin-console` command prints a message with the URLs where the user can access the admin console and any port-forwarded services.

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

![admin console dashboard with Open App link](/images/gitea-open-app.png)

[View a larger version of this image](/images/gitea-open-app.png)

## Additional Resources and Examples

* [Port forwarding for embedded cluster](https://community.replicated.com/t/port-forwarding-for-embedded-cluster/472)
* [Issues getting port forward / dashboard links working](https://community.replicated.com/t/issues-getting-port-forward-dashboard-links-working/809)