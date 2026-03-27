# Compliance Task List

## Purpose

This checklist converts the current audit and project rule set into an implementation plan for bringing the codebase into compliance without disrupting the working frontend unnecessarily.

The workflow for each item is:

1. Make the change
2. Review it visually on the frontend where applicable
3. Approve, deny, or correct it
4. Move to the next item

The site is currently functioning and visually correct, so this list is ordered to protect that stability. Items are ordered by severity of impact on long-term maintainability and rule compliance, not by visual urgency.

## Priority 1: High-Impact Structure and Boundary Rules

- [x] Define the final shared naming standard for authored frontend files.
  Note: shared authored Svelte component files, style partials, and shared JSON/content files will use lowercase snake_case; route files continue to follow SvelteKit conventions; general helper/service modules may remain simple lowercase names.
- [x] Define the final shared CSS/class naming standard for shared site code.
  Note: shared site classes will use lowercase snake_case as the base convention, with `__` and `--` allowed only as structured extensions of an existing block name.
- [x] Audit shared frontend code for domain leakage between `portfolio`, `blog`, and `tools`.
  Note: no major domain leakage found in shared frontend infrastructure. Shared components such as `rich_text`, `markdown_block`, `tag_pill_list`, and `route_section_nav` are acting as neutral shared building blocks rather than hiding domain-specific behavior. Acceptable cross-domain coupling remains where portfolio content intentionally links to related blog articles and where the root layout handles site-wide title/footer behavior.
- [x] Refactor any shared-site code that mixes domain responsibilities without a clear reason.
  Note: no immediate refactor required from this audit pass. No shared-site code was identified as needing structural separation before continuing.
- [x] Confirm that blog logic, rendering, styling, and Sanity query behavior remain grouped together.
  Note: confirmed. Blog behavior remains centered in `src/routes/blog`, `src/lib/sanity/blog.js`, `src/lib/sanity/queries.js`, `src/lib/assets/components/blog_components`, and `src/lib/assets/area_styles/blog.scss`.
- [x] Confirm that portfolio logic, rendering, and styling remain logically grouped even where they live at top-level routes.
  Note: confirmed. Portfolio behavior remains centered in the root route, `src/lib/sanity/portfolio.js`, and the portfolio/about component areas, with top-level placement serving the site structure rather than creating domain leakage.
- [x] Confirm that tools keep a shared shell while allowing tool-local internal exceptions.
  Note: confirmed. Tools share a consistent shell through `src/routes/tools/+layout.svelte`, shared tool components, and route-local JSON content, while individual tool routes remain free to diverge internally as intended.
- [x] Identify any tool-specific patterns that have leaked into the shared site system and pull them back into tool scope.
  Note: no current tool-specific leakage requires refactor. Tool shell behavior remains contained under `src/routes/tools` and `tool__components`. `form__components` are currently generic shared primitives but are functionally tool-facing only; they do not presently create shared-site drift and can remain as-is unless reused inconsistently later.

## Priority 2: High-Impact Data and Architecture Rules

- [x] Audit route entry files to confirm they stay thin and primarily handle page entry concerns.
  Note: mostly compliant. The majority of route entries are thin wrappers that hand off to shared components or loader helpers. The main follow-up candidates are the root layout and a few article/tool routes that still contain route-local title/navigation/view wiring or article-shaping logic that may be better extracted over time rather than left as the permanent pattern.
- [x] Audit frontend data-loading code to confirm data shaping happens in dedicated modules instead of inside presentation components.
  Note: mostly compliant. Primary data shaping is correctly centered in `src/lib/sanity/blog.js` and `src/lib/sanity/portfolio.js`. The main exceptions are the three dynamic blog article route loaders, which still perform article-specific shaping in route files, and a few presentation components that perform light defensive filtering or normalization at render time.
- [x] Refactor any component that is doing too much data shaping, mapping, or content transformation.
  Note: completed for the clearest current violation. Hobby tag resolution was moved out of `project_category_content.svelte` and into `src/lib/sanity/portfolio.js`, so the project category components now receive already-shaped data instead of resolving `tagIndexes` during render. Remaining component-side filtering is currently minor and acceptable unless later reuse makes it a stronger architectural issue.
- [x] Review `src/lib/sanity` and related helpers to confirm they are the primary home for Sanity fetch and mapping logic.
  Note: mostly compliant. `src/lib/sanity/blog.js`, `src/lib/sanity/portfolio.js`, and `src/lib/sanity/queries.js` are the main home for Sanity query and mapping behavior as intended. Remaining follow-up candidates are the three dynamic blog article route loaders, which still fetch and shape article data directly, and the duplicated Sanity client creation pattern across `client.js`, `blog.js`, and `portfolio.js`.
- [x] Audit shared frontend components to confirm they remain presentation-focused.
  Note: mostly compliant. Shared components are primarily rendering-oriented and are not acting as hidden service layers. Remaining component-side logic is limited to UI state, accessibility behavior, presentation-specific derived values, and minor defensive filtering. No additional component refactor is required before moving on from Priority 2.
- [x] Review Sanity schema organization to confirm content types remain grouped by domain.
  Note: confirmed. `schemaTypes` remains cleanly grouped by domain across `portfolio`, `blog`, `projects`, `data`, `hobbies`, and `education`, with no meaningful structural drift.
- [x] Review Sanity Studio structure to confirm editorial groupings still reflect the intended domain boundaries.
  Note: confirmed. `sanity.config.ts` reflects the intended editorial domains clearly through landing content, skills, work and education, projects, data, and hobby sections, including relationship-based lists that still respect those boundaries.
- [x] Review Sanity scripts to confirm import, migration, inspection, and maintenance logic stays isolated from app code.
  Note: confirmed. Sanity scripts remain operational utilities under `scripts/` and do not leak into frontend application code or shared runtime behavior.

## Priority 3: Naming and Consistency Cleanup

- [x] Inventory current frontend file naming patterns and mark where naming is mixed in shared areas.
  Note: mostly compliant with the chosen standard. Shared authored Svelte components, SCSS partials, and JSON content files already lean heavily toward lowercase snake_case. The main mixed area is not component filenames but helper/service modules, which remain simple lowercase names by design, and existing folder names that use double-underscore grouping such as `blog_components` and `project__components`.
- [x] Inventory current shared CSS/class naming patterns and mark where styles mix conventions.
  Note: mixed. Shared CSS/class naming currently combines snake_case, plain kebab-case, and BEM-style suffixes in the same codebase. Examples include `about_me`, `site-footer`, `route_section_nav__mobile_item`, and `blog_section_break--center`. This is the strongest remaining naming inconsistency in shared frontend code.
- [x] Choose whether shared frontend component filenames will stay underscore-based or move to a single alternative convention.
  Note: settled by the ruleset. Shared authored frontend component filenames will remain lowercase snake_case.
- [x] Choose whether shared site CSS will standardize on one naming system for shared areas.
  Note: settled by the ruleset. Shared site CSS will standardize on snake_case as the base convention, with `__` and `--` allowed only as structured extensions of an established block.
- [x] Normalize shared naming only in areas where the rule is intended to be global.
  Note: initial shared cleanup completed in the root layout. Global site layout classes in `src/routes/+layout.svelte` were normalized from mixed kebab-case forms such as `site-shell`, `main-container`, and `site-footer` to snake_case forms aligned with the ruleset. Further naming cleanup should continue in similarly scoped shared areas rather than broad repo-wide sweeps.
- [x] Leave tool-local naming differences alone unless they are leaking into shared code.
  Note: confirmed. Tool-local naming remains intentionally scoped within `src/routes/tools`, `tool__components`, and tool route-level page classes. No tool-local naming cleanup is required unless those patterns begin leaking into shared site infrastructure.
- [x] Review repo-level naming references in documentation so the written standard matches the actual project language.
  Note: completed for the current naming pass. Documentation references were checked against the chosen ruleset and updated where the recent shared class normalization changed examples.

## Priority 4: Content and Ownership Compliance

- [x] Confirm that portfolio and blog content ownership remains Sanity-first except where a route is intentionally local.
  Note: confirmed. Portfolio and blog routes are Sanity-first through `getPortfolioContent`, `loadBlogRootPage`, and `loadBlogCategoryLandingPage`, plus the article queries/loaders. The only meaningful exception is the portfolio JSON fallback path, which is explicitly gated by `DEBUG_ENABLE_JSON_FALLBACK` and is not acting as the primary source of truth.
- [x] Confirm that tool content remains local only where that is the intended long-term model.
  Note: confirmed. Tools are intentionally local and JSON-backed under `src/routes/tools/**`, matching the documented model that tools may remain independent and route-local unless there is a future reason to centralize them.
- [x] Audit JSON-based and string-based content systems to confirm they are still intentional and supported by the rules.
  Note: confirmed. Tool JSON content remains an intentional local-content system, and the custom string-formatting/markdown utilities remain an intentional authored workflow for inline and block content rendering. Both systems are aligned with the ruleset rather than acting as accidental legacy behavior.
- [x] Identify any content behavior that has quietly become duplicated between Sanity-backed and local systems without a defined reason.
  Note: only one meaningful duplication currently stands out: markdown rendering behavior exists in both `src/lib/utils/markdown.js` and `src/lib/sanity/blog.js`. The overlap is manageable for now but should remain a watch item if content rendering rules continue to expand.
- [x] Confirm the authored ownership surface is clear across routes, shared components, styles, schemas, and scripts.
  Note: confirmed. The ownership boundaries documented in `audit.md` and `ruleset.md` still match the actual codebase: frontend route/layout/components/styles live in the frontend repo, Sanity modeling/editorial structure/scripts live in the Sanity repo, and tool-local content remains explicitly route-scoped.

## Priority 5: Dependency and Exception Governance

- [x] Audit the current codebase for places where a dependency was added to solve a problem that should now be considered project-standard behavior.
  Note: mostly compliant. Current dependencies largely align with the approved stack and content model rather than representing accidental sprawl. The most relevant project-standard behaviors are `@portabletext/svelte` for Sanity portable content, `markdown-it` for markdown rendering, and the Sanity markdown/editor tooling in the Studio. None of these currently appear to violate the dependency rule.
- [x] Mark places where custom solutions are intentionally preferred and should remain part of the standard.
  Note: confirmed. The custom legacy text-formatting parser in `src/lib/utils/markdown.js` and the custom code-highlighting/rendering in `blog_code_snippet.svelte` are intentional project choices and should remain valid standard patterns unless a future requirement clearly exceeds them.
- [x] Document any current exceptions that are valid but should remain local rather than becoming shared patterns.
  Note: confirmed. Tool-local JSON content, tool-specific route/page classes, and specialized blog portable-content renderers are all valid scoped exceptions. They should remain local to those systems and should not become default patterns for unrelated shared-site code.
- [x] Confirm that future dependency additions require explicit approval before installation.
  Note: confirmed by the ruleset and preserved through this audit process. No new dependency should be added without an explicit proposal and approval step first.
- [x] Confirm that tool-level exceptions are treated as scoped exceptions, not default project patterns.
  Note: confirmed. Tool exceptions remain intentionally scoped to the tools system and are not being treated as shared-site standards.

## Priority 6: Low-Risk Cleanup and Documentation Alignment

- [x] Align the audit, ruleset, and future repo documentation so they describe the same standards without contradiction.
  Note: completed for the current pass. The audit now reflects that the baseline standards have been formalized, and the ruleset remains the source of truth for standing project rules.
- [x] Remove redundant wording from documentation once the final naming and structure decisions are approved.
  Note: completed for the current pass. The audit’s outdated “rules to formalize next” section was replaced with current standards status language so the documentation no longer reads like the standards are still undecided.
- [x] Add a short compliance note to future project documentation identifying which areas are shared-standard code and which areas are tool-local exceptions.
  Note: completed. A dedicated compliance note was added to `ruleset.md` distinguishing shared-standard code from tool-local exception areas.
- [x] Keep a running record of which compliance changes were made and which were intentionally rejected.
  Note: completed through `task-list.md`, which is now the running implementation record for accepted findings, completed changes, and intentional non-actions.

## Execution Notes

- [ ] For each completed implementation step, verify that the frontend still looks correct before closing the item.
- [ ] Do not batch unrelated structural changes into one pass when they would make review harder.
- [ ] Complete high-impact shared-system items before low-risk naming polish.
- [ ] Treat tools as a scoped exception area throughout the cleanup process.
