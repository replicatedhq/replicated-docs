# Cron expressions

This topic describes the cron expressions that you can use in the Replicated KOTS Admin Console to schedule automatic update checks and automatic backups.

## Supported installations

The following table lists where you can use cron expressions:

<table>
    <tr>
      <th width="30%">Feature</th>
      <th width="35%">Supported</th>
      <th width="35%">Not supported</th>
    </tr>
    <tr>
      <td>Automatic update checks. See [Configure automatic updates](/enterprise/updating-apps).</td>
      <td>KOTS in an existing cluster and kURL installations with outbound internet access</td>
      <td>Embedded Cluster v2 and v3, and air gap installations</td>
    </tr>
    <tr>
      <td>Automatic backups. See [Schedule automatic backups](/enterprise/snapshots-creating#schedule-automatic-backups).</td>
      <td>KOTS in an existing cluster, kURL, and Embedded Cluster v2</td>
      <td>Embedded Cluster v3</td>
    </tr>
</table>

:::note
Embedded Cluster v3 does not use the KOTS Admin Console. To schedule backups for Embedded Cluster v3, see [Create and manage backups](/embedded-cluster/v3/embedded-disaster-recovery-v3#create-and-manage-backups).
:::

## Syntax

```
<minute> <hour> <day-of-month> <month> <day-of-week>
```

## Fields

The following table lists the required cron fields and supported values:

<table>
    <tr>
      <th width="30%">Required Field</th>
      <th width="30%">Allowed Values</th>
      <th width="40%">Allowed Special Characters</th>
    </tr>
    <tr>
      <td>Minute</td>
      <td>0 through 59</td>
      <td>, - * /</td>
    </tr>
    <tr>
      <td>Hour</td>
      <td>0 through 23</td>
      <td>, - * /</td>
    </tr>
    <tr>
      <td>Day-of-month</td>
      <td>1 through 31</td>
      <td>, - * ? /</td>
    </tr>
    <tr>
      <td>Month</td>
      <td>1 through 12 or JAN through DEC</td>
      <td>, - * /</td>
    </tr>
    <tr>
      <td>Day-of-week</td>
      <td>0 through 6 or SUN through SAT, where 0 is Sunday</td>
      <td>, - * ? /</td>
    </tr>
  </table>

## Special characters

KOTS uses the [robfig/cron](https://pkg.go.dev/github.com/robfig/cron/v3) Go library to parse cron expressions.

The following table describes the supported special characters:

<table>
    <tr>
      <th width="20%">Special Character</th>
      <th width="80%">Description</th>
    </tr>
    <tr>
      <td>Comma (,)</td>
      <td>Specifies a list or multiple values, which can be consecutive or not. For example, <code>1,2,4</code> in the Day-of-week field signifies every Monday, Tuesday, and Thursday.</td>
    </tr>
    <tr>
      <td>Dash (-)</td>
      <td>Specifies a contiguous range. For example, <code>4-6</code> in the Month field signifies April through June.</td>
    </tr>
    <tr>
      <td>Asterisk (&#42;)</td>
      <td>Specifies that all of the values for the field are used. For example, using <code>*</code> in the Month field means that all of the months are included in the schedule.</td>
    </tr>
    <tr>
      <td>Slash (/)</td>
      <td>Specifies increments. For example, <code>*/15</code> in the Minute field signifies every 15 minutes, and <code>0/4</code> in the Hour field signifies every 4 hours starting at midnight.</td>
    </tr>
    <tr>
      <td>Question mark (?)</td>
      <td>Equivalent to the asterisk (&#42;). By convention, use <code>?</code> in the Day-of-month or Day-of-week field to leave that field unrestricted. For example, enter <code>5</code> for Day-of-month and <code>?</code> for Day-of-week to run on the 5th day of the month, regardless of which day of the week it is.</td>
    </tr>
</table>

## Predefined schedules

You can use one of the following predefined schedule values instead of a cron expression:

<table>
    <tr>
      <th width="25%">Schedule Value</th>
      <th width="50%">Description</th>
      <th width="25%">Equivalent Cron Expression</th>
    </tr>
    <tr>
      <td>@yearly (or @annually)</td>
      <td>Runs once a year, at midnight on January 1.</td>
      <td>0 0 1 1 *</td>
    </tr>
    <tr>
      <td>@monthly</td>
      <td>Runs once a month, at midnight on the first of the month.</td>
      <td>0 0 1 * *</td>
    </tr>
    <tr>
      <td>@weekly</td>
      <td>Runs once a week, at midnight on Sunday.</td>
      <td>0 0 * * 0</td>
    </tr>
    <tr>
      <td>@daily (or @midnight)</td>
      <td>Runs once a day, at midnight.</td>
      <td>0 0 * * *</td>
    </tr>
    <tr>
      <td>@hourly</td>
      <td>Runs once an hour, at the beginning of the hour.</td>
      <td>0 * * * *</td>
    </tr>
    <tr>
      <td>@never</td>
      <td><p>Disables automatic update checks. Supported for automatic update checks only.</p><p>This value can be useful when you are calling the API directly or are editing the KOTS configuration manually.</p></td>
      <td>Not applicable</td>
    </tr>
    <tr>
      <td>@default</td>
      <td><p>Checks for updates every 4 hours, starting from when the Admin Console starts. This is the default schedule for automatic update checks. Supported for automatic update checks only.</p><p>This value can be useful when you are calling the API directly or are editing the KOTS configuration manually.</p></td>
      <td>Not applicable</td>
    </tr>
</table>

## Intervals

You can also schedule the job to operate at fixed intervals, starting at the time the job is added or when cron is run:

```
@every DURATION
```

Replace `DURATION` with a string that is accepted by time.ParseDuration, with the exception of seconds. Seconds are not supported by KOTS. For more information about duration strings, see [time.ParseDuration](http://golang.org/pkg/time/#ParseDuration) in the Go Time documentation.

As with standard cron expressions, the interval does not include the job runtime. For example, if a job is scheduled to run every 10 minutes, and the job takes 4 minutes to run, there are 6 minutes of idle time between each run.

## Examples

The following examples show valid cron expressions:

- At 11:30 AM every day:

    ```
    30 11 * * *
    ```

- At 2:00 AM every Sunday:

    ```
    0 2 * * 0
    ```

- After 1 hour and 45 minutes, and then every interval following that:

  ```
  @every 1h45m
  ```
