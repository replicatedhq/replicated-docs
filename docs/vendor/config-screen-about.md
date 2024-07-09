# About the Configuration Screen

This topic describes the configuration screen on the Config tab in the Replicated Admin Console.

## About Collecting Configuration Values

When you distribute your application with Replicated KOTS, you can include a configuration screen in the Admin Console. This configuration screen is used to collect required or optional values from your users that are used to run your application. You can use regular expressions to validate user input for some fields, such as passwords and email addresses. For more information about how to add custom fields to the configuration screen, see [Creating and Editing Configuration Fields](admin-console-customize-config-screen).

If you use a Helm chart for your application, your users provide any values specific to their environment from the configuration screen, rather than in a Helm chart `values.yaml` file. This means that your users can provide configuration values through a user interface, rather than having to edit a YAML file or use `--set` CLI commands. The Admin Console configuration screen also allows you to control which options you expose to your users.

For example, you can use the configuration screen to provide database configuration options for your application. Your users could connect your application to an external database by providing required values in the configuration screen, such as the host, port, and a username and password for the database.

Or, you can also use the configuration screen to provide a database option that runs in the cluster as part of your application. For an example of this use case, see [Example: Adding Database Configuration Options](tutorial-adding-db-config).

## Viewing the Configuration Screen

If you include a configuration screen with your application, users of your application can access the configuration screen from the Admin Console:
* During application installation.
* At any time after application installation on the Admin Console Config tab.

### Application Installation

The Admin Console displays the configuration screen when the user installs the application, after they upload their license file.

The following shows an example of how the configuration screen displays during installation:

![configuration screen that displays during application install](/images/config-screen-sentry-enterprise-app-install.png)

[View a larger version of this image](/images/config-screen-sentry-enterprise-app-install.png)

### Admin Console Config Tab

Users can access the configuration screen any time after they install the application by going to the Config tab in the Admin Console.

The following shows an example of how the configuration screen displays in the Admin Console Config tab:

![configuration screen that displays in the Config tab](/images/config-screen-sentry-enterprise.png)

[View a larger version of this image](/images/config-screen-sentry-enterprise.png)
