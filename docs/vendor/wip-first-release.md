# How to Create Your First Release

## Creating and Testing Your Initial Release

The following diagram is a visual representation of the steps that follow for creating and testing your first release. You will iterate many times before distributing your application to customers.

![Initial Release Workflow](/images/packaging-first-iteration.png)

[View a larger version of this image](../../static/images/packaging-first-iteration.png)

Complete the following procedures to import your files, create, and test your first release:

1. Push your images to the Replicated private registry if you plan to host your images on that registry. See [Push Images to the Replicated Private Registry](packaging-private-images#push-images-to-the-replicated-private-registry) in _Connecting to an Image Registry_.

    If you are using a different image option, skip this step and proceed to the next step.

1. Import your application files to Replicated using one of the following types:

    <table>
      <tr>
        <th width="30%">Type</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>Standard manifest files</td>
        <td>We recommend using standard manifest YAML files unless you are already using Helm or Kubernetes Operators. <br></br><br></br>To import using the Replicated vendor portal, see <a href="releases-creating-releases">Creating Releases with Standard Manifest Files</a>.</td>
      </tr>
      <tr>
        <td>Helm charts</td>
        <td>If your application is already packaged using Helm charts, see <a href="helm-release">Creating Releases with Helm Charts</a>.</td>
      </tr>
      <tr>
        <td>Kubernetes Operators</td>
        <td>If you are already using Kubernetes Operators, see <a href="operator-packaging-about">Package the Kubernetes Operator Application</a>. <br></br><br></br>Skip connecting to a private registry and skip creating a Configuration screen in the admin console. <br></br><br></br>You can use any of the other packaging functions, depending on your needs. Create a license file, and promote and test each iteration.</td>
      </tr>
    </table>

1. (Required) If you are using private images, either connect to an external private registry or update the image tags to point to the Replicated private registry. See [Connecting to an Image Registry](packaging-private-images).

  :::note
  Skip this step if your images are open-source or public, or if you are using Kubernetes Operators.
  :::

1. If you are providing your users with a cluster hosted on a VM, you must configure and test a Kubernetes installer. See [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

1. Create a license file in the vendor portal that contains entitlement information for your customer. You also need a license file to test your application in the admin console. See [Creating a Customer](releases-creating-customer).

1. Promote the release and test it by installing the release in a development environment with the license file that you created. You can use the environment that you created during one of the recommended tutorials. For information about promoting a release, see [Creating Releases with Helm Charts](helm-release) or [Creating Releases with Standard Manifest Files](releases-creating-releases). For information about installation, see [Overview of Installing an Application](../enterprise/installing-overview).

Next, add functionality to your release.