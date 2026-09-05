## MODIFIED Requirements

### Requirement: Provide consistent information-page navigation
Each information page SHALL provide clearly labeled links to Home, About, Blog, Products, and Contact Us, SHALL identify the visitor's current page without relying on color alone, and SHALL keep the navigation operable by keyboard and usable on narrow viewports.

#### Scenario: Return to the homepage
- **WHEN** a visitor follows the Home or Bold Love brand link from an information page
- **THEN** the browser navigates to `/`

#### Scenario: Move between information pages
- **WHEN** a visitor follows an About, Blog, Products, or Contact Us link from another information page
- **THEN** the browser navigates to the corresponding local route

#### Scenario: Identify the current route
- **WHEN** a visitor is on an information page
- **THEN** its matching navigation item is visibly distinguished
- **AND** the current-page state is exposed semantically
