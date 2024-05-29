# Using an Identity Provider for User Access (Beta)

When you install an application for the first time, the Replicated KOTS Admin Console is secured with a single shared password for all users. It is possible to further configure the Admin Console to authenticate users with your organization's user management system. This feature is only available for licenses that have the Replicated identity service feature enabled.

Replicated KOTS leverages the open source project Dex as an intermediary to control access to the Admin Console. Dex implements an array of protocols for querying other user-management systems, known as connectors. For more information, see the [Dex documentation](https://dexidp.io/docs/).

The identity service has the following limitations:
* Only available for installations in a cluster created by Replicated kURL.
* Only available through the Admin Console.

## Prerequisite

When you are installing the Admin Console and setting up TLS certificates on the HTTPS page, you must configure the hostname to use to access the Admin Console. The hostname is required whether you are using the identity service with either a self-signed certificate or a custom certificate. For more information about configuring the hostname field, see [Install and Deploy the Application](installing-embedded-cluster#install-app) in _Online Installation with kURL_.

## Configuration

To begin, click the **Access** tab at the top of the Admin Console.
Here you can configure access to the Admin Console, integrating with one of the supported identity providers.

![Configure Identity Provider](/images/access-identity.png)

## Supported Providers

**OpenID Connect:** For more information, see the [OpenID Connect documentation](https://openid.net/connect/).

## Resetting Authentication

When you enable identity provider access to the Admin Console, shared password authentication is disabled.
If you want to re-enable the shared password authentication, run the `kubectl kots identity-service enable-shared-password --namespace [namespace]` command. For more information, see [identity-service enable-shared-password](/reference/kots-cli-identity-service-enable-shared-password/) in the KOTS CLI documentation.
