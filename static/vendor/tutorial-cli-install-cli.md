# Step 1: Install the Replicated CLI

In this tutorial, you use the Replicated CLI to create and promote releases for a sample application with Replicated. The Replicated CLI is the CLI for the Replicated Vendor Portal.

This procedure describes how to create a Vendor Portal account, install the Replicated CLI on your local machine, and set up a `REPLICATED_API_TOKEN` environment variable for authentication.

To install the Replicated CLI:

1. Do one of the following to create an account in the Replicated Vendor Portal:
   * **Join an existing team**: If you have an existing Vendor Portal team, you can ask your team administrator to send you an invitation to join.
   * **Start a trial**: Alternatively, go to [vendor.replicated.com](https://vendor.replicated.com/) and click **Sign up** to create a 21-day trial account for completing this tutorial.

1. Run the following command to use [Homebrew](https://brew.sh) to install the CLI:

    ```
    brew install replicatedhq/replicated/cli
    ```

    For the latest Linux or macOS versions of the Replicated CLI, see the [replicatedhq/replicated](https://github.com/replicatedhq/replicated/releases) releases in GitHub.

1. Verify the installation:

      ```
      replicated version
      ```
      **Example output**:

      ```json
      {
            "version": "0.37.2",
            "git": "8664ac3",
            "buildTime": "2021-08-24T17:05:26Z",
            "go": {
               "version": "go1.14.15",
               "compiler": "gc",
               "os": "darwin",
               "arch": "amd64"
            }
      }
      ```
      If you run a Replicated CLI command, such as `replicated release ls`, you see the following error message about a missing API token:

      ```
      Error: set up APIs: Please provide your API token
      ```

1. Create an API token for the Replicated CLI:

   1. Log in to the Vendor Portal, and go to the [Account settings](https://vendor.replicated.com/account-settings) page.

   1. Under **User API Tokens**, click **Create user API token**. For Nickname, provide a name for the token. For Permissions, select **Read and Write**.

       For more information about User API tokens, see [User API Tokens](replicated-api-tokens#user-api-tokens) in _Generating API Tokens_.

   1. Click **Create Token**.

   1. Copy the string that appears in the dialog.

1. Export the string that you copied in the previous step to an environment variable named `REPLICATED_API_TOKEN`:

    ```bash
    export REPLICATED_API_TOKEN=YOUR_TOKEN
    ```
    Replace `YOUR_TOKEN` with the token string that you copied from the Vendor Portal in the previous step.

1. Verify the User API token:

    ```
    replicated release ls
    ```

    You see the following error message:

    ```
    Error: App not found:
    ```

## Next Step

Continue to [Step 2: Create an Application](tutorial-cli-create-app) to use the Replicated CLI to create an application.