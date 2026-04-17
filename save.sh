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

# Check if there is anything to commit
if git diff --cached --quiet; then
  echo "[save] Nothing to commit — working tree is clean."
  exit 0
fi

echo "[save] Committing: \"${MESSAGE}\""
git commit -m "${MESSAGE}"

echo "[save] Pushing to origin/main..."
git push origin main

echo "[save] Done. All changes saved to GitHub."
