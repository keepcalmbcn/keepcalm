# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a documentation and planning repository for "Keep Calm", a not-for-profit sports community in Barcelona for English speakers. The repository contains organizational documents, planning materials, and operational guidelines for various sports activities including padel, volleyball, ping pong, tennis, badminton, hiking, and social events.

## CRITICAL: Privacy Scan Before Every Git Operation

**This repository is PUBLIC. Before any `git add`, `git commit`, or `git push`, you MUST scan ALL staged/changed content for personal or private information. This is extremely important.**

- Review every changed file and every diff line before staging or committing - do not stage blindly (avoid `git add -A` / `git add .` without first reviewing what is being added).
- Scan for and REMOVE any private or personal data, including but not limited to:
  - Real names, surnames, usernames, or handles of members (beyond what is already intentionally public)
  - Phone numbers, WhatsApp numbers, email addresses
  - Home addresses or precise personal locations
  - Payment details (Bizum numbers, bank/IBAN details, card info)
  - WhatsApp group invite links, private chat exports, screenshots containing personal data
  - API keys, tokens, passwords, or any other credentials
  - Any other information that could identify or compromise an individual
- If you find private data in a change, STOP, do not commit, and flag it to the user.
- If you are ever unsure whether something is private, treat it as private and ask the user before committing.
- This applies to all content you write or edit too: never introduce private data into the repository.

**Also: this working tree is shared across many Claude sessions**, not just
this repo's own. Several fleet sessions (`kcbadminton`, `kcpingpong`,
`kcwatersports`, `kchike`, `kcwinter`, and others) edit files directly in
this checkout when their own docs live here. Before `git add -A` or any
broad add, check that every modified file in `git status` is actually part
of the work you did - `git diff <file>` on anything unfamiliar before
staging it. Confirmed for real 2026-08-08: a routine "commit everything"
request would have swept in an unrelated ping-pong poll-time fix another
session made mid-edit, if `git status` hadn't been checked file-by-file
first.

## Repository Structure

The repository is organized by sport/activity type, with each having its own directory:

- **padel/**: Primary focus activity with comprehensive documentation including venue information, organization processes, player guidelines, and scratch notes for planning
- **keep-calm/**: Community overview and organizational information, organized into subfolders:
  - `rules/`: Community policies (event rules, WhatsApp rules, conduct, safety, privacy, partnerships)
  - `governance/`: Decision-making, role descriptions, organiser guide, current organisers
  - `operations/`: Day-to-day logistics (schedule, onboarding, WhatsApp groups, funding)
  - `growth/`: Vision, marketing, surveys, outreach, communities
- **ping-pong/**, **tennis/**, **volleyball/**, **badminton/**, **hiking/**, **social/**: Individual sport directories with their own documentation

## Gotcha: this repo's folder names don't always match the website's slug

When linking to a WhatsApp short link (`keepcalm.fit/whatsapp/<slug>`) or a
website activity page for a sport, don't assume this repo's folder name is
the slug - check `keepcalm-website/app/activities/data.ts`'s `slug:` field
for that sport first. Two known mismatches (as of 2026-07-29):
`wintersports/` in this repo → slug `skiing-snowboarding`; `yoga-pilates/` →
slug `yoga`. Guessing the folder name as the slug produced a real dead link
(`keepcalm.fit/whatsapp/wintersports` 404'd in a live marketing template)
before this was caught - always verify against `data.ts` rather than
inferring.

## Tag every outward keepcalm.fit link for GA4 attribution

A bare `https://keepcalm.fit/...` link posted anywhere outward (WhatsApp,
Instagram, Facebook, Meetup, Luma, emails, or any doc meant to be
copy-pasted externally) gets silently miscategorized as "Direct" traffic in
GA4 once someone opens it - especially through an app's in-app browser
(Instagram and Facebook strip the Referer header). The website already has
redirect infrastructure to fix this (no website changes needed - just use
the tagged form when writing a link in this repo):

- **Joining a specific WhatsApp group:** `https://keepcalm.fit/whatsapp/<slug>`
  (check `keepcalm-website/app/activities/data.ts`'s `slug:` field first -
  see the folder-name-vs-slug gotcha above)
- **Meetup:** `https://keepcalm.fit/meetup` or `/meetup/<activity>`
- **Luma / Eventbrite:** `https://keepcalm.fit/luma/<sport>` /
  `/eventbrite/<sport>` (confirm the route is live before publishing)
- **Any other mention of the homepage in general** (not one specific group -
  e.g. "check out our website"): `https://keepcalm.fit/go/<source>/<medium>/<campaign>`,
  e.g. `https://keepcalm.fit/go/facebook/social/post`.
- **Tagging a link to a specific page** (not the homepage - e.g. `/activities`):
  add the page's path as a trailing segment -
  `https://keepcalm.fit/go/<source>/<medium>/<campaign>/<path>` redirects to
  `/<path>` with the same UTM tags (added 2026-08-07; confirmed live on
  the site, nested paths work too, e.g. `/go/instagram/social/bio/activities/padel`
  → `/activities/padel`). The bare `/go/<source>/<medium>/<campaign>` form
  (no trailing path) still lands on the homepage, unchanged. Example:
  Instagram bio pointing at the activities list is
  `https://keepcalm.fit/go/instagram/social/bio/activities`.

**Exception: Reddit.** Keep Reddit mentions as bare `keepcalm.fit` text, not
a `/go/` link. Reddit's culture already treats hard/tracked links as spam
(see `keep-calm/marketing/marketing-folder-template.md`'s join-path table),
and a visibly tagged URL undermines the deliberately casual, personal voice
those posts use.

The full per-platform join-link table lives in
`keep-calm/marketing/marketing-folder-template.md` ("The join path") - that
is the detailed reference every sport's marketing folder is built from; this
section is the quick reminder. Update both if the convention changes.

## Key Files and Their Purpose

### Organization Documents
- `padel/sunday-padel-organisation.md`: Step-by-step process for organizing weekly Sunday padel sessions
- `keep-calm/readme.md`: Community mission, values, and how the organization operates
- `padel/readme.md`: Specific information about the Sunday padel community and poll system

### Operational Files
- Cross-project task tracking lives in the private `keepcalm-journal` repo (`KEEP CALM.md`). This repo also has its own `TODO.md` at the root (gitignored, never committed — this repo is PUBLIC) for local outstanding work; Claude reads it at session start. Don't create per-sport `todo.md` files.
- `padel/sunday-padel-*.md`: Various operational documents covering courts, polls, problems, rain policies, etc.
- `padel/scratch/`: Planning notes and meeting records

## Development Context

This is a documentation-only repository with no code compilation, testing, or linting requirements. All files are Markdown documents used for:

1. **Community Management**: Guidelines for organizers and participants
2. **Event Planning**: Operational procedures for weekly events
3. **Policy Documentation**: Rules, procedures, and best practices
4. **Communication Templates**: Standard messaging and organizational workflows

## Working with This Repository

When making changes:
- Maintain the existing directory structure organized by sport/activity
- Keep readme.md files as entry points for each section
- Track outstanding work in the private `keepcalm-journal` repo's `KEEP CALM.md`, not in this repo
- Place planning notes and scratch work in appropriate `scratch/` subdirectories
- Follow the existing tone and style which is community-focused and inclusive

## Writing Style Rules

**NEVER use em dashes (—) anywhere in this repository.** This applies to all files: readme.md, event docs, FAQs, WhatsApp posts, scratch notes, commit messages, PR descriptions, and any other content you write or edit.

- Use a regular hyphen (`-`) with surrounding spaces instead: `word - word`, not `word — word`
- Use commas, parentheses, or a new sentence where appropriate instead of an em dash
- This also applies to en dashes (`–`) used as separators in prose
- Em dashes read as AI-generated and the community has explicitly asked to avoid them

If you find existing em dashes in the repo while working on something else, replace them as you go.

## Common Operations

Since this is a documentation repository, common operations involve:
- Updating operational procedures based on community feedback
- Maintaining task tracking in the private `keepcalm-journal` repo for ongoing organizational tasks
- Adding new venue information or policy updates
- Creating planning documents for events or policy changes

No build, test, or deployment commands are needed as this repository contains only documentation files.