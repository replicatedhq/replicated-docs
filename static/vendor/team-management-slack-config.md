# Configure a Slack Webhook (Beta)

As a vendor, anyone on your team can set up Slack notifications, which are sent to a shared Slack channel. Notifications give your team visibility into customer instance statuses and changes.

:::note
Configuring notifications for customer instance changes is in public Beta. Features and functionality are subject to change as we continue to iterate this functionality towards General Availability.
:::

Notifications can help catch problems before they happen and let you proactively contact customers to prevent support cases. For example, you can be notified of a degraded status and you can contact your customer about fixing it before the instance goes down. This approach can make issues quicker and easier to solve, and improve the customer experience with less down time.

For more information about how application status is determined, see [Resource Statuses](insights-app-status#resource-statuses) in _Enabling and Understanding Application Status_. For more information about events that might trigger notifications, see [How the Vendor Portal Generates Events and Insights](instance-insights-event-data#about-events) in _About Instance and Event Data_.

While email notifications are specific to each user, Slack notifications settings are shared, viewable, and editable by the entire team. Any changes made by a team member impacts the team.

## Limitations

As a Beta feature, the following limitations apply:

- Only one Slack channel per team is supported.

- RBAC policies are not supported for configuring granular permissions.

## Prerequisite

Create a Slack webhook URL. For more information, see [Sending Messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks) in the Slack API documentation.

Make sure to keep the URL secure because it contains a Secret that allows write access to one or more channels in your Slack Workspace.

## Configure the Webhook in the Vendor Portal

When you enable Slack notifications for a team, you must first configure the Slack webhook in the Vendor Portal. Typically you do this one time. Then you can configure notifications for individual customer instances.

To configure the Slack webhook:

1. From the **[Team Vendor Portal](https://vendor.replicated.com/team/members)** page, click **Slack Notifications**.

1. On the **Slack Notifications Setup** page, paste the Slack webhook URL. Click **Save**.

## Next Step

[Configure Slack notifications for customer instances](instance-notifications-config).