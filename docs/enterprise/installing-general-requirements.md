# General system requirements

This page describes the system requirements for executing and installing KOTS applications.
The requirements for command-line-interfaces (such as the [Vendor CLI](/vendor/cli/getting-started) and the [KOTS CLI](/kots-cli/getting-started)) are described separately, and are not subject to these requirements.

## Supported Browsers

This section describes the browser requirements for the latest KOTS Admin Console

| Browser              | Support     |
|----------------------|-------------|
| Chrome               | 66+         |
| Firefox              | 58+         |
| Opera                | 53+         |
| Edge                 | 80+         |
| Safari (Mac OS only) | 13+         |
| Internet Explorer    | Unsupported |

## Kubernetes Version Compatibility

Each release of KOTS maintains compatability with the current Kubernetes version, and the 2 most recent versions at the time of its release.
This includes support against all patch releases of the corrersponding Kubernetes version.

| KOTS Version(s) | Kubernetes Compatibility |
|-----------------|--------------------------|
| 1.11 to 1.14    | 1.17, 1.16, and 1.15     |
| 1.15 to 1.19    | 1.18, 1.17, and 1.16     |
| 1.20 to 1.35    | 1.19, 1.18, and 1.17     |
| 1.36 to 1.47    | 1.20, 1.19, and 1.18     |
| 1.48+           | 1.21, 1.20, and 1.19     |

## Firewall Openings for Online Installations

The following domains need to be accessible from servers performing online KOTS installs.
IP addresses for these services can be found in [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/master/ip_addresses.json).

| Host                 | Existing Cluster Installation | Embedded Cluster Installation | Description                                                                                                                                                                                                                                                                                                                                                |
|----------------------|-------------------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Docker Hub           | Required                      | Required                      | Some dependencies of KOTS are hosted as public images in Docker Hub.                                                                                                                                                                                                                                                                                       |
| proxy.replicated.com | Required                      | Required                      | Upstream Docker images are proxied via proxy.replicated.com. The on-prem docker client uses a license ID to authenticate to proxy.replicated.com. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.                                                                                                                       |
| replicated.app       | Required                      | Required                      | Upstream application YAML and metadata is pulled from replicated.app. The current running version of the application (if any) will be sent, in addition to a license ID and an application IDs are sent to replicated.app to authenticate and receive these YAML files. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA. |
| k8s.kurl.sh          | Not Required                  | Required                      | Kubernetes cluster installation scripts and artifacts are served from [kurl.sh](https://kurl.sh). An application identifier is sent in a URL path, and bash scripts and binary executables are served from kurl.sh. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.                                                     |
| amazonaws.com        | Not Required                  | Required                      | tar.gz packages are downloaded from Amazon S3 during embedded cluster installations. The IP ranges to allowlist for accessing these can be scraped dynamically from the [AWS IP Address](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html#aws-ip-download) Ranges documentation.                                                           |

No outbound internet access is required for airgapped installations.
