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

## Repository Structure

The repository is organized by sport/activity type, with each having its own directory:

- **padel/**: Primary focus activity with comprehensive documentation including venue information, organization processes, player guidelines, and scratch notes for planning
- **keep-calm/**: Community overview and organizational information, organized into subfolders:
  - `rules/`: Community policies (event rules, WhatsApp rules, conduct, safety, privacy, partnerships)
  - `governance/`: Decision-making, role descriptions, organiser guide, current organisers
  - `operations/`: Day-to-day logistics (schedule, onboarding, WhatsApp groups, funding)
  - `growth/`: Vision, marketing, surveys, outreach, communities
- **ping-pong/**, **tennis/**, **volleyball/**, **badminton/**, **hiking/**, **social/**: Individual sport directories with their own documentation

## Key Files and Their Purpose

### Organization Documents
- `padel/sunday-padel-organisation.md`: Step-by-step process for organizing weekly Sunday padel sessions
- `keep-calm/readme.md`: Community mission, values, and how the organization operates
- `padel/readme.md`: Specific information about the Sunday padel community and poll system

### Operational Files
- `TODO.md` (repo root): The single consolidated task list for the whole project. Don't create new per-sport `todo.md` files, add to the root one instead.
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
- Track outstanding work in the root `TODO.md`, not in per-sport todo.md files
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
- Maintaining the root `TODO.md` for ongoing organizational tasks
- Adding new venue information or policy updates
- Creating planning documents for events or policy changes

No build, test, or deployment commands are needed as this repository contains only documentation files.