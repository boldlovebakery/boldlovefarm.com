# Rework the landing page into a store-first homepage with email signup

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

## Purpose / Big Picture

The site should no longer feel like a generated mailing-list form dropped on top of a farm photo. After this change, a visitor should immediately understand what Bold Love Farm & Bakery sells, see a strong path to buy food from the online store, and still have a clear way to join the weekly mailing list.

The finished behavior is visible in one file, `index.html`. When a person loads the page, they should see a short introduction to the farm and bakery, a prominent button linking to `https://grownby.com/farms/bold-love-farm-bakery/shop`, and a smaller but still intentional mailing-list signup area that posts to the existing Mailchimp subscription endpoint.

## Progress

- [x] (2026-04-07 17:01Z) Inspected the repository structure and confirmed this is a small static GitHub Pages site with one implementation file, `index.html`, plus image assets.
- [x] (2026-04-07 17:01Z) Read the original `index.html` and confirmed the page was a stock Mailchimp embed styled as a centered form over `farm_background.png`.
- [x] (2026-04-07 17:01Z) Read `README.md` and confirmed deployment is by pushing repository changes to the `main` branch.
- [x] (2026-04-07 17:01Z) Drafted the initial ExecPlan before editing code.
- [x] (2026-04-07 17:23Z) Rewrote `index.html` into a custom homepage layout with a hero section, store-first call to action, business copy, and a custom-styled mailing-list section.
- [x] (2026-04-07 17:23Z) Removed the stock Mailchimp embed markup and Mailchimp-hosted stylesheet while preserving the connected-site script, Mailchimp form action, hidden tag field, and anti-bot field.
- [x] (2026-04-07 17:23Z) Added copy derived from the welcome email to explain the farm, bakery, weekly Sunday email, and the range of items sold.
- [x] (2026-04-07 17:23Z) Added a prominent store link to `https://grownby.com/farms/bold-love-farm-bakery/shop`.
- [x] (2026-04-07 17:23Z) Verified the page serves locally over HTTP and returns the updated HTML.
- [ ] (2026-04-07 17:23Z) Manual browser review and optional live Mailchimp submission test remain for a human reviewer with a browser. Completed: local server and HTTP verification. Remaining: visual confirmation of final appearance in a browser and optional test signup submission.

## Surprises & Discoveries

- Observation: The repository is smaller than expected. The entire visible site lives in `index.html`.
  Evidence: `rg --files` returned only `PLAN.md`, `README.md`, `index.html`, `CNAME`, `favicon.ico`, and two image files.

- Observation: The original page included two different Mailchimp integration styles at once: the full embed form and the connected-site script.
  Evidence: The original `index.html` loaded both the stock Mailchimp embed CSS and the `script id="mcjs"` connected-site JavaScript.

- Observation: Relying on the connected-site script alone would make the page’s explicit signup path opaque from repository code alone.
  Evidence: The repository contains no local markup or local JavaScript that exposes how the connected-site script presents signup to the visitor.

- Observation: `xmllint --html --noout index.html` reports `main`, `section`, and `aside` as invalid tags, but that is a limitation of its legacy HTML parser rather than a sign that the page fails to serve.
  Evidence: `curl -I http://127.0.0.1:8000/` returned `HTTP/1.0 200 OK` immediately after the updated page was served.

## Decision Log

- Decision: Remove the stock Mailchimp embed presentation, not the signup capability itself.
  Rationale: The user wanted the “original form” removed, but the site still needs an explicit mailing-list path that is visible and controllable in repository code. A custom lightweight form preserves signup while avoiding the generated embed look.
  Date/Author: 2026-04-07 / Codex

- Decision: Keep the Mailchimp connected-site script in the `<head>` and also keep a custom inline signup form that posts to the existing Mailchimp action URL.
  Rationale: This is the lowest-risk way to preserve existing integration while making the page look intentional. The connected-site script may still power Mailchimp-managed behavior, but the inline form guarantees a visible signup path even if the external script changes.
  Date/Author: 2026-04-07 / Codex

- Decision: Make the store link the primary visual call to action and the mailing-list signup the secondary action.
  Rationale: The user explicitly said the online store link was “most important,” so the page hierarchy should reflect that instruction.
  Date/Author: 2026-04-07 / Codex

- Decision: Remove the Mailchimp-hosted stylesheet and validation script from `index.html`.
  Rationale: They were responsible for the generated-form appearance. The page now uses browser-native email validation and a custom layout, so the extra assets were no longer necessary for the static site’s core behavior.
  Date/Author: 2026-04-07 / Codex

- Decision: Keep implementation confined to `index.html` and `PLAN.md`.
  Rationale: The repository is a single-page static site, and splitting the work across more files would add complexity without improving maintainability for this scope.
  Date/Author: 2026-04-07 / Codex

## Outcomes & Retrospective

The landing page has been converted from a Mailchimp-first embed into a store-first homepage. The page now explains what Bold Love Farm & Bakery is, surfaces the online store clearly, and retains a mailing-list signup that still submits to the existing Mailchimp subscription endpoint.

The implementation stayed intentionally small: one production file changed and the plan was updated to reflect reality. The main remaining gap is visual review in a browser and, if desired, a real submission test against Mailchimp. Those checks require live interaction beyond the shell session, but the local HTTP verification confirms the page serves correctly and contains the expected updated content.

## Context and Orientation

This repository is a static GitHub Pages site. There is no application framework, bundler, database, or automated test suite. The page a visitor sees is defined directly in `/Users/george/work/boldlovebakery.com/index.html`.

Before implementation, `index.html` contained a stock Mailchimp embed form, Mailchimp-hosted CSS, Mailchimp validation JavaScript, and a full-screen background image. The form posted to Mailchimp with an `EMAIL` field, a hidden `tags` input, and a hidden anti-bot field. Those values matter because they are the form integration points that preserve mailing-list behavior.

The current implementation keeps the following external dependency in place:

- The Mailchimp connected-site script in the `<head>`, identified by `id="mcjs"`.

The current implementation also keeps the following Mailchimp form contract in the page:

- The form `action` URL: `https://boldlovebakery.us21.list-manage.com/subscribe/post?u=c1e0805d9318df47dc11e74a1&id=210652ad15&f_id=009497e6f0`
- The required email field name: `EMAIL`
- The hidden tags field: `2965484,2991846`
- The hidden anti-bot field: `b_c1e0805d9318df47dc11e74a1_210652ad15`

The background image remains `farm_background.png`, and the new page design uses that image beneath a warm, translucent content treatment rather than centering a single generated form card.

## Plan of Work

The work was implemented directly in `index.html`. The `<head>` was simplified by removing the Mailchimp-hosted stylesheet and leaving only the favicon, document metadata, the existing connected-site script, and a new inline CSS block. The new CSS now styles the whole page rather than only `#mc_embed_signup`.

The `<body>` was replaced with two visible content areas inside a responsive layout. The first area is a hero panel that introduces Bold Love Farm & Bakery with short copy derived from the welcome email. It explains the farm’s growing practices, the bakery and prepared-food offering, and the fact that weekly Sunday emails include the latest menu and store link. The store button is visually primary and opens the GrownBy store in a new tab.

The second area is a compact mailing-list panel. Instead of the old generated embed markup, it uses a custom form with the existing Mailchimp submission endpoint and fields. This preserves the mailing-list path while matching the new visual language of the page.

`PLAN.md` was then updated to reflect the actual implementation rather than the contradictory intermediate draft.

## Concrete Steps

All commands below were run from `/Users/george/work/boldlovebakery.com`.

Inspect the repository files:

    rg --files

Observed output:

    PLAN.md
    README.md
    farm_background_ORIGINAL.png
    CNAME
    index.html
    favicon.ico
    farm_background.png

Inspect the original page:

    sed -n '1,240p' index.html

Edit `index.html` to replace the stock Mailchimp embed layout with the custom homepage layout and custom Mailchimp form.

Review the updated file:

    sed -n '1,320p' index.html

Serve the page locally:

    python3 -m http.server 8000

Confirm the page serves over HTTP:

    curl -I http://127.0.0.1:8000/

Observed output:

    HTTP/1.0 200 OK
    Server: SimpleHTTP/0.6 Python/3.14.3
    Content-type: text/html

Fetch the page body to confirm the updated content is the one being served:

    curl -s http://127.0.0.1:8000/

Observed content included:

    Shop The Online Store
    Join the mailing list
    Fresh Local Food, Every Week

## Validation and Acceptance

The implementation satisfies the main behavioral goal if a visitor loading the page can tell, without reading deeply, that Bold Love Farm & Bakery offers produce, breads, pastries, prepared foods, and partner goods, and that there is a direct way to shop now.

Local validation completed successfully. Serving the repository with `python3 -m http.server 8000` and requesting `http://127.0.0.1:8000/` returned HTTP 200. The served HTML included the new store button, the new homepage copy, and the custom mailing-list section.

The online store acceptance criterion is met in code because the primary button links to `https://grownby.com/farms/bold-love-farm-bakery/shop` and is the first visually emphasized action in the markup.

The mailing-list acceptance criterion is met structurally because the custom signup form still posts to the existing Mailchimp endpoint and preserves the `EMAIL` field, hidden tag value, and anti-bot field. A human reviewer should still perform an optional live submission test in a browser if they want end-to-end confirmation against Mailchimp itself.

Responsive acceptance is addressed in the CSS by collapsing the two-column layout to one column below `900px` width and stacking the buttons and detail cards vertically below `640px`. A human browser review should confirm the visual result on actual devices or responsive dev tools.

## Idempotence and Recovery

This work is safe to repeat because it touches only static files. Re-running the local server or reapplying the HTML changes does not mutate external state. If a later revision breaks styling, reopen `index.html`, keep the Mailchimp form contract values intact, and adjust only the surrounding markup and CSS.

If mailing-list signup stops working after future edits, compare the form against the known-good implementation in `index.html` and restore these pieces first: the Mailchimp `action` URL, `method="post"`, `target="_blank"`, the `EMAIL` input name, the hidden `tags` input, and the hidden anti-bot field.

If local validation is needed again, restart the server with `python3 -m http.server 8000` and request `http://127.0.0.1:8000/`. If port `8000` is in use from a previous run, stop the old server and start it again.

## Artifacts and Notes

The main production change is in `/Users/george/work/boldlovebakery.com/index.html`.

The updated page now includes:

- A responsive two-panel layout over the existing farm background image.
- A short, store-first introduction to Bold Love Farm & Bakery.
- A prominent link to the GrownBy store.
- A custom inline Mailchimp signup form that preserves the original submission endpoint and hidden fields.

The removed pieces are:

- The Mailchimp-hosted embed stylesheet.
- The stock Mailchimp embed container markup and generated-form layout.
- The Mailchimp validation JavaScript that supported the stock embed presentation.

Revision note: Updated on 2026-04-07 after implementation to resolve contradictions in the earlier draft, record the actual `index.html` rewrite, and document the completed local verification plus the remaining manual browser check.

## Interfaces and Dependencies

The final page depends on one repository-local asset and one external service contract.

The repository-local asset is:

- `/Users/george/work/boldlovebakery.com/farm_background.png`, which is used as the full-page background image.

The external service contracts are:

- Mailchimp connected-site script loaded by the existing `script id="mcjs"` tag in `index.html`.
- Mailchimp HTML form submission using the existing `POST` action URL and field names described above.

No additional libraries, build tools, or local modules were introduced.
