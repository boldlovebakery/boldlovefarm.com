# Bold Love Farm & Bakery website

This repository is the canonical source for the website published at both [boldlovebakery.com](https://boldlovebakery.com/) and [boldlovefarm.com](https://boldlovefarm.com/). Both production repositories use the same commits; each repository's GitHub Pages settings assign its own custom domain.

The site is built with Astro and published as static files through GitHub Pages.

The page itself uses Astro templates and CSS. It does not use a frontend framework. Its only client-side JavaScript is Plausible's privacy-friendly analytics loader and Mailchimp's connected-site loader, which provides the existing signup popup.

## Requirements

- Node.js 22.12 or newer
- npm, included with Node.js

## Local development

Install the exact dependencies recorded in `package-lock.json`:

```sh
npm ci
```

Start the local development server:

```sh
npm run dev
```

Astro prints the local address to open in a browser. Changes under `src/` and `public/` are reflected while the server is running.

## Build and verification

Create the production site in `dist/`:

```sh
npm run build
```

Build the site and run the focused checks against the generated files:

```sh
npm test
```

The checks cover metadata and content across all four pages, internal navigation, shop-link behavior, the Contact FAQ, the Products ordering guide, local assets, and the Plausible and Mailchimp loaders.

To inspect the production build locally:

```sh
npm run build
npm run preview
```

Astro prints the preview address to open in a browser.

### Check the Mailchimp popup

For the most reliable popup check, open the deployed site in a private browser window and wait for the delay configured in Mailchimp. A private window avoids a previous dismissal suppressing the popup. Temporarily disable content-blocking extensions if the popup still does not appear.

Mailchimp may apply connected-domain and audience rules that prevent the popup from appearing on `localhost`, even when the loader is working. The generated page must contain a script with `id="mcjs"`; `npm test` checks that the account-specific loader is present.

## Plausible analytics

The account-generated Plausible script is installed once in `src/layouts/BaseLayout.astro`, so every page includes it. Its Plausible site identifier is `boldlovefarm.com`. The script is configured through Plausible for automatic pageviews, outbound-link clicks, file downloads, and form submissions.

The production build is served from both `boldlovefarm.com` and `boldlovebakery.com`. Configure `boldlovebakery.com` as an allowed hostname for the same site in Plausible so both domains report to one dashboard and can be separated with Plausible's hostname filter.

Plausible ignores `localhost` by default. Leave that behavior enabled so local development and automated checks do not affect production traffic figures.

After deploying, visit each production domain and confirm the visit appears in Plausible's real-time dashboard. Click a **Shop Online** button and confirm that GrownBy appears under outbound-link clicks. Content-blocking browser extensions may prevent analytics from loading, so use a private window without extensions when diagnosing the integration.

## Project structure

- `src/pages/index.astro` — homepage content and structure
- `src/pages/about.astro` — About page and its three planned story sections
- `src/pages/contact.astro` — contact details and frequently asked questions
- `src/pages/products.astro` — product overview and ordering guide
- `src/layouts/BaseLayout.astro` — document shell and metadata
- `src/components/SiteHeader.astro` — shared primary navigation
- `src/components/SiteFooter.astro` — footer content
- `src/styles/global.css` — visual design and responsive rules
- `public/` — files copied unchanged into the generated site
- `tests/site.test.js` — checks for the generated site
- `.github/workflows/deploy.yml` — GitHub Pages build and deployment

`dist/` is generated and is not committed.

## Content status

The About page includes the current farm, bakery, and partner stories, with each section linking visitors to the online store.

## GitHub Pages deployment

The deployment workflow runs independently in both production repositories whenever `main` is pushed. It can also be started manually from the repository's Actions tab. The workflow installs the locked dependencies, builds the Astro site, uploads `dist/`, and deploys that artifact to GitHub Pages.

The source code does not contain a `CNAME` file. With the custom GitHub Actions workflow, each custom domain is repository configuration rather than shared source code.

Configure the repositories under **Settings → Pages** as follows:

- `boldlovebakery/boldlovebakery.com`
  - Source: **GitHub Actions**
  - Custom domain: `boldlovebakery.com`
- `boldlovebakery/boldlovefarm.com`
  - Source: **GitHub Actions**
  - Custom domain: `boldlovefarm.com`

Do not add a domain-specific `CNAME` file or make domain-specific commits. The two repositories should remain on the same Git history.

## Production remotes

The local repository has individual remotes for inspection and a combined remote for deployment:

- `boldloveBAKERY.com-production` → `https://github.com/boldlovebakery/boldlovebakery.com.git`
- `boldloveFARM.com-production` → `https://github.com/boldlovebakery/boldlovefarm.com.git`
- `both-production` → pushes to both repositories

This working copy is already configured with `both-production`. When setting up another clone, create the combined remote with:

```sh
git remote add both-production https://github.com/boldlovebakery/boldlovebakery.com.git
git remote set-url --add --push both-production https://github.com/boldlovebakery/boldlovebakery.com.git
git remote set-url --add --push both-production https://github.com/boldlovebakery/boldlovefarm.com.git
```

Confirm the fetch and push URLs with:

```sh
git remote -v
```

## Deploying both sites

Before deploying, verify the site locally:

```sh
npm ci
npm test
```

Then push the same `main` commit to both production repositories:

```sh
git push both-production main
```

That single command triggers the same Pages workflow in both repositories. Check the Actions tab in each repository and confirm both **Deploy to GitHub Pages** runs succeed.

Avoid force-pushing either production repository. If one push fails, inspect the commits present on only one side before integrating them. For example:

```sh
git fetch boldloveFARM.com-production
git log --left-right --graph --oneline main...boldloveFARM.com-production/main
```

After resolving the divergence with a normal merge or rebase, push `main` through `both-production` again.
