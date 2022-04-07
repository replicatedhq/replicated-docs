# Identity (Beta)

The Identity custom resource allows you to configure the Replicated identity service for your application.

The following is an example manifest file for the Identity custom resource:

```yaml
apiVersion: kots.io/v1beta1
kind: Identity
metadata:
  name: my-application
spec:
    identityIssuerURL: https://{{repl ConfigOption "ingress_hostname"}}/dex
    oidcRedirectUris:
      - https://{{repl ConfigOption "ingress_hostname"}}/oidc/login/callback
    supportedProviders: [ oidc ]
    requireIdentityProvider: true
    roles:
      - id: member
        name: Member
        description: Can see every member and non-secret team in the organization.
      - id: owner
        name: Owner
        description: Has full administrative access to the entire organization.
    oauth2AlwaysShowLoginScreen: false
    signingKeysExpiration: 6h
    idTokensExpiration: 24h
    webConfig:
      title: My App
      theme:
        logoUrl: data:image/png;base64,<encoded_base64_stream>
        logoBase64: <base64 encoded png file>
        styleCssBase64: <base64 encoded [styles.css](https://github.com/dexidp/dex/blob/v2.27.0/web/themes/coreos/styles.css) file>
        faviconBase64: <base64 encoded png file>
```

## identityIssuerURL
**(required)** This is the canonical URL that all clients must use to refer to the OIDC identity service.
If a path is provided, the HTTP service will listen at a non-root URL.

## oidcRedirectUris
**(required)** A registered set of redirect URIs.
When redirecting from the Replicated app manager identity OIDC server to the client, the URI requested to redirect to must match one of these values.

## supportedProviders
A list of supported identity providers.
If unspecified, all providers will be available.

## requireIdentityProvider
If true, require the identity provider configuration to be set by the customer before the app can be deployed.

## roles
**(`id` required)** A list of roles to be mapped to identity provider groups by the customer on the Replicated admin console identity service configuration page.

## oauth2AlwaysShowLoginScreen
If true, show the identity provider selection screen even if there's only one configured.
Default `false`.

## signingKeysExpiration
Defines the duration of time after which the SigningKeys will be rotated.
Default `6h`.

## idTokensExpiration
Defines the duration of time for which the IdTokens will be valid.
Default `24h`.

## webConfig
Can be used for branding the application identity login screen.
