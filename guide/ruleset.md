# Project Rule Set

## Purpose

This document defines the standing rules for how this project is organized and how code should be written across the workspace.

It applies to both repositories in this workspace:

- `Sonoma-Oak_Theme_Portfolio`
- `Sonoma-Oak-Sanity`

These rules define the shared standard for authored code. Framework defaults and generated files are not the project standard.

## 1. Stack Rules

- Stay within the existing stack by default.
- The core project stack is:
  - Sanity
  - Svelte
  - JavaScript
  - TypeScript
  - SCSS
- Do not introduce new platforms, frameworks, or styling systems unless there is a clear technical need.
- Do not replace working project patterns just to make them more abstract or more modern.

## 2. Dependency Rules

- Do not add new libraries automatically.
- If a library may solve a problem more cleanly, it must be proposed first and explicitly approved before installation.
- Prefer the simplest working solution inside the current stack.
- Existing custom solutions are acceptable when they are already solving the problem cleanly enough.

This applies to:

- parsing and formatting systems
- content rendering helpers
- tool-specific UI behavior
- editors or interactive components

## 3. Project Organization Rules

- The workspace is two coordinated applications, not one merged codebase.
- The frontend and Sanity do not need mirrored folder structures.
- The important rule is shared domain clarity, not one-to-one structural symmetry.
- Each repository should use the amount of structure its framework actually needs.

## 4. Domain Boundary Rules

- The primary project domains are:
  - `portfolio`
  - `blog`
  - `tools`
- Related code should stay contained within its domain whenever practical.
- Shared code should only be extracted when it is truly reused or clearly belongs to the shared system.
- Do not scatter one domain’s logic across unrelated areas without a clear reason.

### Blog

- Blog-related logic, rendering, content queries, and supporting components should stay grouped together.
- Blog route behavior should follow a consistent structure across landing pages, category pages, and article pages.
- Blog-specific styling should remain grouped as blog styling, not mixed into unrelated areas.

### Portfolio

- Portfolio code may sit at the site’s higher level because it anchors the main frontend experience.
- Even when it lives near top-level routes, it should still remain logically grouped as portfolio code.
- Portfolio-specific rendering, mapping, and styling should not be mixed into blog or tool internals.

### Tools

- Tools share a common shell:
  - catalog
  - navigation
  - shared access patterns
- Inside an individual tool, exceptions are allowed when they are scoped to that tool.
- Tool-specific deviations must stay local to that tool and must not become project-wide drift.

## 5. Structure Rules

- Organize code by domain first, then by technical need.
- Keep entry files thin.
- Put heavier logic in dedicated modules.
- Use deeper folder structure only when the feature or framework genuinely requires it.
- Avoid creating extra abstraction layers unless they simplify the codebase in practice.

### Frontend

- `src/routes` should own route entry points and page composition.
- Data loading and transformation should live in dedicated helpers or service-style modules where appropriate.
- Reusable UI should live in shared component areas.
- Global styles, shared style primitives, and domain/area styles should remain clearly separated.

### Sanity

- Schemas should remain grouped by content domain.
- Studio structure should reflect the project’s editorial domains clearly.
- Migration, import, inspection, and cleanup logic should stay in dedicated scripts.
- Sanity should remain focused on content modeling, editorial structure, and content relationships.

## 6. Naming Rules

- Naming should prioritize clarity, stability, and consistency over novelty.
- Shared areas of the site should follow one consistent naming approach.
- Tool-specific exceptions are allowed only inside that tool’s local scope.

### General Naming

- Use clear, descriptive names.
- Prefer lower camelCase for JavaScript and TypeScript identifiers.
- Use PascalCase for component references in code.
- Avoid vague names like `data`, `utils`, or `helper` unless the file genuinely represents a broad shared utility.

### File Naming

- Keep naming patterns consistent within each layer.
- Route files should follow SvelteKit conventions.
- Sanity schema names should remain clear and domain-based.
- Shared frontend files should not mix naming styles without reason.
- Shared authored Svelte component filenames should use lowercase snake_case.
- Shared authored frontend style partials and JSON content/config files should also use lowercase snake_case.
- General frontend helper/service modules may remain simple lowercase names when they are not component files, for example query, config, or client modules.
- Do not introduce PascalCase component filenames into shared frontend code unless the project standard is intentionally changed later.

### CSS Naming

- Shared site styling should follow a consistent naming convention.
- Do not mix multiple naming systems casually in shared areas.
- If one naming style is used for a shared area, continue using it in that area.
- Tool-specific styling may vary only when scoped to that tool.
- The shared site standard is lowercase snake_case for primary class names.
- BEM-style `__` and `--` suffixes are allowed only as structured extensions of an existing snake_case block name.
- Do not create parallel naming systems for shared site classes.
- If a shared area already has an established class pattern, extend that pattern rather than introducing a new one beside it.

## 7. Code Writing Rules

- Prefer readable code over clever code.
- Prefer explicit transformations over hidden behavior.
- Keep data shaping close to the data layer, not scattered throughout components.
- Keep rendering components focused on presentation.
- Reuse existing project patterns before introducing a new pattern.
- Comments should explain non-obvious decisions, not restate the code.

## 8. Content and Rendering Rules

- Sanity is the source of truth for portfolio and blog content unless a route is intentionally local.
- Tool content may remain local when that is the simpler and more appropriate choice.
- String-based or JSON-driven content systems are acceptable when they match the intended workflow.
- Do not replace lightweight authored systems with heavier infrastructure unless there is a clear maintenance or capability need.

## 9. Consistency Rules

- Outside of tool-specific exceptions, the site should maintain a consistent flow.
- Shared patterns for layout, data flow, naming, styling, and structure should be reused across the site.
- The goal is a stable shared system, not forced sameness in every file.

## 10. Exception Rules

- Exceptions are allowed only when they are explicit, scoped, and justified by the feature.
- A local exception must not silently become a global standard.
- If a tool, component, or workflow needs a different approach, that difference should remain contained to its own boundary.

## 11. Ownership Surface

The project-owned surface area includes:

- frontend route code
- frontend shared components
- frontend style architecture
- frontend Sanity data-access and transformation code
- frontend utility modules
- tool-local content/configuration files
- Sanity schemas
- Sanity Studio structure
- Sanity migration/import/maintenance scripts

Generated files, framework scaffolding, and vendor code are not part of the authored standard.

## 12. Compliance Note

Shared-standard code includes:

- frontend routes and layouts outside tool-local exceptions
- shared frontend components
- shared frontend style architecture
- frontend Sanity data-access and transformation modules
- frontend utilities used across the site
- Sanity schemas, Studio structure, and Sanity scripts

Tool-local exception areas include:

- route-local tool JSON content
- tool-specific route/page classes
- tool-specific implementation details inside an individual tool

Tool-local exceptions may diverge internally when needed, but they do not redefine the shared standard for the rest of the site.

## 13. Standard Summary

- Stay within the current stack.
- Do not add dependencies without approval.
- Organize by domain.
- Keep blog grouped.
- Keep portfolio grouped.
- Let tools share a shell but allow scoped internal exceptions.
- Keep entry files thin.
- Keep naming consistent in shared areas.
- Prefer simple, readable, working solutions.
- Keep exceptions local.
