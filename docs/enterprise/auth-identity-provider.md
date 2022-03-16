# Using an Identity Provider for User Access (Beta)

When you install an application for the first time, the Replicated admin console is secured with a single shared password for all users.
It is possible to further configure the admin console to authenticate users with your organization's user management system.
This feature is only available for licenses that have the Replicated identity service feature enabled.

The Replicated app manager leverages the open source project Dex as an intermediary to control access to the admin console.
Dex implements an array of protocols for querying other user-management systems, known as connectors.

For more information, see the [Dex documentation](https://dexidp.io/docs/).

The identity service has the following limitations:
* Only available for installations onto a cluster created by the Kubernetes installer.
* Only available through the admin console.

## Configuration

To begin, click the **Access** tab at the top of the admin console.
Here you can configure access to the admin console, integrating with one of the supported identity providers.

![Configure Identity Provider](/images/access-identity.png)

## Supported Providers

**OpenID Connect:** For more information, see the [OpenID Connect documentation](https://openid.net/connect/).

## Resetting Authentication

When enabling identity provider access to the admin console, shared password authentication will be disabled.
In case authentication needs to be reset, the `kubectl kots identity-service enable-shared-password --namespace [namespace]` command can be run to re-enable shared password authentication.

For more information, see [identity-service enable-shared-password](../reference/kots-cli-identity-service-enable-shared-password/) in the kots CLI documentation.
