# Tennis Game Arrangement Prompt

Using the template below, arrange Tuesday Tennis games based on the CSV sign-up data. The CSV file is located at:

`tennis/scratch/Tuesday Tennis (Responses) - Form responses 1.csv`

Read that file and follow these rules when creating the games:

---

## PHASE 1: DATA EXTRACTION & CLEANUP

**Step 1.1 - Extract all players into a master list**
Before doing anything else, create a complete master list of ALL players from the CSV with:
- Full name (formatted as "Firstname L" - first name + last initial only)
- **DUPLICATE NAME CHECK:** If two or more players would have the same "Firstname L" format, use enough of their surname to distinguish them (e.g., "Julie La" and "Julie Ba")
- Phone number (corrected format - see below)
- Gender (M/F/?)
- 19:30 level (if signed up)
- 20:30 level (if signed up)
- Special requests (if any)

**Step 1.2 - Phone number formatting rules**
- Numbers starting with 07 (UK mobile): add +44, remove leading 0 → 07123456789 becomes +447123456789
- Numbers starting with 00 (international): replace 00 with + → 004712345678 becomes +4712345678
- Numbers with no country code and no leading 0: add +34 (Spain) → 612345678 becomes +34612345678
- Numbers starting with 34 but no +: add + → 34 623456789 becomes +34623456789
- Remove all spaces within phone numbers
- Keep existing + prefixes as-is
- Strip any invisible/Unicode characters (e.g., left-to-right marks) from phone fields

**Step 1.3 - Count players per time slot and level**
Create a summary count:
```
19:30 - 21:00:
- 🟢 Beginner: X players (XF, XM)
- 🟡 Improver: X players (XF, XM)
- 🟠 Intermediate: X players (XF, XM)
- 🔴 Advanced: X players (XF, XM)

20:30 - 22:00:
- 🟢 Beginner: X players (XF, XM)
- 🟡 Improver: X players (XF, XM)
- 🟠 Intermediate: X players (XF, XM)
- 🔴 Advanced: X players (XF, XM)
```

---

## PHASE 2: COURT ASSIGNMENT RULES

**Step 2.1 - Calculate courts needed**
- Each court = 4 players (doubles, 2v2)
- Courts needed = ceiling(players ÷ 4)
- If remainder exists, mark spare places needed

**Step 2.2 - Special requests (PROCESS FIRST)**
- Read ALL special requests before assigning anyone
- Pair players who requested to play together
- Honour "mixed game" requests where possible
- Note any requests that cannot be fulfilled (e.g., requested partner not signed up)
- If a player requests to be booker, assign them as booker on ONE court only (booker-once rule still applies)
- If a player requests NOT to be booker, never assign them as booker

**Step 2.3 - Group by level (PRIORITY)**
- Keep players grouped with others at the same level where possible
- Correct level assignment is the highest priority - never compromise it to balance numbers

**Step 2.4 - Handle lone players at a level**
- If only 1-3 players sit at a level/slot and cannot form a court, fold them into the nearest level
- Note this in your working but NOT in the final output

**Step 2.5 - Gender balance (SOFT)**
- Where it does not compromise level grouping, try to balance gender within a court
- This is a soft preference for tennis, not a hard rule - do not break level grouping for it

**Step 2.6 - Partner mixing for dual-slot players (CRITICAL)**
Players who play BOTH time slots should be placed with DIFFERENT players in each slot. This is critical for a good social experience.

Process:
1. After arranging ALL 19:30 courts, record each player's courtmates for that slot.
2. When arranging 20:30 courts, for every player who also played at 19:30, actively avoid placing them with the same people. Treat this as a hard constraint, relaxed only when mathematically impossible (e.g., not enough players of the required level to avoid all overlaps).
3. If a small number of repeated pairings are unavoidable, document which overlap and briefly explain why.

**Step 2.7 - Cross-session partner variety (LOW PRIORITY / SOFT CONSTRAINT)**
- If data from the previous 3 weeks' sessions is provided, use it to avoid repeating the same court pairings.
- Apply only after all other constraints are satisfied. Never compromise a higher-priority rule for it.
- If no previous session data is provided, skip this step entirely.

**Priority order when conflicts arise:**
1. Correct level assignment (never compromise)
2. Special requests (honour where possible)
3. Partner mixing (avoid same partners across slots)
4. Even court sizes (minimise spare places)
5. Gender balance (soft)
6. Cross-session variety (soft constraint only)

---

## PHASE 3: BOOKER ASSIGNMENT (CRITICAL)

**Step 3.1 - Booker rules**
- The booker MUST ALWAYS be listed as the FIRST player on each court
- **EACH PLAYER CAN ONLY BOOK ONCE** - even if they play multiple time slots
- Create a running list of assigned bookers as you go
- Before assigning a booker, check if they're already on the booker list
- If a player requested to be booker, assign them as booker on their first court (but not a second time)
- If a player requested NOT to be booker, skip them during booker assignment

**Step 3.2 - Booker assignment process**
1. Start with 19:30 courts, assign bookers (first eligible player per court)
2. Add each booker to your "Already Booking" list
3. Move to 20:30 courts
4. For each court, check if the first listed player is already booking
5. If yes, move to the next player on that court who isn't already booking
6. Once a booker is identified, REORDER the court so the booker is listed first
7. Continue until all courts have a unique booker listed first

**Step 3.3 - Final booker verification**
Create a numbered list of ALL bookers and their assigned courts. Verify:
- Total bookers = Total courts
- No name appears twice
- Every booker is the FIRST player listed on their court

---

## PHASE 4: VERIFICATION CHECKLIST

**Player verification:**
- [ ] Every player from CSV appears in output
- [ ] Each player appears in correct time slot(s) per CSV
- [ ] Each player appears at correct level(s) per CSV
- [ ] No player appears twice in same time slot
- [ ] Players playing both slots appear in both (once each)

**Court verification:**
- [ ] Each court has max 4 players
- [ ] Spare places marked with _Spare Place_
- [ ] Empty level sections are omitted (don't include levels with no players)

**Booker verification:**
- [ ] Every court has exactly one booker
- [ ] No player is booker more than once
- [ ] Bookers are marked with 📋 _Booker_
- [ ] Every booker is the FIRST player listed on their court

**Partner mixing verification:**
- [ ] For each dual-slot player, list their 19:30 courtmates and 20:30 courtmates
- [ ] Confirm the majority of pairings are different across slots
- [ ] Document any unavoidable repeated pairings with reason

**Special requests verification:**
- [ ] All pair requests honoured where both players signed up
- [ ] "Not booker" requests honoured
- [ ] "Booker" requests honoured (once only)

---

## PHASE 5: OUTPUT FORMAT

**Format for WhatsApp (use these exact formatting rules):**
- Bold: *text* (asterisks)
- Italic: _text_ (underscores)
- Bullet points: • (not - or *)
- Separators: --- on own line
- No markdown headers (# or ##) - use bold text instead
- No tables
- Phone numbers with no spaces

**Output structure:**
1. Title with date
2. Venue information
3. Instructions section
4. Court arrangements by time slot, then by level
5. Sign-off message

**DO NOT include in final output:**
- Special requests fulfilled section
- Notes section
- Any working/verification notes
- Any partner-mixing analysis

---

## TEMPLATE

```
🎾 *Tuesday Tennis - [DAY] [MONTH] [YEAR]* 🎾

---

⚠️ *CHECK YOUR VENUE & TIME* ⚠️

📍 *Venue:* Barcelona Pro Tennis Academy (Up Cornellà)
https://playtomic.io/tenant/9ce272f4-5039-4b6a-8f07-0c206712d06a

🗺️ *Address:* Cornellà-Riera (L8/S8/R5 from Plaça Espanya, ~40 min)
https://maps.app.goo.gl/Yri55DyC9qqTAuYw8

🚉 *Meet at Plaça Espanya ~45 min before your court time*

---

📱 *Instructions*

⚠️ PLEASE SHARE YOUR GAME IN KEEP CALM TUESDAY TENNIS AND WITH YOUR PLAYERS (NOT IN GENERAL) ⚠️

⚠️ BOOKERS: BOOK YOUR COURT AS SOON AS POSSIBLE - CLAY SLOTS SELL OUT FAST ⚠️

📋 *For Bookers*
1. Open Playtomic and search *Barcelona Pro Tennis Academy*
2. Book your assigned Batida court for the correct slot (90 min clay) *AS SOON AS POSSIBLE*
3. Tap *Share Externally* and post the link to your players
4. Share the booking link to the TUESDAY TENNIS GROUP and tag your 3 players

🎯 *For Joiners*
1. Remind your booker to reserve the court if not done yet
2. Accept the Playtomic invite and pay your share promptly
3. If you need to drop out, help find a replacement

🤝 *For Everyone*
1. Assist new players in booking or joining matches
2. Remain positive and friendly and try to fill empty spaces
3. Bring tennis balls (not padel balls!) and a racket if you have one
4. Refrain from spamming any of the WhatsApp groups

🆕 *First time at the venue?*
Please arrive *early* to find your way around, meet your court, and say hi to the group. There is a map/layout near the entrance - check your court number in the Playtomic app.

---

🎾 *Court Arrangements*

---

⏰ *19:30 - 21:00*

---

🟢 *BEGINNER*

[Only include if there are beginner players at this time]

*Court 1 - Batida [X] - 🟢 Beginner 19:30-21:00*
• [Name] [Phone] 📋 _Booker_
• [Name] [Phone]
• [Name] [Phone]
• [Name] [Phone]

---

🟡 *IMPROVER*

*Court 1 - Batida [X] - 🟡 Improver 19:30-21:00*
• [Name] [Phone] 📋 _Booker_
• [Name] [Phone]
• [Name] [Phone]
• [Name] [Phone]

[Continue for all courts...]

---

🟠 *INTERMEDIATE*

[Continue pattern...]

---

🔴 *ADVANCED*

[Continue pattern...]

---

⏰ *20:30 - 22:00*

[Repeat structure for second time slot]

---

_Have fun and see you on the courts!_ 🎾
```

---

## FINAL INSTRUCTION

Work through Phases 1-4 systematically, showing your working. Only after completing all verification checks, generate the final WhatsApp-formatted output as a downloadable text file.

If you find any errors during verification, fix them before generating the final output.

The date should be the NEXT upcoming Tuesday from today's date.
