## MODIFIED Requirements

### Requirement: Provide consistent information-page navigation
Each information page SHALL always provide clearly labeled links to Home, About, Products, and Contact Us. It SHALL additionally provide a Blog link when at least one blog post is published and SHALL omit that link while no posts are published. Each page SHALL identify the visitor's current page without relying on color alone and SHALL keep every available navigation item operable by keyboard and usable on narrow viewports.

#### Scenario: Return to the homepage
- **WHEN** a visitor follows the Home or Bold Love brand link from an information page
- **THEN** the browser navigates to `/`

#### Scenario: Move between information pages
- **WHEN** a visitor follows an available About, Blog, Products, or Contact Us link from another information page
- **THEN** the browser navigates to the corresponding local route

#### Scenario: Hide the blog before publication
- **WHEN** an information page is generated while no blog posts are published
- **THEN** its primary navigation does not include a Blog link

#### Scenario: Show the blog after publication
- **WHEN** an information page is generated after at least one blog post is published
- **THEN** its primary navigation includes a clearly labeled Blog link to `/blog/`

#### Scenario: Identify the current route
- **WHEN** a visitor is on an information page
- **THEN** its matching navigation item is visibly distinguished
- **AND** the current-page state is exposed semantically
