# Step 1: Get the Sample Chart and Test

To begin, get the sample Gitea Helm chart from Bitnami, install the chart in your cluster using the Helm CLI, and then uninstall. The purpose of this step is to confirm that you can successfully install and access the application before adding the chart to a release in the Replicated vendor portal.

To get the sample Gitea Helm chart and test installation:

1. Run the following command to pull and untar the Bitnami Gitea Helm chart:

   ```
   helm pull --untar oci://registry-1.docker.io/bitnamicharts/gitea
   ```
   For more information about this chart, see the [bitnami/gitea](https://github.com/bitnami/charts/tree/main/bitnami/gitea) repository in GitHub.

1. Change to the new `gitea` directory that was created:
   ```
   cd gitea
   ```
1. View the files in the directory:   
   ```
   gitea ls
   ```
   The directory contains the following files:
   ```
   Chart.lock  Chart.yaml  README.md  charts  templates  values.yaml
   ```
1. Using the installation instructions provided in the `README.md` file, install the Gitea chart in your cluster:

   ```
   helm install gitea oci://registry-1.docker.io/bitnamicharts/gitea
   ```
   To view the installation instructions in GitHub, see [Installing the Chart](https://github.com/bitnami/charts/blob/main/bitnami/gitea/README.md#installing-the-chart) in the `bitnami/gitea` repository.

   When the chart is installed, the following output is displayed:

   ```
   NAME: gitea
   LAST DEPLOYED: Tue Oct 17 09:45:19 2023
   NAMESPACE: default
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   CHART NAME: gitea
   CHART VERSION: 1.0.6
   APP VERSION: 1.20.5

   ** Please be patient while the chart is being deployed **

   1. Get the Gitea URL:

   NOTE: It may take a few minutes for the LoadBalancer IP to be available.
        Watch the status with: 'kubectl get svc --namespace default -w gitea'

   export SERVICE_IP=$(kubectl get svc --namespace default gitea --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
   echo "Gitea URL: http://$SERVICE_IP/"

   WARNING: You did not specify a Root URL for Gitea. The rendered URLs in Gitea may not show correctly. In order to set a root URL use the rootURL value.

   2. Get your Gitea login credentials by running:

   echo Username: bn_user
   echo Password: $(kubectl get secret --namespace default gitea -o jsonpath="{.data.admin-password}" | base64 -d)
   ```

1. Watch the status of the `gitea` LoadBalancer service to see when the `EXTERNAL-IP` is available:

   ```
   kubectl get svc --namespace default -w gitea
   ```

1. When the `EXTERNAL-IP` for the `gitea` LoadBalancer service is available, run the commands provided in the output of the command to get the Gitea URL:

   ```
   export SERVICE_IP=$(kubectl get svc --namespace default gitea --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
   echo "Gitea URL: http://$SERVICE_IP/"
   ```

1. In a browser, go to the Gitea URL to view the welcome page for the application.

1. (Optional) See that the Gitea deployment and pods are ready:

   ```
   kubectl get deploy -n default gitea
   ```
   **Example output:**
   ```
   NAME    READY   UP-TO-DATE   AVAILABLE   AGE
   gitea   1/1     1            1           2m47s
   ```
   ```
   kubectl get pods -n default
   ```
   **Example output:**
   ```
   NAME                  READY   STATUS    RESTARTS   AGE
   gitea-cfb9c74-l64pf   1/1     Running   0          2m57s
   gitea-postgresql-0    1/1     Running   0          2m57s
   ```

1. Uninstall the Helm chart:

   ```
   helm delete gitea
   ```
   The command removes all the Kubernetes components associated with the chart and deletes the `gitea` release:
   ```
   release "gitea" uninstalled
   ```
   For more information, see [Uninstalling the Chart](https://github.com/bitnami/charts/blob/main/bitnami/gitea/README.md#uninstalling-the-chart) in the `bitnami/gitea` repository.

## Next Step

Log in to the vendor portal and create an application. See [Create an Application](tutorial-kots-helm-create-app).

## Related Topics

* [Helm Install](https://helm.sh/docs/helm/helm_install/)
* [Helm Uninstall](https://helm.sh/docs/helm/helm_uninstall/)
* [Helm Create](https://helm.sh/docs/helm/helm_create/)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)