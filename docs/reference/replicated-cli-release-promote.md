import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# release promote

Associates (promotes) a given release to a channel.

## Usage
```bash
replicated release promote SEQUENCE CHANNEL_ID [Flags]
```

* _The required `SEQUENCE` argument is the integer number corresponding to a specific release._
* _The required `CHANNEL_ID` argument is channel ID or the **case sensitive** name of the channel, as displayed to the user._

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <App/>
  <Help/>
  <tr>
    <td><code>--release-notes</code></td>
    <td>string</td>
    <td>The release notes for the release. Supports markdown formatting.</td>
  </tr>
  <tr>
    <td><code>--required</code></td>
    <td></td>
    <td>Prevents users from skipping this release during application upgrades. For more information, see <a href="/vendor/releases-creating-releases">Managing Releases with the Vendor Portal</a>.</td>
  </tr>
  <Token/>
  <tr>
    <td><code>--version</code></td>
    <td>string</td>
    <td><p>A version label for the release in this channel.</p><p>If semantic versioning is enabled on the channel, then the version label must be a valid semantic version number. See <a href="/vendor/releases-about#semantic-versioning">Semantic Versioning</a> in <em>About Releases</em>.</p></td>
  </tr>
</table>

## Examples
```bash
replicated release promote 24 Beta --optional --version 1.3.0 --release-notes "Optional Beta release for feature X"
Channel jWNZHo8ypjrX1HkC4UXInoSI5OsK586m successfully set to release 24
```

```bash
replicated release promote 15 fe4901690971757689f022f7a460f9b2
Channel fe4901690971757689f022f7a460f9b2 successfully set to release 15
