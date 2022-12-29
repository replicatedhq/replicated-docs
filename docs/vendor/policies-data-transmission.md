# Data Transmission Policy

A Replicated installation connects to a Replicated-hosted endpoint periodically to perform various tasks including checking for updates and syncing the installed license properties. During this time, some data is transmitted from an installed instance to the Replicated API. This data is limited to:

- The IP address of the primary Replicated instance.
- The ID of the installation.
- The state of the installation (running, stopped, etc).
- Information about the installation (version of the app, version of Replicated components, version of Kubernetes, version of Kubernetes addons, etc.).

This data is required to provide the expected update and license services. The data is also used to provide telemetry and other reporting features.

No additional data is collected and transmitted by default from the instance to external servers.

All data is encrypted in transit according to industry best pratices. More information about Replicated's security practices are available on our website at [Security at Replicated](https://www.replicated.com/security/)

Last modified December 29, 2022