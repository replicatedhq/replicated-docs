---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Vendor Platform Release Notes

<!--RELEASE_NOTES_PLACEHOLDER-->

## v2023.11.10-1

Released on November 10, 2023

### Improvements {#improvements-v2023-11-10-1}
* Update button styles on Troubleshoot, License Fields, Images, Kubernetes Installers, and Custom Domains.
* Standardize button styles on Team and Account Settings pages.

## v2023.11.06-1

Released on November 6, 2023

### Improvements {#improvements-v2023-11-06-1}
* Improves the way large amounts of custom metrics display on the Instance Details page, in both the Filters dropdown and the Custom Metrics section on the left.

## v2023.11.03-1

Released on November 3, 2023

### Bug Fixes {#bug-fixes-v2023-11-03-1}
* Audit log initial search query filters out "read" events.

## v2023.11.03-2

Released on November 3, 2023

### Improvements {#improvements-v2023-11-03-2}
* Upon login, the user is redirected to most recently managed application.

## v2023.10.30-3

Released on October 30, 2023

### Bug Fixes {#bug-fixes-v2023-10-30-3}
* Fixes style bug on the Audit Log page where the search input border is partially hidden.

## v2023.10.30-2

Released on October 30, 2023

### Improvements {#improvements-v2023-10-30-2}
* Make some columns hidden by default in the Instances view on the Customers page and update column names.

## v2023.10.30-1

Released on October 30, 2023

### Improvements {#improvements-v2023-10-30-1}
* Update styles on **Instance Details** page.
* Update tab styles throughout the vendor portal.

## v2023.10.27-2

Released on October 27, 2023

### Improvements {#improvements-v2023-10-27-2}
* Standardize breadcrumbs across the site.

## v2023.10.27-1

Released on October 27, 2023

### Improvements {#improvements-v2023-10-27-1}
* Various style updates to the **Images**, **Kubernetes Installer**, **Custom Domains**, and **App Settings** pages.

## v2023.10.26-3

Released on October 26, 2023

### Improvements {#improvements-v2023-10-26-3}
* Various style improvements to the Compatibility Matrix **Cluster History**, **Customers**, **Troubleshoot**, and **License Fields** pages.

## v2023.10.26-2

Released on October 26, 2023

### Bug Fixes {#bug-fixes-v2023-10-26-2}
* Fixes query timeout issues with the `/events` API endpoint.

## v2023.10.26-0

Released on October 26, 2023

### New Features {#new-features-v2023-10-26-0}
* Allow editing tags in the Cluster History table.
* Allow adding tags as separate columns in the Cluster History table.
* Show some statistics at the top of the Cluster History table.

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

### Improvements {#improvements-v2023-10-16-0}
* Adds table views for customers and instances on Customers page.

### Bug Fixes {#bug-fixes-v2023-10-16-0}
* Fixes a bug in the copy create cluster command.
* Fixes the "by" in cluster history to not show "web ui" most of the time.
* Fixes the display of cost in cluster history table.

## v2023.10.13-0

Released on October 13, 2023

### Improvements {#improvements-v2023-10-13-0}
* Adds the name of the entity that created the cluster to the cluster page.
* Various design updates to the **Cluster History** page to improve the user experience.

## v2023.10.11-1

Released on October 11, 2023

### New Features {#new-features-v2023-10-11-1}
* Adds **Settings** page for the Compatibility Matrix, granting users the ability to access quota and capacity information and submit requests for increasing their quotas.

### Improvements {#improvements-v2023-10-11-1}
* Adds updated table view for the **Channels** page.

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

### Improvements {#improvements-v2023.10.09-0}
* Sets `false` as the default value for any new Boolean license fields.
* Changes Boolean license field options to a "True"/"False" dropdown on the **Customer Manage** and **Create Customer** pages.
