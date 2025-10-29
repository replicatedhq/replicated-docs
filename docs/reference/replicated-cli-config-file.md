# Add a .replicated File

This topic describes the `.replicated` configuration file, including how to add a `.replicated` file and how the Replicated CLI uses this file to discover and process your application resources when linting and creating releases. 

For a reference that describes the fields in the `.replicated` file, see [.replicated File Reference](/reference/replicated-cli-replicated-config-reference).

## Overview

You can add a `.replicated` configuration file to set various preferences for the Replicated CLI, such as the application slug, the channel ID for promoting releases, paths to your application resources (including Helm charts, preflight specs, or Kubernetes manifests), and more. This file enables commands like [`replicated release create`](/reference/replicated-cli-release-create) and [`replicated release lint`](/reference/replicated-cli-release-lint) to automatically discover your application resources and preferences to help ensure consistent builds when managing releases from the Replicated CLI.

The Replicated CLI searches for `.replicated` or `.replicated.yaml` files starting from the current directory and walking up the directory tree. If no `.replicated` file is found, the Replicated CLI:
- Automatically searches for Helm charts in the current directory
- Auto-detects preflight specs (files with `kind: Preflight`)
- Auto-detects support bundle specs (files with `kind: SupportBundle`)
- Uses default linting configuration

## About Using Multiple `.replicated` Files for Monorepos

The Replicated CLI supports both single-repository projects with one `.replicated` file at the root and monorepo projects with multiple `.replicated` files at different levels.

For monorepo projects with multiple `.replicated` files, the Replicated CLI:
- Finds all `.replicated` files from the current directory up to the root
- Merges the configuration files, with the settings from child configuration files taking precedence
- Accumulates resources (charts, preflights, manifests) from all levels
- Overrides scalar fields (appId, appSlug) with values from child configuration files

The following provides an example of a monorepo structure with multiple `.replicated` configuration files:

```
monorepo/
├── .replicated           # Root config with shared settings
│   └── appSlug: "company-suite"
├── service-a/
│   ├── .replicated       # Service A specific config
│   │   └── charts: ["./chart"]
│   └── chart/
└── service-b/
    ├── .replicated       # Service B specific config
    │   └── charts: ["./helm"]
    └── helm/
```

In the example above, when running `replicated release lint` or `replicated release create` from `monorepo/service-a/` or from `monorepo/service-b/`, the Replicated CLI merges the root `.replicated` file with the relevant child `.replicated` file:
- The `appSlug` from the root `.replicated` file is used, unless the slug is overridden in the child configuration file
- Charts from both `.replicated` files are included
- Lint settings are merged, with the settings from the child `.replicated` file taking precedence

## Add a `.replicated` File

This section explains how to generate a `.replicated` file using the `replicated config init` command. Alternatively, you can manually create a `.replicated` file. For a field reference and examples, see [.replicated File Reference](/reference/replicated-cli-replicated-config-reference).

To generate a `.replicated` configuration file using the Replicated CLI:

1. Run:

   ```bash
   replicated config init
   ```
   The `replicated config init` command automatically detects Helm charts, preflight specs, and support bundles in your project.

1. Respond to the prompts in the output of this command to set your application configuration and linting preferences.

   The `.replicated` file is generated based on your selections.