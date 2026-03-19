# Webhook payload structure (Beta)

This topic describes the JSON payload format for event notification webhooks, including details about the fields. For more information about the Event Notifications (Beta) feature, see [About event notifications (Beta)](/vendor/event-notifications).

## Webhook payload structure {#webhook-payload-structure}

Webhooks deliver a JSON payload with the following structure:

```json
{
  "event": "customer.created",
  "timestamp": "2026-01-25T22:48:32Z",
  "text": "A new customer has been created.\n\nCustomer: Testy McTestface\nCustomer ID: 38ljzNKNZZSIp3bUQYSPzJUUBpd\nApplication: Demo\nChannel: Stable\nLicense Type: trial\nExpiration: 2026-02-24\nCreated at: 2026-01-25 22:48:32 UTC\n\nView customer: https://vendor.replicated.com/apps/demo-jaybird/customer/38ljzNKNZZSIp3bUQYSPzJUUBpd",
  "data": {
    "app_id": "34LgWqPkIlmhPDhvQVrbWcRwvLW",
    "team_id": "CKUTNRX16FghU69v_RjZ1Q1EFXBcQBMZ",
    "app_name": "Demo",
    "app_slug": "demo-jaybird",
    "eventType": "customer.created",
    "channel_id": "34LgWuB1oCNbdLV6BbeepUSAEA6",
    "created_at": "2026-01-25T22:48:32.391894468Z",
    "event_type": "customer.created",
    "expires_at": "2026-02-24T22:47:37Z",
    "customer_id": "38ljzNKNZZSIp3bUQYSPzJUUBpd",
    "channel_name": "Stable",
    "license_type": "trial",
    "customer_name": "Testy McTestface",
    "subscription_name": "Trial Customer Alerts"
  }
}
```

## Top-level fields

The following describes the top-level fields in the webhook payload:

<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
    <th>Description</th>
   </tr>
  <tr>
    <td>`event`</td>
    <td>string</td>
    <td>Event type identifier such as "customer.created" or "instance.upgrade_started"</td>
   </tr>
  <tr>
    <td>`timestamp`</td>
    <td>string</td>
    <td>ISO 8601 timestamp when the event occurred</td>
   </tr>
  <tr>
    <td>`text`</td>
    <td>string</td>
    <td>Human-readable text description of the event, formatted for readability in Slack and other chat tools</td>
    </tr>
  <tr>
    <td>`data`</td>
    <td>object</td>
    <td>
      <p>Event-specific data containing detailed information about the event. See <a href="#data-object-fields"><code>data</code> object fields</a> on this page.</p>
    </td>
   </tr>
</table>

## `data` object fields {#data-object-fields}

The `data` object contains detailed, event-specific information. There are common fields that apply to all event types as well as event-specific fields.

### Common fields

The webhook payload includes the following common `data` object fields for all event types:

<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>app_id</code></td>
    <td>string</td>
    <td>Application identifier</td>
  </tr>
  <tr>
    <td><code>team_id</code></td>
    <td>string</td>
    <td>Team identifier</td>
  </tr>
  <tr>
    <td><code>app_name</code></td>
    <td>string</td>
    <td>Application name</td>
  </tr>
  <tr>
    <td><code>app_slug</code></td>
    <td>string</td>
    <td>Application slug (URL-safe identifier)</td>
  </tr>
  <tr>
    <td><code>event_type</code></td>
    <td>string</td>
    <td>Event type identifier</td>
  </tr>
  <tr>
    <td><code>subscription_name</code></td>
    <td>string</td>
    <td>Custom subscription name, if set. The <code>subscription_name</code> field is included in the <code>data</code> object only when a custom name is set on the subscription.</td>
  </tr>
</table>

### Event-specific fields {#event-specific-fields}

This section describes the event-specific fields in the webhook payload `data` object.

#### Release Assets Downloaded events

The following fields apply to the [Release Assets Downloaded](/reference/notifications-events-filters#release-assets-downloaded) event type:

| Field | Type | Description |
|-------|------|-------------|
| `customer_id` | string | Customer identifier |
| `customer_name` | string | Customer display name |
| `channel_id` | string | Channel identifier |
| `channel_name` | string | Channel name |
| `license_type` | string | License type: `paid`, `trial`, `dev`, or `community` |
| `asset_type` | string | Type of asset pulled: `helm_chart`, `embedded_cluster_bundle`, or `proxy_image` |
| `asset_name` | string | Name of the asset (chart name, app slug, or full proxy path) |
| `asset_version` | string | Version or tag of the asset |
| `service_account_name` | string | Enterprise Portal service account name, if a service account made the pull. Empty for direct license pulls. |
| `is_first_customer_pull` | boolean | `true` if this is the first software pull by this customer across all asset types; `false` for all subsequent pulls. Forward-only: customers who pulled software before this feature shipped will always have `false`. The `is_first_customer_pull` field is useful for revenue recognition workflows. |
| `downloaded_at` | string | Timestamp (International Organization for Standardization (ISO) 8601 format) of when the pull occurred |
