# Configuring and Deploying [App Name]

<!-- Provide a topic sentence, such as the one below -->

This topic includes procedures for configuring the following [components/features/functionality] of [App Name]:
* [component/feature/functionality]
* [component/feature/functionality]
* [component/feature/functionality]

## Overview of Configuring [App Name]

<!-- Include an Overview section to give an introduction to the
configuration process.
For example, you can include descriptions of terminology, provide any
recommendations, or describe why completing the configuration procedures
is important.-->

## Prerequisites <!-- Remove this Prerequisites section if not needed. -->

<!-- Include an optional Prerequisites section is there are tasks a user
must do or information a user must gather before configuring. -->

Before you configure [App Name], do the following:

* Prerequisite <!-- Example: "Ensure that port 8800 is open."-->
* Prerequisite

## Configure [App Name]

This section includes procedures for configuring [App Name].

### Configure [Section 1]

<!-- This section heading should most likely match the title of
the corresponding section in the Replicated admin console
configuration screen.
Example: "Configure Networking"-->

[Configuration Section 1] includes fields for configuring [a feature or service] in [App Name].

To configure [Section 1]:

1. For **[Field Name]**, enter [information].

1. (Optional) For **[Field Name]**, enter [information].
  <!-- Put (Optional) at the start to denote optional fields.-->

### Configure [Section 2]

To configure [Section 2]:

1. For **[Field Name]**, enter [information].

1. For **[Subsection Name]**, complete the following fields:
<!-- To handle subsections with multiple fields,
use the following table format-->
   <table>
     <tr>
       <th>Field Name</th>
       <th>Description</th>
     </tr>
     <tr>
       <td>[Field Name]</td>
       <td>Enter [information].</td>
     </tr>
     <tr>
       <td>(Optional) [Field Name]</td>
       <td>Enter [information].</td>
     </tr>
   </table>

### (Optional) Configure [Section 3] <!-- Put (Optional) at the start to denote optional sections.-->

To configure [Section 3]:

1. For **[Field Name]**, enter [information].

1. For **[Field Name]**, select one of the following options:
   * **[Option A]**: To [do x], select **[Option A]**.
   * **[Option B]**: To [do x], select **[Option B]**.
   <!-- Use this bulleted list format if the user needs to
   select between multiple options.-->

When you complete the fields on the configuration screen, click **Continue** to proceed to the next step.

## Pass Preflight Checks and Deploy

<!-- Review the content in this section and make any edits for your use cases as needed. -->

After you save the configuration for [App Name], you can run the preflight checks and deploy.

Preflight checks are conformance tests that the admin console automatically runs to ensure the cluster meets minimum requirements. Preflight checks provide clear feedback about any missing requirements or incompatibilities in the cluster before you deploy.

To complete the preflight checks and deploy [App Name]:

1. If there are no preflight check warnings or failures, continue with deployment.
2. If there are any preflight check warnings and failures:
    * Resolve the warnings and failures, and click **Re-run** to run the preflight checks again.
    * If there are no failures that prevent application deployment, you can choose to dismiss the preflight check warnings to continue.

      We recommend that you address any warnings or failures, rather than dismissing them. Preflight checks help ensure that your environment meets the requirements for application deployment.

    * If you are installing with minimal role-based access control (RBAC), the admin console recognizes if the preflight checks failed due to insufficient privileges.

      When this occurs, a kubectl preflight command displays that lets you manually run the preflight checks. The results are then automatically uploaded to the admin console.

  After preflight checks are complete, the application is deployed, and the admin console dashboard opens.

<!-- ## Additional Resources

* Link 1
* Link 2

[Include an optional Additional Resources section ONLY if there is a specific reason that the users must or should reference these links.]

-->
