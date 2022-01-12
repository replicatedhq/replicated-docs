# Using an identity provider for user access (Beta)

Upon initial installation, the KOTS Admin Console is secured with a single shared password for all users.
It is possible to further configure the KOTS Admin Console to authenticate users with your organization's user management system.
This feature is only available for licenses that have the Identity Service feature enabled.

KOTS leverages the open-source project Dex as an intermediary to control access to the console.
Dex implements an array of protocols for querying other user-management systems, known as connectors.

For more information, see the [Dex documentation](https://dexidp.io/docs/).

The Identity Service currently has the following limitations:
* Only available with embedded cluster installations.
* Only available via the KOTS Admin UI.

## Configuration

To begin, click the Access link at the top of the Admin Console.
Here you can configure access to the KOTS Admin Console, integrating with one of the supported identity providers.

![Configure Identity Provider](/images/access-identity.png)

## Supported Providers

**OpenID Connect:** For more information, see the [OpenID Connect documentation](https://openid.net/connect/).

## Resetting Authentication

When enabling identity provider access to the Admin Console, shared password authentication will be disabled.
In case authentication needs to be reset, the `kubectl kots identity-service enable-shared-password --namespace [namespace]` command can be run to re-enable shared password authentication.

For more information, see [kots identity-service enable-shared-password](https://kots.io/kots-cli/identity-service/enable-shared-password/) in the kots CLI documentation.
