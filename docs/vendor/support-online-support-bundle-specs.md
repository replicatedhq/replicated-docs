# About Online Support Bundle Specifications

You can make the definition of one or more support bundle specifications available online in a source repository and link to it from the specification in the cluster. The schema supports a `uri://` field that, when set, causes the support bundle generation to use the online specification. If the URI is unreachable or unparseable, any additional collectors or analyzers in the specification in the cluster are used as a fallback. 

You can keep the online specification current with collectors and analyzers to manage bug fixes. When a customer generates a support bundle, the online specification can detect those potential problems in the cluster and let them know know how to fix it. Without the URI link option, you must wait for the next time your customers update their applications or Kubernetes versions to get notified of potential problems. This option is particularly useful for customers that do not update their application routinely.

If you are using a modular approach to designing support bundles, you can use multiple online specifications. Each specification supports one  URI link. For more information about modular specifications, see [About Creating Modular and Discoverable Support Bundles](support-modular-support-bundle-specs).

## Example: URI Linking to a Source Repository

This example shows how Replicated could set up a URI link for one of its own components. You can follow a similar process to link to your own online repository for your support bundles.

The Replicated Kubernetes installer includes the EKCO add-on for maintenance on Kubernetes installer clusters (embedded clusters), such as automating certificate rotation or data migration tasks. 
Replicated can ship this component with a support bundle manifest that warns users if they do not have this add-on installed or if it is not running in the cluster. For more information about support bundles, see [Customize a Support Bundle](preflight-support-bundle-creating#customize-a-support-bundle).

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name:  ekco
spec:
  collectors:
  analyzers:
    - deploymentStatus:
        checkName: Check EKCO is operational
        name: ekc-operator
        namespace: kurl
        outcomes:
          - fail:
              when: absent
              message: EKCO is not installed - please add the EKCO component to your kURL spec and re-run the installer script
          - fail:
              when: "< 1"
              message: EKCO does not have any ready replicas
          - pass:
              message: EKCO has at least 1 replica
```

If a bug is discovered at any time after the release of the specification above, Replicated can write an analyzer for it in an online specification. Typically, Replicated might have to wait until a cluster upgrade before users get the benefit of the new analyzer. By adding a URI link to the online specification, the support bundle uses the assets hosted in the online repository, which is kept current. 

The link is added in the `uri` field as a raw file link to the specification that is hosted on [GitHub](https://github.com/replicatedhq/troubleshoot-specs/blob/main/in-cluster/ekco.yaml):

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: ekco
spec:
  uri: https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/ekco.yaml
  collectors: [...]
  analyzers: [...]
```

Using the `uri:` property, the support bundle gets the latest online specification if it can, or falls back to the collectors and analyzers listed in the specification that is in the cluster.  For more information about the URI, see [Troubleshoot schema supports a `uri://` field](https://troubleshoot.sh/docs/support-bundle/supportbundle/#uri) in the Troubleshoot documentation. For a complete example, see [Debugging Kubernetes: Enhancements to Troubleshoot](https://www.replicated.com/blog/debugging-kubernetes-enhancements-to-troubleshoot/#Using-online-specs-for-support-bundles) in The Replicated Blog.
