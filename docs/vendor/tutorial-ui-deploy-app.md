# Step 5: Deploy the Application

At this point, the admin console and Kubernetes are running, but the application is not deployed yet. This is also what your customer would be experiencing when installing your application.

To install the application:

1. In a browser, enter the URL `http://localhost:8800` and password to access the admin console.

  The Upload license page opens.
1. Click Upload. Select your customer license YAML file to continue, or drag and drop the license file from your desktop. The admin console can pull the application YAML and containers now.
1. There are some example configuration options on this page. Feel free to explore and toggle some of the options. You can see the results of your changes later.

    :::note
    For production, you can customize what appears on this screen to collect the configuration that your application needs from the customer. Values are available to your app as text templates or input values to Helm Charts.
    :::

1. Proceed with the default settings.

  The Preflight page opens.

1. Click **Continue** and ignore the warnings. Preflight checks are designed to ensure this server has the minimum system and software requirements to run the application. By default, we included some preflight checks that are expected to fail so that you can see what failing checks might look like for a customer.

    ![Preflight Checks](/images/preflight-warnings.png)

1. Click **Application** on the top to see the application running. If you are still connected to this server using SSH, `kubectl get pods` shows the example NGINX service that you just deployed.

  ![Cluster](/images/guides/kots/application.png)

### View the Deployed Application

To view the default NGINX application, click **Open App** on the Dashboard page.

![Open App](/images/guides/kots/open-app.png)

You should see an example application.

![Cluster](/images/guides/kots/example-app.png)

Next, you will create and deliver an update to the sample application.
