# About customer licenses

Each customer you deploy to Replicated has a unique license file for their installation. This license file identifies the customer and the application during the installation and update processes.

Each customer license uniquely identifies the customer, specifies their release channel, and defines _entitlement information_ about the customer.

Entitlement information describes the parameters of the license, such as if the license has an expiration date.

Replicated securely delivers these entitlement values to the application, and makes them available in the Kubernetes manifests or at runtime using the Replicated admin console license API.

You assign a license to a release channel. When a license is assigned to multiple channels, the customer selects the channel at install time and can later change the release channel in the management console.
For air gapped installations, the customer can select the channel during download.

## About archiving customer licenses

When you archive a license in the vendor portal, it is hidden in the default license search and becomes read-only.
Archival does not affect the utility of license files downloaded before the change.

To expire a license, set an expiration date and policy before archiving.
This is a convenience feature for how licenses are displayed in the vendor portal.
