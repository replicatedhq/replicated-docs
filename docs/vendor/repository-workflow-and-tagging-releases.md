# Repository Workflow and Tagging Releases

Replicated recommend using a Git-based workflow, as presented in the [replicated-starter-kots](https://github.com/replicatedhq/replicated-starter-kots) repository in GitHub.

Using a Git-based workflow allows teams to map Git branches to channels in the Replicated vendor portal, and allows multiple team members to seamlessly collaborate across features and releases.

## Tagging Releases for Production

In addition to the starter GitHub actions workflow included in the `replicated-starter-kots` repository, Replicated also provides a [tag-based workflow
](https://github.com/replicatedhq/replicated-starter-kots/tree/main/.github/workflows/main.yml) that adds logic for making production releases using Git tags.

The recommended workflow is:

* On pushes to the `main` branch, create a release on unstable with the name `Unstable-${SHA}`
* On pushing a Git tag, create a release on the beta branch, using the name `Beta-${TAG}` for the release version.
* Replicated recommends that these tags be tested, and then the release be manually promoted to the `Stable` channel using the vendor portal. Using manual promotion with the vendor portal rather than automated promotion with the replicated CLI allows you to restrict which team members can publish new versions to go out to users via RBAC roles in the vendor portal.

## Related Topic

[Tutorial: Integrating with an Existing CI/CD Platform](tutorial-ci-cd-integration)
