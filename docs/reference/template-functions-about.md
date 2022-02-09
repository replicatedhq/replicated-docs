# About template function contexts

Template functions are grouped into different contexts, depending on the phase of the application lifecycle when the function is available and the context data that is provided.
Static, Config, and License contexts are available everywhere, while kURL context functions are not available on the config page.

For more information about using template functions, see [Template functions](../vendor/packaging-template-functions).

## Static context
Template functions in the static context can be used in any YAML, at any time.
The static context also includes the Masterminds Sprig function library. For more information, see [Sprig Function Documentation](http://masterminds.github.io/sprig/) on the sprig website.

For a list of all Replicated functions available in the static context, see [Static context](template-functions-static-context).

## Config context
Template functions in the config context are available when rendering an application that has a config screen.
At execution time, template functions in this context also can use the static context functions.

For a list of all Replicated functions available in the config context, click see [Config context](template-functions-config-context).

## License context
Template functions in the license context have access to license and version data.

For a list of all Replicated functions available in the license context, see [License context](template-functions-license-context).

## kURL context
Template functions in the kURL context have access to information about applications installed on a cluster created by the Replicated Kubernetes installer.

For a list of all Replicated functions available in the kURL context, see [kURL context](template-functions-kurl-context).

## Identity context
Template functions in the Identity context have access to Replicated identity service information.

For a list of all Replicated functions available in the identity context, see [Identity context](template-functions-identity-context).
