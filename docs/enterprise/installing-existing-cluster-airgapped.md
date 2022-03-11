# Installing in an Air Gapped Environment

When installing an application with the Replicated app manager from a `.airgap` package, the container images and application manifests are provided by the application vendor in an archive that can be used to deliver the artifacts into the cluster.

This feature is only available for licenses that have the air gapped feature enabled.

This topic applies to installing the Replicated admin console into an existing Kubernetes cluster.  
For information about how to install on a cluster created by the Kubernetes installer in an air gapped environment, see [Install in an air gapped environment](installing-embedded-cluster#airgapped-installations) in _Installing with the Kubernetes installer_.

## Push Images and Install the Admin Console

You can install the admin console using the kots CLI plugin for the kubectl command-line tool.

The `.airgap` package is named `kotsadm.tar.gz`. You can download `kotsadm.tar.gz` from the kots release page on GitHub. See [Releases](https://github.com/replicatedhq/kots/releases) in the kots GitHub repository.

The asset version must match the kots CLI version, which can be determined by running:

```shell
kubectl kots version
```

The first step is to extract admin console container images and push them into a private registry.
Registry credentials provided in this step must have push access.
These credentials will not be stored anywhere or reused later.

```shell
kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/app-name \
  --registry-username rw-username \
  --registry-password rw-password
```

The next step is to install the admin console using images pushed in the previous step.
Registry credentials provided in this step only need to have read access, and they will be stored in a Kubernetes secret in the same namespace where admin console will be installed.

These credentials will be used to pull the images, and will be automatically created as an imagePullSecret on all of the Admin Console pods.

```shell
kubectl kots install app-name \
  --kotsadm-namespace app-name \
  --kotsadm-registry private.registry.host \
  --registry-username ro-username \
  --registry-password ro-password
```

After this has completed, the app manager will create a port-forward to the admin console on port 8800.
The admin console is exposed internally in the cluster, and can only be accessed using a port forward.
The port-forward will be active as long as the CLI is running.
Pressing Ctrl+C will end the port forward.

```shell
  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console
```

After this message is displayed visit `http://localhost:8800` to complete the application setup using the admin console.

## Upload the Air Gap Bundle

![Airgap Bundle](../../static/images/airgap-install.png)

The software vendor should have delivered an `.airgap` bundle to be used on this screen.
The bundle contains the container images and manifests.
Choose the bundle and click continue to start processing.

![Airgap Uploading](../../static/images/airgap-uploading.png)

After the bundle has been completely uploaded, the admin console processes the images and manifests.
Images will be loaded, re-tagged, and pushed to the registry provided.

![Processing Images](../../static/images/processing-images.gif)

## Pass preflight checks

The app manager runs preflight checks (conformance tests) against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

![Preflight Checks](/images/preflight-checks.png)

### Resolve strict preflight checks

When one or more strict preflight checks are present, the application deployment is blocked until these strict checks are run. Strict preflight checks must not contain failures and block the release from being deployed until the failures are resolved. Strict preflight checks help enforce that vendor-specific requirements are met before the application is deployed. 

### Resolve role-based access control checks

When the installation uses [minimal role-based access control (RBAC)](../reference/custom-resource-application#requireminimalrbacprivileges), the app manager recognizes if the preflight checks failed due to insufficient privileges. When this occurs, a `kubectl preflight` command is displayed that you must run manually in the cluster to run the preflight checks. When the command runs and completes, the results are automatically uploaded to the app manager.

**Example:**

```bash
curl https://krew.sh/preflight | bash
kubectl preflight secret/<namespace>/kotsadm-<appslug>-preflight
```
