import PreflightsAddAnalyzers from "../partials/preflights/_preflights-add-analyzers.mdx"
import PreflightsAddStrict from "../partials/preflights/_preflights-add-strict.mdx"
import PreflightsKotsGuidance from "../partials/preflights/_preflights-kots-guidance.mdx"


# Define KOTS Preflight Checks

You define preflight checks based on your application needs. Preflight checks are not included by default. This procedure provides a basic understanding and some key considerations to help guide you. For more information about defining preflight checks, see [Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/), [Collecting Data](https://troubleshoot.sh/docs/collect/), and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation.

<PreflightsKotsGuidance/>

To define preflight checks for KOTS, create a Preflight custom resource manifest file (`kind: Preflight`) in your release.

**Example:**

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: supported-mysql-version
spec:
  collectors:
    - mysql:
        collectorName: mysql
        uri: 'repl{{ ConfigOption "db_user" }}:repl{{ConfigOption "db_password" }}@tcp(repl{{ ConfigOption "db_host" }}:repl{{ConfigOption "db_port" }})/repl{{ ConfigOption "db_name" }}'
    analyzers:
    - mysql:
        strict: true
        checkName: Must be MySQL 8.x or later
        collectorName: mysql
        outcomes:
          - fail:
              when: connected == false
              message: Cannot connect to MySQL server
          - fail:
              when: version < 8.x
              message: The MySQL server must be at least version 8
          - pass:
              message: The MySQL server is ready
```

### Collectors

Add collectors to define information to be collected for analysis during the analyze phase. For example, you can collect information about the MySQL version that is running in a cluster:

   ```yaml
   apiVersion: troubleshoot.sh/v1beta2
   kind: Preflight
   metadata:
      name: supported-mysql-version
   spec:
      collectors:
        - mysql:
            collectorName: mysql
            uri: 'repl{{ ConfigOption "db_user" }}:repl{{ConfigOption "db_password" }}@tcp(repl{{ ConfigOption "db_host" }}:repl{{ConfigOption "db_port" }})/repl{{ ConfigOption "db_name" }}'
   ```

Replicated recommends using a template function for the URI to avoid exposing sensitive information. For more information about template functions, see [About Template Functions](/reference/template-functions-about).

### Analyzers

<PreflightsAddAnalyzers/>

### `strict` Analyzers

<PreflightsAddStrict/> 

For more information about cluster privileges, see `requireMinimalRBACPrivileges` for name-scoped access in [Configuring Role-Based Access](packaging-rbac#namespace-scoped-access).

The following example shows a strict analyzer for MySQL versions:

```yaml
spec:
  collectors:
    - mysql:
        collectorName: mysql
        uri: 'repl{{ ConfigOption "db_user" }}:repl{{ConfigOption "db_password" }}@tcp(repl{{ ConfigOption "db_host" }}:repl{{ConfigOption "db_port" }})/repl{{ ConfigOption "db_name" }}'
  analyzers:
    - mysql:
        strict: true
        checkName: Must be MySQL 8.x or later
        collectorName: mysql
        outcomes:
          - fail:
              when: connected == false
              message: Cannot connect to MySQL server
          - fail:
              when: version < 8.x
              message: The MySQL server must be at least version 8
          - pass:
              message: The MySQL server is ready
```

## Next Step

Save and promote the release to a development environment to test your changes. For more information about installing with KOTS, see [About Installing an Application](/enterprise/installing-overview).


