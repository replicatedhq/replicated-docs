---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Embedded Cluster v3 release notes

This topic contains release notes for the [Replicated Embedded Cluster v3](/embedded-cluster/v3/embedded-overview) installer. The release notes list new features, improvements, bug fixes, known issues, and breaking changes.

Additionally, these release notes list the versions of Kubernetes that are available with each version of Embedded Cluster.

<!--RELEASE_NOTES_PLACEHOLDER-->

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