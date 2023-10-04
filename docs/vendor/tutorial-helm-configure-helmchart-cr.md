# Step 7: Configure the HelmChart Custom Resource

For vendors with access to the KOTS installer, add a HelmChart custom resource to your release to your release to support KOTS installations.

The HelmChart custom resource provides instructions for KOTS about how to deploy your Helm chart.

1. In the vendor portal, click Create release > KOTS release

  In the Help panel, you might see an error lihe this:

  `Error: Could not find helm chart manifest for archive 'wordpress-17.0.0.tgz'`

1. Click New File

1. Paste the following into the new file

   ```yaml
   apiVersion: kots.io/v1beta2
   kind: HelmChart
   metadata:
     name: wordpress
   spec:
     # chart identifies a matching chart from a .tgz
     chart:
       name: wordpress
       chartVersion: 17.0.0
  
     releaseName: 

     values:
       replicated:
         enabled: false  
   ```

1. Update the SDK dependency to include a conditional:

    ```yaml
    dependencies:
    - name: replicated
      repository: oci://registry.replicated.com/library
      version: 1.0.0-beta.8
      condition: replicated.enabled
    ```

1. Save the release  