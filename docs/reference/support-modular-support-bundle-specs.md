# About Creating Modular Support Bundle Specs

This topic describes how to use a modular approach to creating support bundle specs.

## Overview

Support bundle specifications can be designed using a modular approach. This refers to creating multiple different specs that are scoped to individual components or microservices, rather than creating a single, large spec. For example, for applications that are deployed as multiple Helm charts, vendors can create a separate support bundle spec in the `templates` directory in the parent chart as well as in each subchart. 

This modular approach helps teams develop specs that are easier to maintain and helps teams to avoid merge conflicts that are more likely to occur when making to changes to a large spec. When generating support bundles for an application that includes multiple modular specs, the specs are merged so that only one support bundle archive is generated.

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