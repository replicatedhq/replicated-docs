# Creating and Editing Channels

There are three default channels that can be edited or archived. You can also add custom channels.

The default channels are:
* **Stable**: The Stable channel is intended for production installations.
* **Unstable**: The Unstable channel is intended for internal testing.
* **Beta**: The Beta channel is intended for release candidates and early adopting customers.

For more information, see [About channels](releases-about-channels).

## Create a Channel

To create a channel:

1. From the Replicated [vendor portal](https://vendor.replicated.com), select Channels from the left menu.
1. Click **Create Channel**.

  The Create a new channel dialog opens.

  ![Create Channel](/images/channels-create.png)

1. Enter a name and description for the channel.
1. (Optional) To enable semantic versioning on the channel, turn on **Enable semantic versioning**. For more information, see [Enabling Semantic Versioning](releases-semantic-versioning).
1. (Optional) To enable an air gap bundle format that supports image digests and deduplication of image layers, turn on **Enable new air gap bundle format**. For more information, see [Using Image Tags and Digests](/vendor/packaging-private-images#using-image-tags-and-digests) in _Connecting to an Image Registry_.
1. Click **Create Channel**.

## Edit a Channel

To edit an existing channel:

1. In the vendor portal, select **Channels** from the left menu.
1. Click the **edit** icon on the top right of the channel that you want to modify.

  The Edit a channel dialog opens.

  ![Edit Channel](/images/channels-edit.png)

1. Edit the fields and click **Save**.

## Archive a Channel

You can archive an existing channel to prevent any new releases from being promoted to the channel.

:::note
You cannot archive a channel if:
* There are customers assigned to the channel.
* The channel is set as the default channel.

Assign customers to a different channel and set a different channel as the default before archiving.
:::

To archive a channel with the vendor portal or the replicated CLI:

* **Vendor portal**: In the vendor portal, go to the **Channels** page and click the trash can icon in the top right corner of the card for the channel that you want to archive.
* **replicated CLI**:
  1. Run the following command to find the ID for the channel that you want to archive:
     ```
     replicated channel ls
     ```
     The output of this command includes the ID and name for each channel, as well as information about the latest release version on the channels.

  1. Run the following command to archive the channel:
     ```
     replicated channel rm CHANNEL_ID
     ```
     Replace `CHANNEL_ID` with the channel ID that you retrieved in the previous step.

     For more information, see [channel delete](/reference/replicated-cli-channel-delete) in the replicated CLI documentation.

## Related Topic

[How to Package and Distribute an Application](distributing-workflow)
