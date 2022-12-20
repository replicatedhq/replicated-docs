# Online Support Bundle Specifications

You can make the definition of a support bundle specification available online. The schema supports a `uri://` field that, when set, causes the support bundle to use the specification at that URI.  Any collectors or analyzers in the original specification are used as a fallback in case the URI is unreachable or unparseable. For more information about the URI, see [Troubleshoot schema supports a `uri://` field](https://troubleshoot.sh/docs/support-bundle/supportbundle/#uri) in the _Troubleshoot.sh_ docs.

## Use a Self-Link to a Source Repository

Including a self-link to a source repository in a support bundle specification helps to ensure that the latest online specification is available to your support bundle. With this method, the support bundle proactively detects potential problems in end customer environments and let them know know how to fix it. Without the self-link option, you must wait for the next time your customers upgrade their applications or Kubernetes versions to get notified of potential problems.

For example, the Replicated Kubernetes installer includes the [EKCO](https://kurl.sh/docs/add-ons/ekco) add-on for maintenance on Kubernetes installer (embedded) clusters, such as automating certificate rotation or data migration tasks. You can package your application with a Replicated [Support Bundle](https://docs.replicated.com/vendor/preflight-support-bundle-creating#customize-a-support-bundle) custom resource that is configured to warn users if they do not have this add-on installed, or if it is not running in the cluster. 

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

If you release this specification with EKCO 0.1.0 and later on discover that there is a bug that you can write an [analyzer](https://troubleshoot.sh/docs/analyze/) for, you might have to wait until a cluster upgrade before users get the benefit of that new analyzer.  However, if you include a self-link to this specification, then the support bundle uses the assets hosted in your project, which you can keep up to date. Troubleshoot has a specification hosted on [GitHub](https://github.com/replicatedhq/troubleshoot-specs/blob/main/in-cluster/ekco.yaml) and gets the raw file link from the browser.

```yaml
  uri: https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/ekco.yaml
  collectors: [...]
  analyzers: [...]
```

With the addition of the `uri:` property, Troubleshoot gets the latest specification if it can, or it falls back to the earlier release so that collection and analysis continue to work.  

## Related Topic

Blog Post: [Debugging Kubernetes: Enhancements to Troubleshoot](https://www.replicated.com/blog/debugging-kubernetes-enhancements-to-troubleshoot/#Using-online-specs-for-support-bundles)
