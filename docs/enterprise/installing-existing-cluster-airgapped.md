# Installing in an air gapped environment

When installing an application from an airgap package, the container images and application manifests are provided by the application vendor in an archive that can be used to deliver the artifacts into the cluster.
This feature is only available for licenses that have the airgapped feature enabled.

## KOTS install
This section only applies to installing the Admin Console into an existing Kubernetes cluster.  
See [this](https://kots.io/kotsadm/installing/installing-embedded-cluster/) document for embedded installations with kURL.

Begin by [installing the KOTS CLI kubectl plugin](/kots-cli/getting-started/).
The Admin Console can be installed using the KOTS plugin and the airgap package that can be downloaded from the [release assets](https://github.com/replicatedhq/kots/releases) named `kotsadm.tar.gz`.
The asset version must match the KOTS CLI version, which can be determined by running:

```shell
kubectl kots version
```

The first step is to extract KOTS Admin Console container images and push them into a private registry.
Registry credentials provided in this step must have push access.
These credentials will not be stored anywhere or reused later.

```shell
kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/app-name \
  --registry-username rw-username \
  --registry-password rw-password
```

The next step is to install the Admin Console using images pushed in the previous step.
Registry credentials provided in this step only need to have read access, and they will be stored in a Kubernetes secret in the same namespace where Admin Console will be installed.
These credentials will be used to pull the images, and will be automatically created as an imagePullSecret on all of the Admin Console pods.

```shell
kubectl kots install app-name \
  --kotsadm-namespace app-name \
  --kotsadm-registry private.registry.host \
  --registry-username ro-username \
  --registry-password ro-password
```

Once this has completed, the KOTS will create a port-forward to the Admin Console on port 8800.
The Admin Console is exposed internally in the cluster, and can only be accessed using a port forward.
The port-forward will be active as long as the CLI is running.
Pressing Ctrl+C will end the port forward.

```shell
  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console
```

Once this message is displayed visit `http://localhost:8800` to complete the application setup using the Admin Console.

### Upload Airgap Bundle
![Airgap Bundle](../../static/images/airgap-install.png)

The software vendor should have delivered a `.airgap` bundle to be used on this screen.
The bundle contains the container images and manifests.
Choose the bundle and click continue to start processing.

![Airgap Uploading](../../static/images/airgap-uploading.png)

### Processing Images
Once the bundle has been completely uploaded, the Admin Console will start to process the images and manifests.
Images will be loaded, re-tagged and pushed to the registry provided.

![Processing Images](../../static/images/processing-images.gif)
