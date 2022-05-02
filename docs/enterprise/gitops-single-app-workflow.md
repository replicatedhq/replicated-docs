# Pushing Updates to a GitOps Workflow in Single-app Mode

While the Replicated admin console is initially configured to receive updates, show the changes, and deploy the updates to the cluster, this process can be changed and converted to use a GitOps workflow instead.
When using a GitOps workflow, changes from the admin console (configuration changes, upstream updates, license updates) are pushed to a private Git repository, where an existing CI/CD process can execute to deliver the manifests to the cluster.

To begin migrating to a GitOps deployment workflow:

1. Click the GitOps link at the top of the admin console, then click on **Get started**.

1. Choose the Git provider and hostname (if applicable) on the GitOps Provider page, and click on **Continue to deployment action**.

1. On the GitOps setting page:

    1. Enter the repository details, and optionally the branch and path to commit to in the repository.

      The path must be a folder in your repository, not on your local machine. Note the following:
        - The best practice is to have a folder in the repository with the application name that will contain only the deployment file.
        - If a folder does not already exist in the repository, the Replicated app manager creates a folder for you.
        - If it is a new repository and there is not yet a file or folder committed, then the connection sends an error message. You must commit one simple file by any name with dummy content for the connection to be made.

    1. Select the action to take when there is an update. The admin console can create a new commit to the specified branch.

    1. For **What content will it contain**, you can choose what type of asset to deliver to the git repository. Selecting **Rendered YAML** results in a single, multi-doc YAML file being committed to the repository.

    ![GitOps Action](/images/gitops-action.png)

1. When GitOps is set up, a new **GitOps** tab is available on the application. This tab contains a public deploy key. The private key is stored securely in the admin console. Add the deploy key to the repository, and verify that the admin console can connect by clicking **Try again**.

    When the admin console establishes a connection to the repository, the following screen is displayed.

    ![GitOps Connection](/images/gitops-connected.png)

## First Commits

After converting to GitOps, the admin console makes your first commit/pull request with the current version that is deployed.
Then, it will make separate commits (or a single pull request) with any pending updates that have not been deployed from the admin console.
