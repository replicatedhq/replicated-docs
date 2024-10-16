# Support Lifecycle Policy

Replicated will provide support for products per our terms and services until that product is noted as End of Life (EOL).

<table>
  <tr>
    <th width="30%">Product Phase</th>
    <th width="70%">Definition</th>
  </tr>
    <tr>
    <td>Alpha</td>
    <td>A product, or a feature within a product, that is exploratory/experimental. It is typically not publicly documented, and access is limited to customers providing early feedback. While most alpha features will move forward, some may be deprecated based on assessment learnings. Products that are GA themself may have certain alpha features for a limited time as new capabilities are introduced to that product.</td>
  </tr>
   </tr>
    <tr>
    <td>Beta</td>
    <td><p>A product, or a feature within a product, that has not yet met Replicated’s definition of GA. Products that are GA themself may have certain Beta features for a limited time as new capabilities are introduced to that product.</p><p>A product/feature may be labeled Beta for one or more of the following reasons: remaining gaps in intended functionality, outstanding needs around testing, documentation, or sales enablement, or still in-progress customer value validation efforts. Documentation for these features/products are published as part of the official documentation with Beta labeling, and many are already production ready depending on their development lifecycle phase.</p><p>Please contact Replicated if you have specific questions about why a product/feature is currently labeled Beta.</p></td>
  </tr>
  <tr>
    <td>“GA” - General Availability</td>
    <td>A product, or a feature within a product, that has been validated as both production ready and value additive by a percentage of Replicated customers. For high-level products, the GA phase is typically when they become available for purchase from Replicated.</td>
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
    <td>Beta</td>
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
    <td>EOA</td>
    <td>2023-12-31&#42;</td>
    <td>2024-12-31&#42;</td>
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
    <td>1.31</td>
    <td>N/A</td>
    <td>1.117.0 and later</td>
    <td>v2024.08.26-0 and later</td>
    <td>2025-10-28</td>
  </tr>
  <tr>
    <td>1.30</td>
    <td>N/A</td>
    <td>1.109.1 and later</td>
    <td>v2024.05.03-0 and later</td>
    <td>2025-06-28</td>
  </tr>
  <tr>
    <td>1.29</td>
    <td>1.0.0 and later</td>
    <td>1.105.2 and later</td>
    <td>v2024.01.02-0 and later</td>
    <td>2025-02-28</td>
  </tr>
  <tr>
    <td>1.28</td>
    <td>1.0.0 and later</td>
    <td>1.102.1 and later</td>
    <td>v2023.08.23-0 and later</td>
    <td>2024-10-28</td>
  </tr>
</table>

Replicated support for end-customer installations is limited to those installs using a Replicated provided installer product, such as KOTS, kURL or Embedded Cluster, available with the [Business or Enterprise plans](https://www.replicated.com/pricing). Replicated support for direct Helm CLI installs or other vendor provided installers is limited to the successful distribution of the software to the end-customer, as well as any issues with the Replicated SDK if included with the installation. 


The information contained herein is believed to be accurate as of the date of publication, but updates and revisions may be posted periodically and without notice.

Last modified October 16, 2024.
