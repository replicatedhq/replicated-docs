# Troubleshooting backup and restore

When a snapshot fails, a support bundle will be collected and stored automatically.
Because this is a point-in-time collection of all logs and system state at the time of the failed snapshot, this is a good place to view the logs.

## Velero is crashing

If Velero is crashing and not starting, some common causes are:

#### Invalid cloud credentials

If the cloud access credentials are invalid or do not have access to the location in the configuration, Velero will crashloop. The Velero logs will be included in a support bundle, and the message will look like this.
If this is the case, recommend that the access key / secret or service account json are validated.

```shell
time="2020-04-10T14:22:24Z" level=info msg="Checking existence of namespace" logSource="pkg/cmd/server/server.go:337" namespace=velero
time="2020-04-10T14:22:24Z" level=info msg="Namespace exists" logSource="pkg/cmd/server/server.go:343" namespace=velero
time="2020-04-10T14:22:27Z" level=info msg="Checking existence of Velero custom resource definitions" logSource="pkg/cmd/server/server.go:372"
time="2020-04-10T14:22:31Z" level=info msg="All Velero custom resource definitions exist" logSource="pkg/cmd/server/server.go:406"
time="2020-04-10T14:22:31Z" level=info msg="Checking that all backup storage locations are valid" logSource="pkg/cmd/server/server.go:413"
An error occurred: some backup storage locations are invalid: backup store for location "default" is invalid: rpc error: code = Unknown desc = NoSuchBucket: The specified bucket does not exist
        status code: 404, request id: BEFAE2B9B05A2DCF, host id: YdlejsorQrn667ziO6Xr6gzwKJJ3jpZzZBMwwMIMpWj18Phfii6Za+dQ4AgfzRcxavQXYcgxRJI=
```


#### Invalid top-level directories

Another commonly seen problem in Velero starting is a reconfigured or re-used bucket.
When configuring Velero to use a bucket, the bucket cannot contain other data, or Velero will crash.  
In this case, the error in the Velero logs will be:

```shell
time="2020-04-10T14:12:42Z" level=info msg="Checking existence of namespace" logSource="pkg/cmd/server/server.go:337" namespace=velero
time="2020-04-10T14:12:42Z" level=info msg="Namespace exists" logSource="pkg/cmd/server/server.go:343" namespace=velero
time="2020-04-10T14:12:44Z" level=info msg="Checking existence of Velero custom resource definitions" logSource="pkg/cmd/server/server.go:372"
time="2020-04-10T14:12:44Z" level=info msg="All Velero custom resource definitions exist" logSource="pkg/cmd/server/server.go:406"
time="2020-04-10T14:12:44Z" level=info msg="Checking that all backup storage locations are valid" logSource="pkg/cmd/server/server.go:413"
An error occurred: some backup storage locations are invalid: backup store for location "default" is invalid: Backup store contains invalid top-level directories: [other-directory]
```

## Snapshot restore is failing

#### Service NodePort is already allocated

Example error message:

![Snapshot Troubleshoot Service NodePort](/images/snapshot-troubleshoot-service-nodeport.png)

There is a known issue in older Kubernetes versions (earlier than v1.19) where using a static NodePort for services can collide in multi-primary high availability setup when recreating the services. You can find more details about the issue here: https://github.com/kubernetes/kubernetes/issues/85894.

This issue has been fixed in Kubernetes version 1.19. You can find more details about the fix here: https://github.com/kubernetes/kubernetes/pull/89937.

Summary: upgrading to Kubernetes version v1.19 or later should resolve the issue.

#### Partial snapshot restore is stuck in progress

In the Replicated admin console, you see at least one volume restore progress bar frozen at 0%. Example admin console display:

![Snapshot Troubleshoot Frozen Restore](/images/snapshot-troubleshoot-frozen-restore.png)

You can confirm this is the same issue by running `kubectl get pods -n <application namespace>`, and you should see at least one pod stuck in initialization:

```shell
NAME                                  READY   STATUS      RESTARTS   AGE
example-mysql-0                       0/1     Init:0/2    0          4m15s  #<- the offending pod
example-nginx-77b878b4f-zwv2h         3/3     Running     0          4m15s
```

We've seen this issue with Velero version 1.5.4 and opened up this issue with the project to inspect the root cause: https://github.com/vmware-tanzu/velero/issues/3686. However we have not experienced this using Velero 1.6.0 or greater.

Summary: Upgrade Velero to 1.6.0. You can upgrade using the Replicated Kubernetes installer. Or, to follow the Velero upgrade instructions, see [Upgrading to Velero 1.6](https://velero.io/docs/v1.6/upgrade-to-1.6/) in the Velero documentation.
