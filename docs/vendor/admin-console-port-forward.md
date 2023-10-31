import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"

# Configuring Port Forwarding

This topic describes how to add one or more ports to the Replicated KOTS port forward tunnel by configuring the `ports` key in the KOTS Application custom resource.

## Overview

When distributing an application, it is helpful to ensure that the person or process installing the application is able to easily verify that the application is running. However, networking and ingress is handled differently in each cluster, and this makes it difficult to provide a consistent URL to an application at installation. Additionally, the cluster operator might be required to create firewall rules before they can open the application.

To provide users with an easy way to access the Replicated admin console when installing an application, KOTS automatically creates a port forward tunnel and exposes the admin console on port 8800. During installation, the kots CLI prints a message that tells users that the admin console can be accessed at `https://locahost:8800`.

In addition to the 8800 admin console port, you can configure the KOTS Application custom resource to add one or more extra ports to the port forward tunnel so that users can easily access your application. For example, you can:
* List the primary application ports to provide one or more links directly to the application before ingress and firewalls are configured 
* List the ports for internal services, such as application admin controls and other services that are not exposed to all users


### Access Port Forward

When the application starts and the service is ready, the kots CLI will print a message in the terminal with the URL where the port-forwarded service can be accessed. Ports added to the port forward are port-forwarded when running the `kubectl kots admin-console` command. 

## Add Extra Ports to the KOTS Port Forward

To define additional ports for port forwarding, configure the `ports` key in the KOTS Application custom resource. For more information, see [ports](/reference/custom-resource-application#ports) in _Application_.

For example, the following Application custom resource create a port forward tunnel to port 9000 where the user can access an `nginx` service during installation: 

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: my-application-logo-uri
  ports:
    - serviceName: "nginx"
      servicePort: 9000
      localPort: 9000
      applicationUrl: "http://nginx"
 ```

As shown in the example above, the `ports` key has the following fields:

<ul>
<PortsServiceName/>

<PortsServicePort/>

<ServicePortNote/>

<PortsLocalPort/>

<PortsApplicationURL/>
</ul>

## Configure Port Forwarding for Embedded Cluster Installatios with kURL

To expose additional ports on the node for embedded cluster installations, you can create NodePort services. Then, you can add the port for the NodePort service you create to the `ports` key. For example, to make the admin console accessible on port `8800` on the node, kURL creates a NodePort service.

Unlike installations in existing clusters, KOTS does not automatically create port forwards for installations in embedded clusters provisioned by Replicated kURL because it cannot be verified that the ports are secure and authenticated.

## Next Steps

Adding a button on the admin console dashboard that links to the port forward requires additional configuration of a Kubernetes Application custom resource. For more information, see [Adding Buttons and Links](admin-console-adding-buttons-links).