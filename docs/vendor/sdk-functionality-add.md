import AddFunctionality from "../partials/releases/_add-functionality.mdx"

# Add SDK Functionality

<AddFunctionality/>

The following table gives a suggested order, but you can add functionality to the SDK in any order and as needed.

<table>
  <tr>
    <th width="30%">Functionality</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>Notifications</td>
    <td>Configure email notifications for important changes to customer instances, such as a degraded status.<br></br><br></br>Configure a Slack Webhook to send instance notifications to Slack to quickly alerts your team about instance changes. See <a href="instance-notifications-config">Configuring Instance Notifications</a>.</td>
  </tr>
  <tr>
    <td>License Entitlements</td>
    <td>Edit built-in license field values, such as the expiration date.<br></br><br></br>Configure custom license fields fields that are specific to a customer, such as limiting the number of active users permitted. See <a href="licenses-adding-custom-fields">Managing Custom License Fields</a>.</td>
  </tr>
  <tr>
    <td>Preflight Checks and Support Bundles</td>
    <td>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations.<br></br><br></br>Enable support bundles to collect and analyze troubleshooting data from your customers' clusters to help you diagnose problems with application deployments. See <a href="preflight-support-bundle-about">About Preflight Checks and Support Bundles</a>.</td>
  </tr>
  <tr>
    <td>Compatibility Matrix</td>
    <td></td>
  </tr>
  <tr>
    <td>Proxy Service</td>
    <td>Configure the Replicated proxy service to use customer licenses to grant pull-through access from your online private registry without exposing your registry credentials. See <a href="helm-image-registry">Using External Registries for Helm Installations</a>.</td>
  </tr>
  <tr>
    <td>Custom Domains</td>
    <td>Configure custom domains to alias the Replicated endpoints that are used for customer-facing URLs. This includes the proxy service that pulls your application image. See <a href="custom-domains-using">Using Custom Domains</a>.</td>
  </tr>
</table>