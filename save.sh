#!/usr/bin/env bash
# ─── Auto-save: commit and push all changes to GitHub ─────────────────────────
# Usage: bash save.sh [optional description]
# Example: bash save.sh "Add Procore import feature"
# Run with no arguments for a plain timestamp commit.

set -e

DESCRIPTION="${1:-}"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")

if [ -n "$DESCRIPTION" ]; then
  MESSAGE="${DESCRIPTION} [${TIMESTAMP}]"
else
  MESSAGE="Auto-save: ${TIMESTAMP}"
fi

echo "[save] Staging all changes..."
git add -A

# Safety check: abort if staging secrets or sensitive files
SENSITIVE=$(git diff --cached --name-only | grep -iE '\.env|secret|credential|\.pem|\.key$' || true)
if [ -n "$SENSITIVE" ]; then
  echo "[save] ERROR: Refusing to commit potentially sensitive files:"
  echo "$SENSITIVE"
  echo "[save] Unstaging those files. Add them explicitly if intentional."
  echo "$SENSITIVE" | xargs git reset HEAD --
  # Re-check if anything remains staged
  if git diff --cached --quiet; then
    echo "[save] Nothing left to commit after removing sensitive files."
    exit 1
  fi
fi

echo "[save] Committing: \"${MESSAGE}\""
git commit -m "${MESSAGE}"

echo "[save] Pushing to origin/main..."
git push origin main

echo "[save] Done. All changes saved to GitHub."
