# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
This is a **Campus Lost & Found Management System** — a frontend-only Angular 21 application with SSR support via Express. All data is mock/local (no backend, no database).

### Key commands
| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm start` → http://localhost:4200 |
| Build | `npm run build` |
| Unit tests | `npm test` |
| SSR prod server | `npm run build && npm run serve:ssr:bacoy` → http://localhost:4000 |
| Lint (prettier) | `npx prettier --check 'src/**/*.{ts,html,css}'` |

### Known issues
- `src/app/app.spec.ts` has a pre-existing import bug (`ProductsComponent` vs `Products`), causing `npm test` to fail at build time. The `products.spec.ts` test file works correctly.
- `npx prettier --check` reports pre-existing formatting issues across all source files.

### Architecture notes
- **Standalone components only** — no NgModules.
- **Lazy-loaded routes** via `loadComponent()` in `src/app/app.routes.ts`.
- All state uses Angular **signals** — no NgRx/external state libraries.
- Mock data lives in `src/app/core/mock-data/` — services read from these at startup.
- Theming uses CSS custom properties toggled by `[data-theme="dark"]` on `<html>`.
- The `ThemeService` and `AuthService` use `localStorage` (guarded with `isPlatformBrowser` for SSR compatibility).
