import ServicePortNote from "../partials/custom-resource-application/_servicePort-note.mdx"
import PortsServiceName from "../partials/custom-resource-application/_ports-serviceName.mdx"
import PortsLocalPort from "../partials/custom-resource-application/_ports-localPort.mdx"
import PortsServicePort from "../partials/custom-resource-application/_ports-servicePort.mdx"
import PortsApplicationURL from "../partials/custom-resource-application/_ports-applicationURL.mdx"

# Configuring Port Forwarding

This topic describes how to add one or more ports to the Replicated KOTS port forwrad tunnel by configuring the `ports` key in the KOTS Application custom resource.

## Overview

When distributing an application, it is helpful to ensure that the person or process performing the installation can easily verify that the application is running.
Networking and ingress is handled differently in each cluster and this makes it difficult to provide a consistent URL at installation. Additionally, the cluster operator might be required to create firewall rules before they can test the application installation.

To provide an easy way for the cluster operator to open one or more links directly to the application before ingress and firewalls are configured, you can configure Replicated KOTS to provide a port-forward tunnel directly to the application. In addition to listing the primary application ports, you can also add ports to the KOTS port forward for internal services, such as application admin controls and other services that are not exposed to all users.

## Requirements

The following requirements apply to configuring port forwarding for KOTS installations:

* For installations in embedded clusters created with Replicated kURL, NodePort services 
* Adding a button on the admin console dashboard that links to the port forward requires additional configuration of a Kubernetes Application custom resource. For more information, see [Adding Buttons and Links](admin-console-adding-buttons-links). 

## Configure Port Forwarding

In addition to port `8800`, which is used for the Replicated admin console, you can add one or more ports to the port-forward tunnel that KOTS creates.

To define additional ports for port forwarding, add a `ports` key to the KOTS Application custom resource manifest file. For example:

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