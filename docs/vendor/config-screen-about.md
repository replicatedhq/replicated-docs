# About the Configuration Screen

Applications can include a configuration page in the Replicated admin console. The configuration screen is a customizable form that you can use to collect and validate user-supplied values for your application.

You can use the configuration screen to collect values from your users that are required to start your application. You can also collect optional configuration values. For more information about how to add custom fields to the configuration screen, see [Adding and Editing Configuration Fields](admin-console-customize-config-screen).

For example, you can use the configuration screen to provide database configuration options for your application. Your users could connect your application to an external database by providing required values in the configuration screen, such as the host, port, and a username and password for the database. For a tutorial of this use case, see [Adding Database Configuration Options for your Application](tutorial-adding-db-config).

## Viewing the Configuration Screen

Enterprise users of your application can access the configuration screen from the admin console:
* If you include required fields, the admin console displays the configuration screen during application installation. See [Application Installation](#application-installation) below.
* After installing your application, users can access the configuration screen in the Config tab of the admin console. See [Admin Console Config Tab](#admin-console-config-tab) below.

### Application Installation

If you add any required fields, the admin console displays the configuration screen when the enterprise user installs the application, after they upload their license file.

![configuration screen that displays during application install](../../static/images/initial-config.png)

### Admin Console Config Tab

For applications that do not have any required fields, the admin console does not display the configuration screen during application installation. Users can access the configuration screen after they install the application by going to the Config tab in the admin console.

![configuration screen in the Config tab of the admin console](../../static/images/config.png)
