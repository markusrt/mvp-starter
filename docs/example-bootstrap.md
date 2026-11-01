# Example: the first exchange

A made-up but realistic first conversation, from "let's start" to the first
round report. The owner runs a small physiotherapy practice and has never
written software. Everything the team says below follows the rules in
`AGENTS.md`; nothing here is a script the owner has to follow.

---

**Owner:** let's start

**Team:** Welcome. I checked your computer: everything is in place except that
your GitHub command-line tool is a year old (2.52; current is 2.86). GitHub
has refused old versions before, so when you have a minute: `brew upgrade gh`.
No hurry; I can work in the meantime.

Before I ask about the product, five quick questions. Each one has my
suggestion after the arrow; a plain "yes" takes it, or just tell me in your
own words.

❓ **Q1 – The idea**: What should the product do, for whom, and what is better
afterwards?
➡️ (no suggestion here; this one is yours)

❓ **Q2 – First users**: Who tries it first, and with real or made-up data?
➡️ You, with made-up patients, until you tell me otherwise.

❓ **Q3 – What must be true**: What is the one thing that, if it doesn't work,
makes the whole product pointless?
➡️ (yours)

❓ **Q4 – Language**: Talk and app in English?
➡️ Yes, English.

❓ **Q5 – Publishing**: After each round you approve, should I keep it on your
machine, open a pull request for someone to check, or publish automatically so
you get a link you can open on your phone?
➡️ Publish automatically. Patient data stays in the browser of whoever uses the
app, nothing is sent to a server; but tell me if you plan to store real
patient names soon, and I'll recommend keeping it on your machine instead.

❓ **Q6 – How technical should I be with you?**: "Just show me the app" (I
decide technical things and tell you in one sentence each) or "tell me the
technical decisions too"?
➡️ Just show me the app.

**Owner:** 1: my practice has 3 therapists. Patients call to book and we write
it in a paper calendar, then someone calls them the day before to remind them.
I want patients to book online and get the reminder automatically.
2: me with fake data, yes. 3: that a patient can pick a free slot without
double booking a therapist. 4–6: yes.

**Team:** Thank you. Here is what I noted; correct me if anything is off.

- Product: online booking for a 3-therapist physio practice, with automatic
  reminders.
- First users: you, with made-up patients. Publishing: automatic link. Plain
  explanations.
- The thing that must work first: a patient picks a free slot and no therapist
  is ever double-booked. That is what the first round will prove.

A few product questions now, a few more may follow as I learn more. Same
format.

❓ **Q7 – Who sees the calendar**: Do patients see which therapist is free, or
just "a slot is free" and the practice assigns the therapist?
➡️ Patients choose a therapist, because many have a regular one. Add "no
preference" as an option.

❓ **Q8 – Slot length**: Are appointments always the same length?
➡️ Yes, 30 minutes, with the possibility to set a different default later.

❓ **Q9 – Reminders**: Email or text message? A text message costs a few cents
per message and needs an account with a messaging provider; email is free but
patients must give an address.
➡️ Start with email; keep text messages as a later option. This also means
the first version stores an email address per booking and nothing else about
the patient — tell me if you need more (phone, insurance) and why.

❓ **Q10 – Cancellation**: Can patients cancel or move an appointment
themselves, and until when?
➡️ Yes, through a link in the confirmation email, until 24 hours before.
Later than that they have to call.

❓ **Q11 – Opening hours**: Same hours for every therapist?
➡️ Each therapist has their own weekly hours that you can set; start with
Monday–Friday 8:00–18:00 for all three.

**Owner:** 7 yes. 8 yes but our first appointment is always 60 min. 9 email
is fine, we only need name and email. 10 yes. 11 yes but Petra only works
Mon–Wed.

**Team:** Noted:

- Therapist choice with a "no preference" option.
- 30-minute slots; a patient's first appointment is 60 minutes. (That changes
  the free-slot check: I need two adjacent free slots for a first visit. Good
  that you said it now.)
- Email reminders; per booking we store name and email only.
- Self-service cancel/move until 24 h before.
- Hours Mon–Fri 8–18 for all; Petra Mon–Wed only.

One follow-up: how do I know it's a first appointment?

❓ **Q12 – First visit**: Ask the patient "Is this your first visit with us?"
when booking?
➡️ Yes, a simple yes/no question; the practice can correct it later.

**Owner:** yes

**Team:** Then I have what I need to start. I'll build the first working
slice: a patient picks a therapist (or no preference), sees free slots for the
next two weeks, books one, and the system refuses anything that would double
book — including the 60-minute first visit. Reminders and cancellation come in
the next round. This will take a while; I'll come back with a link and a short
report. I'm working in a fresh session so the repository, not our chat, holds
everything.

---

*(later)*

**Team:**

# Round 1: First working slice

**What is new**
- Patients can choose a therapist or "no preference", see free slots for the
  next 14 days, and book one.
- First visits take 60 minutes and only show where two slots are free.
- Petra shows no slots on Thursdays and Fridays.
- Double bookings are refused, even if two people try the same slot at once.

**Where to try it:** http://127.0.0.1:5173/ (this computer only; after
approval I'll publish a link you can open anywhere). If the page does not
load, tell me and I'll start it again.

**Try these (made-up data only)**
1. Book a first visit with Petra on a Tuesday: you should see only slots with
   a free hour after them, and the confirmation shows 60 minutes.
2. Book the same slot again in a second browser tab: it should be refused
   with a clear message and offer the next free one.
3. Pick "no preference" on a Thursday: Petra should not be offered.

Screenshots of me doing exactly these three steps are attached.

**Your decisions**
- Q1 Is this round good enough to move on to reminders and cancellation?
  ➡️ Yes.
- Q2 When a slot is taken a moment before a patient confirms, offer the next
  free slot with the same therapist, or the same time with another therapist?
  ➡️ Same therapist, next free slot; most patients come for a person.

**How to answer:** just tell me in chat, in any form. I will write it down
and read it back to you.

**Known limits:** no reminders or cancellation yet; data lives in this
browser only; no login for the practice yet (anyone with the link could see
bookings — that is why it isn't published before we talk about it).

---

**Owner:** Looks good. 1 yes. 2 yes. Two things: the slot list is hard to read
on my phone, everything is tiny. And "no preference" should be the first
option, not the last.

**Team:** Thank you — here is what I wrote down:

- You approve round 1; next up are reminders and cancellation.
- r01 (fix before publishing): the slot list is hard to read on a phone.
- r02 (next round): "no preference" should be the first therapist option.
- You chose: same therapist, next free slot when a slot is taken last second.

I'll fix r01 and publish the round once it's readable, then start round 2.
One thing I will bring back to you before publishing: the practice side has
no login yet, so the public link would show bookings to anyone who has it. I
recommend a simple password for the practice view before the first publish;
I'll propose it in the next report.
