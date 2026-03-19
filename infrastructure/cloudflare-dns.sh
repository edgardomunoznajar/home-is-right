#!/usr/bin/env bash
# Configure Cloudflare DNS for righttohousing.com.au → GitHub Pages
# Usage: CLOUDFLARE_API_TOKEN=xxx ./cloudflare-dns.sh
#
# Requires: "Edit zone DNS" API token from Cloudflare

set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN}"

API="https://api.cloudflare.com/client/v4"
AUTH="Authorization: Bearer $CLOUDFLARE_API_TOKEN"
DOMAIN="righttohousing.com.au"
GITHUB_USER="edgardomunoznajar"

# GitHub Pages IPs
GITHUB_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")

# Get zone ID
echo "Looking up zone ID for $DOMAIN..."
ZONE_ID=$(curl -s -H "$AUTH" "$API/zones?name=$DOMAIN" | python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])")
echo "Zone ID: $ZONE_ID"

# Helper: delete existing records of a type/name
delete_records() {
  local type=$1 name=$2
  local ids=$(curl -s -H "$AUTH" "$API/zones/$ZONE_ID/dns_records?type=$type&name=$name" \
    | python3 -c "import sys,json; [print(r['id']) for r in json.load(sys.stdin)['result']]" 2>/dev/null)
  for id in $ids; do
    echo "  Deleting old $type record $id"
    curl -s -X DELETE -H "$AUTH" "$API/zones/$ZONE_ID/dns_records/$id" > /dev/null
  done
}

# Clear existing A records for root
echo "Cleaning up old A records for $DOMAIN..."
delete_records "A" "$DOMAIN"

# Create A records (DNS only / not proxied, so GitHub can issue SSL)
echo "Creating A records for $DOMAIN..."
for ip in "${GITHUB_IPS[@]}"; do
  echo "  A $DOMAIN → $ip"
  curl -s -X POST -H "$AUTH" -H "Content-Type: application/json" \
    "$API/zones/$ZONE_ID/dns_records" \
    -d "{\"type\":\"A\",\"name\":\"$DOMAIN\",\"content\":\"$ip\",\"ttl\":1,\"proxied\":false}" > /dev/null
done

# Clear and create CNAME for www
echo "Setting up www CNAME..."
delete_records "CNAME" "www.$DOMAIN"
curl -s -X POST -H "$AUTH" -H "Content-Type: application/json" \
  "$API/zones/$ZONE_ID/dns_records" \
  -d "{\"type\":\"CNAME\",\"name\":\"www\",\"content\":\"$GITHUB_USER.github.io\",\"ttl\":1,\"proxied\":false}" > /dev/null
echo "  CNAME www.$DOMAIN → $GITHUB_USER.github.io"

# Remove any page rules redirecting .com.au → .au
echo ""
echo "Checking for redirect rules to remove..."
RULES=$(curl -s -H "$AUTH" "$API/zones/$ZONE_ID/pagerules" \
  | python3 -c "
import sys, json
rules = json.load(sys.stdin)['result']
for r in rules:
  for a in r.get('actions', []):
    if a.get('id') == 'forwarding_url' and 'righttohousing.au' in a.get('value',{}).get('url',''):
      print(r['id'])
" 2>/dev/null)

if [ -n "$RULES" ]; then
  for rule_id in $RULES; do
    echo "  Deleting redirect page rule $rule_id"
    curl -s -X DELETE -H "$AUTH" "$API/zones/$ZONE_ID/pagerules/$rule_id" > /dev/null
  done
else
  echo "  No redirect page rules found (may be a bulk redirect — check dashboard if site still redirects)"
fi

echo ""
echo "Done! DNS records set. Next steps:"
echo "  1. Wait a few minutes for propagation"
echo "  2. Go to GitHub repo Settings → Pages → Enforce HTTPS"
echo "  3. Verify: dig $DOMAIN +short"
