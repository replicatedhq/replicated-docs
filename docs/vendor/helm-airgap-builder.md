# Helm airgap builder

> This topic applies to both native Helm and Replicated Helm installations.

For all Replicated Business & Enterprise Plans, the Replicated vendor portal automatically builds `.airgap` bundles for every promoted release.
This is generally done by processing the application manifests and exporting all of the images listed in the manifests and bundling them with the manifests.
In order to ensure that a Helm chart-based application is able to be fully built as an air gap package, Replicated needs a `helm template` version of the application manifests that include all optional components and images as `enabled`.
This can be tricky for Helm chart-based applications as they might have [optional charts](helm-optional-charts) that are not included by default.

To solve this problem, the [HelmChart custom resource](../reference/custom-resource-helmchart) contains a `builder` attribute for vendors to provide values that will `helm template` to the full manifest.

The values passed in `builder` should be the bare minimum [Helm Values](https://helm.sh/docs/chart_template_guide/values_files/) to be able to template out the Helm chart so that it will have the correct image tags.
Upon promotion to a release channel, the air gap builder templates the chart with the builder values, renders the resulting YAML manifests, and exports any images referenced to build the air gap package.

## Builder Attribute
```yaml
# builder values provide a way to render the chart with all images
# and manifests. this is used in replicated to create air gap packages
builder:
  postgresql:
    enabled: true
```
