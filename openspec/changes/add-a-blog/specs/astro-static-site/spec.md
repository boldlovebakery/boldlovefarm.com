## MODIFIED Requirements

### Requirement: Navigate from the homepage to information pages
The homepage SHALL provide clearly labeled local links to `/about/`, `/blog/`, `/products/`, and `/contact/` without removing or obscuring its existing primary online-store action.

#### Scenario: Discover the site information pages
- **WHEN** a visitor opens the homepage
- **THEN** navigation links labeled About, Blog, Products, and Contact Us are visible and usable
- **AND** the existing primary shop action remains prominent

#### Scenario: Follow a homepage information link
- **WHEN** a visitor activates an About, Blog, Products, or Contact Us navigation link
- **THEN** the browser navigates to the corresponding local page

#### Scenario: Use homepage navigation on a narrow viewport
- **WHEN** a visitor opens the homepage on a narrow mobile viewport
- **THEN** all four information links remain readable and operable without horizontal overflow
