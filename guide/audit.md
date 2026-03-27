# Project Audit

## Baseline Recommendations

These recommendations should be treated as the starting rule set for the project before any cleanup work begins.

### Core Stack Rule

- Stay within the existing stack by default:
  - Sanity for content modeling and editorial structure
  - Svelte for the frontend
  - JavaScript and TypeScript for application code
  - SCSS for styling
- Do not expand the stack casually when the current stack can solve the problem cleanly.

### Dependency Rule

- Do not add new libraries or packages automatically.
- If a library may be the cleaner solution, it should be proposed first and explicitly approved before installation.
- Existing custom solutions are valid if they are already solving the problem well enough.

This applies directly to areas like:

- custom text parsing/styling for JSON string content
- custom code editor behavior
- future tool-specific implementations that may need more complexity

### Domain Containment Rule

- `blog`, `portfolio`, and `tools` should remain clearly separated as project domains.
- The frontend and Sanity do not need mirrored folder structures.
- What should stay consistent is the domain boundary, not exact folder depth or naming symmetry.
- Each repo can organize itself according to its framework needs.

In practice:

- blog parts should stay grouped together
- portfolio parts should stay grouped together, even if they sit closer to the site’s top-level routes
- tools should keep a shared catalog and access pattern, while allowing internal exceptions per tool

### Shared Site Consistency Rule

- Outside of tool-specific exceptions, the site should follow a fairly consistent flow.
- Shared areas of the site should prefer common patterns for structure, naming, styling, and data flow.
- The goal is not strict sameness everywhere; the goal is a stable shared system with clear boundaries.

### Tool Exception Rule

- Tools are the main scoped exception area.
- The shared shell around tools should stay consistent:
  - tool catalog
  - tool navigation
  - shared tool entry patterns where useful
- Once inside a specific tool, deviations are acceptable if they are scoped to that tool and do not create project-wide drift.

### Structural Guidance

- Keep related code contained by domain where possible.
- Keep entry files thin and move heavier data or transformation logic into dedicated modules.
- Prefer existing project patterns before creating new ones.
- Use deeper structure only when the framework or the feature genuinely needs it.

## Scope

This audit covers the project-authored code across both repositories in this workspace:

- `Sonoma-Oak_Theme_Portfolio`: SvelteKit frontend
- `Sonoma-Oak-Sanity`: Sanity Studio content/backend configuration

Ignored on purpose:

- SvelteKit framework scaffolding and generated output such as `.svelte-kit`
- Sanity framework defaults and generated runtime files
- `node_modules`, lockfile internals, static binary assets, and generic boilerplate

## High-Level Program Structure

The workspace is not a monorepo with one shared toolchain. It is two separate JavaScript applications that cooperate through Sanity:

1. The frontend repo renders the portfolio, blog, and tools pages.
2. The Sanity repo defines the content model, editorial structure, and migration/import scripts.
3. The frontend pulls portfolio and blog content from Sanity through GROQ queries.
4. The tools section is not CMS-driven; it is route-local and JSON-backed.

In practice the system breaks down like this:

- Portfolio homepage: server load function fetches portfolio data from Sanity and maps it into display-friendly objects.
- Blog: server load functions fetch landing-page data, category lists, and article detail data from Sanity.
- Tools: static Svelte routes read local JSON files and render shared tool page components.
- Content backend: Sanity schemas define all authored content types, while Studio structure groups them into editorial sections.

## Stack Used

### Frontend: `Sonoma-Oak_Theme_Portfolio`

- SvelteKit 2
- Svelte 5 with runes enabled for non-`node_modules` files
- Vite
- Static adapter: `@sveltejs/adapter-static`
- JavaScript-first codebase with light TypeScript support via `jsconfig.json` and generated typings
- SCSS for styling
- Sanity client for CMS reads
- GROQ for queries
- `markdown-it` for markdown rendering
- Vercel Analytics and Speed Insights

### Content/Backend: `Sonoma-Oak-Sanity`

- Sanity Studio 5
- React 19 under the Studio
- TypeScript for schema/config files
- `sanity-plugin-markdown`
- `@sanity/vision` for query inspection
- Node-based `.mjs` scripts for import, migration, inspection, and cleanup tasks

## Overall File Structure

### Workspace

```text
Portfolio Work/
├── audit.md
├── Sonoma-Oak-Sanity/
└── Sonoma-Oak_Theme_Portfolio/
```

### Frontend Repo

```text
Sonoma-Oak_Theme_Portfolio/
├── package.json
├── svelte.config.js
├── vite.config.js
├── src/
│   ├── lib/
│   │   ├── assets/
│   │   │   ├── area_styles/
│   │   │   ├── components/
│   │   │   ├── global_styles/
│   │   │   ├── images/
│   │   │   └── content.json
│   │   ├── sanity/
│   │   └── utils/
│   └── routes/
│       ├── +layout.*
│       ├── +page.*
│       ├── blog/
│       └── tools/
└── static/
```

### Sanity Repo

```text
Sonoma-Oak-Sanity/
├── package.json
├── sanity.config.ts
├── sanity.cli.ts
├── schemaTypes/
│   ├── blog/
│   ├── data/
│   ├── education/
│   ├── hobbies/
│   ├── portfolio/
│   ├── projects/
│   └── index.ts
├── scripts/
└── static/
```

## Frontend Structure

The frontend is route-first.

- `src/routes` owns page composition and route data loading.
- `+page.server.js` files fetch or assemble page data.
- `+page.svelte` files stay thin and mostly hand off to reusable components.
- `src/lib/sanity` is the data-access layer.
- `src/lib/utils` contains formatting and markdown helpers.
- `src/lib/assets/components` contains reusable presentation components.
- `src/lib/assets/global_styles` holds global primitives and tokens.
- `src/lib/assets/area_styles` holds route-area styling such as blog and tools.

The major authored areas are:

- Portfolio
  - Home route at `/`
  - Sanity-backed portfolio content
  - Shared about/project display components
- Blog
  - Blog root, category landings, and dynamic article routes
  - Shared mapping utilities in `src/lib/sanity/blog.js`
  - Portable content display components for custom article blocks
- Tools
  - Static route tree under `src/routes/tools`
  - Local JSON files act as page content/configuration
  - Shared tool components render category and detail pages

## Sanity Structure

The Sanity repo is organized by domain instead of by technical layer.

- `schemaTypes/portfolio`: portfolio landing content and skills
- `schemaTypes/blog`: blog landing content and portable article body blocks
- `schemaTypes/projects`: projects, categories, related blog documents
- `schemaTypes/data`: data entries and data blog documents
- `schemaTypes/hobbies`: hobbies, tags, hobby blog documents
- `schemaTypes/education`: work/education entries and landing content

`sanity.config.ts` adds an authored editorial structure on top of raw schema registration:

- singleton landing-content documents
- grouped sections for skills, work/education, projects, data, and hobbies
- relationship-driven sublists such as blog posts by project or by hobby

The `scripts/` directory is project-specific operational code, not framework boilerplate. It currently handles:

- importing JSON content into Sanity
- inspecting content
- deduplicating skill documents
- migrating project-category data

## Naming Conventions

### What is consistent

- Route files follow SvelteKit conventions: `+layout`, `+page`, `+page.server`.
- Sanity schema document/type names use lower camelCase:
  - `portfolioContent`
  - `projectBlogContent`
  - `workEducationContent`
- JavaScript and TypeScript identifiers are generally lower camelCase.
- Svelte component imports use PascalCase in script blocks.
- CSS class names mostly use snake_case or BEM-like suffixes:
  - `home_page`
  - `title_heading`
  - `site_footer__link`

### What is intentionally domain-grouped

- Frontend component folders are grouped by area:
  - `about__components`
  - `project__components`
  - `tool__components`
  - `route__components`
- Sanity schema folders are grouped by content domain:
  - `projects`
  - `hobbies`
  - `education`

### Current inconsistencies worth formalizing

- Frontend file naming is mixed:
  - Svelte component filenames are lowercase with underscores, for example `project_gallery.svelte`
  - Sanity helper files are plain lowercase, for example `blog.js`, `queries.js`
  - Sanity schema files use camelCase, for example `projectBlogContent.ts`
- Styling class names are mixed:
  - some use underscore-separated names
  - some use BEM-style double underscores
  - some mix both in the same file
- Repo naming is mixed:
  - `Sonoma-Oak_Theme_Portfolio` uses both hyphen and underscore
  - `Sonoma-Oak-Sanity` is hyphen-only
- Data naming is mixed between editorial labels and code keys:
  - UI labels like `Work & Education`
  - object keys like `professionalSkills`
  - category collections like `Web`, `Data`, `Hobby`

If you are going to define project rules, this is the main area to tighten. The codebase is readable, but the naming system is not yet singular.

## Authored Architectural Patterns

- Data mapping is explicit. Sanity responses are transformed into UI-shaped objects in frontend loader/helper modules rather than passed straight through.
- The frontend keeps page files fairly thin and pushes rendering into dedicated components.
- Blog functionality is centralized in `src/lib/sanity/blog.js` and `src/lib/sanity/queries.js`, which is the closest thing to a content service layer.
- Portfolio content has both a Sanity source and a JSON fallback path.
- Tools are treated as a separate mini-system: local JSON content plus shared form/detail components.
- Sanity schemas favor curated references over freeform duplication, especially for skills, projects, hobbies, and featured selections.

## Practical Ownership Boundaries

Project-authored code appears to live mainly in these places:

- Frontend:
  - `src/routes`
  - `src/lib/sanity`
  - `src/lib/utils`
  - `src/lib/assets/components`
  - `src/lib/assets/global_styles`
  - `src/lib/assets/area_styles`
  - route-local `*_content.json` files under `src/routes/tools`
- Backend/content:
  - `sanity.config.ts`
  - `schemaTypes/**`
  - `scripts/**`

These are the directories that make sense to treat as the project’s maintained surface area when you define scope and rules.

## Standards Status

The baseline standards originally identified in this audit have now been formalized in `ruleset.md` and applied through the compliance task list.

Current standing outcomes:

- the workspace is treated as two coordinated apps
- route entries are expected to stay thin
- Sanity schemas remain grouped by domain
- shared frontend component filenames remain lowercase snake_case
- shared site CSS naming standard is snake_case-first, with structured `__` and `--` extensions
- tools remain local unless there is a clear reason to centralize them
- generated and framework-owned directories remain outside the authored ownership surface

## Bottom Line

The custom system is a two-part portfolio platform:

- a static SvelteKit frontend with three content areas: portfolio, blog, and tools
- a Sanity Studio backend that models and curates the portfolio/blog data

The strongest existing organizational pattern is domain grouping. The weakest existing pattern remains naming consistency in shared CSS/class usage, though that is now being normalized under the formal ruleset.
