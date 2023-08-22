# Using Tags for Production Releases

Replicated recommends using a Git-based workflow. Using a Git-based workflow allows teams to map Git branches to channels in the Replicated vendor portal, and allows multiple team members to seamlessly collaborate across features and releases.

If you support Replicated KOTS installation, for an example tag-based workflow that adds logic for making production releases using Git tags, see [main.yml
](https://github.com/replicatedhq/replicated-starter-kots/tree/main/.github/workflows/main.yml) in the replicated-starter-kots repository in GitHub.

Replicated recommends:
* On pushes to the `main` branch, create a release on unstable with the name `Unstable-${SHA}`
* On pushing a Git tag, create a release on the beta branch, using the name `Beta-${TAG}` for the release version.

Replicated recommends that these tags be tested, and then the release be manually promoted to the `Stable` channel using the vendor portal. Using manual promotion with the vendor portal rather than automated promotion with the replicated CLI allows you to restrict which team members can publish new versions using RBAC roles in the vendor portal.