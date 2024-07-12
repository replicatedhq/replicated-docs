---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Vendor Platform Release Notes

<!--RELEASE_NOTES_PLACEHOLDER-->

## v2024.07.09-0

Released on July 9, 2024

### Improvements {#improvements-v2024-07-09-0}
* UI improvements for Embedded Cluster installation instructions.

## v2024.06.26-4

Released on June 26, 2024

### New Features {#new-features-v2024-06-26-4}
* Adds a new "Upcoming license expiration" section to the Dashboard page.

## v2024.06.25-1

Released on June 25, 2024

### Bug Fixes {#bug-fixes-v2024-06-25-1}
* Use the correct Embedded Cluster icon on the customer page.
* Release API now returns a 400 with a more descriptive error message when a release includes duplicate chart names.

## v2024.06.24-1

Released on June 24, 2024

### Bug Fixes {#bug-fixes-v2024-06-24-1}
* Proxy Service no longer requires access to proxy-auth.replicated.com.

## v2024.06.24-0

Released on June 24, 2024

### Improvements {#improvements-v2024-06-24-0}
* Support form product list renames **Troubleshoot** to **Support bundles and preflights**.

## v2024.06.21-2

Released on June 21, 2024

### New Features {#new-features-v2024-06-21-2}
* Adds the ability to pull public images through the proxy registry without credentials using the prefix `proxy.replicated.com/anon`. For example `docker pull proxy.replicated.com/anon/docker.io/library/mysql:latest`.

## v2024.06.17-1

Released on June 17, 2024

### New Features {#new-features-v2024-06-17-1}
* Replicated SDK support bundles details are now visible in Troubleshoot.

## v2024.06.13-0

Released on June 13, 2024

### New Features {#new-features-v2024-06-13-0}
* Adds a direct link to the **License Fields** page from the **Manage Customer** and **Create New Customer** pages if the user has no custom license fields configured under the "Custom fields" section.

## v2024.06.12-0

Released on June 12, 2024

### Improvements {#improvements-v2024-06-12-0}
* Improves mobile styles on the table views on the **Customers** and **Channels** pages, as well as some mobile styles on the **Releases** page.

## v2024.05.30-7

Released on May 30, 2024

### Bug Fixes {#bug-fixes-v2024-05-30-7}
* Fixes incorrectly displayed "No records to display" message, which appeared on the **Cluster History** page while loading data.

## v2024.05.30-5

Released on May 30, 2024

### New Features {#new-features-v2024-05-30-5}
* Adds Sonatype Nexus Repository to the list of providers on the **Images** page.
* Adds support for linking and proxying images from anonymous registries.

## v2024.05.28-3

Released on May 28, 2024

### New Features {#new-features-v2024-05-28-3}
* Add support for Oracle OKE 1.29.

### Bug Fixes {#bug-fixes-v2024-05-28-3}
* Fix Compatibility Matrix available credits rounding.

## v2024.05.28-0

Released on May 28, 2024

### Bug Fixes {#bug-fixes-v2024-05-28-0}
* Users can create GitHub support tickets with large support bundle analysis results.

## v2024.05.24-6

Released on May 24, 2024

### New Features {#new-features-v2024-05-24-6}
* Added support for Sonatype Nexus registry.

## v2024.05.24-2

Released on May 24, 2024

### Bug Fixes {#bug-fixes-v2024-05-24-2}
* Fixes a bug that caused version string for Replicated SDK chart have an invalid "v" prefix.

## v2024.05.23-2

Released on May 23, 2024

### Bug Fixes {#bug-fixes-v2024-05-23-2}
* Adds validation to compatibility matrix object-store add-on bucket prefix input.

## v2024.05.21-1

Released on May 21, 2024

### New Features {#new-features-v2024-05-21-1}
* Adds API support for Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) to compatibility matrix.

### Bug Fixes {#bug-fixes-v2024-05-21-1}
* Fixes a bug where users could not restore password policies to default.
* Disables the edit and archive channel options and displays helpful hover text on the **Channels** page table view when the user does not have permission to edit channels.
* Fixes a bug that caused "airgap:true" or "airgap:false" customer searches to fail with error 500.

## v2024.05.21-0

Released on May 21, 2024

### New Features {#new-features-v2024-05-21-0}
* Compatibility matrix automatically sends an email notification to team admins when a team is low on credits.

## v2024.05.20-1

Released on May 20, 2024

### New Features {#new-features-v2024-05-20-1}
* Adds support for IP dual-stack Kind clusters to compatibility matrix.

## v2024.05.16-3

Released on May 16, 2024

### Bug Fixes {#bug-fixes-v2024-05-16-3}
* Fixes an issue that would cause embedded cluster installs to fail with error 404 when downloading public files.

## v2024.05.14-2

Released on May 14, 2024

### New Features {#new-features-v2024-05-14-2}
* Adds Beta support for collecting telemetry from instances running in air gap environments with no outbound internet access. For more information, see [Collecting Telemetry for Air Gap Instances](/vendor/telemetry-air-gap).

### Improvements {#improvements-v2024-05-14-2}
* Allows installations with the Helm CLI to upload a support bundle on the **Customer Reporting** page.
* Improves mobile responsiveness of the sign up and login flow in the vendor portal.

## v2024.05.14-1

Released on May 14, 2024

### Bug Fixes {#bug-fixes-v2024-05-14-1}
* Fixes a bug that would cause downloaded licenses to not include custom hostname in the `endpoint` field.

## v2024.05.10-1

Released on May 10, 2024

### New Features {#new-features-v2024-05-10-1}
* Adds support for creating compatibility matrix ports with wildcard domains and TLS certificates.

## v2024.05.10-0

Released on May 10, 2024

### Improvements {#improvements-v2024-05-10-0}
* Moves release information for the bundle under "Versions Behind" on the **Support Bundle Analysis** page.

### Bug Fixes {#bug-fixes-v2024-05-10-0}
* Fixes a bug where product options are not updated correctly when changing installation type in the create a support issue modal.

## v2024.05.08-0

Released on May 8, 2024

### New Features {#new-features-v2024-05-08-0}
* Adds "Not Recommended" label to the "GitOps Enabled" option on the **Manage Customer** and **Create New Customer** pages.
* Improves Airgap Bundle Contents modal size for long image names.
* Shows the Replicated domain next to the headers on the **Custom Domains** page.

### Bug Fixes {#bug-fixes-v2024-05-08-0}
* Remove native sorting on Customers and Instances table.

## v2024.05.06-2

Released on May 6, 2024

### Bug Fixes {#bug-fixes-v2024-05-06-2}
* Adds validation when creating and deleting license fields.

## v2024.05.06-1

Released on May 6, 2024

### New Features {#new-features-v2024-05-06-1}
* Adds additional bundle validation when uploading a support bundle for air gap telemetry (alpha feature).

## v2024.05.03-1

Released on May 3, 2024

### Bug Fixes {#bug-fixes-v2024-05-03-1}
* Fixes an issue that caused compatibility matrix addons to stay in a pending state for multi-node clusters.

## v2024.05.01-2

Released on May 1, 2024

### New Features {#new-features-v2024-05-01-2}
* Adds support for creating RKE2 clusters with compatibility matrix using the vendor portal UI.

## v2024.04.29-0

Released on April 29, 2024

### New Features {#new-features-v2024-04-29-0}
* Adds support for creating RKE2 clusters with compatibility matrix using the Vendor API v3.

## v2024.04.26-5

Released on April 26, 2024

### Bug Fixes {#bug-fixes-v2024-04-26-5}
* Fixes Embedded Cluster support on the compatibility matrix create cluster page.

## v2024.04.26-3

Released on April 26, 2024

### Bug Fixes {#bug-fixes-v2024-04-26-3}
* Displays error when creating an embedded cluster with the compatibility matrix and the `--version` flag is a non-numeric string.

## v2024.04.26-1

Released on April 26, 2024

### Bug Fixes {#bug-fixes-v2024-04-26-1}
* Only users with the `team/support-issues/write` RBAC policy can submit support tickets on the **Support Bundle Analysis** page.

## v2024.04.25-0

Released on April 25, 2024

### Bug Fixes {#bug-fixes-v2024-04-25-0}
* Users can sort customers by the date they were created on the **Customers** page.

## v2024.04.23-1

Released on April 23, 2024

### Bug Fixes {#bug-fixes-v2024-04-23-1}
* When a user selects a customer-supplied Kubernetes cluster in the support form, the end of life (EOL) alert about the deprecated Docker and Weave kURL add-ons will not apply for the latest channel kURL installer.

## v2024.04.22-1

Released on April 22, 2024

### Bug Fixes {#bug-fixes-v2024-04-22-1}
* Fixes a bug with the 'Reset' filters button on the **Customers** page.

## v2024.04.18-2

Released on April 18, 2024

### Bug Fixes {#bug-fixes-v2024-04-18-2}
* Fixes styling on the 'Reset password' modal and 'Trial expired' modal on the **Login** page.
* Fixes a stray '0' rendering under the "Latest Release" sections on the **Channels** page for Builders Plan users.


## v2024.04.16-1

Released on April 16, 2024

### New Features {#new-features-v2024-04-16-1}
* Adds support for Postgres as an addon for EKS clusters in compatibility matrix.

## v2024.04.12-5

Released on April 12, 2024

### New Features {#new-features-v2024-04-12-5}
* Adds the ability to expose NodePorts on VM clusters in compatibility matrix.
* Adds the ability to attach new S3 buckets to EKS clusters in compatibility matrix.

## v2024.04.11-2

Released on April 11, 2024

### Bug Fixes {#bug-fixes-v2024-04-11-2}
* Eliminates excessive page reloads on the **Support Bundle Analysis** page that would cause users to lose their place.

## v2024.04.11-1

Released on April 11, 2024

### Bug Fixes {#bug-fixes-v2024-04-11-1}
* Fix selected default instance type on Compatibility Matrix.

## v2024.04.11-0

Released on April 11, 2024

### Bug Fixes {#bug-fixes-v2024-04-11-0}
* Fixes an issue that prevented add-ons from multi-node compatibility matrix clusters from working properly.

## v2024.04.10-0

Released on April 10, 2024

### New Features {#new-features-v2024-04-10-0}
* Allows sev 1 and 2 support issues to be submitted for the Replicated host service, including the compatibility matrix and vendor portal.

### Improvements {#improvements-v2024-04-10-0}
* Highlights required fields that are not filled on the support issue form on the **Support** page.

## v2024.04.09-2

Released on April 9, 2024

### New Features {#new-features-v2024-04-09-2}
* Adds advanced cluster creation form for compatibility matrix.

## v2024.04.04-0

Released on April 4, 2024

### New Features {#new-features-v2024-04-04-0}
* Adds channel sequence and updates row styles on the **Release History** page.

## v2024.04.02-2

Released on April 2, 2024

### Bug Fixes {#bug-fixes-v2024-04-02-2}
* Fixes an issue that caused collisions in kubeconfig context naming when using the `replicated cluster kubeconfig` command resulting in contexts being overwritten.

## v2024.04.01-3

Released on April 1, 2024

### New Features {#new-features-v2024-04-01-3}
* Makes the granular resource status view generally available (GA). For more information, see [Instance Details](/vendor/instance-insights-details#current-state).

## v2024.03.27-3

Released on March 27, 2024

### Improvements {#improvements-v2024-03-27-3}
* Moves the **Audit Log** page to be nested under the **Team** section. Shows a message to the user if they visit the **Audit Log** from the account dropdown in the top right, and informs them that the **Audit Log** will be permanently moving to the **Team** section in the near future.

## v2024.03.27-1

Released on March 27, 2024

### New Features {#new-features-v2024-03-27-1}
* Allows user to attach both existing support bundles and upload new bundles on the support request form on the **Support** page.
* Displays the latest release in the channel at time of bundle collection and the release sequence that was installed at time of bundle collection on **Support Bundle Analysis** pages.

## v2024.03.27-0

Released on March 27, 2024

### Bug Fixes {#bug-fixes-v2024-03-27-0}
* Shows certificate errors on the **Custom Domains** page if certificates cannot be renewed.

## v2024.03.26-5

Released on March 26, 2024

### New Features {#new-features-v2024-03-26-5}
* Compatibility matrix supports Standard_DS and GPU based instance types for AKS clusters.

### Improvements {#improvements-v2024-03-26-5}
* Removes the "Download license" and "Install Instructions" buttons from the **Instance Details** page, as they are not relevant on that page.

## v2024.03.26-1

Released on March 26, 2024

### Improvements {#improvements-v2024-03-26-1}
* Changes the **Instances** option in the **Download CSV** dropdown on the **Customers** page to **Customers + Instances** to better communicate that it is a superset that contains both customers *and* instances.

## v2024.03.25-0

Released on March 25, 2024

### New Features {#new-features-v2024-03-25-0}
* Adds a **View bundle contents** link on airgap bundles that have a warning status on the vendor portal **Release History** page.

## v2024.03.22-1

Released on March 22, 2024

### Improvements {#improvements-v2024-03-22-1}
* Hides the "View bundle contents" link on the **Release History** page if an airgap bundle contains no images. To view image lists, rebuild your bundle.

## v2024.03.21-8

Released on March 21, 2024

### Bug Fixes {#bug-fixes-v2024-03-21-8}
* Fixes an issue where online embedded cluster downloads failed if airgap download was not enabled for the customer / license.

## v2024.03.21-5

Released on March 21, 2024

### New Features {#new-features-v2024-03-21-5}
* Adds the ability to view more granular app status updates in the Instance Activity section on the **Instance Details** page via a tooltip. To get access to this feature, log in to your vendor portal account, select Support > Request a feature, and submit a feature request for "granular app status view".
* Adds a **View bundle contents** link on the **Release History** page to view a list of images in a given airgap bundle.

    :::note
    This link appears only for releases built or rebuilt after this implementation.
    ::: 

## v2024.03.21-3

Released on March 21, 2024

### Bug Fixes {#bug-fixes-v2024-03-21-3}
* Fixes pagination on the compatibility matrix **Cluster History** page.

## v2024.03.21-1

Released on March 21, 2024

### Bug Fixes {#bug-fixes-v2024-03-21-1}
* Fixes a bug that could cause the **Channels** page table view to fail to load.

## v2024.03.21-0

Released on March 21, 2024

### Bug Fixes {#bug-fixes-v2024-03-21-0}
* Fixes a bug that could cause the compatibility matrix **Cluster History** page to fail to load.

## v2024.03.20-0

Released on March 20, 2024

### New Features {#new-features-v2024-03-20-0}
* Adds new cluster addon API.

### Bug Fixes {#bug-fixes-v2024-03-20-0}
* Fixes a bug where users with a "proton.me" email domain could enable auto-join for their team.

## v2024.03.18-1

Released on March 18, 2024

### Bug Fixes {#bug-fixes-v2024-03-18-1}
* Adds a **Helm CLI** option to the **Install Commands** modal on the **Release History** page.
* Fixes an issue that could cause a draft KOTS release to not contain KOTS specs by default.

## v2024.03.15-2

Released on March 15, 2024

### Bug Fixes {#bug-fixes-v2024-03-15-2}
* Fixes a styling bug in the granular app status tooltip.

## v2024.03.14-2

Released on March 14, 2024

### Bug Fixes {#bug-fixes-v2024-03-14-2}
* Corrects the `helm package` command provided in the **Add the Replicated SDK to your Helm Chart** dialog.

## v2024.03.14-1

Released on March 14, 2024

### New Features {#new-features-v2024-03-14-1}
* Adds the ability to view a more granular app status via a tooltip on the **Instance Details** page. To get access to this feature, log in to your vendor portal account, select **Support > Request a feature**, and submit a feature request for "granular app status view".

    :::note
    Due to a backend API fix, if the application's status informers are templatized, there might be formatting issues until another app release is promoted.
    :::

## v2024.03.14-0

Released on March 14, 2024

### Improvements {#improvements-v2024-03-14-0}
* Returns a friendly error message when attempting to download an embedded cluster release with an unknown version.

## v2024.03.13-0

Released on March 13, 2024

### New Features {#new-features-v2024-03-13-0}
* Adds the ability to search customers by their email address. For more information, see [Filter and Search Customers](/vendor/releases-creating-customer#filter-and-search-customers) in _Creating and Managing Customers_.

## v2024.03.12-1

Released on March 12, 2024

### Improvements {#improvements-v2024-03-12-1}
* Makes the **Gitops Enabled** entitlement false by default when creating a customer. Also updates the description of the **Gitops Enabled** entitlement.

## v2024.03.11-0

Released on March 11, 2024

### Bug Fixes {#bug-fixes-v2024-03-11-0}
* Fixes a bug that could result in a bad URL when downloading an airgap bundle for Replicated kURL from the download portal.

## v2024.03.08-3

Released on March 8, 2024

### Bug Fixes {#bug-fixes-v2024-03-08-3}
* Fixes a bug in the vendor portal UI related to allowing license download when a channel does not have a release.

## v2024.03.08-2

Released on March 8, 2024

### New Features {#new-features-v2024-03-08-2}
* Adds support for E2 family and GPU Tesla T4 on GKE clusters created with the compatibility matrix.

## v2024.03.07-5

Released on March 7, 2024

### Bug Fixes {#bug-fixes-v2024-03-07-5}
* Fixes a bug that caused "An unknown actor performed the action" message to be shown in the Audit Log.

## v2024.03.07-0

Released on March 7, 2024

### New Features {#new-features-v2024-03-07-0}
* Adds the Replicated embedded cluster (Beta) distribution to the compatibility matrix. For more information, see [Using Embedded Cluster (Beta)](/vendor/embedded-overview).

## v2024.03.06-3

Released on March 6, 2024

### New Features {#new-features-v2024-03-06-3}
* Adds node autoscaling for EKS, GKE and AKS clusters created with the compatibility matrix.

## v2024.02.29-3

Released on February 29, 2024

### New Features {#new-features-v2024-02-29-3}
* Adds support for nodegroups to compatibility matrix clusters that use VM-based Kubernetes distributions and support multinode.

## v2024.02.29-0

Released on February 29, 2024

### New Features {#new-features-v2024-02-29-0}
* Enables the Embedded Cluster option on the customer license page. For more information, see [Using Embedded Cluster (Beta)](/vendor/embedded-overview).


## v2024.02.27-1

Released on February 27, 2024

### New Features {#new-features-v2024-02-27-1}
* Adds ARM support for Compatibility Matrix GKE clusters.

## v2024.02.26-0

Released on February 26, 2024

### New Features {#new-features-v2024-02-26-0}
* v3 API for `/customer_instances` endpoint supports filtering with the `customerIds=".."` query parameter.

## v2024.02.23-2

Released on February 23, 2024

### New Features {#new-features-v2024.02.23-2}
* Adds the ability to pin a license to a specific release sequence. To get access to this feature, log in to your vendor portal account. Select Support > Request a feature, and submit a feature request for "license release pinning".

## v2024.02.21-1

Released on February 21, 2024

### New Features {#new-features-v2024-02-21-1}
* Adds the EKS g4dn instance types to Compatibility Matrix.
* Adds the AKS Standard_D2ps_v5 and higher instance types to Compatibility Matrix.
* Labels and comments on support cases with End of Life (EOL) addons in kURL installer specs embedded in application releases.

## v2024.02.21-0

Released on February 21, 2024

### New Features {#new-features-v2024-02-21-0}
* Adds release info to the **Support bundle analysis** page.

## v2024.02.19-0

Released on February 19, 2024

### New Features {#new-features-v2024-02-19-0}
* Adds support for Node Groups on the **Cluster History** page.

## v2024.02.14-0

Released on February 14, 2024

### New Features {#new-features-v2024-02-14-0}
* Adds ability to add a Custom ID to a Customer through the vendor portal.
* Shows Custom ID and License ID on the Customers and Instances table views on the **Customers** page.

## v2024.02.13-3

Released on February 13, 2024

### New Features {#new-features-v2024-02-13-3}
* Adds support for creating multiple nodegroups in compatibility matrix EKS clusters.

## v2024.02.09-3

Released on February 9, 2024

### New Features {#new-features-v2024-02-09-3}
* Adds support for Google Artifact Registry.

### Improvements {#improvements-v2024-02-09-3}
* Adds pagination to the list of customer instances on the customer details page.

### Bug Fixes {#bug-fixes-v2024-02-09-3}
* pageSize and offset properties are no longer required for the `/v3/customers/search` Vendor API endpoint.  API consumers must provide at least one inclusion criteria for a valid customer search.

## v2024.02.08-2

Released on February 8, 2024

### Bug Fixes {#bug-fixes-v2024-02-08-2}
* Replaces GMT timezone value with UTC label.

## v2024.02.08-1

Released on February 8, 2024

### New Features {#new-features-v2024-02-08-1}
* Updates the pricing for compatibiliy matrix clusters that use Amazon Elastic Kubernetes Service (EKS) versions with extended support. For more information, see [Compatibility Matrix Platform Pricing](https://www.replicated.com/matrix/pricing) on the Replicated website.

## v2024.02.07-7

Released on February 7, 2024

### Bug Fixes {#bug-fixes-v2024-02-07-7}
* Custom Metrics chart tooltip displays two digits for the minutes field. Also adds GMT TZ for clarity.

## v2024.02.05-1

Released on February 5, 2024

### New Features {#new-features-v2024-02-05-1}
* Adds status indicator to Customer rows on the **Customers** page Hybrid view.
* Adds entitlement badges to Customer rows on the **Customers** page Hybrid view.

## v2024.02.05-0

Released on February 5, 2024

### New Features {#new-features-v2024-02-05-0}
* Label and comment on support cases with End Of Life (EOL) addons in Installer specs pinned to channels.

## v2024.02.01-4

Released on February 1, 2024

### Improvements {#improvements-v2024-02-01-4}
* Improves the display of large quantities of Custom Metrics on the **Instance Reporting** page.

## v2024.01.29-0

Released on January 29, 2024

### Improvements {#improvements-v2024-01-29-0}
* Adds link to documentation for updating team member email addresses.

## v2024.01.26-3

Released on January 26, 2024

### Bug Fixes {#bug-fixes-v2024-01-26-3}
* Display accurate active instance count on the **Customers** page.

## v2024.01.25-4

Released on January 25, 2024

### New Features {#new-features-v2024-01-25-4}
* Adds ability to filter customers by channel version on the **Customers** page.
* Adds links to filter customers by adopted version from the **Channels** page.

## v2024.01.25-0

Released on January 25, 2024

### Improvements {#improvements-v2024-01-25-0}
* Adds more helpful messaging on the **Support Bundle Analysis** page if your bundle does not contain an instance ID.

## v2024.01.23-1

Released on January 23, 2024

### Improvements {#improvements-v2024-01-23-1}
* Application release information is extracted from an attached support bundle and displayed in the Github support case for better reference.

## v2024.01.19-1

Released on January 19, 2024

### Bug Fixes {#bug-fixes-v2024-01-19-1}
* Adds the ability to scroll on the **License Fields** page.


## v2024.01.18-3

Released on January 18, 2024

### Improvements {#improvements-v2024-01-18-3}
* Displays air gap build status on the **Channels** page.

## v2024.01.18-2

Released on January 18, 2024

### Bug Fixes {#bug-fixes-v2024-01-18-2}
* Instances CSV export shows relevant `.airgap` bundle downloaded timestamp, channel_id, and channel_sequence data.

## v2024.01.17-1

Released on January 17, 2024

### New Features {#new-features-v2024-01-17-1}
* Adds support to the compatibility matrix for running Openshift clusters with multiple nodes.

## v2024.01.11-1

Released on January 11, 2024

### Bug Fixes {#bug-fixes-v2024-01-11-1}
* Fixes bug in the **Customers** page search feature, where it would not display the ‘not found’ state if no results were found.

## v2024.01.10-2

Released on January 10, 2024

### Bug Fixes {#bug-fixes-v2024-01-10-2}
* Adds an error state for the **Support Bundle Analysis** page if there is an invalid bundle slug in the URL.

## v2024.01.10-1

Released on January 10, 2024

### Improvements {#improvements-v2024-01-10-1}
* Adds pagination to the **Kubernetes Installers* page.

## v2024.01.10-0

Released on January 10, 2024

### Improvements {#improvements-v2024-01-10-0}
* Improve refetching on **Customers** page.

## v2024.01.09-4

Released on January 9, 2024

### Bug Fixes {#bug-fixes-v2024-01-09-4}
* Fixes the install links on the **Channels** page for Native applications.

## v2024.01.09-3

Released on January 9, 2024

### Improvements {#improvements-v2024-01-09-3}
* Adds pagination for the **Customers** page table view.

## v2024.01.08-6

Released on January 8, 2024

### Bug Fixes {#bug-fixes-v2024-01-08-6}
* Fixes back button behavior when navigating to the **Customers** page from a link on the **Channels** page.

## v2024.01.08-5

Released on January 8, 2024

### Improvements {#improvements-v2024-01-08-5}
* Adds an 'Add support bundle' button the the **Customer Support Bundles** page.
* Adds an error state when user visits an invalid release.
* Simplifies the search design on the **Troubleshoot** pages.
* Adds an empty state when there are no search results on the **Troubleshoot** pages.
* Persists the search query and shows correct results when switching between the application-level **Troubleshoot** page and the top-level **Troubleshoot** page.

### Bug Fixes {#bug-fixes-v2024-01-08-5}
* Fixes bug where the search box would disappear on the top-level **Troubleshoot** page if the query returned no results.

## v2024.01.08-1

Released on January 8, 2024

### New Features {#new-features-v2024-01-08-1}
* Adds both TTL and Duration to the **Cluster History** page.
* Fixes sort by TTL and sort by duration to work with paginated results.
* Adds filter by Kubernetes distribution to the **Cluster History** page.
* Adds filter by Cost to the **Cluster History** page.
* Adds filter by Node Count to the **Cluster History** page.

## v2024.01.08-0

Released on January 8, 2024

### Bug Fixes {#bug-fixes-v2024-01-08-0}
* Fixes a bug where the support bundle and customer name would not be prefilled on the support request form if you navigated there from one of the "Submit support ticket" links on the **Troubleshoot** or **Dashboard** pages.

## v2024.01.04-2

Released on January 4, 2024

### Improvements {#improvements-v2024-01-04-2}
* Adds ability to edit instance name on the **Customers** page.

### Bug Fixes {#bug-fixes-v2024-01-04-2}
* Shows an error state when you visit a customer page with an invalid app slug or customer ID in the URL.

## v2024.01.03-3

Released on January 3, 2024

### Improvements {#improvements-v2024-01-03-3}
* Improves the wording and styling of the Adoption Rate section of the channels on the **Channels** page.

### Bug Fixes {#bug-fixes-v2024-01-03-3}
* Fixes the filtering for the active/inactive customer links on the **Channels** page.

## v2024.01.03-2

Released on January 3, 2024

### Improvements {#improvements-v2024-01-03-2}
* Includes instance name on the **Support Bundle Analysis** page.

## v2024.01.03-0

Released on January 3, 2024

### Improvements {#improvements-v2024-01-03-0}
* Displays instance tags in Instance table view.

## v2024.01.02-0

Released on January 2, 2024

### Improvements {#improvements-v2024-01-02-0}
* Displays instance name on the **Customers** page hybrid view.

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
* Adds additional bundle and instance metadata to the **Support Bundle Analysis** page.

## v2023.12.21-3

Released on December 21, 2023

### Bug Fixes {#bug-fixes-v2023-12-21-3}
* Fixes incorrect link for releases and customers created by Service Accounts.

## v2023.12.20-1

Released on December 20, 2023

### Bug Fixes {#bug-fixes-v2023-12-20-1}
* Improves error messaging for the **Instance Details** page when there is an invalid app slug, customer ID, or instance ID in the URL.
* Fixes installation failures for applications with Helm charts that contain empty files.

## v2023.12.19-3

Released on December 19, 2023

### Bug Fixes {#bug-fixes-v2023-12-19-3}
* Allows user to press 'Enter' to submit when logging in to the download portal.

## v2023.12.19-2

Released on December 19, 2023

### Bug Fixes {#bug-fixes-v2023-12-19-2}
* Fixes scrolling on **Kubernetes Installers** teaser page.

## v2023.12.19-1

Released on December 19, 2023

### Improvements {#improvements-v2023-12-19-1}
* Redesigns the **Customers** page search to make it more streamlined.

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
* Adds ability to select the date time range filter in **Cluster History** page. Cluster stats can be filtered by `start-time` and `end-time`.

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
