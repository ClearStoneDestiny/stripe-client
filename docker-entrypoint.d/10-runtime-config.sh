#!/bin/sh
set -eu

BACKEND_DOMAIN="${BACKEND_DOMAIN:-${VITE_BACKEND_DOMAIN:-}}"
CONFIG_FILE="/usr/share/nginx/html/runtime-config.js"

if [ -z "$BACKEND_DOMAIN" ]; then
  cat > "$CONFIG_FILE" <<'EOF'
window.__APP_CONFIG__ = {};
EOF
  exit 0
fi

ESCAPED_BACKEND_DOMAIN=$(printf '%s' "$BACKEND_DOMAIN" | sed 's/\\/\\\\/g; s/"/\\"/g')

cat > "$CONFIG_FILE" <<EOF
window.__APP_CONFIG__ = {
  backendDomain: "$ESCAPED_BACKEND_DOMAIN"
};
EOF
