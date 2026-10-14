import CollectorCredentialsWarning from "../partials/support-bundles/_collector-credentials-warning.mdx"

# Combine support bundle specs

This topic describes how support bundle specs are combined, and how to use multiple specs to organize the collectors and analyzers for your application.

## Overview

Support bundles are often generated from more than one spec. When a customer generates a support bundle from the KOTS Admin Console or with `kubectl support-bundle --load-cluster-specs`, every Secret or ConfigMap in the cluster with the `troubleshoot.sh/kind: support-bundle` label is discovered, and the specs are combined into one support bundle archive.

Many applications already rely on this behavior. For example, the Replicated SDK deploys its own support bundle spec in a separate Secret, and that spec is combined with yours to add application and license information to the bundle. Embedded Cluster also combines its default host and cluster spec with the specs in your release. For more information, see [RBAC requirements for exec collectors](/vendor/support-bundle-customizing#exec-rbac) and [Generate support bundles for Embedded Cluster](/vendor/support-bundle-embedded).

Because specs are combined, you can split your collectors and analyzers across multiple specs instead of maintaining one large spec. Common ways to organize specs include:

* One spec for each component or subchart. For applications that are deployed as multiple Helm charts, you can add a spec to the `templates` directory of the parent chart and of each subchart.
* One spec for each third-party dependency that your application runs alongside, such as a database or a Prometheus server. See [Collect Prometheus metrics](/vendor/support-bundle-examples#prometheus) in _Example support bundle specs_.
* Specs that are included only when a component is enabled, using Helm template conditionals. See [Use Helm templates in specifications](/vendor/preflight-sb-helm-templates-about).

Smaller specs are easier to maintain, and teams are less likely to have merge conflicts than when they all edit one large spec. You can also include the same collector type as many times as needed, in one spec or across several. For example, use one `logs` collector for each label selector, or one collector for each query that you want to run.

## Example: Support bundle specifications by component {#component}

For an application that ships MySQL, NGINX, and Redis, your team can add collectors and analyzers using a separate support bundle spec for each component.

`manifests/nginx/troubleshoot.yaml`

This collector and analyzer checks compliance for the minimum number of replicas for the NGINX component:

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

`manifests/mysql/troubleshoot.yaml`

This collector and analyzer checks compliance for the minimum version of the MySQL component:

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

This collector and analyzer checks that the Redis server is responding:

<CollectorCredentialsWarning/>

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: redis
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: rediss://default:<PASSWORD>@hostname:6379
```

A single support bundle archive can be generated from a combination of these manifests using the `kubectl support-bundle --load-cluster-specs` command. 
For more information and additional options, see [Generate Support Bundles](support-bundle-generating).