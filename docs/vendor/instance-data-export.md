import Download from "../partials/customers/_download.mdx"

# Export Customer and Instance Data

This topic describes how to download and export customer and instance data from the Replicated Vendor Portal.

## Overview

While you can always consume customer and instance insight data directly in the Replicated Vendor Portal, the data is also available in a CSV format so that it can be imported into any other system, such as:
* Customer Relationship Management (CRM) systems like Salesforce or Gainsight
* Data warehouses like Redshift, Snowflake, or BigQuery
* Business intelligence (BI) tools like Looker, Tableau, or PowerBI

By collecting and organizing this data wherever it is most visible and valuable, you can enable your team to make better decisions about where to focus efforts across product, sales, engineering, and customer success.

## Bulk Export Instance Event Timeseries Data

You can use the Vendor API v3 `/app/{app_id}/events` endpoint to programatically access historical timeseries data containing instance level events, including any custom metrics that you have defined. For more information about the endpoint, see [Get instance events in either JSON or CSV format](https://replicated-vendor-api.readme.io/reference/listappinstanceevents) in the Vendor API v3 documentation.

The `/app/{app_id}/events` endpoint returns data scoped to a given application identifier. It also allows filtering based on time periods, instances identifiers, customers identifers, and event types. You must provide at least **one** query parameter to scope the query in order to receive a response. 

By bulk exporting this instance event data with the `/app/{app_id}/events` endpoint, you can:
* Identify trends and potential problem areas 
* Demonstrate the impact, adoption, and usage of recent product features

### Filter Bulk Data Exports

You can use the following types of filters to filter timeseries data for bulk export:

- **Filter by date**:
    - Get instance events recorded _at or before_ the query date. For example:
        ```bash
        curl -H "Authorization: $REPLICATED_API_TOKEN" \ 
        "https://api.replicated.com/vendor/v3/app/:appID/events?before=2023-10-15"
        ```
    - Get instance events recorded _at or after_ the query date. For example:
        ```shell
        curl -H "Authorization: $REPLICATED_API_TOKEN" \ 
        "https://api.replicated.com/vendor/v3/app/:appID/events?after=2023-10-15"
        ```
    - Get instance events recorded within a range of dates [after, before]. For example:
        ```shell
        curl -H "Authorization: $REPLICATED_API_TOKEN" \ 
        "https://api.replicated.com/vendor/v3/app/:appID/events?after=2023-05-02&before=2023-10-15"
        ```
- **Filter by customer**: Get instance events from one or more customers using a comma-separated list of customer IDs. For example:
    ```bash
    curl -H "Authorization: $REPLICATED_API_TOKEN" \ 
    "https://api.replicated.com/vendor/v3/app/:appID/events?customerIDs=1b13241,2Rjk2923481"
    ```
- **Filter by event type**: Get instance events by event type using a comma-separated list of event types. For example:
    ```bash
    curl -H "Authorization: $REPLICATED_API_TOKEN" \ 
    "https://api.replicated.com/vendor/v3/app/:appID/events?eventTypes=numUsers,numProjects"
    ```

:::note
If any filter is passed for an object that does not exist, no warning is given. For example, if a `customerIDs` filter is passed for an ID that does not exist, or for an ID that the user does not have access to, then an empty array is returned.
:::


## Download Customer Instance Data CSVs
<Download/>

### Data Dictionary

The following table lists the data fields that can be included in the customers and instances CSV downloads, including the label, data type, and description.

<table>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>customer_id</td>
        <td>string</td>
        <td>Customer identifier</td>
    </tr>
    <tr>
        <td>customer_name</td>
        <td>string</td>
        <td>The customer name</td>
    </tr>
    <tr>
        <td>customer_created_date</td>
        <td>timestamptz</td>
        <td>The date the license was created</td>
    </tr>
    <tr>
        <td>customer_license_expiration_date</td>
        <td>timestamptz</td>
        <td>The expiration date of the license</td>
    </tr>
    <tr>
        <td>customer_channel_id</td>
        <td>string</td>
        <td>The channel id the customer is assigned</td>
    </tr>
    <tr>
        <td>customer_channel_name</td>
        <td>string</td>
        <td>The channel name the customer is assigned</td>
    </tr>
    <tr>
        <td>customer_app_id</td>
        <td>string</td>
        <td>App identifier</td>
    </tr>
    <tr>
        <td>customer_last_active</td>
        <td>timestamptz</td>
        <td>The date the customer was last active</td>
    </tr>
    <tr>
        <td>customer_type</td>
        <td>string</td>
        <td>One of prod, trial, dev, or community</td>
    </tr>
    <tr>
        <td>customer_status</td>
        <td>string</td>
        <td>The current status of the customer</td>
    </tr>
    <tr>
        <td>customer_is_airgap_enabled</td>
        <td>boolean</td>
        <td>The feature the customer has enabled - Airgap</td>
    </tr>
    <tr>
        <td>customer_is_geoaxis_supported</td>
        <td>boolean</td>
        <td>The feature the customer has enabled - GeoAxis</td>
    </tr>
    <tr>
        <td>customer_is_gitops_supported</td>
        <td>boolean</td>
        <td>The feature the customer has enabled - GitOps</td>
    </tr>
    <tr>
        <td>customer_is_embedded_cluster_download_enabled</td>
        <td>boolean</td>
        <td>The feature the customer has enabled - Embedded Cluster</td>
    </tr>
    <tr>
        <td>customer_is_identity_service_supported</td>
        <td>boolean</td>
        <td>The feature the customer has enabled - Identity</td>
    </tr>
    <tr>
        <td>customer_is_snapshot_supported</td>
        <td>boolean</td>
        <td>The feature the customer has enabled - Snapshot</td>
    </tr>
    <tr>
        <td>customer_has_entitlements</td>
        <td>boolean</td>
        <td>Indicates the presence or absence of entitlements and entitlment_* columns</td>
    </tr>
    <tr>
        <td>customer_entitlement__*</td>
        <td>string/integer/boolean</td>
        <td>The values of any custom license fields configured for the customer. For example, customer_entitlement__active-users.</td>
    </tr>
    <tr>
        <td>customer_created_by_id</td>
        <td>string</td>
        <td>The ID of the actor that created this customer: user ID or a hashed value of a token.</td>
    </tr>
    <tr>
        <td>customer_created_by_type</td>
        <td>string</td>
        <td>The type of the actor that created this customer: user, service-account, or service-account.</td>
    </tr>
    <tr>
        <td>customer_created_by_description</td>
        <td>string</td>
        <td>The description of the actor that created this customer. Includes username or token name depending on actor type.</td>
    </tr>
    <tr>
        <td>customer_created_by_link</td>
        <td>string</td>
        <td>The link to the actor that created this customer.</td>
    </tr>
    <tr>
        <td>customer_created_by_timestamp</td>
        <td>timestamptz</td>
        <td>The date the customer was created by this actor. When available, matches the value in the customer_created_date column</td>
    </tr>
    <tr>
        <td>customer_updated_by_id</td>
        <td>string</td>
        <td>The ID of the actor that updated this customer: user ID or a hashed value of a token.</td>
    </tr>
    <tr>
        <td>customer_updated_by_type</td>
        <td>string</td>
        <td>The type of the actor that updated this customer: user, service-account, or service-account.</td>
    </tr>
    <tr>
        <td>customer_updated_by_description</td>
        <td>string</td>
        <td>The description of the actor that updated this customer. Includes username or token name depending on actor type.</td>
    </tr>
    <tr>
        <td>customer_updated_by_link</td>
        <td>string</td>
        <td>The link to the actor that updated this customer.</td>
    </tr>
    <tr>
        <td>customer_updated_by_timestamp</td>
        <td>timestamptz</td>
        <td>The date the customer was updated by this actor.</td>
    </tr>
    <tr>
        <td>instance_id</td>
        <td>string</td>
        <td>Instance identifier</td>
    </tr>
    <tr>
        <td>instance_is_active</td>
        <td>boolean</td>
        <td>The instance has pinged within the last 24 hours</td>
    </tr>
    <tr>
        <td>instance_first_reported_at</td>
        <td>timestamptz</td>
        <td>The timestamp of the first recorded check-in for the instance.</td>
    </tr>
    <tr>
        <td>instance_last_reported_at</td>
        <td>timestamptz</td>
        <td>The timestamp of the last recorded check-in for the instance.</td>
    </tr>
    <tr>
        <td>instance_first_ready_at</td>
        <td>timestamptz</td>
        <td>The timestamp of when the cluster was considered ready</td>
    </tr>
    <tr>
        <td>instance_kots_version</td>
        <td>string</td>
        <td>The version of KOTS or the Replicated SDK that the instance is running. The version is displayed as a Semantic Versioning compliant string.</td>
    </tr>
    <tr>
        <td>instance_k8s_version</td>
        <td>string</td>
        <td>The version of Kubernetes running in the cluster.</td>
    </tr>
    <tr>
        <td>instance_is_airgap</td>
        <td>boolean</td>
        <td>The cluster is airgaped</td>
    </tr>
    <tr>
        <td>instance_is_kurl</td>
        <td>boolean</td>
        <td>The instance is installed in a Replicated kURL cluster (embedded cluster)</td>
    </tr>
    <tr>
        <td>instance_last_app_status</td>
        <td>string</td>
        <td>The instance&#39;s last reported app status</td>
    </tr>
    <tr>
        <td>instance_client</td>
        <td>string</td>
        <td>Indicates whether this instance is managed by KOTS or if it&#39;s a Helm CLI deployed instance using the SDK.</td>
    </tr>
    <tr>
        <td>instance_kurl_node_count_total</td>
        <td>integer</td>
        <td>Total number of nodes in the cluster. Applies only to kURL clusters.</td>
    </tr>
    <tr>
        <td>instance_kurl_node_count_ready</td>
        <td>integer</td>
        <td>Number of nodes in the cluster that are in a healthy state and ready to run Pods. Applies only to kURL clusters.</td>
    </tr>
    <tr>
        <td>instance_cloud_provider</td>
        <td>string</td>
        <td>The cloud provider where the instance is running. Cloud provider is determined by the IP address that makes the request.</td>
    </tr>
    <tr>
        <td>instance_cloud_provider_region</td>
        <td>string</td>
        <td>The cloud provider region where the instance is running. For example, us-central1-b</td>
    </tr>
    <tr>
        <td>instance_app_version</td>
        <td>string</td>
        <td>The current application version</td>
    </tr>
    <tr>
        <td>instance_version_age</td>
        <td>string</td>
        <td>The age (in days) of the currently deployed release. This is relative to the latest available release on the channel.</td>
    </tr>
    <tr>
        <td>instance_is_gitops_enabled</td>
        <td>boolean</td>
        <td>Reflects whether the end user has enabled gitops for deployments in their environment</td>
    </tr>
    <tr>
        <td>instance_gitops_provider</td>
        <td>string</td>
        <td>If GitOps is enabledreflects the GitOps provider in use. For example, GitHub Enterprise.</td>
    </tr>
    <tr>
        <td>instance_is_skip_preflights</td>
        <td>boolean</td>
        <td>Indicates whether an end user elected to skip preflight check warnings or errors</td>
    </tr>
    <tr>
        <td>instance_preflight_status</td>
        <td>string</td>
        <td>The last reported preflight check status for the instance</td>
    </tr>
    <tr>
        <td>instance_k8s_distribution</td>
        <td>string</td>
        <td>The Kubernetes distribution of the cluster.</td>
    </tr>
    <tr>
        <td>instance_has_custom_metrics</td>
        <td>boolean</td>
        <td>Indicates the presence or absence of custom metrics and custom_metric__* columns</td>
    </tr>
    <tr>
        <td>instance_custom_metrics_reported_at</td>
        <td>timestamptz</td>
        <td>Timestamp of latest custom_metric</td>
    </tr>
    <tr>
        <td>custom_metric__*</td>
        <td>string/integer/boolean</td>
        <td>The values of any custom metrics that have been sent by the instance. For example, custom_metric__active_users</td>
    </tr>
    <tr>
        <td>instance_has_tags</td>
        <td>boolean</td>
        <td>Indicates the presence or absence of instance tags and instance_tag__* columns</td>
    </tr>
    <tr>
        <td>instance_tag__*</td>
        <td>string/integer/boolean</td>
        <td>The values of any instance tag that have been set by the vendor. For example, instance_tag__name</td>
    </tr>
</table>
