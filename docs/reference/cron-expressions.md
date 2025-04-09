# Cron Expressions

This topic describes the supported cron expressions that you can use to schedule automatic application update checks and automatic backups in the KOTS Admin Console.

For more information, see [Configure Automatic Updates](/enterprise/updating-apps) and [Schedule Automatic Backups](/enterprise/snapshots-creating#schedule-automatic-backups) in _Creating and Scheduling Backups_.

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
      <td>, - * </td>
    </tr>
    <tr>
      <td>Hour</td>
      <td>0 through 23</td>
      <td>, - * </td>
    </tr>
    <tr>
      <td>Day-of-month</td>
      <td>1 through 31</td>
      <td>, - * ? </td>
    </tr>
    <tr>
      <td>Month</td>
      <td>1 through 12 or JAN through DEC</td>
      <td>, - * </td>
    </tr>
    <tr>
      <td>Day-of-week</td>
      <td>1 through 7 or SUN through SAT</td>
      <td>, - * ?</td>
    </tr>
  </table>

## Special Characters

Replicated uses an external cron Go library. For more information about it's usage, see [cron](https://pkg.go.dev/github.com/robfig/cron/v3). 

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
      <td>Question mark (?)</td>
      <td> Specifies that one or another value can be used. For example, enter <code>5</code> for Day-of-the-month and <code>?</code> for Day-of-the-week to check for updates on the 5th day of the month, regardless of which day of the week it is.</td>
    </tr>
</table>

## Predefined Schedules

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
      <td>Run once a week, at midnight on Saturday.</td>
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
      <td><p>Disables the schedule completely. Only used by KOTS.</p><p>This value can be useful when you are calling the API directly or are editing the KOTS configuration manually.</p></td>
      <td>0 * * * *</td>
    </tr>
    <tr>
      <td>@default</td>
      <td><p>Selects the default schedule option (every 4 hours). Begins when the Admin Console starts up.</p><p>This value can be useful when you are calling the API directly or are editing the KOTS configuration manually.</p></td>
      <td>0 * * * *</td>
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

The following examples show valid cron expressions to schedule checking for updates:

- At 11:30 AM every day:

    ```
    30 11 * * *
    ```

- After 1 hour and 45 minutes, and then every interval following that:

  ```
  @every 1h45m
  ```
