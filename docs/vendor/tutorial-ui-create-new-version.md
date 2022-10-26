# Step 6: Create a New Version

Now that you have an application running, a common task is to deliver updates. You will change the number of NGINX replicas to learn how to deliver an update.

1. From the vendor portal, click **Releases** > **Create Release**.

  The YAML editor opens and shows the contents of the most recently created release. This gives you everything that you have done so far, and the next task is to increase the number of NGINX replicas.

1. In the release YAML, find the NGINX deployment to change. Add a `replicas` line in the `example-deployment.yaml` file:

  ```diff
  --- example-deployment.yaml	2022-08-23 16:54:45.000000000 -0500
  +++ example-deployment-2.yaml	2022-08-23 19:30:47.000000000 -0500
  @@ -6,6 +6,7 @@
     labels:
       app: nginx
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: nginx
  ```

1. Change the number to `2` or more.

  :::note
  If you have worked ahead and completed the [CLI setup guide](tutorial-installing-with-cli), you can make this `replicas` change in your locally checked-out git repository, publish it with `replicated release create --auto`, and then skip to [Update the Test Server](#update-the-test-server).
  :::

1. Click **Save Release**.

1. Following the same process you before, promote the release to a channel:

    1. Click **Promote** next to the newly created Sequence 2.

    1. Choose the Unstable channel, and click **Promote**.

  Any license installed from the Unstable channel will start with this new release, and any installation already running is prompted to update to the new release.
