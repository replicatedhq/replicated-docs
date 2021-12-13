# Enabling and configuring identity service

When enabling the identity service for your application, KOTS will deploy [Dex](https://dexidp.io/) as an intermediary that can be configured to control access to the application.
Dex implements an array of protocols for querying other user-management systems, known as [connectors](https://dexidp.io/docs/connectors/).
This feature is only available for licenses that have the Identity Service feature enabled.

The Identity Service currently has the following limitations:
* Only available with embedded cluster installations.
* Only available via the KOTS Admin UI.

![Identity Service License Field](/images/identity-service-license-field.png)

The KOTS Identity custom resource enables and configures the Identity Service for your application.
If you prefer, here is an [example application](https://github.com/replicatedhq/kots-idp-example-app) that demonstrates how to configure the Identity Service.

To begin, create a new release on the [Vendor portal](https://vendor.replicated.com).
Once you are editing the release, create a new [KOTS Identity CRD](/vendor/additional-objects/identity/) file customized for your application.

![Identity Service CRD](/images/identity-service-crd.png)

The Identity Service has to be accessible from the browser, for that reason, KOTS provides the service name and port to the app through the [identity template functions](/reference/template-functions/identity-context/) so that the app can then configure ingress for the identity service, for example:

![Identity Service Ingress](/images/identity-service-ingress.png)

All the necessary information that your application needs to communicate and integrate with the identity service can be passed through environment variables, for example:

![Identity Service Application Env](/images/identity-service-app-env.png)

## Role Based Access Control

It is also possible to regulate access to your application resources based on the roles of individual users within the customer's organization.

A list of the available roles within your application can be provided to the customer via the [roles](/reference/v1beta1/identity/#roles) section of the Identity CRD.

![Identity Service CRD Roles](/images/identity-service-crd-roles.png)

Then, using the KOTS Admin Console, the customer will have the ability to create groups and assign specific roles to each group.
This mapping of roles to groups will then be available to your application via the [IdentityServiceRoles](/reference/template-functions/identity-context/#identityserviceroles) template function.

![Identity Service CRD Roles](/images/identity-service-roles-template-function.png)
