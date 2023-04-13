# Adoption Rate (Beta)

This topic describes the insights in the **Adoption rate** section on the Replicated vendor portal **Customers** page.

:::note
The **Adoption Report** section is currently in Beta -- you will see it labeled as such in the Vendor Portal. the character of this data and how it is computed and displayed is subject to change.
:::

## About Adoption Rate

The **Adoption rate** section on the **Customers** page provides insights about the rate at which your customers upgrade their instances and adopt the latest versions of your application. As an application vendor, you can use these adoption rate metrics to learn if your customers are completing upgrades regularly, which is a key indicator of the discoverability and ease of application upgrades.

The vendor portal generates adoption rate data from all of your customer's active application instances. An instance is considered _active_ if no more than two weeks have passed since its last check-in event. For more information about instance check-ins, see [How the Vendor Portal Collects Instance Data](instance-insights-event-data#about-reporting) in _About Instance and Event Data_.

The following screenshot shows an example of the **Adoption rate** section:

![Adoption rate section on Customers page ](/images/customer_adoption_rates.png)

[View a larger version of this image](/images/customer_adoption_rates.png)

As shown in the screenshot above, the **Adoption rate** section includes a graph and key adoption rate metrics. For more information about how to interpret this data, see [Adoption Rate Graph](#graph) and [Adoption Rate Metrics](#metrics) below.

The **Adoption rate** section also displays the number of customers assigned to the selected channel and a link to the report that you can share with other members of your team.

You can filter the graph and metrics in the **Adoption rate** section by:
* License type (Paid, Trial, Dev, or Community)
* Time period (the previous month, three months, six months, or twelve months).
* Release channel where the instance license is assigned, such as Stable or Beta.

## Adoption Rate Graph {#graph}

The **Adoption rate** section includes a graph that shows the percent of active instances that are running different versions of your application on each day within the selected time period.

The following shows an example of an adoption rate graph with three months of data:

![Adoption rate graph showing three months of data](/images/adoption_rate_graph.png)

[View a larger version of this image](/images/adoption_rate_graph.png)

As shown in the image above, the graph plots the number of active instances on each day in the selected time period. Additionally, that graph uses colors to represent the application versions that were active on each day. The key to the left of the graph shows the unique color that is assigned to each application version. You can use this color-coding to see at a glance the percentage of active instances that were running different versions of your application across the selected time period.

You can also hover over a color-coded section in the graph to view the number and percentage of active instances that were running the version on the given day.

If there are no active instances of your application, then the adoption rate graph displays a "No Instances" message.

## Adoption Rate Metrics {#metrics}

The **Adoption rate** section also includes metrics that are key indicators of how frequently your customers discover and complete upgrades to new versions of your application.

The following shows an example of the metrics in the **Adoption rate** section:

![Adoption rate metrics showing](/images/adoption_rate_metrics.png)

[View a larger version of this image](/images/adoption_rate_metrics.png)

As shown in the image above, the **Adoption rate** section displays the following metrics:
* Instances on last three versions
* Unique versions
* Median relative age
* Upgrades completed

Based on the time period selected, each metric includes an arrow that shows the change in value compared to the previous period. For example, if the median relative age today is 68 days, the selected time period is three months, and three months ago the median relative age was 55 days, then the metric would show an upward-facing arrow with an increase of 13 days. 

The following table describes each metric in the **Adoption rate** section, including the formula used to calculate its value and the recommended trend for the metric over time: 

<table>
  <tbody>
    <tr>
      <th width="25%">Metric</th>
      <th width="45%">Description</th>
      <th width="30%">Target Trend</th>
    </tr>
    <tr>
      <td>Instances on last three versions</td>
      <td>
        <p>Percent of active instances that are running one the latest three versions of your application.</p>
        <p><strong>Formula</strong>: <code>count(instances on last 3 versions) / count(instances)</code></p>
      </td>
      <td>Increase towards 100%</td>
    </tr>
    <tr>
      <td>Unique versions</td>
      <td>
        <p>Number of unique versions of your application running in active instances.</p>
        <p><strong>Formula</strong>: <code>count(distinct instance_version)</code></p>
      </td>
      <td>Decrease towards less than or equal to three</td>
    </tr>
    <tr>
      <td>Median relative age</td>
      <td>
        <p>The <em>relative age</em> of a single instance is the number of days between the date that the instance's version was promoted to the channel and the date when the latest available application version was promoted to the channel.</p>
        <p><em>Median relative age</em> is the median value across all active instances for the selected time period and channel.</p>
        <p><strong>Formula</strong>: <code>median(relative_age(instance_version))</code></p>
      </td>
      <td><p>Decrease towards the median time between your releases</p></td>
    </tr>
    <tr>
      <td>Upgrades completed</td>
      <td>
        <p>Total number of completed upgrades across active instances for the selected time period and channel.</p>
        <p>An upgrade is a single version change for an instance. An upgrade is considered complete when the instance deploys the new application version.</p>
        <p>The instance does <em>not</em> need to become available (as indicated by reaching a Ready state) after deploying the new version for the upgrade to be counted as complete.</p>
        <p><strong>Formula</strong>: <code>sum(instance.upgrade_count) across all instances</code></p>
      </td>
      <td>Increase towards the total number of upgrades available across instances for the selected time period and channel</td>
    </tr>
  </tbody>
</table>
