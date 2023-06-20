import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import Beta from "../partials/helm/_helm-install-beta.mdx"

# About Distributing with Helm (Beta)

This topic provides an overview of allowing your customers to install with Helm when you distribute your Helm chart application with Replicated.

## About Helm Installations with Replicated

The following diagram shows how Helm charts distributed with Replicated are installed in customer environments:

<img src="/images/helm-install-diagram.png" alt="diagram of a helm chart in a custom environment" width="600px"/> 

<HelmDiagramOverview/>

For more information about how to install an application with Helm, see [Installing an Application with Helm (Beta)](install-with-helm).

For information about how to get started distributing your Helm chart with Replicated, see [Add Your Helm Chart to a Release](helm-install-release).

## Limitations

The following limitations apply when using Helm to install applications distributed with Replicated:

* <Beta/>

* Replicated does not support Helm installations into air gap environments.

* Helm installations do not provide access to any of the features of Replicated KOTS, including:
  * The Replicated admin console
  
  * Strict preflight checks that block installation

  * Backup and restore with snapshots

## Replicated SDK

<SDKOverview/>

For more information, see [About the Replicated SDK (Beta)](replicated-sdk-overview).