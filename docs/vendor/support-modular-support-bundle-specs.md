# About Modular Specifications

Preflight and support bundle specifications can be designed using a modular approach. This helps teams develop specifications that are scoped to individual components or microservices in a large application and avoid merge conflicts.

For support bundles, customers can use the support-bundle CLI to generate a merged support bundle archive from multiple resources. For more information, see [Example: Support Bundle Specifications by Component](#component) below.


## Example: Support Bundle Specifications by Component {#component}

Using a modular approach for an application that ships MySQL, NGINX, and Redis, your team can add collectors and analyzers in using a separate support bundle specification for each component.

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

A single support bundle archive can be generated from a combination of these manifests using the `kubectl support-bundle --load-cluster-specs` command. 
For more information and additional options, see [Generating Support Bundles](support-bundle-generating).