# Tuesday Tennis Organisation Timeline

We run Tuesday Tennis on a rolling **Google Form** cycle, the same way Sunday Padel works: open a form, let people sign up, then build and post the games for bookers to reserve. The cycle runs ~2 weeks ahead so courts can be secured in good time.

Each session has a lifecycle relative to its Tuesday (call it **T**). The Wednesday/Friday/Monday posts are sent automatically by a scheduled job (kept in our private ops repo).

## Wednesday (T-13) 18:00 - Announce the Form
- The announcement (`tuesday-tennis-form.md`) is posted for the session **two Tuesdays away** and pinned for ~4 days.
- Check venue availability for that Tuesday.
- Check the weather forecast and flag anything early.

## Friday (T-11) 18:00 - Reminder
- A reminder nudges the group to sign up.
- Encourage people to react to the message so we can see who's in (form sign-ups don't register as activity).

## Monday (T-8) 18:00 - Final Call / Form Closes 22:00
- The final-call post goes out ("form closes tonight at 22:00").
- The form closes Monday 22:00. Snapshot the responses.
- Note: this is the Monday **a week and a day before** the session, NOT the night before. Matchups are built during the following week and the session is played the **following Tuesday (T)**.

## That Week (T-8 to T) - Build Matchups & Post
- Export the form responses to CSV and drop it in `tennis/scratch/` (this folder is git-ignored - never commit response data).
- Use the [court arrangement prompt](tuesday-tennis-courts.md) to build the games from the CSV: group by level, 4 players per court, assign a unique booker per court, confirm the slot(s).
- Post the games in the group with court details, then message each booker so they can reserve before slots sell out.
- Each booker reserves their assigned Batida court on Playtomic and shares the link with their players via "Share Externally". Lead organiser books court 1 and coordinates court numbers/times so groups start together and sit near each other.

## Before the Session - Manage Dropouts
- If someone drops out: post in the group asking for a replacement.
- If a court drops to 3 players close to the day: ask if they are happy to split the cost 3-ways, or cancel before 10:00 on the day (€0.50 fee).
- No-shows: message privately first before escalating.

## Tuesday (T) - Day of Session
- Remind players to **meet at Plaça Espanya ~45 minutes before** their court time.
- Bring spare rackets and make sure someone has tennis balls (not padel balls).
- After the session: post a recap or group photo - useful for recruitment. Invite people to share their own photos/videos and tag @keepcalmbarcelona (#keepcalmbarcelona) on Instagram so we can repost.

---

# Booking Notes

### Court preference
- **Clay (Tierra Batida)**: ~€39 for 90 min → ~€10 per person. Group preference. Courts numbered Batida 1-12 at Up Cornellà.
- **Quick court (hard)**: ~€31.20 for 90 min → ~€7.80 per person. Use when clay is unavailable or rain is forecast.
- **Rain**: cancel clay courts before 10:00 on the day (€0.50 fee). Switch to quick court if available; otherwise cancel fully.

### Timing
- **19:30** is preferred but often sold out. **20:30** is more reliably available.
- Both are fine - communicate the time clearly so players can plan travel.
- Because the form closes a week and a day before the session, there's plenty of runway: bookers should reserve as soon as the matchups are posted. Up Cornellà allows booking 7 days ahead, so reserve once you're inside that window and don't leave it late - popular slots go fast.

### Booker model
Each court has a designated booker (the first player listed) who books via Playtomic and shares the link. Each player books only once, even if they play both slots. The lead organiser coordinates court numbers and times so all courts start simultaneously and sit near each other.

### Joker role
If the organiser (or another experienced player) does not have a fixed court, they can act as a **joker** - available to fill any last-minute gap, carry spare rackets, or help newcomers find their court.

---

# Level Notes

### Four-tier system
| Level | Description |
|-------|-------------|
| Beginner | Never or barely played. Still learning to rally, serve, and score. |
| Improver | Played before but rusty. Can rally and serve, technique is a work in progress. |
| Intermediate | Regular player with solid fundamentals. Consistent serve, good court awareness. |
| Advanced | Competitive or ex-competitive. High consistency, tactical play, has played at club/tournament level. |

### Playtomic ratings (0-7 scale)
These can supplement the four-tier system as a rough reference:
- ~0.5-1.5 → Beginner
- ~1.5-2.5 → Improver
- ~2.5-3.5 → Intermediate
- ~3.5+ → Advanced

Keep a running note of each regular player's level so you are not asking every week.

---

# Venue Quick Reference

| Venue | Booking Window | On Playtomic | Session |
|-------|---------------|-------------|---------|
| Up Cornellà (main) | 7 days | ✅ | 90 min clay |
| CN Montjuïc | Few days | ✅ | 90 min |
| Vall d'Hebron | 24-48 hours | ✅ | 60 min only |
| CET10 Olimpia | 48 hours | via "find a match" | 60-90 min |

See [Venues](tuesday-tennis-venues.md) for full details.
