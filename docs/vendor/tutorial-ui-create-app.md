# Step 1: Create an Application

When you work with the Replicated platform, the Replicated vendor portal is the primary user interface (UI) that you use to package and distribute your application. This tutorial is designed to help you get familiar with the concepts and ideas that are important to successfully deploy your application with the Replicated app manager.

For help and information, see [How to Package and Distribute a Production Application](distributing-workflow) or our [community documentation](https://help.replicated.com/community/).

This tutorial shows you how to deploy a sample application using the app manager, and how to deliver an update to that application.
The tutorial does not teach Kubernetes, rather it starts with a minimal Kubernetes application that deploys a single replica of [NGINX](https://www.nginx.com).

To start this tutorial, you create an application.

To create a new application:

1. Log in (or create a new team) to the [vendor portal](https://vendor.replicated.com).

  After signing up and activating your account, the Create application page opens.

1. Enter a name for the new application, such as Starter Application or NGINX Example.

  ![Create Application](/images/guides/kots/create-application.png)

1. Click **Create Application**.

  The application is created, and the Channels page opens and displays a list of your release channels that are logical stacks for you to stage and promote releases to your customers. We will explore this in more detail later.
