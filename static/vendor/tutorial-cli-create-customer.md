# Step 5: Create a Customer

After promoting the first release for the `cli-tutorial` application, create a customer so that you can install the application.

A _customer_ is an object in the Vendor Portal that represents a single licensed user of your application. When you create a customer, you define entitlement information for the user, and the Vendor Portal generates a YAML license file for the customer that you can download.

When you install the application later in this tutorial, you will upload the license file that you create in this step to allow KOTS to create the application containers.

To create a customer and download the license file:

1. From the `replicated-cli-tutorial` directory, create a license for a customer named `Some-Big-Bank` that is assigned to the Unstable channel and expires in 10 days:

    ```
    replicated customer create \
      --name "Some-Big-Bank" \
      --expires-in "240h" \
      --channel "Unstable"
    ```
   The Unstable channel is the channel where you promoted the release in [Step 4: Create a Release](tutorial-cli-create-release). Assigning the customer to a channel allows them to install the releases that are promoted to that channel.

   **Example output:**

    ```
    ID                             NAME             CHANNELS     EXPIRES                          TYPE
    2GuB3VYLjU5t9vNDK6byjgiTKUs    Some-Big-Bank    Unstable     2022-11-10 14:59:49 +0000 UTC    dev
    ```

1. Verify the customer creation details:

    ```
    replicated customer ls
    ```

    **Example output:**

    ```
    ID                             NAME             CHANNELS     EXPIRES                          TYPE
    2GuB3VYLjU5t9vNDK6byjgiTKUs    Some-Big-Bank    Unstable     2022-11-10 14:59:49 +0000 UTC    dev
    ```

1. Download the license file for the customer that you just created:

    ```
    replicated customer download-license \
      --customer "Some-Big-Bank"
    ```

    The license downloads to `stdout`.

    **Example output**:

    ```
    apiVersion: kots.io/v1beta1
    kind: License
    metadata:
      name: some-big-bank
    spec:
      appSlug: cli-tutorial
      channelID: 2GmYFUFzj8JOSLYw0jAKKJKFua8
      channelName: Unstable
      customerName: Some-Big-Bank
      endpoint: https://replicated.app
      entitlements:
        expires_at:
          description: License Expiration
          title: Expiration
          value: "2022-11-10T14:59:49Z"
          valueType: String
      isNewKotsUiEnabled: true
      licenseID: 2GuB3ZLQsU38F5SX3n03x8qBzeL
      licenseSequence: 1
      licenseType: dev
      signature: eyJsaW...
    ```

1. Rename the license file and save it to your Desktop folder:

    ```
    export LICENSE_FILE=~/Desktop/Some-Big-Bank-${REPLICATED_APP}-license.yaml
    replicated customer download-license --customer "Some-Big-Bank" > "${LICENSE_FILE}"
    ```

1. Verify that the license was written properly using either `cat` or `head`:

    ```
    head ${LICENSE_FILE}
    ```

    **Example output**:

    ```
    apiVersion: kots.io/v1beta1
    kind: License
    metadata:
      name: some-big-bank
    spec:
      appSlug: cli-tutorial
      channelID: 2GmYFUFzj8JOSLYw0jAKKJKFua8
      channelName: Unstable
      customerName: Some-Big-Bank
      endpoint: https://replicated.app
    ```

## Next Step

Continue to [Step 6: Install KOTS and the Application](tutorial-cli-install-app-manager) to get the installation commands from the Unstable channel, then install the KOTS components and the sample application in your cluster.