# Viewing Installer History

This topic describes how to access the installation commands for all Kubernetes installers that have been promoted to a channel. 

## About Installer History

Each release channel in the Replicated vendor portal saves the history of the Kubernetes installers that were promoted to the channel. You can view the list of historical installers for each channel on the **Kubernetes Installer History** page.

To access the **Kubernetes Installer History** page, go to **Channels** click the **Installer history** button on the target channel.

The following image shows an example **Kubernetes Installer History** page with three installers listed:

![Installer History page in the vendor portal](/images/installer-history-page.png)

[View a larger version of this image](/images/installer-history-page.png)

The installers are listed in the order in which they were promoted to the channel. The installer at the top of the list is the active installer for the channel.  

The **Kubernetes Installer History** page includes the following information for each installer listed:
* Version label, if provided when the installer was promoted
* Sequence number
* Installation command
* Installer YAML content

## About Installing Inactive Installers

It can be useful to access the installation commands for historical, inactive installers to reproduce an issue that a user is experiencing for troubleshooting purposes. For example, if the user's cluster is on version 1.0.0 of an installer, you can access the installation command for version 1.0.0 then install it in a test environment to troubleshoot.

You can also send the installation commands for inactive installers to your end users as needed. For example, users might be required to install inactive installers when upgrading the version of Kubernetes in their cluster because the Kubernetes installer supports upgrading no more than two minor versions of Kubernetes at a time. For more information about this upgrade process for enterprise users, see [Upgrading Kubernetes Installer Clusters](/enterprise/updating-embedded-cluster) in _Enterprise_. 