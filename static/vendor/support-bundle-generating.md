# Generate Support Bundles

This topic describes how to generate support bundles from the command line using the kubectl support-bundle plugin. For more information about support bundles, see [About Preflights and Support Bundles](/vendor/preflight-support-bundle-about).

The information in this topic applies to generating support bundles in clusters where you have kubectl access. For information about generating support bundles that include cluster- and host-level information for Replicated Embedded Cluster installations, see [Generating Support Bundles for Embedded Cluster](support-bundle-embedded). 

## Prerequisite: Install the support-bundle Plugin

The support-bundle plugin (a kubectl plugin) is required to generate support bundles from the command line.

You can install the support-bundle plugin using krew or install it manually from the release archives.

:::note
For Replicated Embedded Cluster and Replicated kURL installations, the support-bundle plugin is automatically installed on all of the control plane nodes. You can skip this prerequisite.
:::

#### Install or Upgrade using krew

To install the support-bundle plugin using krew, do one of the following:

* If krew is _not_ installed already, run the following command to install krew and the support-bundle plugin at the same time:
  
    ```
    curl https://krew.sh/support-bundle | bash
    ```
    
* If krew is installed already, run the following command to install the plug-in: 

    ```
    kubectl krew install support-bundle
    ```

* To upgrade your existing support-bundle plugin using krew:

    ```
    kubectl krew upgrade support-bundle
    ```

#### Install Manually

If you do not want to install the plugin using krew or want an easier way to install the plugin in an air gap environment, you can install the plugin manually from the release archives.

To install the support-bundle plugin manually:

1. Run the following command to download and unarchive the latest release, and move the plugin to your $PATH:

   ```
   curl -L https://github.com/replicatedhq/troubleshoot/releases/latest/download/support-bundle_linux_amd64.tar.gz | tar xzvf -
   sudo mv ./support-bundle /usr/local/bin/kubectl-support_bundle
   ```
   :::note
   If you do not have root access, or choose not to add the support-bundle plugin to your path, you can run the binary directly from where you unzipped it by executing `./support-bundle`.  If you choose not to put the plugin into your $PATH, then replace all instances of `kubectl support-bundle` in these instructions with `./support-bundle` or with the absolute path to the binary.
   :::

1. (Optional) Run the following command to test that the installation is working:

   ```
   kubectl support-bundle --help
   ```

## Generate a Bundle

Run the following command to generate a bundle:

```bash
kubectl support-bundle --load-cluster-specs
```

The `--load-cluster-specs` flag automatically discovers all support bundle specs that are defined in Secrets or ConfigMaps in the cluster. For more information, see [Discover Cluster Specs](https://troubleshoot.sh/docs/support-bundle/discover-cluster-specs/) in the Troubleshoot documentation.

For a complete list of options with the `kubectl support-bundle` command, run `kubectl support-bundle --help`. For more information, see [Collect a Support Bundle](https://troubleshoot.sh/docs/support-bundle/collecting/) in the Troubleshoot documentation.

## Generate a Bundle when a Helm Installation Fails

If a Helm installation fails and you want to collect a support bundle to assist with diagnostics, you can use a Replicated default specification to generate the support bundle.

Run the following command:

```bash
kubectl support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/default.yaml
```