import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"
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
import GiteaKotsApp from "../partials/port-forward/_gitea-kots-app.mdx"
import GiteaK8sApp from "../partials/port-forward/_gitea-k8s-app.mdx"
import GiteaService from "../partials/port-forward/_gitea-service.mdx"

# Configuring Port Forwarding

This topic describes how to add one or more ports to the Replicated KOTS port forward tunnel by configuring the `ports` key in the KOTS Application custom resource.

## Overview

When distributing an application, it is helpful to ensure that the person or process installing the application is able to easily verify that the application is running. However, networking and ingress is handled differently in each cluster, and this makes it difficult to provide a consistent application URL at installation. Additionally, the cluster operator might be required to create firewall rules before they can open the application.

To address these challenges, KOTS automatically creates a port forward tunnel and exposes the admin console on port 8800 where it can be accessed by users at installation.

In addition to the 8800 admin console port, you can configure the KOTS Application custom resource to add one or more extra ports to the port forward tunnel so that users can easily access your application at installation. For example, you can:
* List the primary application ports to provide one or more links directly to the application before ingress and firewalls are configured 
* List the ports for internal services, such as application admin controls and other services that are not exposed to all users

## Configure Port Forwarding

This section desribes how to configure the KOTS Application Custom Resource, the Kubernetes Application Custom Resource, and the target service to enable port forwarding for both existing and embedded cluster installations.

For examples of the tasks described in this section, see [Examples](#examples) below.

### Add Ports to the `ports` Key {#ports-key}

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

:::note
When adding a link to a port-forwarded service, it is recommended to use `http` instead of `https`, unless TLS termination takes place in the application Pod.
:::

For more information about how to add a link to a port-forwarded service from the admin console, see [Add a Link on the Admin Console Dashboard](#link) below.

</ul>

### (kURL Only) Create a NodePort Service for kURL Installations {#nodeport}

Unlike installations into existing clusters, KOTS does _not_ automatically open the port forward tunnel for installations in embedded clusters provisioned by Replicated kURL. This is because it cannot be verified that the ports are secure and authenticated.

To work around this limitation in embedded cluster installations, the admin console service is created with a NodePort type so that it can be accessed at the node's IP address from the user's local machine. For any additional services that you want KOTS to port forward, Replicated recommends that you use the same method of creating NodePort specifications for the service. For more information about the NodePort service type, see [type: NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in the Kubernetes documentation.

#### Example

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

Add a separate specification for the `sentry` service with `type: NodePort` and `annotation.kots.io/when: "{{repl IsKurl}}"`. This creates a NodePort service only for embedded cluster installations with kURL.

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

Then, add `annotations.kots.io/when: "{{repl not IsKurl}}"` to the ClusterIP specification to prevent the ClusterIP service from being created for embedded cluster installations:

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

After adding both service specifications to the release, you can then add the port for the service to the KOTS Application custom resource, as described in [Add Ports to the `ports` Key](#ports-key) above.

For additional examples of conditionally deploying either a ClusterIP or NodePort service based on the cluster distribution, see [Examples](#examples) below.


### Add a Link on the Admin Console Dashboard {#link}

Replicated recommends that you provide a link on the admin console dashboard where users can open the port-forwarded service. 

Providing a link on the admin console dashboard is particularly helpful for embedded cluster installations with kURL because it allows users to easily open the application without needing to forward a port on their local machine to the target port on the remote virtual machine (VM) where the cluster was installed.

:::note
When adding a link to a port-forwarded service, it is recommended to use `http` instead of `https`, unless TLS termination takes place in the application Pod.
:::

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

## Access Port-Forwarded Services

When you configure port forwarding for your application, your users can access the port-forwarded services by getting the URL from the kots CLI, or by clicking a link on the admin console dashboard.

### From the Command Line

Users can run [`kubectl kots admin-console`](/reference/kots-cli-admin-console-index) to open the KOTS port forward tunnel. The `kots admin-console` command runs the equivalent of `kubectl port-forward svc/myapplication-service <local-port>:<remote-port>` then prints a message with the URLs where the user can access the admin console and any port-forwarded services. For more information about the `kubectl port-forward` command, see [port-forward](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#port-forward) in the Kubernetes documentation.

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

## Examples

This section includes several examples for configuring port forwarding in both Helm chart-based applications and applications that use standard manifests.

To test each of the examples in this section, add the files provided to a new release. For the Helm chart-based applications, add the Service manifest provided to the Helm chart templates directory and then package the Helm chart into a `.tgz` archive before adding it to the release.

### Helm Chart with LoadBalancer Service

This example uses the Bitnami Gitea Helm chart. This example works for existing cluster installations (non-kURL clusters).

To view the Gitea Helm chart source, see [bitnami/gitea](https://github.com/bitnami/charts/blob/main/bitnami/gitea) in GitHub.

<Tabs>
<TabItem value="service-lb" label="svc.yaml" default>
<h5>Description</h5>
<p>The Bitnami Gitea Helm chart application includes the Service specification below. Based on the default <code>values.yaml</code> file for the Gitea chart, the service has <code>type: LoadBalancer</code> and <code>containerPort: 3000</code>.</p>
<p>To view the default Gitea Helm chart <code>values.yaml</code> file, see <a href="https://github.com/bitnami/charts/blob/main/bitnami/gitea/values.yaml">bitnami/gitea/values.yaml</a> in the Bitnami repository in GitHub.</p>
<h5>YAML</h5>
<GiteaService/>
</TabItem>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<p>Based on the Gitea <code>svc.yaml</code> manifest, the following KOTS Application custom resource configures KOTS to forward local port 8888 to port 3000 (the container port of the Pod where the <code>gitea</code> service is running).</p>
<h5>YAML</h5>
<GiteaKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<p>Based on <code>ports.applicationUrl</code> in <code>kots-app.yaml</code>, the following Kubernetes Application custom resource adds a link to the port-forwarded service from the admin console dashboard.</p>
<h5>YAML</h5>
<GiteaK8sApp/>
</TabItem>
</Tabs>

### Helm Chart with ClusterIP and NodePort Services

This example uses the Enterprise GTM Starter example project in the replicatedhq org in GitHub. To view the full set of release files in the example project, see [enterprise-gtm-starter](https://github.com/replicatedhq/enterprise-gtm-starter/tree/main) in GitHub. 

<Tabs>
<TabItem value="service" label="service.yaml" default>
<h5>Description</h5>
<p>The Enterprise GTM Starter Helm chart includes the following Service specification in the templates directory. The Service specification uses Helm templates to conditionally deploy either a ClusterIP or a NodePort type service depending on if the cluster was provisioned by Replicated kURL.</p>
<p>To view the source, see <a href="https://github.com/replicatedhq/enterprise-gtm-starter/blob/main/templates/service.yaml">service.yaml</a> in GitHub.</p>
<h5>YAML</h5>
<HelmService/>
</TabItem>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<p>Based on the <code>service.yaml</code> file, the following KOTS Application custom resource configures KOTS to forward local port 8888 to the container port 8888.</p>
<p>To view the source, see <a href="https://github.com/replicatedhq/enterprise-gtm-starter/blob/main/manifests/kots-app.yaml">kots-app.yaml</a> in GitHub.</p>
<h5>YAML</h5>
<HelmKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<p>Based on <code>ports.applicationUrl</code> in <code>kots-app.yaml</code>, the following Kubernetes Application custom resource adds a link to the port-forwarded service from the admin console dashboard.</p>
<p><a href="https://github.com/replicatedhq/enterprise-gtm-starter/blob/main/manifests/k8s-app.yaml">k8s-app.yaml</a></p>
<h5>YAML</h5>
<HelmK8sApp/>
</TabItem>
</Tabs>

### Standard Manifests with ClusterIP and NodePort Services

<Tabs>
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
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<h5>YAML</h5>
<SentryKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<p>Based on <code>ports.applicationUrl</code> in <code>kots-app.yaml</code>, the following Kubernetes Application custom resource adds a link to the port-forwarded service from the admin console dashboard.</p>
<h5>YAML</h5>
<SentryK8sApp/>
</TabItem>
</Tabs>

### Standard Manifests with NodePort Service

This example uses the hello-world NGINX application from the replicated-field-labs repository in GitHub. To view the full set of release files for the hello-world application, see [hello-world/vendor/manifests](https://github.com/replicatedhq/replicated-field-labs/tree/main/instruqt/hello-world/vendor/manifests) in GitHub.

<Tabs>
<TabItem value="service" label="example-service.yaml" default>
<h5>Description</h5>
<p>The hello-world application includes a basic NodePort service named <code>nginx</code>. As shown in the YAML below, the <code>nginx</code> service is exposed on port 80 and node port 30888.</p>
<h5>YAML</h5>
<NginxService/>
</TabItem>
<TabItem value="kots-app" label="kots-app.yaml" default>
<h5>Description</h5>
<p>Given the ports specified in the <code>example-service.yaml</code> manifest, the following KOTS Application custom resource adds </p>
<h5>YAML</h5>
<NginxKotsApp/>
</TabItem>
<TabItem value="k8s-app" label="k8s-app.yaml" default>
<h5>Description</h5>
<p>Based on <code>ports.applicationUrl</code> in <code>kots-app.yaml</code>, the following Kubernetes Application custom resource adds a link to the port-forwarded service from the admin console dashboard.</p>
<h5>YAML</h5>
<NginxK8sApp/>
</TabItem>
</Tabs>

## Additional Resources and Examples

The following articles on the Replicated Community site provide additional information and examples related to configuring port forwarding:

* [Port forwarding for embedded cluster](https://community.replicated.com/t/port-forwarding-for-embedded-cluster/472)
* [Issues getting port forward / dashboard links working](https://community.replicated.com/t/issues-getting-port-forward-dashboard-links-working/809)