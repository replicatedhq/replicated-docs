# Installing in an Online (Internet-connected) Environment

You can install an application to an existing Kubernetes cluster that contains nodes that can access the internet.
In an online installation, the Replicated app manager pulls container images from the upstream registries directly.

## Install with the App Manager

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

## Set up the Application

At this point, visit `http://localhost:8800` to complete the setup of the application.

### Unlock the Admin Console
![Secure Console](/images/secure-console.png)

Enter the password provided during the setup, and you'll be redirected to the "Upload License" screen.

### Provide a License File
At this point, the admin console is still just an admin console without an application.
Providing a license file will include the entitlements necessary to pull the manifest and images and start the application.
If the license is outdated, the latest license will be fetched and used instead.

![Upload License](/images/upload-license.png)

After the license file is installed, if air gapped installations are enabled, an option will be presented to proceed with an air gapped setup.

### Configure the Application

Most applications include some required and some optional configuration.
This is used to build the final deployable Kubernetes manifests for the application.

The admin console configuration screen prompts for initial values to use in the application.
These can be changed later, but must be completed to continue.

![Initial Config](/images/initial-config.png)

### Pass Preflight Checks

The app manager runs preflight checks (conformance tests) against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

![Preflight Checks](/images/preflight-checks.png)

#### Resolve strict preflight checks

When one or more strict preflight checks are present, the application deployment is blocked until these strict checks run. Strict preflight checks must not contain failures and will block the release from being deployed until the failures are resolved. A vendor may specify strict preflight checks to help enforce that specific requirements are  met before the application can be deployed. 

When installing with [minimal role-based access control (RBAC)](../reference/custom-resource-application#requireminimalrbacprivileges), the app manager recognizes if the preflight checks have failed due to insufficient privilege. When this occurs, a `kubectl preflight` command is displayed that can be run manually in the cluster to run the preflight checks. When the command runs and completes, the results are automatically uploaded to the app manager.
An example of the format for this command is below:
```bash
curl https://krew.sh/preflight | bash
kubectl preflight secret/<namespace>/kotsadm-<appslug>-preflight
```

### Specify proxies

When installing behind a proxy, the admin console needs to be able to use the proxy to communicate with the APIs on the internet as well as local services.

Both the `kots install` and `kots pull` CLI commands provide arguments to specify proxy settings for the admin console containers.

If either `http-proxy` or `https-proxy` is specified, `no-proxy` should also be specified. The `no-proxy` string should include all localhost addresses as well as the local network and Kubernetes cluster CIDRs.

For example:
```bash
kubectl kots install app --http-proxy http://10.128.0.3:3128 \
  --no-proxy localhost,127.0.0.1,10.0.0.0/8,10.138.0.82
```
If the `copy-proxy-env` flag is specified, proxy settings will be read from the environment of the shell where the kots command is running.

For more information, see [install](../reference/kots-cli-install) and [pull](../reference/kots-cli-pull) in the kots CLI documentation.
