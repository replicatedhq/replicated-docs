# Step 4: Create a Release

Now that you have the manifest files for the sample Kubernetes application, you can create a release for the `cli-tutorial` application and promote the release to the Unstable channel.

By default, the Vendor Portal includes Unstable, Beta, and Stable release channels. The Unstable channel is intended for software vendors to use for internal testing, before promoting a release to the Beta or Stable channels for distribution to customers. For more information about channels, see [About Channels and Releases](releases-about).

To create and promote a release to the Unstable channel:

1. From the `replicated-cli-tutorial` directory, lint the application manifest files and ensure that there are no errors in the YAML:

    ```
    replicated release lint --yaml-dir=manifests
    ```

    If there are no errors, an empty list is displayed with a zero exit code:

    ```text
    RULE    TYPE    FILENAME    LINE    MESSAGE
    ```

    For a complete list of the possible error, warning, and informational messages that can appear in the output of the `release lint` command, see [Linter Rules](/reference/linter).

1. Initialize the project as a Git repository:

    ```
    git init
    git add .
    git commit -m "Initial Commit: CLI Tutorial"
    ```

    Initializing the project as a Git repository allows you to track your history. The Replicated CLI also reads Git metadata to help with the generation of release metadata, such as version labels.

1. From the `replicated-cli-tutorial` directory, create a release with the default settings:

    ```
    replicated release create --auto
    ```

    The `--auto` flag generates release notes and metadata based on the Git status.

    **Example output:**

    ```
        • Reading Environment ✓

      Prepared to create release with defaults:

          yaml-dir        "./manifests"
          promote         "Unstable"
          version         "Unstable-ba710e5"
          release-notes   "CLI release of master triggered by exampleusername [SHA: d4173a4] [31 Oct 22 08:51 MDT]"
          ensure-channel  true
          lint-release    true

      Create with these properties? [Y/n]
    ```

1. Type `y` and press **Enter** to confirm the prompt.

    **Example output:**

    ```text
      • Reading manifests from ./manifests ✓
      • Creating Release ✓
        • SEQUENCE: 1
      • Promoting ✓
        • Channel VEr0nhJBBUdaWpPvOIK-SOryKZEwa3Mg successfully set to release 1
    ```
    The release is created and promoted to the Unstable channel.

1. Verify that the release was promoted to the Unstable channel:

    ```
    replicated release ls
    ```
    **Example output:**

    ```text
    SEQUENCE    CREATED                 EDITED                  ACTIVE_CHANNELS
    1           2022-10-31T14:55:35Z    0001-01-01T00:00:00Z    Unstable
    ```

## Next Step

Continue to [Step 5: Create a Customer](tutorial-cli-create-customer) to create a customer license file that you will upload when installing the application.