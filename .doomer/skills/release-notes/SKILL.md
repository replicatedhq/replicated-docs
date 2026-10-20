---
name: Release notes
description: Review entries in docs/release-notes/rn-*.md against the customer-facing release notes policy covering vendor readability, internal references, and Replicated product naming. These files publish to docs.replicated.com.
---

# Release notes

Everything in `docs/release-notes/rn-*.md` publishes to the public release notes on docs.replicated.com. It is customer-facing product surface and reaches customers on merge, with no deploy and no rollback. Review it the same way you review code.

Most entries arrive through automated pull requests from the release-notes workflow, carrying text an engineer wrote in the `release-notes-features`, `release-notes-fixes` or `release-notes-improvements` block of a pull request in the producing repository. Those three blocks become the `### New features`, `### Improvements` and `### Bug fixes` sections under a version heading. Match those headings case-insensitively; the repository contains both sentence case and title case variants. The author is usually gone by this point, so a finding needs to be actionable by whoever is reading the docs pull request.

## What to flag

**Internal references.** Vendors cannot see internal tools, so none of this belongs in a published entry:

- `app.shortcut.com` or `shortcut.app` links, and `SC-12345` style story IDs
- Pull request numbers such as `#1234`, or links to internal pull requests
- Internal function, file, type or package names, for example `vendorAPI.GetLicense`, `pkg/foo.go`, `appendHelmCommandParams`, `helmCommandOptions.ts`
- Internal planning terms including slice numbers, "slice 5", "slice 5.5"
- Endpoint internals, cache keys, parameter names, or team, environment and system names a vendor would not recognize

**No vendor-facing change.** A refactor, rename, test change, CI change or internal plumbing is never a release note. The text often gives itself away by saying a shape, request URL or cache key is unchanged. These entries should not have been published at all.

**Wrong product names.** Use the published names and casing: Admin Console, Compatibility Matrix, Download Portal, Embedded Cluster, Enterprise Portal, KOTS, KOTS CLI, kURL, Kubernetes, Replicated CLI, Replicated Platform, Security Center, Vendor Portal. Some terms are deliberately lowercase: preflight checks, proxy registry, support bundles. Enterprise Portal is distinguished as Classic and New Portal when the difference matters, both capitalized. Internal shorthand such as "Enterprise Portal v2" or "EP v2" is not a product name and appears nowhere else in the docs. Apply the list above directly. For terms it does not cover, the canonical sources in this repository are `styles/config/vocabularies/ReplicatedTerms/accept.txt` and `styles/Replicated/WordSwapsCaseSensitive.yml`.

**Not written for a vendor.** Every entry must let a vendor tell whether the change affects them and what to do about it. Lead with the vendor-visible behavior, "Fixed an issue that caused...", not the implementation. Name the surface the change lands on.

**Wrong section.** A bug fix listed under New Features, or an improvement listed as a bug fix.

**Unreplaced template placeholders** left in a published file, such as a version table placeholder comment.

## Evidence standard

Review only entries added or changed by this pull request. Do not report on existing entries the change does not touch. Do not report wording preferences, sentence length, or house style beyond the product names above. One finding per entry, not one per phrase.

## Reporting

Quote the exact offending text, name the version and section it sits in, and offer the corrected sentence the reader can paste in. Where the entry should not exist at all, say so plainly rather than suggesting a rewrite.

## Examples

Acceptable:

- "Support bundle uploads on customer and instance pages now accept both .gz and .tgz files." Names the surface and what changed for the reader.
- "Added a label to the Enterprise Portal page for teams with both Classic and New Portal that shows how an app's Enterprise Portal customers are split between the two portals." Real product names, clear impact.

Not acceptable:

- "Enterprise Portal v2 Domains no longer looks ready on an app with no content repository." That product name does not exist.
- "`appendHelmChartFilterParams` is now `appendHelmCommandParams`; `helmChartFilters.ts` is now `helmCommandOptions.ts`." Internal names, and nothing changes for a vendor, so this entry should not be here.
- "The install-instructions cache key now includes the resolved `createNamespace`." Internal plumbing.
- "Rate limit unauthenticated GET /v3/metadata and GET /v3/custom-branding to slow app slug enumeration." A real change, written for an engineer rather than a vendor.
