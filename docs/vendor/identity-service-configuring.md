
# Enabling and Configuring Identity Service (Beta)

When enabling the identity service for your application, the Replicated app manager will deploy [Dex](https://dexidp.io/) as an intermediary that can be configured to control access to the application.
Dex implements an array of protocols for querying other user-management systems, known as [connectors](https://dexidp.io/docs/connectors/).
This feature is only available for licenses that have the identity service feature enabled.

The identity service currently has the following limitations:
* Only available with embedded cluster installations with the Kubernetes installer.
* Only available through the Replicated admin console.

![Identity Service License Field](/images/identity-service-license-field.png)

The Identity custom resource enables and configures the identity service for your application.
If you prefer, here is an [example application](https://github.com/replicatedhq/kots-idp-example-app) that demonstrates how to configure the identity service.

To begin, create a new release on the [vendor portal](https://vendor.replicated.com).
Once you are editing the release, create a new [Identity custom resource](../reference/custom-resource-identity) file customized for your application.

![Identity Service Custom Resource](/images/identity-service-crd.png)

The identity service has to be accessible from the browser. For that reason, the app manager provides the service name and port to the app through the [identity template functions](../reference/template-functions-identity-context) so that the app can then configure ingress for the identity service, for example:

![Identity Service Ingress](/images/identity-service-ingress.png)

All the necessary information that your application needs to communicate and integrate with the identity service can be passed through environment variables, for example:

![Identity Service Application Env](/images/identity-service-app-env.png)

## Role Based Access Control

It is also possible to regulate access to your application resources based on the roles of individual users within the customer's organization.

A list of the available roles within your application can be provided to the customer via the [roles](../reference/custom-resource-identity#roles) section of the Identity custom resource.

![Identity Service Custom Resource Roles](/images/identity-service-crd-roles.png)

Then, using the admin console, the customer will have the ability to create groups and assign specific roles to each group.
This mapping of roles to groups will then be available to your application via the [IdentityServiceRoles](../reference/template-functions-identity-context#identityserviceroles) template function.

![Identity Service Custom Resource Roles](/images/identity-service-roles-template-function.png)
