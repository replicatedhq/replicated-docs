# General System Requirements

This topic describes the general system requirements for installing applications with the Replicated app manager.

There are additional requirements specific to installing an application on an existing cluster and installing an application on a cluster created by the Kubernetes installer.

For more information about requirements for existing clusters, see [Cluster requirements](installing-existing-cluster-requirements).

For more information about requirements for the Kubernetes installer, see [Kubernetes installer requirements](installing-embedded-cluster-requirements).

**Note**: This topic does not include any requirements specific to your software vendor. Ensure that you meet any additional requirements for the application defined by your software vendor.

## Supported Browsers

This section describes the browser requirements for the latest Replicated admin console.

| Browser              | Support     |
|----------------------|-------------|
| Chrome               | 66+         |
| Firefox              | 58+         |
| Opera                | 53+         |
| Edge                 | 80+         |
| Safari (Mac OS only) | 13+         |
| Internet Explorer    | Unsupported |

## Kubernetes Version Compatibility

Each release of the open source KOTS project maintains compatibility with the current Kubernetes version, and the two most recent versions at the time of its release.

**Note**: The app manager is based on the open source KOTS project. The app manager version is the same as the KOTS version. For example, KOTS v1.48 is the same as the app manager v1.48.

This includes support against all patch releases of the corresponding Kubernetes version.

| KOTS versions   | Kubernetes compatibility |
|-----------------|---------------------------|
| v1.11 to v1.14  | v1.17, v1.16, and v1.15   |
| v1.15 to v1.19  | v1.18, v1.17, and v1.16   |
| v1.20 to v1.35  | v1.19, v1.18, and v1.17   |
| v1.36 to v1.47  | v1.20, v1.19, and v1.18   |
| v1.48 to v1.59.2 | v1.21, v1.20, and v1.19   |
| v1.59.3 to v1.60 | v1.22, v1.21, and v1.20   |
| v1.61 to v1.65 | v1.23, v1.22, v1.21, and v1.20|
| v1.66 to v1.70 | v1.23, v1.22, and v1.21   |
| v1.71 and later | v1.24, v1.23, v1.22, and v1.21   |

## Firewall Openings for Online Installations

The following domains need to be accessible from servers performing online installations.
For a list of IP addresses for these services, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/master/ip_addresses.json) in GitHub.

| Host                 | Existing Cluster Installation | Embedded Cluster Installation | Description                                                                                                                                                                                                                                                                                                                                                |
|----------------------|-------------------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Docker Hub           | Required                      | Required                      | Some dependencies of KOTS are hosted as public images in Docker Hub.                                                                                                                                                                                                                                                                                       |
| proxy.replicated.com | Required                      | Required                      | Upstream Docker images are proxied via proxy.replicated.com. The on-prem docker client uses a license ID to authenticate to proxy.replicated.com. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.                                                                                                                       |
| replicated.app       | Required                      | Required                      | Upstream application YAML and metadata is pulled from replicated.app. The current running version of the application (if any) will be sent, in addition to a license ID and an application IDs are sent to replicated.app to authenticate and receive these YAML files. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA. |
| k8s.kurl.sh          | Not Required                  | Required                      | Kubernetes cluster installation scripts and artifacts are served from [kurl.sh](https://kurl.sh). An application identifier is sent in a URL path, and bash scripts and binary executables are served from kurl.sh. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.                                                     |
| amazonaws.com        | Not Required                  | Required                      | tar.gz packages are downloaded from Amazon S3 during embedded cluster installations. For information about dynamically scraping the IP ranges to allowlist for accessing these packages, see [AWS IP address ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html#aws-ip-download) in the AWS documentation.                                                         |

No outbound internet access is required for airgapped installations.
