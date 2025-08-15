# Step 1: Create an Application

To start, install the Replicated CLI and create an application. 

An _application_ is an object that has its own customers, channels, releases, license fields, and more. A single team can have more than one application. It is common for teams to have multiple applications for the purpose of onboarding, testing, and iterating.

To create an application:

1. On your local machine, install the Replicated CLI:

* **Mac**

   ```bash
   brew install replicatedhq/replicated/cli
   ```
* **Linux / Windows Subsystem for Linux (WSL)**

   ```bash
   version=$(curl -s https://api.github.com/repos/replicatedhq/replicated/releases/latest \
      | grep -m1 -Po '"tag_name":\s*"v\K[^"]+')
   curl -Ls \
      "https://github.com/replicatedhq/replicated/releases/download/v${version}/replicated_${version}_linux_amd64.tar.gz" \
      -o replicated.tar.gz
   tar xf replicated.tar.gz replicated && rm replicated.tar.gz
   mv replicated /usr/local/bin/replicated
   ``` 
For more information and additional installation options, see [Install the Replicated CLI](/reference/replicated-cli-installing).

1. Authorize the Replicated CLI:

    ```bash
    replicated login
    ```
    In the browser window that opens, complete the prompts to log in to your Vendor Portal account and authorize the CLI.

1. Create an application named `SlackerNews`:

    ```bash
    replicated app create SlackerNews
    ```

1. Set the `REPLICATED_APP` environment variable to the application that you created:

    ```bash
    export REPLICATED_APP=APP_SLUG
    ```
    Where `APP_SLUG` is the unique application slug provided in the output of the `app create` command.

    This allows you to interact with the application using the Replicated CLI without needing to use the `--app` flag with every command.

    :::note
    The application _slug_ is a unique string that is generated based on the application name. You can use the application slug to interact with the application through the Replicated CLI and the Vendor API v3. The application name and slug are often different from one another because it is possible to create more than one application with the same name.
    :::

Next, add the SlackerNews chart archive to a release in the Vendor Portal.

A _release_ represents a single version of your application and contains your application files. Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available.

## Next Step

Create a customer with the KOTS entitlement so that you can install the release in your cluster using Replicated KOTS. See [Step 5: Create a KOTS-Enabled Customer](tutorial-kots-helm-create-customer).

## Related Topics

* [Create an Application](/vendor/vendor-portal-manage-app#create-an-application)
* [Installing the Replicated CLI](/reference/replicated-cli-installing)
* [replicated app create](/reference/replicated-cli-app-create)