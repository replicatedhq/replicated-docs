# registry add

Adds a new external registry.

## Usage

`registry add [provider_command] [flags]`

### Options

```
  -h, --help              help for add
      --skip-validation   Skip validation of the registry (not recommended)
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --token string   The API token to use to access your app in the Vendor API
```

This command supports the following registry providers:

* [replicated registry add dockerhub](replicated-cli-registry-add-dockerhub.md)	 - Add a DockerHub registry
* [replicated registry add ecr](replicated-cli-registry-add-ecr.md)	 - Add an ECR registry
* [replicated registry add gcr](replicated-cli-registry-add-gcr.md)	 - Add a Google Container Registry
* [replicated registry add ghcr](replicated-cli-registry-add-ghcr.md)	 - Add a GitHub Container Registry
* [replicated registry add other](replicated-cli-registry-add-other.md)	 - Add a generic registry
* [replicated registry add quay](replicated-cli-registry-add-quay.md)	 - Add a quay.io registry
