import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# cluster ls

List the clusters available for compatibility testing. For more information, see [About Compatibility Matrix](/vendor/testing-about).

## Usage

```bash
replicated cluster ls [flags]
```

```bash
replicated cluster list [flags]
```

<table>
<tr>
  <th width="30%">Flag</th>
  <th width="20%">Type (if applicable)</th>
  <th width="50%">Description</th>
</tr>
<tr>
  <td>`--end-time`</td>
  <td>string</td>
  <td>The end time for the query. <strong>Format:</strong> 2006-01-02T15:04:05Z</td>
</tr>
<tr>
  <td>`--output`</td>
  <td>string</td>
  <td>The output format to use. <strong>Value values:</strong> json, table or wide. <strong>Default:</strong> table</td>
</tr>
<tr>
  <td>`--show-terminated`</td>
  <td></td>
  <td>When set, only shows terminated clusters.</td>
</tr>
<tr>
  <td>`--start-time`</td>
  <td>string</td>
  <td>The start time for the query. <strong>Format:</strong> 2006-01-02T15:04:05Z</td>
</tr>
<tr>
  <td>`-w`, `--watch`</td>
  <td></td>
  <td>Watches the clusters.</td>
</tr>
</table>

## Global Flags

<GlobalFlags/>

## Examples

```bash
replicated cluster ls
```
```bash                 
# List all clusters with default table output
replicated cluster ls
```
```bash
# Show clusters created after a specific date
replicated cluster ls --start-time 2023-01-01T00:00:00Z
```
```bash
# Watch for real-time updates
replicated cluster ls --watch
```
```bash
# List clusters with JSON output
replicated cluster ls --output json
```
```bash
# List only terminated clusters
replicated cluster ls --show-terminated
```
```bash
# List clusters with wide table output
replicated cluster ls --output wide
```