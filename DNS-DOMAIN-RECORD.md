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
| TXT  | `default._domainkey`  | `v=DKIM1;...` (long RSA public key — see zone backup)     |
| TXT  | `titan1._domainkey`   | `v=DKIM1;...` (long RSA public key — see zone backup)     |
| SRV  | `_autodiscover._tcp`  | `cpanelemaildiscovery.cpanel.net`                         |

> The two DKIM values are long RSA keys that are not reproduced in full here.
> Keep an exported copy of the full zone file (see section 5) so they can be
> restored verbatim if ever lost.

---

## 4. Other pre-existing records (unchanged, safe to ignore)

Bluehost service records — harmless leftovers, not used by the Vercel site:

| Type | Host                                                            | Value            |
| ---- | --------------------------------------------------------------- | ---------------- |
| A    | `autoconfig`, `autodiscover`, `cpanel`, `ftp`, `ssh`, `webdisk`, `webmail`, `whm` | `50.6.245.114` |
| A    | `localhost`                                                     | `127.0.0.1`      |
| TXT  | `_acme-challenge`                                               | `lsUEv4oj8NQd0Bx44SmXUSsF-1Ma0JbSJU7asuJxgA0` (Bluehost SSL validation) |

---

## 5. Recommended: keep a full zone backup

Before any future DNS work, export the complete zone from Bluehost
(Domains → DNS → Zone Editor → export / or copy the full record table)
and store it alongside this file. That guarantees the DKIM keys and any
records not captured here can be restored exactly.

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
