#!/usr/bin/env bash

set -euo pipefail

: "${BASE_SHA:?BASE_SHA is required}"
: "${HEAD_SHA:?HEAD_SHA is required}"

vale_version="3.17.1"
vale_archive="vale_${vale_version}_Linux_64-bit.tar.gz"
vale_checksum="db947f89f2292e6a0381a61de155f6a5f5cb4cb460ca178ea412ef605559cefd"
tool_dir="${RUNNER_TEMP:-/tmp}/vale-${vale_version}"
mkdir -p "$tool_dir"

if [[ ! -x "$tool_dir/vale" ]]; then
  curl \
    --fail \
    --location \
    --silent \
    --show-error \
    --output "$tool_dir/$vale_archive" \
    "https://github.com/errata-ai/vale/releases/download/v${vale_version}/${vale_archive}"
  echo "$vale_checksum  $tool_dir/$vale_archive" | sha256sum --check
  tar -xzf "$tool_dir/$vale_archive" -C "$tool_dir" vale
fi

changed_files=()
while IFS= read -r -d '' changed_file; do
  changed_files+=("$changed_file")
done < <(
  git diff \
    --name-only \
    --diff-filter=ACMR \
    -z \
    "$BASE_SHA...$HEAD_SHA" \
    -- \
    ':(glob)docs/**/*.md' \
    ':(glob)docs/**/*.mdx'
)

if (( ${#changed_files[@]} == 0 )); then
  echo "No changed documentation files require Vale review."
  if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
    echo "## Vale" >> "$GITHUB_STEP_SUMMARY"
    echo >> "$GITHUB_STEP_SUMMARY"
    echo "No changed documentation files require Vale review." >> "$GITHUB_STEP_SUMMARY"
  fi
  exit 0
fi

"$tool_dir/vale" sync

results_file="${RUNNER_TEMP:-/tmp}/vale-results.json"
"$tool_dir/vale" \
  --no-exit \
  --output=JSON \
  "${changed_files[@]}" > "$results_file"

if ! jq -e 'type == "object"' "$results_file" >/dev/null; then
  echo "Vale returned invalid JSON output" >&2
  exit 1
fi

escape_property() {
  local value="$1"
  value="${value//'%'/'%25'}"
  value="${value//$'\r'/'%0D'}"
  value="${value//$'\n'/'%0A'}"
  value="${value//':'/'%3A'}"
  value="${value//','/'%2C'}"
  printf '%s' "$value"
}

escape_message() {
  local value="$1"
  value="${value//'%'/'%25'}"
  value="${value//$'\r'/'%0D'}"
  value="${value//$'\n'/'%0A'}"
  printf '%s' "$value"
}

while IFS= read -r encoded; do
  decoded="$(printf '%s' "$encoded" | base64 --decode)"
  file="$(jq -r '.[0]' <<< "$decoded")"
  line="$(jq -r '.[1]' <<< "$decoded")"
  column="$(jq -r '.[2]' <<< "$decoded")"
  check="$(jq -r '.[3]' <<< "$decoded")"
  message="$(jq -r '.[4]' <<< "$decoded")"
  printf '::warning file=%s,line=%s,col=%s,title=%s::%s\n' \
    "$(escape_property "$file")" \
    "$line" \
    "$column" \
    "$(escape_property "$check")" \
    "$(escape_message "$message")"
done < <(
  jq -r '
    to_entries[]
    | .key as $file
    | .value[]
    | [
        $file,
        (.Line // 1 | tostring),
        (.Span[0] // 1 | tostring),
        (.Check // "Vale"),
        (.Message // "")
      ]
    | @base64
  ' "$results_file"
)

alert_count="$(jq '[to_entries[].value[]] | length' "$results_file")"
echo "Vale reported $alert_count alert(s) across ${#changed_files[@]} changed file(s)."

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    echo "## Vale"
    echo
    echo "Reviewed ${#changed_files[@]} changed documentation file(s) and reported $alert_count alert(s)."
    if (( alert_count > 0 )); then
      echo
      echo "| Rule | Severity | Count |"
      echo "| --- | --- | ---: |"
      jq -r '
        [to_entries[].value[]]
        | group_by([.Check, .Severity])
        | .[]
        | "| \(.[0].Check) | \(.[0].Severity) | \(length) |"
      ' "$results_file"
    fi
  } >> "$GITHUB_STEP_SUMMARY"
fi
