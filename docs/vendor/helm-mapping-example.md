# Example: Mapping the Configuration Screen to Helm Values

The Replicated app manager allows you to map the the Replicated admin console configuration screen to the Helm `values.yaml` file. This example shows a possible configuration for the Grafana platform.

For more information about customizing the configuration screen, see [Customizing the Configuration Screen](admin-console-customize-config-screen).

## Choosing Values

To start, we can read the `values.yaml` to find a few values.

```shell
tar -xOf ~/helm-grafana/manifests/grafana-5.0.13.tgz grafana/values.yaml
```

In this example, we will use `adminUser` and `adminPassword`.
```yaml
...
adminUser: admin
adminPassword: admin
...
```

## Create config fields

Add username and password fields to `~/helm-grafana/manifests/config.yaml`
```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: grafana-config
spec:
  groups:
    - name: grafana
      title: Grafana
      description: Grafana Configuration
      items:
        - name: admin_user
          title: Admin User
          type: text
          default: 'admin'
        - name: admin_password
          title: Admin Password
          type: password
          default: 'admin'
```

To test this, run `replicated release create --auto`, deploy the new version, and go to the admin console `Config` screen.
![Helm Chart Grafana Config Screen](/images/guides/kots/helm-chart-grafana-config-screen.png)

For now, these fields will have no effect.
Next, we'll map these user-supplied values to Helm Chart values.

## Map to Helm Chart

In `~/helm-grafana/manifests/grafana.yaml`, update `values` with the `ConfigOption` template function.

```diff
@@ -7,5 +7,5 @@
     name: grafana
     chartVersion: 5.0.13
   values:
-    adminUser: "admin"
-    adminPassword: "admin"
+    adminUser: "repl{{ ConfigOption `admin_user`}}"
+    adminPassword: "repl{{ ConfigOption `admin_password`}}"
```


Before deploying let's quickly check the value of the secret, so we can confirm it changed

```text
$ kubectl get secret grafana -o yaml

apiVersion: v1
data:
  admin-password: YWRtaW4=
  admin-user: YWRtaW4=
...
```

Next, we can make a release and get ready to test it out

```shell
replicated release create --auto
```

Deploy the new release
![Helm Chart Check for Updates 2](/images/guides/kots/helm-chart-check-for-updates-2.png)

Update the User and Password fields in kotsadm `Config` and verify the `grafana` secret got updated.

```text
$ kubectl get secret grafana -o yaml

apiVersion: v1
data:
  admin-password: cGFzc3dvcmQhMTIz
  admin-user: YWRtaW4=
...
```

Login via `http://localhost:8080` with the new credentials.
