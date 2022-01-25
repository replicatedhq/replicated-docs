
# About release channels

By default, there are 3 release channels: Stable, Beta and Unstable. When you first log in to Replicated and select the Channels tab, you’ll see these default release channels created.
You can delete, edit, or create new channels at any time.

You assign a customer to one or more of these channels. When you assign a customer to multiple channels, the customer selects the channel when they install your application. The customer can later change the release channel in the management console.
For installations in air gapped environments, the customer selects the channel during download.

The channels Replicated creates by default are commonly used for:

## Unstable
The Unstable channel is designed for you to constantly push releases to, much in the same way that you continuously deploy new versions to your cloud product.
This is the channel that your development environment should have a license assigned to.
This channel is designed to be internal and for testing, not for your customers to be licensed against.

## Beta
The Beta channel is created for release candidates and early adopting customers.
We recommend you promote a release to the Beta channel once it’s passed automated testing in the Unstable channel.
You can also choose to license some early-adopting customers against this channel.

## Stable
For most of your customers, you will create a license that assigns them to the Stable channel.
By doing so, they’ll only receive updates when you push a new version to this channel.
