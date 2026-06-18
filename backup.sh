#!/bin/bash
# ===================================================
# AIToolReview - GitHub Backup Script
# Usage: bash backup.sh "v1.1 - added new articles"
# ===================================================
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

MESSAGE="${1:-backup: auto-save}"

echo "📦 Backing up AIToolReview..."
git add -A
git commit -m "$MESSAGE" || echo "  (nothing to commit)"

# Push to GitHub (only if remote is configured)
if git remote get-url origin &>/dev/null; then
  echo "🚀 Pushing to GitHub..."
  git push origin main
  echo "✅ Backup complete — pushed to GitHub"
else
  echo "⚠️  No GitHub remote configured."
  echo "   Run this once to set it up:"
  echo "   git remote add origin https://github.com/YOUR_USERNAME/aitoolreview.git"
  echo "   git push -u origin main"
  echo ""
  echo "✅ Local commit saved. Remote push skipped."
fi
