# Process Violation Testing

Many enterprises have specific processes and environments that are more restrictive than typical cloud provider distributions.

Process violation testing incorporates an eBPF agent on each test to report any activity taken by the application that might trigger security or process violations in end customers or compatibility with security-restricted clusters and environments.

Replicated uses Falco and a predefined set of rules that Replicated curated and assembled from end customer requirements.

Because application activity is what often triggers process violations, it is important that you run end-to-end tests or some other automation to simulate standard workflows and usage of your application before generating the process violation testing report.

You can view the process violation testing report in CI (using GitHub Actions) or using the replicated CLI.


### GitHub Actions

????????????????????????????

### Replicated CLI

After deploying your application and running your application tests:

```bash
replicated cluster report --id ID --format [text|json]
```

Replace `ID` with the ID of the test cluster.

For the `--format` value, specify `text` or `json` for the output format of the report.