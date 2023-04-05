# Adoption Rate

This topic describes the insights in the **Adoption rate** section on the Replicated vendor portal **Customers** page.

## About Adoption Rate

The **Adoption rate** section on the **Customers** page provides insights about the rate at which your customers upgrade their instances and adopt the latest versions of your application. As an application vendor, you can use these adoption rate metrics to learn if your customers are completing upgrades regularly, which is a key indicator of the discoverability and ease of application upgrades.

The vendor portal generates adoption rate data from all of your customer's active application instances. An instance is considered _active_ if no more than two weeks have passed since its last check-in event. For more information about instance check-ins, see [How the Vendor Portal Collects Instance Data](instance-insights-event-data#about-reporting) in _About Instance and Event Data_.

The following screenshot shows an example of the **Adoption rate** section:

**INSERT SCREENSHOT**

As shown in the screenshot above, the **Adoption rate** section includes a graph that shows the daily change in the percent of active instances running different versions of your application. It also includes key adoption rate metrics that highlight 

You can filter the graph and metrics in the **Adoption rate** section by:
* License type (Paid, Trial, Dev, or Community) **CONFIRM THAT THIS FILTER IS AVAILABLE FOR BETA**
* Time period (the previous week, month, three months, or twelve months).
* Release channel where the license is assigned, such as Stable or Beta.

## Adoption Rate Graph

The **Adoption rate** section includes a graph that shows the percent of active instances that are running different versions of your application on each day within the selected time period:

**SCREENSHOT OF GRAPH SHOWING HOVER**

As shown in the screenshot above, you can hover over the graph to view the number of active instances running each version for each day.

If there are no active instances of your application, then the **Adoption rate** section displays a "No Instances" message.

## Adoption Rate Metrics

The **Adoption rate** section also includes metrics that are key indicators of how up-to-date 

**SCREENSHOT OF METRICS SECTION**

As shown in the screenshot above, the **Adoption rate** section displays the following metrics:
* Instances on last three versions
* Unique versions
* Median relative age
* Upgrades completed

Based on the time period selected, the **Adoption rate** section also displays arrows with the change in the value of each metric compared to the previous period. For example, if the median relative age today is 68 days, the selected time period is three months, and three months ago the median relative age was 55 days, then the metric would show an upward-facing arrow with an increase of 13 days. 

The following table describes each metric in the **Adoption rate** section, including the formula used to calculate its value and the recommended target value: 

<table>
  <tbody>
    <tr>
      <th>Metric</th>
      <th>Description</th>
      <th>Recommended Target Value</th>
    </tr>
    <tr>
      <td>Instances on last three versions</td>
      <td>
        <p>Percent of active instances that are running one the latest three versions of your application.</p>
        <p><strong>Formula</strong>: <code>count(instances on last 3 versions) / count(instances)</code></p>
      </td>
      <td>100%</td>
    </tr>
    <tr>
      <td>Unique versions</td>
      <td>
        <p>Number of unique versions of your application running in active instances.</p>
        <p><strong>Formula</strong>: <code>count(distinct instance_version)</code></p>
      </td>
      <td>Less than or equal to three</td>
    </tr>
    <tr>
      <td>Median relative age</td>
      <td>
        <p>The relative age of a single instance is the number of days between the date that the instance's version was promoted to the channel and the date when the latest available application version was promoted to the channel.</p>
        <p>Median relative age is the median value across all active instances for the selected time period and channel.</p>
        <p><strong>Formula</strong>: <code>median(relative_age(instance_version))</code></p>
      </td>
      <td><p>The target value for median relative age is the same as the median number of days between your releases on the selected channel.</p>
      <p>For example, if the median number of days between new versions is 10 days, then the target value for median relative age is also 10 days.</p></td>
    </tr>
    <tr>
      <td>Upgrades completed</td>
      <td>
        <p>Total number of completed upgrades across active instances for the selected time period and channel.</p>
        <p>An upgrade is a single version change for an instance. An upgrade is considered complete when the instance deploys the new application version.</p>
        <p><strong>Formula</strong>: <code>sum(instance.upgrade_count) across all instances</code></p>
      </td>
      <td></td>
    </tr>
  </tbody>
</table>
