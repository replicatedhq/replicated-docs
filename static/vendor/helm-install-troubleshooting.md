# Troubleshoot Helm Installations with Replicated

This topic provides troubleshooting information for common issues related to performing installations and upgrades with the Helm CLI.

## Installation Fails for Release With Multiple Helm Charts {#air-gap-values-file-conflict}

#### Symptom

When performing installing a release with multiple Helm charts, the installation fails. You might also see the following error message:

```
Error: INSTALLATION FAILED: cannot re-use a name that is still in use
```

#### Cause

In the Download Portal, each chart's values file is named according to the chart's name. For example, the values file for the Helm chart Gitea would be named `gitea-values.yaml`.

If any top-level charts in the release use the same name, the associated values files will also be assigned the same name. This causes each new values file downloaded with the `helm show values` command to overwrite any previously-downloaded values file of the same name.

#### Solution

Replicated recommends that you use unique names for top-level Helm charts in the same release.

Alternatively, if a release contains charts that must use the same name, convert one or both of the charts into subcharts and use Helm conditions to differentiate them. See [Conditions and Tags](https://helm.sh/docs/chart_best_practices/dependencies/#conditions-and-tags) in the Helm documentation.