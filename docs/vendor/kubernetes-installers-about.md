# About creating a Kubernetes Installer

The installer can support various add-ons. Removing an add-on from the spec will remove it from your installer. For a full list of supported add-ons and the advanced options they support see the [advanced reference documentation](kubernetes-installers-advanced-options).

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
metadata:
  name: "my-installer"
spec:
  kubernetes:
    version: "latest"
  docker:
    version: "latest"
  weave:
    version: "latest"
  rook:
    version: "latest"
  ekco:
    version: "latest"
  contour:
    version: "latest"
  kotsadm:
    version: "latest"
```

## Versions
To pin a specific version of an add-on, you can specify a (supported) version of that add-on. Supported versions for each add-on can be found on the [add-ons](/add-ons) page. Since specifying a particular version will lock your installer to that version, you will not continue to get patch updates that include bug fixes and security patches. For this reason, it is recommended to use the [`.x` patch versions](#x-patch-versions) functionality.

### Latest Versions
When `"latest"` is the specified version for an add-on, this will resolve to the latest recommended version of the component that is supported by our installer. This means that when an update to the component is shipped, your installer will automatically be updated. This may be desirable in some scenarios, but more often installers should use tested, locked and predictable installed versions.

### `.x` Patch Versions
For add-ons that use [semantic versioning](https://semver.org), you can specify the version in the form `Major.Minor.x`. These versions will always resolve to the greatest patch version for the specified major and minor version of the add-on (e.g., 1.19.x). This is a great way to ensure you are using tested and predictable versions while continuing to receive bug fixes and security patches.

## Distro Hash
The hash for a specific distro is immutable, each hash references a specific combination of components and versions. Mutable, vanity urls are available for Replicated customers as described below in **Managing a kURL Installer**.

## Creation & Management Options
### UI-based Installer Creation
kURL hosts a website where users can specify a kURL manifest. Creating a new distro can be as easy as selecting a few drop down components. [Learn more](kubernetes-installers-creating-ui).

### API-based Installer Creation
kURL hosts an API where users can POST a kURL manifest. [Learn more](kubernetes-installers-creating-api)

### Managing a kURL installer
The generated URLs use a hash to identify a specific set of components and versions, but it's also possible to [create and manage custom Kubernetes URLs](https://kots.io/vendor/embedded-kubernetes/embedded-kubernetes/) with the [Replicated vendor dashboard](https://vendor.replicated.com).

For example, if you create a Replicated account and then create an application named `SomeBigBank` then your account's kURL installer will become `curl -sSL https://kurl.sh/somebigbank | bash `. Beyond the vanity url, your Replicated team will be able to manage & update your new kURL distro as new add-ons or versions become available. Check out our overview for more information about [using kURL with Replicated KOTS](https://blog.replicated.com/kurl-with-replicated-kots/).
