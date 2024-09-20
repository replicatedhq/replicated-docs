---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Embedded Cluster Release Notes

## 1.13.1

Released on September 20, 2024

<table>
  <tr>
    <th>Version</th>
    <td id="center">1.13.1+k8s-1.29</td>
    <td id="center">1.13.1+k8s-1.28</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.29.8</td>
    <td id="center">1.28.11</td>
  </tr>
  <tr>
    <th>KOTS Version</th>
    <td id="center" colspan="2">1.117.1</td>
  </tr>
</table>

### Bug Fixes {#bug-fixes-1-13-0}

* Fixes an issue where you could not upgrade to a version that had special characters like `+` in the version label.

## 1.13.0

Released on September 17, 2024

<table>
  <tr>
    <th>Version</th>
    <td id="center">1.13.0+k8s-1.29</td>
    <td id="center">1.13.0+k8s-1.28</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.29.8</td>
    <td id="center">1.28.11</td>
  </tr>
  <tr>
    <th>KOTS Version</th>
    <td id="center" colspan="2">1.117.0</td>
  </tr>
</table>

### New Features {#new-features-1-13-0}

* Adds the [`PrivateCACert` template function](/reference/template-functions-static-context#privatecacert) to return the name of a ConfigMap containing additional trusted CA certificates provided by the end user with the `--private-ca` flag for the `install` command.

### Bug Fixes {#bug-fixes-1-13-0}

* Fixes an issue where user-provided proxy configuration was removed during upgrades. This fix only applies to Embedded Clusters installed with this version or later. Users on older versions that upgrade to this version will still lose their proxy configuration.
* Fixes an issue where the disk performance preflight failed on certain architectures where fio was unable to run.

## 1.12.1

Released on September 13, 2024

<table>
  <tr>
    <th>Version</th>
    <td id="center">1.12.1+k8s-1.29</td>
    <td id="center">1.12.1+k8s-1.28</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.29.8</td>
    <td id="center">1.28.11</td>
  </tr>
  <tr>
    <th>KOTS Version</th>
    <td id="center" colspan="2">1.116.1</td>
  </tr>
</table>

### New Features {#new-features-1-12-1}

* Adds the ability to provide additional trusted certificate authority certificates with the `install` command's `--private-ca` flag. This is useful when Embedded Cluster is installed behind an enterprise proxy that intercepts traffic and issues its own certificates.

### Bug Fixes {#bug-fixes-1-12-1}

* Removes unnecessary values that were previously added to the no proxy list automatically.
* KOTS now uses the fully qualified `.svc.cluster.local` address when making requests to the `kotsadm-rqlite` service to simplify HTTP proxy configuration.

## 1.12.0

Released on September 11, 2024

<table>
  <tr>
    <th>Version</th>
    <td id="center">1.12.0+k8s-1.29</td>
    <td id="center">1.12.0+k8s-1.28</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.29.8</td>
    <td id="center">1.28.11</td>
  </tr>
  <tr>
    <th>KOTS Version</th>
    <td id="center" colspan="2">1.116.0</td>
  </tr>
</table>

### Improvements {#improvements-1-12-0}

* Available updates and the check for updates button are shown on the **Dashboard** page of the Admin Console. The check for updates button is now also shown on the **Version history** page. These were removed in a previous version.
* The **Nodes** page displays guidance and easier access to the node join command during initial install.
* When nodes need to be added to the cluster during a restore operation, the `join` command is more clearly shown in the Admin Console.
* Hides a banner on the **View Files** page that told users to use `kubectl kots` commands that are not intended for Embedded Cluster.
* KOTS now uses the fully qualified `.svc.cluster.local` address when making requests to the `kotsadm-rqlite` and `kotsadm-minio` services for simplified HTTP proxy configuration using `NO_PROXY=.cluster.local`.

### Bug Fixes {#bug-fixes-1-12-0}

* Fixes an issue where the values provided to the `--http-proxy`, `--https-proxy`, and `--no-proxy` flags for the kots install command were not propagated to the Replicated SDK.

## 1.11.1

Released on August 30, 2024

<table>
  <tr>
    <th>Version</th>
    <td id="center">1.11.1+k8s-1.29</td>
    <td id="center">1.11.1+k8s-1.28</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.29.7</td>
    <td id="center">1.28.11</td>
  </tr>
  <tr>
    <th>KOTS Version</th>
    <td id="center" colspan="2">1.114.0</td>
  </tr>
</table>

### Improvements {#improvements-1-11-1}

* Adds a host preflight check to ensure that disk performance is sufficient for etcd. Specifically, the P99 write latency must be less than 10 ms.

## 1.11.0

Released on August 23, 2024

<table>
  <tr>
    <th>Version</th>
    <td id="center">1.11.0+k8s-1.29</td>
    <td id="center">1.11.0+k8s-1.28</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.29.7</td>
    <td id="center">1.28.11</td>
  </tr>
  <tr>
    <th>KOTS Version</th>
    <td id="center" colspan="2">1.114.0</td>
  </tr>
</table>

### Improvements {#improvements-1-11-0}

* The default range available for NodePorts is now 80-32767 instead of 30000-32767. Many customers used [`unsupportedOverrides`](/reference/embedded-config#unsupportedoverrides) to configure this wider range for use with things like an ingress controller, so we have adjusted the default range accordingly. Changes to this range are not applied on upgrades, so existing installations will not be changed.
* Adds host preflight checks for connecting to replicated.app and proxy.replicated.com. If you use a custom domain for replicated.app, the custom domain will be used in the preflight check.
* Adds a host preflight check to ensure that neither `nameserver localhost` nor `nameserver 127.0.0.1` is present in `resolv.conf`.

### Bug Fixes {#bug-fixes-1-11-0}

* Fixes several issues that caused node resets to fail. Single-node clusters are no longer drained before being reset. Resets will no longer fail with the error `unable to get installation` if the installation failed early on. And node resets will now work if bind mounts are used for `/var/lib/embedded-cluster`, `/var/lib/k0s`, and `/var/openebs`.
* Fixes an issue where preflight checks for `modprobe`, `mount`, and `unmount` in `PATH` did not use absolute paths.
* Fixes an issue where restoring did not work with S3-compatible object stores other than AWS S3.

## 1.10.0

Released on August 13, 2024

<table>
  <tr>
    <th>Version</th>
    <td id="center">1.10.0+k8s-1.29</td>
    <td id="center">1.10.0+k8s-1.28</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.29.7</td>
    <td id="center">1.28.11</td>
  </tr>
  <tr>
    <th>KOTS Version</th>
    <td id="center" colspan="2">1.114.0</td>
  </tr>
</table>

### New Features {#new-features-1-10-0}

* Adds support for the `dropdown` config item type, which creates a dropdown on the config screen. See [`dropdown`](/reference/custom-resource-config#dropdown) in Config.
* Adds the `radio` config item type, which is functionally equivalent to the `select_one` item type but is more clearly named. The `select_one` config item type is deprecated in favor of `radio` but is still fully functional. See [`radio`](/reference/custom-resource-config#radio) in _Config_.

:::note
For release notes for Embedded Cluster versions earlier than 1.10.0, see the [Embedded Cluster GitHub releases page](https://github.com/replicatedhq/embedded-cluster/releases).
:::
