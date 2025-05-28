# View Compatibility Matrix Usage History
This topic describes using the Replicated Vendor Portal to understand
Compatibility Matrix usage across your team.

## View Historical Usage
The **Compatibility Matrix > History** page provides
historical information about both clusters and VMs, as shown below:

![Compatibility Matrix History Page](/images/compatibility-matrix-history.png)
[View a larger version of this image](/images/compatibility-matrix-history.png)

The **History** page displays clusters and VMs with one of the following statuses:
* Terminated
* Error
* Queued Timeout. A Queued Timeout status indicates that the cluster or VM was automatically removed after being in a _queued_ state for more than 24 hours.

The top of the **History** page displays the total number of non-running clusters
and VMs in the selected time period as well as the total cost and usage time
for the non-running resources.  The total cost is calculated at termination and
is based on the time the resource was running.  Clusters and VMs that never
entered the _running_ state are not included in the total cost and usage time.

The table includes cluster and VM entries with the following columns:
- **Name:** The name of the cluster or VM.
- **By:** The actor that created the resource.
- **Cost:** The cost of the resource. This is calculated at termination and is
    based on the time the resource was running.
- **Distribution:** The distribution and version of the resource. For example,
    `kind 1.32.1`.
- **Type:** The distribution type of the resource. Kubernetes clusters
    are listed as `kubernetes` and VMs are listed as `vm`.
- **Status:** The status of the resource. For example `terminated` or `error`.
- **Instance:** The instance type of the resource. For example `r1.small`.
- **Nodes:** The node count for "kubernetes" resources. VMs do not use this
  field.
- **Node Groups:** The node group count for "kubernetes" resources. VMs do not
  use this field.
- **Created At:** The time the resource was created.
- **Running At:** The time the resource started running. For billing purposes,
  this is the time when Replicated began charging for the resource.
- **Terminated At:** The time the resource was terminated. For billing
  purposes, this is the time when Replicated stopped charging for the resource.
- **TTL:** The time-to-live for the resource. This is the maximum amount of
  time the resource can run before it is automatically terminated.
- **Duration:** The total time the resource was running. This is the time
  between the `running` and `terminated` states.
- **Tag:** Any tags that were applied to the resource.

## Filter and Sort Usage History

Each of the fields on the **History** page can be filtered and sorted. To sort by a specific field, click on the column header.

To filter by a specific field, click on the filter icon in the column header, then use each specific filter input to filter the results, as shown below:

![Compatibility Matrix History Page, filter input](/images/compatibility-matrix-column-filter-input.png)
[View a larger version of this image](/images/compatibility-matrix-column-filter-input.png)

## Get Usage History with the Vendor API v3

For more information about using the Vendor API v3 to get Compatibility Matrix
usage history information, see the following API endpoints within the
Vendor API v3 documentation:

* [/v3/cmx/stats](https://replicated-vendor-api.readme.io/reference/getcmxstats)
* [/v3/vms](https://replicated-vendor-api.readme.io/reference/listvms)
* [/v3/clusters](https://replicated-vendor-api.readme.io/reference/listclusters)
* [/v3/cmx/history](https://replicated-vendor-api.readme.io/reference/listcmxhistory)

For examples of using these endpoints, see the sections below.

### Credit Balance and Summarized Usage
You can use the `/v3/cmx/stats` endpoint to get summarized usage information in addition to your Compatibility Matrix
credit balance.

This endpoint returns:

- **`cluster_count`:** The total number of terminated clusters.
- **`vm_count`:** The total number of terminated VMs.
- **`usage_minutes`:** The total number of billed usage minutes.
- **`cost`:** The total cost of the terminated clusters and VMs in cents.
- **`credit_balance`:** The remaining credit balance in cents.

```shell
curl --request GET \
     --url https://api.replicated.com/vendor/v3/customers \
     --header 'Accept: application/json' \
     --header 'Authorization: $REPLICATED_API_TOKEN'
{"cluster_count":2,"vm_count":4,"usage_minutes":152,"cost":276,"credit_balance":723}%
```

The `v3/cmx/stats` endpoint also supports filtering by `start-time` and
`end-time`. For example, the following request gets usage information for January 2025:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/cmx/stats?start-time=2025-01-01T00:00:00Z&end-time=2025-01-31T23:59:59Z' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

### Currently Active Clusters
To get a list of active clusters:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/clusters' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

You can also use a tool such as `jq` to filter and iterate over the output:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/clusters' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json' | \
     jq '.clusters[] | {name: .name, ttl: .ttl, distribution: .distribution, version: .version}'

{
  "name": "friendly_brown",
  "ttl": "1h",
  "distribution": "kind",
  "version": "1.32.1"
}
```

### Currently Active Virtual Machines
To get a list of active VMs:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/vms' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

### Historical Usage
To fetch historical usage information:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/cmx/history' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

You can also filter the response from the `/v3/cmx/history` endpoint by `distribution-type`, which
allows you to get a list of either clusters or VMs:

- **For clusters use `distribution-type=kubernetes`:**
     ```shell
     curl --request GET \
          --url 'https://api.replicated.com/vendor/v3/cmx/history?distribution-type=kubernetes' \
          --header 'Authorization: $REPLICATED_API_TOKEN' \
          --header 'accept: application/json'
     ```

- **For VMs use `distribution-type=vm`:**
     ```shell
     curl --request GET \
          --url 'https://api.replicated.com/vendor/v3/cmx/history?distribution-type=vm' \
          --header 'Authorization: $REPLICATED_API_TOKEN' \
          --header 'accept: application/json'
     ```

### Filtering Endpoint Results
Each of these endpoints supports pagination and filtering. You can use the
following query parameters to filter the results.

:::note
Each of the examples below
uses the `v3/cmx/history` endpoint, but the same query parameters can be used
with the other endpoints as well.
:::

- **Pagination:** Use the `pageSize` and `currentPage` query parameters to
  paginate through the results:

     ```shell
     curl --request GET \
          --url 'https://api.replicated.com/vendor/v3/cmx/history?pageSize=10&currentPage=1' \
          --header 'Authorization: $REPLICATED_API_TOKEN' \
          --header 'accept: application/json'
     ```

- **Filter by date:** Use the `start-time` and `end-time` query parameters to
  filter the results by a specific date range:

     ```shell
     curl --request GET \
          --url 'https://api.replicated.com/vendor/v3/cmx/history?start-time=2025-01-01T00:00:00Z&end-time=2025-01-31T23:59:59Z' \
          --header 'Authorization: $REPLICATED_API_TOKEN' \
          --header 'accept: application/json'
     ```

- **Sort by:** Use the `tag-sort-key` query parameter to sort the results by a
  specific field.  The field can be any of the fields returned in the response.
    
     By default, the results are sorted in ascending order, use
     `sortDesc=true` to sort in descending order:

     ```shell
     curl --request GET \
          --url 'https://api.replicated.com/vendor/v3/cmx/history?tag-sort-key=created_at&sortDesc=true' \
          --header 'Authorization: $REPLICATED_API_TOKEN' \
          --header 'accept: application/json'
     ```

- **Tag filters:** Use the `tag-filter` query parameter to filter the results by
  a specific tag:

     ```shell
     curl --request GET \
          --url 'https://api.replicated.com/vendor/v3/cmx/history?tag-filter=tag1' \
          --header 'Authorization: $REPLICATED_API_TOKEN' \
          --header 'accept: application/json'
     ```

- **Actor filters:** Use the `actor-filter` query parameter to filter the actor
  that created the resource, or the type of actor such as `Web UI` or
  `Replicated CLI`:

     ```shell
     curl --request GET \
          --url 'https://api.replicated.com/vendor/v3/cmx/history?actor-filter=name' \
          --header 'Authorization: $REPLICATED_API_TOKEN' \
          --header 'accept: application/json'
     ```

     :::note
     If any filter is passed for an object that does not exist, no warning is given.
     For example, if you filter by `actor-filter=name` and there are no results
     the response will be empty.
     :::
