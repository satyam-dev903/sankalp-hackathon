# KaushalAI — Product Requirements Document
**Version:** MVP 1.0 | **Category:** AI-Powered Career Guidance & Upskilling | **March 2026**

---
(integrated supabase as proj named as kaushal AI 2 (prj id:notdvezebtdoolptzskp))
---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Our Solution](#2-our-solution)
3. [Target Users](#3-target-users)
4. [Core Philosophy](#4-core-philosophy)
5. [Features — Job Seeker Interface](#5-features--job-seeker-interface)
6. [Features — Blue Collar Interface](#6-features--blue-collar-interface)
7. [Features — Government Interface](#7-features--government-interface)
8. [Forecasting Engine](#8-forecasting-engine)
9. [Three Interfaces, One Backend](#9-three-interfaces-one-backend)
10. [Technical Architecture](#10-technical-architecture)
11. [Database Schema](#11-database-schema)
12. [API Endpoints](#12-api-endpoints)
13. [Skill Normalization & Skill Genome](#13-skill-normalization--skill-genome)
14. [Security & Privacy](#14-security--privacy)
15. [MVP Scope vs Future Scope](#15-mvp-scope-vs-future-scope)
16. [Success Metrics](#16-success-metrics)

---

## 1. Problem Statement

### Hackathon Category
**Category 2 — Skill Development**
> *"Develop an AI-powered skill and employability platform that can identify skill gaps, recommend relevant training, and connect people to real job opportunities in their region."*

### The Reality

India spends **Rs 4,000 crore annually** on skill training through PMKVY, DDU-GKY, ITIs, and related schemes. Despite this investment:

- **45.5%** of Indian youth are underemployed
- Only **4.7%** of the workforce is formally skilled — lowest among all G20 nations
- **500 million** blue-collar workers are invisible to every digital platform
- **Billions** in scheme benefits go unclaimed every year

The money is there. The workers are there. The jobs are there. Nothing connects them intelligently.

### Seven Root Causes

| # | Root Cause | Impact |
|---|---|---|
| 1 | Workers enroll in courses based on proximity, not market demand | Training wasted on declining skills |
| 2 | Training content updated every 2-3 years, market shifts monthly | Workers graduate into irrelevance |
| 3 | No platform trains for tomorrow's market — only today's | Skills peak before graduation |
| 4 | 500M blue-collar workers have no smartphone, no English, no access | Largest workforce segment ignored |
| 5 | Govt schemes go unclaimed — zero awareness, zero routing | Billions in benefits unused |
| 6 | MSMEs cannot find trained workers in their own district | Hyperlocal talent-job disconnect |
| 7 | Every platform profits from subscriptions/course sales, not placements | Business model misaligned with worker success |

### Three Specific User Problems

**Job Seekers** take random courses with no market guidance. They train for skills already declining by graduation. No salary forecast, no automation risk awareness, no personalized roadmap.

**Blue-Collar Workers** are completely invisible. Every platform assumes English + smartphone + internet. Walk-in drives — 80% of their hiring — have zero digital infrastructure. They pay agents 1-2 months salary as commission just to get a job.

**Government** spends crores on training but flies blind. Quarterly Excel reports. Three-month-old data. No forecasting. They react to skill shortages after economic damage is already done.

---

## 2. Our Solution

**KaushalAI** is India's first Career Operating System — an AI-powered platform that connects three sides of the skill economy in a single intelligent loop:

```
Worker trains → Gets placed → Data feeds forecast → Govt acts early → 
More batches launched → More workers trained → Better employer matches → 
Employer posts jobs → Better worker recommendations → Loop continues
```

### What We Built

- A **professional career intelligence platform** for job seekers
- A **WhatsApp + voice-first simple interface** for blue-collar workers  
- A **real-time analytics and forecasting dashboard** for government

Same backend. Same AI. Three completely different experiences.

### Problem Statement Alignment

| Requirement | Our Solution | Status |
|---|---|---|
| Map workforce skills to industry demand | Daily job scraping → Claude skill gap analysis per district | ✅ Exceeded |
| Help govt track training outcomes | Real-time dashboard + 6-month forecast | ✅ Exceeded |
| Guide youth toward in-demand careers | Career Compass + Salary GPS + Skill Futures Index | ✅ Met |
| Support blue-collar with digital tools | WhatsApp bot + USSD + Voice + Livelihood module | ✅ Exceeded |
| Reduce unemployment via data-driven dev | Forecasting + Roadmap + Pre-hire pipeline | ✅ Met |
| AI career guidance & skill recommendations | Claude API — core of every recommendation | ✅ Built |
| Personalized learning roadmaps | Week-by-week free resource plan — SWAYAM, NPTEL, YouTube | ✅ Built |
| Vocational & non-technical skill training | Business formalization, UPI, rights module for blue-collar | ✅ Built |

---

## 3. Target Users

### User 1 — Job Seeker / Youth

**Profile:** Age 18-35, 10th-12th pass or graduate, budget Android, WhatsApp user, Hindi primary, income below Rs 15,000/month.

**Persona — Raju Sharma:** 22 years old, Jaipur. Data entry helper, Rs 9,000/month. Completed 2 courses with zero job outcome. Doesn't know what to learn next. Cannot afford paid courses.

**Needs:** Know exactly which skill is missing. Get a free week-by-week plan. Understand what salary to expect. Find real jobs in his district.

---

### User 2 — Blue-Collar / Informal Worker

**Profile:** Age 20-50, 5th-10th pass or no formal education, daily wage or irregular income, may have basic keypad phone, Hindi or regional language only, income below Rs 10,000/month.

**Persona — Savitri Devi:** 35 years old, Patna. Domestic worker + home pickle maker. Rs 6,000/month irregular. Basic keypad phone. No smartphone, no English, no awareness of MUDRA or PMKVY.

**Needs:** Access from any phone. Know which govt schemes apply. Guidance to formalize business, get a loan, sell online. Know her worker rights.

---

### User 3 — Government / NGO

**Profile:** District collector, state skill development officer, PMKVY manager, NGO director. Laptop user, English + Hindi, responsible for training budgets and employment outcomes.

**Persona — Ramesh IAS:** District Collector, Nagpur. Annual training budget Rs 12 crore. Gets quarterly Excel reports. No real-time visibility. Gets shortage complaints from factory owners — always after the damage is done.

**Needs:** Real-time training and placement data. Training center performance rankings. Six-month forward forecast of skill shortages. Tool to reach eligible-but-not-enrolled citizens.

---

## 4. Core Philosophy

> *Every existing platform is built on one assumption: the user is already job-ready.*

Naukri assumes you have a resume. LinkedIn assumes you have a network. Coursera assumes you have money. Government portals assume you can read English forms.

**KaushalAI assumes the opposite. Most users are not ready yet — and that is not their fault.**

The platform's entire job is to close that gap — in the user's language, on their device, completely free.

---

## 5. Features — Job Seeker Interface

### 5.1 Authentication & Onboarding

Mobile OTP login — no email required. Five-step onboarding with voice input on every field.

- **Step 1:** Name, age, gender, state, district, pincode, language (Hindi/English)
- **Step 2:** Highest qualification from dropdown
- **Step 3:** Current job title, years experience, monthly income range
- **Step 4:** Skill multi-select from canonical list + **Beginner / Intermediate / Advanced** proficiency per skill
- **Step 5:** Target role, target income, timeline, open to relocation

> **Critical:** Step 4 proficiency ratings are passed directly to Claude. Without them, gap analysis accuracy drops significantly. This must not be skipped.

All UI labels in colloquial Hindi — not translated English.
- ❌ "Current professional designation"
- ✅ "Aap abhi kya kaam karte hain?"

---

### 5.2 AI Skill Gap Analyzer

The core feature. Triggered automatically after onboarding and manually re-runnable any time.

**How it works:**

1. Backend assembles prompt with: user profile, top 20 live job postings for target role in user's district, Skill Genome adjacency edges
2. Claude API call (claude-sonnet-4-6) with strict JSON-only system prompt
3. Response parser: strip markdown → validate fields → retry 3x → Redis fallback
4. Result cached in Redis (24hr TTL), stored in `skill_analyses` table

**Claude returns:**

```json
{
  "career_matches": [
    {
      "career_title": "Data Analyst",
      "match_percentage": 62,
      "missing_skills": ["SQL", "Power BI"],
      "salary_today": 22000,
      "salary_3_years": 45000,
      "automation_risk": 18,
      "open_jobs_in_district": 8,
      "months_to_ready": 4
    }
  ],
  "skill_gaps": [
    {
      "skill_name": "SQL",
      "demand_trajectory": "EMERGING",
      "salary_impact": 8000,
      "weeks_to_learn": 3
    }
  ],
  "latent_skills": [
    {
      "skill_name": "SQL Basics",
      "reason": "3 years daily Excel use implies data structuring ability",
      "transfer_coefficient": 0.55
    }
  ],
  "career_health_score": {
    "overall_score": 42,
    "skill_demand_component": 8,
    "diversification_component": 10,
    "automation_risk_component": 12,
    "salary_vs_median_component": 7,
    "regional_demand_component": 5,
    "top_risks": [
      "Data Entry declining 43% in Rajasthan",
      "Single-skill dependency",
      "Salary 31% below market median"
    ]
  }
}
```

**Results UI:**
- Career Health Score gauge (Red < 40 / Orange 40-60 / Yellow 60-80 / Green > 80)
- Career match cards with salary, automation risk badge, open jobs count
- Skill gaps with trajectory color coding (🟢 EMERGING → 🔴 DYING)
- Latent skills section showing learning time saved via Skill Genome

---

### 5.3 Career Compass + Salary GPS

**Career Compass:** 3-5 career paths with full data — today's salary, 1yr/3yr/5yr projection, automation risk, open jobs in district, months to ready, govt schemes that fund training for this career. Toggle between fastest to reach vs highest earning.

**Salary GPS:** User enters target monthly income (e.g. Rs 25,000). Platform shows all career paths that reach it, sorted by time to reach. Each path shows:
- Months to target salary
- Income ceiling (maximum typical salary before next transition)
- Automation risk score
- Traffic indicator (how many other users in district are on same path)

---

### 5.4 Personalized Learning Roadmap

Generated by second Claude API call with: current skills + proficiency, target career, Skill Genome shortcuts, resource library (500+ free resources from SWAYAM, NPTEL, YouTube, Kaggle tagged by skill/level/language).

**Skill Genome shortcut visible to user:**
> *"Because you know Excel, your SQL roadmap starts at Week 3 — not Week 1."*

**Roadmap output per week:**
- Skill being covered
- Specific resource (title, URL, platform, estimated hours)
- Practical exercise or mini-project
- Milestone every 3rd week

**Engagement:** WhatsApp nudge after 48hr inactivity — includes progress % and number of jobs unlocked on completion.

---

### 5.5 Government Scheme Auto-Matcher

Eligibility matching function runs on completion of onboarding against all active schemes in database.

**Matching logic:** Each scheme stored with eligibility JSON (age range, gender, education range, income max, employment status, sector, state). Match score = criteria matched / total criteria × 100. Schemes ≥ 60% shown, sorted by benefit value.

**Scheme card shows:**
- Key benefit in plain language
- 2-3 specific reasons user qualifies
- Countdown if deadline within 30 days
- Step-by-step enrollment guide with document checklist
- Nearest center with distance

**MVP schemes (15-20):** PMKVY, DDU-GKY, NAPS, MUDRA Shishu/Kishore/Tarun, PM SVANidhi, Udyam registration, Startup India, Ayushman Bharat, PM Suraksha Bima, PM Jeevan Jyoti Bima, e-Shram, BOCW, DigiLocker.

**Alerts:** WhatsApp message 7 days and 2 days before enrollment deadline.

---

### 5.6 Regional Job Board

**Data sources:** NCS portal daily scrape + employer-direct postings from KaushalAI employer portal.

**Job card shows:**
- GST-verified employer badge + star rating
- Mandatory salary range (no "as per industry")
- Required skills as color-coded pills — 🟢 have it / 🟠 in roadmap / ⬜ missing
- Match % as filled gauge
- Walk-in Drive badge with date and venue
- "Ready in X weeks" label (if qualifies within 8 weeks of current roadmap)
- Distance in km

**Match calculation:** (skills user has ÷ total required skills) × 100. Skills in active roadmap count as 40% of full match.

**Skill Futures Index widget** at top of job board — top 5 rising and top 5 declining skills in user's state. Also shown on public landing page with no login.

---

## 6. Features — Blue Collar Interface

### 6.1 Access Layers

| Layer | Device | Technology | MVP Status |
|---|---|---|---|
| WhatsApp Bot | Any phone | Meta WABA API | ✅ MVP |
| Voice Web App | Android | Web Speech API + Bhashini | ✅ MVP |
| NGO / CSC Assisted | No tech needed | Operator-assisted web | ✅ MVP |
| USSD *14567# | Keypad phone, zero internet | Telecom + TRAI | 🔜 Future |

### 6.2 Blue Collar Profile Builder — "Baat Karo + Tasveer Tap Karo"

#### The Problem with Forms
A standard onboarding form is a literacy test. Blue collar workers cannot fill dropdowns, read English labels, or navigate multi-step forms. Every existing platform silently filters them out at Step 1.

KaushalAI's solution: **no form, no typing, no English — zero barriers.**

---

#### How It Works

The profile builder is a two-panel conversational interface:

**Left Panel — Conversation Flow**
An AI character (KaushalAI bot) asks one question at a time in simple Hindi, displayed as a chat bubble. Below it, the answer is not a text field — it is a **4×3 grid of large picture cards**, each with a big emoji and a 2-word Hindi label.

The user taps one picture. The answer registers as a chat bubble on their side. The AI immediately asks the next question. No "Next" button. No "Submit". Just tap and go.

**Right Panel — Live Profile Card**
As each answer is tapped, a card on the right side of the screen animates into existence — the profile builds itself visually, live, in real time. A circular progress ring fills up with each step. Workers see their profile forming with their own eyes as they answer.

---

#### Three Input Methods (User Chooses)

| Method | How | When Used |
|---|---|---|
| **Picture Tap** | Tap big emoji card | Primary method — fastest, zero literacy needed |
| **Voice** | Tap 🎙 mic button, speak Hindi | When their job/situation doesn't match any picture |
| **Type** | Text field with Hindi keyboard | Fallback for users comfortable with typing |

A "🔊 Sawaal sunaiye" (Listen to question) button reads every question aloud using Web Speech API — for users who can speak and understand Hindi but cannot read it.

---

#### 5 Questions — 2 Minutes — Full Profile

| Step | Question | Options |
|---|---|---|
| 1 | Aap kya kaam karte ho? | 12 picture cards: Mazdoor 🏗️, Rasoi 🍳, Driver 🚗, Darzi 🧵, Safai 🧹, Dukaan 🛒, Security 💂, Khet 🌾, Mistri 🔧, Painter 🎨, Ghar ka kaam 🏠, Kuch aur ✏️ |
| 2 | Aap kahan rehte ho? | 12 state picture cards with recognizable regional emoji |
| 3 | Mahine mein kitna kamate ho? | 6 income range cards with emoji expressing emotion (😔 → 🤩) |
| 4 | Aapki padhai kitni hai? | 6 education level cards |
| 5 | Aap kya karna chahte ho? | 6 goal cards: Naukri chahiye 💼, Business shuru 🏪, Paisa badhao 💰, Shehar mein kaam 🌆, Online becho 📱, Kuch seekhna 📚 |

After Step 5: instant results — matched schemes, recommended next action, job board filtered for their profile. No waiting, no loading spinner, no extra steps.

---

#### Immediate Results After Profile Completion

Based on the worker's **goal** (Step 5), the platform immediately shows:

| Goal | Schemes Shown | Action Shown |
|---|---|---|
| Naukri chahiye | PMKVY, NAPS | Job board filtered by their work type and district |
| Business shuru | MUDRA Loan, Udyam Registration, PM SVANidhi | Business formalization step-by-step guide |
| Paisa badhao | PMKVY skill upgrade, e-Shram | Skill upgrade roadmap for their trade |
| Shehar mein kaam | DDU-GKY (free training + hostel), PMKVY | City job listings with relocation support info |
| Online becho | ONDC Seller Registration, Udyam | ONDC product listing setup guide |
| Kuch seekhna | PMKVY, SWAYAM free courses | Free learning path for their trade |

---

#### UI Specifications

- Font size: 18px minimum throughout
- Picture cards: 80px × 80px minimum touch target
- Emoji: 32px, centered on card
- Hindi label: 11-12px, bold, below emoji
- Card tap feedback: green border flash + scale-up animation (0.15s)
- Answer bubble: green background, right-aligned, animates in from right
- AI question bubble: white, left-aligned, animates in from left
- Profile card right panel: dark background, each entry slides in from left with green checkmark
- Progress ring: SVG circle, fills with each step, percentage shown in center
- "Kuch aur" card opens inline voice+text input without page navigation

---

#### Route
```
/simple/onboarding     → Blue Collar Profile Builder (5-step)
```
Accessible without login. Profile saved to Supabase after completion. OTP login (mobile number) offered at end — not required to see results.

---

#### Why This Is Genuinely Innovative

Every other platform: **User fills form → platform processes → user gets result.**

KaushalAI: **User taps picture → profile builds live in front of them → result appears instantly.**

The worker is not filling out a form for a system. The system is learning from them, visibly, in real time. The experience feels like talking to someone who is listening — not submitting paperwork to an office.

> *Savitri did not read a single English word. She did not fill a single form. She tapped 5 pictures in 2 minutes. Her MUDRA loan eligibility was shown immediately. This is the first digital platform that worked for her — not against her.*

---

### 6.3 WhatsApp Bot

User sends any message in Hindi. Claude handles natural language. Bot responds with numbered menu.

**Sample flow:**
```
User: "job chahiye Patna mein"
Bot:  Calling live job data...
      1. Factory Helper — Patna — Rs 12,000 — 2.3km
      2. Cleaning Staff — Patna — Rs 9,500 — 4km
      3. Packaging Worker — Patna — Rs 11,000 — 1.8km
      
      Type number to apply or 'aur dikhao' for more
```

**Other commands:** "yojana chahiye" → scheme match | "business help" → livelihood module | "kya seekhoon" → career guide.

> WABA API runs in sandbox mode for hackathon demo. Messages delivered to pre-verified test numbers only. Production WABA registration takes 2-3 weeks post-hackathon.

### 6.4 Simple Web App UI Rules

- One action per screen — never two
- Minimum 18px font size throughout
- Touch targets minimum 44×44px
- Every button has icon + Hindi text label — no icon-only buttons
- Voice microphone on every input field
- 4 main buttons: Kaam Dhundo / Yojana Pao / Kuch Seekho / Business Help
- No forms, no dropdowns — only large buttons and voice

### 6.5 Livelihood Module (No Login Required)

Accessible directly from landing page. Static content in colloquial Hindi.

| Topic | Content |
|---|---|
| Udyam / MSME Registration | 8-step guide with screenshots |
| MUDRA Loan | Shishu/Kishore/Tarun categories, documents, nearest bank |
| UPI Training | 5 interactive mock transaction simulations, zero real money |
| ONDC / Flipkart Samarth | How to list products and sell online |
| Worker Rights | Min wage by state, PF check, BOCW registration, grievance filing |
| GST Eligibility | 3 questions, instant answer |

---

## 7. Features — Government Interface

### 7.1 Access

Email + password login. Admin-created accounts only. Role scoped to district or state. No individual worker data visible — all data aggregated at district level.

### 7.2 Dashboard Panels

**Panel 1 — Live Training Overview**
Active enrollments today by trade and center. Completions and dropouts this month. Enrollment → Completed → Placed funnel with conversion rates.

**Panel 2 — Skill Gap Heatmap**
Leaflet.js district map colored by skill shortage severity per block. Red = critical, yellow = moderate, green = balanced. Click any block → top 5 skills in shortage with supply vs demand numbers.

**Panel 3 — 6-Month Supply-Demand Forecast**
Per trade per district: forecasted job demand, projected trained worker supply, gap, severity rating. For Critical gaps: recommended action, estimated intervention cost, estimated cost of inaction.

Example output:
> *CNC Operators — Nagpur — Q3 2026 — Demand: 340 — Supply: 180 — GAP: 160 — CRITICAL*
> *Recommended: Launch 2 PMKVY batches by August — Cost: Rs 28L — Inaction cost: Rs 4.2Cr*

**Panel 4 — Training Center Leaderboard**
Centers ranked by placement rate, completion rate, average salary of placed workers. Evidence-based — not enrollment-based. Shows which centers to fund more and which to investigate.

**Panel 5 — Scheme Enrollment Tracker**
For each active scheme: eligible citizens count, enrolled count, gap. One-click SMS campaign tool to reach all eligible-but-not-enrolled citizens via MSG91.

**Panel 6 — Economic Impact Calculator**
For any proposed training intervention: investment required, expected placements, salary improvement total, 12-month economic value generated, ROI as a multiple. Justifies every budget request.

---

## 8. Feature — AI Career Counselor (All Users)

### 8.1 What It Is

A persistent AI chat panel available on every screen after login. It is not a generic chatbot. It is a career counselor that already knows everything about the user — their skills, education, experience, current roadmap progress, job matches, scheme eligibility, and career health score — and responds with fully personalized advice.

The user never has to explain their background. The AI already knows it.

**For Job Seekers:** "Mujhe Data Analyst banana hai, kahan se shuru karoon?" — AI responds knowing Raju's exact skill gaps, his SQL shortcut via Excel, his PMKVY eligibility, and which Jaipur jobs are waiting.

**For Blue Collar:** "Mera pickle business kaise badhaoon?" — AI responds knowing Savitri's education, income level, MUDRA eligibility, and guides her in simple Hindi.

**For Government:** "Nagpur mein CNC shortage kyun badh rahi hai?" — AI responds with district-specific data, center performance context, and actionable policy recommendations.

---

### 8.2 Where It Lives

- **Job Seeker & Blue Collar:** Floating chat button (bottom-right corner) on every screen after login. Clicking opens a slide-in chat panel that overlays the current page without navigating away.
- **Blue Collar (Simple UI):** Large "Salahkar se baat karo" (Talk to counselor) button on the home screen. Opens full-screen chat on mobile.
- **Government Dashboard:** Dedicated "Ask AI" panel in the right sidebar. Pre-loaded with district context.

---

### 8.3 How It Works (Technical)

Every Claude API call for the chat panel includes a **full user context object** assembled from the database:

```json
{
  "user_profile": {
    "name": "Raju Sharma",
    "age": 22,
    "district": "Jaipur",
    "education": "10th Pass",
    "current_job": "Data Entry Helper",
    "monthly_income": 9000,
    "skills": [
      {"skill": "Microsoft Excel", "proficiency": "Intermediate"},
      {"skill": "Hindi Typing", "proficiency": "Advanced"}
    ],
    "target_role": "Data Analyst",
    "target_income": 22000,
    "timeline_months": 6
  },
  "latest_analysis": {
    "career_health_score": 42,
    "top_career_match": "Data Analyst at 62%",
    "top_skill_gaps": ["SQL", "Power BI"],
    "latent_skills": ["SQL Basics via Excel transfer"],
    "top_risks": ["Data Entry declining 43% in Rajasthan"]
  },
  "roadmap_status": {
    "target_career": "Data Analyst",
    "progress_percentage": 18,
    "current_week": 2,
    "current_module": "NPTEL SQL Basics",
    "weeks_remaining": 10
  },
  "matched_schemes": ["PMKVY — eligible, not enrolled"],
  "top_job_matches": [
    {"title": "Data Analyst", "company": "DataSpark Analytics", "match": 85, "salary": 18000}
  ],
  "district_skill_trends": {
    "EMERGING": ["Python", "Data Analytics"],
    "DECLINING": ["Basic Data Entry", "Manual Tally"]
  }
}
```

This context is injected into every message's system prompt so Claude always responds with full awareness of the user's situation.

**System prompt:**
> "You are KaushalAI's personal career counselor. You know everything about this user — their background, skills, goals, current roadmap progress, job matches, and scheme eligibility. Always respond with personalized advice specific to their situation. Never give generic answers. If the user asks in Hindi, respond in simple Hindi. If in English, respond in English. Keep responses concise — 3-5 sentences unless more detail is specifically asked for. Never suggest paid courses. Always reference their actual data (real skill names, real jobs in their district, real schemes they qualify for)."

**Conversation history** is maintained in frontend state (Zustand) for the session. The last 10 messages are included in every API call to maintain context. History is not persisted to database in MVP.

---

### 8.4 What Users Can Ask

**Job Seekers ask things like:**
- "Mujhe kaunsi skill pehle seekhni chahiye?"
- "Data entry chhod ke Data Analyst kaise banoon?"
- "Mere liye PMKVY ka enrollment kaise karo?"
- "3 mahine mein kya possible hai mere liye?"
- "Yeh SQL course mujhe kitne time mein complete karna chahiye?"
- "Mere jaisi background wale log kya karte hain?"
- "Meri current job mein automation ka risk kitna hai?"

**Blue Collar users ask things like:**
- "Mera pickle business register kaise karoon?"
- "MUDRA loan ke liye kya documents chahiye?"
- "Paas mein kaunsa kaam available hai aaj?"
- "Mujhe kitna paisa milega agar main yeh course karoon?"
- "WhatsApp pe apna saman kaise bechoon?"

**Government users ask things like:**
- "Nagpur mein CNC shortage kyun badh rahi hai?"
- "Kaun sa training center best perform kar raha hai is quarter mein?"
- "PMKVY ke liye budget kaise justify karoon senior officers ko?"
- "Yeh district mein 6 months mein kaunsa skill shortage aayega?"
- "Enrollment campaign kab bhejni chahiye?"

---

### 8.5 Suggested Prompts (Shown in UI)

When chat is first opened, 4 suggested prompt chips are shown based on user's current state:

**For a user with a low health score:**
- "Mera score 42 kyun hai?" 
- "Sabse pehle kya karoon?"
- "PMKVY mein kaise enroll karoon?"
- "Aaj ke liye ek kaam bata do"

**For a user mid-roadmap:**
- "Main Week 2 mein hoon — aage kya hai?"
- "Yeh module mushkil lag raha hai"
- "Kab tak job mil sakti hai?"
- "Ek aur career option bata"

Suggested prompts update based on context every session.

---

### 8.6 UI Specifications

**Chat Panel (Job Seeker — Desktop):**
- Slide-in panel from right, width 380px, full height
- Header: "KaushalAI Salahkar" + user name + close button
- Context bar at top of chat (collapsed by default, expandable):
  Shows: Health Score chip | Roadmap progress chip | Top job match chip
  These chips are tappable — clicking one sends a pre-formed question about it
- Message bubbles: user messages right-aligned (navy), AI messages left-aligned (white with light border)
- Typing indicator (3 dots animation) while Claude responds
- Input bar at bottom: text field + microphone button + send button
- Language toggle: Hindi / English (affects AI response language)

**Chat Panel (Blue Collar — Mobile):**
- Full-screen overlay on mobile
- Extra large text (18px+)
- Large microphone button (primary input method)
- Simple Hindi UI: "Aap kya poochna chahte hain?"
- 4 suggested prompt buttons always visible above input
- Back button to return to previous screen

**Government Sidebar:**
- Always-visible right panel on govt dashboard screens
- Pre-loaded with district-specific context chips
- "Ask about this data" button on every chart/table — clicking pre-fills a relevant question

---

### 8.7 API Endpoint

```
POST /api/chat/message

Request body:
{
  "message": "Mujhe kaunsi skill pehle seekhni chahiye?",
  "language": "hindi",
  "conversation_history": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ]
}

Response:
{
  "reply": "Raju, tere liye sabse pehle SQL seekhna best hai...",
  "suggested_actions": [
    {"label": "SQL Roadmap Dekho", "route": "/roadmap"},
    {"label": "PMKVY Enroll Karo", "route": "/schemes"}
  ],
  "suggested_prompts": [
    "Kitna time lagega?",
    "Free resources kahan milenge?"
  ]
}
```

The endpoint assembles user context from Supabase, injects it into system prompt, calls Claude API, and returns reply + actionable suggestions.

**Suggested actions** are extracted by Claude from its response — if Claude mentions a roadmap, it returns a route to `/roadmap`. If it mentions PMKVY, it returns a route to `/schemes`. These render as clickable buttons below the AI message.

---

### 8.8 Chat Screen in Navigation Map

Added to all three interfaces:

```
Job Seeker:   /chat  (also accessible as floating button from any screen)
Blue Collar:  /simple/chat  (full-screen on mobile)
Government:   Built into /govt/dashboard sidebar
```

---

## 9. Forecasting Engine

### For MVP (Seeded Data)

The full Facebook Prophet model requires 24 months of live data. MVP uses seeded historical data for Rajasthan.

`skill_demand_data` table seeded with 18 months of monthly job counts for 30 skills across 5 Rajasthan districts with realistic trends:
- Python, Data Analytics, CNC Operation → growing
- Basic Data Entry, Tally Basic → declining
- Solar Installation → emerging

**Trajectory label logic:**

| Growth Rate | Label |
|---|---|
| > 30% YoY | EMERGING |
| 10-30% YoY | RISING |
| ±10% | STABLE |
| -10 to -30% | DECLINING |
| < -30% | DYING |

**Gap forecast calculation:** Training center enrollment capacity × (1 - historical dropout rate) = projected supply. Compared against demand trend slope = gap forecast.

**All forecast panels labeled:** *"Forecasts based on historical market data. Production accuracy improves as live data accumulates."*

### Skill Futures Index (Public, No Login)

Shows top 5 EMERGING/RISING and top 5 DECLINING/DYING skills for any Indian state. Updated weekly from trend analysis. Shown on landing page and job board. Best demo opener for judges — proves intelligence in 5 seconds.

---

## 9. Three Interfaces, One Backend

```
kaushalai.in              → Job Seeker web app (professional UI)
kaushalai.in/simple       → Blue Collar simplified UI (Hindi, large buttons)
kaushalai.in/dashboard    → Government analytics portal
WhatsApp +91-XXXXXXXXXX   → Blue Collar bot
```

| | Job Seeker | Blue Collar | Government |
|---|---|---|---|
| Device | Smartphone | Any phone / WhatsApp | Laptop |
| Language | Hindi + English | Hindi only, colloquial | English + Hindi |
| Font size | 14-16px | 18-22px | 13-15px |
| Input method | Form fields + voice | Voice + big buttons | Filters + dropdowns |
| Data density | Medium | Minimal | Maximum |
| Design feel | Fintech (Groww-like) | BHIM/UMANG-like | BI Dashboard (Tableau-like) |
| Primary color | Navy blue | Green | Purple |

---

## 10. Technical Architecture

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS 3.4 + shadcn/ui
- **State:** Zustand (global) + TanStack React Query (server)
- **Charts:** Recharts
- **Maps:** Leaflet.js + OpenStreetMap
- **Voice:** Web Speech API (Hindi language model)
- **Deploy:** Vercel

Target LCP under 2.5 seconds on simulated 3G. PWA installable on Android.

### Backend
- **Framework:** Python FastAPI
- **Auth:** Supabase Auth (mobile OTP)
- **Database:** Supabase PostgreSQL + Row Level Security
- **Cache:** Upstash Redis (24hr Claude responses, 1hr job feed)
- **WhatsApp:** Meta WABA API
- **SMS:** MSG91 (one-way alerts)
- **Deploy:** Railway (Dockerfile)

### AI & ML
- **AI Core:** Anthropic Claude API (claude-sonnet-4-6)
- **Forecasting:** Facebook Prophet on seeded data (live data pipeline post-MVP)
- **Salary model:** PyTorch LSTM (post-MVP, Claude used for MVP projections)
- **Language:** Bhashini API for regional languages (post-MVP beyond Hindi)

### External APIs
- GST verification API (employer validation)
- NCS portal scraper (daily job data)
- Meta WABA API (WhatsApp)
- MSG91 (SMS)
- Web Speech API (voice input)

---

## 11. Database Schema

```sql
-- USER PROFILES
profiles (
  user_id uuid PK,
  name text, age int, gender text,
  state text, district text, pincode text,
  education_level text, current_job text,
  years_experience int, monthly_income_range text,
  skills_json jsonb,        -- [{skill_name, proficiency}]
  target_role text, target_income int,
  timeline_months int, open_to_relocation bool,
  language_preference text, whatsapp_number text,
  created_at timestamp
)

-- AI ANALYSIS RESULTS
skill_analyses (
  analysis_id uuid PK, user_id uuid FK,
  career_matches_json jsonb,
  skill_gaps_json jsonb,
  latent_skills_json jsonb,
  career_health_score int,
  career_health_breakdown_json jsonb,
  created_at timestamp
)

-- LEARNING ROADMAPS
roadmaps (
  roadmap_id uuid PK, user_id uuid FK,
  target_career text,
  modules_json jsonb,           -- [{week, skill, resource, exercise}]
  progress_percentage int,
  completed_modules_json jsonb,
  last_active timestamp, created_at timestamp
)

-- EMPLOYERS
employers (
  employer_id uuid PK,
  company_name text, gst_number text, gst_verified bool,
  udyam_number text, industry text,
  state text, district text, pincode text,
  employee_count_range text, star_rating decimal,
  created_at timestamp
)

-- JOB LISTINGS
jobs (
  job_id uuid PK, employer_id uuid FK,
  title text, description text,
  required_skills_json jsonb,
  salary_min int, salary_max int, salary_type text,
  job_type text, work_mode text,
  state text, district text, pincode text,
  latitude decimal, longitude decimal, radius_km int,
  openings int, deadline date,
  walkin_date date, walkin_venue text,
  is_active bool, source text,  -- kaushalai | ncs_scraped
  created_at timestamp
)

-- JOB APPLICATIONS
applications (
  application_id uuid PK,
  job_id uuid FK, user_id uuid FK,
  status text,  -- applied|shortlisted|interview_scheduled|hired|rejected
  employer_notes text, applied_at timestamp, updated_at timestamp
)

-- GOVERNMENT SCHEMES
schemes (
  scheme_id uuid PK, name text, ministry text,
  state_applicability text,
  eligibility_criteria_json jsonb,
  benefits_description text, stipend_amount int,
  training_duration_weeks int, application_url text,
  expiry_date date, is_active bool
)

-- SCHEME MATCHES PER USER
scheme_matches (
  match_id uuid PK, user_id uuid FK, scheme_id uuid FK,
  match_score decimal, is_enrolled bool,
  enrolled_at timestamp, created_at timestamp
)

-- SKILL DEMAND TRENDS (seeded for MVP)
skill_demand_data (
  record_id uuid PK, skill text,
  state text, district text, month date,
  job_count int, trajectory_label text,
  created_at timestamp
)

-- SKILL GENOME ADJACENCY
skill_genome (
  genome_id uuid PK,
  skill_a text, skill_b text,
  transfer_coefficient decimal,  -- 0 to 1
  evidence_count int
)

-- CANONICAL SKILL NAMES
canonical_skills (
  skill_id uuid PK, skill_name text,
  category text, variants_json jsonb
)

-- TRAINING CENTERS
training_centers (
  center_id uuid PK, name text,
  state text, district text,
  trades_json jsonb, capacity int,
  current_enrollment int,
  placement_rate decimal, completion_rate decimal,
  is_active bool
)

-- WALK-IN ATTENDANCE TRACKING
walkin_attendance (
  attendance_id uuid PK, job_id uuid FK, user_id uuid FK,
  notified_at timestamp,
  opened_message bool, rsvp_confirmed bool,
  checked_in bool, checked_in_at timestamp
)
```

---

## 12. API Endpoints

### Authentication
```
POST /api/auth/send-otp          → Send OTP to mobile
POST /api/auth/verify-otp        → Verify OTP, return session
POST /api/auth/logout            → Invalidate session
```

### Onboarding & Profile
```
POST /api/onboarding/step        → Save single onboarding step
POST /api/onboarding/complete    → Mark complete, trigger analysis
GET  /api/profile                → Current user profile
PATCH /api/profile               → Update profile fields
```

### AI Analysis
```
POST /api/analysis/run           → Trigger Claude skill gap analysis
GET  /api/analysis/latest        → Most recent analysis result
```

### Roadmap
```
POST /api/roadmap/generate       → Generate roadmap for target career
GET  /api/roadmap/current        → Current roadmap with progress
PATCH /api/roadmap/module/:week  → Mark module complete/incomplete
```

### Jobs
```
GET  /api/jobs                   → Job feed with match % for user
GET  /api/jobs/:id               → Single job detail
GET  /api/jobs/search            → Filtered search
```

### Schemes
```
GET  /api/schemes/matches        → Matched schemes for user
POST /api/schemes/enroll/:id     → Mark scheme as enrolled
```

### Forecasting (Public)
```
GET  /api/forecast/skill-futures/:state   → Skill Futures Index, no auth
GET  /api/forecast/gap-forecast/:district → Govt gap forecast
```

### Employer
```
POST /api/employer/register                     → Create employer account
POST /api/employer/jobs                         → Post new job
GET  /api/employer/jobs                         → My posted jobs
PATCH /api/employer/jobs/:id                    → Update job
GET  /api/employer/candidates/:job_id           → Matched candidates
POST /api/employer/interest/:job_id/:user_id    → Express interest (reveals name)
POST /api/employer/application/:id/status       → Update kanban status
POST /api/employer/walkin/notify/:job_id        → WhatsApp blast to matched users
GET  /api/employer/walkin/analytics/:job_id     → Live attendance counts
```

### Government Dashboard
```
GET  /api/dashboard/overview/:district    → Aggregate training + placement stats
GET  /api/dashboard/centers/:district     → Center performance rankings
GET  /api/dashboard/heatmap/:district     → Block-level skill supply/demand for map
POST /api/dashboard/campaign/:scheme/:district → Trigger SMS to eligible citizens
```

---

## 13. Skill Normalization & Skill Genome

> This is the most underestimated requirement. Build both before writing any feature code. Without them, Claude's analysis produces unreliable results.

### Canonical Skills Table

200+ standardized skill names with all known variants mapped to canonical form.

**Example mappings:**
```
"Microsoft Excel" ← MS Excel, excel, excel spreadsheets, 
                    advanced excel, basic excel, Excel formulas

"Python Programming" ← python, python3, python scripting, 
                        core python, python coding

"Tally ERP" ← tally, tally erp9, tally prime, 
               tally accounting software
```

When any variant appears in a job posting or user profile, it is mapped to canonical form before storage or analysis.

### Skill Genome Table (50 MVP pairs)

Transfer coefficient between 0 and 1. Value of 0.55 means knowing Skill A covers 55% of learning effort for Skill B.

| Skill A | Skill B | Coefficient |
|---|---|---|
| Microsoft Excel | SQL Basics | 0.55 |
| Tally ERP | GST Filing | 0.80 |
| Manual Data Entry | RPA (UiPath) | 0.45 |
| Basic Electrician | Solar Panel Installation | 0.65 |
| Tailoring | Textile Quality Control | 0.70 |
| Construction Helper | CNC Machine Helper | 0.40 |
| Customer Service | Sales | 0.60 |
| Hindi Typing | Secretarial Work | 0.50 |
| Basic Plumbing | Sanitation Technician | 0.60 |
| Cooking | Industrial Kitchen Operations | 0.55 |
| Photography | Videography | 0.55 |
| Two-Wheeler Driving | Delivery Executive | 0.70 |
| Gardening | Landscape Assistance | 0.65 |
| Android Smartphone Use | Mobile Data Entry | 0.50 |

---

## 14. Security & Privacy

### Authentication
- Supabase Auth with mobile OTP
- JWT tokens stored in memory only — never localStorage or cookies
- All endpoints except public forecasting require valid JWT

### Row Level Security (Supabase)
- `profiles` — users read/write own row only
- `skill_analyses` — users read own rows only
- `roadmaps` — users read/write own rows only
- `applications` — workers see own applications, employers see applications to their jobs only
- `jobs` — employers write own jobs, all authenticated users read active jobs
- `govt dashboard tables` — read-only for government role, no write access

### Employer-Worker Privacy (Tiered)

| Stage | Worker Visible As |
|---|---|
| Before employer interest | Initials, district, skills, education, experience only |
| After employer expresses interest | Worker notified, controls whether to reveal full profile |
| After application submitted | Full profile visible to that employer only |

### Data Policy
- Collected: name, mobile, age, gender, location, education, income range, skills, goals
- Not collected: Aadhaar, bank details, caste, biometric data
- Storage: Supabase Singapore region, daily automated backups
- Compliant with DPDP Act 2023

---

## 15. MVP Scope vs Future Scope

### ✅ In MVP

- OTP login + 5-step onboarding with voice input
- Claude skill gap analysis with JSON retry parser
- Career Compass + Salary GPS
- Skill Genome — latent skill detection + learning shortcuts
- Free personalized learning roadmap (SWAYAM, NPTEL, YouTube)
- Government scheme auto-matcher (15-20 central schemes)
- Regional job board with match % and walk-in drive support
- Career Health Score (0-100 with breakdown)
- Employer portal — job posting, candidate discovery, walk-in drive management
- WhatsApp bot (WABA sandbox)
- Government analytics dashboard (6 panels)
- Supply-demand gap forecast (seeded data for Rajasthan)
- Skill Futures Index public widget
- Livelihood module (Udyam, MUDRA, UPI, rights)
- MSG91 one-way SMS alerts

### 🔜 Future Scope (Post-MVP)

| Feature | Reason Not in MVP |
|---|---|
| USSD *14567# | Requires TRAI registration + telecom partnership (3-6 months) |
| Full 22-language support | Bhashini integration needs content QA across 20 languages |
| Live Prophet forecasting | Needs 3-6 months of real scraped data to train reliably |
| AI Mock Interview Coach | Voice feedback + evaluation model out of 3-day scope |
| Resume ATS Builder | PDF generation + ATS scoring out of scope |
| Two-way SMS conversation | TRAI virtual number + NLP on incoming messages |
| Offline Android app | Native build + content caching out of scope |
| Pre-hire conditional offer | Near-ready tab is MVP; formal offer workflow is Phase 2 |
| Community Intelligence | Needs sufficient placement volume for statistical validity |
| White-label for NGOs/Govt | API-driven rebranding is Phase 3 |
| Open API for third parties | Phase 3 |

---

## 16. Success Metrics

### MVP Demo Targets
- 12 job listings in demo dataset
- 6 verified employers in demo dataset  
- 15 government schemes in database
- 50 Skill Genome pairs seeded
- 200 canonical skills with variants seeded
- 18 months of seeded skill demand data (Rajasthan, 30 skills)
- Full end-to-end demo under 9 minutes
- All AI responses under 10 seconds
- Mobile page load under 3 seconds on 3G simulation

### Post-Hackathon Year 1 Targets

| Metric | Target |
|---|---|
| Monthly Active Users | 500,000 |
| Skill Gap Analyses | 400,000 |
| Job Applications | 150,000 |
| Placement Rate (90-day) | 40% |
| Scheme Enrollments Driven | 50,000 |
| Employer Job Postings | 20,000 |
| Pre-hire Commitments | 5,000 |
| Career Health Score Checks | 200,000 |
| 30-day Retention | 45% |
| State Govt Pilot Agreements | 10 |

---

## Appendix — Seed Data Requirements

Before writing any feature code, seed in this order:

1. `canonical_skills` — 200 skills with variants
2. `skill_genome` — 50 adjacency pairs
3. `schemes` — 15 central government schemes with eligibility JSON
4. `skill_demand_data` — 18 months, 30 skills, 5 Rajasthan districts
5. `training_centers` — 8 centers in Nagpur with performance data
6. `employers` — 6 Jaipur employers (GST verified)
7. `jobs` — 12 Jaipur jobs across those employers
8. `profiles` — 3 demo personas (Raju, Savitri, Ramesh)

---

## 17. Website Screen-by-Screen Flow

This section describes every screen a user sees, what it contains, what action it enables, and where it leads next. Covers all three interfaces.

---

### 17.1 Public Pages (No Login Required)

---

#### Screen: Landing Page — `kaushalai.in`

**Purpose:** First impression. Converts visitor into a user. Demonstrates platform intelligence before any login.

**Layout:**
- Fixed navbar: Logo | Job Seeker / Blue Collar / Government tabs | Get Started button
- Three-tab switcher below navbar — clicking each tab transforms the entire page content and color theme
- Hero section: Tag line + Headline + Subtext + Two CTAs + Skill Futures Index widget (right side)
- Stats bar (dark background): Key numbers for selected user type
- Features grid: 6 feature cards for selected user type
- How it works: 4-step horizontal flow
- Real story: Before/After persona card (dark background)
- Final CTA section: Full-width colored band
- Footer: Logo + mission + govt alignment

**Skill Futures Index Widget (always visible, no login):**
- State dropdown selector
- Toggle: Rising Skills / Declining Skills
- List of top 5 skills with demand change percentage
- Updates weekly

**What user sees per tab:**

| Tab | Headline | Primary CTA | Color |
|---|---|---|---|
| Job Seeker | "Know Exactly What To Learn. Get Hired Faster." | Analyse My Skills | Navy Blue |
| Blue Collar | "Apna Kaam. Apni Bhasha. Apna Phone." | WhatsApp Pe Shuru Karo | Green |
| Government | "Act On Skill Shortages 6 Months Before They Arrive." | Request Dashboard Access | Purple |

**Leads to:**
- Job Seeker CTA → `/login`
- Blue Collar CTA → WhatsApp link opens chat
- Government CTA → `/govt/request-access` (contact form)
- Livelihood Module link → `/help` (no login)

---

#### Screen: Livelihood Module — `kaushalai.in/help`

**Purpose:** Blue-collar workers access this directly without creating an account. NGO/CSC operators use this on behalf of workers.

**Layout:**
- Simple page, large Hindi text, high contrast
- 6 topic cards with icon and title
- Each card expands or links to a dedicated sub-page

**Sub-pages:**
- `/help/udyam` — Udyam registration 8-step guide with screenshots
- `/help/mudra` — MUDRA loan guide with eligibility checker (3 questions)
- `/help/upi` — UPI training with 5 interactive mock screens
- `/help/ondc` — ONDC/Flipkart Samarth seller registration guide
- `/help/rights` — Worker rights: min wage lookup by state, PF check, BOCW
- `/help/gst` — GST eligibility checker (3 questions, instant answer)

**No login, no form, no account needed on any of these pages.**

---

### 17.2 Authentication Screens

---

#### Screen: Login — `/login`

**Layout:**
- Centered card on light background
- KaushalAI logo at top
- Mobile number input field (large, numeric keyboard on mobile)
- "Send OTP" button
- Below: "Are you an employer? Register here" link
- Below: "Government login" link → `/govt/login`

**Leads to:** OTP verification screen

---

#### Screen: OTP Verification — `/verify`

**Layout:**
- Same centered card
- "Enter the 6-digit code sent to +91-XXXXXXXXXX"
- 6 individual digit input boxes (auto-advance on input)
- "Verify" button
- "Resend OTP" link (active after 30 seconds)
- Back link to change number

**On success:** Checks if profile exists
- Profile exists → Dashboard
- New user → Onboarding Step 1

---

### 17.3 Job Seeker Screens

---

#### Screen: Onboarding Step 1 — Identity — `/onboarding/1`

**Layout:**
- Progress bar at top: Step 1 of 5 filled
- Heading: "Aapke baare mein batao" (Tell us about yourself)
- Fields: Name, Age, Gender (3 buttons: Male / Female / Other), State dropdown, District dropdown (cascades from state), Pincode
- Language preference toggle: हिंदी / English
- Microphone button beside name field (voice input)
- "Next →" button (disabled until required fields filled)
- Auto-saves to Supabase on Next click

---

#### Screen: Onboarding Step 2 — Education — `/onboarding/2`

**Layout:**
- Progress bar: Step 2 of 5
- Heading: "Aapki padhai kitni hui hai?"
- Single large dropdown or button-grid: No formal education / 5th Pass / 8th Pass / 10th Pass / 12th Pass / ITI Diploma / Graduation / Postgraduation
- Back and Next buttons

---

#### Screen: Onboarding Step 3 — Work Experience — `/onboarding/3`

**Layout:**
- Progress bar: Step 3 of 5
- Heading: "Aap abhi kya kaam karte hain?"
- Current job title: text field with microphone button
- Years of experience: slider or button-grid (0 / 1-2 / 3-5 / 5-10 / 10+)
- Monthly income range: button-grid (Below 8K / 8-15K / 15-25K / 25-50K / 50K+)
- Back and Next buttons

---

#### Screen: Onboarding Step 4 — Skills — `/onboarding/4`

**Layout:**
- Progress bar: Step 4 of 5
- Heading: "Aapko kya kaam aata hai?"
- Searchable multi-select from canonical skills list
- Each selected skill shows 3 proficiency buttons inline: Beginner / Intermediate / Advanced
- Microphone button to speak skill names
- Running count of selected skills shown
- Back and Next buttons

**Note:** This is the most important step. Proficiency levels fed directly to Claude.

---

#### Screen: Onboarding Step 5 — Goals — `/onboarding/5`

**Layout:**
- Progress bar: Step 5 of 5
- Heading: "Aap kya banana chahte hain?"
- Target role: text field with microphone
- Target monthly income: slider (5K to 1L+ in steps)
- Timeline: 4 buttons (3 months / 6 months / 1 year / 2 years)
- Open to relocation: Yes / No toggle
- "See My Analysis →" button

**On submit:** Triggers Claude skill gap analysis. Redirects to Analysis Loading screen.

---

#### Screen: Analysis Loading — `/analysis/loading`

**Layout:**
- Centered card with animated progress indicator
- Rotating messages shown while Claude processes:
  - "Scanning job postings in your district..."
  - "Identifying your hidden competencies..."
  - "Calculating your career health..."
  - "Building your career paths..."
- Estimated time: 8-10 seconds

**On completion:** Redirects to Dashboard

---

#### Screen: Dashboard — `/dashboard`

**Purpose:** Home base. User lands here every time they log in.

**Layout (4 cards in grid):**

**Card 1 — Career Health Score**
- Large circular gauge: 0-100
- Color: Red / Orange / Yellow / Green
- Score number in center
- Top 2 risk factors listed below
- "View Details" link → `/health`

**Card 2 — Active Roadmap**
- Current career target title
- Progress bar: X% complete
- "Week N of M" label
- Next module title with resource platform icon
- "Continue Roadmap" button → `/roadmap`

**Card 3 — Job Matches**
- Count of jobs in district matching > 60%
- Top match: job title + company + match % + salary
- "View All Jobs" button → `/jobs`

**Card 4 — My Schemes**
- Count of matched schemes
- Top scheme: name + key benefit
- Expiry countdown if within 30 days
- "View All Schemes" button → `/schemes`

**Bottom section — Skill Futures Index widget** (same as landing page, pre-set to user's state)

---

#### Screen: Skill Gap Analysis — `/analysis`

**Layout (4 sections, scrollable):**

**Section 1 — Career Health Score**
- Full breakdown gauge
- 5 component scores as mini-bars
- 3 top risk factors as plain-language cards
- "If you start your roadmap today, your score will reach X in 3 months" — preview

**Section 2 — Career Matches**
- 3-5 career cards in horizontal scroll on mobile / grid on desktop
- Each card: title, match % bar, salary today, salary 3yr, automation risk badge (Low/Medium/High), open jobs in district count, months to ready
- "Generate Roadmap" button on each card
- "Compare Careers" button opens side-by-side modal

**Section 3 — Skill Gaps**
- Table: Skill name | Demand Trajectory | Salary Impact | Weeks to Learn
- Trajectory badge color coded: 🟢 EMERGING / 🔵 RISING / ⚪ STABLE / 🟠 DECLINING / 🔴 DYING
- Sorted by salary impact descending

**Section 4 — Your Hidden Skills (Skill Genome)**
- Cards for each latent skill
- "Because you have X, you already know 55% of Y"
- Time saved shown as "Save 5 weeks"

---

#### Screen: Career Compass — `/compass`

**Layout:**
- Page header: "Your Career Paths"
- Sort toggle: Fastest to Reach / Highest Earning
- 3-5 full career cards (larger than analysis cards)
- Each card: all data from analysis + govt schemes that fund training for this career + "Generate Roadmap" CTA

**Salary GPS section (bottom half of same page):**
- Input field: "I want to earn Rs _____ per month"
- On input → filtered list appears below showing all paths that reach that income
- Each path: career title, months to reach target, income ceiling, automation risk, traffic indicator (Low/Medium/High competition from other users in district)

---

#### Screen: Learning Roadmap — `/roadmap`

**Layout:**
- Header: Target career title + overall progress bar
- Skill Genome shortcut notice (if applicable): "Because you know Excel, Week 1-2 of SQL are skipped. Starting at Week 3."
- Vertical timeline of week cards

**Each week card (collapsed by default):**
- Week number pill
- Skill being covered
- Platform icon (SWAYAM / NPTEL / YouTube / Kaggle)
- Estimated hours
- Completion checkbox

**Week card (expanded on click):**
- Resource title with link
- Platform name + language + duration
- Practical exercise description
- For milestone weeks: milestone badge and description

**Sticky footer bar:**
- "X weeks completed · Y weeks remaining · Z jobs unlock on completion"

---

#### Screen: Job Board — `/jobs`

**Layout:**
- Skill Futures Index widget at top (compact version)
- Filter bar: District radius / Salary range / Job type / Min match %
- Sort: Match % / Salary / Date posted
- Job cards list

**Each job card:**
- Employer name + GST verified badge + star rating
- Job title
- Salary range (always shown, mandatory)
- Required skills as color pills: 🟢 Have / 🟠 In Roadmap / ⬜ Missing
- Match % gauge (circular, filled)
- Walk-in Drive badge (if applicable) with date
- "Ready in X weeks" label (if roadmap completion qualifies them)
- Distance in km
- Apply button

**On Apply click:**
- Redirected to employer's application form or WhatsApp contact (based on employer preference)
- Application recorded in `applications` table

---

#### Screen: Scheme Matcher — `/schemes`

**Layout:**
- Header: "X schemes matched to your profile"
- Scheme cards sorted by benefit value

**Each scheme card:**
- Scheme name + Ministry logo/name
- Key benefit in one plain-language line
- "You qualify because:" — 2-3 bullet points matching user's profile
- Deadline countdown badge (if within 30 days)
- Expandable section: Step-by-step enrollment guide + document checklist
- Nearest center with distance
- "Start Enrollment" button (links to official scheme portal)

---

#### Screen: Career Health Score Detail — `/health`

**Layout:**
- Large score gauge at top
- 5 component score bars with labels and values
- Top 3 risk factors as warning cards with explanations
- "Action Impact Preview" section: "If you complete your Data Analyst roadmap, your score will improve from 42 → 78"
- Timeline chart showing projected score improvement week by week

---

### 17.4 Employer Screens

---

#### Screen: Employer Registration — `/employer/register`

**Layout:**
- Company name, GST number (real-time validation indicator), Udyam number (alternative)
- Industry dropdown, State, District, Pincode, Employee count range
- Contact person name + mobile OTP verification
- Submit button

---

#### Screen: Employer Dashboard — `/employer`

**Layout:**
- Active jobs count + total applications count + hired this month
- Recent applications list with status
- "Post New Job" button (prominent)
- Quick stats: candidates notified this week, walk-in drives active

---

#### Screen: Post a Job — `/employer/jobs/new`

**Layout:**
- Job title, description (1500 char limit with counter)
- Required skills multi-select, nice-to-have skills
- Salary min + max (both mandatory), salary type
- Job type, work mode
- Location: state, district, pincode, candidate search radius
- Number of openings, application deadline
- Walk-in toggle: if ON → date and venue fields appear
- Preview before publish button
- Publish button

---

#### Screen: Candidate Discovery — `/employer/jobs/:id/candidates`

**Layout:**
- Two tabs: All Candidates / Near-Ready

**All Candidates tab:**
- Ranked list by match %
- Each card: Initials only (privacy), match %, district, education, experience, skills as colored pills
- "Express Interest" button — reveals full name + sends WhatsApp to candidate

**Near-Ready tab:**
- Candidates currently in active training
- Each card: Initials, match % at graduation, "Ready in X weeks" countdown
- "Pre-hire interest" button

---

#### Screen: Application Kanban — `/employer/jobs/:id/board`

**Layout:**
- 5 columns: Applied / Shortlisted / Interview Scheduled / Hired / Rejected
- Candidate cards draggable between columns
- Moving to Shortlisted → auto WhatsApp to candidate
- Moving to Hired → triggers placement tracking
- Private notes field on each card

---

#### Screen: Walk-in Drive Live — `/employer/walkin/:job_id`

**Layout:**
- Header: Job title + Walk-in date + Venue
- Live counter cards: Notified / Opened Message / RSVP Confirmed / Checked In (updates every 30 seconds)
- QR code: full-width display for scanning at venue entrance
- Live attendee list with check-in timestamps

---

### 17.5 Government Screens

---

#### Screen: Government Login — `/govt/login`

**Layout:**
- Email + password
- "Forgot password" link
- No self-registration — admin-created accounts only

---

#### Screen: Government Dashboard — `/govt/dashboard`

**Purpose:** Main hub. Shows district-level overview.

**Layout:**
- Header: "Nagpur District — Live as of [time]"
- 4 top stat cards: Active Enrollments / Placed This Month / Dropout Rate / Scheme Enrollment Gap
- Panel 2: Skill Gap Heatmap (map takes half the screen)
- Panel 3: Supply-Demand Gap Forecast table (bottom half)
- Left sidebar: navigation to individual panels

---

#### Screen: Live Training Overview — `/govt/training`

**Layout:**
- Filter: by trade, by center, by date range
- Enrollment funnel chart: Enrolled → Completed → Placed (with conversion % at each stage)
- Trade-wise breakdown table: trade name, enrolled, completed, placed, dropout rate
- Month-by-month trend line chart

---

#### Screen: Training Center Rankings — `/govt/centers`

**Layout:**
- Sortable table: Center name / Placement rate / Completion rate / Avg salary placed / Enrolled today
- Color rows: green > 60% placement / yellow 30-60% / red < 30%
- "Send Improvement Notice" button on underperforming centers
- Click any center → detail page with monthly trend and trade breakdown

---

#### Screen: Skill Gap Heatmap — `/govt/heatmap`

**Layout:**
- Full-width Leaflet.js map of district
- Block/taluka level polygons colored by shortage severity
- Legend: 🔴 Critical / 🟡 Moderate / 🟢 Balanced
- Hover on block → tooltip with top 3 skills in shortage
- Click on block → sidebar opens showing demand vs supply for top 5 skills in that block

---

#### Screen: 6-Month Forecast — `/govt/forecast`

**Layout:**
- Filter: trade, district, quarter
- Forecast table per trade:
  - Trade | Demand Q3 | Supply Q3 | Gap | Severity | Recommended Action | Cost to Act | Cost of Inaction
- Critical rows highlighted in red with action button
- "Export to PDF" button for official reporting

---

#### Screen: Scheme Enrollment Tracker — `/govt/schemes`

**Layout:**
- Table: Scheme name / Eligible citizens in district / Enrolled / Gap / Enrollment rate %
- Gap column color-coded: red if > 500 unenrolled, yellow if 100-500, green if < 100
- "Run SMS Campaign" button beside each scheme
- Campaign modal: shows message preview + estimated reach count + confirm button
- Campaign history log below table

---

#### Screen: Economic Impact Calculator — `/govt/impact`

**Layout:**
- Input panel: Select trade, select intervention type (new batch / center upgrade / stipend increase), select district, enter number of trainees
- Output panel (auto-calculates):
  - Estimated investment (Rs)
  - Expected placements
  - Avg salary improvement per placed worker
  - 12-month economic value generated
  - ROI multiple
  - Comparison: Cost to act vs Cost of inaction
- "Download Report" button generates PDF with these numbers for budget justification

---

### 17.6 Screen Navigation Map

```
PUBLIC
├── / (Landing Page) ──────────────────────→ /login
│   ├── Tab: Job Seeker
│   ├── Tab: Blue Collar ──────────────────→ WhatsApp
│   └── Tab: Government ───────────────────→ /govt/request-access
└── /help (Livelihood Module)
    ├── /help/udyam
    ├── /help/mudra
    ├── /help/upi
    ├── /help/ondc
    ├── /help/rights
    └── /help/gst

AUTH
├── /login ────────────────────────────────→ /verify
└── /verify ───────────────────────────────→ /onboarding/1 (new)
                                          → /dashboard (returning)

JOB SEEKER
├── /onboarding/1 → /onboarding/2 → /onboarding/3
│   → /onboarding/4 → /onboarding/5 → /analysis/loading → /dashboard
├── /dashboard ────────────────────────────→ /analysis
│                                         → /roadmap
│                                         → /jobs
│                                         → /schemes
├── /analysis ─────────────────────────────→ /compass
│                                         → /roadmap (per career)
│                                         → /health
├── /compass ──────────────────────────────→ /roadmap (per career)
├── /roadmap
├── /jobs ─────────────────────────────────→ Job apply (external or in-app)
├── /schemes ──────────────────────────────→ Scheme portal (external)
└── /health

EMPLOYER
├── /employer/register
├── /employer ─────────────────────────────→ /employer/jobs/new
├── /employer/jobs/:id/candidates ─────────→ /employer/jobs/:id/board
└── /employer/walkin/:job_id

GOVERNMENT
├── /govt/login
├── /govt/dashboard ───────────────────────→ All panels
├── /govt/training
├── /govt/centers
├── /govt/heatmap
├── /govt/forecast
├── /govt/schemes
└── /govt/impact
```

---
