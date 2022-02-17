# Planning checklist

This is a lightweight checklist to help you plan the packaging of your application. This list helps you explore the Replicated features and integrate the ones that will help your end users be successful in deploying and running your application.

This document includes implementation steps and a questionnaire for your end users to help you better understand the specifics of their environments.

## Implementation Checklist



### Allowing Rollbacks

If an application is guaranteed not to introduce backwards-incompatible versions (e.g. via database migrations), the [allowRollback](../reference/custom-resource-application#allowrollback) flag can allow end users to easily roll back to previous versions (this will not revert any state, just the YAML manifests that are applied to the cluster).


### Managing Stateful Services

In the [persistent datastores guide](tutorial-adding-db-config), we review best practices for integrating persistent stores like databases, queues, and caches.
Explore ways to give an end user the option to either embed an instance alongside the application, or connect an application to an external instance that they will manage.

If you expect to also install stateful services into existing clusters, you'll likely want to expose [preflight analyzers that check for the existence of a storage class](https://troubleshoot.sh/reference/analyzers/storage-class/).

If you're allowing end users to provide connection details for external databases, you can often use a troubleshoot.sh built-in [collector](https://troubleshoot.sh/docs/collect/) and [analyzer](https://troubleshoot.sh/docs/analyze/) to validate the connection details for [Postgres](https://troubleshoot.sh/docs/analyze/postgresql/), [Redis](https://troubleshoot.sh/docs/collect/redis/), and many other common datastores. These can be included in both `Preflight` and `SupportBundle` specs.

### Namespaces

It is *strongly* advised that applications be architected to deploy a single application into a single namespace when possible. This will give the most flexibility when deploying to end user environments.
Most notably, it allows you to run with minimal Kubernetes permissions, which can reduce friction when an app runs as a tenant in a large cluster.
Don't specify a namespace in your YAML resources, or try to make this user-configurable using the `kots.io` `Config` object, just leave namespace blank.

Letting the end user manage namespaces is the easiest way to reduce friction.

```yaml
# good, namespace absent
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spline-reticulator
spec:
```

```yaml
# bad, hardcoded
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spline-reticulator
  namespace: graphviz-pro
spec:
```

```yaml
# bad, configurable
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spline-reticulator
  namespace: repl{{ ConfigOption "gv_namespace" }}
spec:
```








### Building a Collaborative Workflow

We recommend using a git-based workflow, as presented in the [app manager starter repo](https://github.com/replicatedhq/replicated-starter-kots).
This will allow teams to map git branches to channels in the [vendor portal](https://vendor.replicated.com), and allow multiple team members to seamlessly collaborate across features and releases.

### Tagging Releases for Production

In addition to the starter GitHub actions workflow included in the [`replicated-starter-kots` repo](https://github.com/replicatedhq/replicated-starter-kots), Replicated provides a [tag-based workflow
](https://github.com/replicatedhq/replicated-starter-kots/tree/main/.github/workflows/main.yml).
It adds logic for making production releases using git tags.

The recommended workflow is:

- On pushes to the `main` branch, create a release on unstable with the name `Unstable-${SHA}`
- On pushing a git tag, create a release on the beta branch, using the name `Beta-${TAG}` for the release version.
- Our recommendation is that these tags be tested, and then the release be manually promoted to the `Stable` channel using the  [vendor portal](https://vendor.replicated.com). Using manual promotion allows you to restrict which team members can publish new versions to go out to users via RBAC roles in the vendor portal.

## Additional resources

- [EnterpriseReady](https://enterpriseready.io) is a great guide for understanding all the dimensions of product that contribute to making your application "enterprise ready".
