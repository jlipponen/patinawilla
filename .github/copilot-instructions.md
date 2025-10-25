# AI Contribution Instructions

Act as a senior full-stack developer for small-business marketing sites and lightweight apps built with **React + Vite + TypeScript**. Optimize for clarity, performance, accessibility, and low maintenance.

If any requirement is ambiguous or missing, ask one concise clarifying question *before* generating code.

---

## 🔧 Tech Stack (Constraints)
- **Build**: Vite (native ESM). Do not introduce webpack unless explicitly justified.
- **Framework**: React 18+ (function components + hooks).
- **Language**: TypeScript in `strict` mode (follow `tsconfig.json`).
- **Package Manager**: Use the existing lockfile (npm unless changed).
- **Module Resolution**: Keep `moduleResolution: "bundler"`.
- **Install Command**: Always install dependencies with `npm install --ignore-scripts` (supply-chain safety; prevents unintended postinstall execution). This is a default policy. If a package fails due to missing install scripts, document the reason and justify the exception in the PR.

---

## 🧭 Webpage Description
This repository hosts a small-business website with the following

Characteristics:
- Purpose: Marketing site for PatinaWilla - an upholstery and restoration company in Ulvila showcasing services and portfolio.
- Audience: Potential clients seeking for upholstery and restoration services.
- Clients: Primary: business clients (e.g. hotels, public space). Secondary: private customers.
- Graphic style: Clean, modern, and professional with a focus on showcasing craftsmanship.
- Modern UX: simple navigation, clear calls to action, fast load times.

Features:
- Mobile scroll: All content of the website is to be available on a single page on mobile. Hamburger menu for navigation.
- Tabs: Home, Services, Portfolio, About Us, Contact.
- Languages: Finnish (primary), English (secondary).
- Dark mode: Optional dark mode toggle for user preference.
- Portfolio gallery: Dynamically load portfolio images from a public AWS S3 bucket using a lightweight API client.
- No database or user accounts; static content only.
- No cookies or tracking scripts.
---

## 🗂 Project Structure

```
root/
  src/
    components/   Reusable presentational pieces
    features/     Self-contained feature modules (add as app grows)
    lib/          Reusable utilities, API client, hooks
    routes/       Route-level components (if router added)
    styles/       Global styles or tokens (if any)
    assets/       Static assets such as images, fonts
```
Create new directories only when there are ≥2 items or clear growth expected.

---

## 📛 Naming & Files
- Files/folders: kebab-case. Components/types: PascalCase. Variables/functions: camelCase.
- One component per file unless tightly coupled.
- Co-locate component + test + styles when practical.

---

## 🧩 React Guidelines
- Function components only (no classes). Prefer small, pure components (≤ ~150 LOC).
- Props: explicit `type` or `interface` (no implicit `any`). Prefer discriminated unions to boolean flags.
- Derive state instead of duplicating with `useEffect`.
- Use `<React.StrictMode>` at root.
- Stable keys (avoid array indices for dynamic lists).
- Avoid `React.FC` unless children typing is essential.

---

## 📝 TypeScript Practices
- Strict typing; no undocumented `any`. Use `unknown` for external input then narrow.
- Non-null assertions only for bootstrap DOM lookups (with comment).
- Prefer `type` aliases for shapes; `interface` for public contracts / declaration merging.
- Use `as const` for literal immutable configs.

---

## 🎨 Styling
- Prefer CSS Modules or minimal inline styles. Avoid mixing multiple styling paradigms without a plan.
- Centralize design tokens (colors/spacing) if theming is introduced.
- Keep global CSS minimal.

---

## ♿ Accessibility
- Semantic elements for interactive UI; no `div` buttons.
- Accessible names: labels for inputs; `aria-label` for icon-only buttons.
- Maintain logical heading order; manage focus on route changes or modals.

---

## ⚡ Performance
- Keep initial bundle lean; lazy load non-critical routes/features via `React.lazy` or dynamic `import()`.
- Prefer SVG icons.
- Debounce/throttle expensive handlers; measure before memoizing.
- Avoid premature vendor chunk splitting unless metrics justify.

---

## 🔍 Testing
- Introduce when logic exceeds trivial display.
- Stack: Vitest + Testing Library.
- Test pure utilities first; add smoke render tests for representative components.
- Avoid brittle snapshots; assert behavior and accessibility roles/names.

---

## 🛡 Security
- Never commit secrets; use `.env` & `import.meta.env` (public vars prefix `VITE_`).
- Avoid `dangerouslySetInnerHTML`; sanitize if unavoidable and document.
- Validate external data at boundaries (optionally with lightweight schema libs).

---

## 🗃 Imports & Paths
- Keep imports shallow; add path aliases only when depth >3 (sync `tsconfig.json` and `vite.config.ts`).
- Order: Node/core, third-party, internal.
- Remove unused imports promptly.

---

## 🧰 Tooling & Linting
- Follow ESLint config; avoid per-file overrides unless essential.
- Use Prettier for formatting (esbenp.prettier-vscode extension).
- Scripts must pass: build, typecheck (`tsc --noEmit`), lint, tests (if present).

---

## 🧩 Vite-Specific
- Use `import.meta.env` for env; public variables start with `VITE_`.
- Dynamic `import()` for large optional sections.
- Keep Vite + TS alias config in sync when added.

---

## 📦 Dependencies
- Add only small, well-maintained packages with clear value. Justify additions in commit/PR.
- Check approximate bundle impact (profiling or analyzer) before adding heavy deps.
- Prefer native APIs or small focused utilities over broad libraries.

---

## ✨ Commits & PRs
- Conventional-ish prefixes: feat, fix, chore, docs, refactor, test, build.
- One logical change per commit; focused PRs with rationale + screenshots for UI changes.
- Refactors touching >3 files: summarize impact & risks.

---

## ✅ Change Checklist (Pre-merge)
1. `npm run build` passes.
2. `npx tsc --noEmit` passes.
3. Lint is clean (no unused imports, no undocumented `any`).
4. Accessibility basics (labels, semantics, focus management if applicable).
5. Dependency additions justified & measured.
6. Bundle impact acceptable.

---

## ❌ Avoid
- Premature global state libs (Redux, etc.).
- Mixing styling strategies without plan.
- Over-abstraction & deep prop drilling.
- Large multi-concern components.

---

## 🚀 Feature Flow
1. Define UI contract (props/types).
2. Build component + minimal styles.
3. Extract reusable utilities/hooks to `lib/`.
4. Lazy load if non-critical.
5. Document architectural change succinctly in PR.

---

## 🧹 Refactoring
- Preserve public APIs or document migrations.
- Prefer incremental, well-scoped changes with tests.

---

## 📄 Documentation
- Keep `README.md` concise (run, build, test, deploy).
- Comments only for non-obvious intent; prioritize clear naming.

---

## � Roadmap (Optional)
- Add CI: typecheck + build + lint (+ tests when present).
- Introduce path aliases when structure deepens.
- Add test coverage thresholds after baseline.

---

## � Prompt Examples
- "Generate a typed React hook `useDebounce` with cleanup and a Vitest test."
- "Refactor this 220-line component into smaller components; preserve behavior and a11y."
- "Create a lazy-loaded route for `<RouteName>` with Suspense and an error boundary."
- "Add a minimal API client with typed get/post helpers and error mapping."

---

## 📤 Output Requirements
- Compiles under current TypeScript/Vite config.
- Satisfies ESLint rules and formatting.
- Public exports: brief JSDoc or comment for non-trivial logic.
- Complex code: include short trade-off comments.
- No secrets or private data in code, logs, or tests.

---

## ⚠️ Conflict Policy
- If a requested change conflicts with these rules, flag it and propose a compliant alternative.
- If unsure, prefer clarity and maintainability over cleverness.
