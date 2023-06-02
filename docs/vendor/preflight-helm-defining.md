# Define Preflight Checks for Helm
import PreflightsAddCollectors from "../partials/preflights/_preflights-add-collectors.mdx"
import PreflightsAddAnalyzers from "../partials/preflights/_preflights-add-analyzers.mdx"
import PreflightsAddStrict from "../partials/preflights/_preflights-add-strict.mdx"

## About Helm Preflight Checks

You define preflight checks based on your application needs. Preflight checks are not included by default. This procedure provides a basic understanding and some key considerations to help guide you.

For Helm, preflight checks can be run in two different ways, at different times:

- Before the installation, to confirm the target cluster has the resources required for a successful install.
- During the installation, as a pre-install or pre-upgrade hook. The hook runs a Pod from the preflight image and supplies the specification to that as a Secret. The hook runs automatically immediately prior to installation.

When you supply the output of `helm template` to the preflight command as stdin, the command filters the stream and searches for:

-  Secrets containing preflight specifications
-  CRDs of `kind: preflight` and runs those

If you do not require the pre-install or pre-upgrade hook to run during the Helm installation, you can just specify the preflight specification as a Secret in your Helm templates to make the specification readable by the preflight binary.

## Define a Preflight Specification

To define preflight checks:

1. Create a specification...

1. <PreflightsAddCollectors/>

1. <PreflightsAddAnalyzers/>

1. <PreflightsAddStrict/>


For more information about defining preflight checks, see [Collecting Data](https://troubleshoot.sh/docs/collect/) and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation. 

For basic examples of checking CPU, memory, and disk capacity, see [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/) in the Troubleshoot documentation.