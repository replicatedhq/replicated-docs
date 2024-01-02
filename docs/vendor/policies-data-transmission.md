# Data Transmission Policy

A Replicated installation connects to a Replicated-hosted endpoint periodically to perform various tasks including checking for updates and synchronizing the installed license properties. During this time, some data is transmitted from an installed instance to the Replicated API. This data is limited to:

- The IP address of the primary Replicated instance.
- The ID of the installation.
- [Resource statuses](https://docs.replicated.com/enterprise/status-viewing-details#resource-statuses)
- Information about the installation including data needed for [instance details](https://docs.replicated.com/vendor/instance-insights-details).
- [Custom metrics](https://docs.replicated.com/vendor/custom-metrics) which the vendor may configure as part of the installation.
- Date and timestamps of the data transmission.

This data is required to provide the expected update and license services. The data is also used to provide telemetry and other reporting features.

By default, no additional data is collected and transmitted from the instance to external servers.

All data is encrypted in transit according to industry best practices. For more information about Replicated's security practices, see [Security at Replicated](https://www.replicated.com/security/) on the Replicated website.

For more information about application instance data fields that the Replicated vendor portal uses to generate events for instances, see [About Instance and Event Data](/vendor/instance-insights-event-data).

Last modified December 31, 2023
