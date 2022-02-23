# Cleaning Up Kubernetes Jobs

Kubernetes [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/) are designed to run and then terminate, but they stick around in the namespace after completion.
Because job objects are immutable, this can cause conflicts and errors when attempting to update the job later.

A common workaround is to use a content SHA from the job object in the name.
This is fine, but a release can be updated from various events (upstream update, license sync, config update, CLI upload). If the job is already completed, it's an error to re-apply the same job to the cluster again.

When running a cluster using the Replicated admin console, the built-in operator/controller can help by deleting jobs on completion.
This allows the same job to be deployed again, and not pollute the namespace with completed jobs.

To enable this, when creating a job object, specify a delete hook policy as an annotation on the job object.
The annotation key is always `kots.io/hook-delete-policy`, and there are two possible values (you can use both simultaneously): `hook-succeeded` and `hook-failed`.
When this annotation is present and includes `hook-succeeded`, the job will be deleted when it completes successfully.
If this annotation is present and includes `hook-failed`, the job will be deleted on failure.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
  annotations:
    "kots.io/hook-delete-policy": "hook-succeeded, hook-failed"
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4
```

## Helm Charts

This syntax is very similar to the Helm hook syntax.
When the Replicated app manager encounters an upstream Helm chart with a `helm.sh/hook-delete-policy` annotation, it adds the same `kots.io/hook-delete-policy` automatically to the job object.
This means that there's nothing extra to configure when deploying a Helm chart with Helm delete hooks.
