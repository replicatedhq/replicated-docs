import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"

# Configuring Port Forwarding

This topic describes how to add one or more ports to the Replicated KOTS port forwrad tunnel by configuring the `ports` key in the KOTS Application custom resource.

## Overview

In addition to port `8800`, which is used for the Replicated admin console, you can add one or more ports to the port-forward tunnel that KOTS creates.

When distributing an application, it is helpful to ensure that the person or process performing the installation can easily verify that the application is running.
Networking and ingress is handled differently in each cluster and this makes it difficult to provide a consistent URL at installation. Additionally, the cluster operator might be required to create firewall rules before they can test the application installation.

To provide an easy way for the cluster operator to open one or more links directly to the application before ingress and firewalls are configured, you can configure Replicated KOTS to provide a port-forward tunnel directly to the application. In addition to listing the primary application ports, you can also add ports to the KOTS port forward for internal services, such as application admin controls and other services that are not exposed to all users.

Extra ports (additional to the 8800 admin console port) that are port-forwarded when running the `kubectl kots admin-console` command. With ports specified, KOTS can establish port forwarding to simplify connections to the deployed application. When the application starts and the service is ready, the kots CLI will print a message in the terminal with the URL where the port-forwarded service can be accessed.

## Add Extra Ports to the KOTS Port Forward

To define additional ports for port forwarding, configure the `ports` key in the KOTS Application custom resource. For more information, see [ports](/reference/custom-resource-application#ports) in _Application_.

For example:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: my-application-logo-uri
  ports:
    - serviceName: "myapplication-service"
      servicePort: 9000
      localPort: 9000
      applicationUrl: "http://myapplication-service"
 ```

As shown in the example above, the `ports` key has the following fields:

<ul>
<PortsServiceName/>

<PortsServicePort/>

<ServicePortNote/>

<PortsLocalPort/>

<PortsApplicationURL/>
</ul>

### Configure Port Forwarding for Embedded Cluster Installatios with kURL

KOTS does not automatically create port forwards for installations in embedded clusters provisioned by Replicated kURL. This is because it cannot be verified that the ports are secure and authenticated. To make the admin console accessible on port `8800` on the node, kURL creates a NodePort service.

To expose additional ports on the node for embedded cluster installations, you can create NodePort services. Then, you can add the port for the NodePort service you create to the `ports` key

For more information, see Port forwarding for embedded cluster on the Replicated community site.

## Next Steps

Adding a button on the admin console dashboard that links to the port forward requires additional configuration of a Kubernetes Application custom resource. For more information, see [Adding Buttons and Links](admin-console-adding-buttons-links).