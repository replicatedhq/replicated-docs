# Restoring Partial Snapshots

When restoring a partial snapshot, the Replicated admin console will first "undeploy" the correct application.
During this process, all existing application manifests will be removed from the cluster, and all `PersistentVolumeClaims` will be deleted. This is not reversible.

The restore process will then re-deploy all application manifests to the namespace, and all pods will have an extra `initContainer` and an extra directory named `.velero`. This is used for restore hooks.

For more information about the restore process, see [Restore Reference](https://velero.io/docs/v1.10/restore-reference/) in the Velero documentation.

## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
