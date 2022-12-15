# Modular & Discoverable Support Bundle and Redactor specs

## Merge specs into a single Support Bundle archive

Support bundle specs can be designed in a modular fashion.  The Troubleshoot CLI can take [multiple specs as input](), and will handle merging the `collectors:` and `analyzers:` property into a single support bundle.  Thus, teams can more easily develop specs that are scoped to individual components or microservices in a large application.

For instance, in an application that ships MySQL, nginx, and redis, your team might consider adding some [collectors](https://troubleshoot.sh/docs/collect/) and [analyzers](https://troubleshoot.sh/docs/analyze/) for each component:

> manifests/nginx/troubleshoot.yaml

```yaml
...
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

> manifests/mysql/troubleshoot.yaml

```yaml
...
spec:
  collectors:
    - mysql:
        uri: 'dbuser:<redacted>@tcp(db-host)/db'
  analyzers:
    - mysql:
        checkName: Must be version 8.x or later
        outcomes:
          - fail:
              when: version < 8.x
```

> manifests/redis/troubleshoot.yaml

```yaml
...
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: rediss://default:password@hostname:6379
```

And a Support Bundle can be generated from a combination of these manifests:

```bash
kubectl support-bundle manifests/redis/troubleshoot.yaml manifests/mysql/troubleshoot.yaml manifests/nginx/troubleshoot.yaml
```

You can also refer to Kubernetes resources like Secrets or ConfigMaps

## Adding specs to the cluster as Kubernetes resources for discoverability

And Support Bundle specs can be added to the cluster as Secrets

The analysis screen will show the results of all the Analyzers defined in your chosen manifests, and all the contents will be available in a single bundle.  Have a look at our [troubleshoot-specs repo on GitHub](https://github.com/replicatedhq/troubleshoot-specs) for some real world use cases.

**Note: getting a merged Support Bundle will be available from the Admin Console soon; right now this is available only from the Troubleshoot CLI**
