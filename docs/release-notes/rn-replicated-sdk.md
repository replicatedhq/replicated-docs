---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Replicated SDK Release Notes

<!--RELEASE_NOTES_PLACEHOLDER-->

## 0.0.1-beta.1

Released on July 28, 2023

:::important
v0.0.1-beta.1 of the Replicated SDK includes a name change that can cause existing integrations to break. For information about how to avoid this breaking change, see [Breaking Change](#breaking-changes-0-0-1-beta-1).
:::
### Improvements {#improvements-0-0-1-beta-1}
* Renames the SDK's Kubernetes resources and the library SDK chart from `replicated` to `replicated-sdk` to distinguish them from other replicated components.

### Breaking Change {#breaking-changes-0-0-1-beta-1}

v0.0.1-beta.1 renames the SDK's Kubernetes resources and the library SDK chart. This can cause existing integrations that use an alpha version of the SDK to break.

To avoid this breaking change, do the following before upgrading:

* Update the dependencies entry for the SDK in the parent chart:

   ```yaml
   dependencies:
   - name: replicated-sdk
     repository: oci://registry.replicated.com/library
     version: 0.0.1-beta.1
   ```

* Update any requests to the SDK service in the cluster to use `replicated-sdk:3000` instead of `replicated:3000`.

* Update any automation that references the installation command for integration mode to `helm install replicated-sdk oci://registry.replicated.com/library/replicated-sdk --version 0.0.1-beta.1`.

* If the SDK's values are modified in the `values.yaml` file of the parent chart, change the field name for the SDK subchart in the `values.yaml` file from `replicated` to `replicated-sdk`.

* Change the field name of any values that are provided at runtime to the SDK from `replicated` to `replicated-sdk`. For example, `--set replicated-sdk.integration.enabled=false`.

For more information, see [About the Replicated SDK](/vendor/replicated-sdk-overview).
