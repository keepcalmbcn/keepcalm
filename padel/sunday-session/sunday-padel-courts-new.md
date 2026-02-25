# Padel Game Arrangement Prompt

Using the template below, arrange padel games based on the attached CSV file. Follow these rules when creating the games:

---

## PHASE 1: DATA EXTRACTION & CLEANUP

**Step 1.1 - Extract all players into a master list**
Before doing anything else, create a complete master list of ALL players from the CSV with:
- Full name (formatted as "Firstname L" - first name + last initial only)
- **DUPLICATE NAME CHECK:** If two or more players would have the same "Firstname L" format, use enough of their surname to distinguish them (e.g., "Julie La" and "Julie Ba" or "Julie Lat" and "Julie Bar")
- Phone number (corrected format - see below)
- Gender (M/F/?)
- 16:00 level (if signed up)
- 17:30 level (if signed up)
- Special requests (if any)

**Step 1.2 - Phone number formatting rules**
- Numbers starting with 07 (UK mobile): add +44, remove leading 0 → 07123456789 becomes +447123456789
- Numbers starting with 00 (international): replace 00 with + → 004712345678 becomes +4712345678
- Numbers with no country code and no leading 0: add +34 (Spain) → 612345678 becomes +34612345678
- Numbers starting with 34 but no +: add + → 34 623456789 becomes +34623456789
- Remove all spaces within phone numbers
- Keep existing + prefixes as-is

**Step 1.3 - Count players per time slot and level**
Create a summary count:
```
16:00 - 17:30:
- 🟢 Beginner: X players (XF, XM)
- 🟡 Improvers: X players (XF, XM)
- 🟠 Intermediate: X players (XF, XM)
- 🔴 Advanced: X players (XF, XM)

17:30 - 19:00:
- 🟢 Beginner: X players (XF, XM)
- 🟡 Improvers: X players (XF, XM)
- 🟠 Intermediate: X players (XF, XM)
- 🔴 Advanced: X players (XF, XM)
```

---

## PHASE 2: COURT ASSIGNMENT RULES

**Step 2.1 - Calculate courts needed**
- Each court = 4 players
- Courts needed = ceiling(players ÷ 4)
- If remainder exists, mark spare places needed

**Step 2.2 - Special requests (PROCESS FIRST)**
- Read ALL special requests before assigning anyone
- Pair players who requested to play together
- Honor "mixed game" requests where possible
- Note any requests that cannot be fulfilled (e.g., requested partner not signed up)

**Step 2.3 - Create mixed courts (PRIORITY)**
- Mixed = exactly 2 males + 2 females
- Prioritize creating mixed courts before single-gender courts
- Only label as "Mixed 👫" if exactly 2M + 2F
- Only label as "Ladies 👩" if all 4 are female
- Only label as "Men's 👨" if all 4 are male
- If gender mix doesn't fit any category (e.g., 1M + 3F), leave gender label blank

**Step 2.4 - Handle lone players at a level**
- If only 1 player at a level/time (e.g., 1 Advanced at 16:00), move them to nearest level
- Note this in your working but NOT in final output

---

## PHASE 3: BOOKER ASSIGNMENT (CRITICAL)

**Step 3.1 - Booker rules**
- First player listed on each court is the booker (unless they stated they don't want to book)
- **EACH PLAYER CAN ONLY BOOK ONCE** - even if they play multiple time slots
- Create a running list of assigned bookers as you go
- Before assigning a booker, check if they're already on the booker list

**Step 3.2 - Booker assignment process**
1. Start with 16:00 courts, assign bookers
2. Add each booker to your "Already Booking" list
3. Move to 17:30 courts
4. For each court, check if first player is already booking
5. If yes, move to next player on that court who isn't already booking
6. Continue until all courts have a unique booker

**Step 3.3 - Final booker verification**
Create a numbered list of ALL bookers and their assigned courts. Verify:
- Total bookers = Total courts
- No name appears twice

---

## PHASE 4: VERIFICATION CHECKLIST

Before generating final output, verify each item:

**Player verification:**
- [ ] Every player from CSV appears in output
- [ ] Each player appears in correct time slot(s) per CSV
- [ ] Each player appears at correct level(s) per CSV
- [ ] No player appears twice in same time slot
- [ ] Players playing both slots appear in both (once each)

**Court verification:**
- [ ] Each court has max 4 players
- [ ] Gender labels are accurate (2M+2F=Mixed, 4F=Ladies, 4M=Men's, other=no label)
- [ ] Mixed courts are prioritized over single-gender where possible
- [ ] Spare places marked with _Spare Place_

**Booker verification:**
- [ ] Every court has exactly one booker
- [ ] No player is booker more than once
- [ ] Bookers are marked with 📋 _Booker_

**Special requests verification:**
- [ ] All pair requests honored where both players signed up
- [ ] Mixed game requests honored where possible

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

---

## TEMPLATE

```
🎾 *Weekend Padel Games - Sunday [DAY] [MONTH] [YEAR]* 🎾

---

⚠️ *CHECK YOUR VENUE & ARRIVAL TIME* ⚠️

*Venues:*
📍 *Primary:* Padel Delfos
https://playtomic.io/tenant/714b6963-d11f-47b0-a495-83e753b413e9

📍 *Secondary:* Up Pádel & Tennis Cornellà
https://playtomic.io/tenant/9ce272f4-5039-4b6a-8f07-0c206712d06a

🍻 *Post-Game Social (19:00 onwards):*
Caña + Tapa
https://maps.app.goo.gl/YZpaVXbmj1B1jhg68

---

📱 *Instructions*

⚠️ PLEASE SHARE YOUR GAME IN KEEP CALM SUNDAY PADEL AND WITH YOUR PLAYERS (NOT IN GENERAL) ⚠️

*New to booking?* Use our Booking Guide:
https://docs.google.com/document/d/e/2PACX-1vRRg8ZaFAnIYTSethY2dcqsAxWhoRELfiOV0zssZpTulaco1421WVuXs57FCwVNxUs6pkLLqElVPDFp/pub

*Questions?* Ask in the padel group chat

📋 *For Bookers*
1. Book your court via Playtomic *AS SOON AS POSSIBLE*
2. Keep in mind the court number is NOT too important avoid (delfos court 12/13 where possible)
3. Share the booking link to your players using "Share Externally"
4. Share the booking link to the SUNDAY PADEL GROUP.

🎯 *For Joiners*
1. Remind your booker to reserve the court if not done yet
2. Monitor your court for missing players and follow up
3. If you need to drop out, help find a replacement

🤝 *For Everyone*
1. Assist new players in booking or joining matches
2. Remain positive and friendly and try to fill empty spaces
3. Refrain from spamming any of the WhatsApp groups

---

🎾 *Court Arrangements*

---

⏰ *16:00 - 17:30*

---

🟢 *BEGINNER*

[Only include if there are beginner players at this time]

*Court 1 - [Gender Label if applicable] - 🟢 Beginner 16:00-17:30*
• [Name] [Phone] 📋 _Booker_
• [Name] [Phone]
• [Name] [Phone]
• [Name] [Phone]

---

🟡 *IMPROVERS*

*Court 1 - [Gender Label] - 🟡 Improvers 16:00-17:30*
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

⏰ *17:30 - 19:00*

[Repeat structure for second time slot]

---

_Have fun and see you on the courts!_ 🎾
```

---

## FINAL INSTRUCTION

Work through Phases 1-4 systematically, showing your working. Only after completing all verification checks, generate the final WhatsApp-formatted output as a downloadable text file.

If you find any errors during verification, fix them before generating the final output.

The date should be the NEXT upcoming Sunday from today's date.