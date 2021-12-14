# SIG Application

The [Kubernetes SIG Application](https://github.com/kubernetes-sigs/application#kubernetes-applications) spec provides a standard API for creating, viewing, and managing applications.
The `spec.descriptor.links` field can be used to [configure buttons on the Admin Console Dashboard](/vendor/dashboard/open-buttons/), linking to application dashboards or landing pages.
This custom resource is optional for KOTS applications.

The other fields of the SIG Application spec are not currently used by KOTS, but our goal is to help steer the evolution of this spec to include all of the necessary application metadata, removing the need for a separate [KOTS Application spec](/reference/v1beta1/application/).
