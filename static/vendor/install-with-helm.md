# Installing with Helm

This topic describes how to use Helm to install releases that contain one or more Helm charts. For more information about the `helm install` command, including how to override values in a chart during installation, see [Helm Install](https://helm.sh/docs/helm/helm_install/) in the Helm documentation.

## Prerequisites

Before you install, complete the following prerequisites:

* The customer used to install must have a valid email address. This email address is only used as a username for the Replicated registry and is never contacted. For more information about creating and editing customers in the Vendor Portal, see [Creating a Customer](/vendor/releases-creating-customer).

* The customer used to install must have the **Existing Cluster (Helm CLI)** install type enabled. For more information about enabling install types for customers in the Vendor Portal, see [Managing Install Types for a License](licenses-install-types).

* To ensure that the Replicated proxy registry can be used to grant proxy access to your application images during Helm installations, you must create an image pull secret for the proxy registry and add it to your Helm chart. To do so, follow the steps in [Using the Proxy Registry with Helm Installations](/vendor/helm-image-registry).

* Declare the SDK as a dependency in your Helm chart. For more information, see [Install the SDK as a Subchart](replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_.

## Firewall Openings for Online Installations with Helm {#firewall}

The domains for the services listed in the table below need to be accessible from servers performing online installations. No outbound internet access is required for air gap installations.

For services hosted at domains owned by Replicated, the table below includes a link to the list of IP addresses for the domain at [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json) in GitHub. Note that the IP addresses listed in the `replicatedhq/ips` repository also include IP addresses for some domains that are _not_ required for installation.

For any third-party services hosted at domains not owned by Replicated, consult the third-party's documentation for the IP address range for each domain, as needed.

<table>
  <tr>
      <th width="50%">Domain</th>
      <th>Description</th>
  </tr>
  <tr>
      <td>`replicated.app` &#42;</td>
      <td><p>Upstream application YAML and metadata is pulled from `replicated.app`. The current running version of the application (if any), as well as a license ID and application ID to authenticate, are all sent to `replicated.app`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p>For the range of IP addresses for `replicated.app`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L60-L65) in GitHub.</p></td>
  </tr>
  <tr>
      <td>`registry.replicated.com`</td>
      <td><p>Some applications host private images in the Replicated registry at this domain. The on-prem docker client uses a license ID to authenticate to `registry.replicated.com`. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.</p><p>For the range of IP addresses for `registry.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L20-L25) in GitHub.</p></td>
  </tr>
  <tr>
      <td>`proxy.replicated.com`</td>
      <td><p>Private Docker images are proxied through `proxy.replicated.com`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p>For the range of IP addresses for `proxy.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L52-L57) in GitHub.</p></td>
  </tr>
</table>

&#42; Required only if the [Replicated SDK](/vendor/replicated-sdk-overview) is included as a dependency of the application Helm chart.

## Install

To install a Helm chart:

1. In the Vendor Portal, go to **Customers** and click on the target customer.

1. Click **Helm install instructions**.

     <img alt="Helm install button" src="/images/helm-install-button.png" width="700px"/>

     [View a larger image](/images/helm-install-button.png)

1. In the **Helm install instructions** dialog, run the first command to log in to the Replicated registry:

     ```bash
     helm registry login registry.replicated.com --username EMAIL_ADDRESS --password LICENSE_ID
     ```
     Where:
     * `EMAIL_ADDRESS` is the customer's email address
     * `LICENSE_ID` is the ID of the customer's license

     :::note
     You can safely ignore the following warning message: `WARNING: Using --password via the CLI is insecure.` This message is displayed because using the `--password` flag stores the password in bash history. This login method is not insecure.

     Alternatively, to avoid the warning message, you can click **(show advanced)** in the **Helm install instructions** dialog to display a login command that excludes the `--password` flag. With the advanced login command, you are prompted for the password after running the command.  
     :::

1. (Optional) Run the second and third commands to install the preflight plugin and run preflight checks. If no preflight checks are defined, these commands are not displayed. For more information about defining and running preflight checks, see [About Preflight Checks and Support Bundles](preflight-support-bundle-about).

1. Run the fourth command to install using Helm:

     ```bash
     helm install RELEASE_NAME oci://registry.replicated.com/APP_SLUG/CHANNEL/CHART_NAME
     ```
     Where:
     * `RELEASE_NAME` is the name of the Helm release.
     * `APP_SLUG` is the slug for the application. For information about how to find the application slug, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug).
     * `CHANNEL` is the lowercased name of the channel where the release was promoted, such as `beta` or `unstable`. Channel is not required for releases promoted to the Stable channel.
     * `CHART_NAME` is the name of the Helm chart.

     :::note
     To install the SDK with custom RBAC permissions, include the `--set` flag with the `helm install` command to override the value of the `replicated.serviceAccountName` field with a custom service account. For more information, see [Customizing RBAC for the SDK](/vendor/replicated-sdk-customizing#customize-rbac-for-the-sdk).
     :::

1. (Optional) In the Vendor Portal, click **Customers**. You can see that the customer you used to install is marked as **Active** and the details about the application instance are listed under the customer name. 

     **Example**:

     ![example customer in the Vendor Portal with an active instance](/images/sdk-customer-active-example.png)
     [View a larger version of this image](/images/sdk-customer-active-example.png)