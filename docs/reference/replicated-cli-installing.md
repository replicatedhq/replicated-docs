import EnvVariablesReplace from "../partials/replicated-cli/_env-variables-replace.mdx"
import InstallFiles from "../partials/replicated-cli/_install-files.mdx"
import PrereqToken from "../partials/vendor-api/_prereq-token.mdx"
import Verify from "../partials/replicated-cli/_verify-install.mdx"
import Sudo from "../partials/replicated-cli/_sudo-install.mdx"

# Installing the replicated CLI

Vendors can use the replicated CLI to manage their applications with Replicated programmatically, rather than using the Replicated vendor portal.

## Prerequisites

Complete the following prerequisites before installing the replicated CLI:

- To run on Linux or Mac, install [curl](https://curl.haxx.se/).
- To run through a Docker container, install [docker](https://www.docker.com).

## Install the replicated CLI

There are three options for installing the replicated CLI: 

* Directly on MacOS
* Directly on Linux
* Through Docker (Useful for Windows, GitHub Actions, or computers without sufficient access)

### MacOS

To install the latest replicated CLI on Mac:

1. <InstallFiles/>

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

### Linux

To install latest replicated CLI on Linux:

1. <InstallFiles/>

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

### Docker / Windows

To run the latest replicated CLI in docker or Windows environments:

1. <InstallFiles/>

  Download and install the files.

1. Run one of the following commands:

    - Through a docker container:

      ```shell
      docker run \
        -e REPLICATED_APP=$APP_NAME \
        -e REPLICATED_API_TOKEN=$TOKEN \
        replicated/vendor-cli --help
      ```

    - On Windows:

      ```dos
      docker.exe run \
        -e REPLICATED_APP=%APP_NAME% \
        -e REPLICATED_API_TOKEN=%TOKEN% \
        replicated/vendor-cli --help
      ```

## Authenticate with an Application Slug and API Token {#auth}

To authenticate and begin using the replicated CLI, you need to provide an API token and the application slug.

To authenticate with the replicated CLI:

1. <PrereqToken/>

1. In the [vendor portal](https://vendor.replicated.com), go to the **Application Settings** page and copy the slug for the target application. See [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Application_.

1. Do _one_ of the following to authenticate with the replicated CLI:

   * Authenticate with the `replicated login` command:

     1. Run the following command:

      ```
      replicated login --app APP_SLUG --token TOKEN
      ```

      <EnvVariablesReplace/>

      1. In the browser window that opens, select **Authorize**.

         <img width="350" alt="Authorize replicated cli web page" src="/images/authorize-repl-cli.png"/>

         [View a larger version of this image](/images/authorize-repl-cli.png)

   * Alternatively, authenticate by setting the following environment variables:

      ```bash
      export REPLICATED_APP=APP_SLUG
      export REPLICATED_API_TOKEN=TOKEN
      ```

      <EnvVariablesReplace/>