# Planning checklist

This is a lightweight checklist to help you plan the packaging of your application. This list helps you explore the Replicated features and integrate the ones that will help your end users be successful in deploying and running your application.

This document includes implementation steps and a questionnaire for your end users to help you better understand the specifics of their environments.

## Implementation Checklist

### Basic Whitelabeling

All applications should be whitelabeled with [a title and an icon](custom-resource-application#title).

### Status Informers

Applications should integrate [StatusInformers](admin-console-display-app-status) to ensure information about app readiness is presented to the user during initial install and start-up.

### Allowing Rollbacks

If an application is guaranteed not to introduce backwards-incompatible versions (e.g. via database migrations), the [allowRollback](custom-resource-application#allowrollback) flag can allow end users to easily roll back to previous versions (this will not revert any state, just the YAML manifests that are applied to the cluster).


### Adding Preflight Checks

Adding preflight checks to validate an end user's environment is a great way to streamline initial installations and greatly reduce the number of support escalations when installing an application.
There are a number of basic examples for checking CPU, memory, and disk capacity under the [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/).


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

### Helm

Helm charts are supported by the app manager but are not required.
If for applications that are already packaged using Helm, then the Helm support in the app manager can help get an app packaged faster.
If an application does not presently use Helm, there's no requirement to use Helm, as the the app manager built-in templating includes much of the same functionality, and the admin console includes a deep [kustomize.io integration](../enterprise/updating-patching-with-kustomize) to greatly reduce the amount of templating required by app maintainers in the first place.

### Operators
Operators are good for specific use cases, we've written in-depth about them in our [Operators Blog Post](https://blog.replicated.com/operators-in-kots/).
In general, we recommend thinking deeply about the problem space an application solves before going down the operator path. They're really cool and powerful, but take a lot of time to build and maintain.


### Bundling and Analyzing Logs with Support bundle

A robust support bundle is essential to minimizing back-and-forth when things go wrong.
At a very minimum, every app's support bundle should contain logs for an application's core pods.
Usually this will be done with label selectors. To get the labels for an application, either inspect the YAML, or run the following YAML against a running instance to see what labels are used:

```shell
kubectl get pods --show-labels
```

Once the labels are discovered, a [logs collector](https://troubleshoot.sh/reference/collectors/pod-logs/) can be used to include logs from these pods in a bundle.
Depending on the complexity of an app's labeling schema, you may need a few different declarations of the `logs` collector.

As common issues are encountered in the field, it will make sense to add not only collectors but also analyzers to an app's troubleshooting stack. For example, when an error in a log file is discovered that should be surfaced to an end user in the future, a simple [Text Analyzer](https://troubleshoot.sh/reference/analyzers/regex/) can detect specific log lines and inform an end user of remediation steps.


### Adding Prometheus Graphs

If an application exposes Prometheus metrics, we recommend integrating [Custom Graphs](admin-console-prometheus-monitoring) to expose these metrics to end users.


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


## Application Deployment Questionnaire

When packaging an application, it can be useful to get a sense of your environments you'll being deploying into.
You can copy and customize questionnaire, and replace $APP with your application name for distribution to your end users.

### $APP Deployment Questionnaire

#### Infrastructure

This section includes questions about your infrastructure and how you deploy software, both internally written and Commercial Off The Shelf (COTS) applications.
If it’s more convenient, limit answers to the scope of the target infrastructure for deploying $APP.

- Do you use any IaaS like AWS, GCP, or Azure?

- If you deploy to a physical datacenter, do you use a Hypervisor like VSphere?

- Do you ever install on bare metal?

- Do you have any restrictions on what operating systems are used?

- Does the target infrastructure have a direct outbound internet connection? Can it connect out via a Proxy?

- If the environment has no outbound network, do machines in a DMZ have direct network access to the air gapped infrastructure, or do release artifacts need to be copied to physical media for installation?

- If there is an issue causing downtime in the on-prem application, would you be willing to give the $APP team direct SSH access to the instance(s)?

#### Deployment

- This section covers your development and deployment processes.

- Do you require applications be deployed by a configuration management framework like Chef, Ansible, or Puppet?

- Do you run any container-based workloads today?

- If you run container workloads, do you run any kind of orchestration like Kubernetes, Mesos, or Docker Swarm?

- If you run container workloads, what tools do you use to host and serve container images?

- If you run container workloads, what tools do you use to scan and secure container images?

- If you are deploying $APP to your existing Kubernetes cluster, can your cluster nodes pull images from the public internet, or do you require images to be stored in an internal registry?

#### Change Management

- How do you test new releases of COTS software? Do you have a UAT or Staging environment? Are there other change management requirements?

- How often do you like to receive planned (non-critical) software updates? Quarterly? Monthly? As often as possible?

- For critical updates, what is your target deployment time for new patches? Do you have a requirement for how quickly patches are made available after a vulnerability is announced?

- Do you drive production deploys automatically from version control (“gitops”)?


#### Application Usage

This section covers your product requirements from a usage and policy point of view.

- For applications that expose a web UI, how will you be connecting to the instance? As much as possible, include details about your workstation, any tunneling/VPN/proxy infrastructure, and what browsers you intend to use.

- Do you require a disaster recovery strategy for deployed applications? If so, where are backups stored today? (SFTP? NAS? S3-compliant object store? Something else?)

- Do you require deployed COTS applications to support logins with an internal identity provider like OpenLDAP, Windows AD or SAML?

- Do you require an audit log of all user activity performed in $APP? What are your needs around exporting / aggregating audit log data?

- Do you anticipate the need to scale the capacity of $APP up and down during its lifetime?

- What are your requirements around log aggregation? What downstream systems do you need system logs to be piped to?

## Additional resources

- [EnterpriseReady](https://enterpriseready.io) is a great guide for understanding all the dimensions of product that contribute to making your application "enterprise ready".
