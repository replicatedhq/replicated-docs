# Managing Applications

This topic provides information about managing applications, including how to create, delete, and retrieve the slug for applications in the Replicated Vendor Portal and with the Replicated CLI.

For information about creating and managing application with the Vendor API v3, see the [apps](https://replicated-vendor-api.readme.io/reference/createapp) section in the Vendor API v3 documentation.

## Create an Application

Teams can create one or more applications. It is common to create multiple applications for testing purposes.

### Vendor Portal

To create a new application:

1. Log in to the [Vendor Portal](https://vendor.replicated.com/). If you do not have an account, see [Creating a Vendor Account](/vendor/vendor-portal-creating-account).

1. In the top left of the page, open the application drop down and click **Create new app...**.

   <img alt="create new app drop down" src="/images/create-new-app.png" width="300px"/>

   [View a larger version of this image](/images/create-new-app.png)

1. On the **Create application** page, enter a name for the application.

   <img alt="create new app page" src="/images/create-application-page.png" width="500px"/>

   [View a larger version of this image](/images/create-application-page.png)

   :::important
   If you intend to use the application for testing purposes, Replicated recommends that you use a temporary name such as `My Application Demo` or `My Application Test`.

   You are not able to restore or modify previously-used application names or application slugs.
   :::

1. Click **Create application**.

### Replicated CLI

To create an application with the Replicated CLI:

1. Install the Replicated CLI. See [Installing the Replicated CLI](/reference/replicated-cli-installing).

1. Run the following command:

   ```bash
   replicated app create APP-NAME
   ```
   Replace `APP-NAME` with the name that you want to use for the new application.

   **Example**:

   ```bash
   replicated app create cli-app
   ID                             NAME               SLUG               SCHEDULER
   1xy9t8G9CO0PRGzTwSwWFkMUjZO    cli-app            cli-app            kots
   ```  

## Get the Application Slug {#slug}

Each application has a slug, which is used for interacting with the application using the Replicated CLI. The slug is automatically generated based on the application name and cannot be changed.

### Vendor Portal 

To get an application slug in the Vendor Portal:

1. Log in to the [Vendor Portal](https://vendor.replicated.com/) and go to **_Application Name_ > Settings**.

1. Under **Application Slug**, copy the slug.

   <img alt="Application slug" src="/images/application-settings.png" width="600px"/>

   [View a larger version of this image](/images/application-settings.png)

### Replicated CLI

To get an application slug with the Replicated CLI:

1. Install the Replicated CLI. See [Installing the Replicated CLI](/reference/replicated-cli-installing).

1. Run the following command:

   ```bash
   replicated app ls APP-NAME
   ```
   Replace `APP-NAME` with the name of the target application. Or, exclude `APP-NAME` to list all applications in the team.

   **Example:**

   ```bash
   replicated app ls cli-app
   ID                             NAME               SLUG               SCHEDULER
   1xy9t8G9CO0PRGzTwSwWFkMUjZO    cli-app            cli-app            kots
   ```

1. Copy the value in the `SLUG` field.

## Delete an Application

When you delete an application, you also delete all licenses and data associated with the application. You can also optionally delete all images associated with the application from the Replicated registry. Deleting an application cannot be undone.

### Vendor Portal 

To delete an application in the Vendor Portal:

1. Log in to the [Vendor Portal](https://vendor.replicated.com/) and go to **_Application Name_ > Settings**.

1. Under **Danger Zone**, click **Delete App**.

   <img alt="Setting page" src="/images/application-settings.png" width="600px"/>

   [View a larger version of this image](/images/application-settings.png)

1. In the **Are you sure you want to delete this app?** dialog, enter the application name. Optionally, enter your password if you want to delete all images associated with the application from the Replicated registry.

   <img alt="delete app dialog" src="/images/delete-app-dialog.png" width="400px"/>

   [View a larger version of this image](/images/delete-app-dialog.png)

1. Click **Delete app**.

### Replicated CLI

To delete an application with the Replicated CLI:

1. Install the Replicated CLI. See [Installing the Replicated CLI](/reference/replicated-cli-installing).

1. Run the following command:

    ```bash
    replicated app delete APP-NAME
    ```
    Replace `APP-NAME` with the name of the target application.

1. When prompted, type `yes` to confirm that you want to delete the application.

    **Example:**

    ```bash
    replicated app delete deletion-example
      • Fetching App ✓
    ID                NAME                SLUG                 SCHEDULER
    1xyAIzrmbvq...    deletion-example    deletion-example     kots
    Delete the above listed application? There is no undo: yes█
     • Deleting App ✓
    ```