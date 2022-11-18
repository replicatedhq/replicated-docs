# Downloading the ConfigValues File

This topic describes how to access and download the ConfigValues manifest file for your application so that you can share it with your users.

## About the ConfigValues File

You must provide a ConfigValues YAML file to your users to allow them to install and configure your application with automation using the kots CLI.

The ConfigValues file contains the unique configuration options for your application that you define in the Config custom resource. Customers can input their desired configurations in the ConfigValues file rather than selecting them in the admin console Config page.

Customers pass this file when they run the `kots install` command to automate the application configuration. The app manager reads the ConfigValues file to configure the application during installation.

The ConfigValues file has the following format:

```yaml
apiVersion: kots.io/v1beta1
kind: ConfigValues
spec:
  values:
    config_option_name_text:
      default: "Example default value"
      value: "Example user input value"
    config_option_name_boolean:
      default: true
      value: false
```

## Download the ConfigValues File

To download the ConfigValues file for your application, run the following command:

```
kubectl kots download --namespace APP_NAMESPACE --slug APP_SLUG
```
Replace:
* APP_NAMESPACE with the namespace where your application is installed.
* APP_SLUG with the slug for the application.

:::note
You can copy these values from the dialog that appears when you click **Need to edit these files? Click here to learn how** in the admin console.
:::

The kots CLI downloads your application files from the cluster. The kots CLI downloads the ConfigValues file to `upstream/userdata/config.yaml`.
