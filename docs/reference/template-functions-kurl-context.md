# kURL Context

## kURL Context Functions

For applications installed on clusters created by the Replicated Kubernetes installer, you can use template functions to show all options the cluster was installed with.

The creation of the Installer custom resource will reflect both install script changes made by posting YAML to the Kubernetes installer API and changes made with -s flags at runtime. These functions are not available on the config page.

The Kubernetes installer is based on the open source kURL project, which is maintained by Replicated. For more information about kURL, see [Introduction to kURL](https://kurl.sh/docs/introduction/) in the kURL documentation.

KurlBool, KurlInt, KurlString, and KurlOption all take a string yamlPath as a param.
This path is the path from the manifest file, and is delineated between addon and subfield by a period ’.’.
For example, the kURL Kubernetes version can be accessed as `{{repl KurlString "Kubernetes.Version" }}`.

KurlBool, KurlInt, KurlString respectively return a bool, integer, and string value.
If used on a valid field but with the wrong type these will return the falsy value for their type, false, 0, and “string respectively.
The `KurlOption` function will convert all bool, int, and string fields to string.
All functions will return falsy values if there is nothing at the yamlPath specified, or if these functions are run in a cluster with no installer custom resource (as in, not a cluster created by the Kubernetes installer).

The following provides a complete list of the Installer custom resource with annotations:

## KurlBool

```go
func KurlBool(yamlPath string) bool
```

Returns the value at the yamlPath if there is a valid boolean there, or false if there is not.

```yaml
'{{repl KurlBool "Docker.NoCEonEE" }}'
```


## KurlInt

```go
func KurlInt(yamlPath string) int
```

Returns the value at the yamlPath if there is a valid integer there, or 0 if there is not.

```yaml
'{{repl KurlInt "Rook.CephReplicaCount" }}'
```


## KurlString

```go
func KurlString(yamlPath string) string
```

Returns the value at the yamlPath if there is a valid string there, or "" if there is not.

```yaml
'{{repl KurlString "Kubernetes.Version" }}'
```


## KurlOption

```go
func KurlOption(yamlPath string) string
```

Returns the value at the yamlPath if there is a valid string, int, or bool value there, or "" if there is not.
Int and Bool values will be converted to string values.

```yaml
'{{repl KurlOption "Rook.CephReplicaCount" }}'
```


## KurlAll

```go
func KurlAll() string
```

Returns all values in the Installer custom resource as key:value pairs, sorted by key.

```yaml
'{{repl KurlAll }}'
```
