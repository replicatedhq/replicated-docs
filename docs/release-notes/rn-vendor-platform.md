---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Vendor Platform Release Notes

<!--RELEASE_NOTES_PLACEHOLDER-->

## v2023.10.24-2

Released on October 24, 2023

## v2023.10.24-0

Released on October 24, 2023

### New Features {#new-features-v2023-10-24-0}
* Adds links to release notes in the vendor portal.

## v2023.10.23-0

Released on October 23, 2023

### Bug Fixes {#bug-fixes-v2023-10-23-0}
* Shows multiple instances for a single customer in the customer instance table view.

## v2023.10.18-1

Released on October 18, 2023

### New Features {#new-features-v2023-10-18-1}
* Compatibility matrix retries on an error provisioning a cluster up to 2 times for a total of 3 attempts before returning an error.

## v2023.10.18-0

Released on October 18, 2023

### New Features {#new-features-v2023-10-18-0}
* Shows tags on the cluster and cluster history table.

### Bug Fixes {#bug-fixes-v2023-10-18-0}
* When using [v3 API to create a release](https://replicated-vendor-api.readme.io/reference/createrelease), release size will be limited to 16MiB when compressed.
* Shows error message if user encounters an error during application creation.
* Fixes a bug that would allow creating accounts using an email address with trailing or leading white spaces.

## v2023.10.16-0

Released on October 16, 2023

### New Features {#new-features-v2023-10-16-0}
* Adds table views for customers and instances on Customers page.
* Fixes a bug in the copy create cluster command.
* Fixes the "by" in cluster history to not show "web ui" most of the time.
* Fixes the display of cost in cluster history table.

## v2023.10.13-0

Released on October 13, 2023

### New Features {#new-features-v2023-10-13-0}
* Adds the name of the entity that created the cluster to the cluster page.

### Improvements {#improvements-v2023-10-13-0}
* Various design updates to the **Cluster History** page to improve the user experience.

## v2023.10.11-1

Released on October 11, 2023

### New Features {#new-features-v2023-10-11-1}
* Adds "Settings" page within the Compatibility Matrix, granting users the ability to access quota and capacity information and submit requests for increasing their quotas.
* Adds updated table view for the Channels page.

### Bug Fixes {#bug-fixes-v2023-10-11-1}
* Fixes an issue that could prevent users from logging in because they do not have an RBAC role assigned.
* Fixes bug on Dashboard where user was unable to delete a support bundle.
* Fixes bug on the Kubernetes Installer History page where breadcrumbs were not displaying correctly.

## v2023.10.10-0

Released on October 10, 2023

### New Features {#new-features-v2023-10-10-0}
* Adds a verification stage when provisioning bare metal clusters of type Kind, K3s, kURL, and HelmVM to check that the cluster is running and healthy.

## v2023.10.09-1

Released on October 9, 2023

### Bug Fixes {#bug-fixes-v2023.10.09-1}
* Updates the icon for Custom Metrics events on Instance Details pages.

## v2023.10.09-0

Released on October 9, 2023

### New Features {#new-features-v2023.10.09-0}
* Sets `false` as the default value for any new Boolean license fields.
* Changes Boolean license field options to a "True"/"False" dropdown on the **Customer Manage** and **Create Customer** pages.
