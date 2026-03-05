# Master Mystery

Demo: [https://cse210-master-mystery.github.io/master-mystery/](https://cse210-master-mystery.github.io/master-mystery/)

## Prerequisites

- Node.js 20+
- pnpm 9+

## Install dependencies

```bash
pnpm install
```

## Local Development

Start the dev server:

```bash
pnpm dev
```

Build production assets:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

### Code Quality (before pushing)

Format (auto-fix)

```bash
pnpm format
```

Format check (CI-style)

```bash
pnpm format:check
```

Lint

```bash
pnpm lint
```

### Deployment Verification

We maintain a lightweight Playwright smoke test to verify the **deployed**
build works under GitHub pages subpath:

Run locally (recommended before pushing)

```bash
pnpm test:deploy:local
```

What it does:

- `pnpm build`
- Starts `vite preview` (production build server) at `http://127.0.0.1:4173/master-mystery/`
- Runs Playwright smoke test(s) against that URL
- Always shuts down the preview server (even if tests fail)

**NOTE**: Browser projects - `chromium` vs `chromium-system`

Playwright is configured with two projects:

- `chromium`: Uses Playwright managed Chromium (best for CI / Ubuntu).
- `chromium-system`: Uses the system-installed Chromium

Run a specific project:

```bash
PW_PROJECT=chromium pnpm test:deploy:local
```

or

```bash
PW_PROJECT=chromium-system pnpm test:deploy:local
```

On non-ubuntu Linux distribution, playwright may not be able to install its own Chromium,
so you may need to use `chromium-system` and ensure
you have a compatible version of
Chromium installed on your system.

### GitHub Actions / CI

#### CI workflow

Triggered on:

- push to `master`
- all `pull request`s

CI runs:

- `pnpm format:check`
- `pnpm lint`
- `pnpm build`
- deployment smoke test (Playwright)

#### Pages workflow

Triggered on:

- push to `master`
- manual trigger

It:

1. Builds the site
2. Uploads `dist/` as a Pages artifact
3. Deploys to GitHub pages

### Project Scripts

- `pnpm dev`: start dev server
- `pnpm build`: typecheck + production build
- `pnpm preview`: preview production build
- `pnpm lint`: run ESLint
- `pnpm format`: run Prettier (write)
- `pnpm format:check`: run Prettier (check only)
- `pnpm test:deploy:local`: build + preview + Playwright deploy smoke test
