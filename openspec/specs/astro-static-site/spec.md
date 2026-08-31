# astro-static-site Specification

## Purpose

Define the observable homepage experience and deployable static output that must remain reliable while the site is authored and built with Astro.

## Requirements

### Requirement: Static root homepage
The system SHALL generate a complete homepage at `/` that can be served from static hosting without an application server or application-owned browser-side JavaScript.

#### Scenario: Generate the production homepage
- **WHEN** the production site build completes successfully
- **THEN** the output contains an `index.html` document for the root URL
- **AND** the document does not require a server runtime or client-side JavaScript to render its static content

### Requirement: Preserve the mailing-list popup integration
The generated homepage SHALL include the existing Mailchimp connected-site loader so Mailchimp can initialize the configured signup popup without locally maintained popup JavaScript.

#### Scenario: Build the popup-enabled homepage
- **WHEN** the production site build completes successfully
- **THEN** the generated root document contains the `mcjs` loader
- **AND** the loader requests the configured Bold Love Mailchimp connected-site script from `chimpstatic.com`

#### Scenario: Initialize the configured popup
- **WHEN** a visitor loads the homepage and Mailchimp's display rules allow the signup popup for that visitor
- **THEN** the connected-site script can initialize and display the configured popup

### Requirement: Preserve the branded visitor experience
The generated homepage SHALL preserve the Bold Love Farm & Bakery page title, black-and-gold visual identity, responsive layout, logo, primary shop action, local community statement, and USDA Organic certification information while presenting the current product and local-partner message in a clean, skimmable hierarchy.

The homepage SHALL present “Organic fruits and vegetables, prepared foods, sourdough breads, baked goods, and many other products from our local partners” as its product summary and SHALL NOT present the superseded “Seasonal produce, breads, pastries, and prepared foods grown and made with care, then offered through our online store” sentence.

The supporting story SHALL present these three ideas as distinct paragraphs:

1. “Looking for local food that's fresher, healthier, and better tasting? We can help. Our produce is certified organic and gets to you shortly after coming out of the ground.”
2. “We bake and cook with the same care, so the food reaches you fresh, local, and full of nutrition.”
3. “Love supporting local businesses? So do we! We carry products from 9 other local farms and producers. Shopping with us helps ensure these small, local businesses remain viable and continue providing clean food for our community.”

#### Scenario: View the homepage on a desktop viewport
- **WHEN** a visitor opens the generated root homepage on a desktop-sized viewport
- **THEN** the page presents the title, new product summary, primary shop action, three-part supporting story, logo, and footer in the established black-and-gold design
- **AND** spacing and grouping make the product breadth, freshness message, and support for nine local partners easy to identify while skimming
- **AND** redundant superseded product or partner copy is absent

#### Scenario: View the homepage on a narrow viewport
- **WHEN** a visitor opens the generated root homepage on a narrow mobile viewport
- **THEN** the new product summary and three-part story remain readable and visually distinct without horizontal overflow
- **AND** the primary shop action, logo, and footer information remain visible and usable

### Requirement: Preserve shopping navigation
The homepage SHALL provide prominent shopping links to `https://grownby.com/farms/bold-love-farm-bakery/shop`, and external links opened in a new browsing context SHALL prevent the opened page from accessing the originating page.

#### Scenario: Follow the primary shop action
- **WHEN** a visitor activates the primary shop call to action
- **THEN** the browser navigates to the Bold Love GrownBy shop URL

#### Scenario: Inspect an external new-tab shop link
- **WHEN** a generated shop link is configured to open in a new browsing context
- **THEN** the link includes protections equivalent to `noopener noreferrer`

### Requirement: Navigate from the homepage to information pages
The homepage SHALL provide clearly labeled local links to `/about/`, `/products/`, and `/contact/` without removing or obscuring its existing primary online-store action.

#### Scenario: Discover the site information pages
- **WHEN** a visitor opens the homepage
- **THEN** navigation links labeled About, Products, and Contact Us are visible and usable
- **AND** the existing primary shop action remains prominent

#### Scenario: Follow a homepage information link
- **WHEN** a visitor activates an About, Products, or Contact Us navigation link
- **THEN** the browser navigates to the corresponding local page

#### Scenario: Use homepage navigation on a narrow viewport
- **WHEN** a visitor opens the homepage on a narrow mobile viewport
- **THEN** all three information links remain readable and operable without horizontal overflow

### Requirement: Publish required assets and metadata
The production output SHALL include the local logo, farm background, favicon, document language, responsive viewport metadata, descriptive page title, and meaningful alternative text required by the homepage.

#### Scenario: Serve generated local assets
- **WHEN** the generated homepage requests its logo, farm background, or favicon
- **THEN** each referenced local asset exists at the corresponding path in the production output

#### Scenario: Inspect document metadata and semantics
- **WHEN** the generated homepage document is inspected
- **THEN** it declares English as the document language
- **AND** it includes responsive viewport metadata and the Bold Love Farm & Bakery title
- **AND** informative images have meaningful alternative text
- **AND** the page has a single primary heading

### Requirement: Preserve custom-domain identity
The production output SHALL contain the repository's current `CNAME` value unchanged, and the documented cross-repository publishing workflow MUST preserve the destination production repository's domain-specific value.

#### Scenario: Build the bakery repository
- **WHEN** a production build runs with `CNAME` set to `boldlovebakery.com`
- **THEN** the generated output contains a `CNAME` file whose content is exactly `boldlovebakery.com`

#### Scenario: Publish shared content to the farm repository
- **WHEN** shared site changes are published to the farm production repository
- **THEN** the farm repository's domain-specific `CNAME` is retained instead of being replaced by the bakery domain

### Requirement: Reproducible project workflow
The repository SHALL provide documented commands that install locked dependencies, run a local development server, create a production build, and execute focused verification of the generated site.

#### Scenario: Build from a clean checkout
- **WHEN** a maintainer installs dependencies from the committed lockfile and runs the documented production build command
- **THEN** the command completes successfully and creates the static production output

#### Scenario: Verify critical generated behavior
- **WHEN** a maintainer runs the documented verification command
- **THEN** it checks the generated homepage, critical metadata and content, shopping destination, required local assets, and `CNAME` output
