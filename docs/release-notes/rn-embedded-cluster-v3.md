---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Embedded Cluster v3 release notes

This topic contains release notes for the [Replicated Embedded Cluster v3](/embedded-cluster/v3/embedded-overview) installer. The release notes list new features, improvements, bug fixes, known issues, and breaking changes.

Additionally, these release notes list the versions of Kubernetes that are available with each version of Embedded Cluster.

<!--RELEASE_NOTES_PLACEHOLDER-->

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