## MODIFIED Requirements

### Requirement: Navigate from the homepage to information pages
The homepage SHALL always provide clearly labeled local links to `/about/`, `/products/`, and `/contact/` without removing or obscuring its existing primary online-store action. It SHALL additionally provide a Blog link to `/blog/` when at least one blog post is published and SHALL omit that navigation link while no posts are published.

#### Scenario: Discover the site information pages
- **WHEN** a visitor opens the homepage while no blog posts are published
- **THEN** navigation links labeled About, Products, and Contact Us are visible and usable
- **AND** no Blog navigation link is shown
- **AND** the existing primary shop action remains prominent

#### Scenario: Discover the published blog from the homepage
- **WHEN** a visitor opens the homepage after at least one blog post is published
- **THEN** navigation links labeled About, Blog, Products, and Contact Us are visible and usable
- **AND** the existing primary shop action remains prominent

#### Scenario: Follow a homepage information link
- **WHEN** a visitor activates an available About, Blog, Products, or Contact Us navigation link
- **THEN** the browser navigates to the corresponding local page

#### Scenario: Use homepage navigation on a narrow viewport
- **WHEN** a visitor opens the homepage on a narrow mobile viewport
- **THEN** every currently available information link remains readable and operable without horizontal overflow
