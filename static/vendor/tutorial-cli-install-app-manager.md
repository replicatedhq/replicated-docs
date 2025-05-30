# Step 6: Install KOTS and the Application

The next step is to test the installation process for the application release that you promoted. Using the KOTS CLI, you will install KOTS and the sample application in your cluster.

KOTS is the Replicated component that allows your users to install, manage, and upgrade your application. Users can interact with KOTS through the Admin Console or through the KOTS CLI.

To install KOTS and the application:

1. From the `replicated-cli-tutorial` directory, run the following command to get the installation commands for the Unstable channel, where you promoted the release for the `cli-tutorial` application:

    ```
    replicated channel inspect Unstable
    ```

    **Example output:**

    ```
    ID:             2GmYFUFzj8JOSLYw0jAKKJKFua8
    NAME:           Unstable
    DESCRIPTION:
    RELEASE:        1
    VERSION:        Unstable-d4173a4
    EXISTING:

        curl -fsSL https://kots.io/install | bash
        kubectl kots install cli-tutorial/unstable

    EMBEDDED:

        curl -fsSL https://k8s.kurl.sh/cli-tutorial-unstable | sudo bash

    AIRGAP:

        curl -fSL -o cli-tutorial-unstable.tar.gz https://k8s.kurl.sh/bundle/cli-tutorial-unstable.tar.gz
        # ... scp or sneakernet cli-tutorial-unstable.tar.gz to airgapped machine, then
        tar xvf cli-tutorial-unstable.tar.gz
        sudo bash ./install.sh airgap
    ```
    This command prints information about the channel, including the commands for installing in:
    * An existing cluster
    * An _embedded cluster_ created by Replicated kURL
    * An air gap cluster that is not connected to the internet

1. If you have not already, configure kubectl access to the cluster you provisioned as part of [Set Up the Environment](tutorial-cli-setup#set-up-the-environment). For more information about setting the context for kubectl, see [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/) in the Kubernetes documentation.

1. Run the `EXISTING` installation script with the following flags to automatically upload the license file and run the preflight checks at the same time you run the installation.

    **Example:**

    ```
    curl -fsSL https://kots.io/install | bash
    kubectl kots install cli-tutorial/unstable \
    --license-file ./LICENSE_YAML \
    --shared-password PASSWORD \
    --namespace NAMESPACE
    ```

    Replace:

      - `LICENSE_YAML` with the local path to your license file.
      - `PASSWORD` with a password to access the Admin Console.
      - `NAMESPACE` with the namespace where KOTS and application will be installed.

   When the Admin Console is ready, the script prints the `https://localhost:8800` URL where you can access the Admin Console and the `http://localhost:8888` URL where you can access the application.

   **Example output**:

   ```
    • Deploying Admin Console
      • Creating namespace ✓
      • Waiting for datastore to be ready ✓
    • Waiting for Admin Console to be ready ✓
    • Waiting for installation to complete ✓
    • Waiting for preflight checks to complete ✓

    • Press Ctrl+C to exit
    • Go to http://localhost:8800 to access the Admin Console

    • Go to http://localhost:8888 to access the application
   ```

1. Verify that the Pods are running for the example NGNIX service and for kotsadm:

    ```bash
    kubectl get pods --namespace NAMESPACE
    ```

    Replace `NAMESPACE` with the namespace where KOTS and application was installed.

    **Example output:**

    ```NAME                       READY   STATUS    RESTARTS   AGE
    kotsadm-7ccc8586b8-n7vf6   1/1     Running   0          12m
    kotsadm-minio-0            1/1     Running   0          17m
    kotsadm-rqlite-0           1/1     Running   0          17m
    nginx-688f4b5d44-8s5v7     1/1     Running   0          11m
    ```

## Next Step

Continue to [Step 7: Configure the Application](tutorial-cli-deploy-app) to log in to the Admin Console and make configuration changes.