# site-information-pages Specification

## Purpose

Define the public About, Contact Us, and Products experiences so visitors can learn about Bold Love, get practical answers, and confidently continue to the online store from any device.

## Requirements

### Requirement: Generate static information routes
The system SHALL generate complete pages at `/about/`, `/contact/`, and `/products/` that can be served from static hosting without an application server or application-owned browser-side JavaScript.

#### Scenario: Build all information pages
- **WHEN** the production site build completes successfully
- **THEN** the output contains an HTML document for each of `/about/`, `/contact/`, and `/products/`
- **AND** each page's primary content is present without requiring client-side rendering

### Requirement: Provide consistent information-page navigation
Each information page SHALL provide clearly labeled links to Home, About, Products, and Contact Us, SHALL identify the visitor's current page without relying on color alone, and SHALL keep the navigation operable by keyboard and usable on narrow viewports.

#### Scenario: Return to the homepage
- **WHEN** a visitor follows the Home or Bold Love brand link from an information page
- **THEN** the browser navigates to `/`

#### Scenario: Move between information pages
- **WHEN** a visitor follows an About, Products, or Contact Us link from another information page
- **THEN** the browser navigates to the corresponding local route

#### Scenario: Identify the current route
- **WHEN** a visitor is on an information page
- **THEN** its matching navigation item is visibly distinguished
- **AND** the current-page state is exposed semantically

### Requirement: Present the About page structure
The About page SHALL have a primary heading of “About Bold Love” and SHALL present three clearly labeled content sections in this order: “About the Farm,” “About the Bakery,” and “About Our Partners.” Until final narrative copy is supplied, each section SHALL use concise, intentional placeholder copy rather than invented claims or filler text.

#### Scenario: View the initial About page
- **WHEN** a visitor opens `/about/`
- **THEN** the page presents the three required section headings in the specified order
- **AND** each section communicates that more information will be added later

### Requirement: Provide direct contact information
The Contact Us page SHALL display `boldlove@boldlovefarm.com` prominently and SHALL make the address an email link using the `mailto:` scheme.

#### Scenario: Start an email
- **WHEN** a visitor activates the displayed email address
- **THEN** the browser opens the visitor's configured email composer addressed to `boldlove@boldlovefarm.com`

### Requirement: Present ordering and fulfillment FAQs
The Contact Us page SHALL present an FAQ section with distinct, accessible question-and-answer groupings for hours, ordering, fulfillment, food-bank support, and accepted payments.

The hours answer SHALL explain that Bold Love has no retail space, that all orders are placed through the online store, and that orders are fulfilled on Wednesdays and Fridays. It SHALL list Wednesday pickup at Bold Love Farm from 4:00–6:00 pm and Blue Crab Fitness from 4:30–6:30 pm. It SHALL list Friday pickup at Bold Love Farm from 4:00–6:00 pm, Blue Crab Fitness from 4:30–6:30 pm, and the Trek Bicycle Westminster parking lot from 2:00–2:30 pm, plus home delivery generally between 1:00 and 3:00 pm. It SHALL explain that bread is currently baked for Fridays and that “Pizza at Pickup” is offered on occasional Wednesdays, and SHALL link to `/products/` for more about ordering. The ordering answer SHALL also link to `/products/`. The fulfillment answer SHALL identify farm pickup, gym pickup at Blue Crab Fitness in Lisbon on Wednesdays and Fridays, pickup at the Trek Bicycle Westminster parking lot on Fridays, and home delivery on Fridays.

#### Scenario: Review hours and ordering answers
- **WHEN** a visitor reviews the FAQ section
- **THEN** “What are your hours?” explains the Wednesday and Friday fulfillment schedule with the required locations, pickup times, delivery window, and current bread and pizza availability
- **AND** the hours answer provides a working link to the Products page
- **AND** “How do I order?” provides a working link to the Products page

#### Scenario: Review fulfillment choices
- **WHEN** a visitor reviews “How do I get my food?”
- **THEN** the answer distinguishes pickup at Bold Love Farm in Mount Airy, pickup at Blue Crab Fitness in Lisbon, pickup at the Trek Bicycle Westminster parking lot, and home delivery
- **AND** the answer associates Wednesdays and Fridays with Blue Crab Fitness pickup
- **AND** the answer associates Fridays with Trek Bicycle Westminster pickup and home delivery

### Requirement: Explain food-bank support
The food-bank FAQ answer SHALL state that customers can buy fresh produce for donation and that Bold Love donates unsold produce, sourdough breads, and baked goods to Mount Airy Net each week. It SHALL state that, except for occasional vacations, Bold Love has not missed a week since May 2025.

#### Scenario: Review the food-bank answer
- **WHEN** a visitor reviews “Do you support the local food bank?”
- **THEN** both the customer-funded and weekly unsold-food donation methods are explained
- **AND** Mount Airy Net and the May 2025 continuity statement are included

### Requirement: Explain accepted payment methods
The payment FAQ answer SHALL list cash, check, credit card, Venmo, Zelle, CCFS food vouchers, PayPal, and SNAP; invite visitors to ask about an unlisted favorite method; and explain that payment details appear during checkout.

#### Scenario: Review payment choices
- **WHEN** a visitor reviews “What payments do you accept?”
- **THEN** all required payment methods and the invitation to ask about another method are visible
- **AND** the answer directs the visitor to checkout for payment details

### Requirement: Introduce the product range and online store
The Products page SHALL lead with the message “Local and organic products, prepared foods, sourdough breads, pastries, local meats, cheeses, jam, eggs, microgreens, honey, coffee, and tea.” It SHALL explain that products are purchased through the online store and SHALL provide a prominent link to `https://grownby.com/farms/bold-love-farm-bakery/shop`.

#### Scenario: Continue to the online store
- **WHEN** a visitor activates the Products page's primary store action
- **THEN** the browser navigates to the Bold Love GrownBy shop URL

#### Scenario: Inspect a new-tab store link
- **WHEN** the external store link is configured to open in a new browsing context
- **THEN** the link includes protections equivalent to `noopener noreferrer`

### Requirement: Explain the product-ordering process
The Products page SHALL present the ordering process as seven ordered steps with nested choices where applicable:

The visible labels for the pickup and delivery instructions SHALL be `2a` and `2b`, respectively, and their cards SHALL be indented to present them as alternatives under step 2 while preserving the seven-item ordered-list structure.

1. Choose products.
2. Choose pickup or delivery.
3. For pickup, choose Bold Love Farm in Mount Airy, Blue Crab Fitness in Lisbon, or the Trek Bicycle Westminster parking lot.
4. For delivery, enter an address and any special instructions, with leaving a cooler on the back deck as an example.
5. If schedule options are available, first choose Wednesday or Friday and then choose the date.
6. Add any other items to the same cart.
7. Check out using online credit-card payment or an offline method.

The offline-method guidance SHALL identify cash or check as payable at pickup, Venmo as `@Kim-Anderson-66`, Zelle as `443-386-4324`, and CCFS food vouchers as items to bring to pickup. It SHALL also disclose that the online store requires a billing address for offline payments.

#### Scenario: Review pickup instructions
- **WHEN** a visitor reads the ordering process and chooses pickup
- **THEN** all three pickup locations are listed
- **AND** the schedule guidance tells the visitor to choose an available day before choosing a date

#### Scenario: Review delivery instructions
- **WHEN** a visitor reads the ordering process and chooses delivery
- **THEN** the page explains that an address and special delivery instructions can be entered
- **AND** it gives leaving a cooler on the back deck as an example

#### Scenario: Review checkout instructions
- **WHEN** a visitor reads the checkout step
- **THEN** online credit-card payment and each required offline-payment method are explained
- **AND** the offline billing-address requirement is clearly disclosed before the visitor leaves for the store

### Requirement: Preserve branded, accessible presentation
Each information page SHALL extend the established Bold Love black-and-gold visual identity, use a single descriptive primary heading and logical heading hierarchy, provide page-specific document metadata, keep text and controls readable without horizontal overflow on narrow viewports, and expose visible keyboard focus for interactive elements.

#### Scenario: View an information page on desktop
- **WHEN** a visitor opens an information page on a desktop-sized viewport
- **THEN** the page presents its title, content, navigation, primary action where applicable, and footer in a coherent Bold Love design

#### Scenario: View an information page on a narrow viewport
- **WHEN** a visitor opens an information page on a narrow mobile viewport
- **THEN** navigation, headings, lists, FAQ content, email link, and store action remain readable and usable without horizontal overflow

#### Scenario: Inspect page semantics and metadata
- **WHEN** an information page document is inspected
- **THEN** it declares English as the document language and includes responsive viewport metadata
- **AND** its document title identifies both the page and Bold Love Farm & Bakery
- **AND** it contains one primary heading with logically nested section headings
