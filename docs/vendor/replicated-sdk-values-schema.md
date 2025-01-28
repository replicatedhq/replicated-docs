
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Helm global.replicated Values Schema

This document describes the global.replicated values schema injected by the Replicated registry when using the Helm CLI installation method. It includes information on the structure and purpose of fields to help developers integrate seamlessly with the Replicated SDK.

## Overview

The `global.replicated` values schema is a set of values that are injected by the Replicated registry when using the Helm CLI installation method. These values are used by the Replicated SDK to provide information about the replicated application and the environment in which it is running. These values are critical for licensing, release management, and enabling key features of the Replicated Vendor Portal.

For additional information about the Replicated SDK, see [Replicated SDK Overview](/vendor/replicated-sdk-overview).

## Values Schema Structure

The `global.replicated` values schema is a set of values that are injected by the Replicated registry when using the Helm CLI installation method. The schema is a JSON object that contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `imagePullSecrets` | Array | An array of Kubernetes image pull secrets that are used to pull images from private registries. |
| `appName` | String | The name of the application, as specified in the Replicated Vendor Portal. |
| `channelID` | String | The unique ID of the release channel. |
