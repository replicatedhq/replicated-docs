# Installing in an online (Internet-connected) environment

You can install an application to an existing Kubernetes cluster that contains nodes that can access the internet.
In an online installation, the Replicated app manager pulls container images from the upstream registries directly.

## Install with the app manager

To start, run the command that was provided by the application vendor:

```shell
kubectl kots install application-name
```

The kubectl plugin will walk you through the necessary steps to install the application:

```shell
$ kubectl kots install application-name
Enter the namespace to deploy to: application-name
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
Enter a new password to be used for the Admin Console: ••••••••
  • Waiting for Admin Console to be ready ✓

  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console

```

After this has completed, the kots CLI plugin will create a port-forward to the Replicated admin console interface.
The admin console API and Web server are exposed over a ClusterIP service in the namespace provided.
The port-forward will be active as long as the CLI is running. Pressing Ctrl+C will end the port forward.

After this has completed, click the link, or visit `http://localhost:8800` to complete the setup using the admin console web-based UI.

## Set up the application

At this point, visit `http://localhost:8800` to complete the setup of the application.

### Unlock the admin console
![Secure Console](/images/secure-console.png)

Enter the password provided during the setup, and you'll be redirected to the "Upload License" screen.

### Provide a license file
At this point, the admin console is still just an admin console without an application.
Providing a license file will include the entitlements necessary to pull the manifest and images and start the application.
If the license is outdated, the latest license will be fetched and used instead.

![Upload License](/images/upload-license.png)

After the license file is installed, if air gapped installations are enabled, an option will be presented to proceed with an air gapped setup.

### Configure the application

Most applications include some required and some optional configuration.
This is used to build the final deployable Kubernetes manifests for the application.

The admin console configuration screen prompts for initial values to use in the application.
These can be changed later, but must be completed to continue.

![Initial Config](/images/initial-config.png)

### Pass preflight checks

The app manager runs preflight checks (conformance tests) against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

![Preflight Checks](/images/preflight-checks.png)

### Resolve strict preflight checks

Strict preflight checks block application deployment when the cluster resources are not met with application requirements.

If any strict preflight checks fail, application installation cannot continue.
To continue the application installation, you must resolve the errors from the failed strict preflight checks in your environment. Then, rerun the preflight checks.

If strict preflight checks are present, the Deployment button is disabled while the preflight checks are running. The Deployment button is enabled after the preflight checks pass.

During minimal role-based access control (RBAC) installations, you can use the CLI to run preflight checks and upload the results. The admin console recognizes if the preflight checks have failed due to RBAC issues and displays a dialog with the CLI command that you can use to run the preflight checks and upload the results.

For automatic application installations, the results of the preflight are evaluated before deploying the application.

### Specify proxies

When installing behind a proxy, the admin console needs to be able to use the proxy to communicate with the APIs on the internet as well as local services.

Both the `kots install` and `kots pull` kots CLI commands provide arguments to specify proxy settings for the admin console containers.

If either `http-proxy` or `https-proxy` is specified, `no-proxy` should also be specified. The `no-proxy` string should include all localhost addresses as well as the local network and Kubernetes cluster CIDRs.

For example:
```bash
kubectl kots install app --http-proxy http://10.128.0.3:3128 \
  --no-proxy localhost,127.0.0.1,10.0.0.0/8,10.138.0.82
```
If the `copy-proxy-env` flag is specified, proxy settings will be read from the environment of the shell where the kots command is running.

For more information, see [install](../reference/kots-cli-install) and [pull](../reference/kots-cli-pull) in the kots CLI documentation.
