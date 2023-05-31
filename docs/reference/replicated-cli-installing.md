# Installing the replicated CLI

Vendors can use the replicated CLI to manage their applications with Replicated programmatically, rather than using the Replicated vendor portal.

## Prerequisites

Complete the following prerequisites before installing and using the replicated CLI:

* Install [curl](https://curl.haxx.se/) (For running CLI directly on linux/mac)
* Install [docker](https://www.docker.com) (For running CLI through docker container)
* To use the replicated CLI, you must have a team and an application in the vendor portal. For more information, see [Creating a Vendor Account](/vendor/vendor-portal-creating-account). 

## Install the replicated CLI

To access the replicated CLI installation files, see the [replicatedhq/replicated repository](https://github.com/replicatedhq/replicated/releases) on GitHub.

There are three options for installing the replicated CLI: 

* Running the CLI directly on Mac
* Running the CLI directly on Linux
* Running the CLI through Docker (Useful for Windows, GitHub Actions, or computers without sufficient access).

### MacOS

To install the latest replicated CLI on Mac with Brew:

```shell
brew install replicatedhq/replicated/cli
```

To install the latest replicated CLI on Mac without Brew:
```shell
curl -s https://api.github.com/repos/replicatedhq/replicated/releases/latest \
| grep "browser_download_url.*darwin_all.tar.gz" \
| cut -d : -f 2,3 \
| tr -d \" \
| wget -O replicated.tar.gz -qi -
tar xf replicated.tar.gz replicated && rm replicated.tar.gz
mv replicated /usr/local/bin/replicated
```

### Linux

To install latest replicated CLI on Linux:

```shell
curl -s https://api.github.com/repos/replicatedhq/replicated/releases/latest \
| grep "browser_download_url.*linux_amd64.tar.gz" \
| cut -d : -f 2,3 \
| tr -d \" \
| wget -O replicated.tar.gz -qi -
tar xf replicated.tar.gz replicated && rm replicated.tar.gz
mv replicated /usr/local/bin/replicated
```

### Docker / Windows

To run latest replicated CLI through a docker container:

```shell
docker run \
  -e REPLICATED_APP=$REPLICATED_APP \
  -e REPLICATED_API_TOKEN=$REPLICATED_API_TOKEN \
  replicated/vendor-cli --help
```

or on Windows:

```dos
docker.exe run \
  -e REPLICATED_APP=%REPLICATED_APP% \
  -e REPLICATED_API_TOKEN=%REPLICATED_API_TOKEN% \
  replicated/vendor-cli --help
```

For simplicity, we will represent usage assuming the CLI has been downloaded and installed to the desktop.

## Set Environment Variables

You must set up two environment variables to interact with the vendor portal through the replicated CLI: `REPLICATED_APP` and `REPLICATED_API_TOKEN`:

  * `REPLICATED_APP` must be set to the name of your application, as shown in the URL path at https://vendor.replicated.com/apps. _Note that the app name is **case sensitive**_.
  ![Vendor Application Slug](/images/vendor-app-slug.png)

  * `REPLICATED_API_TOKEN` must be set to a service account token created at [https://vendor.replicated.com/team/serviceaccounts](https://vendor.replicated.com/team/serviceaccounts), or a user token created in the vendor portal. To create a user token, go to [https://vendor.replicated.com/account-settings](https://vendor.replicated.com/account-settings).
  :::note
  The token must have `Read/Write` access to create new releases.
  :::
  ![Vendor Service Account Token](/images/vendor-service-account-token.png)

To set the environment variables in Linux or Mac environments:

```bash
export REPLICATED_APP=my_kots_app
export REPLICATED_API_TOKEN=d5cdf814bae01b211a8e891593dc12e1158238d27932d082a32b98706e576216
```