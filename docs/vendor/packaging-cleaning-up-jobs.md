# Cleaning Up Kubernetes Jobs

This topic describes how to use the Replicated KOTS `kots.io/hook-delete-policy` annotation to remove Kubernetes job objects from the cluster after they complete.

## About Kubernetes Jobs

Kubernetes Jobs are designed to run and then terminate. But, they remain in the namespace after completion. Because Job objects are immutable, this can cause conflicts and errors when attempting to update the Job later.

A common workaround is to use a content SHA from the Job object in the name. However, a user can update their application instance through various events (upstream update, license sync, config update, CLI upload). If the Job is already completed, it is an error to reapply the same job to the cluster again.

The built-in Replicated KOTS operator/controller can help by deleting Jobs upon completion.
This allows the same Job to be deployed again without polluting the namespace with completed Jobs.

For more information about Job objects, see [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/) in the Kubernetes documentation.

## KOTS `hook-delete-policy` Annotation

To enable the built-in KOTS operator/controller to automatically delete Jobs when they complete, specify a delete hook policy as an annotation on the Job object.

The KOTS annotation key is `kots.io/hook-delete-policy` and there are two possible values (you can use both simultaneously): `hook-succeeded` and `hook-failed`.

When this annotation is present and includes `hook-succeeded`, the job is deleted when it completes successfully.
If this annotation is present and includes `hook-failed`, the job is deleted on failure.

For Helm charts deployed with KOTS, KOTS automatically adds this `kots.io/hook-delete-policy` annotation to any Job objects in the Helm chart that include a `helm.sh/hook-delete-policy` annotation. This means that there is nothing extra to configure when deploying a Helm chart with Helm delete hooks.

The following example shows a Job object with the `kots.io/hook-delete-policy` annotation:

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