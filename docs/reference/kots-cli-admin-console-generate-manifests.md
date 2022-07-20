# admin-console generate-manifests

Running this command will create a directory on the workstation containing the Replicated admin console manifests. These assets can be used to deploy KOTS to a cluster through other workflows, such as kubectl, to provide additional customization of the admin console before deploying.

### Limitations

`generate-manifests` does not support generating manifests for Red Hat OpenShift clusters.

### Usage
```bash
kubectl kots admin-console generate-manifests [flags]
```

This command supports the following flags:

| Flag                      | Type   | Description                                                                                                                                           |
|:--------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--rootdir`               | string | Root directory where the YAML will be written _(default `${HOME}` or `%USERPROFILE%`)_                                                                |
| `--namespace`             | string | Target namespace for the admin console                                                                                                                |
| `--shared-password`       | string | Shared password to use when deploying the admin console                                                                                               |
| `--http-proxy`            | string | Sets HTTP_PROXY environment variable in all KOTS admin console components                                                                             |
| `--https-proxy`           | string | Sets HTTPS_PROXY environment variable in all KOTS admin console components                                                                            |
| `--no-proxy`              | string | Sets NO_PROXY environment variable in all KOTS admin console components                                                                               |
| `--with-minio`            | bool   | Set to true to include a local minio instance to be used for storage _(default true)_                                                                 |
| `--minimal-rbac`          | bool   | Set to true to use the namespaced role and bindings instead of cluster-level permissions _(default false)_                                            |
| `--additional-namespaces` | string | Comma delimited list to specify additional namespace(s) managed by KOTS outside where it is to be deployed. Ignored without with `--minimal-rbac=true` |

### Examples
```bash
kubectl kots admin-console generate-manifests
kubectl kots admin-console generate-manifests --rootdir ./manifests
kubectl kots admin-console generate-manifests --namespace kotsadm --minimal-rbac=true --additional-namespaces="app1,app3"
```
