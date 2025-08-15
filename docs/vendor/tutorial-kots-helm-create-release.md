import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HelmChartCr from "../partials/getting-started/_gitea-helmchart-cr.mdx"
import KotsCr from "../partials/getting-started/_gitea-kots-app-cr.mdx"
import K8sCr from "../partials/getting-started/_gitea-k8s-app-cr.mdx"

# Step 3: Add the Chart Archive to a Release

Next, add the Helm chart archive to a new release for the application in the Replicated Vendor Portal.

A _release_ represents a single version of your application and contains your application files. Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available.

To create a release:

1. Go to the directory where you packaged the Helm chart.

1. Create a release:

   ```
   replicated release create --yaml-dir .
   ```
   **Example output**:
   ```
   • Reading manifests from . ✓
   • Creating Release ✓
     • SEQUENCE: 1
   ```

## Next Step

Create a customer. See [Step 5: Create a Helm-Enabled Customer](tutorial-kots-helm-create-customer).

## Related Topics

* [About Channels and Releases](/vendor/releases-about)
* [Configuring the HelmChart Custom Resource v2](/vendor/helm-native-v2-using)
