# Customizing Host Preflight Checks for Kubernetes Installers

This topic provides information about how to customize host preflight checks for Kubernetes installers.

## About Host Preflight Checks
You can include host preflight checks with Kubernetes installers to verify that infrastructure requirements are met for:

- Kubernetes
- kURL add-ons
- Your application

This helps to ensure successful installation and the ongoing health of the cluster.

While host preflights are intended to ensure requirements are met for running the cluster, you can also use them to codify some of your application requirements so that users get feedback even earlier in the installation process, rather than waiting to run preflights after the cluster is already installed. For more information about application checks, collectors, and analyzers, see [Customizing Preflight Checks and Support Bundles](preflight-support-bundle-creating).

Default host preflight checks verify conditions such as operating system and disk usage. Default host preflight failures block the installation from continuing and exit with a non-zero return code. Users can then update their environment and run the Kubernetes installer again to re-run the host preflight checks.

Host preflight checks run automatically. The default host preflight checks that run can vary, depending on whether the installation is new, an upgrade, joining a node, or an air gap installation. Additionally, some checks only run when certain add-ons are enabled or configured a certain way in the installer. For a complete list of default host preflight checks, see [Default Host Preflights](https://kurl.sh/docs/install-with-kurl/host-preflights#default-host-preflights) in the kURL documentation.

There are general kURL host preflight checks that run with all installers. There are also host preflight checks included with certain add-ons. Customizations include the ability to:

  - Bypass failures
  - Block an installation for warnings
  - Exclude certain preflights under specific conditions, such as when a particular license entitlement is enabled
  - Skip the default host preflight checks and run only custom checks
  - Add custom checks to the default host preflight checks

For more information about customizing host preflights, see [Customize Host Preflight Checks](#customize-host-preflight-checks).

## Customize Host Preflight Checks

The default host preflights run automatically as part of your Kubernetes installer. You can customize the host preflight checks by disabling them entirely, adding customizations to the default checks to make them more restrictive, or completely customizing them. You can also customize the outcomes to enforce warnings or ignore failures.

This procedure gives examples of the customization options.

To customize host preflight checks:

1. Create a Kubernetes installer (`kind: Installer`). For more information, see [Creating a Kubernetes Installer](https://docs.replicated.com/vendor/packaging-embedded-kubernetes).

1. (Optional) To disable the default host preflight checks for Kubernetes and any add-ons, add the `kurl` field to your Installer manifest and add the `excludeBuiltinHostPreflights` set to `true`.

  This is an aggregate flag, so setting it in one specification disables default host preflights in all of the specifications.

  **Example:**

  ```yaml
  apiVersion: "cluster.kurl.sh/v1beta1"
  kind: "Installer"
  metadata:
    name: "latest"
  spec:
    kubernetes:
      version: "1.23.x"
    weave:
      version: "2.6.x"
    contour:
      version: "1.21.x"
    prometheus:
      version: "0.57.x"
    registry:
      version: "2.7.x"
    containerd:
      version: "1.5.x"
    kotsadm:
        version: "latest"
    ekco:
      version: "latest"
    minio:
      version: "2022-06-11T19-55-32Z"
    longhorn:
      version: "1.2.x"
    kurl:
      excludeBuiltinHostPreflights: true
  ```

1. (Optional) To keep the default host preflight checks and add customized host preflights, add a `hostPreflights` field to the `kurl` or add-on specification in the Installer manifest. Under the `hostPreflights` field, add a host preflight specification (`kind: HostPreflight`) with your customizations. You only need to specify your customizations because the default host preflights run automatically.

  The following example shows customized `kurl` host preflight checks for:

    - An application that requires more CPUs than the default
    - Accessing a website that is critical to the application

  ```yaml
    kubernetes:
      version: "1.23.x"
    weave:
      version: "2.6.x"
    contour:
      version: "1.21.x"
    prometheus:
      version: "0.57.x"
    registry:
      version: "2.7.x"
    containerd:
      version: "1.5.x"
    kotsadm:
        version: "latest"
    ekco:
      version: "latest"
    minio:
      version: "2022-06-11T19-55-32Z"
    longhorn:
      version: "1.2.x"
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
                 Url: https://myFavoriteWebsite.com
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

1. (Optional) To completely customize your host preflight collectors and analyzers:

    1. Disable the default host preflight checks using `excludeBuiltinHostPreflights: true`
    1. Copy the default `host-preflights.yaml` specification for kURL or an add-on from GitHub to the Installer YAML in the vendor portal. Copying the default specifications lets you use the best practices provided by Replicated as a template to help ensure that your customizations run successfully.

      For the default kURL host preflights YAML, see [host-preflights.yaml](https://github.com/replicatedhq/kURL/blob/main/pkg/preflight/assets/host-preflights.yaml) in the kURL repository.

      For links to the add-on YAML files, see [Finding the Add-on Host Preflight Checks](https://kurl.sh/docs/create-installer/host-preflights/#finding-the-add-on-host-preflight-checks) in the kURL documentation.

1. (Optional) Set either of the following flags to customize the outcome of your host preflight checks:

    <table>
      <tr>
        <th width="30%">Flag: Value</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td><code>hostPreflightIgnore: true</code></td>
        <td>Ignores host preflight failures and warnings. The installation proceeds.</td>
      </tr>
      <tr>
        <td><code>hostPreflightEnforceWarnings: true</code></td>
        <td>Blocks an installation if the results include a warning.</td>
      </tr>
    </table>

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
      kubernetes:
        version: "1.23.x"
      weave:
        version: "2.6.x"
      contour:
        version: "1.21.x"
      prometheus:
        version: "0.57.x"
      registry:
        version: "2.7.x"
      containerd:
        version: "1.5.x"
      kotsadm:
          version: "latest"
      ekco:
        version: "latest"
      minio:
        version: "2022-06-11T19-55-32Z"
      longhorn:
        version: "1.2.x"
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
                   Url: https://myFavoriteWebsite.com
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

1. Promote and test your installer in a development environment before sharing it with customers.
