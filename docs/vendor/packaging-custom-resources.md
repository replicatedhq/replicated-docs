# Custom resources

A KOTS application can include several recommended, but optional [KOTS custom resources](/reference/v1beta1/).
These custom resources are packaged as part of the KOTS application, but are not deployed to the cluster.
When included, they are consumed by KOTS, the Admin Console, or by other kubectl plugins to control the KOTS application experience.

When viewing a release in the [Vendor Portal](https://vendor.replicated.com/releases/), the KOTS custom resources are grouped together at the top of the manifests list.  
![](/images/kots-custom-resources.png)

For more information on each of the custom resources, see the [reference section](/reference/v1beta1/), or check out the spec for a custom resource: [Config](/reference/v1beta1/config/), [Application](/reference/v1beta1/application), [Preflight](/reference/v1beta1/preflight), [Analyzer](https://troubleshoot.sh/reference/analyzers/overview/), [Collector](https://troubleshoot.sh/reference/collectors/overview/), [Sig-Application](/reference/v1beta1/sig-application), [HelmChart](/reference/v1beta1/helmchart/).
