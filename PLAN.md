# Rework the landing page into a store-focused homepage

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

## Purpose / Big Picture

This page should quickly explain Bold Love Farm & Bakery and send people to the online store. It should not ask people to join a mailing list, promise a Sunday menu email, or depend on Mailchimp for visible page behavior, because signup is handled elsewhere.

After this change, a visitor loading `index.html` should see a short introduction to the farm and bakery, understand the kind of food being sold, and have an obvious button linking to `https://grownby.com/farms/bold-love-farm-bakery/shop`.

## Progress

- [x] (2026-04-07 17:01Z) Inspected the repository and confirmed this is a very small static GitHub Pages site driven almost entirely by `index.html`.
- [x] (2026-04-07 17:01Z) Read the original landing page and confirmed it was centered around Mailchimp embed code and email capture.
- [x] (2026-04-07 17:23Z) Reworked `index.html` into a custom homepage with introductory copy and a prominent store link.
- [x] (2026-04-07 18:04Z) Removed the remaining mailing-list section, the Sunday-menu call to action, and the Mailchimp connected-site script after the user clarified that signup is handled elsewhere.
- [x] (2026-04-07 18:04Z) Tightened the copy so the page now focuses only on the intro text and the online store.
- [x] (2026-04-07 18:05Z) Verified locally that the page serves over HTTP, still contains the store call to action, and no longer contains mailing-list, Sunday-menu, or Mailchimp references.
- [x] (2026-04-07 18:05Z) Updated this ExecPlan so it matches the final, simplified scope.

## Surprises & Discoveries

- Observation: The entire user-facing site is still contained in one HTML file.
  Evidence: `rg --files` showed only a handful of root files, with `index.html` as the single page entrypoint.

- Observation: The earlier version of the page had already moved away from the stock Mailchimp embed, but still carried a second layer of signup behavior and wording that the user did not want.
  Evidence: `index.html` still contained the “Weekly Updates” panel, “Get The Sunday Menu” button, and the `script id="mcjs"` Mailchimp loader before this revision.

- Observation: The user’s clarification materially simplified the implementation.
  Evidence: Removing signup concerns allowed the layout to collapse from a two-panel page into a single-panel homepage centered on the store link.

## Decision Log

- Decision: Treat the latest user instruction as authoritative and remove all visible mailing-list and Sunday-menu references from the page.
  Rationale: The user explicitly said signup is handled elsewhere and should not be considered at all on this page.
  Date/Author: 2026-04-07 / Codex

- Decision: Remove the Mailchimp connected-site script from `index.html`.
  Rationale: Once signup was out of scope, the external Mailchimp script became unused and added needless page complexity.
  Date/Author: 2026-04-07 / Codex

- Decision: Keep the page focused on one primary action, the store button.
  Rationale: The user asked to focus on the intro copy and the link to shop online, so the page should not compete with secondary calls to action.
  Date/Author: 2026-04-07 / Codex

- Decision: Preserve the existing background image and overall warm visual tone while simplifying the layout.
  Rationale: The photo still supports the brand well, and removing the signup panel created a cleaner version of the same visual direction without introducing unnecessary new assets.
  Date/Author: 2026-04-07 / Codex

## Outcomes & Retrospective

The landing page is now a simple store-first homepage. It introduces Bold Love Farm & Bakery, explains the produce and prepared-food offering, and directs people to the GrownBy shop without mentioning mailing-list signup at all.

This revision is simpler and better aligned with the stated purpose of the page. The remaining validation gap is visual review in an actual browser window, but command-line verification confirms the page serves correctly and that the unwanted mailing-list language has been removed from the served HTML.

## Context and Orientation

This repository is a static GitHub Pages site with no framework, no build step, and no test suite. The visible page lives in `/Users/george/work/boldlovebakery.com/index.html`. The current design also uses `/Users/george/work/boldlovebakery.com/farm_background.png` as the full-page background image.

Before this revision, the page still contained a custom mailing-list panel and a remaining Mailchimp script even after the first homepage redesign. The user clarified that signup is handled elsewhere, so the page no longer needs any Mailchimp integration or any invitation to join a list.

The only user-facing behavior that matters now is that the page loads cleanly, explains the business clearly, and links to the store at `https://grownby.com/farms/bold-love-farm-bakery/shop`.

## Plan of Work

The work is confined to `index.html` and this plan file. In `index.html`, remove the Mailchimp script from the document head, delete the entire signup panel from the body, and remove the secondary button that pointed visitors toward the Sunday menu. Then tighten the remaining copy so the page reads as an introduction to the farm, bakery, and online store.

Keep the visual system intentionally small. Reuse the existing background image, keep the translucent content panel, and preserve responsive behavior, but collapse the layout from two columns to one so the store message is the only focal point.

After the HTML edit, verify the page locally by serving the repository, requesting the page over HTTP, and checking for two things in the served output: the presence of the store button text and the absence of mailing-list or Sunday-menu text.

## Concrete Steps

All commands below were run from `/Users/george/work/boldlovebakery.com`.

Inspect the current page for leftover signup and Sunday-menu language:

    rg -n "Weekly Updates|Join the mailing list|Sunday|mailing|Get The Sunday Menu|shop" index.html

Edit `index.html` to remove the Mailchimp script, remove the signup panel, remove the secondary menu button, and tighten the intro copy around the online store.

Verify that the unwanted strings are gone from the file:

    rg -n "mailing|Mailchimp|Sunday|Get The Sunday Menu|Join the mailing list|Weekly Updates|mce-|subscribe/post|mcjs" index.html

Observed result: the command exited with no matches.

Serve the page locally:

    python3 -m http.server 8000

Confirm the page is available:

    curl -I http://127.0.0.1:8000/

Observed output:

    HTTP/1.0 200 OK
    Server: SimpleHTTP/0.6 Python/3.14.3
    Content-type: text/html

Confirm the served page contains the store call to action and does not contain mailing-list language:

    curl -s http://127.0.0.1:8000/ | rg -n "Shop The Online Store|Fresh Local Food, Every Week|mailing|Sunday|Mailchimp|Join the mailing list"

Observed output:

    207:        <p class="eyebrow">Fresh Local Food, Every Week</p>
    214:            rel="noopener noreferrer">Shop The Online Store</a>

Those matches show the store-focused content is present. The absence of any `mailing`, `Sunday`, `Mailchimp`, or `Join the mailing list` match in that output confirms the removed content is gone from the served page.

## Validation and Acceptance

Acceptance is now straightforward. When a visitor loads the page, they should see Bold Love Farm & Bakery introduced in plain language and a clear button to shop online. There should be no visible signup section, no mailing-list wording, and no Sunday-menu invitation.

Local verification passed. `curl -I http://127.0.0.1:8000/` returned `HTTP/1.0 200 OK`, which confirms the static page still serves normally. The served HTML also still contains `Shop The Online Store` and no longer contains any mailing-list or Mailchimp-related strings.

The final browser-side acceptance check is visual: a human reviewer should open the page and confirm the single-panel layout feels balanced on desktop and mobile, and that the store link is immediately obvious.

## Idempotence and Recovery

This work is safe to repeat because it changes only static files. Re-editing `index.html`, restarting `python3 -m http.server 8000`, and rerunning the `curl` or `rg` checks do not mutate remote state.

If a future edit accidentally reintroduces signup language, rerun the same `rg` checks used in this plan and remove any matches from `index.html`. If the page layout breaks, the recovery path is to keep the single hero panel and store button intact while simplifying only the surrounding CSS until the page renders cleanly again.

## Artifacts and Notes

The main production change remains `/Users/george/work/boldlovebakery.com/index.html`.

The final page now includes:

- A single centered content panel over the farm background image.
- Introductory copy explaining Bold Love Farm & Bakery.
- A prominent button linking to the GrownBy store.
- Supporting detail cards that explain what the farm offers, how it grows, what it makes, and what else the shop includes.

The final page no longer includes:

- Any Mailchimp script or Mailchimp submission wiring.
- Any signup form or mailing-list panel.
- Any call to “join the mailing list” or “get the Sunday menu.”

Revision note: Updated on 2026-04-07 after the user clarified that signup is handled elsewhere. This revision removes all mailing-list scope from both the implementation and the plan, and records the final store-only verification.

## Interfaces and Dependencies

The final page depends only on the repository-local background image and the external GrownBy store URL.

The repository-local asset is `/Users/george/work/boldlovebakery.com/farm_background.png`.

The external outbound link is `https://grownby.com/farms/bold-love-farm-bakery/shop`.

No external JavaScript, Mailchimp integration, or additional libraries are used by the final page.
