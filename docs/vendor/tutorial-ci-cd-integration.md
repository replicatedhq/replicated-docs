# CI/CD Tutorial for KOTS Releases

This tutorial demonstrates how you can package and release an application with Replicated within an existing continuous integration and continuous deployment (CI/CD) platform.

This is an advanced workflow that allows you to use your own internal git repository and CI/CD systems like GitHub, GitLab, CircleCI, TravisCI, and Jenkins.

For a similar workflow that uses GitHub Actions, see [Replicated Kubernetes Starter GitHub Actions](https://github.com/replicatedhq/replicated-starter-kots/blob/main/.github/workflows/main.yml).

## Environment Variables

This section will assume you already have the App slug and API token from the [CLI Tutorial](tutorial-cli-setup).

- Configure the following 2 environment variables in your CI/CD configuration.

- `REPLICATED_APP` with the App Slug.
- `REPLICATED_API_TOKEN` with the API token.

## Kubernetes Objects

Follow the steps below if you are working with standard YAML Kubernetes API objects.

1. Start from a basic Kubernetes App, which could look something like this inside the `k8s` directory.

    ```text
    .
    └── k8s
        ├── config-map.yaml
        ├── deployment.yaml
       ├── ingress.yaml
       └── service.yaml
    ```

1. Make a copy of [manifests](https://github.com/replicatedhq/replicated-automation/tree/master/vendor/nginx-app/manifests) directory from the Replicated Kubernetes Starter repo and place it in your internal repo's root directory.

1. Replace the files in `manifests/app` with the files in `k8s`.
Sub directories are supported as well, so `k8s` directory can be put anywhere inside `manifests`.

1. In the root directory of the internal repository add this `Makefile`:

    ```shell
    curl -LS https://raw.githubusercontent.com/replicatedhq/replicated-automation/master/vendor/nginx-app/Makefile -o ./Makefile
    ```

    Your root directory structure should look something like this:

    ```text
    .
    ├── Makefile
    └── manifests
        ├── app
        │   ├── config-map.yaml
        │   ├── deployment.yaml
        │   ├── ingress.yaml
        │   └── service.yaml
        └── kots
            ├── config.yaml
            ├── preflight.yaml
            ├── replicated-app.yaml
            └── support-bundle.yaml
    ```

    You can also check out a real-world [application example](https://github.com/replicatedhq/replicated-automation/tree/master/vendor/nginx-app).

1. Configure your CI/CD to run the following `make` command on push:

    ```shell
    make release
    ```

1. Verify the release in the Replicated [Vendor Portal](https://vendor.replicated.com).

## Helm Chart

The steps below show how to modify a repository containing a Helm chart to be deployable as an application.

This section assumes you have reviewed the [About Distributing Helm Charts with KOTS](/vendor/helm-native-about) content, and are familiar with how Replicated KOTS processes Helm charts as part of an application.

1. Start from a basic Helm Chart structure, which could look something like this:

    ```text
    .
    ├── Chart.yaml
    ├── templates
    │   ├── config-map.yaml
    │   ├── deployment.yaml
    │   ├── ingress.yaml
    │   └── service.yaml
    └── values.yaml
    ```

1. Add the following 2 files, `.gitignore` and `.helmignore`, to the Chart's root directory to prevent cruft from being committed or packaged.

    ```shell
    cat <<EOF >>./.gitignore
    kots/deps
    kots/manifests/*.tgz
    EOF
    ```

    ```shell
    cat <<EOF >>./.helmignore
    kots/
    EOF
    ```

1. Make a copy of a [`kots` directory](https://github.com/replicatedhq/replicated-automation/tree/master/vendor/helm-influxdb/kots) from the `replicated-automation` repository and place it in your Chart's root dir.

1. Update `spec.chart.name` and `spec.chart.chartVersion` in `kots/helm-chart.yaml` to match your chart.

1. In the `kots` directory add this `Makefile`:

    ```shell
    curl -LS https://raw.githubusercontent.com/replicatedhq/replicated-automation/master/vendor/helm-influxdb/kots/Makefile -o kots/Makefile
    ```

1. Your final Chart directory structure should look something like this:

    ```text
    .
    ├── .gitignore
    ├── .helmignore
    ├── Chart.yaml
    ├── kots
    │   ├── Makefile
    │   └── manifests
    │       ├── config.yaml
    │       ├── helm-chart.yaml
    │       ├── preflight.yaml
    │       ├── replicated-app.yaml
    │       └── support-bundle.yaml
    ├── templates
    │   ├── config-map.yaml
    │   ├── deployment.yaml
    │   ├── ingress.yaml
    │   └── service.yaml
    └── values.yaml
    ```

    You can also check out a real-world [Helm Chart example](https://github.com/replicatedhq/replicated-automation/tree/master/vendor/helm-influxdb).

1. Configure your CI/CD to run the following `make` command on push:

    ```shell
    make -C kots release
    ```

1. Verify the release in the [Vendor Portal](https://vendor.replicated.com).
