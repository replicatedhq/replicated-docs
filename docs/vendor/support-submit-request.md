# Submit a Support Request

This topic describes how to open a support request with the Replicated team, including information about the fields in the support request form. It also describes how to attach new support bundles to an existing support issue.

For more information about working with support bundles, see [Generating Support Bundles](/vendor/support-bundle-generating).

## Overview

You can submit support requests and support bundles to Replicated through the Replicated Vendor Portal.

Replicated recommends that you always provide a support bundle when you open a new support request, and that you attach new bundles to an existing support issue when conditions change or new problems arise. Uploading a support bundle is secure and helps the Replicated support team troubleshoot your application faster. Severity 1 issues are resolved three times faster when you submit a support bundle with your support request.

## Prerequisites

The following prerequisites must be met to submit support requests:

* Your Vendor Portal account must be configured for access to support before you can submit support requests. Contact your administrator to ensure that you are added to the correct team.

* Your team must have a replicated-collab repository configured. If you are a team administrator and need information about getting a collab repository set up and adding users, see [Adding Users to the Collab Repository](team-management-github-username#add).

## (Recommended) Open a Support Request from a Support Bundle

If you open a support request when viewing a bundle on the Vendor Portal **Support Bundle Analysis** page, the support request form is pre-populated with information from the support bundle and the associated customer license. The support bundle is also automatically attached to the request.

To submit a support request from the **Support Bundle Analysis** page:

1. In the Vendor Portal, go to the [**Troubleshoot**](https://vendor.replicated.com/troubleshoot) tab.

1. Select the support bundle that you want to attach to a new support request. If you need to upload the support bundle, click **Add support bundle > Upload a support bundle**. 

1. At the top of the **Support Bundle Analysis** page, click **Submit support ticket**.

    :::note
    The **Share with Replicated** button on the **Support Bundle Analysis** page does _not_ open a support request. You might be directed to use the **Share with Replicated** option when you are already interacting with a Replicated team member. For more information, see [Provide Support Bundles to Replicated After Opening a Support Request](#add-bundle-after).
    :::

1. In section 1 of the support request form, review the pre-populated information and make any changes as needed. For more information about these fields, see [Open a Support Request from the Support Page](#support-page) below.

1. Complete any empty fields, including adding an issue title and description.

1. Click **Submit support request**.

## Open a Support Request from the Support Page {#support-page}

Replicated support SLAs are a combination of the customer license type, your Replicated plan, which product is impacted, and other considerations. Your answers to the questions in the support request form generate a severity calculation that is posted on the GitHub issue as a label, and potentially result in a page for high severity incidents.

To submit a support request from the Vendor Portal **Support** page:

1. In the Vendor Portal, go to **[Support](https://vendor.replicated.com/support) > Open a support request**.

1. In section 1 of the support request form, complete the required fields that apply to all requests:

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
          <p>The application that you select informs which customers (if any) associated with this support request.</p>
        </td>
      </tr>
      <tr>
        <th>Which customer are you supporting?</th>
        <td>
          <p>Search for the name of the customer associated with this support request.</p>
          <p>Choosing a customer is required to enable some SLA levels that are specific to paid licenses.</p>
        </td>
      </tr>
      <tr>
        <th>What type of installation is this impacting?</th>
        <td>
          <p>The options available in this field vary depending on the license type of the customer that you selected. Your selection for installation type determines the additional dynamic fields that are displayed on this request form.</p>
          <p>The following describes each option:</p>
          <ul>
            <li><strong>This is a non-critical question:</strong> Select this option for general questions</li>
            <li><strong>This is a problem outside of the customer premises:</strong> Issues that are not related to an on-prem installation, but still impact customers</li>
            <li><strong>This is a problem affecting our internal team:</strong> Issues impacting internal teams (such as CI/CD or issues seen in development environments)</li>
            <li><strong>This is a problem with software installed at a customer premises:</strong> Issues impacting one of your customers with the on-prem software</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Product area</th>
        <td>
          <p>The options available in this field vary depending on the products included in your account and enabled for the selected customer.</p>
          <p>The following describes each option:</p>
          <ul>
            <li><strong>KOTS:</strong> Issues with the KOTS Admin Console or KOTS CLI</li>
            <li><strong>Embedded Kubernetes (kURL):</strong> Issues with the kURL installer</li>
            <li><strong>Embedded Kubernetes (Embedded Cluster):</strong> Issues with the Embedded Cluster installer</li>
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

1. Complete the additional dynamic fields that are displayed in the request form. A subset of these dynamic fields is displayed depending on what you selected for the fields in the previous step.   

   <table>
      <tr>
        <th width="30%">Field</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <th>The application is currently down in a customer environment</th>
        <td>
          <p>This field is only present if you selected **This is a problem with software installed at a customer premises** for the installation type.</p>
          <p>Indicates if business critical functionality is not working at all.</p>
        </td>
      </tr>
      <tr>
        <th>What is impacted?</th>
        <td>
          <p>This field is only present if you selected **This is a problem outside of the customer premises** for the installation type.</p>
          <p>Select one of the options:</p>
          <ul>
            <li><strong>I have a question:</strong> Select for general questions</li>
            <li><strong>One or more components:</strong> The issue is with one or more specific components</li>
            <li><strong>I cannot use the service at all:</strong> Indicates that functionality is not working at all</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Is the issue with installing an application?</th>
        <td>
          <p>This field is only present if you selected **This is a problem with software installed at a customer premises** for the installation type.</p>
          <p>Select one of the following options:</p>
          <ul>
            <li><strong>New install:</strong> The issue is with a first time installation</li>
            <li><strong>Existing instance:</strong> The issue is with an instance after an initial successful installation, including upgrades.</li>
          </ul>  
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

1. In section 2, attach one or more support bundles:
    - Use your pre-selected support bundle or select a different bundle in the pick list
    - Select **Upload and attach a new support bundle** and attach a bundle from your file browser

1. Click **Submit support request**. You receive a link to your support issue where you can interact with the support team.

## Provide Support Bundles to Replicated After Opening a Support Request {#add-bundle-after}

You can attach new support bundles to existing support issues when conditions change or new problems arise. This helps the Replicated support team troubleshoot the issue more quickly.

:::note
Replicated recommends uploading support bundles through the Vendor Portal rather than uploading bundles to the issue in Github directly. Many support bundles will exceed the Github size limits for file uploads. Additionally, the Vendor Portal provides insights and analysis for uploaded bundles that are beneficial for the support process. 
:::

After you open a support request, you can do the following to share additional support bundles with Replicated:

* Go to the [**Troubleshoot**](https://vendor.replicated.com/troubleshoot) tab and click **Add support bundle > Upload support bundle**. In the **Upload a support bundle** dialog, select any open support issue to attach the bundle to that issue.

     <img alt="Upload a support bundle dialog" src="/images/support-bundle-analyze.png" width="500px"/>

     [View a larger version of this image](/images/support-bundle-analyze.png)

* Go to any **Customer** page and select the **Support bundles** tab. Click **Add support bundle > Upload support bundle**. In the **Upload a support bundle** dialog, select any open support issue to attach the bundle to that issue.

* From the **Support Bundle Analysis** page for a bundle, click **Share with Replicated** to allow Replicated support engineers to be able to access the bundle. Then, copy the support bundle URL directly from the address bar in your browser and share the link in the open support issue. The support bundle URL is in the format: `https://vendor.replicated.com/troubleshoot/analyze/2024-08-07@22:10`.

     :::note
     You do not need to click **Share with Replicated** to share support bundles URLs internally with members of your Vendor Portal team.
     :::