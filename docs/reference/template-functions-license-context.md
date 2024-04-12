# License Context

## LicenseFieldValue
```go
func LicenseFieldValue(name string) string
```
LicenseFieldValue returns the value of the specified license field. LicenseFieldValue accepts custom license fields and all built-in license fields. For a list of all built-in fields, see [Built-in License Fields](/vendor/licenses-using-builtin-fields).

LicenseFieldValue always returns a string, regardless of the license field type. To return integer or boolean values, you need to use the [ParseInt](/reference/template-functions-static-context#parseint) or [ParseBool](/reference/template-functions-static-context#parsebool) template function to convert the string value.

#### String License Field

The following example returns the value of the built-in `customerName` license field:

```yaml
customerName: '{{repl LicenseFieldValue "customerName" }}'
```
#### Integer License Field

The following example returns the value of a custom integer license field named `numSeats`:

```yaml
numSeats: repl{{ LicenseFieldValue "numSeats" | ParseInt }}
```
This example uses [ParseInt](/reference/template-functions-static-context#parseint to convert the returned value to an integer.

#### Boolean License Field

The following example returns the value of a custom boolean license field named `feature-1`:

```yaml
feature-1: repl{{ LicenseFieldValue "feature-1" | ParseBool }}
```
This example uses [ParseBool](/reference/template-functions-static-context#parsebool) to convert the returned value to a boolean.

## LicenseDockerCfg
```go
func LicenseDockerCfg() string
```
LicenseDockerCfg returns a value that can be written to a secret if needed to deploy manually.
Replicated KOTS creates and injects this secret automatically in normal conditions, but some deployments (with static, additional namespaces) may need to include this.

```yaml
apiVersion: v1
kind: Secret
type: kubernetes.io/dockerconfigjson
metadata:
  name: myapp-registry
  namespace: my-other-namespace
data:
  .dockerconfigjson: repl{{ LicenseDockerCfg }}
```

## Sequence

> Sequence was introduced in KOTS v1.20.0.

```go
func Sequence() int64
```
Sequence is the sequence of the application deployed.
This will start at 0 for each installation, and increase with every app update, config change, license update and registry setting change.

```yaml
'{{repl Sequence }}'
```

## Cursor

> Cursor was introduced in KOTS v1.20.0.

```go
func Cursor() string
```
Cursor is the channel sequence of the app.
For instance, if 5 releases have been promoted to the channel that the app is running, then this would return the string `5`.

```yaml
'{{repl Cursor }}'
```

## ChannelName

> ChannelName was introduced in KOTS v1.20.0.

```go
func ChannelName() string
```
ChannelName is the name of the deployed channel of the app.

```yaml
'{{repl ChannelName }}'
```

## VersionLabel

> VersionLabel was introduced in KOTS v1.20.0.

```go
func VersionLabel() string
```
VersionLabel is the semantic version of the app, as specified when promoting a release to a channel.

```yaml
'{{repl VersionLabel }}'
```

## ReleaseNotes

> ReleaseNotes was introduced in KOTS v1.20.0.

```go
func ReleaseNotes() string
```
ReleaseNotes is the release notes of the current version of the app.

```yaml
'{{repl ReleaseNotes }}'
```

## IsAirgap

> IsAirgap was introduced in KOTS v1.20.0.

```go
func IsAirgap() bool
```
IsAirgap is `true` when the app is installed via uploading an airgap package, false otherwise.

```yaml
'{{repl IsAirgap }}'
```
