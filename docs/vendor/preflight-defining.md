# Defining Preflight Checks

You define preflight checks based on your application needs. Preflight checks are not included by default. This procedure provides a basic understanding and some key considerations to help guide you.

For more information about defining preflight checks, see [Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/), [Collecting Data](https://troubleshoot.sh/docs/collect/), and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation. For basic examples of checking CPU, memory, and disk capacity, see [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/) in the Troubleshoot documentation.

## Define App Manager Preflight Checks

To define preflight checks for app manager installations:

1. Create a Preflight custom resource manifest file (`kind: Preflight`) in your release.

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: Preflight
      metadata:
         name: collectors
      spec:
         collectors: []
     ```
1. Add collectors to define information to be collected for analysis during the analyze phase. For example, you can collect information about the MySQL version that is running in a cluster.

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

    Replicated recommends replacing using a template function for the URI to avoid exposing sensitive information. For more information about template functions, see [[About Template Functions](/reference/template-functions-about).

1. Add analyzers to analyze the data from the collectors that you specified. Define the criteria for the pass, fail, and/or warn outcomes and specify custom messages for each. For example, you can set a `fail` outcome if the MySQL version is less than the minimum required. Then, specify a message to display that informs your customer of the reasons for the failure and steps they can take to fix the issue.

1. (Optional) Set any preflight analyzers to `strict: true` if you want to enforce requirements for the chosen analyzers. Note the following considerations:
    - Any `fail` outcomes for that analyzer block the deployment of the release until your specified requirement is met.
    -  If a `strict` collector requires cluster scope and minimal RBAC mode is set, then the collector is skipped during the preflight check.
    - Strict preflight analyzers are ignored if the `exclude` flag is also used.

    For more information about strict preflight checks, see [`strict`](https://troubleshoot.sh/docs/analyze/#strict) in the Troubleshoot documentation. For more information about cluster privileges, see `requireMinimalRBACPrivileges` for name-scoped access in [Configuring Role-Based Access](packaging-rbac#namespace-scoped-access).

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

1. Add the manifest files to the application that you are packaging and distributing with Replicated.

1. Save and promote the release to a development environment to test your changes.
