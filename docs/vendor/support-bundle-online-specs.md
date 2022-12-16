# Online Support Bundle Specifications

You can make the definition of a support bundle specification available online.  The Troubleshoot schema supports a `uri://` field that, when set, causes the support bundle to use the specification at that URI.  Any additional collectors or analyzers in the original specification are used as a fallback in case the URI is unreachable or unparseable. For more information about the URI, see [Troubleshoot schema supports a `uri://` field](https://troubleshoot.sh/docs/support-bundle/supportbundle/#uri) in the _Troubleshoot.sh_ docs.

## Use a Self-Link to a Source Repository

Including a self-link to a source repository in a support bundle specification helps to ensure that the latest online Troubleshoot.sh specification is available to your support bundle. This lets you use the support bundle to detect potential problems in your end customer environments and let the know know how to fix it instead of waiting for the next time customers to upgrade their application or Kubernetes version and get notified of the potential problem.

For example, the Replicated Kubernetes installer includes the [EKCO](https://kurl.sh/docs/add-ons/ekco) add-on for maintenance on Kubernetes installer (embedded) clusters, such as automating certificate rotation or data migration tasks. You can make sure that embedded cluster installations include this add-on by packaging your application with a Replicated [support bundle](https://docs.replicated.com/vendor/preflight-support-bundle-creating#customize-a-support-bundle) custom resource that is configured to warn users if they do not have this add-on installed, or if it is not running in the cluster. 

**Example:**

```yaml
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

If you release this specification with EKCO 0.1.0 and later on you discover that there is a bug that you can write an [analyzer](https://troubleshoot.sh/docs/analyze/) for, you might have to wait until a cluster upgrade before users get the benefit of that new analyzer.  However, if you include a self-link to this specification, then Troubleshoot uses the assets hosted in your project, which you can keep up to date.  We have a spec hosted on [GitHub](https://github.com/replicatedhq/troubleshoot-specs/blob/main/in-cluster/ekco.yaml) and we'll be sure to get the raw file link from the browser.

```yaml
  uri: https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/ekco.yaml
  collectors: [...]
  analyzers: [...]
```

With the addition of the `uri:` property, Troubleshoot will get the most up to date spec if it can, and then fall back to what we wrote for the 0.1.0 release at the time.  See [our blog post](https://www.replicated.com/blog/debugging-kubernetes-enhancements-to-troubleshoot/#Using-online-specs-for-support-bundles) for the complete example.
