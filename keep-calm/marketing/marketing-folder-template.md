# Marketing Folder Template

The schematic for every activity's `marketing/` folder. Each sport or activity directory carries the same set of files, in the same layout, so anyone can pick up any activity and know exactly where the copy for each platform lives and what it must contain.

The single goal of every piece of marketing copy is the same: **get the reader into the right WhatsApp group**, either via the website (keepcalm.fit) or a direct short link. Everything else in the post exists to give them enough information and confidence to take that step.

## Standard layout

```
<activity>/marketing/
├── meetup.md        Meetup.com event description
├── luma.md          Luma (lu.ma) event description
├── eventbrite.md    Eventbrite listing
├── facebook.md      Facebook post (narrative)
├── instagram.md     Instagram caption + hashtags
├── reddit.md        Reddit post (title + body, personal tone)
├── whatsapp.md      Post for Keep Calm's own WhatsApp groups
└── media/
    └── README.md    Media guide: what photos work for this activity
```

Optional extras, only where the activity needs them:

- `strategy.md` - launch or growth strategy for that activity
- `instagram-playbook.md` - detailed Instagram plan (used by women's groups)
- `whatsapp-message.txt` - plain-text copy-paste version of the WhatsApp post
- One-off launch docs (e.g. `friday-football-launch.md`)

## The join path

Which link to use depends on where the reader is coming from:

| Platform | Join link | Why |
|---|---|---|
| Meetup | `keepcalm.fit/meetup` | Landing page for people arriving from Meetup |
| Luma | `keepcalm.fit/luma/<sport>` | Per-sport landing, mirrors the Meetup setup |
| Eventbrite | `keepcalm.fit/eventbrite/<sport>` | Per-sport landing, mirrors the Meetup setup |
| Instagram | `https://keepcalm.fit/whatsapp/<activity>` plus "link in bio" | Direct link to the group |
| Facebook | `keepcalm.fit` or `https://keepcalm.fit/whatsapp/<activity>` | Either route works |
| Reddit | `keepcalm.fit` (mention once, casually) | Hard links read as spam on Reddit |
| WhatsApp (our groups) | `keepcalm.fit` + policies footer | Members already trust the brand |

Note: the `keepcalm.fit/luma/<sport>` and `keepcalm.fit/eventbrite/<sport>` routes must exist on the website before copy using them goes live. Check a link resolves before publishing.

Rules that apply to every join path:

- **Never publish a raw WhatsApp invite link** (chat.whatsapp.com/...). Always route through keepcalm.fit short links so links can be rotated if abused.
- Every post must contain exactly one clear call to action: join the WhatsApp group via the stated link. Do not offer competing CTAs.
- The reader should never have to ask "how do I join?". If they would, the post is missing its join line.

## Required information (every platform)

Before the join line makes sense, the reader needs enough to decide. Every platform's copy must answer:

1. **What** - the activity and format, one line
2. **When** - the fixed day/time, or how sessions are announced if ad hoc ("posted in the WhatsApp group with venue, day, time, and cost")
3. **Where** - venue name(s), or how venues are chosen if rotating
4. **Who** - skill level, beginner-friendliness, mixed or specific group
5. **Cost** - explicit price or "free", never ambiguous, plus "no membership fee"
6. **What to bring** - or what is provided (spare rackets, nets, rentals)
7. **How to join** - the join line with the correct link from the table above
8. **18+** - all Keep Calm events and groups are adults only, state it
9. **About Keep Calm** - not-for-profit, volunteer-run, for English speakers in Barcelona
10. **Follow us** - a line pointing to our Instagram (instagram.com/keepcalmbarcelona) and Facebook (facebook.com/keepcalmbarcelona), so traffic from every event also grows our social following, not just that one WhatsApp group

See also `event-post-checklist.md` for the per-event version of this list.

## Universal style rules

- No em dashes, anywhere. Use a hyphen with spaces (`word - word`), commas, or a new sentence.
- Write as "we" (Keep Calm), never "I" - except Reddit, which is deliberately written in a personal first-person voice.
- Warm, inclusive, no-pressure tone. "Just turn up" energy. Not corporate, not salesy.
- Keep safety, data, and conduct notices short: link https://keepcalm.fit/policies rather than restating policy text.
- No private data: no member names, phone numbers, payment details, or private links.
- Cross-posting to groups outside Keep Calm is a different exercise: those posts stay neutral with no Keep Calm branding or links. The files in this folder are for our own channels.

## File-by-file schematic

### meetup.md

Meetup.com event description. This is the most refined template; Luma and Eventbrite derive from it.

```markdown
# Meetup.com Event Description - <Group Name>

---

**<One-line bold tagline: activity + city hook>**

<Intro paragraph: what the group does, where, and the vibe.>

**What to expect**

- <Format and atmosphere bullets>
- <Beginner-friendliness>
- <Social element: drinks after, chatting, etc.>

**Cost**

<Explicit price or "free". Who you pay and how. "No Keep Calm membership fee.">

**What to bring**

<Kit, or what is provided / rentable.>

**How to join**

<How sessions are announced and confirmed.> Join our <activity> WhatsApp
group at keepcalm.fit/meetup to get notified when the next session is
announced.

**About Keep Calm**

Keep Calm is a not-for-profit, volunteer-run community for
English speakers in Barcelona. Adults only (18+). Follow us on Instagram at
instagram.com/keepcalmbarcelona and like us on Facebook at
facebook.com/keepcalmbarcelona to stay up to date with everything we do.

---
```

For a weekly flagship event that deserves a full Meetup page build (title options, tags, attendee limits, photo caption), see `football/marketing/meetup.md` as the extended example.

### luma.md

Luma (lu.ma) event description. Luma pages are short and mobile-first, so this is a tightened version of the Meetup copy, not a duplicate.

```markdown
# Luma Event Description - <Group Name>

---

**<Same one-line tagline as Meetup>**

<Two or three short paragraphs max: what it is, who it is for, cost.
Luma renders long text poorly, keep it lean.>

**The essentials**

- 📅 <When, or how sessions are announced>
- 📍 <Where>
- 💶 <Cost>
- 👥 All levels welcome, 18+

**How to join**

RSVP here, then join our <activity> WhatsApp group at
keepcalm.fit/luma/<activity> - that is where sessions are announced and
coordinated.

Keep Calm is a not-for-profit, volunteer-run community for
English speakers in Barcelona. Follow us on Instagram at
instagram.com/keepcalmbarcelona and Facebook at facebook.com/keepcalmbarcelona.

---
```

### eventbrite.md

Eventbrite listing. Eventbrite has structured fields, so this file provides copy per field.

```markdown
# Eventbrite Listing - <Group Name>

---

## Title (max 75 characters)

<Activity + hook + "Keep Calm", e.g. "Social Bouldering in Barcelona - All
Levels | Keep Calm">

## Summary (max 140 characters)

<One sentence: what, who it is for, and that it is beginner-friendly.>

## Full description

<Meetup-style body: tagline, intro, What to expect, Cost, What to bring.>

**How to join**

Register here (tickets are free - you pay only the venue directly), then
join our <activity> WhatsApp group at keepcalm.fit/eventbrite/<activity>
for session announcements and updates.

**About Keep Calm**

Keep Calm is a not-for-profit, volunteer-run community for
English speakers in Barcelona. Adults only (18+). Follow us on Instagram at
instagram.com/keepcalmbarcelona and like us on Facebook at
facebook.com/keepcalmbarcelona.

## Settings

- Tickets: free (any real cost is paid at the venue, say so in the listing)
- Category: Sports & Fitness (or Community for social/languages)
- Refund policy: not applicable (free tickets)

---
```

### facebook.md

A narrative post for Facebook pages and groups. Longer-form and conversational: what the group does, why it is easy to start, the social side, cost, then the join line ("Head to keepcalm.fit to find the <activity> WhatsApp group") and "Open to adults (18+)".

### instagram.md

Caption plus hashtags, separated by a `---`. The caption is shorter than Facebook, ends with "Link in bio to join" plus the activity emoji. **Maximum 5 hashtags** - more get cut off and read as spam. Lead with the most specific ones (activity + Barcelona), always include `#keepcalmbarcelona`.

### reddit.md

A suggested post title in bold, then the body. Reddit is the one channel written in first person ("I climb with Keep Calm...") because community posts outperform brand posts there. No hard sell, mention keepcalm.fit once near the end, include cost honestly, state 18+.

### whatsapp.md

The post used to introduce the activity in Keep Calm's own general groups. Formatted for WhatsApp: `*bold*`, emoji headers, scannable on a phone. Ends with the join line, "18+ only.", and the policies footer:

```
📋 By taking part you agree to our policies (safety, data, conduct, 18+): https://keepcalm.fit/policies
```

If a plain-text copy-paste version is useful, keep it alongside as `whatsapp-message.txt`.

### media/README.md

The media guide for the activity's photos: what works well (candid action, group moments, details), what to avoid (posed shots, anything intimidating to beginners), and the best angles for the Barcelona audience.

## Rolling this out

When creating or auditing an activity's marketing folder:

1. Copy this layout and fill every file using the activity's `readme.md` as the source of truth for facts (venues, costs, format).
2. Check every file against the required-information list and the join-path table.
3. Keep facts synchronised: if the venue or cost changes in the activity readme, sweep the marketing folder in the same commit.
