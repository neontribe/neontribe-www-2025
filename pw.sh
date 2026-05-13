#!/usr/bin/env bash
# pw.sh — run Playwright tests inside Docker from any Astro project root
# Usage:
#   ./pw.sh                        # run all tests
#   ./pw.sh tests/home.spec.ts     # run a specific file
#   ./pw.sh --ui                   # Playwright UI mode (needs DISPLAY or VNC)
#   ./pw.sh --headed               # headed mode (needs DISPLAY set)
#   ./pw.sh --debug                # Playwright Inspector
#   ./pw.sh --clean                # stop containers, remove volumes & image
#   BASE_URL=http://staging.example.com ./pw.sh   # point at a remote server

set -euo pipefail

COMPOSE_FILE="docker-compose.playwright.yml"

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "ERROR: $COMPOSE_FILE not found. Place it in the project root." >&2
  exit 1
fi

# ── Clean-up function ────────────────────────────────────────────────────────
clean() {
  echo "→ Stopping and removing containers..."
  docker compose -f "$COMPOSE_FILE" down --remove-orphans

  echo "→ Removing named volumes (node_modules cache)..."
  docker compose -f "$COMPOSE_FILE" down --volumes

  PW_VERSION=$(node -e "require('./node_modules/playwright/package.json').version" 2>/dev/null || echo "1.60.0")
  PW_IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-noble"
  echo "→ Removing image $PW_IMAGE ..."
  if docker image inspect "$PW_IMAGE" &>/dev/null; then
    docker rmi "$PW_IMAGE"
    echo "   Done."
  else
    echo "   Image not found locally, skipping."
  fi
}

# ── Flag handling ────────────────────────────────────────────────────────────
if [[ "${1:-}" == "--clean" ]]; then
  clean
  exit 0
fi

# Pass any remaining CLI args straight through to `npx playwright test`
EXTRA_ARGS="${*}"

PW_VERSION=$(node -e "require('./node_modules/playwright/package.json').version" 2>/dev/null || echo "1.60.0")

docker compose -f "$COMPOSE_FILE" run --rm \
  -e BASE_URL="${BASE_URL:-http://localhost:4321}" \
  -e PLAYWRIGHT_IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-noble" \
  playwright \
  sh -c "npm install --prefer-offline && npx playwright test $EXTRA_ARGS"