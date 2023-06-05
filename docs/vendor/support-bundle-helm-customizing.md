# 

[Placeholder] The support-bundle program is capable of gathering multiple specs, from multiple sources, and executing based on an aggregate of those.  If you are writing a Helm chart for your application, typically it is simplest to distribute a secret containing that support bundle spec with the application, so that folks can easily find it without needing to specify a long url.  This also allows the spec to be templated using information in values.yaml.

In order to add a support bundle spec to your Helm chart, you need to add a secret or configMap containing the spec, with the following format:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: some-name
  labels:
    troubleshoot.sh/kind: support-bundle
stringData:
  support-bundle-spec: |-
    your spec goes here indented 4 spaces
```
ensure you include the label troubleshoot.sh/kind: support-bundle
There should be one data item, with the key support-bundle-spec
If there is any chance the spec could contain private information, make it a secret rather than a configMap
