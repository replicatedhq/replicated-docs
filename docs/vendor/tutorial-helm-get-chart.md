# Step 1: Get the Sample Chart and Test

To begin, you will get a sample NGINX Helm chart, install the Helm chart in your cluster, access the NGINX application in a browser, and then uninstall the Helm chart.

The purpose of this step is to confirm that you can successfully install and access the application before getting started with Replicated components.

To get the sample Helm chart and test installation:

1. Run the following command to create a sample NGINX Helm chart:

   ```
   helm create replicated-onboarding
   ```

1. Change to the `replicated-onboarding` directory:

   ```
   cd replicated-onboarding
   ```
1. View the files in the directory:   
   ```
   replicated-onboarding ls
   ```
   The directory contains the following files for the NGINX Helm chart:
   ```
   Chart.yaml  charts   templates   values.yaml
   ```

1. From the `replicated-onboarding` directory, package the Helm chart into a `.tgz` chart archive:

   ```
   helm package .
   ```
   **Example:**
   ```
   helm package .
   Successfully packaged chart and saved it to: /Users/exampleuser/Workspace/replicated-onboarding/replicated-onboarding-0.1.0.tgz
   ```

1. Use the chart archive to install the Helm chart in your cluster's default namespace:

   ```
   helm install replicated-onboarding replicated-onboarding-0.1.0.tgz
   ```
   When the chart is installed, the following output is displayed:

   ```
    NAME: replicated-onboarding
    LAST DEPLOYED: Wed Oct  4 11:32:04 2023
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    NOTES:
    1. Get the application URL by running these commands:
      export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=replicated-onboarding,app.kubernetes.io/instance=replicated-onboarding" -o jsonpath="{.items[0].metadata.name}")
      export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
      echo "Visit http://127.0.0.1:8080 to use your application"
      kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
   ```

1. Run the commands provided in the output of the `helm install` command to get the application URL.

1. With the port forward running, go to `http://127.0.0.1:8080` in a browser to view the welcome page for the NGINX application.

   ![Welcome to NGINX web page](/images/nginx-helm-chart.png)

   [View a larger version of this image](/images/nginx-helm-chart.png)

1. Confirm that the `replicated-onboarding` Pod is running in the default namespace:

   ```
   kubectl get pods -n default
   ```
   **Example:**
   ```
   NAME                                     READY   STATUS             RESTARTS         AGE
   replicated-onboarding-84fcb7f6d6-tc8m8   1/1     Running            0                11s
   ```

1. Uninstall the Helm chart:

   ```
   helm uninstall replicated-onboarding
   ```
1. Confirm that the `replicated-onboarding` Pod is removed:

   ```
   kubectl get pods -n default
   ```