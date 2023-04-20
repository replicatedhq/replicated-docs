import SemanticVersionNumber from "../partials/releases/_semantic-version-number.mdx"


# Configuring Semantic Versioning

This topic describes how to use semantic versioning in channels and releases.

## About Semantic Versioning

Semantic versioning is available with the Replicated app manager v1.58.0 and later. Note the following:

- For applications created in the vendor portal on or after February 23, 2022, semantic versioning is enabled by default on the Stable and Beta channels. Semantic versioning is disabled on the Unstable channel by default.

- For existing applications created before February 23, 2022, semantic versioning is disabled by default on all channels.

When you enable semantic versioning on a channel, the version label for a release promoted to that channel is verified to ensure that it is a valid semantic version. For more information about valid semantic versions, see [Semantic Versioning 2.0.0](https://semver.org).

If you enable semantic versioning for a channel and then promote releases to it, Replicated recommends that you do not later disable semantic versioning for that channel. Note the following:

- For applications created in the vendor portal on or after February 23, 2022, semantic versioning is enabled by default on the Stable and Beta channels. Semantic versioning is disabled on the Unstable channel by default.

- For existing applications created before February 23, 2022, semantic versioning is disabled by default on all channels.

When you enable semantic versioning on a channel, the version label for a release promoted to that channel is verified to ensure that it is a valid semantic version. For more information about valid semantic versions, see [Semantic Versioning 2.0.0](https://semver.org).

If you enable semantic versioning for a channel and then promote releases to it, Replicated recommends that you do not later disable semantic versioning for that channel.

For information about semantic versioning sequencing with app manager, see [Semantic Versioning Sequence](releases-about#semantic-versioning-sequence) in _About Releases_.

## Configure Semantic Versioning with the Vendor Portal

You can enable semantic versioning on the channel, if it is not enabled by default.

### Using the Vendor Portal

To configure semantic versioning using the vendor portal:

1. On the **Channels** page, click the settings icon in the upper right corner of the channel where you want to enable semantic versioning.  

1. In the Channel Settings dialog, select the **Enable Semantic Versioning** toggle.

    ![Channel Setting Dialog](/images/channel-settings-dialog.png)

1. Promote a draft release to the channel where semantic versioning is enabled. 

    For **Version label**: <SemanticVersionNumber/>

### Using the CLI

There are many ways to create a release using the command line. It is possible to create a release and promote it to a channel with a single command. This procedure shows how to do it with separate commands to help you understand the process. 

To configure semantic versioning using the CLI:

1. Run the following command to get a full list of the channels for you application:

    ```bash
    replicated channel ls
    ```

    Note the channel ID for the channel where you want to enable semantic versioning.

1. Run the following command to enable semantic versioning on the channel: 

    ```bash
    replicated channel enable-semantic-versioning CHANNEL_ID
    ``` 

    Replace `CHANNEL_ID` with the ID of the target channel.

1. Run the following command to create a draft release:

    ```bash
    replicated release create [flags]
    ```

    For information about the flag options, see [`release create`](/reference/replicated-cli-release-create) in the _replicated CLI_ reference.

    Note the `SEQUENCE` number in the output.

1. Run the following command to promote the draft release:

    ```bash
    replicated release promote SEQUENCE CHANNEL_ID --version VERSION_NUMBER
    ```

    Replace:
    
    - `SEQUENCE` with the integer number corresponding to a specific release.
    - `CHANNEL_ID` with the ID of the target channel or the case sensitive name of the channel.
    - `VERSION_NUMBER` with the semantic version number. <SemanticVersionNumber/>