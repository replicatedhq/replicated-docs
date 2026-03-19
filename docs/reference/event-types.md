# Event types and filters (Beta)

This topic lists the types of events supported for the Event Notifications (Beta) feature. For more information about event notifications, see [About event notifications (Beta)](/vendor/event-notifications).

## Channel events

### Channel Created

When a new channel is created for an application.

### Channel Archived

When a channel is archived.

## Customer events

### Customer Created

When a new customer is created.

### Customer Updated

When a customer's details or license is updated.

### Customer Archived

When a customer is archived.

### Customer Unarchived (Restored)

When a customer is restored from archived state.

### Customer License Expiring

Time-based warning of an upcoming license expiration.

### Pending Self-Service Signup

When someone signs up via the self-service portal (if enabled).

## Instance events

### Instance Created

When a new instance sends its first check-in.

### Instance Ready

When a new instance's application status is Ready for the first time.

### Instance Upgrade Started

When an instance begins upgrading to a new release version. This event fires when the Vendor Portal receives the first telemetry with a new release version, whether or not the application status is Ready.

### Instance Upgrade Completed

When an instance's application status is Ready after upgrading to a new release version.

### Instance Version Behind

When an instance falls behind by a specified number of versions.

### Instance Inactive

When an instance has not checked-in for 24 hours (declared "Inactive"). Air-gapped instances are excluded from this event type.

### Instance State Duration

When an instance has been in a specific state (such as Unavailable or Degraded) for a specified duration.

The Instance State Duration event type requires you to specify the target state and duration threshold. Only one Instance State Duration event is allowed per subscription.

| Filter | Required | Options |
|--------|----------|---------|
| State | Yes | Ready, Unavailable, Degraded, Updating, Missing |
| Duration | Yes | 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 8 hours, 24 hours |

The notification triggers when an instance has been in the specified state for at least the configured duration. If the instance recovers and later re-enters the monitored state, the notification can trigger again after the duration threshold is met.

### Instance State Flapping

When an instance is changing states frequently within a configured time window.

The Instance State Flapping event type requires you to specify the sensitivity of flapping detection:

| Filter | Required | Default | Options |
|--------|----------|---------|---------|
| Minimum State Changes | Yes | — | 3, 5, 10, 15, 20 |
| Time Window | Yes | — | 30 minutes, 1 hour, 2 hours |
| Cooldown Period | No | 1 hour | 15 minutes, 30 minutes, 1 hour, 2 hours, 1 day |

The notification triggers when an instance accumulates the specified number of state changes within the time window. The cooldown period prevents repeated notifications for the same instance within the configured interval.

### Custom Metric Threshold Reached

When a custom metric value reported by an instance meets a configured threshold condition.

:::note
Instance event notifications use the **Instance Name** if set. Otherwise, they use the Instance ID.
:::

The Custom Metric Threshold Reached event type requires a metric name, comparison operator, and notification frequency. You can include only one Custom Metric Threshold Reached event per subscription.

The following table describes each of the filters for the Custom Metric Threshold Reached event type:

| Filter | Required | Description |
|--------|----------|-------------|
| Metric Name | Yes | Select from previously reported custom metrics or enter a metric name manually |
| Operator | Yes | Comparison operator. The operators available depend on the metric type. For more information, see [Available operators](#available-operators). |
| Threshold Value | Conditional | Required for all operators except `is_true`, `is_false`, `exists`, and `not_exists` |
| Frequency | Yes | Controls how often you receive the notification. For more information, see [Frequency options](#frequency-options). |

#### Available operators

The available operators depend on the type of metric value:

| Metric Type | Available Operators |
|-------------|-------------------|
| Number | greater than, greater than or equal, less than, less than or equal, equals, does not equal, exists, does not exist |
| Boolean | is true, is false, equals, does not equal, exists, does not exist |
| String | contains, starts with, ends with, equals, does not equal, exists, does not exist |

#### Frequency options

The following frequency options control how often the notification triggers:

| Frequency | Behavior |
|-----------|----------|
| Send Once | Notifies the first time the metric meets the threshold. Does not notify again until the condition clears and the metric meets the threshold again. |
| When Changed | Notifies when the metric meets the threshold and its value has changed since the last notification. |
| Each Time | Notifies every time a metric report meets the threshold condition. |

## Release events

### Release Created

When a new release is created.

### Release Promoted

When a release is promoted to a channel.

### Release Demoted (Unpublished)

When a release is demoted from a channel.

### Release Assets Downloaded

When a customer pulls a release asset (Helm chart, Embedded Cluster bundle, or proxy registry image). Fires one time per individual asset pull. Includes whether this is the customer's first ever software pull, which is useful for revenue recognition tracking.

The following table describes the available filters for the Release Assets Downloaded event type:

| Filter | Required | Options |
|--------|----------|---------|
| Application | No | Any application in your account |
| Channel | No | Any channel for the selected application |
| Customer | No | Any customer for the selected application |
| License Type | No | Paid, Trial, Community, `dev` |
| Asset Type | No | Helm Chart, Embedded Cluster Bundle, Proxy Registry Image |
| Pull Type | No | First Pull Only, Any Pull |

The **Pull Type** filter controls whether the notification fires on every pull or only the first time a customer pulls any software asset:

- **First Pull Only**: The notification fires only when a customer pulls a release asset for the first time, across all asset types. Use this to track the revenue recognition milestone when a customer first retrieves your software.
- **Any Pull** (default): The notification fires on every pull. This is equivalent to leaving the filter unset, and all existing subscriptions behave this way.

:::note
First pull tracking is forward-only. Customers who pulled software before this feature shipped will have `is_first_customer_pull: false` on all subsequent pulls.
:::

## Support events

### Support Bundle Uploaded

When a support bundle is uploaded.

### Support Bundle Analyzed

When a support bundle analysis is completed.
