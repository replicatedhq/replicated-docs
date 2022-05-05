# Pushing Updates to a GitOps Workflow

The Replicated admin console default workflow is configured to receive updates, show the changes, and deploy the updates to the cluster. You can enable a GitOps workflow instead. When using a GitOps workflow, changes from the admin console (configuration changes, upstream updates, license updates) are pushed to a private Git repository, where an existing CI/CD process can execute the delivery of manifests to the cluster.

If you have more than one applicaiton installed, you can selectively enable a Gitops workflow for each application.

To push updates to a GitOps workflow:

1. Click the GitOps tab at the top of the admin console, and click **Get started**.

1. If you have a single application installed, choose the Git provider and hostname (if applicable) on the GitOps Provider page, and click **Continue to deployment action**. Then proceeed to step 4.

1. If you have multiple applications installed:

    1. Choose the Git provider and hostname (if applicable), and click **Finish GitOps setup**.

      A list of your applications displays and shows the status of GitOps integration for each application.

    1. Click **Enable** next to the application that you want to enable GitOps for.

      ![GitOps Provider](/images/gitops-apps.png)

1. On the GitOps settings page:

    1. Enter the repository details, and optionally the branch and path to commit to in the repository.

      The path must be a folder in your repository, not on your local machine. Note the following:

        - If it is a new repository and no files or folders are committed, you must commit one file by any name with simple content (such as "hello, world") so that the connection attempt succeeds with the deployment key in a later step.
        - If a folder for the application does not already exist in the repository, the Replicated app manager creates a folder for you. However, the best practice is to manually create a folder in the repository with the application name dedicated for the deployment file only.

    1. Select the action to take when there is an update. The admin console can create a new commit to the specified branch.

    1. For **What content will it contain**, select what type of asset to deliver to the Git repository. Using the **Rendered YAML** option results in a single, multi-document YAML file being committed to the repository.

      ![GitOps Action](/images/gitops-action.png)

    1. Click **Update Settings**.

      The Gitops subtab opens and displays a public deployment key. The private key is stored securely in the admin console.

1. Click **Copy key > repo settings page** to add the public deployment key to the repository.

  ![GitOps Deployment Key](/images/gitops-deployment-key.png)

1. Click **Try again** to verify that the admin console can connect.

    When the admin console establishes a connection to the repository, the main Gitops tab shows that GitOps is enabled for the application.

    ![GitOps Connection](/images/gitops-connected.png)

## First Commits

After converting to GitOps, the admin console makes your first commit/pull request with the current version that is deployed.
Subsequently, the admin console makes separate commits (or a single pull request) with any pending updates that have not been deployed from the admin console.
