# customer create

Create a new customer in your application and associate a customer to a channel.
Customer information returned on success.

## Usage
```bash
replicated customer create [Flags]
```

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--name`           |  string | The name of the customer (**required**) |
| `--channel` | string | The channel name to associate with the customer (**case-sensitive, required**) |
| `--ensure-channel` |        | If set, channel will be created if it does not exist. |
| `--expires-in` | duration | If set, license will expire a specified number of units from the current time. For example, `2h` or `1h60m` or `120m` are all the same duration.  |
| `-h, --help`   |  |          Help for the command |
| `--app` | string |   The app slug or app id used in all calls (default uses `$REPLICATED_APP` env variable) |
| `--token` | string |  The API token used to access your app in the Vendor API (default uses `$REPLICATED_API_TOKEN` env variable) |

## Examples
```bash
replicated customer create --channel Megacorp_Beta --name "Megacorp" --ensure-channel --expires-in "8760h"
ID                                  NAME        CHANNELS         EXPIRES                          TYPE
2u4KGXSY65SAUW0ltG_pPhxBGPJ4XNSS    Megacorp    Megacorp_Beta    2021-01-20 00:17:38 +0000 UTC    dev
```
