# Online Troubleshoot Specs

You can make the definition of a Troubleshoot specification available online.  The [Troubleshoot schema supports a `uri://` field](https://troubleshoot.sh/docs/support-bundle/supportbundle/#uri) that, when set, causes the Support Bundle to use the spec at that URI.  Any additional `collectors` or `analyzers` in the original spec will be used as fallback in case the URI is unreachable or unparseable.

## Use a self-link to a source repo

We ship a Kubernetes component called [EKCO](https://kurl.sh/docs/add-ons/ekco) for maintenance on Replicated embedded clusters, and we want to make sure that if you are using an embedded cluster, that you have this addon installed in order to automate certain cluster tasks, such as certificate rotation or data migrations.  We might want to ship our component with a [Support Bundle](https://docs.replicated.com/vendor/preflight-support-bundle-creating#customize-a-support-bundle) manifest that helps warn users if they do not have this addon installed, or if it is not running in the cluster:

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

If we release this spec with EKCO 0.1.0 and later on we discover that there's a bug we can write an [analyzer]() for, we might have to wait until a cluster upgrade before users get the benefit of that new analyzer.  If we include a self-link to this spec, then Troubleshoot will use the assets hosted in our project, which we can keep up to date.  We have a spec hosted on [GitHub](https://github.com/replicatedhq/troubleshoot-specs/blob/main/in-cluster/ekco.yaml) and we'll be sure to get the raw file link from the browser.

```yaml
  uri: https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/ekco.yaml
  collectors: [...]
  analyzers: [...]
```

With the addition of the `uri:` property, Troubleshoot will get the most up to date spec if it can, and then fall back to what we wrote for the 0.1.0 release at the time.
