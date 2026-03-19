# Home Is a Right

A data-driven campaign for housing as a human right in Australia, built by a 13-year-old in Adelaide.

**Live at:** [righttohousing.com.au](https://righttohousing.com.au)

## Deployment

The site is hosted on **GitHub Pages** from the `docs/` directory on the `main` branch.

### DNS (Cloudflare → GitHub Pages)

DNS is managed through Cloudflare. To set up or update:

1. Create a Cloudflare API token with **Edit zone DNS** permissions
2. Run:
   ```bash
   CLOUDFLARE_API_TOKEN=your_token ./infrastructure/cloudflare-dns.sh
   ```

This configures:
- 4 A records pointing `righttohousing.com.au` to GitHub Pages IPs
- CNAME `www` → `edgardomunoznajar.github.io`
- All records set to DNS-only (grey cloud) so GitHub can issue SSL

### After DNS setup

1. Wait a few minutes for propagation
2. GitHub repo → Settings → Pages → Enable **Enforce HTTPS**
3. Verify: `dig righttohousing.com.au +short`

### Domain files

| File | Purpose |
|------|---------|
| `docs/CNAME` | Tells GitHub Pages which domain to serve |
| `docs/sitemap.xml` | SEO sitemap |
| `docs/robots.txt` | Crawler directives + sitemap reference |
| `docs/index.html` | Canonical URL and OG meta tags |

All reference `righttohousing.com.au`. The `.au` domain will redirect here once GoDaddy is configured.
