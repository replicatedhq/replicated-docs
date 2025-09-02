# Support Lifecycle Policy

Replicated will provide support for products per our terms and services until that product is noted as End of Life (EOL).

<table>
  <tr>
    <th width="30%">Product Phase</th>
    <th width="70%">Definition</th>
  </tr>
  <tr>
    <td>Alpha</td>
    <td>A product or feature that is exploratory or experimental. Typically, access to alpha features and their documentation is limited to customers providing early feedback. While most alpha features progress to beta and general availability (GA), some are deprecated based on assessment learnings.</td>
  </tr>
  <tr>
    <td>Beta</td>
    <td><p>A product or feature that is typically production-ready, but has not met Replicated’s definition of GA for one or more of the following reasons:</p><ul><li>Remaining gaps in intended functionality</li><li>Outstanding needs around testing</li><li>Gaps in documentation or sales enablement</li><li>In-progress customer value validation efforts</li></ul><p>Documentation for beta products and features is published on the Replicated Documentation site with a "(Beta)" label. Beta products or features follow the same build and test processes required for GA.</p><p>Please contact your Replicated account representative if you have questions about why a product or feature is beta.</p></td>
  </tr>
  <tr>
    <td>“GA” - General Availability</td>
    <td>A product or feature that has been validated as both production-ready and value-additive by a percentage of Replicated customers. Products in the GA phase are typically those that are available for purchase from Replicated.</td>
  </tr>
  <tr>
    <td>“LA” - Limited Availability</td>
    <td>A product has reached the Limited Availability phase when it is no longer available for new purchases from Replicated. Updates will be primarily limited to security patches, critical bugs and features that enable migration to GA products.</td>
  </tr>
  <tr>
    <td>“EOA” - End of Availability</td>
    <td><p>A product has reached the End of Availability phase when it is no longer available for renewal purchase by existing customers. This date may coincide with the Limited Availability phase.</p><p>This product is considered deprecated, and will move to End of Life after a determined support window. Product maintenance is limited to critical security issues only.</p></td>
  </tr>
  <tr>
    <td>“EOL” - End of Life</td>
    <td><p>A product has reached its End of Life, and will no longer be supported, patched, or fixed by Replicated. Associated product documentation may no longer be available.</p><p>The Replicated team will continue to engage to migrate end customers to GA product based deployments of your application.</p></td>
  </tr>
</table>

<table>
  <tr>
    <th width="25%">Replicated Product</th>
    <th width="15%">Product Phase</th>
    <th width="25%">End of Availability</th>
    <th width="25%">End of Life</th>
  </tr>
  <tr>
    <td><a href="/vendor/testing-about">Compatibility Matrix</a></td>
    <td>GA</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="/vendor/replicated-sdk-overview">Replicated SDK</a></td>
    <td>GA</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="/intro-kots">Replicated KOTS Installer</a></td>
    <td>GA</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
    <tr>
    <td><a href="/vendor/kurl-about">Replicated kURL Installer</a></td>
    <td>GA</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="/vendor/embedded-overview">Replicated Embedded Cluster Installer</a></td>
    <td>GA</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="https://help.replicated.com/docs/native/getting-started/overview/">Replicated Classic Native Installer</a></td>
    <td>EOL</td>
    <td>2023 December 31&#42;</td>
    <td>2024 December 31&#42;</td>
  </tr>
</table>

&#42;Except for customers who have specifically contracted different dates for the End of Availability and End of Life timelines.  

## Supported Replicated Installer Versions

The following table lists the versions of Replicated KOTS and Replicated kURL that are supported on each Kubernetes version.

The End of Replicated Support date is the End Of Life (EOL) date for the Kubernetes version. The EOL date for each Kubernetes version is published on the [Releases](https://kubernetes.io/releases/) page in the Kubernetes documentation. 

<table>
  <tr>
    <th>Kubernetes Version</th>
    <th>Embedded Cluster Versions</th>
    <th>KOTS Versions</th>
    <th>kURL Versions</th>
    <th>End of Replicated Support</th>
  </tr>
  <tr>
    <td>1.34</td>
    <td>NA</td>
    <td>NA</td>
    <td>NA</td>
    <td>2026 October</td>
  </tr>
  <tr>
    <td>1.33</td>
    <td>2.10.0 and later</td>
    <td>1.124.17 and later</td>
    <td>v2025.08.26-0 and later</td>
    <td>2026 June 28</td>
  </tr>
  <tr>
    <td>1.32</td>
    <td>2.9.0 and later</td>
    <td>1.123.0 and later</td>
    <td>2025.03.19-0 and later</td>
    <td>2026 Feb 28</td>
  </tr>
  <tr>
    <td>1.31</td>
    <td>2.6.0 and later</td>
    <td>1.117.0 and later</td>
    <td>2024.08.26-0 and later</td>
    <td>2025 October 28</td>
  </tr>
</table>

Replicated support for end-customer installations is limited to those installs using a Replicated provided installer product, such as KOTS, kURL or Embedded Cluster, available with the [Business or Enterprise plans](https://www.replicated.com/pricing). Replicated support for direct Helm CLI installs or other vendor provided installers is limited to the successful distribution of the software to the end-customer, as well as any issues with the Replicated SDK if included with the installation. 


The information contained herein is believed to be accurate as of the date of publication, but updates and revisions may be posted periodically and without notice.

Last modified 2025 September 2.
