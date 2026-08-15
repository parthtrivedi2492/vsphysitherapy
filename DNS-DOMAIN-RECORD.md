# DNS & Domain Migration Record — vsphysio.ca

**Date of change:** 15 August 2026
**Change made by:** Bluehost DNS zone editor (manual)
**Reason:** Point `vsphysio.ca` at the Vercel-hosted site while keeping Titan email on Bluehost.

---

## 1. Summary of what changed

Exactly **two** records were modified. Everything else in the zone was left untouched.

| Type  | Host   | BEFORE (Bluehost)  | AFTER (Vercel)          |
| ----- | ------ | ------------------ | ----------------------- |
| A     | `@`    | `66.235.200.145`   | `76.76.21.21`           |
| CNAME | `www`  | `vsphysio.ca`      | `cname.vercel-dns.com`  |

Nameservers were **NOT** changed. They remain at Bluehost:

```
ns1.bluehost.com
ns2.bluehost.com
```

> Do not switch nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.
> Doing so drops the whole zone, including all email records below.

---

## 2. How to roll back

To restore the site to Bluehost hosting, reverse the two rows above:

1. `A` record, host `@` → set **Point To** back to `66.235.200.145`
2. `CNAME` record, host `www` → set **Point To** back to `vsphysio.ca`

Allow 15–60 minutes for propagation. No other record needs to be touched to roll back.

Optionally also remove the domain from Vercel:

```powershell
vercel domains rm vsphysio.ca
vercel domains rm www.vsphysio.ca
```

---

## 3. Records that must NEVER be altered (live Titan email)

The clinic's email runs through Titan. Changing, deleting or reordering any of the
following will cause mail to stop being delivered.

| Type | Host                  | Value                                                    |
| ---- | --------------------- | -------------------------------------------------------- |
| MX   | `@`                   | `mx1.titan.email`                                         |
| MX   | `@`                   | `mx2.titan.email`                                         |
| CNAME| `mail`                | `hostgator.titan.email`                                   |
| TXT  | `@`                   | `v=spf1 include:spf.titan.email ~all`                     |
| TXT  | `@`                   | `v=DMARC1;p=none;sp=none;adkim=r;aspf=r;pct=100`          |
| TXT  | `_dmarc`              | `v=DMARC1; p=none`                                        |
| TXT  | `default._domainkey`  | `v=DKIM1;...` (full key in section 5 below)              |
| TXT  | `titan1._domainkey`   | `v=DKIM1;...` (full key in section 5 below)              |
| SRV  | `_autodiscover._tcp`  | `cpanelemaildiscovery.cpanel.net`                         |

Both MX records have **preference 0**.

---

## 4. Other pre-existing records (unchanged, safe to ignore)

Bluehost service records — harmless leftovers, not used by the Vercel site:

| Type | Host                                                            | Value            |
| ---- | --------------------------------------------------------------- | ---------------- |
| A    | `autoconfig`, `autodiscover`, `cpanel`, `ftp`, `ssh`, `webdisk`, `webmail`, `whm` | `50.6.245.114` |
| A    | `localhost`                                                     | `127.0.0.1`      |
| TXT  | `_acme-challenge`                                               | `lsUEv4oj8NQd0Bx44SmXUSsF-1Ma0JbSJU7asuJxgA0` (Bluehost SSL validation) |

---

## 5. Full zone snapshot — verified 15 August 2026, after the migration

This is the complete, verbatim record set. Use it to restore any record exactly.

| Type  | Host                        | Value                          | TTL     |
| ----- | --------------------------- | ------------------------------ | ------- |
| A     | `@`                         | `76.76.21.21`                  | 15 min  |
| A     | `autoconfig`                | `50.6.245.114`                 | 1 hr    |
| A     | `autodiscover`              | `50.6.245.114`                 | 1 hr    |
| A     | `cpanel`                    | `50.6.245.114`                 | 4 hr    |
| A     | `ftp`                       | `50.6.245.114`                 | 4 hr    |
| A     | `localhost`                 | `127.0.0.1`                    | 1 hr    |
| A     | `ssh`                       | `50.6.245.114`                 | 2 hr    |
| A     | `webdisk`                   | `50.6.245.114`                 | 1 hr    |
| A     | `webmail`                   | `50.6.245.114`                 | 4 hr    |
| A     | `whm`                       | `50.6.245.114`                 | 1 hr    |
| CNAME | `www`                       | `cname.vercel-dns.com`         | 15 min  |
| CNAME | `mail`                      | `hostgator.titan.email`        | 2 hr    |
| MX    | `@` (pref 0)                | `mx1.titan.email`              | 2 hr    |
| MX    | `@` (pref 0)                | `mx2.titan.email`              | 2 hr    |
| TXT   | `@`                         | `v=spf1 include:spf.titan.email ~all` | 2 hr |
| TXT   | `@`                         | `v=DMARC1;p=none;sp=none;adkim=r;aspf=r;pct=100` | 2 hr |
| TXT   | `_dmarc`                    | `v=DMARC1; p=none`             | 1 hr    |
| TXT   | `_acme-challenge`           | `lsUEv4oj8NQd0Bx44SmXUSsF-1Ma0JbSJU7asuJxgA0` | 1 hr |
| SRV   | `_autodiscover._tcp.vsphysio.ca.` | `cpanelemaildiscovery.cpanel.net` | 1 hr |

### DKIM keys (restore verbatim — do not reformat or line-wrap)

`TXT` → `default._domainkey` (TTL 1 hr):

```
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtVGoNRE/CKr9MEdnydiE7RcMjo2JXTwqIJ662xGCYHHysGlWNIVCv4RKQSutqF9iukovmHEemGc8jnfm/oLXNvNQy1wHfe+QhRNp0D/mOCpOXTBzZglubKJqPWLWzQFhqW12CR4RFjBXlPFD0SNPBKKO3equ5QGtXcT1JFv8nznfhFRYaVAca6l5/mw1UnH0oSU54CB5mEN2cmsk7DHQRSXv+laF8kWTZrG389z33TEYepth+mi+SBHtoADPNbGHdFFbsBSc6dDsH86X7+fr9eOU1V6jtI4e86Sppb/g8z/Qg10xaC9hEqKJqFzN9O9+LZWrOmw0oUKbUwehl0teXQIDAQAB;
```

`TXT` → `titan1._domainkey` (TTL 2 hr):

```
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiD50fN7x9WuD6fvIDORc0VGZaMzFeXj5DeSNFkJNdypBa5dv1cMHrYB6HJGkRYJ6YLsGz5Obd/XLc1nNKUFL0loqAJKORzY56+f/n6XSDxjKnU3ru8XF7hfEEXS3noLlYalbIK9Sj5ydD3beqKYfu3ifTQgoMLguTnQxseYDXmQIDAQAB
```

---

## 6. Vercel-side configuration

- **Project:** `vsphysitherapy`
- **Org / scope:** `parths-projects-7919933e`
- **Fallback URL (always works):** https://vsphysitherapy.vercel.app
- **Domains attached:** `vsphysio.ca`, `www.vsphysio.ca`
- **SSL:** issued automatically by Vercel once the A record resolves to `76.76.21.21`

Useful commands:

```powershell
vercel domains ls
vercel domains inspect vsphysio.ca
vercel --prod --yes
```

Verify propagation:

```powershell
Resolve-DnsName vsphysio.ca -Type A -Server 8.8.8.8
Resolve-DnsName www.vsphysio.ca -Server 8.8.8.8
Resolve-DnsName vsphysio.ca -Type MX -Server 8.8.8.8   # must still show titan.email
```

---

## 7. Code changes that accompanied the migration

Commit `7ddc136` — "Point site metadata at vsphysio.ca and add crawler files":

- `index.html` — `og:image` changed from a relative path to an absolute
  `https://vsphysio.ca/...` URL (relative values break Facebook/LinkedIn/WhatsApp previews).
  Added `og:url`, `og:site_name`, `og:image:alt` and Twitter Card tags.
  Added `logo` and `image` to the `MedicalClinic` JSON-LD.
- `services.html`, `about.html`, `contact.html` — added `canonical`, Open Graph
  and Twitter Card metadata (previously had none).
- `robots.txt` — added, referencing the sitemap.
- `sitemap.xml` — added, listing all four pages on the production domain.

If the site is ever moved off `vsphysio.ca`, these absolute URLs must be updated.
They appear in every `.html` file plus `robots.txt` and `sitemap.xml`.
