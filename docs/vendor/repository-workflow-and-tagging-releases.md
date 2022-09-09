# Repository Workflow and Tagging Releases

We recommend using a git-based workflow, as presented in the [app manager starter repo](https://github.com/replicatedhq/replicated-starter-kots).
This will allow teams to map git branches to channels in the [vendor portal](https://vendor.replicated.com), and allow multiple team members to seamlessly collaborate across features and releases.

## Tagging Releases for Production

In addition to the starter GitHub actions workflow included in the [`replicated-starter-kots` repo](https://github.com/replicatedhq/replicated-starter-kots), Replicated provides a [tag-based workflow
](https://github.com/replicatedhq/replicated-starter-kots/tree/main/.github/workflows/main.yml).
It adds logic for making production releases using git tags.

The recommended workflow is:

* On pushes to the `main` branch, create a release on unstable with the name `Unstable-${SHA}`
* On pushing a git tag, create a release on the beta branch, using the name `Beta-${TAG}` for the release version.
* Our recommendation is that these tags be tested, and then the release be manually promoted to the `Stable` channel using the  [vendor portal](https://vendor.replicated.com). Using manual promotion allows you to restrict which team members can publish new versions to go out to users via RBAC roles in the vendor portal.

## Related Topic

[Tutorial: Integrating with an Existing CI/CD Platform](tutorial-ci-cd-integration)
