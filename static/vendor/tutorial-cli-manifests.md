# Step 3: Get the Sample Manifests

To create a release for the `cli-tutorial` application, first create the Kubernetes manifest files for the application. This tutorial provides a set of sample manifest files for a simple Kubernetes application that deploys an NGINX service.

To get the sample manifest files:

1. Run the following command to create and change to a `replicated-cli-tutorial` directory:

   ```
   mkdir replicated-cli-tutorial
   cd replicated-cli-tutorial
   ```

1. Create a `/manifests` directory and download the sample manifest files from the [kots-default-yaml](https://github.com/replicatedhq/kots-default-yaml) repository in GitHub:

   ```
   mkdir ./manifests
   curl -fSsL https://github.com/replicatedhq/kots-default-yaml/archive/refs/heads/main.zip | \
     tar xzv --strip-components=1 -C ./manifests \
     --exclude README.md --exclude LICENSE --exclude .gitignore
   ```

1. Verify that you can see the YAML files in the `replicated-cli-tutorial/manifests` folder:

   ```
   ls manifests/
   ```
   ```
   example-configmap.yaml   example-service.yaml     kots-app.yaml            kots-lint-config.yaml    kots-support-bundle.yaml
   example-deployment.yaml  k8s-app.yaml             kots-config.yaml         kots-preflight.yaml
   ```

## Next Step

Continue to [Step 4: Create a Release](tutorial-cli-create-release) to create and promote the first release for the `cli-tutorial` application using these manifest files.