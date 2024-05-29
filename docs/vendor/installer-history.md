# Installer History

This topic describes how to access the installation commands for all active and inactive Kubernetes installers promoted to a channel. 

## About Using Inactive Installers

Each release channel in the Replicated Vendor Portal saves the history of Kubernetes installers that were promoted to the channel. You can view the list of historical installers on the **Kubernetes Installer History** page for each channel. For more information, see [About the Installer History Page](#about) below.

It can be useful to access the installation commands for inactive installers to reproduce an issue that a user is experiencing for troubleshooting purposes. For example, if the user's cluster is running the inactive installer version 1.0.0, then you can install with version 1.0.0 in a test environment to troubleshoot.

You can also send the installation commands for inactive installers to your users as needed. For example, a user might have unique requirements for specific versions of Kubernetes or add-ons.

## About the Installer History Page {#about}

The **Kubernetes Installer History** page for each channel includes a list of all the Kubernetes installers that have been promoted to the channel, including the active installer and any inactive installers.

To access the **Kubernetes Installer History** page, go to **Channels** and click the **Installer history** button on the target channel.

The following image shows an example **Kubernetes Installer History** page with three installers listed:

![Installer History page in the Vendor Portal](/images/installer-history-page.png)

[View a larger version of this image](/images/installer-history-page.png)

The installers are listed in the order in which they were promoted to the channel. The installer at the top of the list is the active installer for the channel.  

The **Kubernetes Installer History** page includes the following information for each installer listed:

* Version label, if provided when the installer was promoted
* Sequence number
* Installation command
* Installer YAML content