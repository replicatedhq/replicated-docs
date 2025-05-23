# Step 2: Create an Application

After you install the Replicated CLI and create an API token, you can use the CLI to create a new application.

To create an application:

1. Run the following command to create an application named `cli-tutorial`:

    ```
    replicated app create cli-tutorial
    ```

    **Example output**:

    ```
    ID          NAME              SLUG            SCHEDULER
    2GmY...     cli-tutorial      cli-tutorial    kots
    ```

1. Export the application slug in the output of the `app create` command as an environment variable:

   ```
   export REPLICATED_APP=YOUR_SLUG
   ```
   Replace `YOUR_SLUG` with the slug for the application you created in the previous step.

1. Verify that both the `REPLICATED_API_TOKEN` environment variable that you created as part of [Step 1: Install the Replicated CLI](tutorial-cli-install-cli) and the `REPLICATED_APP` environment variable are set correctly:

   ```
   replicated release ls
   ```

   In the output of this command, you now see an empty list of releases for the application:

   ```
   SEQUENCE    CREATED    EDITED    ACTIVE_CHANNELS
   ```

## Next Step

Continue to [Step 3: Get the Sample Manifests](tutorial-cli-manifests) to download the manifest files for a sample Kubernetes application. You will use these manifest files to create the first release for the `cli-tutorial` application.