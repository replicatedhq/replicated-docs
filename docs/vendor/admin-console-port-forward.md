import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuring Port Forwarding

This topic describes how to add one or more ports to the Replicated KOTS port forward tunnel by configuring the `ports` key in the KOTS Application custom resource.

## Overview

When distributing an application, it is helpful to ensure that the person or process installing the application is able to easily verify that the application is running. However, networking and ingress is handled differently in each cluster, and this makes it difficult to provide a consistent URL to an application at installation. Additionally, the cluster operator might be required to create firewall rules before they can open the application.

To address these challenges, KOTS automatically creates a port forward tunnel and exposes the admin console on port 8800 where it can be accessed by users during installation in existing clusters or in embedded clusters.

In addition to the 8800 admin console port, you can configure the KOTS Application custom resource to add one or more extra ports to the port forward tunnel so that users can easily access your application during installation. For example, you can:
* List the primary application ports to provide one or more links directly to the application before ingress and firewalls are configured 
* List the ports for internal services, such as application admin controls and other services that are not exposed to all users

## Configure the `ports` Key

You can configure the `ports` key in the KOTS Application custom resource to add extra ports to the KOTS port forward tunnel.

The following shows an example `ports` key that allows users to access the `gitea` service at port 8888 on the local workstation during installation: 

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
<PortsServiceName/>

<PortsServicePort/>

<ServicePortNote/>

<PortsLocalPort/>

<PortsApplicationURL/>
</ul>

For more information, see [ports](/reference/custom-resource-application#ports) in _Application_.

## Configure a NodePort Service for Port Forwarding in kURL Clusters

Unlike installations in existing clusters, KOTS does _not_ automatically create port forwards for installations in embedded clusters provisioned by Replicated kURL. This is because it cannot be verified that the ports are secure and authenticated.

Instead, to provide access to the admin console during installation from the local node on port 8800, a NodePort type service is created for the admin console. This is because NodePort services can be accessed from outside the cluster by connecting to any node using the appropriate protocol and the port assigned to the target service. For more information, see [type: NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in the Kubernetes documentation.

To configure port-forwarded services for your application in embedded cluster installations, Replicated recommends that you first create a NodePort specification for the target service. Then, you can add the port for the NodePort service to the `ports` key in the Application custom resource.

**ClusterIP service for existing cluster installations**

The following example shows the default ClusterIP service specification for a service named `sentry`. This specification includes a `kots.io/when: "{{repl not IsKurl}}"` annotation, which ensures that the service is only created for existing cluster installations.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sentry
  labels:
    app: sentry
  annotations:
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

**NodePort service for kURL installations**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sentry
  labels:
    app: sentry
  annotations:
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

**KOTS Application custom resource**

Given the example ClusterIP and NodePort services above, the following KOTS Application custom resourcce creates a port forward to the service 

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: sentry-enterprise
spec:
  ports:
    - serviceName: "sentry"
      servicePort: 9000
      localPort: 9000
      applicationUrl: "http://sentry"
```

**Kubernetes custom resource**:

Additionally, to 


## Link to a Port-Forwarded Service from the Admin Console

Adding a button on the admin console dashboard that links to the port forward requires additional configuration of a Kubernetes Application custom resource. For more information, see [Adding Buttons and Links](admin-console-adding-buttons-links).

The following KOTS Application custom resource adds port 8888 to the port forward tunnel that KOTS creates during installation so that the user can open the Gitea application in a browser:

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

Given the `applicationUrl` in the KOTS Application custom resource above, the following Kubernetes Application custom resource adds an **Open App** button to the admin console dashboard that the user can click to open the application:

```yaml
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