# Customizing Host Preflight Checks for kURL

This topic provides information about how to customize host preflight checks for installations with Replicated kURL.

## About Host Preflight Checks
You can include host preflight checks with kURL to verify that infrastructure requirements are met for:

- Kubernetes
- kURL add-ons
- Your application

This helps to ensure successful installation and the ongoing health of the cluster.

While host preflights are intended to ensure requirements are met for running the cluster, you can also use them to codify some of your application requirements so that users get feedback even earlier in the installation process, rather than waiting to run preflights after the cluster is already installed. For more information about application checks, collectors, and analyzers, see [About Preflight Checks and Support Bundles](preflight-support-bundle-about).

Default host preflight checks verify conditions such as operating system and disk usage. Default host preflight failures block the installation from continuing and exit with a non-zero return code. Users can then update their environment and run the kURL installation script again to re-run the host preflight checks.

Host preflight checks run automatically. The default host preflight checks that run can vary, depending on whether the installation is new, an upgrade, joining a node, or an air gap installation. Additionally, some checks only run when certain add-ons are enabled in the installer. For a complete list of default host preflight checks, see [Default Host Preflights](https://kurl.sh/docs/install-with-kurl/host-preflights#default-host-preflights) in the kURL documentation.

There are general kURL host preflight checks that run with all installers. There are also host preflight checks included with certain add-ons. Customizations include the ability to:

  - Bypass failures
  - Block an installation for warnings
  - Exclude certain preflights under specific conditions, such as when a particular license entitlement is enabled
  - Skip the default host preflight checks and run only custom checks
  - Add custom checks to the default host preflight checks

For more information about customizing host preflights, see [Customize Host Preflight Checks](#customize-host-preflight-checks).

## Customize Host Preflight Checks

The default host preflights run automatically as part of your kURL installation. You can customize the host preflight checks by disabling them entirely, adding customizations to the default checks to make them more restrictive, or completely customizing them. You can also customize the outcomes to enforce warnings or ignore failures.

### Add Custom Preflight Checks to the Defaults

To run customized host preflight checks in addition to the default host preflight checks, add a `hostPreflights` field to the `kurl` field in your Installer manifest. Under the `hostPreflights` field, add a host preflight specification (`kind: HostPreflight`) with your customizations. You only need to specify your customizations because the default host preflights run automatically.

Customized host preflight checks run in addition to default host preflight checks, if the default host preflight checks are enabled.

If you only want to make the default host preflight checks more restrictive, add your more restrictive host preflight checks to `kurl.hostPreflights`, and do not set `excludeBuiltinHostPreflights`. For example, if your application requires 6 CPUs but the default host preflight check requires 4 CPUs, you can simply add a custom host preflight check for 6 CPUs, since the default host preflight must pass if the more restrictive custom check passes.

The following example shows customized `kurl` host preflight checks for:

  - An application that requires more CPUs than the default
  - Accessing a website that is critical to the application

```yaml
apiVersion: "cluster.kurl.sh/v1beta1"
kind: "Installer"
metadata:
  name: "latest"
spec:
  kurl:
    hostPreflights:
      apiVersion: troubleshoot.sh/v1beta2
      kind: HostPreflight
      spec:
        collectors:
          - cpu: {}
          - http:
              collectorName: Can Access A Website
              get:
                url: https://myFavoriteWebsite.com
        analyzers:
          - cpu:
              checkName: Number of CPU check
              outcomes:
                - fail:
                    when: "count < 4"
                    message: This server has less than 4 CPU cores
                - warn:
                    when: "count < 6"
                    message: This server has less than 6 CPU cores
                - pass:
                    message: This server has at least 6 CPU cores
          - http:
              checkName: Can Access A Website
              collectorName: Can Access A Website
              outcomes:
                - warn:
                    when: "error"
                    message: Error connecting to https://myFavoriteWebsite.com
                - pass:
                    when: "statusCode == 200"
                    message: Connected to https://myFavoriteWebsite.com
```

### Customize the Default Preflight Checks

To customize the default host preflights:

1. Disable the default host preflight checks using `excludeBuiltinHostPreflights: true`.
1. Copy the default `host-preflights.yaml` specification for kURL from [host-preflights.yaml](https://github.com/replicatedhq/kURL/blob/main/pkg/preflight/assets/host-preflights.yaml) in the kURL repository.
1. Copy the default `host-preflight.yaml` specification for any and all add-ons that are included in your specification and have default host preflights. For links to the add-on YAML files, see [Finding the Add-on Host Preflight Checks](https://kurl.sh/docs/create-installer/host-preflights/#finding-the-add-on-host-preflight-checks) in the kURL documentation.
1. Merge the copied host preflight specifications into one host preflight specification, and paste it to the `kurl.hostPreflights` field in the Installer YAML in the Vendor Portal.
1. Edit the defaults as needed.

### Ignore or Enforce Warnings and Failures

Set either of the following flags to customize the outcome of your host preflight checks:

<table>
<tr>
  <th width="30%">Flag: Value</th>
  <th width="70%">Description</th>
</tr>
<tr>
  <td><code>hostPreflightIgnore: true</code></td>
  <td>Ignores host preflight failures and warnings. The installation proceeds regardless of host preflight outcomes.</td>
</tr>
<tr>
  <td><code>hostPreflightEnforceWarnings: true</code></td>
  <td>Blocks an installation if the results include a warning.</td>
</tr>
</table>

### Disable Host Preflight Checks

To disable the default host preflight checks for Kubernetes and all included add-ons, add the `kurl` field to your Installer manifest and add `kurl.excludeBuiltinHostPreflights: true`. In this case, no host preflight checks are run.

`excludeBuiltinHostPreflights` is an aggregate flag, so setting it to `true` disables the default host preflights for Kubernetes and all included add-ons.

**Example:**

   ```yaml
   apiVersion: "cluster.kurl.sh/v1beta1"
   kind: "Installer"
   metadata:
     name: "latest"
   spec:
     kurl:
       excludeBuiltinHostPreflights: true
   ```

## Example of Customized Host Preflight Checks

The following example shows:

- Default host preflights checks are disabled
- Customized host preflight checks run
- The installation is blocked if there is a warning

```yaml
apiVersion: "cluster.kurl.sh/v1beta1"
kind: "Installer"
metadata:
  name: "latest"
spec:
  kurl:
    excludeBuiltinHostPreflights: true
    hostPreflightEnforceWarnings: true
    hostPreflights:
      apiVersion: troubleshoot.sh/v1beta2
      kind: HostPreflight
      spec:
        collectors:
          - cpu: {}
          - http:
              collectorName: Can Access A Website
              get:
                url: https://myFavoriteWebsite.com
        analyzers:
          - cpu:
              checkName: Number of CPU check
              outcomes:
                - fail:
                    when: "count < 4"
                    message: This server has less than 4 CPU cores
                - warn:
                    when: "count < 6"
                    message: This server has less than 6 CPU cores
                - pass:
                    message: This server has at least 6 CPU cores
          - http:
              checkName: Can Access A Website
              collectorName: Can Access A Website
              outcomes:
                - warn:
                    when: "error"
                    message: Error connecting to https://myFavoriteWebsite.com
                - pass:
                    when: "statuscode == 200"
                    message: Connected to https://myFavoriteWebsite.com
     ```