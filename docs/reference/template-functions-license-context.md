# License Context

## LicenseFieldValue
```go
func LicenseFieldValue(name string) string
```
LicenseFieldValue returns the value of the entitlement with the provided name.

```yaml
'{{repl LicenseFieldValue "numSeats" }}'
```

In addition to custom license fields, `LicenseFieldValue` also accepts the following values:

- `appSlug`
- `channelID`
- `channelName`
- `customerName`
- `endpoint`
- `entitlements`
- `expires_at`
- `isAirgapSupported`
- `isGeoaxisSupported`
- `isGitOpsSupported`
- `isIdentityServiceSupported`
- `isSemverRequired`
- `isSnapshotSupported`
- `isSupportBundleUploadSupported`
- `licenseID` or `licenseId`
- `licenseSequence`
- `licenseType`
- `signature`

## LicenseDockerCfg
```go
func LicenseDockerCfg() string
```
LicenseDockerCfg returns a value that can be written to a secret if needed to deploy manually.
The Replicated app manager creates and injects this secret automatically in normal conditions, but some deployments (with static, additional namespaces) may need to include this.

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

> Sequence was introduced in the app manager v1.20.0.

```go
func Sequence() int64
```
Sequence is the sequence of the application deployed.
This will start at 0 for each installation, and increase with every app update, config change, license update and registry setting change.

```yaml
'{{repl Sequence }}'
```

## Cursor

> Cursor was introduced in the app manager v1.20.0.

```go
func Cursor() string
```
Cursor is the channel sequence of the app.
For instance, if 5 releases have been promoted to the channel that the app is running, then this would return the string `5`.

```yaml
'{{repl Cursor }}'
```

## ChannelName

> ChannelName was introduced in the app manager v1.20.0.

```go
func ChannelName() string
```
ChannelName is the name of the deployed channel of the app.

```yaml
'{{repl ChannelName }}'
```

## VersionLabel

> VersionLabel was introduced in the app manager v1.20.0.

```go
func VersionLabel() string
```
VersionLabel is the semantic version of the app, as specified when promoting a release to a channel.

```yaml
'{{repl VersionLabel }}'
```

## ReleaseNotes

> ReleaseNotes was introduced in the app manager v1.20.0.

```go
func ReleaseNotes() string
```
ReleaseNotes is the release notes of the current version of the app.

```yaml
'{{repl ReleaseNotes }}'
```

## IsAirgap

> IsAirgap was introduced in the app manager v1.20.0.

```go
func IsAirgap() bool
```
IsAirgap is `true` when the app is installed via uploading an airgap package, false otherwise.

```yaml
'{{repl IsAirgap }}'
```
