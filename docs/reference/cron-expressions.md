# Cron Expressions

This topic describes the supported _cron expressions_ that are used to schedule checking for application updates in the Replicated admin console.

## Syntax

```
<minute> <hour> <day-of-month> <month> <day-of-week>
```

**Parameters**

The following table shows the parameters and supported values for the required cron fields:

<table>
    <tr>
      <th width="30%">Field</th>
      <th width="30%">Values</th>
      <th width="40%">Wildcards</th>
    </tr>
    <tr>
      <td>Minute</td>
      <td>0-59</td>
      <td>, - * </td>
    </tr>
    <tr>
      <td>Hour</td>
      <td>0-23</td>
      <td>, - * </td>
    </tr>
    <tr>
      <td>Day-of-month</td>
      <td>1-31</td>
      <td>, - * ? L W </td>
    </tr>
    <tr>
      <td>Month</td>
      <td>1-12 or JAN-DEC</td>
      <td>, - * </td>
    </tr>
    <tr>
      <td>Day-of-week</td>
      <td>1-7 or SUN-SAT</td>
      <td>, - * ? L</td>
    </tr>
  </table>

**Wildcard Operators**

The following table shows the definitions for the supported wildcards:

<table>
    <tr>
      <th width="30%">Wildcard</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>,</td>
      <td>The , (comma) wildcard specifies a list or multiple values, which can be consecutive or not. For example, `1,2,4` in the Day-of-week field signifies every Monday, Tuesday, and Thursday.</td>
    </tr>
    <tr>
      <td>-</td>
      <td>The - (dash) wildcard specifies a contiguous range, but it does not require all of the values in the field. For example, `4-6` in the Month field signifies April through June.</td>
    </tr>
    <tr>
      <td>*</td>
      <td>The * (asterisk) wildcard indicates that all of the values for the field are used. For example, using `*` in the Month field means that all of the months are included in the schedule.</td>
    </tr>
    
    <tr>
      <td>?</td>
      <td>The ? (question mark) specifies that one or another value can be used. For example, enter 5 for Day-of-the-month and ? for Day-of-the-week, if you do not have a preference for which day of the week that the fifth day of the month occurs on.</td>
    </tr>
    <tr>
      <td>L</td>
      <td>The L wildcard specifies the last day of the month or week respectively for the Day-of-month or Day-of-week fields.</td>
    </tr>
    <tr>
      <td>W</td>
      <td>The W wildcard specifies the "N-th" occurrence or given day in the month. For example, the second Friday of the month is specified as `6#2`.</td>
    </tr>
</table>

## Examples

These are some examples of valid cron expressions that check for updates:

- At 11:30 AM every day:

    ```
    30 11 * * *
    ```

- At 6:00 PM on the fourth Monday of every month:

    ```
    0 18 ? * 2#4
    ```

- At midnight on the last day of every month:

    ```
    0 0 L * ?