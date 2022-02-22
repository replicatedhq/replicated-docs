# Custom Resources

A Replicated app manager application can include several recommended, but optional custom resources.
These custom resources are packaged as part of the application, but are not deployed to the cluster.
When included, they are consumed by the app manager, the admin console, or by other `kubectl` plugins to control the application experience.

For more information about custom resources, see the [About custom resources](../reference/custom-resource-about) in the _Reference_ section.

When viewing a release in the [vendor portal](https://vendor.replicated.com/releases/), the custom resources are grouped together at the top of the manifests list.

![](/images/kots-custom-resources.png)
