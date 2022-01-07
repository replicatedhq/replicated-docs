# Custom resources

A KOTS application can include several recommended, but optional [KOTS custom resources](custom-resource-about).
These custom resources are packaged as part of the KOTS application, but are not deployed to the cluster.
When included, they are consumed by KOTS, the admin console, or by other `kubectl` plugins to control the KOTS application experience.

When viewing a release in the [vendor portal](https://vendor.replicated.com/releases/), the KOTS custom resources are grouped together at the top of the manifests list.  
![](/images/kots-custom-resources.png)

For more information on each of the custom resources, see the [reference section](custom-resource-about), or check out the spec for a custom resource: [Backup](custom-resource-backup), [Config](custom-resource-config), [Application](custom-resource-application), [Preflight](custom-resource-preflight), [Analyzer](https://troubleshoot.sh/reference/analyzers/overview/), [Collector](https://troubleshoot.sh/reference/collectors/overview/), [Sig-Application](custom-resource-sig-application), [HelmChart](custom-resource-helmchart), [Identity](custom-resource-identity), and other custom resources.
