
# Enabling and Configuring Identity Service (Beta)

When you enable the identity service for an application, the Replicated app manager deploys [Dex](https://dexidp.io/) as an intermediary that can be configured to control access to the application. Dex implements an array of protocols for querying other user-management systems, known as connectors. For more information about connectors, see [Connectors](https://dexidp.io/docs/connectors/) in the Dex documentation.


## Limitations

Using identity service has the following limitations and requirements:

* Licenses must have the identity service option enabled.
* Identity service is available only for embedded cluster installations with the Kubernetes installer.
* Customers must use the Replicated admin console.

## Enable and Configure Identity Service

Use the Identity custom resource to enable and configure the identity service for your application. For an example application that demonstrates how to configure the identity service, see the [`kots-idp-example-app`](https://github.com/replicatedhq/kots-idp-example-app) on GitHub.

To enable and configure identity service:

1. Create a new release in the [vendor portal](https://vendor.replicated.com). 

1. Add an Identity custom resource file and customize the file for your application. For more information about the Identity custom resource, see [Identity (Beta)](/reference/custom-resource-identity) in _Reference_.

    The following example shows a basic Identity custom resource YAML file:

    ```YAML
    apiVersion: kots.io/v1beta1
    kind: Identity
    metadata:
    name: identity
    spec:
    requireIdentityProvider: true
    identityIssuerURL: https://{{repl ConfigOption "ingress_hostname"}}/oidcserver
    oidcRedirectUris:
        - https://{{repl ConfigOption "ingress_hostname"}}/callback
    roles:
        - id: access
        name: Access
        description: Restrict access to IDP Example App
    ```

1. In your Ingress manifst file, make the identity service accessible from the browser. To help enable accessibility, the app manager provides the service name and port to the application through the identity template functions so that the application can configure ingress for the identity service. For more information about the identity template functions, see [Identity Context](/reference/template-functions-identity-context) in _Reference_.

    The following example shows an Ingress customer resource configured with `serviceName: repl{{ IdentityServiceName }}` and `servicePort: repl{{ IdentityServicePort }}` under the path for the oidserver:

    ```YAML
    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
    name: idp-app
    annotations:
        kubernetes.io/ingress.allow-http: 'false'
        ingress.kubernetes.io/force-ssl-redirect: 'true'
        kots.io/placeholder: repl{{ printf "'true'" }}repl{{ ConfigOption "annotations" | nindent 4 }}
    labels:
        app: idp-app
    spec:
    tls:
        - hosts:
        - repl{{ ConfigOption "ingress_hostname" }}
        secretName: idp-ingress-tls
    rules:
        - host: repl{{ or (ConfigOption "ingress_hostname") "~" }}
        http:
            paths:
            - path: /
                backend:
                serviceName: idp-app
                servicePort: 80
            - path: /oidcserver
                backend:
                serviceName: repl{{ IdentityServiceName }}
                servicePort: repl{{ IdentityServicePort }}
    ```

1. In your Deployment manifest file, add environment variables to configure all of the information that your application needs to communicate and integrate with the identity service.

    The following example shows the `RESTRICTED_GROUPS` environment variable set with the value `{{repl IdentityServiceRoles | keys | toJson }}`:

    ```YAML
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: idp-app
    labels:
        app: idp-app
    spec:
    replicas: 1
    selector:
        matchLabels:
        app: idp-app
    template:
        metadata:
        labels:
            app: idp-app
        spec:
        containers:
            - name: idp-app
            image: replicated/kots-idp-example-app:latest
            imagePullPolicy: Always
            ports:
                - containerPort: 5555
            volumeMounts:
                - name: tls-ca-volume
                mountPath: /idp-example
                readOnly: true
            args: ["--issuer-root-ca=/idp-example/tls.ca"]
            env:
                - name: CERT_SHA
                value: repl{{ sha256sum (ConfigOption "tls_cert") }}
                - name: LISTEN
                value: http://0.0.0.0:5555
                - name: ISSUER
                value: https://{{repl ConfigOption "ingress_hostname"}}/oidcserver
                - name: CLIENT_ID
                value: repl{{ IdentityServiceClientID }}
                - name: CLIENT_SECRET
                value: repl{{ IdentityServiceClientSecret }} # TODO: secret
                - name: REDIRECT_URI
                value: https://{{repl ConfigOption "ingress_hostname"}}/callback
                - name: EXTRA_SCOPES
                value: groups
                - name: RESTRICTED_GROUPS
                value: |
                    {{repl IdentityServiceRoles | keys | toJson }}
        hostAliases:
            - ip: 172.17.0.1
            hostnames:
                - myapp.kotsadmdevenv.com
        volumes:
            - name: tls-ca-volume
            secret:
                secretName: idp-app-ca
    ```
1. Save and promote the release to a development environment to test your changes.

## Role Based Access Control

You can also regulate access to your application resources based on the roles of individual users within your customer's organization.

A list of the available roles within your application can be provided to the customer using the `roles` section of the Identity custom resource. For more information, see [`roles`](/reference/custom-resource-identity#roles) in _Reference_.

![Identity Service Custom Resource Roles](/images/identity-service-crd-roles-new.png)

[View a larger image](/images/identity-service-crd-roles-new.png)

Using the admin console, the customer then has the ability to create groups and assign specific roles to each group. This mapping of roles to groups becomes available to your application through the `IdentityServiceRoles` template function. For more information, see [`IdentityServiceRoles`](/reference/template-functions-identity-context#identityserviceroles) in _Reference_.

![Identity Service Custom Resource Roles](/images/identity-service-roles-template-function-new.png)

[View a larger image](/images/identity-service-roles-template-function-new.png)
