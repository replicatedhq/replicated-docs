# Process Violation Testing

Many enterprises have specific processes and environments that are more restrictive than vanilla cloud providers distributions.

The Process Violation Testing incorporates an eBPF agent on each test to report any activity taken by the application that might trigger security or process violations in end customers or compatibility with security-restricted clusters and environments.

Currently, we use Falco and a predefined set of rules that we've curated and assembled from end-customer requirements.

It's important that you run end-to-end tests or some other automation to simulate standard workflows and usage of your application before generating the report. Application activity is what often triggers process violations.

You can view the process violation testing report in CI (GitHub Actions) or using the replicated CLI.


### GitHub Actions

????????????????????????????

### Replicated CLI

After deploying your application and running your application tests:

```bash
replicated cluster report --id <cluster-id> --format <text|json>
```