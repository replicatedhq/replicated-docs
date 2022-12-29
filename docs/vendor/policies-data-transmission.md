# Data Transmission Policy

A Replicated installation connects to a Replicated-hosted endpoint periodically to perform various tasks including checking for updates and synchronizing the installed license properties. During this time, some data is transmitted from an installed instance to the Replicated API. This data is limited to:

- The IP address of the primary Replicated instance.
- The ID of the installation.
- The state of the installation (running, stopped, and so on).
- Information about the installation (version of the app, version of Replicated components, version of Kubernetes, version of Kubernetes addons, and so on).

This data is required to provide the expected update and license services. The data is also used to provide telemetry and other reporting features.

By default, no additional data is collected and transmitted from the instance to external servers.

All data is encrypted in transit according to industry best practices. For more information about Replicated's security practices, see [Security at Replicated](https://www.replicated.com/security/) on the Replicated website.

Last modified December 29, 2022
