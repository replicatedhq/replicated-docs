# Managing Secrets with GitOps (Alpha)

When enabling GitOps, the Replicated admin console will push the rendered application manifests to the configured git repository.
Application manifests often contain secrets and sensitive information that should not be committed to git.

Replicated app manager v1.18 introduces an integration with SealedSecrets to encrypt secrets before committing.
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

The sealed secret public key is included in the sealed secret controller logs during startup, as shown here:

```bash
kubectl logs -n kube-system sealed-secrets-controller-7684c7b86c-6bhhw
2022/04/20 15:49:49 Starting sealed-secrets controller version: 0.17.5
controller version: 0.17.5
2022/04/20 15:49:49 Searching for existing private keys
2022/04/20 15:49:58 New key written to kube-system/sealed-secrets-keyxmwv2
2022/04/20 15:49:58 Certificate is
-----BEGIN CERTIFICATE-----
MIIEzDCCArSgAwIBAgIQIkCjUuODpQV7zK44IB3O9TANBgkqhkiG9w0BAQsFADAA
MB4XDTIyMDQyMDE1NDk1OFoXDTMyMDQxNzE1NDk1OFowADCCAiIwDQYJKoZIhvcN
AQEBBQADggIPADCCAgoCggIBAN0cle8eERYUglhGapLQZWYS078cP9yjOZpoUtXe
mpNE4eLBMo2bDAOopL9YV6TIh2EQMGOr7Njertnf7sKl/1/ZEnIpDw+b/U40LD6o
XMymCrv9GznlsEkaqfGynsY22oamQnHNLIPTYfxUueDqqQFSJN3h1vKZaFi850I4
y29r+kxX8gGTRmuratGw0Rd4VvHtqi4lDlD9pBToQzbYsbhiySKhClAWC8Hbwzw8
4rPamYO8am92jpWIw0liSJUq5urnHR+S0S2P8FlOh7nbCI4ZkmY/Edjxz6ew7yB3
OFONxlkweD2/KMzquMgOxhxUUdrbBZxXtb6s3MUeF4ENnJ2iL73dgx7O81HTUyu4
Ok0YK1zqlnj4B683ySV3/RAtHbJJJWJMrLqbjhUNiYf+Ey6wXHJIwqXnjkG4UjP/
OzrAmZiMa+z/uniUS0M+6siDJuj1FZsN9o1HhwwAWKcEJov2Jlo65gRsaLvalQfr
/VGrHQ1nQ2323hNVIZNKZ6zS6HlJOyOEQ7dcW3XsP1F5gEGkKkgLklOs3jt5OF4i
2eiimHVnXveXgYZhDudY20ungRnslO2NBpTXgKIDu4YKUXhouQe1LAOkSIdtYSJL
eBFT1cO+rYqNUnffvsv2f9cE0SLp9XQ3VD5Eb+oJCpHc0qZ37/SB3VuDsXW2U/ih
TepxAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIAATAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBSvvAr9OTTWZBiCu7+b023YlCL6KzANBgkqhkiG9w0BAQsFAAOCAgEA
oXqAxZUCtZQCv23NMpABnJm2dM3qj5uZRbwqUBxutvlQ6WXKj17dbQ0SoNc2BOKT
7hpR7wkN9Ic6UrTnx8NUf/CZwHrU+ZXzG8PigOccoP4XBJ6v7k4vOjwpuyr14Jtw
BXxcqbwK/bZPHbjn/N1eZhVyeOZlVE4oE+xbI0s6vJnn2N4tz/YrHB3VBRx9rbtN
WbbparStldRzfGyOXLZsu0eQFfHdGXtYAJP0Hougc26Wz2UEozjczUqFYc7s66Z4
1SCXpIpumm+aIKifjzIDPVZ3gDqpZaQYB877mCLVQ0rvfZgw/lVMtnnda+XjWh82
YUORubKqKIM4OBM9RvaTih6k5En70Xh9ouyYgwE0fbUEvFThADVR5fUE0e7/34sE
oeAONWIZ4sbqewhvKjbYpKOZD7a9GrxCiB5C92WvA1xrI4x6F0EOK0jp16FSNuxN
us9lhAxX4V7HN3KR+O0msygeb/LAE+Vgcr3ZxlNvkIoLY318vKFsGCPgYTXLk5cs
uP2mg/JbTuntXaZTP+gM7hd8enugaUcvyX/AtduTeIXgs7KLLRZW+2M+gq/dlRwl
jCwIzOs3BKuiotGAWACaURFiKhyY+WiEpsIN1H6hswAwY0lcV1rrOeQgg9rfYvoN
0tXH/eHuyzyHdWt0BX6LLY4cqP2rP5QyP117Vt2i1jY=
-----END CERTIFICATE-----

2022/04/20 15:49:58 HTTP server serving on :8080
...
```
