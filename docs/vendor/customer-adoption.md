# Adoption Rate

This topic describes the insights in the **Adoption rate** section on the Replicated vendor portal **Customers** page.

## About Adoption Rate

The **Adoption rate** section on the **Customers** page provides insights about the rate at which your customers upgrade their instances and adopt the latest versions of your application. The metrics displayed in the **Adoption rate** section represent the aggregate values for active instances across all your customers that are assigned to the specified release channel.  

As an application vendor, you can use these aggregate adoption rate metrics to learn if your customers are completing upgrades regularly, which is a key indicator of the discoverability and ease of application upgrades.

The following screenshot shows an example of the **Adoption rate** section:

**INSERT SCREENSHOT**

As shown in the screenshot above, the **Adoption rate** section includes a graph that depicts the percentage of active instances running different versions of your application. You can hover over the graph to view the number of active instances running each version on each day in the specified time period.

You can filter the metrics in the **Adoption rate** section by:
<!-- * License type (Paid, Trial, Dev, or Community) -->
* Time period (the previous week, month, three months, or twelve months)
* Release channel where the license is assigned, such as Stable or Beta

If there are no active instances of your application, the **Adoption rate** section displays a "No Active Instances" message.

The following sections provide more information about the adoption rate metrics:
* [Instances on Last Three Versions](#last-three)
* [Unique Versions](#unique)
* [Median Relative Age](#relative-age)
* [Upgrades Completed](#upgrades)

## Instances on Last Three Versions {#last-three}

The **Instances on last three versions** value is the percent of active instances on the specified channel that are running one the latest three versions of your application. 

## Unique Versions {#unique}

The number of unique versions running in customer instances.

## Median Relative Age {#relative-age}

Relative Age is the age of a single instance's deployed software version, measured against the age of the latest release available on a channel.

## Upgrades Completed {#upgrades}

An upgrade is a single version change for a customer instance. An upgrade is counted when the new application version is deployed, not when it becomes live and available.