import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import MissingState from "../partials/status-informers/_missing.mdx"

# Viewing Status Details

The application status displays on the dashboard of the Replicated admin console. Viewing the status details can be helpful for troubleshooting states, such as Missing.

There are two ways to view the status details, depending on your admin console version:

- (Version 1.51.0 and later) Click **Details** next to the status on the dashboard. For information about how to update the admin console to view the Details link, see [Updating the Admin Console on an Existing Cluster](updating-existing-cluster) and [Updating the Admin Console on a Kubernetes Installer-Created Cluster](updating-embedded-cluster).

  ![Status Details](/images/kotsadm-dashboard-appstatus.png)

- (Version 1.50.2 and earlier) Review the diagnostic information in `kots/admin_console/kotsadm-/kotsadm.log` in the support bundle. For more information about generating a support bundle, see [Generating Support Bundles](troubleshooting-an-app).

## Resource Statuses

Possible application statuses are Missing, Unavailable, Degraded, Ready, and Updating.

<Missing/>

Below is a table of resources that are supported and conditions that contribute to each status:

<StatusesTable/>
