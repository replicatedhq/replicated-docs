import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"

# About Distributing with Helm (Beta)

This topic provides an overview of allowing your customers to install with Helm when you distribute your Helm chart application with Replicated.

## About Helm Installations with Replicated

The following diagram shows how Helm charts distributed with Replicated are installed in customer environments:

<img src="/images/helm-install-diagram.png" alt="diagram of a helm chart in a custom environment" width="600px"/> 

<HelmDiagramOverview/>

For more information about how to install an application with Helm, see [Installing an Application with Helm (Beta)](install-with-helm).

For information about how to get started distributing your Helm chart with Replicated, see [Add Your Helm Chart to a Release](helm-install-release).

## Replicated Helm Values {#replicated-values}

When a customer pulls your Helm chart from the Replicated registry, the Replicated registry injects values into the `replicated` field of the Helm chart values file. These values provide information about the following:
* The customer's license and entitlement details
* The target application release from the vendor portal

The following is an example of a Helm values file containing only the information injected by the Replicated registry when your customer pulls the Helm chart during installation:

```yaml
# Helm values.yaml
global:
  replicated:
    dockerconfigjson: eyJhdXRocyI6eyJd1dIRk5NbEZFVGsxd2JGUmFhWGxYWm5scloyNVRSV1pPT2pKT2NGaHhUVEpSUkU1...
replicated:
  appName: my-app
  channelID: 2CBDxNwDH1xyYiIXRTjiB7REjKX
  channelName: Stable
  channelSequence: 75
  created_at: "2023-05-12T17:44:10Z"
  license: | 
    apiVersion: kots.io/v1beta1
    kind: License
    metadata:
      name: examplename
    spec:
      appSlug: my-app
      ...       
  # The full customer license is injected
  license_id: WJldGExCmtpbmQ6IEN...
  releaseCreatedAt: "2023-05-12T17:43:51Z"
  releaseIsRequired: false
  releaseNotes: "Some release notes"
  releaseSequence: 81
  username: username@example.com
  versionLabel: 0.1.70
```

As shown in the example above, the Replicated registry injects information about the release and the unique customer license under the `replicated` field, such as `replicated.releaseSequence` and `replicated.license_id`. If you distribute the Replicated SDK alongside your application, then the SDK uses these values to initialize in a customer environment.

Additionally, if you use the Replicated proxy service to proxy images from an external private registry, you can use the value injected in the `global.replicated.dockerconfigjson` field to create an image pull secret for the proxy service. For more information, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry) in the Kubernetes documentation.

## Replicated SDK

<SDKOverview/>

For more information, see [About the Replicated SDK (Beta)](replicated-sdk-overview).