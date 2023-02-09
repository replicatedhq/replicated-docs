# Configuring Backup and Restore Hooks

For many application workloads, additional processing or scripts must be run before or after creating a backup to prepare the system for a backup. Many application workloads also require additional processing or scripts to run during or after the restore process.

Velero supports this through backup hooks and restore hooks.

Some common examples of how to use a hook to create successful backups are:
- Run `pg_dump` to export a postgres database prior to backup
- Lock a file before running a backup, and unlock immediately after
- Delete TMP files that should not be backed up
- Restore a database file only if that file exists
- Perform required setup tasks in a restored Pod before the application containers can start

For more information, see [Backup Hooks](https://velero.io/docs/v1.10/backup-hooks/) and [Restore Hooks](https://velero.io/docs/v1.10/restore-hooks) in the Velero documentation.

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

* `spec.values.master.podAnnotations`: Adds podAnnotations to the postgres master PodSpec. Velero backup and restore hooks are included in the podAnnotations. The following table describes the podAnnotations:
:::note
Run backup hooks inside the container that contains the data to back up.
:::

   <table>
     <tr>
       <th>podAnnotation</th>
       <th>Description</th>
     </tr>
     <tr>
       <td><code>backup.velero.io/backup-volumes</code></td>
       <td>A comma-separated list of volumes from the Pod to include in the backup. The primary data volume is not included in this field because data is exported using the backup hook.</td>
     </tr>
     <tr>
       <td><code>pre.hook.backup.velero.io/command</code></td>
       <td>A stringified JSON array containing the command for the backup hook.
       This command is a <code>pg_dump</code> from the running database to the backup volume.</td>
     </tr>
     <tr>
       <td><code>pre.hook.backup.velero.io/timeout</code></td>
       <td>A duration for the maximum time to let this script run.</td>
     </tr>
     <tr>
       <td><code>post.hook.restore.velero.io/command</code></td>
       <td>A Velero exec restore hook that runs a script to check if the database file exists, and restores only if it exists. Then, the script deletes the file after the operation is complete.</td>
     </tr>
   </table>

* `spec.master.extraVolumes`: A new volume that is injected into the postgres Pod. The new volume is an empty volume that uses ephemeral storage. The ephemeral storage must have enough space to accommodate the size of the exported data.
The `extraVolumeMounts` field mounts the volume into the `/scratch` directory of the master Pod. The volume is used as a destination when the backup hook command described above runs `pg_dump`. This is the only volume that is backed up.
