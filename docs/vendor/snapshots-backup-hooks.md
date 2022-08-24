# Using Backup and Restore Hooks

For many application workloads, additional processing or scripts must be run before or after creating a backup to prepare the system for a backup. Many application workloads also require additional processing or scripts to run before or after restoring from a backup.

Velero supports this through backup hooks and restore hooks.

Some common examples of how to use a hook to create successful backups are:
- Run `pg_dump` to export a postgres database prior to backup
- Lock a file before running a backup, and unlock immediately after
- Delete tmp files that should not be backed up
- Restore a database file only if that file exists

For more information, see [Backup Hooks](https://velero.io/docs/v1.9/backup-hooks/) and [Restore Hooks](https://velero.io/docs/v1.9/restore-hooks) in the Velero documentation.

## Example

The following example demonstrates how to include Velero backup and restore hooks for a Postgres database in a Replicated HelmChart custom resource manifest file.

The use case for this example is an application packaged with a Helm chart that includes a Postgres database. A description of key fields from the YAML follows the example.

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
        post.hook.restore.velero.io/command: '["/bin/bash", "-c", "[ -f \"/scratch/backup.sql\" ] && PGPASSWORD=$POSTGRES_PASSWORD psql -U username -h 127.0.0.1 -d dbname -f /scratch/backup.sql && rm -f /scratch/backup.sql;"]'

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

The following describes key fields from the example above:

* `spec.exclude`: A common and recommended pattern for applications. On the Replicated admin console Configuration screen, the customer can choose to bring an external Postgres instance instead of running it in-cluster. The Replicated template function in `spec.exclude` evaluates to true when the user selects the external database option on the Configuration screen. This means that the internal Postgres database is not included in the deployment.

* `spec.values.master.podannotations`: Adds annotations to the postgres master PodSpec. Velero backup and restore hooks are included in the PodSpec annotations. The following table describes the annotations:
:::note
Run backup hooks inside the container that contains the data to back up.
:::

   <table>
     <tr>
       <th>Annotation</th>
       <th>Description</th>
     </tr>
     <tr>
       <td><code>backup.velero.io/backup-volumes</code></td>
       <td>a comma separated list of volumes from the Pod to include in the backup. The primary data volume is not included in this field.</td>
     </tr>
     <tr>
       <td><code>pre.hook.backup.velero.io/command</code></td>
       <td>A stringified JSON array containing the pre backup hook command.
       This command is a <code>pg_dump</code> from the running database to the backup volume.</td>
     </tr>
     <tr>
       <td><code>pre.hook.backup.velero.io/timeout</code></td>
       <td>a duration for the maximum time to let this script run for</td>
     </tr>
     <tr>
       <td><code>post.hook.restore.velero.io/command</code></td>
       <td>A Velero exec restore hook that runs a script to checks if the database file exists, and restore only if it exists. Then, the script deletes the file when the operation is complete.</td>
     </tr>
   </table>

* `spec.master.extraVolumes`: A new volume that is injected into the postgres Pod. The new volume is an empty volume, stored in memory. Meaning, it does not require a PVC or storage.
We mount the volume into the `/scratch` directory of the master Pod, and use it as a destination when running `pg_dump` from the backup hook described above. This is the only volume that is backed up.
