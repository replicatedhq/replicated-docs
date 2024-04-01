# Support Lifecycle Policy

Replicated will provide support for products per our terms and services until that product is noted as End of Life (EOL).

<table>
  <tr>
    <th width="30%">Product Phase</th>
    <th width="70%">Definition</th>
  </tr>
  <tr>
    <td>“GA” - General Availability</td>
    <td>A product starts the General Availability phase when it is available for purchase from Replicated.</td>
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
    <td>Beta</td>
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
    <th>KOTS Versions</th>
    <th>kURL Versions</th>
    <th>End of Replicated Support</th>
  </tr>  
  <tr>
    <td>1.29</td>
    <td>v1.105.2 and later</td>
    <td>v2024.01.02-0 and later</td>
    <td>2025-02-28</td>
  </tr>
  <tr>
    <td>1.28</td>
    <td>v1.102.1 and later</td>
    <td>v2023.08.23-0 and later</td>
    <td>2024-10-28</td>
  </tr>
  <tr>
    <td>1.27</td>
    <td>v1.100.0 and later</td>
    <td>v2023.05.08-0 and later</td>
    <td>2024-06-28</td>
  </tr>
</table>

Replicated support for end-customer installations is limited to those installs using a Replicated provided installer product, such as KOTS or kURL, available with the [Business or Enterprise plans](https://www.replicated.com/pricing). Replicated support for direct Helm CLI installs or other vendor provided installers is limited to the successful distribution of the software to the end-customer, as well as any issues with the Replicated SDK if included with the installation. 


The information contained herein is believed to be accurate as of the date of publication, but updates and revisions may be posted periodically and without notice.

Last modified April 01, 2024.
