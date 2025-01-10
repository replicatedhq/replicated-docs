import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# release inspect

Inspect a release, including created and edited timestamps, compatibility results reported with the [`replicated release compatibility`](/reference/replicated-cli-release-compatibility) command, and the release config.

## Usage

```bash
replicated release inspect SEQUENCE [flags]
```

Where `SEQUENCE` is the sequence number for the target release.

## Global Flags

<GlobalFlags/>

## Example

```bash
replicated release inspect 48

SEQUENCE:    48
CREATED:     2023-09-25T16:31:33Z 
EDITED:      0001-01-01T00:00:00Z
COMPATIBILITY RESULTS
      DISTRIBUTION   VERSION   SUCCESS_AT              SUCCESS NOTES   FAILURE_AT   FAILURE NOTES
      eks            1.27      2023-09-25T18:59:46Z                        - 
CONFIG:
  ...
```