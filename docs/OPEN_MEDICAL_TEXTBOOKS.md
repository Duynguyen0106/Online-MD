# Open / free medical textbooks for Online MD

**Date:** 2026-10-28 (Europe/London)  
**Purpose:** Vetted sources that can legally support curriculum enrichment.  
**Status:** Catalog + linking policy. Not medical approval.

---

## Policy (short)

| Allowed | Not allowed |
| --- | --- |
| Creative Commons / clearly open OERs with documented terms | Harsh Mohan, Robbins, Pathoma, Harrison’s, First Aid, Katzung, etc. |
| Student **links** to free-to-read OpenStax / Pathologia / BCIT | Downloading pirated WordPress/HF “textbook corpora” |
| **Adapt** CC BY (and SA with ShareAlike) with attribution | Pasting OpenStax into LLM-generated lesson banks (OpenStax forbids LLM ingestion without permission) |
| Original Online MD teaching prose + OER further-reading footers | Treating NCBI Bookshelf “free to read” as remixable by default |

Machine-readable list: `lib/curriculum/open-textbooks.ts`.  
Reproduce enrichments: lessons in `lib/curriculum/expansions-open-oer.ts`.

---

## Recommended sources

### Anatomy & physiology

| Resource | License | Remix into app? | URL |
| --- | --- | --- | --- |
| OpenStax *Anatomy and Physiology 2e* | CC BY-NC-SA 4.0 | **No** (NC-SA + no LLM ingest) — **link only** | https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction |
| Wikibooks *Human Physiology* | CC BY-SA | Yes, with ShareAlike attribution | https://en.wikibooks.org/wiki/Human_Physiology |

### Pathology

| Resource | License | Remix into app? | URL |
| --- | --- | --- | --- |
| BCIT *Pathology* (Kong / Dyck / Soon) | CC BY-NC 4.0 | **Link only** unless product is noncommercial | https://pressbooks.bccampus.ca/dcbiol2200/ |
| Edinburgh *Pathologia* | Free to read | **Link only** (not a blanket remix license) | https://pathologia.ed.ac.uk/ |
| *Patholines* Starting Pathology | CC BY 4.0 | **Yes**, with attribution | https://patholines.org/Starting_pathology |
| Wikibooks *Pathology* | CC BY-SA | Yes, with ShareAlike | https://en.wikibooks.org/wiki/Pathology |

### Pharmacology

| Resource | License | Remix into app? | URL |
| --- | --- | --- | --- |
| OpenStax *Pharmacology for Nurses* | Check current page (often CC BY family) | Prefer **link**; nursing intro ≠ MD clinical pharm depth | https://openstax.org/details/books/pharmacology-nurses |

### Microbiology / infectious mechanisms

| Resource | License | Remix into app? | URL |
| --- | --- | --- | --- |
| OpenStax *Microbiology* | CC BY-NC-SA 4.0 | **Link only** | https://openstax.org/books/microbiology/pages/1-introduction |

### Reference portals

| Resource | Notes |
| --- | --- |
| [NCBI Bookshelf](https://www.ncbi.nlm.nih.gov/books/) | Free to read; **per-title** copyright — do not bulk-scrape |

---

## Explicitly rejected as enrichment corpora

- WordPress / torrent PDFs of commercial pathology texts (e.g. Harsh Mohan 6th ed.)
- Hugging Face `MedRAG/textbooks` chunks of Robbins, Pathoma, First Aid, Harrison’s, Gray’s, etc. (research mirror ≠ publisher license)

---

## What Online MD did with this catalog

1. Student **Open textbooks** page at `/library` listing the vetted sources by subject.  
2. Pathology deepen lessons (original prose) for audit thin/embedded topics, each ending with OER further-reading links — see `expansions-open-oer.ts`:
   - MI morphologic timeline  
   - Amyloidosis  
   - Chemical / radiation / microbial carcinogenesis  
   - Paraneoplastic syndromes  
   - Skin tumors (BCC / SCC / melanoma)  
3. No substantial OpenStax or commercial textbook text was pasted into the curriculum graph.
