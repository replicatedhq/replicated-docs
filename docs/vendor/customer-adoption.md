# Adoption Rate

This topic describes the insights in the **Adoption rate** section on the Replicated vendor portal **Customers** page.

## About Adoption Rate

The **Adoption rate** section on the **Customers** page provides insights about the rate at which your customers upgrade their instances and adopt the latest versions of your application. The metrics displayed in the **Adoption rate** section represent the aggregate values for active instances across all your customers that are assigned to the specified release channel.  

As an application vendor, you can use these aggregate adoption rate metrics to learn if your customers are completing upgrades regularly, which is a key indicator of the discoverability and ease of application upgrades.

The following screenshot shows an example of the **Adoption rate** section:

**INSERT SCREENSHOT**

As shown in the screenshot above, the **Adoption rate** section includes a graph that shows the daily change in the percentage of active instances running different versions of your application. It also includes 

You can filter the metrics in the **Adoption rate** section by:
<!-- * License type (Paid, Trial, Dev, or Community) -->
* Time period (the previous week, month, three months, or twelve months)
* Release channel where the license is assigned, such as Stable or Beta

## Adoption Rate Graph

The **Adoption rate** section includes a graph that depicts the percentage of active instances running different versions of your application. You can hover over the graph to view the number of active instances running each version on each day in the specified time period.

If there are no active instances of your application, the **Adoption rate** section displays a "No Active Instances" message.

## Adoption Rate Metrics

The following sections provide more information about the adoption rate metrics:

<table>
  <tbody>
    <tr>
      <th>Metric</th>
      <th>Description</th>
      <th>Recommended value</th>
    </tr>
    <tr>
      <td>% of instances on last three versions</td>
      <td>
        <p>Percent of active instances on the specified channel that are running one the latest three versions of your application.</p>
        <p><strong>Formula</strong>: <code>count(instances on last 3 versions) / count(instances)</code></p>
      </td>
      <td></td>
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
      <td><p>Age of a single instance's deployed application version, measured against the age of the latest release available on a channel.</p></td>
      <td></td>
    </tr>
    <tr>
      <td>Upgrades completed</td>
      <td><p>Total number of completed upgrades. An upgrade is a single version change for a customer instance. An upgrade is counted when the new application version is deployed, not when it becomes live and available.</p></td>
      <td></td>
    </tr>
  </tbody>
</table>
