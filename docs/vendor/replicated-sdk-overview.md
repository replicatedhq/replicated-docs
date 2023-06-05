# About the Replicated SDK

This topic provides an introduction to using the Replicated SDK Helm chart to use Replicated functionality with your application Helm chart.

## Overview

Vendors who install their application with Helm can use the Replicated SDK to integrate their application with core Replicated functionality while continuing to use their own installation process. The SDK is simply installed by Helm alongside the application, providing vendors access to telemetry, licensing, entitlements, update checks, and more, with little to no configuration needed.

![diagram of the replicated sdk in a custom environment](/images/sdk-overview-diagram.png)

## About Using Replicated Features with the SDK 

The SDK provides a number of APIs (reference) that can be used to embed Replicated functionality and application information into your application.

For example, if your application includes an admin console, the SDK APIs can be used to extend that admin console to include messages when new updates are available, license and entitlement information
