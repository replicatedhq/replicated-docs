import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# channel inspect

Show the full details for a channel.

## Usage
```bash
replicated channel inspect CHANNEL_ID
```

## Global Flags

<GlobalFlags/>

## Examples
```bash
replicated channel inspect cli-created
ID:             1xyB2Mgbg9N7rExShfbdBYIuzeW
NAME:           cli-created
DESCRIPTION:
RELEASE:        1
VERSION:        0.0.1
EXISTING:

    curl -fsSL https://kots.io/install | bash
    kubectl kots install cli-app/cli-created

EMBEDDED:

    curl -fsSL https://k8s.kurl.sh/cli-app-cli-created | sudo bash

AIRGAP:

    curl -fSL -o cli-app-cli-created.tar.gz https://k8s.kurl.sh/bundle/cli-app-cli-created.tar.gz
    # ... scp or sneakernet cli-app-cli-created.tar.gz to airgapped machine, then
    tar xvf cli-app-cli-created.tar.gz
    sudo bash ./install.sh airgap

```

```bash
replicated channel inspect 1xyB2Mgbg9N7rExShfbdBYIuzeW
ID:             1xyB2Mgbg9N7rExShfbdBYIuzeW
NAME:           cli-created
DESCRIPTION:    this is a description for a channel
RELEASE:        1
VERSION:        0.0.1
```
