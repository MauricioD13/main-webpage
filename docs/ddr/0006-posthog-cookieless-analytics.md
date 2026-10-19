---
status: accepted
date: 2026-10-20
decision-makers: Mauricio Cuello
---

# PostHog analytics in cookieless mode

## Context and Problem Statement

The owner wants to see how the site is used: which pages, projects and stories are read, where visitors come from, and whether they reach the contact links. PostHog was added with its setup wizard, which by default sets cookies (requiring a consent banner for EU visitors under GDPR), enabled its logs product, and left a placeholder in `pnpm-workspace.yaml` that broke `pnpm install`.

## Decision Outcome

* `src/components/posthog.astro` loads the PostHog snippet in `Base.astro` on every page, configured from `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` (EU cloud, `https://eu.i.posthog.com`). Both are build-time variables: `.env` locally (git-ignored, template in `.env.example`) and Cloudflare build variables in production.
* `cookieless_mode: "always"`: no cookies, localStorage or sessionStorage, so no consent banner. Cookieless mode must also be enabled in the PostHog project settings, otherwise events are dropped. Trade-off: returning visitors are not recognised across days; unique visitors are server-side estimates.
* Logs are not used. Unhandled errors are captured as exceptions.
* Custom events, captured on click: `project_opened` (`project_slug`), `story_opened` (`story_slug`), `book_preview_opened` (`book_id`), `book_filter_selected` (`category`), `language_changed` (`language`), `contact_outbound_clicked` (`channel`). Pageviews and autocapture come from PostHog's defaults.
