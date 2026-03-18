# Portfolio

## Quick Notes

This project is a SvelteKit portfolio with three main content areas:

- Main portfolio at `/`
- Blog section at `/blog`
- Tools hub at `/tools`

Content is split between a global portfolio data file and route-local JSON files for tools content:

- Portfolio content: [`src/lib/assets/content.json`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/content.json)
- Tools landing content: [`src/routes/tools/tools_content.json`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/tools_content.json)
- Category content: [`src/routes/tools/collection/collection_content.json`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/collection/collection_content.json), [`src/routes/tools/utilities/utilities_content.json`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/utilities/utilities_content.json), [`src/routes/tools/creative/creative_content.json`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/creative/creative_content.json)
- Tool content: [`src/routes/tools/collection/agr-and-target/agr_target_content.json`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/collection/agr-and-target/agr_target_content.json), [`src/routes/tools/utilities/content-sync/content_sync_content.json`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/utilities/content-sync/content_sync_content.json)

Layout and presentation are handled through reusable Svelte components and shared SCSS.

## Major Components

- **About Me** [`portfolio/src/lib/assets/components/about_me.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/about_me.svelte): renders the About section text, highlights, and social links.
- **About Highlights** [`portfolio/src/lib/assets/components/about_highlights.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/about_highlights.svelte): handles the grouped skills/highlights lists.
- **About Links** [`portfolio/src/lib/assets/components/about_links.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/about_links.svelte): renders the centered LinkedIn, GitHub, and Resume links.
- **Project Gallery** [`portfolio/src/lib/assets/components/project_gallery.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/project_gallery.svelte): owns project category state and the top-level gallery structure.
- **Project Nav** [`portfolio/src/lib/assets/components/project_nav.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/project_nav.svelte): category/tab button row for the gallery.
- **Project Category Content** [`portfolio/src/lib/assets/components/project_category_content.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/project_category_content.svelte): handles category-level rendering and transition wrapping.
- **Project Category List** [`portfolio/src/lib/assets/components/project_category_list.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/project_category_list.svelte): renders section headers, line items, intro blocks, and reflection blocks for a category.
- **Project Line** [`portfolio/src/lib/assets/components/project_line.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/project_line.svelte): individual project/work/education line item. Supports optional `timeRange`, `role`, `responsibilities`, `stack`, and hobby `tags`.
- **Project Section Header** [`portfolio/src/lib/assets/components/project_section_header.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/project_section_header.svelte): reusable titled section break.
- **Project Text Block** [`portfolio/src/lib/assets/components/project_text_block.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/project_text_block.svelte): reusable centered text block used for intro/reflection content.
- **Rich Text** [`portfolio/src/lib/assets/components/rich_text.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/rich_text.svelte): parses custom inline text markers from JSON content.
- **Route Section Nav** [`portfolio/src/lib/assets/components/route_section_nav.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/route_section_nav.svelte): shared top nav used by blog/tools route shells.
- **Tool Category Page** [`src/lib/assets/components/tool_category_page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/tool_category_page.svelte): shared renderer for tools category index pages.
- **Tool Detail Page** [`src/lib/assets/components/tool_detail_page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/tool_detail_page.svelte): shared renderer for simple tool detail pages.
- **Form Components** [`src/lib/assets/components/form_components`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/form_components): reusable input primitives used by tool forms.

## Routes

- **Root Layout** [`portfolio/src/routes/+layout.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/+layout.svelte): global app shell, font setup, main container, and sticky footer behavior.
- **Home Page** [`portfolio/src/routes/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/+page.svelte): main landing page for the portfolio.
- **Blog Layout** [`portfolio/src/routes/blog/+layout.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/blog/+layout.svelte): blog route shell with section navigation.
- **Blog Home** [`portfolio/src/routes/blog/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/blog/+page.svelte): blog home.
- **Blog Data Page** [`portfolio/src/routes/blog/data/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/blog/data/+page.svelte): data section page.
- **Blog Hobbies Page** [`portfolio/src/routes/blog/hobbies/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/blog/hobbies/+page.svelte): hobbies section page.
- **Blog Projects Page** [`portfolio/src/routes/blog/projects/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/blog/projects/+page.svelte): projects section page.
- **Tools Layout** [`portfolio/src/routes/tools/+layout.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/+layout.svelte): tools route shell with top navigation.
- **Tools Page** [`portfolio/src/routes/tools/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/+page.svelte): tools landing page and category link tree.
- **Collection Category** [`src/routes/tools/collection/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/collection/+page.svelte): collection category index.
- **Utilities Category** [`src/routes/tools/utilities/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/utilities/+page.svelte): utilities category index.
- **Creative Category** [`src/routes/tools/creative/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/creative/+page.svelte): creative category index.
- **AGR / Distress Tool** [`src/routes/tools/collection/agr-and-target/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/collection/agr-and-target/+page.svelte): collection tool page with JSON-driven form content.
- **Content Sync Placeholder** [`src/routes/tools/utilities/content-sync/+page.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/routes/tools/utilities/content-sync/+page.svelte): placeholder utilities tool page.

## Tools Structure

The tools area now follows a consistent pattern:

- Each category lives at `/tools/<category>`
- Each category page reads from a local `<category>_content.json`
- Each tool detail page reads from a local `<tool>_content.json`
- Repeated category/detail page markup is centralized in shared components

Current categories:

- `collection`
- `utilities`
- `creative`

## Custom Breakout System

Long-form text is stored in JSON and rendered through [`portfolio/src/lib/assets/components/rich_text.svelte`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/components/rich_text.svelte).

Supported inline markers:

- `*i/text/i*`: renders italic text
- `*ic/text/ic*`: renders italic text with the global emphasis color

The related global utility classes live in [`portfolio/src/lib/assets/global_styles/types.scss`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/global_styles/types.scss):

- `.type_italic`
- `.type_emphasis`

## Styling Notes

- Global variables and layout tokens live in [`portfolio/src/lib/assets/global_styles/globals.scss`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/global_styles/globals.scss).
- Typography rules and reusable text classes live in [`portfolio/src/lib/assets/global_styles/types.scss`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/global_styles/types.scss).
- Form rules and mobile-friendly control defaults live in [`src/lib/assets/global_styles/forms.scss`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/global_styles/forms.scss).
- Global reset rules live in [`portfolio/src/lib/assets/global_styles/reset.scss`](/Users/aply/Desktop/Portfolio%20Work/portfolio/src/lib/assets/global_styles/reset.scss).

Additional styling behaviors now included globally:

- shared page-shell utility classes
- shared surface card styling for tool/category cards
- shared hover treatment for linked cards
- shared card title divider treatment
- dynamic footer labeling by section (`Portfolio`, `Blog`, `Tools`)

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.12.7 create --template minimal --types jsdoc --add prettier --install npm portfolio
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
