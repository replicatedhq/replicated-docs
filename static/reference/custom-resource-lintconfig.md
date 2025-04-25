# LintConfig

The linter checks the manifest files in Replicated KOTS releases to ensure that there are no YAML syntax errors, that all required manifest files are present in the release to support installation with KOTS, and more.

The linter runs automatically against releases that you create in the Replicated vendor portal, and displays any error or warning messages in the vendor portal UI.

The linter rules have default levels that can be overwritten. You can configure custom levels by adding a LintConfig manifest file (`kind: LintConfig`) to the release. Specify the rule name and level you want the rule to have. Rules that are not included in the LintConfig manifest file keep their default level. For information about linter rules and their default levels, see [Linter Rules](/reference/linter).

The supported levels are:

<table>
      <tr>
        <th width="20%">Level</th>
        <th width="80%">Description</th>
      </tr>
      <tr>
        <td>error</td>
        <td>The rule is enabled and shows as an error.</td>
      </tr>
      <tr>
        <td>warn</td>
        <td>The rule is enabled and shows as a warning.</td>
      </tr>
      <tr>
        <td>info</td>
        <td>The rule is enabled and shows an informational message.</td>
      </tr>
      <tr>
        <td>off</td>
        <td>The rule is disabled.</td>
      </tr>
    </table>


## Example
The following example manifest file overwrites the level for the application-icon to `off` to disable the rule. Additionally, the level for the application-statusInformers rule is changed to `error`, so instead of the default warning, it displays an error if the application is missing status informers.

```yaml
apiVersion: kots.io/v1beta1
kind: LintConfig
metadata:
  name: default-lint-config
spec:
  rules:
  - name: application-icon
    level: "off"
  - name: application-statusInformers
    level: "error"
```