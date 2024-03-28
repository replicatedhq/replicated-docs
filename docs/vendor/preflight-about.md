# About Preflight Checks

This topic provides an introduction to preflight checks.

## Overview

Preflight checks let you define requirements and dependencies for the cluster where your application is installed. Preflight checks provide clear feedback to your customer about any missing requirements or incompatibilities in the cluster before they install and upgrade your application. Thorough preflight checks provide increased confidence that an installation or upgrade will succeed and help prevent support escalations.

## Defining Preflight Checks

To use preflight checks with your application, create a YAML spec that defines the collectors and analyzers that you want to include in your checks.

For information about how to create the specifications for preflight checks and support bundles, see [Defining Preflight Checks](preflight-defining).

## (KOTS Only) Blocking Installation with Strict Preflight Checks

It is possible to block KOTS from installing an application if a preflight check fails using the `strict` option.

## Running Preflight Checks

This section describes how to run preflight checks.

### KOTS Installations

For installations with Replicated KOTS, preflight checks run automatically as part of the installation process. The results of the preflight checks are displayed either in the Replicated admin console UI or in the kots CLI, depending on the installation method.

Additionally, users can access preflight checks from the admin console after installation to view their results and optionally re-run the checks.

The following shows an example of the results of preflight checks displayed in the KOTS admin console during installation:

![Preflight results in admin console](/images/preflight-warning.png)

[View a larger version of this image](/images/preflight-warning.png)

For more information about the KOTS installation process, see [About Installing an Application](/enterprise/installing-overview).

### Helm CLI Installations

For installations of Helm-based applications with the Helm CLI, your customers can optionally run preflight checks before they run `helm install`. In this case, preflight checks run using a `helm template` command to confirm the target cluster has the resources required for a successful installation.

The results of the preflight checks are displayed in the CLI, as shown in the example below:

![Save output dialog](/images/helm-preflight-save-output.png)

[View a larger version of this image](/images/helm-preflight-save-output.png)

For more information, see [Running Preflight Checks for Helm Installations](preflight-running).