# Custom resources

A Replicated app manager application can include several recommended, but optional [app manager custom resources](custom-resource-about).
These custom resources are packaged as part of the app manager application, but are not deployed to the cluster.
When included, they are consumed by the app manager, the admin console, or by other `kubectl` plugins to control the app manager application experience.

When viewing a release in the [vendor portal](https://vendor.replicated.com/releases/), the app manager custom resources are grouped together at the top of the manifests list.

![](/images/kots-custom-resources.png)

For more information about custom resources, see the [reference section](custom-resource-about), or see the specification for an individual custom resource, including: [Backup](custom-resource-backup), [Config](custom-resource-config), [Application](custom-resource-application), [Preflight](custom-resource-preflight), [Analyzer](https://troubleshoot.sh/reference/analyzers/overview/), [Collector](https://troubleshoot.sh/reference/collectors/overview/), [Sig-Application](custom-resource-sig-application), [HelmChart](custom-resource-helmchart), [Identity](custom-resource-identity), and so on.
