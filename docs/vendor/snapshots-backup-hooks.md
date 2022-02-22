# Configuring Backup Hooks

For many application workloads, additional processing or scripts need to be run before and/or after a backup is taken to prepare the system for a backup.
Velero has support for this, using [Backup Hooks](https://velero.netlify.app/docs/main/backup-hooks/).

Some common examples of how a Hook can be used to create successful backups are:
- Run `pg_dump` to export a postgres database prior to backup
- Lock a file before running a backup, and unlock immediately after
- Delete tmp files that should not be backed up

Backup hooks should be run inside the container that contains the data to back up.

## Examples
A common pattern of applications is to include and want to back up a Postgres database.
Postgres is easy to include from a Helm chart, and the following HelmChart kind can be used to configure Postgres for backups. An explanation of the configuration follows the YAML.

```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: postgresql
spec:
  exclude: 'repl{{ ConfigOptionEquals `postgres_type` `external_postgres` }}'

  chart:
    name: postgresql
    chartVersion: 8.7.4

  values:

    master:
      podAnnotations:
        backup.velero.io/backup-volumes: backup
        pre.hook.backup.velero.io/command: '["/bin/bash", "-c", "PGPASSWORD=$POSTGRES_PASSWORD pg_dump -U username -d dbname -h 127.0.0.1 > /scratch/backup.sql"]'
        pre.hook.backup.velero.io/timeout: 3m

      extraVolumes:
        - name: backup
          emptyDir:
            medium: Memory
            sizeLimit: 1Gi
      extraVolumeMounts:
        - name: backup
          mountPath: /scratch

    global:
      postgresql:
        postgresqlUsername: username
        postgresqlPassword: "repl{{ ConfigOption `embedded_postgres_password` }}"
        postgresqlDatabase: dbname

  builder: {}

```

In this example, a few fields are worth explaining:

`spec.exclude`: this is a common and recommended pattern for applications.
The customer can choose (using the config screen) to bring an external postgres instance instead of running it in-cluster.
When this is set, we want to exclude the chart from installing.

`spec.values.master.podannotations`: here we add a few annotations to the postgres master podspec (not the statefulset, this will add the annotations to the podspec).
The annotations are:

| annotation | description |
|------------|-------------|
| `backup.velero.io/backup-volumes` | a comma separated list of volumes from the pod to include in the backup.
Note, we are not including the primary data volume here |
| `pre.hook.backup.velero.io/command` | a stringified json array containing the pre backup hook command.
This command is a pg_dump from the running database to the backup volume |
| `pre.hook.backup.velero.io/timeout` | a duration for the maximum time to let this script run for |

`spec.master.extraVolumes`: this is a new volume that we inject into the postgres pod. It's an empty volume, stored in memory (does not require a PVC or storage).
We mount this into the `/scratch` directory of the master pod, and use it as a destination when running `pg_dump` above (in the hooks).
This is the only volume that we will back up.
