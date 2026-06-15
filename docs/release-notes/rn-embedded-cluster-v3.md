---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Embedded Cluster v3 release notes

This topic contains release notes for the [Replicated Embedded Cluster v3](/embedded-cluster/v3/embedded-overview) installer. The release notes list new features, improvements, bug fixes, known issues, and breaking changes.

Additionally, these release notes list the versions of Kubernetes that are available with each version of Embedded Cluster.

<!--RELEASE_NOTES_PLACEHOLDER-->

## 3.8.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.8.0-beta.1+k8s-1.35</td>
    <td id="center">3.8.0-beta.1+k8s-1.34</td>
    <td id="center">3.8.0-beta.1+k8s-1.33</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.35.4</td>
    <td id="center">1.34.7</td>
    <td id="center">1.33.11</td>
  </tr>
</table>

### New features {#new-features-3-8-0-beta-1}

* Adds support for Kubernetes 1.35 and removes support for Kubernetes 1.32. If you are using a version of Embedded Cluster with Kubernetes 1.32, upgrade your Embedded Cluster Config to 3.8.0-beta.1+k8s-1.33 before upgrading to 3.8.0-beta.1+k8s-1.34 or 3.8.0-beta.1+k8s-1.35. Kubernetes does not support upgrading by more than one minor version at a time.

### Improvements {#improvements-3-8-0-beta-1}

* Ties the app install and upgrade progress bar to per-chart status instead of a 5-minute wall-clock timer, so the bar reflects what the install is actually doing.

### Bug fixes {#bug-fixes-3-8-0-beta-1}

* Fixes an issue where resetting a node that had the persistent admin console installed left the `console-web` systemd unit behind, causing subsequent installs on that node to fail.

## 3.7.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.7.0-beta.1+k8s-1.34</td>
    <td id="center">3.7.0-beta.1+k8s-1.33</td>
    <td id="center">3.7.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-7-0-beta-1}

* Adds the ability to upload a generated support bundle directly to the Vendor Portal from the [persistent admin console](/embedded-cluster/v3/embedded-persistent-console), eliminating the need to download and share the bundle manually. For more information, see [Upload to the vendor portal](/embedded-cluster/v3/embedded-persistent-console#upload-to-the-vendor-portal-beta).

## 3.6.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.6.0-beta.1+k8s-1.34</td>
    <td id="center">3.6.0-beta.1+k8s-1.33</td>
    <td id="center">3.6.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-6-0-beta-1}

* Adds the ability to declare Kubernetes node taints on a custom role. Every node that carries the role receives the taints automatically at install or join time. For more information, see [roles](/embedded-cluster/v3/embedded-config#roles) in _Embedded Cluster Config_.

## 3.5.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.5.0-beta.1+k8s-1.34</td>
    <td id="center">3.5.0-beta.1+k8s-1.33</td>
    <td id="center">3.5.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-5-0-beta-1}

* Adds the ability to generate and download a support bundle from the [persistent admin console](/embedded-cluster/v3/embedded-persistent-console), without SSH access to the controller.

### Improvements {#improvements-3-5-0-beta-1}

* Reduces dashboard clutter when many releases are available: the **Available updates** panel now shows only the 3 most recent, with a **Show all** toggle for the rest.

### Bug fixes {#bug-fixes-3-5-0-beta-1}

* Fixes a gateway timeout that could occur when uploading large airgap releases through the persistent admin console.

## 3.4.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.4.0-beta.1+k8s-1.34</td>
    <td id="center">3.4.0-beta.1+k8s-1.33</td>
    <td id="center">3.4.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-4-0-beta-1}

* Adds air gap support to the [persistent admin console](/embedded-cluster/v3/embedded-persistent-console). Release archives can be uploaded directly through the dashboard and applied without SSH access to the controller. Uploads are resumable across browser sessions, and the currently-installed release can be re-uploaded to update its bundled license or restore a missing copy needed for redeploy.

### Improvements {#improvements-3-4-0-beta-1}

* Aligns the Replicated SDK's `dockerconfigjson` with the active registry mode. When a Bring Your Own (BYO) registry is configured, the secret now carries credentials keyed by the BYO registry host instead of the unused `proxy.replicated.com` and `registry.replicated.com` defaults.

### Bug fixes {#bug-fixes-3-4-0-beta-1}

* Forwards the host CA bundle ConfigMap and native proxy values to the Replicated SDK chart so the SDK can communicate with `replicated.app` through a MITM proxy. Previously only proxy environment variables were passed, causing TLS verification failures when the SDK contacted `replicated.app`.

## 3.3.2-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.3.2-beta.1+k8s-1.34</td>
    <td id="center">3.3.2-beta.1+k8s-1.33</td>
    <td id="center">3.3.2-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-3-2-beta-1}

* Adds support for changing the Bring Your Own (BYO) registry configuration on upgrade. The `upgrade` command now accepts the `--registry`, `--registry-username`, `--registry-password`, `--registry-ca-cert`, `--registry-tls-cert`, and `--registry-tls-key` flags. Flags use patch semantics: omit to keep the existing value, pass a new value to update, or pass an empty string (for example, `--registry=""`) to clear. Passing `--registry=""` reverts the cluster to the default registry mode.

### Bug fixes {#bug-fixes-3-3-2-beta-1}

* Updates the installer landing page login button text to match the operation mode: **Continue** for the persistent admin console and **Continue to Upgrade** for upgrades. Install mode is unchanged.

## 3.3.1-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.3.1-beta.1+k8s-1.34</td>
    <td id="center">3.3.1-beta.1+k8s-1.33</td>
    <td id="center">3.3.1-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### Bug fixes {#bug-fixes-3-3-1-beta-1}

* Fixes the persistent admin console landing page, which was incorrectly framed as the "Upgrade Wizard." When the console is enabled, the page now reads "Admin Console" with console-appropriate "What's Next" steps.
* Allows retrying an upgrade when the target version is itself listed as a required release and matches the currently-incomplete revision. The previous behavior incorrectly blocked the retry with a "must install X before X" error.
* Removes an invalid `journalctl` troubleshooting tip from the host-unreachable warning on the upgrade preparation screen. The tip was rendering the application's display name instead of its slug, producing an unusable command.

## 3.3.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.3.0-beta.1+k8s-1.34</td>
    <td id="center">3.3.0-beta.1+k8s-1.33</td>
    <td id="center">3.3.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-3-0-beta-1}

* Adds the [persistent admin console](/embedded-cluster/v3/embedded-persistent-console), an opt-in, always-on web UI for browser-driven upgrades and operations. Enable it by running `console install` on a controller after installation.

## 3.2.3-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.2.3-beta.1+k8s-1.34</td>
    <td id="center">3.2.3-beta.1+k8s-1.33</td>
    <td id="center">3.2.3-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### Bug fixes {#bug-fixes-3-2-3-beta-1}

* Fixes a failure in the `Lookup` template function when the kubeconfig has not yet been created on the node. `Lookup` now returns an empty map in that case instead of erroring.

## 3.2.2-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.2.2-beta.1+k8s-1.34</td>
    <td id="center">3.2.2-beta.1+k8s-1.33</td>
    <td id="center">3.2.2-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-2-2-beta-1}

* Adds support for the KOTS `Lookup` template function, which queries resources in the running cluster from templates.

### Improvements {#improvements-3-2-2-beta-1}

* Skips the airgap `images.tar` preload when a Bring Your Own (BYO) registry is configured.

## 3.2.1-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.2.1-beta.1+k8s-1.34</td>
    <td id="center">3.2.1-beta.1+k8s-1.33</td>
    <td id="center">3.2.1-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### Improvements {#improvements-3-2-1-beta-1}

* Pins the cluster TLS certificate's public key in the node-join `curl` command so the join bundle download cannot be intercepted by an attacker on the network path.

## 3.2.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.2.0-beta.1+k8s-1.34</td>
    <td id="center">3.2.0-beta.1+k8s-1.33</td>
    <td id="center">3.2.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-2-0-beta-1}

* Automates multi-node upgrades. All remote nodes are upgraded as part of a single cluster upgrade, removing the per-node CLI commands required in earlier versions. Clusters with any node older than 3.2.0-beta.1 fall back to the manual upgrade flow automatically.
* Adds TLS client certificate (mTLS) authentication for Bring Your Own (BYO) registries with the `--registry-tls-cert` and `--registry-tls-key` install flags.

## 3.1.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.1.0-beta.1+k8s-1.34</td>
    <td id="center">3.1.0-beta.1+k8s-1.33</td>
    <td id="center">3.1.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-1-0-beta-1}

* Adds support for vendor-defined custom node roles. Roles are declared in the EC config with associated labels, and one or more roles can be assigned to a node at install or join time. See [roles](/embedded-cluster/v3/embedded-config#roles) in _Embedded Cluster Config_.
* Adds an external HTTP API on port 30081 (configurable with `--api-port`) for headless installs, programmatic node joins, and cluster-state polling. See [External API](/embedded-cluster/v3/embedded-cluster-external-api).
* Adds Bring Your Own (BYO) registry support during install.
* Allows joining new nodes to the cluster during an upgrade.
* Adds nftables support for Linux kernel 6.17+.

### Improvements {#improvements-3-1-0-beta-1}

* Unifies runtime suppression of when-gated and readonly config items.
* Applies templating to status informers.

### Bug fixes {#bug-fixes-3-1-0-beta-1}

* Adds detection of orphaned containerd tmpmounts to upgrade preflights.
* Verifies the installer UI port is free before prompting on install or upgrade.

## 3.0.0-beta.4

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.0.0-beta.4+k8s-1.34</td>
    <td id="center">3.0.0-beta.4+k8s-1.33</td>
    <td id="center">3.0.0-beta.4+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-0-0-beta-4}

* Adds SELinux analyzer to host support bundle.

### Improvements {#improvements-3-0-0-beta-4}

* Runs app preflights during upgrades.
* Validates client-side regex on the config screen of the install and upgrade wizards.

### Bug fixes {#bug-fixes-3-0-0-beta-4}

* Fixes an issue where the "continue" modal on the "Add Nodes" page had a black overlay.
* Respects readonly config fields in the UI.
* Redirects embedded web server output to `/var/log//web.log`.
* Fixes missing version on the Embedded Cluster upgrade completion screen.
* Clears install and upgrade errors when retrying.
* Sets default Kubernetes CLI namespace for the `shell` command.
* Supports Helm `alias` field for Replicated SDK dependency renaming.
* Resolves air gap image reference mismatch bugs.


## 3.0.0-beta.2

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.0.0-beta.2+k8s-1.34</td>
    <td id="center">3.0.0-beta.2+k8s-1.33</td>
    <td id="center">3.0.0-beta.2+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### Bug fixes {#bug-fixes-3-0-0-beta-2}

* Persists config values on headless install without `--config-values`.

## 3.0.0-beta.1

<table>
  <tr>
    <th>Version</th>
    <td id="center">3.0.0-beta.1+k8s-1.34</td>
    <td id="center">3.0.0-beta.1+k8s-1.33</td>
    <td id="center">3.0.0-beta.1+k8s-1.32</td>
  </tr>
  <tr>
    <th>Kubernetes Version</th>
    <td id="center">1.34.4</td>
    <td id="center">1.33.8</td>
    <td id="center">1.32.12</td>
  </tr>
</table>

### New features {#new-features-3-0-0-beta-1}

* Simplifies image template functions. See [Embedded Cluster template functions](/embedded-cluster/v3/template-functions).