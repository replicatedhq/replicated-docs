import Help from "../partials/replicated-cli/_help.mdx"

# release compatibility

Report the success or failure of compatibility tests ran against a release. View the compatibility result for a release with [`release inspect`](/reference/replicated-cli-release-inspect).

## Usage

```bash
replicated release compatibility SEQUENCE [flags]
```

Where `SEQUENCE` is the sequence number for the target release.

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>--distribution</code></td>
    <td>string</td>
    <td><p>Kubernetes distribution of the cluster to report on.</p></td>
  </tr>
  <tr>
    <td><code>--failure</code></td>
    <td>bool</td>
    <td> If set, the compatibility will be reported as a failure.</td>
  </tr>
  <Help/>
  <tr>
    <td><code>--notes</code></td>
    <td>string</td>
    <td>Additional notes to report.</td>
  </tr>
  <tr>
    <td><code>--success</code></td>
    <td></td>
    <td>If set, the compatibility will be reported as a success.</td>
  </tr>
  <tr>
    <td><code>--version</code></td>
    <td>string</td>
    <td>Kubernetes version of the cluster to report on (format is distribution dependent).</td>
  </tr>
</table>

## Example

```bash
replicated release compatibility 48 --distribution openshift --version 1.27.0 --success
```