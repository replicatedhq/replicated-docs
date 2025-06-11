import StaticContext from "../partials/template-functions/_static-context.mdx"

# Static Context

This topic provides a list of the KOTS template functions in the Static context.

<StaticContext/>

## Certificate Functions

### PrivateCACert

>Introduced in KOTS v1.117.0

```yaml
func PrivateCACert() string
```

For KOTS installations, PrivateCACert returns the name of a ConfigMap that contains CA certificates provided by the end user with the `--private-ca-configmap` flag for the install command. For Embedded Cluster installations, the ConfigMap returned by PrivateCACert contains the CA trust store from the host. Embedded Cluster determines the CA trust store by first checking for the `SSL_CERT_FILE` environment variable. If `SSL_CERT_FILE` is not set, Embedded Cluster then searches common certificate paths and uses the first valid certificate file found.

You can use this template function to mount the specified ConfigMap so your containers can access the internet through enterprise proxies that issue their own TLS certificates in order to inspect traffic.

:::note
This function returns the name of the ConfigMap even if the ConfigMap has no entries. If no ConfigMap exists, this function returns the empty string.
:::

## Cluster Information Functions

### Distribution
```go
func Distribution() string
```
Distribution returns the Kubernetes distribution detected. The possible return values are:

* aks
* digitalOcean
* dockerDesktop
* eks
* embedded-cluster
* gke
* ibm
* k0s
* k3s
* kind
* kurl
* microk8s
* minikube
* oke
* openShift
* rke2

:::note
[IsKurl](#iskurl) can also be used to detect kURL instances.
:::

#### Detect the Distribution
```yaml
repl{{ Distribution }}
```
#### Equal To Comparison
```yaml
repl{{ eq Distribution "gke" }}
```
#### Not Equal To Comparison
```yaml
repl{{ ne Distribution "embedded-cluster" }}
```
See [Functions](https://pkg.go.dev/text/template#hdr-Functions) in the Go documentation.

### IsKurl
```go
func IsKurl() bool
```
IsKurl returns true if running within a kurl-based installation.
#### Detect kURL Installations
```yaml
repl{{ IsKurl }}
```
#### Detect Non-kURL Installations
```yaml
repl{{ not IsKurl }}
```
See [Functions](https://pkg.go.dev/text/template#hdr-Functions) in the Go documentation.

### KotsVersion

```go
func KotsVersion() string
```

KotsVersion returns the current version of KOTS.

```yaml
repl{{ KotsVersion }}
```

You can compare the KOTS version as follows:
```yaml
repl{{KotsVersion | semverCompare ">= 1.19"}}
```

This returns `true` if the KOTS version is greater than or equal to `1.19`.

For more complex comparisons, see [Semantic Version Functions](https://masterminds.github.io/sprig/semver.html) in the sprig documentation.

### KubernetesMajorVersion

> Introduced in KOTS v1.92.0

```go
func KubernetesMajorVersion() string
```

KubernetesMajorVersion returns the Kubernetes server *major* version.

```yaml
repl{{ KubernetesMajorVersion }}
```

You can compare the Kubernetes major version as follows:
```yaml
repl{{lt (KubernetesMajorVersion | ParseInt) 2 }}
```

This returns `true` if the Kubernetes major version is less than `2`.

### KubernetesMinorVersion

> Introduced in KOTS v1.92.0

```go
func KubernetesMinorVersion() string
```

KubernetesMinorVersion returns the Kubernetes server *minor* version.

```yaml
repl{{ KubernetesMinorVersion }}
```

You can compare the Kubernetes minor version as follows:
```yaml
repl{{gt (KubernetesMinorVersion | ParseInt) 19 }}
```

This returns `true` if the Kubernetes minor version is greater than `19`.

### KubernetesVersion

> Introduced in KOTS v1.92.0

```go
func KubernetesVersion() string
```

KubernetesVersion returns the Kubernetes server version.

```yaml
repl{{ KubernetesVersion }}
```

You can compare the Kubernetes version as follows:
```yaml
repl{{KubernetesVersion | semverCompare ">= 1.19"}}
```

This returns `true` if  the Kubernetes version is greater than or equal to `1.19`.

For more complex comparisons, see [Semantic Version Functions](https://masterminds.github.io/sprig/semver.html) in the sprig documentation.

### Namespace
```go
func Namespace() string
```
Namespace returns the Kubernetes namespace that the application belongs to.
```yaml
'{{repl Namespace}}'
```

### NodeCount
```go
func NodeCount() int
```
NodeCount returns the number of nodes detected within the Kubernetes cluster.
```yaml
repl{{ NodeCount }}
```

### Lookup

> Introduced in KOTS v1.103.0

```go
func Lookup(apiversion string, resource string, namespace string, name string) map[string]interface{}
```

Lookup searches resources in a running cluster and returns a resource or resource list.

Lookup uses the Helm lookup function to search resources and has the same functionality as the Helm lookup function. For more information, see [lookup](https://helm.sh/docs/chart_template_guide/functions_and_pipelines/#using-the-lookup-function) in the Helm documentation.

```yaml
repl{{ Lookup "API_VERSION" "KIND" "NAMESPACE" "NAME" }}
```

Both `NAME` and `NAMESPACE` are optional and can be passed as an empty string ("").

The following combination of parameters are possible:

<table>
  <tr>
    <th>Behavior</th>
    <th>Lookup function</th>
  </tr>
  <tr>
    <td style={{ fontSize: 14 }}><code>kubectl get pod mypod -n mynamespace</code></td>
    <td style={{ fontSize: 14 }}><code>repl&#123;&#123; Lookup "v1" "Pod" "mynamespace" "mypod" &#125;&#125;</code></td>
  </tr>
  <tr>
    <td style={{ fontSize: 14 }}><code>kubectl get pods -n mynamespace</code></td>
    <td style={{ fontSize: 14 }}><code>repl&#123;&#123; Lookup "v1" "Pod" "mynamespace" "" &#125;&#125;</code></td>
  </tr>
  <tr>
    <td style={{ fontSize: 14 }}><code>kubectl get pods --all-namespaces</code></td>
    <td style={{ fontSize: 14 }}><code>repl&#123;&#123; Lookup "v1" "Pod" "" "" &#125;&#125;</code></td>
  </tr>
  <tr>
    <td style={{ fontSize: 14 }}><code>kubectl get namespace mynamespace</code></td>
    <td style={{ fontSize: 14 }}><code>repl&#123;&#123; Lookup "v1" "Namespace" "" "mynamespace" &#125;&#125;</code></td>
  </tr>
  <tr>
    <td style={{ fontSize: 14 }}><code>kubectl get namespaces</code></td>
    <td style={{ fontSize: 14 }}><code>repl&#123;&#123; Lookup "v1" "Namespace" "" "" &#125;&#125;</code></td>
  </tr>
</table>

The following describes working with values returned by the Lookup function:

* When Lookup finds an object, it returns a dictionary with the key value pairs from the object. This dictionary can be navigated to extract specific values. For example, the following returns the annotations for the `mynamespace` object:

    ```
    repl{{ (Lookup "v1" "Namespace" "" "mynamespace").metadata.annotations }}
    ```

* When Lookup returns a list of objects, it is possible to access the object list through the `items` field. For example:

    ```
    services: |
      repl{{- range $index, $service := (Lookup "v1" "Service" "mynamespace" "").items }}
      - repl{{ $service.metadata.name }}
      repl{{- end }}
    ```

    For an array value type, omit the `|`. For example:

    ```
    services:
      repl{{- range $index, $service := (Lookup "v1" "Service" "mynamespace" "").items }}
      - repl{{ $service.metadata.name }}
      repl{{- end }}
    ```

* When no object is found, Lookup returns an empty value. This can be used to check for the existence of an object.

## Date Functions

### Now
```go
func Now() string
```
Returns the current timestamp as an RFC3339 formatted string.
```yaml
'{{repl Now }}'
```

### NowFmt
```go
func NowFmt(format string) string
```
Returns the current timestamp as a formatted string.
For information about Go time formatting guidelines, see [Constants](https://golang.org/pkg/time/#pkg-constants) in the Go documentation.
```yaml
'{{repl NowFmt "20060102" }}'
```

## Encoding Functions

### Base64Decode
```go
func Base64Decode(stringToDecode string) string
```
Returns decoded string from a Base64 stored value.
```yaml
'{{repl ConfigOption "base_64_encoded_name" | Base64Decode }}'
```

### Base64Encode
```go
func Base64Encode(stringToEncode string) string
```
Returns a Base64 encoded string.
```yaml
'{{repl ConfigOption "name" | Base64Encode }}'
```

### UrlEncode
```go
func UrlEncode(stringToEncode string) string
```
Returns the string, url encoded.
Equivalent to the `QueryEscape` function within the golang `net/url` library. For more information, see [func QueryEscape](https://godoc.org/net/url#QueryEscape) in the Go documentation.
```yaml
'{{repl ConfigOption "smtp_email" | UrlEncode }}:{{repl ConfigOption "smtp_password" | UrlEncode }}@smtp.example.com:587'
```

### UrlPathEscape

```go
func UrlPathEscape(stringToEncode string) string
```
Returns the string, url *path* encoded.
Equivalent to the `PathEscape` function within the golang `net/url` library. For more information, see [func PathEscape](https://godoc.org/net/url#PathEscape) in the Go documentation.
```yaml
'{{repl ConfigOption "smtp_email" | UrlPathEscape }}:{{repl ConfigOption "smtp_password" | UrlPathEscape }}@smtp.example.com:587'
```

## Encryption Functions

### KubeSeal
```go
func KubeSeal(certData string, namespace string, name string, value string) string
```

## Integer and Float Functions

### HumanSize
```go
func HumanSize(size interface{}) string
```
HumanSize returns a human-readable approximation of a size in bytes capped at 4 valid numbers (eg. "2.746 MB", "796 KB").
The size must be a integer or floating point number.
```yaml
'{{repl ConfigOption "min_size_bytes" | HumanSize }}'
```

## Proxy Functions

### HTTPProxy

```go
func HTTPProxy() string
```
HTTPProxy returns the address of the proxy that the Admin Console is configured to use.
```yaml
repl{{ HTTPProxy }}
```

### HTTPSProxy

```go
func HTTPSProxy() string
```
HTTPSProxy returns the address of the proxy that the Admin Console is configured to use.
```yaml
repl{{ HTTPSProxy }}
```

### NoProxy

```go
func NoProxy() string
```
NoProxy returns the comma-separated list of no-proxy addresses that the Admin Console is configured to use.
```yaml
repl{{ NoProxy }}
```

## Math Functions
### Add
```go
func Add(x interface{}, y interface{}) interface{}
```
Adds x and y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
'{{repl Add (ConfigOption "maximum_users") 1}}'
```

### Div
```go
func Div(x interface{}, y interface{}) interface{}
```
Divides x by y.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer and will be rounded down.
```yaml
'{{repl Div (ConfigOption "maximum_users") 2.0}}'
```

### Mult
```go
func Mult(x interface{}, y interface{}) interface{}
```
Multiplies x and y.

Both operands must be either an integer or a floating point number.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
'{{repl Mult (NodePrivateIPAddressAll "DB" "redis" | len) 2}}'
```

If a template function returns a string, the value must be converted to an integer or a floating point number first:
```yaml
'{{repl Mult (ConfigOption "session_cookie_age" | ParseInt) 86400}}'
```

### Sub
```go
func Sub(x interface{}, y interface{}) interface{}
```
Subtracts y from x.

If at least one of the operands is a floating point number, the result will be a floating point number.

If both operands are integers, the result will be an integer.
```yaml
'{{repl Sub (ConfigOption "maximum_users") 1}}'
```

## String Functions

### ParseBool
```go
func ParseBool(str string) bool
```
ParseBool returns the boolean value represented by the string.
```yaml
'{{repl ConfigOption "str_value" | ParseBool }}'
```

### ParseFloat
```go
func ParseFloat(str string) float64
```
ParseFloat returns the float value represented by the string.
```yaml
'{{repl ConfigOption "str_value" | ParseFloat }}'
```

### ParseInt
```go
func ParseInt(str string, args ...int) int64
```
ParseInt returns the integer value represented by the string with optional base (default 10).
```yaml
'{{repl ConfigOption "str_value" | ParseInt }}'
```

### ParseUint
```go
func ParseUint(str string, args ...int) uint64
```
ParseUint returns the unsigned integer value represented by the string with optional base (default 10).
```yaml
'{{repl ConfigOption "str_value" | ParseUint }}'
```

### RandomString
```go
func RandomString(length uint64, providedCharset ...string) string
```
Returns a random string with the desired length and charset.
Provided charsets must be Perl formatted and match individual characters.
If no charset is provided, `[_A-Za-z0-9]` will be used.

#### Examples

The following example generates a 64-character random string:

```yaml
'{{repl RandomString 64}}'
```
The following example generates a 64-character random string that contains `a`s and `b`s:

```yaml
'{{repl RandomString 64 "[ab]" }}'
```
#### Generating Persistent and Ephemeral Strings

When you assign the RandomString template function to a `value` key in the Config custom resource, you can use the `hidden` and `readonly` properties to control the behavior of the RandomString function each time it is called. The RandomString template function is called each time the user deploys a change to the configuration settings for the application.

Depending on if the `hidden` and `readonly` properties are `true` or `false`, the random string generated by a RandomString template function in a `value` key is either ephemeral or persistent between configuration changes:

* **Ephemeral**: The value of the random string _changes_ when the user deploys a change to the configuration settings for the application.
* **Persistent**: The value of the random string does _not_ change when the user deploys a change to the configuration settings for the application.

For more information about these properties, see [`hidden`](custom-resource-config#hidden) and [`readonly`](custom-resource-config#readonly) in _Config_.

:::note
If you assign the RandomString template function to a `default` key in the Config custom resource rather than a `value` key, then the `hidden` and `readonly` properties do _not_ affect the behavior of the RandomString template function. For more information about the behavior of the `default` key in the Config custom resource, see [`default`](custom-resource-config#default) in _Config_.
:::

The following table describes the behavior of the RandomString template function when it is assigned to a `value` key in the Config custom resource and the `hidden` and `readonly` properties are `true` or `false`:

<table>
  <tr>
    <th width="15%">readonly</th>
    <th width="15%">hidden</th>
    <th width="15%">Outcome</th>
    <th width="55%">Use Case</th>
  </tr>
  <tr>
    <td>false</td>
    <td>true</td>
    <td>Persistent</td>
    <td>
      <p>Set <code>readonly</code> to <code>false</code> and <code>hidden</code> to <code>true</code> if:</p>
      <ul>
        <li>The random string must <em>not</em> change each time the user deploys a change to the application's configuration settings.</li>
        <li>The user does <em>not</em> need to see or change, or must be prevented from seeing or changing, the value of the random string.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>true</td>
    <td>false</td>
    <td>Ephemeral</td>
    <td>
      <p>Set <code>readonly</code> to <code>true</code> and <code>hidden</code> to <code>false</code> if:</p>
      <ul>
        <li>The random string <em>must</em> change each time the user deploys a change to the application's configuration settings.</li>
        <li>The user does <em>not</em> need to change, or must be prevented from changing, the value of the random string.</li>
        <li>The user <em>must</em> be able to see the value of the random string.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>true</td>
    <td>true</td>
    <td>Ephemeral</td>
    <td>
      <p>Set <code>readonly</code> to <code>true</code> and <code>hidden</code> to <code>true</code> if:</p>
      <ul>
        <li>The random string <em>must</em> change each time the user deploys a change to the application's configuration settings.</li>
        <li>The user does <em>not</em> need to see or change, or must be preventing from seeing or changing, the value of the random string.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>false</td>
    <td>false</td>
    <td>Persistent</td>
    <td>
      <p>Set <code>readonly</code> to <code>false</code> and <code>hidden</code> to <code>false</code> if:</p>
      <ul>
        <li>The random string must <em>not</em> change each time the user deploys a change to the application's configuration settings.</li>
        <li>The user <em>must</em> be able to see and change the value of the random string.</li>
      </ul>
      <p>For example, set both <code>readonly</code> and <code>hidden</code> to <code>false</code> to generate a random password that users must be able to see and then change to a different value that they choose.</p>
    </td>
  </tr>
</table>

### Split
```go
func Split(s string, sep string) []string
```
Split slices s into all substrings separated by sep and returns an array of the substrings between those separators.
```yaml
'{{repl Split "A,B,C" "," }}'
```

Combining `Split` and `index`:
Assuming the `github_url` param is set to `https://github.mycorp.internal:3131`, the following would set
`GITHUB_HOSTNAME` to `github.mycorp.internal`.
```yaml
'{{repl index (Split (index (Split (ConfigOption "github_url") "/") 2) ":") 0}}'
```

### ToLower
```go
func ToLower(stringToAlter string) string
```
Returns the string, in lowercase.
```yaml
'{{repl ConfigOption "company_name" | ToLower }}'
```

### ToUpper
```go
func ToUpper(stringToAlter string) string
```
Returns the string, in uppercase.
```yaml
'{{repl ConfigOption "company_name" | ToUpper }}'
```

### Trim
```go
func Trim(s string, args ...string) string
```
Trim returns a string with all leading and trailing strings contained in the optional args removed (default space).
```yaml
'{{repl Trim (ConfigOption "str_value") "." }}'
```

### TrimSpace
```go
func TrimSpace(s string) string
```
Trim returns a string with all leading and trailing spaces removed.
```yaml
'{{repl ConfigOption "str_value" | TrimSpace }}'
```

### YamlEscape
```go
func YamlEscape(input string) string
```

YamlEscape returns an escaped and quoted version of the input string, suitable for use within a YAML document.
This can be useful when dealing with user-uploaded files that may include null bytes and other nonprintable characters. For more information about printable characters, see [Character Set](https://yaml.org/spec/1.2.2/#51-character-set) in the YAML documentation.

```yaml
repl{{ ConfigOptionData "my_file_upload" | YamlEscape }}
```
