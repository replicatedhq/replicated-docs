# Event types (Beta)

Event Notifications (Beta) supports the following event types, organized by category. You can further refine each event type using filters to match your specific needs. You can also select multiple event types in a single subscription.

## Filter logic

Each event type that you select in a notification subscription has its own set of filters.

For subscriptions that include multiple event types, each event type is evaluated independently against its filters. In this case, any events of the included types that matches its filters triggers a notification.

The following describes the filter logic used for each event:

- **No filters**: Any event of the given type triggers the notification.
- **One or more filters**: An event must match _all_ specified filters (AND logic) to trigger the notification.

If a filter contains multiple selected values, the event must match _any_ of the selected values (OR logic) to satisfy the filter.

## License field operators

You can filter notifications based on your custom license field values. This allows you to create targeted notifications based on your customers' entitlement data. For more information about adding custom license fields, see [Manage Customer License Fields](/vendor/licenses-adding-custom-fields).

Filtering by custom license fields is supported for the following event types:

- Customer events (Customer Created, Customer Updated, Customer Archived, Customer Unarchived, Customer License Expiring)
- Instance events (Instance Created, Instance Ready, Instance Upgrade Started, Instance Upgrade Completed, Instance Version Behind, Instance Inactive, Instance State Duration, Instance State Flapping)
- Support Bundle events (Support Bundle Uploaded, Support Bundle Analyzed)

License field conditions have a field, an operator, and a value. The available operators depend on the field type:

| Field Type | Available Operators |
|------------|-------------------|
| Integer | equals, does not equal, greater than, less than, greater than or equal, less than or equal |
| String / Text | equals, does not equal, contains, does not contain |
| Boolean | is true, is false |

When multiple license field conditions are specified, all conditions must match for the notification to trigger (AND logic).


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

### Instance state flapping filter requirements

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

## Support events

### Support Bundle Uploaded

When a support bundle is uploaded.

### Support Bundle Analyzed

When a support bundle analysis is completed.

## Release events

### Release Created

When a new release is created.

### Release Promoted

When a release is promoted to a channel.

### Release Demoted (Unpublished)

When a release is demoted from a channel.

### Release Assets Downloaded

When a release asset (such as a Helm chart or .tgz bundle) is pulled by a customer.

## Channel events

### Channel Created

When a new channel is created for an application.

### Channel Archived

When a channel is archived.
