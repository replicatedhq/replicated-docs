import Help from "../partials/replicated-cli/_help.mdx"


# cluster ls

List the clusters available for compatibility testing. For more information, see [About Compatibility Matrix](/vendor/testing-about).


## Usage

```bash
replicated cluster ls [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td>--end-time</td>
    <td>string</td>
    <td>The end time for the query. <strong>Format:</strong> 2006-01-02T15:04:05Z</td>
  </tr>
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. <strong>Value values:</strong> json, table or wide. <strong>Default:</strong> table</td>
  </tr>
  <tr>
    <td>--show-terminated</td>
    <td></td>
    <td>When set, only shows terminated clusters.</td>
  </tr>
  <tr>
    <td>--start-time</td>
    <td>string</td>
    <td>The start time for the query. <strong>Format:</strong> 2006-01-02T15:04:05Z</td>
  </tr>
  <tr>
    <td>-w, --watch</td>
    <td></td>
    <td>Watches the clusters.</td>
  </tr>
</table>

## Example

```bash
replicated cluster ls
```
                 
