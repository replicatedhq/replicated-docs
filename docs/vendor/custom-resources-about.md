# About Custom Resources

You use Replicated custom resources to add functionality to your app manager releases.

## Adding Functionality to Your Releases

Add functionality to your releases using custom resources. Because of the depth and breadth of extensions available in the Replicated platform, we recommend packaging and testing your application in small iterations before releasing to customers. With the interdependencies and synergies among Replicated features, it can be helpful to know which ones to explore first. Some integrations, like image management and preflight checks, are required or highly recommended. From that point, other features can generally be integrated in any order.

The following table gives a suggested order, but you can add functionality in any order. These functions can be used with Kubernetes Operators, except where noted.

Update, promote, and test each release in your development environment until you are ready to share the application with your customers.

<table>
  <tr>
    <th width="30%">Functionality</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
  <td><a href="admin-console-customize-config-screen">Creating and Editing Configuration Fields</a><br></br><br></br><a href="config-screen-map-inputs">Mapping User-Supplied Values</a></td>
      <td>Create a basic Configuration screen in the Replicated admin console to collect required or optional values from your users that are used to access the application:<br></br><br></br>
      1. Define custom fields.<br></br><br></br>2. Map the values to the application.<br></br><br></br><strong>Note:</strong> Skip this step if you are using Kubernetes Operators.</td>
  </tr>
  <tr>
    <td><a href="database-config-adding-options">Adding Persistent Data Stores</a></td>
    <td><p>Integrate persistent stores, such as databases, queues, and caches. </p><p>Add options for your users to either embed a database instance with the application, or connect your application to an external database instance that they manage.</p></td>
  </tr>
  <tr>
    <td><a href="admin-console-customize-app-icon">Customizing the Admin Console and Download Portal</a></td>
    <td>Customize the appearance of the admin console for end users, including branding, application status, URLs, adding ports and port forwarding, and adding custom graphs.</td>
  </tr>
  <tr>
    <td><a href="packaging-rbac">Configuring Role-Based Access Control</a></td>
    <td>Limit access to a single namespace in a cluster.</td>
  </tr>
  <tr>
    <td><a href="preflight-support-bundle-creating">Defining Preflight Checks and Support Bundles</a></td>
    <td>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations. <br></br><br></br>Enable support bundles to collect and analyze troubleshooting data from your customers' clusters to help you diagnose problems with application deployments.</td>
  </tr>
  <tr>
    <td><a href="snapshots-configuring-backups">Configuring Backups</a></td>
    <td>Enable snapshots so that end users can backup and restore their application configuration and data.</td>
  </tr>
  <tr>
    <td><a href="packaging-ingress">Adding Cluster Ingress Options</a></td>
    <td>Configure how traffic gets to your application using cluster ingress options.</td>
  </tr>
  <tr>
    <td><a href="packaging-using-tls-certs">Using Kubernetes Installer TLS certificates</a></td>
    <td>Share the Kubernetes installer TLS certificate with other Kubernetes resources.</td>
  </tr>
  <tr>
    <td><a href="identity-service-configuring">Enabling and Configuring Identity Service (Beta)</a></td>
    <td>Control access to the application for Kubernetes installer-created clusters.</td>
  </tr>
  <tr>
    <td><a href="packaging-include-resources">Including Conditional Resources</a></td>
    <td>Include and exclude resources based on a customer's configuration choices, such as an external database or an embedded database.</td>
  </tr>
  <tr>
    <td><a href="packaging-cleaning-up-jobs">Cleaning Up Kubernetes Jobs</a></td>
    <td>Clean up completed Kubernetes jobs to prevent errors with future Kubernetes job updates.</td>
  </tr>
</table>