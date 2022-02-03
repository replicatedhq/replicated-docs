# Managing secrets with GitOps (Alpha)

When enabling GitOps, the Replicated admin console will push the rendered application manifests to the configured git repository.
Application manifests often contain secrets and sensitive information that should not be committed to git.

Replicated app manager 1.18 introduces an integration with SealedSecrets to encrypt secrets before committing.
This integration is currently alpha and subject to change in future releases of the app manager. For more information, see the [sealed-secrets](https://github.com/bitnami-labs/sealed-secrets) Github repository.

To enable this integration, a Secret with specific labels must be deployed to the same namespace as the admin console.
This secret must contain the SealedSecrets public key and will be used by the app manager to replace all Secret objects created by the application and by the admin console.

This secret should be manually deployed to the same namespace as the admin console.
There is currently no way to automate or use the admin console to configure this functionality.
The secret can be named anything unique that does not conflict with application secrets.
The labels in this example YAML file are important and must remain.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: kots-sealed-secret
  namespace: <same as kots>
  labels:
    kots.io/buildphase: secret
    kots.io/secrettype: sealedsecrets
data:
  cert.pem: <sealed secret public key, base64 encoded>
```
