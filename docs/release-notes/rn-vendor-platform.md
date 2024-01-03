---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Vendor Platform Release Notes

<!--RELEASE_NOTES_PLACEHOLDER-->

## v2024.01.03-0

Released on January 3, 2024

### New Features {#new-features-v2024-01-03-0}
* Displays instance tags in Instance table view.

## v2023.12.30-0

Released on December 30, 2023

### Bug Fixes {#bug-fixes-v2023-12-30-0}
* Fixes an issue where the instance name failed to render after creating an instance tag with the key "name.".

## v2023.12.29-5

Released on December 29, 2023

### New Features {#new-features-v2023-12-29-5}
* Adds the ability to add a custom name to a given instance along with other vendor-defined instance tags. 

## v2023.12.28-0

Released on December 28, 2023

### Bug Fixes {#bug-fixes-v2023-12-28-0}
* Removes references to the deprecated support@replicated.com email address.

## v2023.12.27-1

Released on December 27, 2023

### New Features {#new-features-v2023-12-27-1}
* Adds additional bundle and instance metadata to the Support Bundle Analysis page.

## v2023.12.21-3

Released on December 21, 2023

### Bug Fixes {#bug-fixes-v2023-12-21-3}
* Fixes incorrect link for releases and customers created by Service Accounts.

## v2023.12.20-1

Released on December 20, 2023

### Bug Fixes {#bug-fixes-v2023-12-20-1}
* Improves error messaging for the Instance Details page when there is an invalid app slug, customer ID, or instance ID in the URL.
* Fixes installation failures for applications with Helm charts that contain empty files.

## v2023.12.19-3

Released on December 19, 2023

### Bug Fixes {#bug-fixes-v2023-12-19-3}
* Allows user to press 'Enter' to submit when logging in to the download portal.

## v2023.12.19-2

Released on December 19, 2023

### Bug Fixes {#bug-fixes-v2023-12-19-2}
* Fixes scrolling on Kubernetes installer teaser page.

## v2023.12.19-1

Released on December 19, 2023

### Improvements {#improvements-v2023-12-19-1}
* Redesigns the Customers page search to make it more streamlined.

## v2023.12.19-0

Released on December 19, 2023

### New Features {#new-features-v2023-12-19-0}
* Release Embedded Cluster v1.28.4+ec.5 replacing v1.28.4+ec.4.
* Shows max disk size on create cluster form (CMX) based on entitlement value.

### Bug Fixes {#bug-fixes-v2023-12-19-0}
* Disables create cluster button when loading team entitlement.

## v2023.12.18-0

Released on December 18, 2023

### New Features {#new-features-v2023-12-18-0}
* Adds ability to extend cluster Time to Live (TTL) after creation with the compatibility matrix.

### Improvements {#improvements-v2023-12-18-0}
* Adds Embedded Cluster `v1.28.4+ec.4` as the default version.
* Removes the 'NEW' badge from the Instances CSV download.

## v2023.12.14-4

Released on December 14, 2023

### Improvements {#improvements-v2023-12-14-4}
* Persists inputs on the **Compatibility Matrix > Create Cluster** dialog when there is an error.

## v2023.12.14-3

Released on December 14, 2023

### Improvements {#improvements-v2023-12-14-3}
* Displays maintenance notifications per distro in create cluster form.
* Adds ability to select the date time range filter in Cluster History page. Cluster stats can be filtered by `start-time` and `end-time`.

## v2023.12.14-0

Released on December 14, 2023

### Bug Fixes {#bug-fixes-v2023-12-14-0}
* Fixes the default product options on the support request form. These will be generated based on enabled entitlements.

## v2023.12.13-1

Released on December 13, 2023

### Improvements {#improvement-v2023-12-13-1}
* Uses `sortColumn=tag` and `tag-sort-key` to sort clusters on the values for a tag key.

### Bug Fixes {#bug-fixes-v2023-12-13-1}
* Shows error message when updating Compatibility Matrix quotas to the same value or less than the current value.

## v2023.12.13-0

Released on December 13, 2023

### Improvements {#improvements-v2023-12-13-0}
* Adds "Created By" and "Updated By" columns to the Customers and Instances table views.

## v2023.12.11-3

Released on December 11, 2023

### Improvements {#improvements-v2023-12-11-3}
* Adds "Last Airgap Download Version" and "Last Airgap Download Date" columns to the Customers and Instances table views.

### Bug Fixes {#bug-fixes-v2023-12-11-3}
* Fixes issues with customer instances CSV row repetition.

## v2023.12.11-2

Released on December 11, 2023

### Improvements {#improvements-v2023-12-11-2}
* Improves usability of the Download Portal by providing descriptions, better button names, and improved styles.
* Improves messaging when RBAC prevents requesting more credits in CMX.

### Bug Fixes {#bug-fixes-v2023-12-11-2}
* Fixes version label on customer instances table.

## v2023.12.11-1

Released on December 11, 2023

### Improvements {#improvements-v2023-12-11-1}
* Shows the release version that was most recently downloaded from the Download Portal on the **Customer Reporting** page.

## v2023.12.11-0

Released on December 11, 2023

### Improvements {#improvements-v2023-12-11-0}
* Re-orders the support request form to ensure that the customer (or "no customer") is selected prior to the selection of the product area, and auto fill the form smartly.

## v2023.12.09-0

Released on December 9, 2023

### Improvements {#improvements-v2023-12-09-0}
* Adds ability to upload multiple support bundles when opening a support issue on the **Troubleshoot** or **Support** page.

## v2023.12.08-4

Released on December 8, 2023

### Bug Fixes {#bug-fixes-v2023-12-08-4}
* Persists column visibility on Compatibility Matrix cluster history.

## v2023.12.08-1

Released on December 8, 2023

### Bug Fixes {#bug-fixes-v2023-12-08-1}
* Fixes bug where the selected file in the editor would be reset after saving changes to a KOTS release.

## v2023.12.08-0

Released on December 8, 2023

### Improvements {#improvements-v2023-12-08-0}
* Adds ability to upload multiple support bundles when opening a support issue on the **Troubleshoot** or **Support** pages.

## v2023.12.07-2

Released on December 7, 2023

### Improvements {#improvements-v2023-12-07-2}
* Adds ability to specify tags at cluster creation with the compatibility matrix.

## v2023.12.07-1

Released on December 7, 2023

### Bug Fixes {#bug-fixes-v2023-12-07-1}
* Fixes a bug that prompts the user about unsaved changes when clicking "Create release" on the Draft Release page.

## v2023.12.06-2

Released on December 6, 2023

### Improvements {#improvements-v2023-12-06-2}
* Shows 'Created by' and 'Last modified by' information on the **Customers**, **Reporting**, and **Customer details** pages.

## v2023.12.06-0

Released on December 6, 2023

### Bug Fixes {#bug-fixes-v2023-12-06-0}
* Fixes a bug that could occur when generating the embedded cluster binary for channels where semantic versioning was not enabled.
* Fixes bug in the **Channel Settings** modal where the user could not return custom domains to the Replicated default.

## v2023.12.05-1

Released on December 5, 2023

### Improvements {#improvements-v2023-12-05-1}
* Shows 'Created by' and 'Last modified by' on the **Releases**, **View Release**, **Edit Release**, and **Release History** pages.

## v2023.12.04-4

Released on December 4, 2023

### Bug Fixes {#bug-fixes-v2023-12-04-4}
* Fixes the **Copy download URL** button for airgap builds on the **Release History** page in Safari.

## v2023.12.04-3

Released on December 4, 2023

### Improvements {#improvements-v2023-12-04-3}
* Adds the ability to update a test cluster TTL.

## v2023.12.04-1

Released on December 4, 2023

### New Features {#new-features-v2023-12-04-1}
* Adds the "installer support enabled" license option to the customer create and manage pages. This option is only visibile to vendors with the associated entitlement enabled. 

## v2023.12.01-4

Released on December 1, 2023

### Improvements {#improvements-v2023-12-01-4}
* Unifies the Customers page search, sort, and filter results across all tabs.

## v2023.11.29-3

Released on November 29, 2023

### Improvements {#improvements-v2023-11-29-3}
* Adds the ability to subscribe to custom metrics notifications.
* Splits notifications for "All" events into "App Status" and "System Events".

## v2023.11.29-2

Released on November 29, 2023

### New Features {#new-features-v2023-11-29-2}
* Adds Custom Metrics timeseries graphing on the Instance Details page.

## v2023.11.29-0

Released on November 29, 2023

### Improvements {#improvements-v2023-11-29-0}
* Adds support for opening a new tab on right click in the Application drop down.

### Bug Fixes {#bug-fixes-v2023-11-29-0}
* Fixes an issue that could cause the user to not be able to upload support bundles on the Instance Insights page.

## v2023.11.28-1

Released on November 28, 2023

### Bug Fixes {#bug-fixes-v2023-11-28-1}
* Aligns Helm icon with helm chart in release editor.

## v2023.11.28-0

Released on November 28, 2023

### Bug Fixes {#bug-fixes-v2023-11-28-0}
* Fixes an issue that caused linter results to not be displayed when opening a KOTS release for editing.
* Fixes loading state on the Customers table view.

## v2023.11.27-1

Released on November 27, 2023

### Bug Fixes {#bug-fixes-v2023-11-27-1}
* Fixes a bug with automatic air gap builds in the Channel Settings modal, where it would show false even if automatic air gap builds were enabled.

## v2023.11.23-0

Released on November 23, 2023

### New Features {#new-features-v2023-11-23-0}
* Supports multi-node kURL clusters up to 10 nodes with the compatibility matrix.

## v2023.11.22-1

Released on November 22, 2023

### Bug Fixes {#bug-fixes-v2023-11-22-1}
* Fixes an issue where the compatibility matrix kURL version displayed in the `create cluster` command was incorrect.

## v2023.11.20-2

Released on November 20, 2023

### Improvements {#improvements-v2023-11-20-2}
* Hides inactive instances from the Instances table view by default. Add checkbox to show inactive instances in table.

## v2023.11.17-2

Released on November 17, 2023

### Improvements {#improvements-v2023-11-17-2}
* Hides the 'NEW' badge on the Instances CSV download after it has been clicked.

## v2023.11.15-0

Released on November 15, 2023

### Improvements {#improvements-v2023-11-15-0}
* Saves Channels ordering, sorting, and hidden columns table settings when the user updates them.
* Standardize tooltips on Dashboard, Customers, and Channels pages.
* Disallow adding a .zip file when uploading a bundle in the support request form.

### Bug Fixes {#bug-fixes-v2023-11-15-0}
* Fixes button alignment in empty state on the **Releases** page when the KOTS installer is not enabled.

## v2023.11.13-0

Released on November 13, 2023

### Improvements {#improvements-v2023-11-13-0}
* Standardizes button styles on the Compatibility Matrix pages.

## v2023.11.10-1

Released on November 10, 2023

### Improvements {#improvements-v2023-11-10-1}
* Updates button styles on Troubleshoot, License Fields, Images, Kubernetes Installers, and Custom Domains.
* Standardizes button styles on Team and Account Settings pages.

## v2023.11.10-0

Released on November 10, 2023

### Improvements {#improvements-v2023-11-10-0}
* Adds the ability to save table settings (column order, column visibility, sort by, page size) on Customer and Instances table.
* Standardizes button styles on Releases, Channels, and Customers pages.

### Bug Fixes {#bug-fixes-v2023-11-10-0}
* Show promoted channel(s) when viewing a KOTS release.

## v2023.11.06-1

Released on November 6, 2023

### Improvements {#improvements-v2023-11-06-1}
* Improves the way large amounts of custom metrics display on the Instance Details page, in both the Filters dropdown and the Custom Metrics section on the left.

## v2023.11.03-1

Released on November 3, 2023

### Bug Fixes {#bug-fixes-v2023-11-03-1}
* Filters out "read" events in the audit log initial search query.

## v2023.11.03-2

Released on November 3, 2023

### Improvements {#improvements-v2023-11-03-2}
* Redirects user to the most recently managed application upon login.

## v2023.10.30-3

Released on October 30, 2023

### Bug Fixes {#bug-fixes-v2023-10-30-3}
* Fixes style bug on the Audit Log page where the search input border is partially hidden.

## v2023.10.30-2

Released on October 30, 2023

### Improvements {#improvements-v2023-10-30-2}
* Makes some columns hidden by default in the Instances view on the Customers page and updates column names.

## v2023.10.30-1

Released on October 30, 2023

### Improvements {#improvements-v2023-10-30-1}
* Updates styles on **Instance Details** page.
* Updates tab styles throughout the vendor portal.

## v2023.10.27-2

Released on October 27, 2023

### Improvements {#improvements-v2023-10-27-2}
* Standardizes breadcrumbs across the site.

## v2023.10.27-1

Released on October 27, 2023

### Improvements {#improvements-v2023-10-27-1}
* Various style improvements to the **Images**, **Kubernetes Installer**, **Custom Domains**, and **App Settings** pages.

## v2023.10.26-3

Released on October 26, 2023

### Improvements {#improvements-v2023-10-26-3}
* Various style improvements to the compatibility matrix **Cluster History**, **Customers**, **Troubleshoot**, and **License Fields** pages.

## v2023.10.26-2

Released on October 26, 2023

### Bug Fixes {#bug-fixes-v2023-10-26-2}
* Fixes query timeout issues with the `/events` API endpoint.

## v2023.10.26-0

Released on October 26, 2023

### Improvements {#improvements-v2023-10-26-0}
* Allows editing tags in the Cluster History table.
* Allows adding tags as separate columns in the Cluster History table.
* Shows some statistics at the top of the Cluster History table.

## v2023.10.24-0

Released on October 24, 2023

### Improvements {#improvements-v2023-10-24-0}
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

### Improvements {#improvements-v2023-10-18-0}
* Shows tags on the cluster and cluster history table.

### Bug Fixes {#bug-fixes-v2023-10-18-0}
* Limits release size to 16MiB when compressed using the [Vendor API v3 to create a release](https://replicated-vendor-api.readme.io/reference/createrelease).
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
* Various design imporvements to the **Cluster History** page to improve the user experience.

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

### Improvements {#improvements-v2023-10-10-0}
* Adds a verification stage when provisioning bare metal clusters of type Kind, K3s, kURL, and HelmVM to check that the cluster is running and healthy.

## v2023.10.09-1

Released on October 9, 2023

### Bug Fixes {#bug-fixes-v2023.10.09-1}
* Updates the icon for custom metrics events on the Instance Details pages.

## v2023.10.09-0

Released on October 9, 2023

### Improvements {#improvements-v2023.10.09-0}
* Sets `false` as the default value for any new boolean license fields.
* Changes boolean license field options to a "True"/"False" dropdown on the **Customer Manage** and **Create Customer** pages.
