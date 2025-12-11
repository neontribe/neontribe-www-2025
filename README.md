# Neontribe Website

The official website for [Neontribe](https://neontribe.co.uk), a tech-for-good agency working with charities and social enterprises since 2007.

Built with Astro, Tailwind CSS, and a static-first architecture for fast, accessible, and maintainable web experiences.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Adding or Updating Case Studies](#adding-or-updating-case-studies)
- [Adding or Updating Team Members (Tribers)](#adding-or-updating-team-members-tribers)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Licence](#licence)

## Features

- Static site generation with Astro
- Tailwind CSS with custom design tokens
- WCAG-compliant design and tested with Playwright
- Case studies managed via Markdown/MDX
- Playwright test suite
- Automated deployments via Vercel

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI components**: React (for interactive elements)
- **Content**: Markdown & MDX with Astro Content Collections
- **Testing**: [Playwright](https://playwright.dev)
- **Hosting**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/neontribe/neontribe-www.git
   cd neontribe-www
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Scripts

All commands are run from the root of the project:

| Command           | Action                                         |
| :---------------- | :--------------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:4321`     |
| `npm run build`   | Build production site to `./dist/`             |
| `npm run preview` | Preview production build locally               |
| `npm run test`    | Run Playwright tests                           |
| `npm run test:ui` | Run Playwright tests with interactive UI       |
| `npm run astro`   | Run Astro CLI commands (e.g. `astro check`)    |

## Project Structure

```text
/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── assets/          # Images and SVGs processed by Astro
│   ├── components/      # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── cards/       # People expander cards
│   │   ├── Form/
│   │   ├── layout/      # Header, Footer
│   │   ├── Logo/
│   │   ├── sections/    # Page sections (Hero, GetInTouch, etc.)
│   │   └── Testimonials/
│   ├── content/         # Content collections
│   │   └── case-studies/  # Case study Markdown files + images
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages (.astro files)
│   ├── styles/          # Global CSS and design tokens
│   └── utils/           # Utility functions
├── tests/               # Playwright test files
├── astro.config.mjs     # Astro configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── playwright.config.ts # Playwright configuration
└── package.json
```

### Key Directories

- **`src/pages/`** — Each `.astro` file becomes a route. Dynamic routes use `[slug].astro` syntax.
- **`src/content/case-studies/`** — Markdown files for case studies, managed via Astro Content Collections.
- **`src/components/`** — Reusable Astro and React components.
- **`src/styles/`** — Global styles and CSS custom properties (design tokens).

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the project root (this file is gitignored):

```bash
# Example .env file
# Add any required environment variables here
```

Currently, no environment variables are required for local development. If you add new variables, document them here and ensure they are configured in Vercel for production.

## Adding or Updating Case Studies

Case studies are managed as Markdown files in `src/content/case-studies/`.

### Creating a New Case Study

1. Create a new `.md` file in `src/content/case-studies/`:

   ```bash
   touch src/content/case-studies/your-project.md
   ```

2. Add the required frontmatter:

   ```yaml
   ---
   title: "Your project title"
   description: "A brief description of the project"
   customer: "Client name"
   projectName: "Project Name"
   categories:
     - "Discovery"
     - "Alpha"
   cardImage: ./images/your-image.jpg
   heroImageAlt: "Description of the image"
   date: "2024-01-01"
   isMicro: false
   challenges: >
     Describe the challenges the project addressed.
   howWeHelped:
     - "First thing we did"
     - "Second thing we did"
   ---

   Optional body content in Markdown...
   ```

3. Add any images to `src/content/case-studies/images/`.

4. The case study will automatically appear on the case studies page.

### Frontmatter Schema

| Field              | Type       | Required | Description                           |
| :----------------- | :--------- | :------- | :------------------------------------ |
| `title`            | string     | Yes      | Case study title                      |
| `description`      | string     | Yes      | Brief description                     |
| `customer`         | string     | No       | Client/customer name                  |
| `projectName`      | string     | No       | Project name                          |
| `categories`       | string[]   | No       | Project phases (Discovery, Alpha, etc.) |
| `cardImage`        | image      | No       | Card thumbnail image                  |
| `heroImage`        | image      | No       | Hero image for detail page            |
| `heroImageAlt`     | string     | No       | Alt text for hero image               |
| `tags`             | string[]   | No       | Descriptive tags                      |
| `date`             | string     | No       | Project date (YYYY-MM-DD)             |
| `isMicro`          | boolean    | No       | Whether this is a micro case study    |
| `quote`            | string     | No       | Client testimonial                    |
| `quoteAuthor`      | string     | No       | Quote attribution                     |
| `quoteOrganisation`| string     | No       | Quote author's organisation           |
| `challenges`       | string     | No       | Challenges addressed                  |
| `howWeHelped`      | string[]   | No       | List of how Neontribe helped          |

## Adding or Updating Team Members (Tribers)

Team members are displayed on the "How we work" page using the `PeopleExpander` component.

### To Add a New Team Member

1. Add their photo to `src/assets/` (e.g., `jane.jpg`).

2. Import the image in `src/pages/how-we-work.astro`:

   ```javascript
   import janeImage from '../assets/jane.jpg';
   ```

3. Add them to the `teamMembers` array:

   ```javascript
   const teamMembers = [
     // ... existing members
     {
       name: "Jane Smith",
       role: "Developer",
       bio: "A short biography about Jane and her work at Neontribe.",
       image: janeImage
     }
   ];
   ```

4. The new team member will appear in the expandable cards grid.

## Testing

This project uses [Playwright](https://playwright.dev) for end-to-end testing.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with interactive UI
npm run test:ui
```

### Test Structure

Tests are located in the `tests/` directory and cover:

- Accessibility (a11y) checks
- Component behaviour (buttons, forms, cards)
- Page routing and navigation
- Content rendering (Markdown, case studies)
- Responsive layouts

### Writing New Tests

Create test files in `tests/` following the `*.spec.js` naming convention:

```javascript
import { test, expect } from '@playwright/test';

test('should display the homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Neontribe/);
});
```

## Deployment

The site is hosted on [Vercel](https://vercel.com) with automatic deployments:

- **Production**: Pushes to `main` trigger a production deployment
- **Preview**: Pull requests automatically generate preview deployments

### Deployment Workflow

1. Create a feature branch from `main`
2. Make your changes and commit
3. Open a pull request
4. Vercel creates a preview deployment for review
5. Once approved and merged to `main`, changes deploy to production automatically

### Manual Deployment

If needed, you can build the site locally:

```bash
npm run build    # Creates production build in ./dist/
npm run preview  # Preview the production build locally
```

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit your changes with a clear message
6. Push to your fork and open a pull request

### Code Style

- Follow existing patterns and conventions in the codebase
- Use semantic HTML and ensure accessibility
- Write descriptive commit messages
- Add tests for new features where appropriate

## Licence

**Code**: This project's source code is licensed under the [MIT Licence](https://opensource.org/licenses/MIT).

**Content**: All website content (text, images, case studies, and branding) is © Neontribe Ltd. All rights reserved. Content may not be reproduced without permission.

---

Built with 💚 by [Neontribe](https://neontribe.co.uk), part of the [dxw](https://www.dxw.com) family.
