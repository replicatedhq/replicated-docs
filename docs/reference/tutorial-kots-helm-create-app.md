# Step 2: Create an Application

Next, install the Replicated CLI and then create an application.

An _application_ is an object that has its own customers, channels, releases, license fields, and more. A single team can have more than one application. It is common for teams to have multiple applications for the purpose of onboarding, testing, and iterating.

To create an application:

1. Install the Replicated CLI:

   ```
   brew install replicatedhq/replicated/cli
   ```
   For more installation options, see [Installing the Replicated CLI](/reference/replicated-cli-installing).

1. Authorize the Replicated CLI:

   ```
   replicated login
   ```
   In the browser window that opens, complete the prompts to log in to your vendor account and authorize the CLI.

1. Create an application named `Gitea`:

   ```
   replicated app create Gitea
   ```

1. Set the `REPLICATED_APP` environment variable to the application that you created. This allows you to interact with the application using the Replicated CLI without needing to use the `--app` flag with every command:

   1. Get the slug for the application that you created:

      ```
      replicated app ls
      ```
      **Example output**:
      ```
      ID                             NAME            SLUG            SCHEDULER
      2WthxUIfGT13RlrsUx9HR7So8bR    Gitea           gitea-boxer     kots
      ```
      In the example above, the application slug is `gitea-boxer`.

      :::note
      The application _slug_ is a unique string that is generated based on the application name. You can use the application slug to interact with the application through the Replicated CLI and the Vendor API v3. The application name and slug are often different from one another because it is possible to create more than one application with the same name.
      :::

   1. Set the `REPLICATED_APP` environment variable to the application slug.

      **Example:**

      ```
      export REPLICATED_APP=gitea-boxer
      ```

## Next Step

Add the Replicated SDK to the Helm chart and package the chart to an archive. See [Step 3: Package the Helm Chart](tutorial-kots-helm-package-chart).

## Related Topics

* [Create an Application](/vendor/vendor-portal-manage-app#create-an-application)
* [Installing the Replicated CLI](/reference/replicated-cli-installing)
* [replicated app create](/reference/replicated-cli-app-create)