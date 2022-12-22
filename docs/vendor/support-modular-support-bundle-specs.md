# About Creating Modular and Discoverable Support Bundles

This topic provides information about using a modular approach to support bundles and adding specifications to discover Kubernetes resources in a cluster.

## Overview of Modular Support Bundles

Support bundle manifest files can be designed using a modular approach. This helps teams can more easily develop specifications that are scoped to individual components or microservices in a large application and avoid merge conflicts. You can create separate manifest files or use a combination of manifest files, URLs, and Kubernetes secrets.

Then, customers can use the support-bundle CLI to merge the multiple specifications and generate a single support bundle archive. For more information, see [Collecting a Support Bundle from Multiple Specs](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-multiple-specs) in the Troubleshoot documentation.

You can also add a support bundle manifest file as a Secret to enable discoverability in clusters. Customers can then discover all of the support bundle specifications and generate a merged support bundle with aggregated information. For more information about adding secrets, see [Support Bundle specs to a cluster as Secrets](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-specs-discovered-from-the-cluster) in the Troubleshoot documentation.

## Examples

### Create Support Bundle Specifications by Component

For example, in an application that ships MySQL, NGINX, and Redis, your team can add collectors and analyzers for each component:

`manifests/nginx/troubleshoot.yaml`

  ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: nginx
spec:
  collectors:
     - logs:
        selector:
          - app=nginx
  analyzers:
    - deploymentStatus:
        name: nginx
        outcomes:
          - fail:
              when: replicas < 2
  ```

`manifests/mysql/troubleshoot.yaml`*

  ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: mysql
spec:
  collectors:
    - mysql:
        uri: 'dbuser:**REDACTED**@tcp(db-host)/db'
  analyzers:
    - mysql:
        checkName: Must be version 8.x or later
        outcomes:
          - fail:
              when: version < 8.x
```

`manifests/redis/troubleshoot.yaml`

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: redis
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: rediss://default:password@hostname:6379
```

Then, you can generate a single support bundle archive in your development environment, if you want to test it. For more information, see [Generate a Single Support Bundle Archive](/enterprise/troubleshooting-an-app/#generate-a-single-support-bundle-archive).

### Enable Discoverability of Support Bundle Specifications

To make Kubernetes resources discoverable in a cluster, you add a specification as `Kind: Secret`. Make sure that your specification includes the label `troubleshoot.io/kind: supportbundle` and a `data` key matching `support-bundle-spec`. 

Custom resource definitions (CRDs) are not available for support bundles or preflights, so they must be wrapped in a secret. 

[`kURL/addons/flannel/template/yaml/troubleshoot.yaml`](https://github.com/adamancini/kURL/blob/main/addons/flannel/template/base/yaml/troubleshoot.yaml)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: flannel-troubleshoot-spec
  labels:
    troubleshoot.io/kind: supportbundle
stringData:
  support-bundle-spec: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: flannel
    spec:
      uri: https://raw.githubusercontent.com/replicatedhq/kURL/main/addons/flannel/template/yaml/troubleshoot.yaml
      collectors: [...]
      analyzers: [...]
```

Create the resource from your manifest:

```shell
kubectl apply -f kURL/addons/flannel/template/yaml/troubleshoot.yaml
# secret default/flannel-troubleshoot-spec created
```

Then you can use any of the specifications from your development cluster to test generating an aggregated support bundle. For information about how to run discovery and generate a bundle, [Discover Specifications and Generate a Support Bundle](/enterprise/troubleshooting-an-app/#discover-specifications-and-generate-a-support-bundle).

 For real world use cases, see the [troubleshoot-specs repo](https://github.com/replicatedhq/troubleshoot-specs) on GitHub.