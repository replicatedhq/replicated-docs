# Submit a Support Request

This topic describes how to open a support request with the Replicated team, including information about the fields in the support request form. It also describes how to attach new support bundles to an existing support issue.

## Overview

You can submit support requests and support bundles to Replicated through the Replicated Vendor Portal.

Replicated recommends that you always provide a support bundle when you open a new support request, and that you attach new bundles to an existing support issue when conditions change or new problems arise. Uploading a support bundle is secure and helps the Replicated support team troubleshoot your application faster. Severity 1 issues are resolved three times faster when you submit a support bundle with your support request.

Replicated recommends uploading the support bundle through the Vendor Portal rather than uploading bundles to the issue in Github directly. Many support bundles will exceed the Github size limits for file uploads. Additionally, the Vendor Portal provides insights and analysis for uploaded bundles that are beneficial for the support process. 

## Prerequisites

The following prerequisites must be met to submit support requests:

* Your Vendor Portal account must be configured for access to support before you can submit support requests. Contact your administrator to ensure that you are added to the correct team.

* Your team must have a replicated-collab repository configured. If you are a team administrator and need information about getting a collab repository set up and adding users, see [Adding Users to the Collab Repository](team-management-github-username#add).

## (Recommended) Open a Support Request from a Support Bundle

When you open a support request when viewing a bundle on the Vendor Portal **Support Bundle Analysis** page, the support request form is pre-populated with information from the support bundle and the associated customer license. The support bundle is also automatically attached to the request.

To submit a support request from the **Support Bundle Analysis** page:

1. In the Vendor Portal, go to the **Troubleshoot** tab.

1. Select the support bundle that you want to attach to a new support request. If you need to upload or generate the support bundle, click **Add support bundle**. 

1. At the top of the **Support Bundle Analysis** page, click **Submit support ticket**.

    :::note
    The **Share with Replicated** button on the **Support Bundle Analysis** page does _not_ open a support request. You might be directed to use the **Share with Replicated** option when you are already interacting with a Replicated team member. For more information, see [Provide Support Bundles to Replicated After Opening a Support Request](#add-bundle-after).
    :::

1. For **1. Tell us about the issue**, review the pre-populated information in the request form and make any changes as needed. For more information about these fields, see [Open a Support Request from the Support Page](#support-page) below.

1. Complete any empty fields, including adding an issue title and description.

1. Click **Submit support request**.

## Open a Support Request from the Support Page {#support-page}

To submit a support request from the Vendor Portal **Support** page:

1. In the Vendor Portal, go to **[Support](https://vendor.replicated.com/support) > Open a support request**.

1. In section 1 of the Support Request form, complete the required fields that apply to all requests:

    <table>
      <tr>
        <th width="30%">Field</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <th>First Name and Last Name</th>
        <td>Enter your first and last name.</td>
      </tr>
      <tr>
        <th>Please choose the application you're troubleshooting</th>
        <td>
          <p>Select the application associated with this support request.</p>
          <p>The application informs which customers, if any, the support case is in relation to.</p>
        </td>
      </tr>
      <tr>
        <th>Which customer are you supporting?</th>
        <td>
          <p>Search for the name of the customer.</p>
          <p>Choosing a customer is required to enable some SLA levels which are tied to paid licenses.</p>
        </td>
      </tr>
      <tr>
        <th>What type of installation is this impacting?</th>
        <td>
          <p>The options available in this field vary depending on the license type of the customer that you selected. Your selection for installation type determines which additional dynamic fields that are displayed on the request form.</p>
          <p>The following describes each option:</p>
          <ul>
            <li><strong>This is a non-critical question:</strong> Select this option for general questions</li>
            <li><strong>This is a problem outside of the customer premises:</strong> Issues that are not related to the on-prem install, but impact customers</li>
            <li><strong>This is a problem affecting our internal team:</strong> Issues impacting internal teams (such as CI/CD or development environment issues). These issues are not associated with a specific licensed customer.</li>
            <li><strong>This is a problem with software installed at a customer premises:</strong> Issues impacting one of your customers with the on-prem software</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Product area</th>
        <td>
          <p>The options available in this field vary depending on the products included in your account and enabled for the chosen customer.</p>
          <p>The following describes each option:</p>
          <ul>
            <li><strong>KOTS:</strong> Issues with the KOTS Admin Console or KOTS CLI</li>
            <li><strong>Embedded Kubernetes (kURL):</strong> Issues with the kURL installer</li>
            <li><strong>Embedded Kubernetes (Embedded Cluster):</strong> Issues with Embedded Cluster</li>
            <li><strong>Download Portal:</strong> Issues with the SaaS customer facing portals, including the Download Portal or the Enterprise Portal</li>
            <li><strong>Product Documentation:</strong> Questions or issues with documentation</li>
            <li><strong>Support Bundles and Preflights:</strong> Questions about Troubleshoot Support Bundles and Preflights</li>
            <li><strong>Replicated SDK</strong>: Questions about the Replicated SDK</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Issue title</th>
        <td>The issue title on GitHub.</td>
      </tr>
      <tr>
        <th>Describe the issue, problem, or potential bug</th>
        <td>The issue description on GitHub.</td>
      </tr>
    </table>

1. Depending on what you selected for the fields in the previous step, complete the additional dynamic fields displayed in the request form:   

   <table>
      <tr>
        <th width="30%">Field</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <th>The application is currently down in a customer environment</th>
        <td>
          <p>This field is displayed if you selected **This is a problem with software installed at a customer premises** for the installation type.</p>
          <p>Indicates if business critical functionality is not working at all.</p>
        </td>
      </tr>
      <tr>
        <th>What is impacted?</th>
        <td>
          <p>This field is only present if you selected **This is a problem outside of the customer premises** for the installation type.</p>
          <p>The following describes the options:</p>
          <ul>
            <li>I have a question</li>
            <li>One or more components</li>
            <li>I cannot use the service at all</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Is the issue with installing an application?</th>
        <td>
          <p>This field is only present when the issue is related to customer sites.</p>
          <p>Indicate if the issue is with a new install or an existing install. New is for first time installation support and existing install is for any other lifecycle after an initial successful install, including upgrades.</p>
        </td>
      </tr>
      <tr>
        <th>Type of cluster</th>
        <td>
          <p>This field is present unless you selected **This is a problem outside of the customer premises** for the installation type.</p>
          <p>Indicates the type of Kubernetes cluster where the issue is present:</p>
          <ul>
            <li><strong>kURL:</strong> kURL installations</li>
            <li><strong>Embedded Cluster:</strong> Embedded Cluster installations</li>
            <li><strong>Customer-supplied:</strong> Any other cluster type supplied by the customer</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Is the issue in an air gap environment?</th>
        <td>
          <p>This field is present unless you selected **This is a problem outside of the customer premises** for the installation type.</p>
          <p>Indicates if the installation is air-gapped.</p>
        </td>
      </tr>
    </table> 

1. In section 2, do _one_ of the following:
    - Use your pre-selected support bundle or select a different bundle in the pick list
    - Select **Upload and attach a new support bundle** and attach a bundle from your file browser

1. Click **Submit Support Request**. You receive a link to your support issue, where you can interact with the support team.

   :::note
   Click **Back** to exit without submitting a support request.
   :::

## Provide Support Bundles to Replicated After Opening a Support Request {#add-bundle-after}

Other ways of providing support bundles after a support request is created:

* On the **Troubleshoot** tab select “Add support bundle/Upload bundle” in the upper right. You can attach new support bundles and select any open support case to have the bundle also posted to that support case.

* On any **Customer** page, select the **Support bundles** tab to see support bundles for that customer. You can also upload a bundle here as well and select any open support case to have the bundle also posted to an open support case.

* Support bundle URLs can be shared directly from the URL bar. These will be in the form https://vendor.replicated.com/troubleshoot/analyze/2024-08-07@22:10 however you must select “Share with Replicated” if you want Replicated support engineers to be able to access the bundle. This is not necessary when sharing internally with team members already registered in your Vendor Portal account.