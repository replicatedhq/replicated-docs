# Kubernetes installer YAML advanced options

The Kubernetes Installers (kURL) reference documentation. Each add-on is listed with all supported keys, and the default for the key, if not present.

## Application Vendor YAML Options and Flags

The options available to the application vendor in the installer yaml are a subset of the options available to the cluster operator as flags to the install script.
Each yaml snippet below includes all options available to the application vendor for the add-on and the default for the key if not present.

The cluster operator can use flags to override any of the options set in the application vendor's installer yaml.
For example, passing the `service-cidr` flag to the install script overrides the field `spec.kubernetes.serviceCIDR` in the vendor's yaml.

Additionally, some options are only available to the cluster operator to be passed as flags to the install script. An example is the `bootstrap-token` flag for setting the secret used to join additional nodes to the Kubernetes cluster.

Flag options must be passed every time the install script is run.

### Kubernetes

```yaml
spec:
  kubernetes:
    version: "1.15.3"
    serviceCIDR: "10.96.0.0/12"
```

flags-table
