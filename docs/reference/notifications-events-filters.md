# Event types and filters
For more information about the Event Notifications feature, see [About event notifications](/vendor/event-notifications).

This topic lists the types of events supported for the Event Notifications feature.

## Subscription definition file

When you run `replicated notification subscription create --file FILE` or `replicated notification subscription update --file FILE`, the file must be a JSON file. The following example shows the complete structure:

```json
{
  "name": "My notification subscription",
  "isEnabled": true,
  "emailAddress": "alerts@example.com",
  "webhookUrl": "https://example.com/webhook",
  "webhookSecret": "optional-signing-secret",
  "customHeaders": [
    { "name": "X-My-Header", "value": "my-value" }
  ],
  "eventConfigs": [
    {
      "eventType": "release.promoted",
      "filters": {}
    }
  ]
}
```

The following table describes each field in the subscription definition file:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | No | Display name for the subscription |
| `isEnabled` | Yes | Whether the subscription is active |
| `emailAddress` | Conditional | Destination email address. Required if `webhookUrl` is not set |
| `webhookUrl` | Conditional | Destination webhook URL. Required if `emailAddress` is not set |
| `webhookSecret` | No | Secret used to sign webhook payloads using HMAC |
| `customHeaders` | No | Array of `{"name": "...", "value": "..."}` objects added as HTTP headers on each webhook request |
| `eventConfigs` | Yes | One or more event type configurations. Each entry has an `eventType` key and a `filters` object |
| `eventConfigs[].eventType` | Yes | The event type key. See the event type descriptions in this topic for the key for each event |
| `eventConfigs[].filters` | Yes | Filter conditions for the event. Use `{}` to receive all events of that type |

For the `update` command, all fields are optional — include only the fields you want to change. For example, to disable a subscription:

```json
{ "isEnabled": false }
```

## Channel events

### Channel Created

**Event type:** `channel.created`

When a new channel is created for an application.

#### Filters

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Application | `appId` | No | Filter to a specific application |

#### JSON definition

```json
{ "eventType": "channel.created", "filters": {} }
```

### Channel Archived

**Event type:** `channel.archived`

When a channel is archived.

#### Filters

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Application | `appId` | No | Filter to a specific application |
| Channel | `channelId` | No | Filter to one or more specific channels |

#### JSON definition

```json
{ "eventType": "channel.archived", "filters": { "channelId": ["channel1a2b3c4d"] } }
```

## Customer events

### Customer Created

**Event type:** `customer.created`

When a new customer is created.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Expiration Status | `expirationStatus` | No | `active`, `expiring_soon`, `perpetual` |

#### JSON definition

```json
{ "eventType": "customer.created", "filters": { "licenseType": ["paid", "trial"] } }
```

### Customer Updated

**Event type:** `customer.updated`

When a customer's details or license is updated.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |
| Change Type | `changeType` | No | `customer_name`, `license_type`, `expiration`, `channel`, `install_options`, `helm_email`, `entitlement` |

#### JSON definition

```json
{ "eventType": "customer.updated", "filters": { "changeType": ["license_type", "expiration"] } }
```

### Customer Archived

**Event type:** `customer.archived`

When a customer is archived.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "customer.archived", "filters": {} }
```

### Customer Unarchived (Restored)

**Event type:** `customer.unarchived`

When a customer is restored from archived state.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "customer.unarchived", "filters": {} }
```

### Customer License Expiring

**Event type:** `customer.license_expiring`

Time-based warning of an upcoming license expiration.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |
| Days Until Expiry | `daysUntilExpiry` | No | `0`, `1`, `7`, `14`, `30`, `60`, `90` |

#### JSON definition

```json
{ "eventType": "customer.license_expiring", "filters": { "daysUntilExpiry": ["7", "30"] } }
```

### Pending Self-Service Signup

**Event type:** `customer.pending_signup`

When someone signs up via the self-service portal (if enabled).

#### Filters

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Application | `appId` | No | Filter to a specific application |

#### JSON definition

```json
{ "eventType": "customer.pending_signup", "filters": {} }
```

### Enterprise Portal Invite Sent

**Event type:** `customer.ep_invite_sent`

When a vendor sends an Enterprise Portal invite to a user.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| Customer | `customerId` | No | Any customer for the selected application |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |

#### JSON definition

```json
{ "eventType": "customer.ep_invite_sent", "filters": {} }
```

### Enterprise Portal Access Granted

**Event type:** `customer.ep_access_granted`

When a user accesses the Enterprise Portal.

The following table describes the available filters for the Enterprise Portal Access Granted event type:

<table>
    <tr>
        <td>Filter</td>
        <td>JSON key</td>
        <td>Required</td>
        <td>Options</td>
    </tr>
    <tr>
        <td>Application</td>
        <td><code>appId</code></td>
        <td>No</td>
        <td>Any application in your account</td>
    </tr>
    <tr>
        <td>Customer</td>
        <td><code>customerId</code></td>
        <td>No</td>
        <td>Any customer for the selected application</td>
    </tr>
    <tr>
        <td>Access Method</td>
        <td><code>accessMethod</code></td>
        <td>No</td>
        <td><code>invite</code>, <code>self_signup</code>, <code>saml_jit</code></td>
    </tr>
    <tr>
        <td>License Type</td>
        <td><code>licenseType</code></td>
        <td>No</td>
        <td><code>paid</code>, <code>trial</code>, <code>community</code>, <code>dev</code></td>
    </tr>
    <tr>
      <td>Access Type</td>
      <td><code>accessType</code></td>
      <td>No</td>
      <td>
        <ul>
          <li><code>any</code> (default): Triggers a notification every time a user accesses the Enterprise Portal.</li>
          <li><code>first_for_license_type</code>: Triggers a notification the first time that a customer with a specific license type accesses the Enterprise Portal. For example, if you select "Paid" for the License Type filter, then you will receive a notification the first time that a customer with a Paid license access the Enterprise Portal, even if they previously logged in when they had a Trial license.</li>
        </ul>
        <p>First Access for Selected License Type only tracks Enterprise Portal access events that occur after March 27, 2026.</p>
      </td>
    </tr>
</table>

#### JSON definition

```json
{
  "eventType": "customer.ep_access_granted",
  "filters": {
    "licenseType": ["paid"],
    "accessType": "first_for_license_type"
  }
}
```

### Enterprise Portal User Joined

**Event type:** `customer.ep_user_joined`

When a user joins an Enterprise Portal customer.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| Customer | `customerId` | No | Any customer for the selected application |
| Access Method | `accessMethod` | No | `invite`, `self_signup`, `saml_jit` |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |

#### JSON definition

```json
{ "eventType": "customer.ep_user_joined", "filters": {} }
```

## Instance events

:::note
Instance event notifications use the **Instance Name** if set. Otherwise, they use the Instance ID.
:::

### Instance Created

**Event type:** `instance.created`

When a new instance sends its first check-in.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "instance.created", "filters": {} }
```

### Instance Ready

**Event type:** `instance.ready`

When a new instance's application status is Ready for the first time.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "instance.ready", "filters": {} }
```

### Instance Upgrade Started

**Event type:** `instance.upgrade_started`

When an instance begins upgrading to a new release version. This event fires when the Vendor Portal receives the first telemetry with a new release version, whether or not the application status is Ready.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "instance.upgrade_started", "filters": {} }
```

### Instance Upgrade Completed

**Event type:** `instance.upgrade_completed`

When an instance's application status is Ready after upgrading to a new release version.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "instance.upgrade_completed", "filters": {} }
```

### Instance Version Behind

**Event type:** `instance.version_behind`

When an instance falls behind by a specified number of versions.

#### Filters

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Versions Behind | `versionsBehind` | **Yes** | Minimum number of versions behind to trigger the notification. Provide as a string (for example, `"3"`). |
| Application | `appId` | No | Any application in your account |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "instance.version_behind", "filters": { "versionsBehind": "3" } }
```

### Instance Inactive

**Event type:** `instance.inactive`

When an instance has not checked-in for 24 hours (declared "Inactive"). Air-gapped instances are excluded from this event type.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "instance.inactive", "filters": {} }
```

### Instance State Duration

**Event type:** `instance.state.duration`

When an instance has been in a specific state (such as Unavailable or Degraded) for a specified duration.

The Instance State Duration event type requires you to specify the target state and duration threshold. Only one Instance State Duration event is allowed per subscription.

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| State | `state` | **Yes** | `ready`, `unavailable`, `degraded`, `updating`, `missing` |
| Duration (minutes) | `durationMinutes` | **Yes** | `"5"`, `"10"`, `"15"`, `"30"`, `"60"`, `"120"`, `"240"`, `"480"`, `"1440"` |
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

The `state` filter accepts one or more values as an array. The `durationMinutes` value must be provided as a string. The notification triggers when an instance has been in the specified state for at least the configured duration. If the instance recovers and later re-enters the monitored state, the notification can trigger again after the duration threshold is met.

#### JSON definition

```json
{
  "eventType": "instance.state.duration",
  "filters": {
    "state": ["unavailable", "degraded"],
    "durationMinutes": "60"
  }
}
```

### Instance State Flapping

**Event type:** `instance.state.flapping`

When an instance is changing states frequently within a configured time window.

The Instance State Flapping event type requires you to specify the sensitivity of flapping detection:

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Minimum State Changes | `minStateChanges` | **Yes** | `"3"`, `"5"`, `"10"`, `"15"`, `"20"` |
| Time Window (minutes) | `windowMinutes` | **Yes** | `"30"`, `"60"`, `"120"` |
| Cooldown Period (minutes) | `cooldownMinutes` | No | `"15"`, `"30"`, `"60"`, `"120"`, `"1440"` (default: `"60"`) |
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

The numeric filter values (`minStateChanges`, `windowMinutes`, `cooldownMinutes`) must be provided as strings. The notification triggers when an instance accumulates the specified number of state changes within the time window. The cooldown period prevents repeated notifications for the same instance within the configured interval.

#### JSON definition

```json
{
  "eventType": "instance.state.flapping",
  "filters": {
    "minStateChanges": "5",
    "windowMinutes": "60",
    "cooldownMinutes": "60"
  }
}
```

### Custom Metric Threshold Reached

**Event type:** `instance.custom_metric_threshold_reached`

When a custom metric value reported by an instance meets a configured threshold condition.

The Custom Metric Threshold Reached event type requires a metric name, comparison operator, and notification frequency. You can include only one Custom Metric Threshold Reached event per subscription.

The following table describes each of the filters for the Custom Metric Threshold Reached event type:

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Metric Name | `metricName` | **Yes** | The name of the custom metric to monitor |
| Operator | `operator` | **Yes** | Comparison operator. The operators available depend on the metric type. For more information, see [Available operators](#available-operators). |
| Threshold Value | `thresholdValue` | Conditional | Required for all operators except `is_true`, `is_false`, `exists`, and `not_exists`. Provide as a string. |
| Frequency | `frequency` | **Yes** | Controls how often you receive the notification. For more information, see [Frequency options](#frequency-options). |
| Application | `appId` | No | Any application in your account |
| Customer | `customerId` | No | Any customer for the selected application |

#### Available operators

The available operators depend on the type of metric value:

| Metric Type | Available operators (JSON value) |
|-------------|----------------------------------|
| Number | `gt` (greater than), `gte` (greater than or equal), `lt` (less than), `lte` (less than or equal), `eq` (equals), `neq` (does not equal), `exists`, `not_exists` |
| Boolean | `is_true`, `is_false`, `eq` (equals), `neq` (does not equal), `exists`, `not_exists` |
| String | `contains`, `starts_with`, `ends_with`, `eq` (equals), `neq` (does not equal), `exists`, `not_exists` |

#### Frequency options

The following frequency options control how often the notification triggers:

| Frequency | JSON value | Behavior |
|-----------|------------|----------|
| Send Once | `once` | Notifies the first time the metric meets the threshold. Does not notify again until the condition clears and the metric meets the threshold again. |
| When Changed | `when_changed` | Notifies when the metric meets the threshold and its value has changed since the last notification. |
| Each Time | `each_time` | Notifies every time a metric report meets the threshold condition. |

#### JSON definition

```json
{
  "eventType": "instance.custom_metric_threshold_reached",
  "filters": {
    "metricName": "error_rate",
    "operator": "gt",
    "thresholdValue": "0.05",
    "frequency": "when_changed"
  }
}
```

## Release events

### Release Created

**Event type:** `release.created`

When a new release is created.

#### Filters

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Application | `appId` | No | Filter to a specific application |

#### JSON definition

```json
{ "eventType": "release.created", "filters": {} }
```

### Release Promoted

**Event type:** `release.promoted`

When a release is promoted to a channel.

#### Filters

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Application | `appId` | No | Filter to a specific application |
| Channel | `channelId` | No | Filter to one or more channels |

#### JSON definition

```json
{ "eventType": "release.promoted", "filters": { "channelId": ["channel1a2b3c4d"] } }
```

### Release Demoted (Unpublished)

**Event type:** `release.unpublished`

When a release is demoted from a channel.

#### Filters

| Filter | JSON key | Required | Description |
|--------|----------|----------|-------------|
| Application | `appId` | No | Filter to a specific application |
| Channel | `channelId` | No | Filter to one or more channels |

#### JSON definition

```json
{ "eventType": "release.unpublished", "filters": {} }
```

### Release Build Failed

**Event type:** `release.build_failed`

When a release build fails for a release on a channel.

The following table describes the available filters for the Release Build Failed event type:

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| Channel | `channelId` | No | Any channel for the selected application |

#### JSON definition

```json
{ "eventType": "release.build_failed", "filters": { "appId": "app1a2b3c4d" } }
```

### Release Assets Downloaded {#release-assets-downloaded}

**Event type:** `release.asset_downloaded`

When a customer pulls a release asset (Helm chart, Embedded Cluster bundle, or proxy registry image). Each individual asset pull triggers one Release Assets Downloaded event.

The following table describes the available filters for the Release Assets Downloaded event type:

<table>
    <tr>
        <td>Filter</td>
        <td>JSON key</td>
        <td>Required</td>
        <td>Options</td>
    </tr>
    <tr>
        <td>Application</td>
        <td><code>appId</code></td>
        <td>No</td>
        <td>Any application in your account</td>
    </tr>
    <tr>
        <td>Channel</td>
        <td><code>channelId</code></td>
        <td>No</td>
        <td>Any channel for the selected application</td>
    </tr>
    <tr>
        <td>Customer</td>
        <td><code>customerId</code></td>
        <td>No</td>
        <td>Any customer for the selected application</td>
    </tr>
    <tr>
        <td>License Type</td>
        <td><code>licenseType</code></td>
        <td>No</td>
        <td><code>paid</code>, <code>trial</code>, <code>community</code>, <code>dev</code></td>
    </tr>
    <tr>
        <td>Asset Type</td>
        <td><code>assetType</code></td>
        <td>No</td>
        <td><code>helm_chart</code>, <code>embedded_cluster_bundle</code>, <code>proxy_image</code></td>
    </tr>
    <tr>
        <td>Pull Type</td>
        <td><code>pullType</code></td>
        <td>No</td>
        <td>
          <ul>
            <li><code>any</code> (default): Triggers a notification on every asset pull.</li>
            <li><code>first</code>: Triggers a notification only the first time that a customer pulls a release asset.</li>
            <li><code>first_for_license_type</code>: Triggers a notification the first time that a customer pulls a release asset with the selected license type. For example, if you select "Paid" for the License Type filter, you will receive a notification the first time that a customer pulls a release asset using a Paid license, even if the customer had previously pulled assets using a Trial license.</li>
          </ul>
          <p>For customers who pulled software before March 18, 2026, the Vendor Portal applies <code>is_first_customer_pull: false</code> on all subsequent pulls. Also, First Pull for Selected License Type only tracks asset pulls that occur after March 27, 2026.</p>
        </td>
    </tr>
</table>

#### JSON definition

```json
{
  "eventType": "release.asset_downloaded",
  "filters": {
    "assetType": "helm_chart",
    "pullType": "first_for_license_type",
    "licenseType": ["paid"]
  }
}
```

## Support events

### Support Bundle Uploaded

**Event type:** `support.bundle.uploaded`

When a support bundle is uploaded.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "support.bundle.uploaded", "filters": {} }
```

### Support Bundle Analyzed

**Event type:** `support.bundle.analyzed`

When a support bundle analysis is completed.

#### Filters

| Filter | JSON key | Required | Options |
|--------|----------|----------|---------|
| Application | `appId` | No | Any application in your account |
| License Type | `licenseType` | No | `paid`, `trial`, `community`, `dev` |
| Channel | `channelId` | No | Any channel for the selected application |
| Customer | `customerId` | No | Any customer for the selected application |

#### JSON definition

```json
{ "eventType": "support.bundle.analyzed", "filters": {} }
```
