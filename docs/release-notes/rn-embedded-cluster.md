---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Embedded Cluster Release Notes

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

### New Features {#new-features-0-0-0}

* Adds support for the `dropdown` config item type, which creates a dropdown on the config screen. See [`dropdown`](/reference/custom-resource-config#dropdown) in Config.
* Adds the `radio` config item type, which is functionally equivalent to the `select_one` item type but is more clearly named. The `select_one` config item type is deprecated in favor of `radio` but is still fully functional. See [`radio`](/reference/custom-resource-config#radio) in _Config_.

:::note
For release notes for Embedded Cluster versions earlier than 1.10.0, see the [Embedded Cluster GitHub releases page](https://github.com/replicatedhq/embedded-cluster/releases).
:::
