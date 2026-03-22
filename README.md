# Portfolio

## Overview

This is a SvelteKit portfolio with three primary areas:

- `/` portfolio landing and project gallery
- `/blog` blog landing, category pages, and article routes
- `/tools` tools landing, category pages, and tool detail routes

Content currently comes from two sources:

- Sanity-backed portfolio and blog content
- route-local JSON content for tools

## Structure

Key route areas:

- `src/routes/+page.svelte` portfolio landing page
- `src/routes/blog` blog landing, category pages, and article routes
- `src/routes/tools` tools landing, category pages, and tool routes

Key shared component areas:

- `src/lib/assets/components/about__components`
- `src/lib/assets/components/project__components`
- `src/lib/assets/components/blog_components`
- `src/lib/assets/components/tool__components`
- `src/lib/assets/components/form__components`
- `src/lib/assets/components/route__components`

Key content / data files:

- `src/lib/sanity/portfolio.js` portfolio content loading
- `src/lib/sanity/blog.js` blog content loading and mapping
- `src/lib/sanity/queries.js` GROQ queries
- `src/lib/assets/content.json` portfolio fallback content
- `src/routes/tools/**/**_content.json` tool and category content

## Styling Map

Global style entry:

- `src/lib/assets/global_styles/globals.scss`

Global style layers:

- `reset.scss` base reset rules
- `tokens.scss` theme variables, spacing, color, sizing tokens
- `layout.scss` shared layout primitives such as `page_stack`, `page_header`, `section_shell`
- `types.scss` typography scale and reusable type classes
- `surfaces.scss` shared card/surface patterns
- `markdown.scss` shared markdown rendering styles
- `forms.scss` form control styling
- `section_rules.scss` shared section/rule primitives
- `tag_pills.scss` shared tag pill primitives
- `utilities.scss` utility-level styling helpers

Route-scoped / area styles:

- `src/lib/assets/area_styles/blog.scss` blog-only layout and component styling
- `src/lib/assets/area_styles/tools.scss` tools-only layout and component styling

Primary component areas still using local `<style>` blocks:

- `src/lib/assets/components/about__components`
- `src/lib/assets/components/project__components`
- `src/lib/assets/components/route__components`
- some route-level pages under `src/routes`

Styling approach:

- shared primitives go in `global_styles`
- route-area styling goes in `area_styles`
- component-local styling stays in the component when it is truly specific to that component
- portfolio visual language should act as the baseline when aligning blog/tools styling

## Development

Install dependencies:

```sh
npm install
```

Run the dev server:

```sh
npm run dev
```

Run checks:

```sh
npm run check
```

Format:

```sh
npm run format
```

## Build

Create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Notes

- The app is set up toward static prerendering.
- Blog article routes are scaffolded as static entries.
- Tools content is currently JSON-driven.
- Sanity is the source of truth for portfolio and blog content.

## Changelog

### Current state

- Wired blog root, blog category landings, and blog article routes to Sanity
- Added blog, project blog, data blog, and hobby blog landing-content singletons in the Studio
- Added static blog article route scaffolding for project, data, and hobby posts
- Refactored blog/category/article loading into shared Sanity helpers
- Moved blog-only and tools-only styles into route-scoped area styles
- Aligned blog cards and page shells more closely with the portfolio baseline
- Added shared tag-pill and section-rule primitives
- Improved portfolio accessibility for project tab labeling and project link naming
- Kept tools routes as lightweight static pages with shared category/detail renderers
