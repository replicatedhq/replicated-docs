#!/usr/bin/env bash

set -euo pipefail

: "${EVENT_TYPE:?EVENT_TYPE is required}"
: "${VERSION:?VERSION is required}"

generator_ref="942ca6279047ce728af73d2c30bc73c946a48476"
base_version=""
description=""
feature_labels="type::feature"
manual_table="none"
clean_version="${VERSION#v}"

case "$EVENT_TYPE" in
  app-manager-release-notes)
    source_repo="replicatedhq/kots"
    target_file="docs/release-notes/rn-app-manager.md"
    title="$clean_version"
    product_name="App Manager"
    description="Support for Kubernetes: 1.31, 1.32, 1.33, and 1.34"
    source_token="${PUBLIC_REPO_TOKEN:-}"
    slack_webhook="${KOTS_RELEASE_NOTES_SLACK_WEBHOOK:-}"
    ;;
  embedded-cluster-release-notes)
    source_repo="replicatedhq/embedded-cluster"
    target_file="docs/release-notes/rn-embedded-cluster.md"
    title="$clean_version"
    product_name="Embedded Cluster"
    manual_table="embedded-cluster-v2"
    source_token="${PUBLIC_REPO_TOKEN:-}"
    slack_webhook="${EMBEDDED_CLUSTER_RELEASE_NOTES_SLACK_WEBHOOK:-}"
    ;;
  embedded-cluster-release-notes-v3)
    source_repo="replicatedhq/ec"
    target_file="docs/release-notes/rn-embedded-cluster-v3.md"
    title="$clean_version"
    product_name="Embedded Cluster"
    manual_table="embedded-cluster-v3"
    source_token="${EC_READ_PAT:-}"
    slack_webhook="${EMBEDDED_CLUSTER_RELEASE_NOTES_SLACK_WEBHOOK:-}"
    ;;
  kubernetes-installer-release-notes)
    source_repo="replicatedhq/kurl"
    target_file="docs/release-notes/rn-kubernetes-installer.md"
    title="$VERSION"
    product_name="Kubernetes Installer"
    feature_labels="type::feature,kurl::type::feature"
    source_token="${PUBLIC_REPO_TOKEN:-}"
    slack_webhook="${KURL_RELEASE_NOTES_SLACK_WEBHOOK:-}"
    ;;
  replicated-sdk-release-notes)
    : "${PREV_VERSION:?PREV_VERSION is required for Replicated SDK release notes}"
    source_repo="replicatedhq/replicated-sdk"
    target_file="docs/release-notes/rn-replicated-sdk.md"
    title="$VERSION"
    product_name="Replicated SDK"
    base_version="$PREV_VERSION"
    source_token="${PUBLIC_REPO_TOKEN:-}"
    slack_webhook="${REPLICATED_SDK_RELEASE_NOTES_SLACK_WEBHOOK:-}"
    ;;
  vendor-portal-release-notes)
    source_repo="replicatedhq/vandoor"
    target_file="docs/release-notes/rn-vendor-platform.md"
    title="$VERSION"
    product_name="Vendor Portal"
    source_token="${VENDOR_PORTAL_PAT:-}"
    slack_webhook="${VENDOR_PORTAL_RELEASE_NOTES_SLACK_WEBHOOK:-}"
    ;;
  *)
    echo "Unsupported release-notes event: $EVENT_TYPE" >&2
    exit 1
    ;;
esac

if [[ -z "$source_token" ]]; then
  echo "The source repository token for $EVENT_TYPE is missing" >&2
  exit 1
fi

if [[ ! -f "$target_file" ]]; then
  echo "Target release-notes file does not exist: $target_file" >&2
  exit 1
fi

if grep -Fq "## $title" "$target_file"; then
  echo "$target_file already contains release $title; nothing to do."
  exit 0
fi

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT
generated_file="$tmp_dir/generated.md"
insert_file="$tmp_dir/insert.md"

generator_args=(
  --owner-repo "$source_repo"
  --head "$VERSION"
  --title "$title"
  --description "$description"
  --include-pr-links=false
  --feature-type-labels "$feature_labels"
)
if [[ -n "$base_version" ]]; then
  generator_args+=(--base "$base_version")
fi

if [[ -n "${RELEASE_NOTES_GENERATOR_BIN:-}" ]]; then
  GITHUB_AUTH_TOKEN="$source_token" \
    "$RELEASE_NOTES_GENERATOR_BIN" "${generator_args[@]}" > "$generated_file"
else
  if ! command -v go >/dev/null 2>&1; then
    echo "Go is required to run the pinned release-notes generator" >&2
    exit 1
  fi
  GITHUB_AUTH_TOKEN="$source_token" \
    go run "github.com/replicatedhq/release-notes-generator@${generator_ref}" \
      "${generator_args[@]}" > "$generated_file"
fi

if [[ "$manual_table" == "none" && ! -s "$generated_file" ]]; then
  echo "The release-notes generator returned no notes; no PR is needed."
  exit 0
fi

case "$manual_table" in
  none)
    cp "$generated_file" "$insert_file"
    ;;
  embedded-cluster-v2|embedded-cluster-v3)
    {
      echo
      echo "## $title"
      echo
      echo "Released on $(date +'%B %-d, %Y')"
      echo
      echo '<!-- VERSION TABLE PLACEHOLDER'
      echo 'Please manually replace this placeholder with a version table in the format:'
      echo
      echo '<table>'
      echo '  <tr>'
      echo '    <th>Version</th>'
      echo '    <td id="center">X.Y.Z+k8s-1.XX</td>'
      echo '    <td id="center">X.Y.Z+k8s-1.XX</td>'
      echo '  </tr>'
      echo '  <tr>'
      echo '    <th>Kubernetes Version</th>'
      echo '    <td id="center">1.XX.Y</td>'
      echo '    <td id="center">1.XX.Y</td>'
      echo '  </tr>'
      if [[ "$manual_table" == "embedded-cluster-v2" ]]; then
        echo '  <tr>'
        echo '    <th>KOTS Version</th>'
        echo '    <td id="center" colspan="2">1.XXX.Y</td>'
        echo '  </tr>'
      fi
      echo '</table>'
      echo '-->'
      awk '
        found { if (started || NF) { started=1; print } }
        /^Released on / { found=1 }
      ' "$generated_file"
    } > "$insert_file"
    ;;
esac

awk -v insert_file="$insert_file" '
  { print }
  !inserted && /RELEASE_NOTES_PLACEHOLDER/ {
    while ((getline line < insert_file) > 0) {
      print line
    }
    close(insert_file)
    inserted=1
  }
  END {
    if (!inserted) {
      exit 42
    }
  }
' "$target_file" > "$tmp_dir/updated.md" || {
  status=$?
  if [[ "$status" == "42" ]]; then
    echo "Release-notes placeholder not found in $target_file" >&2
  fi
  exit "$status"
}
mv "$tmp_dir/updated.md" "$target_file"

if git diff --quiet -- "$target_file"; then
  echo "Release-note generation did not change $target_file."
  exit 0
fi

if [[ "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    echo "## $product_name $VERSION release notes"
    echo
    echo "Target: \`$target_file\`"
  } >> "$GITHUB_STEP_SUMMARY"
fi

if [[ "${DRY_RUN:-false}" == "true" || "${DRY_RUN:-false}" == "1" ]]; then
  echo "Dry run: generated release-notes diff follows."
  git --no-pager diff -- "$target_file"
  exit 0
fi

: "${GH_TOKEN:?GH_TOKEN is required to push the release-notes branch}"
if [[ -z "$slack_webhook" ]]; then
  echo "The Slack webhook for $EVENT_TYPE is missing" >&2
  exit 1
fi

branch_version="$(printf '%s' "$VERSION" | tr -c 'A-Za-z0-9._+-' '-')"
branch="automation/${EVENT_TYPE}-${branch_version}"
commit_title="$product_name $VERSION release notes"
pr_body="Automated changes generated by the [Depot release-notes workflow](https://github.com/replicatedhq/replicated-docs/blob/main/.depot/workflows/release-notes.yml)."
if [[ "$manual_table" != "none" ]]; then
  pr_body="$pr_body Please manually replace the version table placeholder."
fi

git config user.name replicated-ci
git config user.email replicated-ci@users.noreply.github.com
git switch -C "$branch"
git add "$target_file"
git commit -m "$commit_title"

remote_sha="$(git ls-remote --heads origin "refs/heads/$branch" | awk '{print $1}')"
if [[ -n "$remote_sha" ]]; then
  git push \
    --force-with-lease="refs/heads/$branch:$remote_sha" \
    origin \
    "HEAD:refs/heads/$branch"
else
  git push origin "HEAD:refs/heads/$branch"
fi

pr_url="$(
  gh pr list \
    --repo "$GITHUB_REPOSITORY" \
    --head "$branch" \
    --base main \
    --state open \
    --json url \
    --jq '.[0].url // empty'
)"
if [[ -z "$pr_url" ]]; then
  pr_url="$(
    gh pr create \
      --repo "$GITHUB_REPOSITORY" \
      --base main \
      --head "$branch" \
      --title "$commit_title" \
      --body "$pr_body"
  )"
fi

jq -n \
  --arg version "$VERSION" \
  --arg pull_request_url "$pr_url" \
  '{version: $version, pull_request_url: $pull_request_url}' \
  | curl \
      --fail-with-body \
      --request POST \
      --header 'Content-Type: application/json' \
      --data-binary @- \
      "$slack_webhook"

echo "Release-notes PR: $pr_url"
