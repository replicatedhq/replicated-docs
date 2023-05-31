# Repository Workflow and Tagging Releases

Replicated recommends using a git-based workflow, as presented in the [`replicated-starter-kots`](https://github.com/replicatedhq/replicated-starter-kots) repository.
This workflow allows teams to map git branches to channels in the Replicated vendor portal, and allow multiple team members to seamlessly collaborate across features and releases.

## Tagging Releases for Production

In addition to the starter GitHub actions workflow included in the `replicated-starter-kots` repository above, Replicated provides a [tag-based workflow](https://github.com/replicatedhq/replicated-starter-kots/tree/main/.github/workflows/main.yml). It adds logic for making production releases using git tags.

The recommended workflow is:

* On pushes to the `main` branch, create a release on unstable with the name `Unstable-${SHA}`
* On pushing a git tag, create a release on the beta branch, using the name `Beta-${TAG}` for the release version.
* Our recommendation is that these tags be tested, and then the release be manually promoted to the `Stable` channel using the vendor portal. Using manual promotion allows you to restrict which team members can publish new versions to go out to users via RBAC roles in the vendor portal.

## Related Topic

[Tutorial: Integrating with an Existing CI/CD Platform](tutorial-ci-cd-integration)
