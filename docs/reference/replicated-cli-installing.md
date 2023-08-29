import EnvVariablesSet from "../partials/replicated-cli/_env-variables-set.mdx"
import EnvVariablesReplace from "../partials/replicated-cli/_env-variables-replace.mdx"
import InstallFiles from "../partials/replicated-cli/_install-files.mdx"
import PrereqToken from "../partials/vendor-api/_prereq-token.mdx"

# Installing the replicated CLI

Vendors can use the replicated CLI to manage their applications with Replicated programmatically, rather than using the Replicated vendor portal.

## Prerequisites

Complete the following prerequisites before installing the replicated CLI:

- To run on Linux or Mac, install [curl](https://curl.haxx.se/).

- To run through a Docker container, install [docker](https://www.docker.com).

- Get your application slug from the **Application Settings** page in the vendor portal. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

- <PrereqToken/>

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

1. <EnvVariablesSet/>

   <EnvVariablesReplace/>

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

1. <EnvVariablesSet/>

   <EnvVariablesReplace/>

### Docker / Windows

For simplicity, the usage is represented assuming that the CLI is downloaded and installed to the desktop.

To run the latest replicated CLI:

1. <InstallFiles/>

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

  <EnvVariablesReplace/>