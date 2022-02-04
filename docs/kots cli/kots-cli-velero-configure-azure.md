# velero configure-azure

Configures snapshots to use an Azure Blob Storage Container as a storage destination.
Currently only the [Service Principle authentication method](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure#option-1-create-service-principal) of the velero-plugin-for-microsoft-azure.

Valid Subcommands:
* service-principle

### Usage

```bash
kubectl kots velero configure-azure [subcommand]
```

| Flag         | Type | Description              |
|--------------|------|--------------------------|
| `-h, --help` |      | help for configure-azure |

### service-principle

```bash
kubectl kots velero configure-azure service-principle [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                | Type   | Description                                                                                                                                 |
|---------------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `-h, --help`        |        | help for service-principle                                                                                                                  |
| `-n, --namespace`   | string | the namespace of the admin console _(required)_                                                                                             |
| `--client-id`       | string | the client ID of a Service Principle with access to the blob storage container _(required)_                                                 |
| `--client-secret`   | string | the client secret of a Service Principle with access to the blob storage container _(required)_                                             |
| `--cloud-name`      | string | the Azure cloud target. Options: AzurePublicCloud, AzureUSGovernmentCloud, AzureChinaCloud, AzureGermanCloud _(default `AzurePublicCloud`)_ |
| `--container`       | string | name of the Azure blob storage container where backups should be stored _(required)_                                                        |
| `--path `           | string | path to a subdirectory in the blob storage container                                                                                        |
| `--resource-group`  | string | the resource group name of the blob storage container _(required)_                                                                          |
| `--skip-validation` | bool   | skip the validation of the blob storage container _(default `false`)_                                                                       |
| `--storage-account` | string | the storage account name of the blob storage container _(required)_                                                                         |
| `--subscription-id` | string | the subscription id associated with the blob storage container _(required)_                                                                 |
| `--tenant-id `      | string | the tenant ID associated with the blob storage container _(required)_                                                                       |

#### Example

```bash
kubectl kots velero configure-azure service-principle --namespace default  --container velero --resource-group Velero_Backups --storage-account velero1111362eb32b --subscription-id "1111111-1111-47a7-9671-c904d681c2b2" --tenant-id "1111111-1111-42e1-973b-ad2efc689308" --client-id "1111111-1111-4ac3-9e2b-bbea61392432" --client-secret "<secret here>"
```
