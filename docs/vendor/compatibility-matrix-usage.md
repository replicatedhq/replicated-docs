# Compatibility Matrix Usage
This topic describes using the Replicated Vendor Portal to understand
Compatibility Matrix usage across your team.

## Currently Active Clusters and Virtual Machines
You can find current active cluster and virtual machines on the Compatibility
Matrix overview page which is accessible by clicking the **Compatibility Matrix**
tab and then selecting **Overview** from the sidebar.

![Compatibility Matrix Overview Page](/images/compatibility-matrix-overview.png)

For more information on the Cluster and VM statuses displayed on this page
see [Cluster Status](/vendor/testing-about#cluster-status).

## Historical Usage
The Vendor Portal offers a Compatibility Matrix history page that provides
historical information about both clusters and virtual machines (VMs).

You can access the Compatibility Matrix history page by clicking the
**Compatibility Matrix** tab and then selecting **History** from the sidebar.

Only terminated clusters and VMs are displayed on the history page.  Terminated
is defined as a cluster or VM that has been deleted or errored.

![Compatibility Matrix History Page](/images/compatibility-matrix-history.png)

The top of the page displays the total number of terminated clusters and VMs
in the selected time period as well as the total cost and usage time for
the terminated resources.

The table below includes cluster and VM entries with the following columns:
- **Name:** The name of the cluster or VM.
- **By:** The actor that created the resource.
- **Cost:** The cost of the resource, this is calculated at termination and is
    based on the time the resource was running.
- **Distribution:** The distribution and version of the resource, for example
    `kind 1.32.1`.
- **Type:** The distribution type of the resource.  Kubernetes clusters
    are listed as `kubernetes` and VMs are listed as `vm`.
- **Status:** The status of the resource, for example `terminated` or `error`.
- **Instance:** The instance type of the resource, for example `r1.small`.
- **Nodes:** The node count for "kubernetes" resources, VMs do not use this
  field.
- **Node Groups:** The node group count for "kubernetes" resources, VMs do not
  use this field.
- **Created At:** The time the resource was created.
- **Running At:** The time the resource started running.  For billing purposes,
  this is the time when Replicated began charging for the resource.
- **Terminated At:** The time the resource was terminated.  For billing
  purposes, this is the time when Replicated stopped charging for the resource.
- **TTL:** The time-to-live for the resource, this is the maximum amount of
  time the resource can run before it is automatically terminated.
- **Duration:** The total time the resource was running, this is the time
  between the `running` and `terminated` states.
- **Tag:** Any tags that were applied to the resource.

Each of these fields can be filtered and sorted to help you find the information
you are looking for.  To sort by a specific field, click on the column header.
The column will display an up or down arrow to denote that the column is being
sorted and the direction of the sort:

![Compatibility Matrix History Page, column header clicked](/images/compatibility-matrix-column-sort.png)

To filter by a specific field, click on the filter icon in the column header:

![Compatibility Matrix History Page, filter icon clicked](/images/compatibility-matrix-column-filter.png)

Then use each specific filter input to filter the results:

![Compatibility Matrix History Page, filter input](/images/compatibility-matrix-column-filter-input.png)


## Using the Vendor API v3
You also use the [Vendor API v3](/vendor/vendor-api-using)
to obtain Compatibility Matrix usage information.

To perform queries against the Vendor API v3, you must have a valid API token,
see [Generating API Tokens](/vendor/replicated-api-tokens).

Just like the Vendor Portal, historical and running Compatibility Matrix usage
is divided into distinct endpoints.

### Credit Balance and Summarized Usage
To obtain summarized usage information in addition to your Compatibility Matrix
credit balance, the `/v3/cmx/stats` endpoint can be used.

This endpoint returns the total number of terminated clusters and VMs, the total
number of billed usage minutes, the total cost and the remaining credit balance.

The cost and remaining credit balance are returned in cents.

```shell
curl --request GET \
     --url https://api.replicated.com/vendor/v3/customers \
     --header 'Accept: application/json' \
     --header 'Authorization: my-token'
{"cluster_count":2,"vm_count":4,"usage_minutes":152,"cost":276,"credit_balance":723}%
```

The `v3/cmx/stats` endpoint also supports filtering by `start-time` and
`end-time`, for example, to get usage information for January 2025:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/cmx/stats?start-time=2025-01-01T00:00:00Z&end-time=2025-01-31T23:59:59Z' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

### Detailed Cluster and VM Usage
Depending on the type of information you are looking for you can use the
following endpoints to obtain active and historical CMX usage information.
Each of these endpoints supports pagination and filtering.  You can use the
following query parameters to filter the results:

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
    - By default the results are sorted in ascending order, use
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


#### Currently Active Clusters
To get a list of currently active clusters, the `/v3/clusters` endpoint can be
used:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/clusters' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

You can use a tool such as `jq` to filter and iterate over the output:

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
Similar to clusters, to get a list of currently active virtual machines, the
`/v3/vms` endpoint can be used:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/vms' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

### Historical Usage
To fetch historical usage information, the `/v3/cmx/history` endpoint can be
used.  This endpoint returns a list of terminated clusters and VMs:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/cmx/history' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

You can specify `total-only=true` to get a quick total count of terminated
clusters and VMs.  The `total-only` parameter supports filtering as well:

```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/cmx/history?total-only=true' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

Unique to this endpoint is the ability to filter by `distribution-type` which
allows you to get a list of either just clusters or just virtual machines:

- **For clusters use `distribution-type=kubernetes`:**
```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/cmx/history?distribution-type=kubernetes' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```

- **For virtual machines use `distribution-type=vm`:**
```shell
curl --request GET \
     --url 'https://api.replicated.com/vendor/v3/cmx/history?distribution-type=vm' \
     --header 'Authorization: $REPLICATED_API_TOKEN' \
     --header 'accept: application/json'
```
