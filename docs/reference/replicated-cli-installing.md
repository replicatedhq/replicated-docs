import Verify from "../partials/replicated-cli/_verify-install.mdx"
import Sudo from "../partials/replicated-cli/_sudo-install.mdx"
import Login from "../partials/replicated-cli/_login.mdx"
import Logout from "../partials/replicated-cli/_logout.mdx"
import AuthToken from "../partials/replicated-cli/_authorize-with-token-note.mdx"

# Installing the replicated CLI

Vendors can use the replicated CLI to manage their applications with Replicated programmatically, rather than using the Replicated vendor portal.

## Prerequisites

Complete the following prerequisites before installing the replicated CLI:

- Create a vendor account. See [Creating a Vendor Account](/vendor/vendor-portal-creating-account).
- To run on Linux or Mac, install [curl](https://curl.haxx.se/).
- To run through a Docker container, install [docker](https://www.docker.com).

## Install and Run

You can install and run the replicated CLI in the following environments: 

* Directly on MacOS
* Directly on Linux
* Through Docker (Useful for Windows, GitHub Actions, or computers without sufficient access)

### MacOS

To install and run the latest replicated CLI on MacOS:

1. Run one of the following commands:

    - With Brew:

      ```shell
      brew install replicatedhq/replicated/cli
      ```

    - Without Brew:

      ```shell
      curl -s https://api.github.com/repos/replicatedhq/replicated/releases/latest \
      | grep "browser_download_url.*darwin_all.tar.gz" \
      | cut -d : -f 2,3 \
      | tr -d \" \
      | wget -O replicated.tar.gz -qi -
      tar xf replicated.tar.gz replicated && rm replicated.tar.gz
      mv replicated /usr/local/bin/replicated
      ```

      <Sudo/>

1. <Verify/> 

1. <Login/>

   <AuthToken/>

1. <Logout/>

### Linux

To install and run the latest replicated CLI on Linux:

1. Run the following command:

  ```shell
  curl -s https://api.github.com/repos/replicatedhq/replicated/releases/latest \
  | grep "browser_download_url.*linux_amd64.tar.gz" \
  | cut -d : -f 2,3 \
  | tr -d \" \
  | wget -O replicated.tar.gz -qi -
  tar xf replicated.tar.gz replicated && rm replicated.tar.gz
  mv replicated /usr/local/bin/replicated
  ```

  <Sudo/>

1. <Verify/>

1. <Login/>

   <AuthToken/>

1. <Logout/>

### Docker / Windows

Installing in Docker environments requires that you set the `REPLICATED_API_TOKEN` environment variable to authorize the replicated CLI with an API token. For more information, see [(Optional) Set Environment Variables](#env-var) below.

To install and run the latest replicated CLI in Docker environments:

1. Generate a service account or user API token in the vendor portal. To create new releases, the token must have `Read/Write` access. See [Generating API Tokens](/vendor/replicated-api-tokens).

1. Get the latest replicated CLI installation files from the [replicatedhq/replicated repository](https://github.com/replicatedhq/replicated/releases) on GitHub.

  Download and install the files. For simplicity, the usage in the next step is represented assuming that the CLI is downloaded and installed to the desktop.

1. Authorize the replicated CLI:

   - Through a Docker container:

    ```shell
    docker run \
      -e REPLICATED_API_TOKEN=$TOKEN \
      replicated/vendor-cli --help
    ```
    Replace `TOKEN` with your API token.

   - On Windows:

    ```dos
    docker.exe run \
      -e REPLICATED_API_TOKEN=%TOKEN% \
      replicated/vendor-cli --help
    ```

    Replace `TOKEN` with your API token.

  For more information about the `docker run` command, see [docker run](https://docs.docker.com/engine/reference/commandline/run/) in the Docker documentation.  

## (Optional) Set Environment Variables {#env-var}

The replicated CLI supports setting the following environment variables:

* **`REPLICATED_API_TOKEN`**: A service account or user API token generated from a vendor portal team or individual account. The `REPLICATED_API_TOKEN` environment variable has the following use cases:

  * To use replicated CLI commands as part of automation (such as from continuous integration and continuous delivery pipelines), authenticate by providing the `REPLICATED_API_TOKEN` environment variable.

  * To authorize the replicated CLI when installing and running the CLI in Docker containers.
  
  * Optionally set the `REPLICATED_API_TOKEN` environment variable instead of using the `replicated login` command to authorize the replicated CLI in MacOS or Linux environments.

* **`REPLICATED_APP`**: The slug of the target application.

  When using the replicated CLI to manage applications through your vendor account (including channels, releases, customers, or other objects associated with an application), you can set the `REPLICATED_APP` environment variable to avoid passing the application slug with each command.

### `REPLICATED_API_TOKEN`

To set the `REPLICATED_API_TOKEN` environment variable:

1. Generate a service account or user API token in the vendor portal. To create new releases, the token must have `Read/Write` access. See [Generating API Tokens](/vendor/replicated-api-tokens).

1. Set the environment variable, replacing `TOKEN` with the token you generated in the previous step:

    * **MacOs or Linux**:

     ```
     export REPLICATED_API_TOKEN=TOKEN
     ```

    * **Docker**:

     ```
     docker run \
      -e REPLICATED_API_TOKEN=$TOKEN \
      replicated/vendor-cli --help
     ```

    * **Windows**:

      ```
      docker.exe run \
        -e REPLICATED_API_TOKEN=%TOKEN% \
        replicated/vendor-cli --help
      ```

### `REPLICATED_APP`

To set the `REPLICATED_APP` environment variable:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Application Settings** page and copy the slug for the target application. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Application_.

1. Set the environment variable, replacing `APP_SLUG` with the slug for the target application that you retreived in the previous step:

    * **MacOs or Linux**:

     ```
     export REPLICATED_APP=APP_NAME
     ```

    * **Docker**:

     ```
     docker run \
        -e REPLICATED_APP=$APP_NAME
        replicated/vendor-cli --help
     ```

    * **Windows**:

      ```
      docker.exe run \
        -e REPLICATED_APP=%APP_NAME% \
        replicated/vendor-cli --help
      ```