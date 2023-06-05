# Get Application Updates

This topic describes how to 

## About

You can check for updates to the application by using the get application updates API. This is useful to inform customers about updates to the application. For example, a banner can display in your application when updates are available, encouraging users to update and providing update instructions to them.

## Check for Updates and Upgrade

To upgrade your application, users must log in to the Replicated registry and then perform a Helm upgrade. Consider the following example commands:

```bash
helm registry login registry.replicated.com --username alexp@replicated.com --password LICENSE_ID

helm upgrade echo-server oci://registry.replicated.com/alex-echo-server-helm/echo-server
```

The registry login command requires three components: the registry domain, the username, and the password.

The registry domain can be hardcoded for now, though this will be available programmatically once custom domains are fully supported.

The username and password are both available from the get license info API in the customerEmail and licenseID fields.

The install command requires five components: the release name, the release namespace, the registry domain, the app slug, and the channel slug.

The other four components are available from the get application information API in the currentRelease.helmReleaseName, currentRelease.helmReleaseNamespace, appSlug, and currentRelease.channelSlug.
