" via stitch "

# KaushalAI — Complete Fullstack Build Prompt
**For:** Claude Code / Cursor / any AI coding agent  
**Stack:** React 18 + Vite + Tailwind + FastAPI + Supabase  
**AI:** Anthropic Claude API (`claude-sonnet-4-20250514`)

---

## WHAT YOU ARE BUILDING

**KaushalAI** — India's first Career Operating System for 500 million workers.

Three completely separate platforms, one backend, one landing page that routes users to the right experience based on who they are.

```
kaushalai.in/           → Landing (Category Selection)
kaushalai.in/           → Job Seeker platform  (after selection)
kaushalai.in/simple/    → Blue Collar platform (after selection)
kaushalai.in/govt/      → Government portal    (after selection)
```

---

## STEP 0 — PROJECT STRUCTURE

```
kaushalai/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx          # Category selector
│   │   │   ├── jobseeker/           # All job seeker screens
│   │   │   ├── bluecollar/          # All blue collar screens
│   │   │   └── govt/                # All govt screens
│   │   ├── components/
│   │   │   ├── AIChatPanel.jsx      # Shared AI counselor panel
│   │   │   ├── VoiceInput.jsx       # Shared voice hook
│   │   │   └── ProfileBuilder/      # Blue collar onboarding
│   │   ├── store/                   # Zustand global state
│   │   │   └── useAppStore.js
│   │   ├── services/
│   │   │   ├── api.js               # All FastAPI calls
│   │   │   └── claude.js            # Direct Claude API calls (chat panel)
│   │   └── router.jsx               # React Router v6
│   └── index.html
│
└── backend/                     # FastAPI (Python)
    ├── main.py
    ├── routes/
    │   ├── auth.py
    │   ├── onboarding.py
    │   ├── analysis.py
    │   ├── roadmap.py
    │   ├── jobs.py
    │   ├── schemes.py
    │   ├── chat.py
    │   └── govt.py
    ├── services/
    │   ├── claude_service.py        # All Claude API calls with retry parser
    │   └── supabase_client.py
    └── seed/
        └── seed_all.py              # Run this first
```

---

## STEP 1 — SUPABASE SETUP

Create these tables in Supabase (SQL editor):

```sql
-- Run in this order --

-- 1. USER PROFILES
create table profiles (
  user_id uuid primary key default gen_random_uuid(),
  phone text unique,
  name text,
  age int,
  gender text,
  state text,
  district text,
  education_level text,
  current_job text,
  years_experience int default 0,
  monthly_income_range text,
  skills_json jsonb default '[]',
  target_role text,
  target_income int,
  timeline_months int,
  open_to_relocation bool default false,
  language_preference text default 'hindi',
  user_type text,   -- 'jobseeker' | 'bluecollar' | 'govt'
  created_at timestamp default now()
);

-- 2. AI ANALYSIS
create table skill_analyses (
  analysis_id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id),
  career_matches_json jsonb,
  skill_gaps_json jsonb,
  latent_skills_json jsonb,
  career_health_score int,
  career_health_breakdown_json jsonb,
  created_at timestamp default now()
);

-- 3. ROADMAPS
create table roadmaps (
  roadmap_id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id),
  target_career text,
  modules_json jsonb,
  progress_percentage int default 0,
  completed_modules_json jsonb default '[]',
  last_active timestamp,
  created_at timestamp default now()
);

-- 4. SCHEMES
create table schemes (
  scheme_id uuid primary key default gen_random_uuid(),
  name text,
  ministry text,
  eligibility_criteria_json jsonb,
  benefits_description text,
  stipend_amount int,
  training_duration_weeks int,
  application_url text,
  is_active bool default true
);

-- 5. SCHEME MATCHES
create table scheme_matches (
  match_id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id),
  scheme_id uuid references schemes(scheme_id),
  match_score decimal,
  is_enrolled bool default false,
  created_at timestamp default now()
);

-- 6. SKILL DEMAND TRENDS
create table skill_demand_data (
  record_id uuid primary key default gen_random_uuid(),
  skill text,
  state text,
  district text,
  month date,
  job_count int,
  trajectory_label text
);

-- 7. SKILL GENOME
create table skill_genome (
  genome_id uuid primary key default gen_random_uuid(),
  skill_a text,
  skill_b text,
  transfer_coefficient decimal,
  weeks_saved int
);

-- 8. JOBS
create table jobs (
  job_id uuid primary key default gen_random_uuid(),
  title text,
  company text,
  required_skills_json jsonb,
  salary_min int,
  salary_max int,
  state text,
  district text,
  is_walkin bool default false,
  walkin_date date,
  is_active bool default true,
  created_at timestamp default now()
);

-- 9. TRAINING CENTERS (for govt)
create table training_centers (
  center_id uuid primary key default gen_random_uuid(),
  name text,
  state text,
  district text,
  trades_json jsonb,
  capacity int,
  current_enrollment int,
  placement_rate decimal,
  completion_rate decimal,
  is_active bool default true
);

-- RLS: users see only own data
alter table profiles enable row level security;
alter table skill_analyses enable row level security;
alter table roadmaps enable row level security;
alter table scheme_matches enable row level security;

create policy "own_profile" on profiles for all using (auth.uid() = user_id);
create policy "own_analysis" on skill_analyses for all using (auth.uid() = user_id);
create policy "own_roadmap" on roadmaps for all using (auth.uid() = user_id);
create policy "own_schemes" on scheme_matches for all using (auth.uid() = user_id);

-- Public read for schemes, jobs, skill_demand_data, skill_genome
create policy "public_read_schemes" on schemes for select using (true);
create policy "public_read_jobs" on jobs for select using (true);
create policy "public_read_trends" on skill_demand_data for select using (true);
create policy "public_read_genome" on skill_genome for select using (true);
create policy "public_read_centers" on training_centers for select using (true);
```

Then run `seed/seed_all.py` to populate:
- 15 schemes (PMKVY, MUDRA, DDU-GKY, e-Shram, NAPS, PM SVANidhi, Udyam, ONDC, etc.)
- 50 skill_genome pairs (Excel→SQL 0.55, Tally→GST 0.80, Electrician→Solar 0.65, etc.)
- 18 months skill_demand_data for Rajasthan (30 skills, 5 districts)
- 8 training centers in Nagpur
- 12 jobs in Jaipur (2 walk-in)

---

## STEP 2 — THE LANDING PAGE (Category Selector)

**Route:** `/`  
**File:** `src/pages/Landing.jsx`

### What it looks like

Full-screen, dark navy background (`#0F172A`). Center-aligned.

**Top:** KaushalAI logo + tagline: *"India ka pehla Career Operating System"*

**Skill Futures Index strip** (no login needed):
- Horizontal scrollable ticker showing: "📈 Python +47% Rajasthan · 📈 Solar Tech +38% MP · 📉 Data Entry -43% Rajasthan · 📈 CNC Operation +29% Maharashtra"
- Data from `skill_demand_data` table, 3 EMERGING + 3 DECLINING per state
- Label: *"Live skill demand — updated weekly"*
- This is the "intelligence proof" — show AI working before any login

**Three Category Cards** (side by side on desktop, stacked on mobile):

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  🎯            │  │  🔧             │  │  🏛️             │
│  Main kaam      │  │  Mazdoor /      │  │  Sarkar /       │
│  dhundhna       │  │  Blue Collar    │  │  Government     │
│  chahta hoon    │  │                 │  │                 │
│                 │  │  Koi form       │  │  Analytics &    │
│  Job Seeker     │  │  nahi, sirf     │  │  Policy        │  Professional   │  │  tasveer tap   │  │  Dashboard      │
│  UI             │  │  karo           │  │                 │
│                 │  │                 │  │                 │
│  [Shuru karo]   │  │  [Shuru karo]   │  │  [Login karo]   │
│  Navy Blue      │  │  Green          │  │  Purple         │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Colors:**
- Job Seeker card: border `#2563EB`, button `#2563EB`
- Blue Collar card: border `#059669`, button `#059669`
- Government card: border `#7C3AED`, button `#7C3AED`

**On card click:** Store selected category in Zustand (`useAppStore.setCategory()`), then navigate:
- Job Seeker → `/onboarding` (AI profile creation)
- Blue Collar → `/simple/onboarding` (picture tap profile builder)
- Government → `/govt/login`

**Bottom of landing:** Small links — "Livelihood Help (no login)" → `/help`

---

## STEP 3 — AUTH LAYER (Phone OTP via Supabase)

**All three platforms use phone OTP — no passwords.**

### Job Seeker Auth flow:
```
/login  →  Enter mobile number
        →  OTP sent (Supabase Auth)
        →  Enter OTP
        →  If new user → /onboarding (AI profile creation)
        →  If existing user → /dashboard
```

### Blue Collar Auth flow:
```
/simple/onboarding  →  Picture tap profile builder (5 steps)
                    →  At the end: "Number save karo?" 
                    →  Optional OTP — can skip and still see results
                    →  If OTP given → profile saved to Supabase
                    →  If skipped → session only (localStorage)
```

### Govt Auth flow:
```
/govt/login  →  Email + password (admin-created accounts only)
             →  Supabase Auth
             →  → /govt/dashboard
```

---

## STEP 4 — BLUE COLLAR ONBOARDING (Picture Tap + AI)

**Route:** `/simple/onboarding`  
**File:** `src/pages/bluecollar/Onboarding.jsx`

This is the most innovative part of the platform. Build exactly as described.

### Layout (two-column):
```
┌──────────────────────────────┬──────────────────┐
│  LEFT: Conversation          │  RIGHT: Profile  │
│                              │  Card (live)     │
│  🤖 Namaste! Main aapki     │                  │
│     profile banaoonga.       │  [Profile builds │
│     Sirf tasveer tap karo!  │   here real-time]│
│                              │                  │
│  🤖 Aap kya kaam karte ho?  │  Progress ring   │
│                              │  fills up with   │
│  [Picture Grid — 12 cards]  │  each answer     │
│                              │                  │
│  🔊 Sawaal sunaiye  |  🎙   │                  │
└──────────────────────────────┴──────────────────┘
```

### 5 Steps:

**Step 1 — Kaam (job):**
12 picture cards in 4×3 grid:
Mazdoor 🏗️ | Rasoi 🍳 | Driver 🚗 | Darzi 🧵 | Safai 🧹 | Dukaan 🛒 | Security 💂 | Khet 🌾 | Mistri 🔧 | Painter 🎨 | Ghar ka kaam 🏠 | Kuch aur ✏️

**Step 2 — Jagah (state):**
12 state cards with emoji: Rajasthan 🏜️ | Bihar 🌊 | UP 🕌 | Maharashtra 🌆 | MP 🌳 | Gujarat 🏭 | Jharkhand ⛏️ | Odisha 🌊 | WB 🐯 | Delhi 🏛️ | Punjab 🌾 | Koi aur 📍

**Step 3 — Kamaai (income):**
6 cards: ₹0–5K 😔 | ₹5–8K 😐 | ₹8–12K 🙂 | ₹12–18K 😊 | ₹18–25K 😄 | ₹25K+ 🤩

**Step 4 — Padhai (education):**
6 cards: Padha nahi 📵 | 5th ✏️ | 8th 📓 | 10th 📗 | 12th 📘 | ITI/Diploma 🎓

**Step 5 — Sapna (goal):**
6 cards: Naukri chahiye 💼 | Business shuru 🏪 | Paisa badhao 💰 | Shehar mein kaam 🌆 | Online becho 📱 | Kuch seekhna 📚

### Input methods per step:
- Primary: tap picture card
- Secondary: "🔊 Sawaal sunaiye" button → Web Speech API reads question in hi-IN
- Tertiary: "Kuch aur" card → opens inline text field + 🎙 mic button → Web Speech API records answer

### Right panel — Live Profile Card:
- Dark card (`#0F172A` background)
- Each answered field slides in as an animated row (0.4s ease)
- SVG circular progress ring fills as steps complete
- Shows percentage in center of ring
- On Step 5 completion → ring turns fully green, "🎉 Profile tayyar!" message

### After Step 5 — Instant Results:
Do NOT navigate away. Show results in left panel as AI chat bubble:

```
🤖 "Bahut badhiya Savitri ji! Aapke sapne 'Business shuru karna'
    ke liye yeh yojanaein mil sakti hain:"

[MUDRA Loan — Rs 50,000 tak ✓]
[Udyam Registration — Free ✓]  
[PM SVANidhi — Rs 10,000 tak ✓]

[💼 Kaam Dhundo]  [🏛️ Yojana Dekho]
```

Then: "Apna number save karein taaki aap wapas aa sakein?"
→ Phone number field + OTP → saves profile to Supabase → navigates to `/simple/dashboard`
→ "Abhi nahi" link → session-only, navigates to `/simple/dashboard`

---

## STEP 5 — JOB SEEKER ONBOARDING (AI Conversation)

**Route:** `/onboarding`  
**File:** `src/pages/jobseeker/Onboarding.jsx`

### Concept:
After phone OTP, new job seeker users go through a 3-part AI-assisted onboarding. NOT a form. A conversation. Claude asks questions in a chat interface, user answers.

### Part 1 — Basic Info (Form, quick):
Collected as a clean 3-field form (not chat):
- Name (text)
- Age (number)  
- District (dropdown — seeded list)

One page, one "Aage badhein →" button.

### Part 2 — Skill Discovery (AI Conversation):
**Route:** `/onboarding/skills`

Chat interface. Claude opens with:
> *"Namaste [Name]! Main aapki skills dhundhne mein help karoonga. Pehla sawaal — aap abhi kya kaam karte ho? Kitne saal se kar rahe ho?"*

User types or speaks (🎙 mic button on input). Claude asks 4-5 follow-up questions to extract:
- Current job + years
- Education
- Any courses done
- Specific tools/software used
- Monthly income range

**Claude system prompt for this conversation:**
```
You are KaushalAI's skill discovery assistant. Your job is to have a friendly conversation 
in Hindi (or English if user replies in English) and extract the following information through 
natural questions — NOT a form:
1. Current job title and years of experience
2. Education level
3. Any skills or tools they use regularly (Excel, Tally, machines, etc.)
4. Any training or certifications done
5. Monthly income range
6. Target role or dream job (if they know)

Ask ONE question at a time. Be warm and encouraging. When you have enough information 
(usually 4-6 exchanges), respond ONLY with a JSON object like this and nothing else:
{
  "complete": true,
  "profile": {
    "current_job": "...",
    "years_experience": 3,
    "education_level": "10th Pass",
    "skills": ["Microsoft Excel", "Hindi Typing"],
    "monthly_income_range": "8000-12000",
    "target_role": "Data Analyst"
  }
}
Until you have enough info, respond conversationally. Never show the JSON until complete=true.
```

Frontend polls every Claude response for `"complete": true`. When found, extract JSON, save to Supabase `profiles` table, navigate to Part 3.

### Part 3 — Analysis Loading:
**Route:** `/onboarding/analyzing`

Full-screen animation. Show:
```
Aapki profile analyze ho rahi hai...

✓ Skills normalize ho gayi    (0.5s)
✓ Skill Genome check hua      (1.0s)  
✓ District job data loaded    (1.5s)
✓ Career matches mil gaye     (2.0s)
✓ Yojanaein match ho gayi     (2.5s)
⟳ Roadmap ban raha hai...     (ongoing)
```

While this plays, call `POST /api/analysis/run` which:
1. Calls Claude with full profile → career matches JSON
2. Calls Claude again → roadmap JSON
3. Runs scheme matcher function
4. Saves all to Supabase

On completion → navigate to `/dashboard`

---

## STEP 6 — JOB SEEKER PLATFORM

**Base route:** `/`  (after login)  
**Theme:** Navy Blue (`#2563EB`)  
**Font:** Professional, clean (Inter)

### Navigation (left sidebar on desktop, bottom tabs on mobile):
```
🏠 Dashboard
📊 Analysis
🗺️  Career Compass
📚 Roadmap
💼 Jobs
🏛️  Yojanaein
❤️  Health Score
💬 AI Counselor
```

---

### Screen 6.1 — Dashboard `/dashboard`

**Top section:**
- Greeting: "Namaste, Raju! 👋"
- Career Health Score — large circular gauge (0–100)
  - Color: Red < 40 / Orange 40–60 / Yellow 60–80 / Green > 80
  - Subtitle: "42/100 — Medium Risk"
- 3 stat cards: Top Match % | Roadmap Progress | Active Applications

**Middle section:**
- "Aaj ki khaas baat" — one highlighted insight from AI
  e.g., *"Data Entry jobs in Jaipur down 43% this year. Your SQL gap is the #1 blocker. Start this week."*
- Roadmap progress widget — current week, current module, % complete

**Bottom section:**
- Top 3 job matches (cards with match %)
- Top 2 matched schemes (chips with "Enroll karo" button)

**Floating button:** 💬 AI Counselor (bottom-right, always visible)

---

### Screen 6.2 — Skill Analysis `/analysis`

**Sub-tabs:** Overview | Career Matches | Skill Gaps | Latent Skills

**Career Matches tab:**
Each match is a card:
```
┌─────────────────────────────────────────────────────┐
│  Data Analyst                        85% match       │
│  DataSpark Analytics, Jaipur                        │
│  Today: ₹18K/mo  →  1yr: ₹24K  →  3yr: ₹38K       │
│  Risk: 🟡 Medium (22% automation)                   │
│  Missing: SQL, Power BI              ⏱ 10 weeks     │
│  [Roadmap dekho]        [Jobs dekho]                 │
└─────────────────────────────────────────────────────┘
```

**Skill Gaps tab:**
Table with columns: Skill | Demand | Salary Impact | Time to Learn | Trajectory
Color-code trajectory: 🟢 EMERGING | 🔵 RISING | ⚪ STABLE | 🟡 DECLINING | 🔴 DYING

**Latent Skills tab:**
```
✨ Hidden skill found via Skill Genome:

  Excel (you have) → SQL (you need)
  Transfer coefficient: 0.55
  You save: 5 weeks of learning
  "Aapko SQL Week 1 se nahi, Week 3 se start karna hai"
```

---

### Screen 6.3 — Career Compass `/compass`

Left side: 3–5 career path cards (toggle: Fastest | Highest Earning | Lowest Risk)
Right side: Salary GPS — enter target income → shows which paths reach it and in how many months

Career path card:
```
Data Analyst
₹18K now → ₹24K (1yr) → ₹38K (3yr) → ₹65K (5yr)
Automation risk: 22% 🟡
Open jobs in Jaipur: 34
Time to ready: 10 weeks
PMKVY funds this training ✓
```

---

### Screen 6.4 — Learning Roadmap `/roadmap`

**Top:** Target career + overall progress bar + weeks remaining

**Week-by-week accordion:**
```
Week 1–2: SQL Basics                    ✅ Complete
  └ NPTEL SQL Course (8 hrs)
  └ Exercise: Create your first database

Week 3–4: SQL Intermediate              📍 Current
  └ YouTube: Apna College SQL Hindi (6 hrs)
  └ Exercise: Analyze a dataset

Week 5–6: Power BI Introduction         🔒 Locked
  └ Microsoft Learn: Power BI (free)
  └ Exercise: Build a sales dashboard
```

**Skill Genome shortcut banner** (if applicable):
```
⚡ Genome Shortcut Active
Because you know Excel, your SQL journey starts at Week 3, not Week 1.
You saved 5 weeks.
```

Mark module complete button → updates `progress_percentage` in Supabase → WhatsApp nudge triggered if 48hrs inactive.

---

### Screen 6.5 — Regional Jobs `/jobs`

Filters: District | Salary Range | Job Type | Walk-in Only

Job card:
```
Data Analyst                             85% match
DataSpark Analytics · Jaipur · ₹18,000/mo
Required: SQL, Power BI  |  You have: Excel ✓, Typing ✓
Missing: SQL (Week 4 of your roadmap), Power BI (Week 7)
⏱ Ready in: 6 weeks
[Apply]   [Save]
```

Walk-in jobs get a special badge:
```
🚶 WALK-IN DRIVE
Date: March 15 | Venue: Hotel Clarks, Jaipur
No interview — show up and get assessed
[Notify me]
```

---

### Screen 6.6 — Yojanaein (Schemes) `/schemes`

**Eligibility-matched, sorted by benefit value.**

Scheme card:
```
PMKVY — Pradhan Mantri Kaushal Vikas Yojana
Ministry of Skill Development
────────────────────────────────
✓ You qualify because:
  • Age 18–35 ✓
  • Class 10 pass ✓
  • Income below ₹2L/yr ✓
  • Jaipur district covered ✓
────────────────────────────────
Benefit: Free 3-month training + ₹8,000 stipend
⚠️ Deadline: March 31, 2026 — 22 days left
[Enrollment guide dekho]   [Nearest center]
```

---

### Screen 6.7 — Career Health Score `/health`

Large animated gauge (0–100).

5 component breakdown:
```
Skill Demand        8/25  🔴  Data Entry declining in district
Skill Diversity     10/20 🟡  Only 2 marketable skills
Automation Risk     12/25 🟡  High-risk job profile  
Salary vs Median    7/15  🔴  31% below market median
Regional Demand     5/15  🔴  Limited local demand
─────────────────────────────
TOTAL               42/100
```

Personalized action to improve each component (from Claude).

---

## STEP 7 — BLUE COLLAR PLATFORM

**Base route:** `/simple/`  
**Theme:** Green (`#059669`)  
**Rules:** 18px+ font. 44px+ touch targets. One action per screen. Icon + Hindi label always. No English-only labels.

### Navigation (4 big bottom buttons):
```
💼 Kaam      🏛️ Yojana      📚 Seekho      🏪 Business
Dhundo       Pao            Kuch           Help
```

---

### Screen 7.1 — Home `/simple/dashboard`

Large greeting: "Namaste, Savitri ji! 🙏"

4 large action cards (tap to navigate):
```
┌─────────────┐  ┌─────────────┐
│  💼          │  │  🏛️          │
│  Kaam        │  │  Yojana      │
│  Dhundo      │  │  Pao         │
└─────────────┘  └─────────────┘
┌─────────────┐  ┌─────────────┐
│  📚          │  │  🏪          │
│  Kuch        │  │  Business    │
│  Seekho      │  │  Help        │
└─────────────┘  └─────────────┘
```

Large floating button: "💬 Salahkar se baat karo"

---

### Screen 7.2 — Job Search `/simple/jobs`

Large search: "Aap kaun sa kaam dhundhte hain?"
Mic button prominent.

Results as large cards:
```
Factory Helper
Patna · ₹12,000/mo · 2.3km door
[Apply karo]
```

Walk-in badge: "🚶 Walk-in — kal aao"

---

### Screen 7.3 — Schemes `/simple/schemes`

Large scheme cards in simple Hindi. No jargon.

```
MUDRA Loan
₹50,000 tak ka loan
Koi guarantee nahi chahiye
[Kaise milega?]
```

---

### Screen 7.4 — AI Counselor `/simple/chat`

Full-screen chat on mobile.
Large text (18px).
Big mic button (primary input).
4 suggested Hindi prompt chips always visible.

System prompt for blue collar chat:
```
You are Savitri's personal Hindi career guide on KaushalAI.
Her profile: [inject full profile JSON]
Speak ONLY in simple, colloquial Hindi. Like a helpful neighbor, not a government officer.
Max 3 sentences per reply. Never use English words except numbers.
Never suggest paid courses. Only free resources and govt schemes.
If she asks about business: guide her toward MUDRA, Udyam, ONDC.
If she asks about jobs: reference jobs in her district (Patna).
```

---

### Screen 7.5 — Business Help `/help`

Static content, no login needed. Simple Hindi cards:
- Udyam Registration kaise karein (8 steps with images)
- MUDRA Loan ke liye kya chahiye (document checklist)
- UPI kaise use karein (interactive mock)
- ONDC pe becho (step guide)
- Worker rights (minimum wage by state)
- GST eligibility check (3 yes/no questions)

---

## STEP 8 — GOVERNMENT PORTAL

**Base route:** `/govt/`  
**Theme:** Purple (`#7C3AED`)  
**Audience:** District Collectors, Skill Mission officers  
**Login:** Email + password (Supabase Auth, admin-created accounts)

---

### Screen 8.1 — Dashboard `/govt/dashboard`

**Layout:** Left sidebar nav + main content + right AI panel (always visible)

**6 Dashboard Panels:**

**Panel 1 — Live Training Overview**
```
Active Enrollments Today:  847  (+12 since morning)
Completions This Month:    234
Dropouts This Month:        43  ← Investigate
Placement Rate:           67.3%

Funnel: Enrolled 847 → Completed 234 → Placed 157
```

**Panel 2 — Skill Gap Heatmap**
Leaflet.js map of Nagpur district blocks. Color = shortage severity.
Red = CRITICAL | Yellow = MODERATE | Green = BALANCED
Click any block → modal showing top 5 skills in shortage + numbers.

**Panel 3 — 6-Month Forecast**
```
CNC Operators · Nagpur · Q3 2026
Demand:  340  |  Supply: 180  |  GAP: 160  ← CRITICAL
─────────────────────────────────────────────
Action:  Launch 2 PMKVY batches by August
Cost:    ₹28 Lakh
Inaction cost: ₹4.2 Crore (lost productivity + retraining)
[Draft SMS Campaign]  [Download Report]
```

**Panel 4 — Training Center Leaderboard**
Table: Center Name | Placement % | Completion % | Avg Salary | Rank
Sortable. Color-code red for centers below district average.

**Panel 5 — Scheme Enrollment Tracker**
```
PMKVY:
  Eligible: 4,230  |  Enrolled: 3,300  |  Gap: 930
  [Send SMS to 930 un-enrolled citizens]  ← One click

DDU-GKY:
  Eligible: 780   |  Enrolled: 440   |  Gap: 340
  [Send SMS to 340]
```

**Panel 6 — Economic Impact Calculator**
Input: Training batches × cost × expected placement rate
Output: Total investment | Expected placements | Salary uplift | 12-month ROI | ROI multiple

---

### Screen 8.2 — AI Policy Panel (right sidebar, always visible)

Always-visible right sidebar, 320px width.

Pre-loaded context: Nagpur district data, current enrollment numbers, forecast data.

"Ask about this data" button on every chart → pre-fills relevant question.

Sample questions:
- "CNC shortage kyun badh rahi hai Nagpur mein?"
- "Kaun sa center is quarter mein best perform kar raha hai?"
- "PMKVY ke liye Rs 50L ka budget kaise justify karoon?"
- "Next 6 months mein kaun si skills mein gap aayega?"

System prompt for govt AI:
```
You are KaushalAI's policy AI for Ramesh IAS, District Collector of Nagpur.
You have access to this district data: [inject district_context JSON with all current numbers]
Give data-driven, specific answers. Always cite numbers. Be concise — 3-5 sentences.
Suggest concrete actions with costs and timelines. Respond in English.
```

---

## STEP 9 — SHARED AI COUNSELOR COMPONENT

**File:** `src/components/AIChatPanel.jsx`

This is used across all three platforms. Behavior changes based on `userType`.

### Props:
```js
<AIChatPanel
  userType="jobseeker"  // 'jobseeker' | 'bluecollar' | 'govt'
  user={profile}        // full profile object from Zustand store
  analysis={analysis}   // latest analysis object
  roadmap={roadmap}     // roadmap object
  isOpen={chatOpen}
  onClose={() => setChatOpen(false)}
/>
```

### Context bar (top of chat panel):
Shows clickable chips based on user data:
- Job Seeker: Health Score chip | Roadmap % chip | Top Job Match chip
- Blue Collar: Schemes eligible chip | Nearest job chip
- Govt: Critical gaps chip | Forecast chip

Clicking any chip sends a pre-formed question.

### Message format:
- AI messages: left-aligned, white bubble, light border
- User messages: right-aligned, theme-colored bubble
- Below AI messages: action buttons extracted from response (e.g., "View Roadmap →", "Enroll in PMKVY →")
- Typing indicator: 3 animated dots during Claude response

### Voice input:
🎙 button on input bar → Web Speech API → `lang: hi-IN` → auto-fills input on result

### System prompt builder:
```js
function buildSystemPrompt(userType, user, analysis, roadmap) {
  const context = {
    profile: user,
    latest_analysis: analysis,
    roadmap_status: roadmap,
  };
  
  if (userType === 'jobseeker') {
    return `You are KaushalAI's personal career counselor for ${user.name}.
    Full context: ${JSON.stringify(context)}
    Rules: Always personalized. Never generic. Reference real skill names, real job titles, real schemes.
    3-5 sentences unless more detail asked. Hindi if asked in Hindi, English if English.
    Never suggest paid courses. Free resources only (SWAYAM, NPTEL, YouTube).`;
  }
  
  if (userType === 'bluecollar') {
    return `Tu KaushalAI ka helper hai ${user.name} ke liye.
    Profile: ${JSON.stringify(context)}
    Rules: Bilkul simple Hindi. 3 sentences max. Koi English nahi. 
    Koi paid course nahi. Sirf PMKVY, MUDRA, Udyam jaise free resources.`;
  }
  
  if (userType === 'govt') {
    return `You are KaushalAI's policy AI for ${user.name}, District Collector of ${user.district}.
    District data: ${JSON.stringify(context)}
    Rules: Data-driven. Cite specific numbers. Suggest concrete actions with costs. English only.`;
  }
}
```

### API call:
Direct frontend-to-Claude API call (CORS allowed):
```js
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: buildSystemPrompt(userType, user, analysis, roadmap),
    messages: conversationHistory.slice(-10),
  })
});
```

---

## STEP 10 — BACKEND ROUTES (FastAPI)

### Auth routes:
```
POST /api/auth/send-otp      → Supabase Auth trigger OTP
POST /api/auth/verify-otp    → Verify + return session
```

### Profile routes:
```
POST /api/profile/create     → Save onboarding data to profiles table
GET  /api/profile/me         → Get full profile + analysis + roadmap
PATCH /api/profile/update    → Update specific fields
```

### Analysis routes:
```
POST /api/analysis/run       → Full Claude analysis pipeline
GET  /api/analysis/latest    → Latest analysis for user
```

Claude analysis pipeline in `claude_service.py`:
```python
async def run_full_analysis(profile: dict) -> dict:
    prompt = f"""
    Analyze this worker's profile and return ONLY valid JSON, no markdown:
    Profile: {json.dumps(profile)}
    
    Return this exact structure:
    {{
      "career_matches": [
        {{
          "career_title": "...",
          "match_percentage": 85,
          "missing_skills": ["SQL", "Power BI"],
          "salary_today": 18000,
          "salary_1_year": 24000,
          "salary_3_years": 38000,
          "automation_risk": 22,
          "open_jobs_in_district": 34,
          "months_to_ready": 10
        }}
      ],
      "skill_gaps": [
        {{
          "skill_name": "SQL",
          "demand_trajectory": "RISING",
          "salary_impact": 8000,
          "weeks_to_learn": 6
        }}
      ],
      "latent_skills": [
        {{
          "skill_name": "SQL Basics",
          "reason": "Excel → SQL transfer via Skill Genome",
          "transfer_coefficient": 0.55,
          "weeks_saved": 5
        }}
      ],
      "career_health_score": {{
        "overall_score": 42,
        "skill_demand_component": 8,
        "diversification_component": 10,
        "automation_risk_component": 12,
        "salary_vs_median_component": 7,
        "regional_demand_component": 5,
        "top_risks": ["Data Entry declining 43%", "Single-skill dependency"]
      }}
    }}
    """
    
    # Retry parser — 3 attempts
    for attempt in range(3):
        response = await call_claude(prompt)
        try:
            # Strip markdown fences
            clean = re.sub(r'```json|```', '', response).strip()
            # Find outermost {}
            start = clean.index('{')
            end = clean.rindex('}') + 1
            return json.loads(clean[start:end])
        except:
            if attempt == 2:
                raise ValueError("Claude returned invalid JSON after 3 attempts")
            continue
```

### Roadmap routes:
```
POST /api/roadmap/generate   → Claude generates week-by-week plan
GET  /api/roadmap/me         → Get user's current roadmap
PATCH /api/roadmap/progress  → Mark module complete, update %
```

### Jobs routes:
```
GET  /api/jobs               → Filtered by district, skill match %, walk-in flag
GET  /api/jobs/:id           → Single job details
POST /api/jobs/:id/apply     → Create application record
```

Job match % calculation:
```python
def calculate_match(user_skills: list, job_skills: list) -> int:
    if not job_skills: return 50
    matched = sum(1 for s in job_skills if s in user_skills)
    return int((matched / len(job_skills)) * 100)
```

### Schemes routes:
```
GET  /api/schemes/matched    → Run eligibility match for logged-in user
POST /api/schemes/:id/enroll → Mark as enrolled
```

Eligibility matching:
```python
def match_schemes(profile: dict, all_schemes: list) -> list:
    matches = []
    for scheme in all_schemes:
        criteria = scheme['eligibility_criteria_json']
        score = 0
        total = len(criteria)
        if criteria.get('age_min') and criteria.get('age_max'):
            if criteria['age_min'] <= profile['age'] <= criteria['age_max']:
                score += 1
        if criteria.get('education_levels'):
            if profile['education_level'] in criteria['education_levels']:
                score += 1
        if criteria.get('income_max'):
            user_max = int(profile['monthly_income_range'].split('-')[1]) * 12
            if user_max <= criteria['income_max']:
                score += 1
        pct = (score / total) * 100
        if pct >= 60:
            matches.append({**scheme, 'match_score': pct})
    return sorted(matches, key=lambda x: x['match_score'], reverse=True)
```

### Forecast routes (public):
```
GET  /api/forecast/futures?state=Rajasthan
     → Top 5 EMERGING + Top 5 DECLINING skills for state
     → Used for Skill Futures Index on landing page

GET  /api/forecast/gaps?district=Nagpur
     → District-level supply-demand gap forecast (govt only)
```

### Govt routes:
```
GET  /api/govt/dashboard     → All 6 panel data in one call
GET  /api/govt/heatmap       → Block-level shortage data for Leaflet
GET  /api/govt/centers       → Training center leaderboard
POST /api/govt/sms-campaign  → Trigger MSG91 SMS to un-enrolled citizens
POST /api/govt/impact-calc   → Economic ROI calculator
```

---

## STEP 11 — GLOBAL STATE (Zustand)

```js
// src/store/useAppStore.js
import { create } from 'zustand'

const useAppStore = create((set) => ({
  // Category selection
  category: null,  // 'jobseeker' | 'bluecollar' | 'govt'
  setCategory: (cat) => set({ category: cat }),

  // Auth
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),

  // Profile data
  profile: null,
  setProfile: (profile) => set({ profile }),

  // Analysis
  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),

  // Roadmap
  roadmap: null,
  setRoadmap: (roadmap) => set({ roadmap }),

  // Chat
  chatOpen: false,
  setChatOpen: (open) => set({ chatOpen: open }),
  chatHistory: [],
  addChatMessage: (msg) => set((state) => ({
    chatHistory: [...state.chatHistory, msg].slice(-20)
  })),
  clearChat: () => set({ chatHistory: [] }),
}))
```

---

## STEP 12 — ROUTING

```jsx
// src/router.jsx
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  // Public
  { path: '/', element: <Landing /> },
  { path: '/help', element: <LivelihoodHelp /> },
  { path: '/help/:topic', element: <HelpTopic /> },

  // Auth
  { path: '/login', element: <Login /> },
  { path: '/verify', element: <OTPVerify /> },

  // Job Seeker (protected)
  { path: '/onboarding', element: <JSOnboardingBasic /> },
  { path: '/onboarding/skills', element: <JSOnboardingSkills /> },
  { path: '/onboarding/analyzing', element: <JSAnalyzing /> },
  { path: '/dashboard', element: <JSDashboard /> },
  { path: '/analysis', element: <JSAnalysis /> },
  { path: '/compass', element: <JSCompass /> },
  { path: '/roadmap', element: <JSRoadmap /> },
  { path: '/jobs', element: <JSJobs /> },
  { path: '/schemes', element: <JSSchemes /> },
  { path: '/health', element: <JSHealth /> },
  { path: '/chat', element: <JSChat /> },

  // Blue Collar
  { path: '/simple', element: <BCHome /> },
  { path: '/simple/onboarding', element: <BCOnboarding /> },
  { path: '/simple/dashboard', element: <BCDashboard /> },
  { path: '/simple/jobs', element: <BCJobs /> },
  { path: '/simple/schemes', element: <BCSchemes /> },
  { path: '/simple/learn', element: <BCLearn /> },
  { path: '/simple/business', element: <BCBusiness /> },
  { path: '/simple/chat', element: <BCChat /> },

  // Government (protected, role-gated)
  { path: '/govt/login', element: <GovtLogin /> },
  { path: '/govt/dashboard', element: <GovtDashboard /> },
  { path: '/govt/forecast', element: <GovtForecast /> },
  { path: '/govt/centers', element: <GovtCenters /> },
  { path: '/govt/heatmap', element: <GovtHeatmap /> },
  { path: '/govt/schemes', element: <GovtSchemes /> },
  { path: '/govt/impact', element: <GovtImpact /> },
])
```

---

## STEP 13 — ENV VARIABLES

```env
# frontend/.env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_API_BASE=http://localhost:8000
VITE_ANTHROPIC_API_KEY=sk-ant-...

# backend/.env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGci...
ANTHROPIC_API_KEY=sk-ant-...
```

---

## STEP 14 — DEMO VERIFICATION CHECKLIST

Before demo, verify these 9 scenarios work end-to-end:

1. **Landing → Category Card click** → correct platform opens
2. **Blue Collar:** Tap 5 pictures in 2 min → profile card builds live → results show instantly
3. **Job Seeker:** AI conversation onboarding → skills extracted → analysis loading screen → dashboard loads
4. **Govt:** Email login → dashboard with all 6 panels → AI sidebar pre-loaded with district data
5. **Skill Futures Index** on landing page loads without login (Rajasthan data)
6. **Health Score gauge** shows correct color for score range
7. **Skill Genome shortcut banner** shows on roadmap if applicable (e.g., Excel → SQL)
8. **AI Chat panel** opens on any job seeker screen → Claude responds knowing user's name + skills + roadmap
9. **Walk-in badge** appears on walk-in jobs in job board

### Demo personas (seed these):
```
Raju — jobseeker — Jaipur — Data Entry → Data Analyst goal
  Health: 42 | Skills: Excel, Typing | Gaps: SQL, Power BI
  
Savitri — bluecollar — Patna — Pickle maker → Business goal
  Schemes: MUDRA, Udyam, SVANidhi eligible

Ramesh IAS — govt — Nagpur
  District alert: CNC shortage 160 workers by Q3 2026
```

---

## CRITICAL RULES — DO NOT SKIP

1. **Blue Collar platform:** 18px+ font. 44px+ touch targets. No form inputs except voice/text fallback. Every button: icon + Hindi label.

2. **Skill Futures Index** must load on landing page without any login. This is the "wow moment" for judges.

3. **AI analysis JSON parser must have 3 retries** with stricter prompt on each. Never crash on Claude output.

4. **Profile context must be injected into every Claude chat call.** User should never have to re-explain their situation.

5. **Blue Collar onboarding results appear in the same screen** (chat bubble format) — do NOT navigate to a new page.

6. **Government portal shows zero individual worker data.** All numbers are aggregated at district level.

7. **Never suggest paid courses** in any AI response. System prompts must explicitly forbid this.

8. **Govt AI sidebar is always visible** on govt screens — not a floating button, a permanent panel.

9. **Seed data must be loaded before demo.** `python seed/seed_all.py` populates all required tables.

10. **All three platforms use the same Supabase instance** — same jobs, schemes, and skill_demand_data tables — only the frontend experience differs.
