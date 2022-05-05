# About the Configuration Screen

Applications can include a configuration page in the Replicated admin console. The configuration screen is a customizable form that you can use to collect and validate user-supplied values for your application.

You can use the configuration screen to collect inputs for values that are required to start your application, as well as any optional configuration values.

For example, you can use the configuration screen to provide database configuration options for your application. From the configuration screen, your users could choose if they will embed a database instance alongside the application, or connect the application to an external database instance that they manage.

If they choose to connect the application to an external database, you could include fields to collect the required values for the external database, such as the host, port, and a username and password.

## Editing the Config Custom Resource

The fields displayed in the admin console configuration screen are defined in the Config custom resource manifest file.

Example:

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: my-application
spec:
  groups:
    - name: smtp_settings
      title: Mail Server (SMTP)
      description: Configuration to use an external mail server
      items:
        - name: enable_smtp
          type: bool
          default: "0"
        - name: smtp_hostname
          title: SMTP Server Hostname
          type: text
          required: true
        - name: smtp_username
          title: SMTP Username
          type: text
          required: true
        - name: smtp_password
          title: SMTP Password
          type: password
          required: true
```

## Viewing the Configuration Screen

Enterprise users can access the configuration screen from the admin console:
* During application installation, if you include any required fields.
* In the Config tab of the admin console after they install the application.

### Application Installation

For applications with required fields, the admin console displays the configuration screen when the user is installing the application, after they upload their license file.

![configuration screen that displays during application install](../../static/images/initial-config.png)

### Admin Console Config Tab

For applications that do not have any required fields, the admin console does not display the configuration screen during application installation. All users can access the configuration screen after they install the application from the Config tab of the admin console.

![configuration screen that displays in the Config tab of the admin console](../../static/images/config.png)
