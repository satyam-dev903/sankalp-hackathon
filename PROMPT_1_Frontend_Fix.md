# PROMPT 1 — KaushalBridge AI: Complete Frontend Build (FINAL VERSION)
## Paste this ENTIRE prompt into Cursor / Windsurf / Claude Projects / Copilot Chat

---

## YOUR MISSION

You are a **senior React engineer and UI/UX specialist**. I have a partially built React app called **KaushalBridge AI** (also called KaushalAI). Your job is to take this from a broken skeleton to a **fully working, premium-quality, demo-ready web application** — no half measures, no placeholders, no "coming soon" stubs except where explicitly told.

**This app must look and feel like a ₹10 crore funded product. Every screen must be polished, animated, and functional.**

By the end of this prompt, every route in App.jsx must render a complete, beautiful, working page.

---

## TECH STACK (do not change or add libraries)
```
React 18 + Vite
Tailwind CSS + custom component classes (index.css)
Zustand (state + ALL mock data)
React Router DOM v6
Lucide React (icons only)
Gemini API 2.5-flash (already wired in AIChatPanel)
Browser Web Speech API (SpeechRecognition + SpeechSynthesis — no library needed)
```

---

## PREMIUM UI DESIGN SYSTEM

Apply this design language to EVERY page. No exceptions.

### Color Palette
```
Landing bg:       #030712  (near-black)
Inner page bg:    #0F172A  (dark navy)
Card surface:     bg-slate-800/60 with backdrop-blur-md
Card border:      border-slate-700/50
Blue theme:       blue-600 / blue-500 (Job Seeker)
Emerald theme:    emerald-600 / emerald-500 (Blue Collar)
Purple theme:     purple-700 / purple-600 (Government)
Orange accent:    orange-500 (alerts, scores, CTAs)
Text primary:     slate-100
Text secondary:   slate-400
Text muted:       slate-500
Success:          emerald-400
Warning:          orange-400
Danger:           red-400
```

### Premium Card Template (use for ALL cards)
```jsx
<div className="glass-card p-5 hover:border-slate-600/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/20">
```

### Premium Section Header Template
```jsx
<div className="flex items-center gap-3 mb-6">
  <div className="w-1 h-6 bg-blue-500 rounded-full" />
  <h2 className="text-lg font-bold text-white">Section Title</h2>
  <span className="ml-auto text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
    Subtitle / count
  </span>
</div>
```

### Premium Stat Card Template
```jsx
<div className="stat-card group hover:border-blue-500/30 transition-all duration-300">
  <div className="flex items-center justify-between mb-1">
    <span className="text-xs text-slate-400 font-medium">Label</span>
    <Icon size={14} className="text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
  </div>
  <div className="text-2xl font-bold text-white">Value</div>
  <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
    <TrendingUp size={10} /> +12% this month
  </div>
</div>
```

### Sidebar Template (extract as `src/components/Sidebar.jsx` — reuse across ALL JS + Govt pages)
```jsx
// Fixed left sidebar, 240px wide on desktop, collapsible on mobile
// Dark surface: bg-slate-900/95 border-r border-slate-800
// Logo at top, nav items in middle, AI chat button at bottom
// Active item: blue-600/20 bg + blue-600/40 border-l-2
// Each nav item uses .nav-item class with icon + label
```

### Animation Standards
```
Page entrance:    opacity-0 → opacity-100 + translateY(16px) → 0, duration 400ms
Card hover:       -translate-y-0.5 + shadow-lg, duration 200ms  
Button click:     scale-95, duration 100ms
Loading states:   skeleton shimmer (bg-slate-700 animate-pulse rounded)
Number counters:  count up animation on mount (use useEffect + setInterval)
Progress bars:    width 0 → final%, duration 800ms with ease-out
```

### Typography Rules
```
Page title:       text-2xl font-bold text-white
Section header:   text-lg font-semibold text-white  
Card title:       text-sm font-semibold text-slate-100
Body text:        text-sm text-slate-300
Caption/meta:     text-xs text-slate-500
Hindi text:       same sizes, use font-medium for readability
```

---

## STEP 1 — FIX ALL EXISTING BUGS FIRST

### BUG 1 CRITICAL — AIChatPanel.jsx will crash on every AI response

File: `src/components/AIChatPanel.jsx`

Three things used but never defined:
- `toggleSpeech` function
- `speakingId` state  
- `Square` and `Volume2` from lucide — missing from import

**Complete fix:**
```jsx
// CHANGE import line to:
import { Send, Mic, X, ChevronDown, ChevronUp, Loader2, Volume2, Square } from 'lucide-react'

// ADD after existing useState lines:
const [speakingId, setSpeakingId] = useState(null)

// ADD after startVoice function:
const toggleSpeech = (text, id) => {
  if (speakingId === id) {
    window.speechSynthesis.cancel()
    setSpeakingId(null)
  } else {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'hi-IN'
    utterance.rate = 0.9
    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)
    window.speechSynthesis.speak(utterance)
    setSpeakingId(id)
  }
}
```

### BUG 2 — Landing.jsx dead nav links

File: `src/pages/Landing.jsx`

"Manifesto" and "OS Architecture" nav links do nothing. Fix:
```jsx
// Replace both dead <span> tags with working scroll links:
<span onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
  className="hidden md:block text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">
  Manifesto
</span>
<span onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
  className="hidden md:block text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">
  OS Architecture
</span>

// Add id="platforms" to the platform grid section
// Add id="stats" to a new stats section (add after hero, before platform grid):
// 4 stat cards: 500M+ Workers Served, 22 Languages, 309M Informal Workers, 48% Placement Rate
```

### BUG 3 — Missing Zustand mock data

File: `src/store/useAppStore.js`

Add this COMPLETE replacement store (replace entire file):

```js
import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // ─── SHARED ──────────────────────────────────────────
  category: null,
  setCategory: (cat) => set({ category: cat }),

  // ─── JOB SEEKER ──────────────────────────────────────
  profile: null,
  setProfile: (profile) => set({ profile }),

  analysis: {
    career_health_score: 42,
    career_matches: [
      {
        career_title: 'Data Analyst',
        match_percentage: 85,
        missing_skills: ['SQL', 'Power BI'],
        salary_today: 18000,
        salary_1_year: 24000,
        salary_3_years: 38000,
        automation_risk: 22,
        open_jobs_in_district: 34,
        months_to_ready: 10,
      },
      {
        career_title: 'MIS Executive',
        match_percentage: 72,
        missing_skills: ['Advanced Excel', 'Pivot Tables'],
        salary_today: 16000,
        salary_1_year: 20000,
        salary_3_years: 28000,
        automation_risk: 35,
        open_jobs_in_district: 21,
        months_to_ready: 6,
      },
      {
        career_title: 'Operations Coordinator',
        match_percentage: 68,
        missing_skills: ['SAP Basics'],
        salary_today: 15000,
        salary_1_year: 19000,
        salary_3_years: 25000,
        automation_risk: 18,
        open_jobs_in_district: 15,
        months_to_ready: 8,
      },
    ],
    skill_gaps: [
      { skill_name: 'SQL', demand_trajectory: 'EMERGING', salary_impact: 8000, weeks_to_learn: 6 },
      { skill_name: 'Power BI', demand_trajectory: 'RISING', salary_impact: 6000, weeks_to_learn: 4 },
      { skill_name: 'Python Basics', demand_trajectory: 'EMERGING', salary_impact: 12000, weeks_to_learn: 10 },
    ],
    latent_skills: [
      {
        skill_name: 'SQL Basics',
        reason: 'Excel → SQL transfer via Skill Genome',
        transfer_coefficient: 0.55,
        weeks_saved: 5,
      },
    ],
    career_health_breakdown: {
      skill_demand: 8,
      diversification: 10,
      automation_risk: 12,
      salary_vs_median: 7,
      regional_demand: 5,
      top_risks: [
        'Data Entry declining 43% in Rajasthan',
        'Single-skill dependency on Excel',
        'Salary 31% below market median',
      ],
    },
  },
  setAnalysis: (analysis) => set({ analysis }),

  roadmap: {
    target_career: 'Data Analyst',
    progress_percentage: 18,
    current_week: 2,
    modules: [
      { week: '1-2', title: 'SQL Basics', status: 'complete', resources: ['NPTEL SQL Course (8 hrs)', 'Exercise: Create your first database'] },
      { week: '3-4', title: 'SQL Intermediate', status: 'current', resources: ['YouTube: Apna College SQL Hindi (6 hrs)', 'Exercise: Analyze a dataset'] },
      { week: '5-6', title: 'Power BI Introduction', status: 'locked', resources: ['Microsoft Learn: Power BI (free)', 'Exercise: Build a sales dashboard'] },
      { week: '7-8', title: 'Power BI Advanced', status: 'locked', resources: ['SWAYAM Power BI Course', 'Exercise: District sales report'] },
      { week: '9-10', title: 'Python Basics', status: 'locked', resources: ['NPTEL Python (free)', 'Exercise: Data cleaning script'] },
      { week: '11-12', title: 'Project & Portfolio', status: 'locked', resources: ['Build: Full analytics dashboard', 'Upload to GitHub'] },
    ],
    genome_shortcut: {
      from_skill: 'Excel',
      to_skill: 'SQL',
      weeks_saved: 5,
      message: 'Because you know Excel, your SQL journey starts at Week 3 — not Week 1. You saved 5 weeks.',
    },
  },
  setRoadmap: (roadmap) => set({ roadmap }),

  // ─── CHAT (with localStorage persistence) ───────────
  chatOpen: false,
  setChatOpen: (open) => set({ chatOpen: open }),
  chatHistory: (() => {
    try {
      const saved = localStorage.getItem('kaushal_chat_history')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })(),
  addChatMessage: (msg) =>
    set((state) => {
      const updated = [...state.chatHistory, msg].slice(-30)
      try { localStorage.setItem('kaushal_chat_history', JSON.stringify(updated)) } catch {}
      return { chatHistory: updated }
    }),
  clearChat: () => {
    localStorage.removeItem('kaushal_chat_history')
    set({ chatHistory: [] })
  },

  // ─── BLUE COLLAR ─────────────────────────────────────
  bcProfile: {
    name: 'Ramesh Kumar',
    trade: 'Plumber',
    tradeEmoji: '🔧',
    experience: '6 saal',
    district: 'Sitapur',
    state: 'Uttar Pradesh',
    phone: '9876543210',
    nsqfLevel: 3,
  },
  setBcProfile: (p) => set({ bcProfile: p }),

  bcRoadmap: {
    trade: 'Plumber',
    currentLevel: 1,
    totalLevels: 3,
    levels: [
      {
        level: 1,
        title: 'Basic Plumber',
        titleHindi: 'Basic Plumber',
        status: 'current',
        skills: ['Paani ki pipe jodhna', 'Nalkaa theek karna', 'Washroom fitting'],
        badge: '🔧',
        weeks: '1-4 hafte',
      },
      {
        level: 2,
        title: 'Skilled Plumber (NSQF L3)',
        titleHindi: 'Mahir Plumber',
        status: 'locked',
        skills: ['Solar water heater', 'Pump installation', 'Building plumbing'],
        badge: '⚙️',
        weeks: '5-10 hafte',
      },
      {
        level: 3,
        title: 'Plumbing Supervisor',
        titleHindi: 'Plumbing Supervisor',
        status: 'locked',
        skills: ['Team management', 'Project estimation', 'Quality inspection'],
        badge: '🏗️',
        weeks: '11-16 hafte',
      },
    ],
    completedSkills: ['Paani ki pipe jodhna', 'Nalkaa theek karna'],
  },

  bcJobs: [
    { id: 1, title: 'Plumber', emoji: '🔧', company: 'BuildFast Construction', location: 'Lucknow, UP', distance: '42 km', salary: '₹18,000/maah', type: 'Full Time', urgent: true, postedDays: 1 },
    { id: 2, title: 'Pipe Fitter', emoji: '⚙️', company: 'Jal Jeevan Mission', location: 'Sitapur, UP', distance: '8 km', salary: '₹15,000/maah', type: 'Govt Project', urgent: false, postedDays: 3 },
    { id: 3, title: 'Plumbing Supervisor', emoji: '🏗️', company: 'SmartCity UP', location: 'Lucknow, UP', distance: '45 km', salary: '₹24,000/maah', type: 'Full Time', urgent: false, postedDays: 2 },
    { id: 4, title: 'Maintenance Worker', emoji: '🔨', company: 'Hotel Clarks Avadh', location: 'Lucknow, UP', distance: '44 km', salary: '₹14,000/maah', type: 'Full Time', urgent: false, postedDays: 5 },
  ],

  bcSchemes: [
    { id: 1, name: 'PMKVY 4.0', emoji: '🎓', benefit: 'FREE skill training + ₹500 stipend', eligibility: '18-35 saal', deadline: '31 March 2026', color: 'blue', link: 'https://pmkvyofficial.org' },
    { id: 2, name: 'MUDRA Loan — Shishu', emoji: '💰', benefit: '₹50,000 tak loan bina guarantee', eligibility: 'Koi bhi kaam karne wala', deadline: 'Kab bhi apply karo', color: 'emerald', link: 'https://mudra.org.in' },
    { id: 3, name: 'e-Shram Card', emoji: '🪪', benefit: '₹2 lakh insurance + pension', eligibility: 'Asangathit mazdoor', deadline: 'Kab bhi', color: 'orange', link: 'https://eshram.gov.in' },
    { id: 4, name: 'PM Vishwakarma', emoji: '🛠️', benefit: '₹1 lakh loan + free training', eligibility: 'Karigar aur shilpkar', deadline: 'Ongoing', color: 'purple', link: 'https://pmvishwakarma.gov.in' },
  ],

  bcLearnModules: [
    { id: 1, title: 'Pehla WhatsApp Call', emoji: '📱', duration: '10 min', level: 'Bilkul basic', completed: true },
    { id: 2, title: 'Google Maps Use Karo', emoji: '🗺️', duration: '8 min', level: 'Basic', completed: true },
    { id: 3, title: 'UPI Payment Karna Seekho', emoji: '💳', duration: '12 min', level: 'Basic', completed: false },
    { id: 4, title: 'Online Job Apply Karo', emoji: '💼', duration: '15 min', level: 'Intermediate', completed: false },
    { id: 5, title: 'Udyam Registration Karo', emoji: '🏪', duration: '20 min', level: 'Intermediate', completed: false },
    { id: 6, title: 'MUDRA Loan Apply Karo', emoji: '🏦', duration: '25 min', level: 'Advanced', completed: false },
  ],

  // ─── GOVERNMENT ──────────────────────────────────────
  govtProfile: {
    name: 'Shri R.K. Sharma IAS',
    role: 'District Collector',
    district: 'Nagpur',
    state: 'Maharashtra',
  },
  setGovtProfile: (p) => set({ govtProfile: p }),

  govtStats: {
    totalRegistered: 48210,
    trainedThisQuarter: 3847,
    placedVerified: 1823,
    placementRate: 47.4,
    avgWageIncrease: 22,
    fraudAlertsActive: 3,
    activeTrainingCenters: 34,
    districtSkillGaps: [
      { skill: 'Electrician (NSQF L3)', demand: 340, supply: 80, gap: 260, urgency: 'critical' },
      { skill: 'CNC Operator', demand: 218, supply: 45, gap: 173, urgency: 'critical' },
      { skill: 'Solar Technician', demand: 145, supply: 20, gap: 125, urgency: 'critical' },
      { skill: 'Plumber (NSQF L3)', demand: 195, supply: 90, gap: 105, urgency: 'high' },
      { skill: 'Welder', demand: 160, supply: 70, gap: 90, urgency: 'high' },
      { skill: 'Data Entry', demand: 40, supply: 280, gap: -240, urgency: 'oversupply' },
    ],
    trainingFunnel: { enrolled: 3847, inProgress: 2910, certified: 2241, placed: 1823 },
    fraudAlerts: [
      { id: 'TC-0041', centerName: 'Nagpur Skill Hub', issue: 'Credentials issued 34km from registered GPS location', count: 12, severity: 'high' },
      { id: 'TC-0089', centerName: 'Vidarbha Training Institute', issue: 'Assessment scores 100% identical for 28 students', count: 28, severity: 'critical' },
      { id: 'TC-0102', centerName: 'Orange City Vocational', issue: 'Attendance records submitted after batch end date', count: 6, severity: 'medium' },
    ],
    monthlyTrend: [
      { month: 'Oct', enrolled: 580, placed: 241 },
      { month: 'Nov', enrolled: 620, placed: 268 },
      { month: 'Dec', enrolled: 710, placed: 312 },
      { month: 'Jan', enrolled: 890, placed: 398 },
      { month: 'Feb', enrolled: 1047, placed: 604 },
    ],
    topPerformingCenters: [
      { name: 'Ambedkar Skill Centre', placed: 234, rate: 78, trade: 'Electrician', batchSize: 300 },
      { name: 'Nagpur Polytechnic', placed: 198, rate: 71, trade: 'CNC Operation', batchSize: 280 },
      { name: 'Women ITI Nagpur', placed: 167, rate: 69, trade: 'Tailoring + Embroidery', batchSize: 242 },
    ],
    ngoPartners: [
      { name: 'Pratham Foundation', students: 320, placed: 198, sector: 'Digital Literacy' },
      { name: 'Yuva Parivartan', students: 280, placed: 167, sector: 'Vocational Trades' },
      { name: 'Disha Foundation', students: 210, placed: 134, sector: 'Women Empowerment' },
    ],
  },
}))

export default useAppStore
```

---

## STEP 2 — UPDATE index.css WITH NEW PREMIUM ANIMATIONS

Add these NEW CSS blocks to the existing `index.css` (keep all existing classes):

```css
/* Premium skeleton loader */
.skeleton {
  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
}
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Number count-up animation */
@keyframes count-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.count-up { animation: count-up 0.6s ease-out forwards; }

/* Premium glow effects */
.glow-blue { box-shadow: 0 0 20px rgba(59, 130, 246, 0.15); }
.glow-emerald { box-shadow: 0 0 20px rgba(16, 185, 129, 0.15); }
.glow-purple { box-shadow: 0 0 20px rgba(147, 51, 234, 0.15); }

/* Slide in from right */
@keyframes slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

/* Fade in up */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in-up 0.4s ease-out forwards; }

/* Progress bar fill animation */
@keyframes progress-fill {
  from { width: 0%; }
}
.progress-animated { animation: progress-fill 0.8s ease-out forwards; }

/* Pulse ring */
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.4); opacity: 0; }
}
.pulse-ring::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid currentColor;
  animation: pulse-ring 1.5s ease-out infinite;
}
```

---

## STEP 3 — BUILD ALL MISSING PAGES

Build each file completely. No TODOs, no empty sections, no placeholder text.

---

### `src/components/Sidebar.jsx` — SHARED COMPONENT (build first)

Premium fixed left sidebar. Used by ALL Job Seeker pages and Govt Dashboard.

```
Width: 240px fixed on desktop (lg:), hidden on mobile (slide-in hamburger)
Background: bg-slate-900/95 backdrop-blur-xl border-r border-slate-800
Top: KaushalAI logo with ⚡ icon
Middle: Navigation items
Bottom: AI Chat button (opens AIChatPanel) + user profile mini card

Job Seeker nav items (with Lucide icons):
  LayoutDashboard  → /dashboard       "Dashboard"
  Brain            → /analysis        "Career Analysis"  
  Map              → /roadmap         "Learning Roadmap"
  Briefcase        → /jobs            "Job Matches"
  Building2        → /schemes         "Schemes"
  Heart            → /health          "Career Health"
  FileText         → /resume          "Resume AI"
  Mic2             → /interview       "Mock Interview"

Props: { userType: 'jobseeker' | 'govt', activeRoute: string, onChatOpen: fn }

Active item style: bg-blue-600/10 border-l-2 border-blue-500 text-white
Inactive style: text-slate-400 hover:text-white hover:bg-slate-800/50
```

---

### `src/pages/jobseeker/JSOnboardingBasic.jsx`

**Goal:** Cinematic onboarding. Step 1 of 3.

Layout: Full screen dark bg, centered glass card (max-w-lg), animated entrance.

Top: Progress bar (3 segments, segment 1 filled blue), "Step 1 of 3" label.

Content:
```
Heading: "Let's build your career profile"
Subtext: "Takes 2 minutes. Completely free."

Fields (all styled dark with slate-700 border, focus:border-blue-500):
  - Full Name (text input)
  - Age (number, min 16 max 60)
  - District (select dropdown — 15 options: Jaipur, Nagpur, Lucknow, Pune, 
    Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, 
    Bhopal, Patna, Ranchi, Chandigarh)
  - State (auto-fills based on district OR manual select)
  - Phone Number (tel input, 10 digits)
```

Footer: "Next: Choose your skills →" btn-blue, disabled until all fields filled.
On submit: `setProfile({ name, age, district, state, phone })`, navigate `/onboarding/skills`

Visual detail: Floating subtle blue glow blob in top-right corner.

---

### `src/pages/jobseeker/JSOnboardingSkills.jsx`

**Goal:** Engaging skill selection. Step 2 of 3.

Layout: Same pattern, step 2 highlighted.

Heading: "What skills do you already have?"
Subtext: "Select all that apply — be honest, this helps us find your hidden strengths."

Skill cards (12, in 3x4 grid, use `.picture-card` class):
```
📊 Excel         ⌨️ Hindi Typing    🧾 Tally ERP
💻 Data Entry    📱 Social Media    🤝 Customer Service
📝 MS Word       📌 PowerPoint      🗣️ Basic English
💼 Sales         🏦 Accounts        🚚 Logistics
```

Multi-select: clicking toggles `.selected` class, stores in `selectedSkills` local state.

At bottom: Selected count badge "3 skills selected" in blue.
Footer: "← Back" (ghost) + "Analyze My Profile →" btn-blue (disabled if 0 selected)
On submit: `setProfile({ ...profile, skills: selectedSkills })`, navigate `/onboarding/analyzing`

---

### `src/pages/jobseeker/JSAnalyzing.jsx`

**Goal:** Satisfying loading experience. Step 3 of 3.

Full screen. Centered. Deep navy background.

Center: Large pulsing blue circle (w-24 h-24, animated ring around it).
Below circle: Sequential checkmarks appearing with staggered delays:

```
0.8s:  ✓ Analyzing your skill profile...           (emerald)
1.6s:  ✓ Scanning 50,000+ live job postings...     (emerald)
2.4s:  ✓ Running Skill Genome DNA matching...      (emerald)
3.2s:  ✓ Calculating your LPI scores...            (emerald)
4.0s:  ✓ Building personalized roadmap...          (emerald)
4.5s:  → Navigate to /dashboard
```

Each line fades in with `animate-fade-in`. Progress bar fills across 4.5s.
Bottom tagline: "Powered by KaushalBridge Intelligence Engine"

---

### `src/pages/jobseeker/JSDashboard.jsx`

**Goal:** The main command center. Premium, data-rich.

Layout: `flex h-screen` — `<Sidebar />` (240px) + main content (flex-1 overflow-y-auto)

Main content padding: `p-6 lg:p-8`

**Section 1 — Welcome Banner:**
```
Dark gradient card (navy to blue-900/20), full width
Left: "Good morning, [name] 👋" (xl font) + "Your career intelligence is ready."
Right: Career Health score as circular badge (42, orange color)
Background: subtle grid pattern or noise texture
```

**Section 2 — Stats Row (4 cards, 2x2 on mobile, 4-col on desktop):**
```
Career Health:  42/100    icon: Heart      color: orange  trend: "↑ 8 pts potential"
Top Job Match:  85%       icon: Target     color: blue    trend: "Data Analyst"
Skills to Add:  3         icon: Zap        color: purple  trend: "SQL is priority #1"
Jobs Near You:  34        icon: MapPin     color: emerald trend: "In Jaipur district"
```

**Section 3 — Top Career Matches (3 cards side by side):**
```
Each card: glass-card hover lift
  Top: Match % badge (large, colored by score: >80 emerald, 60-80 blue, <60 slate)
  Title: career name (text-lg font-bold)
  Salary: "₹18K → ₹38K/month" (small, slate-400)
  Missing skills: 2-3 colored badge chips
  Button: "View Roadmap →" (btn-blue)
```

**Section 4 — Quick Actions Row:**
```
4 icon buttons: 
  📊 Analyze Skills → /analysis
  📚 View Roadmap → /roadmap
  💼 Find Jobs → /jobs
  🤖 Ask AI → opens AIChatPanel
```

**Section 5 — Skill Gap Snapshot (bottom):**
```
Horizontal bar mini-chart for 3 skill gaps
Each: skill name + demand badge + "adds ₹X/month" + progress bar (current fill vs target)
```

AIChatPanel: rendered at bottom, toggled by chatOpen from store.

---

### `src/pages/jobseeker/JSAnalysis.jsx`

**Goal:** Deep intelligence dashboard.

Layout: Sidebar + main content.

**Section 1 — Career Health Score:**
```
Large SVG circular arc gauge (230px diameter)
Center: "42" in text-5xl font-black, "/100" in text-lg text-slate-400
Arc color: orange (0-50), blue (51-75), emerald (76-100)
Animated: arc draws from 0 to 42 on mount (SVG stroke-dashoffset animation)

Below: 5 sub-score bars with labels and scores:
  Skill Demand Match:    8/20   (blue bar)
  Skill Diversification: 10/20  (blue bar)
  Automation Safety:     12/20  (emerald bar)
  Salary vs Median:      7/20   (orange bar)
  Regional Demand:       5/20   (blue bar)
```

**Section 2 — Career Matches Table:**
```
Table header: Career | Match | Today | 1 Year | 3 Years | Risk | Action
3 data rows from store.analysis.career_matches
Automation risk: badge colored red/orange/green by value
"View Plan" button on each row
```

**Section 3 — Skill Gaps (3 cards):**
```
Each card: 
  Left: skill name + badge-emerging/declining
  Center: "+₹X/month salary impact" (big, emerald)
  Right: "X weeks to learn" + small progress ring (empty = not started)
  Bottom: free resource link (NPTEL / Swayam)
```

**Section 4 — Hidden Strengths (Latent Skills):**
```
Yellow/amber banner card:
"⚡ Skill Genome Found a Shortcut!"
"Because you know Excel, you're 55% of the way to SQL.
Your SQL learning starts at Week 3, not Week 1. You saved 5 weeks."
CTA button: "Start SQL Shortcut Path →"
```

---

### `src/pages/jobseeker/JSRoadmap.jsx`

**Goal:** AI-driven interactive roadmap with editing capability.

Layout: Sidebar + main content.

**Top bar:**
```
Target career: "Data Analyst" badge
Progress: bar 18% filled
Current week: "Week 2 of 12"
Genome shortcut banner: "⚡ Excel shortcut active — saving 5 weeks"
Button: "🤖 Ask AI to Modify Roadmap" (opens modal)
```

**Timeline (vertical, left-aligned dot/line):**
```
Each module card:
  Status indicator dot (green=complete, blue pulse=current, gray=locked)
  Week range label
  Title (bold)
  
  If COMPLETE: green left border, ✅ checkmark, "Completed" badge
  If CURRENT:  blue left border, pulsing dot, resources expanded and clickable as links
               "+ Suggest Alternative" button (opens AI suggestion panel — see Feature 1)
  If LOCKED:   gray border, 40% opacity, 🔒 icon
```

**"Suggest Alternative" panel (slide-in from right):**
```
Triggered by button on current module.
Input: "What challenge are you facing?" (text field)
Sends to Gemini: "User is learning SQL Week 3. They said: [input]. 
                  Suggest an alternative approach or easier resource."
Shows AI response as formatted suggestion card.
Button: "Apply this suggestion" → updates module's resources in store
```

**"Add Custom Module" button (bottom):**
```
Opens inline form: module title + week + notes
Adds to store.roadmap.modules with status 'custom'
```

**"Sync & Save" button (top right):**
```
Shows toast: "✓ Roadmap saved to your profile" (3s then disappears)
```

---

### `src/pages/jobseeker/JSJobs.jsx`

**Goal:** Premium job listings with filtering.

Layout: Sidebar + main.

**Filter bar (sticky top):**
```
Tabs: All (6) | High Match | Government | Remote
Search input: "Search roles, companies..."
```

**Job cards (grid 2-col on desktop, 1-col on mobile):**
```
Mock 6-8 jobs for Data Analyst / MIS Executive in Rajasthan/UP:

Card structure:
  Top: Company logo placeholder (2-letter initial in colored circle) + company name + "Posted X days ago"
  Middle: Role title (text-lg bold) + location chip + salary range
  Match badge: "85% match" (colored by score)
  Skills: 2-3 required skill chips
  Bottom: "Apply on NCS →" (links to https://www.ncs.gov.in) + "Save" bookmark icon

Urgent jobs: orange "URGENT" banner across top-right corner
```

---

### `src/pages/jobseeker/JSSchemes.jsx`

**Goal:** Government schemes marketplace.

Layout: Sidebar + main.

**6 scheme cards (2-col grid):**
```
PMKVY 4.0        | Ministry of Skill Dev  | Free training + ₹500 stipend   | 18-45 years
PM Kaushal Vikas | NSDC                   | ₹8,000 course subsidy          | Below ₹1.5L income
NSDC Scholarship | NSDC                   | Up to ₹50,000/year             | Merit based
Startup India    | DPIIT                  | ₹10L seed fund + mentoring     | Innovative idea
DigiLocker Cert  | MeitY                  | Free digital credential vault  | All citizens
State Skill Msn  | State Govt             | District-specific training     | Local residents

Each card:
  Ministry logo placeholder (colored circle)
  Scheme name + ministry
  Benefit description (featured, large)
  Eligibility chips
  "Check Eligibility" button → opens eligibility modal with 3 yes/no questions
  "Apply Now" external link
```

---

### `src/pages/jobseeker/JSHealth.jsx`

**Goal:** Career Health deep dive report.

Layout: Sidebar + main.

**Top — Health Score Arc (large, centered):**
```
SVG arc gauge 280px, animated draw on mount
Score: 42/100, label: "Needs Attention"
Color band: 0-40 red, 41-60 orange, 61-80 blue, 81-100 emerald

Recommendation pill below: 
"Add SQL → score jumps to 61 in 6 weeks" (emerald, arrow icon)
```

**Sub-scores (5 horizontal bars):**
```
Each bar:
  Label left, score right (e.g., "8/20")
  Filled bar animated on mount
  Small tooltip: what this measures
```

**Risk Cards (3 red-bordered cards):**
```
From store.analysis.career_health_breakdown.top_risks
Icon: AlertTriangle, color: red-400
Title: risk name
Body: "What this means for your employability"
Action: "Fix This →" button
```

**Prediction Card:**
```
"If you complete SQL + Power BI in 10 weeks:
 Career Health: 42 → 73 (+31 points)
 Expected Salary: ₹18,000 → ₹26,000/month
 Job Matches: 34 → 67 in your district"
Gradient border, emerald accent
```

---

### `src/pages/jobseeker/JSResume.jsx`

**Goal:** Resume Intelligence Engine — premium two-state UI.

Layout: Sidebar + main.

**STATE 1 — Upload:**
```
Large centered upload zone (dashed border, rounded-2xl):
  Drag-and-drop area with upload icon (cloud-upload from lucide)
  "Drag your resume here or click to browse"
  "Supports PDF, DOCX up to 5MB"
  
Below: "— or —" divider

"Try with sample resume" button (outlined, slate)
  → instantly loads mock results without file upload

File accepted: shows filename chip + "Analyzing..." shimmer state (1.5s) → STATE 2
```

**STATE 2 — Results:**
```
TOP: ATS Score bar
  Label: "ATS Compatibility Score"
  Large number: 58 (animated count-up)
  Bar: orange fill, animated width to 58% on mount
  Sub-label: "Upload to ATS: Medium Risk — 42% chance of rejection"

SECTION: Rewritten Bullet Points (3 comparison cards)
  Each card: two-panel layout
    LEFT (Before — red tint, strikethrough): original weak bullet
    RIGHT (After — emerald tint, bold): AI-rewritten version
  Three comparisons:
    "Worked on customer complaints" → "Resolved 120+ customer escalations monthly, reducing churn by 18%"
    "Made Excel reports" → "Built 15+ automated Excel dashboards tracking ₹2.4Cr in monthly revenue"
    "Helped team with tasks" → "Coordinated cross-functional team of 8, delivering 3 projects ahead of deadline"

SECTION: Missing Skills (3 chip cards)
  SQL: +₹8,000/month impact — "6 weeks to learn"
  Power BI: +₹6,000/month — "4 weeks"
  Python: +₹12,000/month — "10 weeks"

SECTION: Format Suggestions (list)
  ✓ Add a summary section at the top
  ✓ Quantify at least 3 more achievements with numbers
  ✓ Remove "References available on request"
  ✓ Use consistent date format (MM/YYYY)

BOTTOM: "Generate My Learning Roadmap" btn-blue → /roadmap
        "Download Improved Resume Tips" button → shows toast "PDF coming soon"
```

---

### `src/pages/jobseeker/JSInterview.jsx`

**Goal:** AI Mock Interview with voice. Impressive, interactive.

Layout: Sidebar + main.

**Interview Setup Panel (initial state):**
```
Role selector: dropdown "Data Analyst" (pre-selected), "MIS Executive", "Operations Coordinator"
Difficulty: Easy / Medium / Hard (toggle chips)
Type: Technical / Behavioral / Mixed (toggle chips)
"Start Interview" btn-blue (large, full width)
```

**Interview Active State:**
```
Question display card (large, centered, dark blue border):
  Question number: "Question 2 of 5"
  Question text: large, readable
  "🔊 Listen" button (text-to-speech with SpeechSynthesis)

Answer recording section:
  Big round mic button (w-20 h-20):
    Default: slate background, Mic icon
    Recording: red pulse animation, "Recording... tap to stop"
  OR text input alternative for typed answers

After answer submitted — Score card animates in:
  3 score bars (animate from 0 to value):
    Communication:  72/100  (blue bar)
    Clarity:        68/100  (blue bar)  
    Confidence:     81/100  (emerald bar)
  
  AI Tip card (amber border):
    "💡 Pro Tip: [specific feedback]"
    "Use specific numbers — instead of 'many projects', say '14 projects in 6 months'"

Buttons: "Try Again" (ghost) | "Next Question →" (btn-blue)

Progress: "Question 2/5" pill at top
```

**5 preset question sets per role — Data Analyst questions:**
```
1. "Tell me about yourself and your data experience."
2. "How would you approach cleaning a dataset with 30% missing values?"
3. "Describe a time you turned data into a business decision."
4. "What is the difference between SQL JOIN types?"
5. "Where do you see yourself as a Data Analyst in 3 years?"
```

---

### `src/pages/bluecollar/BCOnboarding.jsx`

**Goal:** Zero typing required. Pure tap-based. Accessible.

Full screen. Emerald theme. Large text throughout (text-lg minimum).

**Step 1 — "Aap kya kaam karte ho?"**
```
8 large picture cards (2x4 grid, .picture-card class):
🔧 Plumber    ⚡ Electrician   🧱 Raj Mistri   🪚 Carpenter
🔥 Welder     🚗 Driver        ✂️ Darzi         👷 Helper

Each card: emoji (text-4xl) + Hindi label (text-lg font-bold) + English subtitle (text-sm text-slate-400)
Tap → glows emerald, stores selection
```

**Step 2 — "Aap kahan se ho?"**
```
Large tap buttons (not dropdown) for 10 districts:
Lucknow, Sitapur, Varanasi, Agra, Kanpur, Gorakhpur, Allahabad, Meerut, Bareilly, Jhansi
Each button: 80px height, text-lg, emerald border on select
```

**Step 3 — "Kitna tajurba hai?"**
```
4 large choice buttons:
"0-1 Saal" | "2-3 Saal" | "4-6 Saal" | "7+ Saal"
Full width each, stacked vertically, large tap targets
```

Progress dots (3 circles) at top showing current step.
Bottom: "Aage Badhein →" emerald button, appears only after selection made.
On complete: `setBcProfile(...)`, navigate `/simple/dashboard`

---

### `src/pages/bluecollar/BCDashboard.jsx`

**Goal:** Simple, large-print, picture-first main screen.

Top greeting: "Namaste Ramesh! 👋" (text-2xl font-bold)
Sub: "Aaj 4 naukri mile hain aapke liye" (text-lg text-emerald-400)

**4 Large Action Tiles (2x2 grid, very large tap targets min-height 140px):**
```
💼 Naukri Dhundho    →  /simple/jobs      (blue bg)
🏛️ Sarkari Yojana   →  /simple/schemes   (purple bg)
📚 Seekho           →  /simple/learn     (emerald bg)
🤖 Sahayak AI       →  /simple/chat      (slate bg with glow)
```

**2 Urgent Job Preview Cards (below grid):**
```
From bcJobs where urgent:true
Big emoji, job title, distance, salary
"ABHI APPLY KARO" (red badge)
```

**e-Shram Registration CTA (bottom, orange banner):**
```
"🪪 e-Shram Card banao — ₹2 Lakh insurance FREE milega!"
"Abhi Register Karo →" button linking to https://eshram.gov.in
```

**Bottom nav bar (mobile):**
```
4 icons: Home | Naukri | Yojana | Seekho
Sticky, emerald active indicator
```

---

### `src/pages/bluecollar/BCJobs.jsx`

**Goal:** Job cards designed for low-literacy users. Big, clear, visual.

Back button + "Naukri" heading (text-2xl).

**Each job card (large, tapable, full width):**
```
Left: Trade emoji in 64px circle (colored bg)
Center: 
  Job title (text-xl font-bold)
  Company + location (text-base text-slate-300)
  Distance chip: "42 km door"
  Salary: "₹18,000/maah" (text-lg font-bold text-emerald-400)
Right: 
  "JALDI" badge if urgent (red, animate-pulse)
  "Apply Karo" button (emerald, large)
```

Filter chips at top: "Sabhi" | "Paas waali" | "Govt" | "Urgent"

---

### `src/pages/bluecollar/BCSchemes.jsx`

**Goal:** Government schemes in simple Hindi.

Heading: "Sarkari Yojana" + "Aapke liye fayde" subtitle.

**Scheme cards from store.bcSchemes:**
```
Large emoji (text-5xl, centered)
Scheme name (text-xl font-bold)
Benefit (text-lg, emerald text) — the main value prop
Eligibility (text-sm, slate-300)
"Aur Jaano →" button → external link
```

---

### `src/pages/bluecollar/BCStubs.jsx`

Build three COMPLETE components (not stubs):

**BCLearn:**
```
Heading: "Seekho 📚" 
Subtext: "Apne phone se naye skills seekho"

Module cards from store.bcLearnModules:
  Emoji + title + duration + difficulty level
  Completed: green checkmark
  Not completed: "Shuru Karo →" emerald button
  
Module detail modal (on click):
  Full screen overlay
  Video placeholder (dark rectangle with play button)
  Step-by-step instructions (numbered, large text)
  "✓ Complete kar liya" button → marks completed in store
```

**BCBusiness (Livelihood Help):**
```
Heading: "Vyapar Seekho 🏪"
4 large guide cards:
  
  💳 UPI Payment Guide:
    Step-by-step: "1. PhonePe kholo → 2. Send Money dabao → 3. Number daalo → 4. Amount → Send"
    Each step in numbered card with icon
    "Practice karo" CTA
    
  🏢 Udyam Registration:
    "Apna business officially register karo"
    Benefits list: GST exemption, bank loan easier, govt tenders
    "Register Karo →" → https://udyamregistration.gov.in
    
  🏦 MUDRA Loan Apply:
    "₹50,000 tak loan bina guarantee"
    Steps: Bank jaao → Form bharo → Documents do → 7 din mein loan
    "Nearest Bank Dhundho →" button
    
  📋 GST Basics:
    "GST kya hai simple language mein"
    Mini explainer with icons
    "GST Register Karo →" → GST portal
```

**BCChat:**
```jsx
// Renders AIChatPanel directly
import AIChatPanel from '../../components/AIChatPanel'
export function BCChat() {
  return <AIChatPanel userType="bluecollar" isOpen={true} onClose={() => window.history.back()} />
}
```

---

### `src/pages/govt/GovtLogin.jsx`

**Goal:** Clean, authoritative login. Purple theme.

Full screen split layout:
```
LEFT (hidden on mobile): 
  Dark gradient panel
  KaushalAI logo + tagline
  3 key stats: "48,210 Workers Tracked" | "47.4% Placement Rate" | "3 Fraud Alerts Active"
  
RIGHT: 
  Login card (glass-card)
  "District Officer Login" heading
  "Powered by KaushalBridge AI" subtitle
  
  Fields:
    Officer ID: pre-filled "NAGPUR-DC-001"
    Password: pre-filled "admin123" (type="password" with show/hide toggle)
    District: dropdown pre-selected "Nagpur"
  
  "Login as Demo Admin" button (btn-purple, large, full width)
    → sets govtProfile in store → navigate /govt/dashboard
    
  Below: small text "Demo credentials pre-filled for evaluation"
```

---

### `src/pages/govt/GovtDashboard.jsx`

**Goal:** District intelligence command center. Most impressive page in the app.

Layout: Purple-themed Sidebar + main content.

Govt Sidebar items:
```
LayoutDashboard  "Dashboard" (active)
TrendingUp       "Skill Gaps"
Building2        "Training Centers"
AlertTriangle    "Fraud Alerts"
Users            "NGO Partners"
FileBarChart     "Reports"
```

**Section 1 — Stats Row (5 cards):**
```
Workers Registered: 48,210    (Users icon, blue)
Trained Q1:         3,847     (GraduationCap, emerald)
Verified Placements: 1,823    (CheckCircle, emerald)
Placement Rate:     47.4%     (TrendingUp, blue — above PMKVY baseline)
Fraud Alerts:       3 Active  (AlertTriangle, red animate-pulse)
```

**Section 2 — Skill Gap Heatmap Table:**
```
Column headers: Skill | Demand | Supply | Gap | Urgency | Action

Color-coded urgency badges:
  critical: red animate-pulse badge
  high:     orange badge
  oversupply: slate badge with ↓ icon

"Allocate Training Budget" button per critical row
"Export to Excel" button top-right of table
```

**Section 3 — Training Funnel (visual):**
```
Horizontal funnel visualization:
  Enrolled(3847) → In Progress(2910) → Certified(2241) → Placed(1823)
  
Each stage: large number + percentage of enrolled + colored bar
Arrow connectors between stages
Drop-off callout: "924 dropped between Enrolled → In Progress — investigate"
```

**Section 4 — Monthly Trend Chart (CSS-based bar chart):**
```
5 months of data from store.govtStats.monthlyTrend
Two bars per month: Enrolled (blue) + Placed (emerald)
Labels at bottom, values at top of each bar
"Placement improving: +150% since October" insight card below
```

**Section 5 — Fraud Alert Panel:**
```
3 alert cards from store.govtStats.fraudAlerts:

Each card:
  Severity badge (critical=red, high=orange, medium=yellow) with pulsing dot
  Center ID + Center Name (bold)
  Issue description
  Count: "X suspicious credentials"
  Two buttons: "Investigate →" (marks investigating, changes badge) | "Dismiss"
  
At top: "🚨 3 Active Fraud Alerts — Immediate Action Required" banner
```

**Section 6 — Top Centers + NGO Partners (side by side):**
```
Left: Top Performing Centers table
  Name | Trade | Placed | Rate % | Status
  Rank 1 gets golden ⭐ badge

Right: NGO Partner Cards (from store.govtStats.ngoPartners)
  NGO name + sector + students trained + placement count
  "View Report →" button
```

**Floating "Generate Report" button (bottom right, fixed):**
```
Purple, rounded-full, shadow-lg
Click → shows toast "PDF Report generation coming soon"
```

---

## STEP 4 — NEW FEATURE IMPLEMENTATIONS

### FEATURE 1: Interactive AI Roadmap Builder (JSRoadmap.jsx enhancement)

Already described above in JSRoadmap section. Key additions:

Add to `useAppStore.js`:
```js
updateRoadmapModule: (weekId, updates) =>
  set((state) => ({
    roadmap: {
      ...state.roadmap,
      modules: state.roadmap.modules.map((m) =>
        m.week === weekId ? { ...m, ...updates } : m
      ),
    },
  })),

addCustomModule: (module) =>
  set((state) => ({
    roadmap: {
      ...state.roadmap,
      modules: [...state.roadmap.modules, { ...module, status: 'custom' }],
    },
  })),
```

### FEATURE 2: Resume Analysis (JSResume.jsx)
Already fully specified above — build it completely, no shortcuts.

### FEATURE 3: AI Mock Interview (JSInterview.jsx)
Already fully specified above — build it completely with Web Speech API integration.

### FEATURE 4: BCLearn + BCBusiness (BCStubs.jsx)
Already fully specified above — build both as complete functional pages.

### FEATURE 5: NGO / Training Partner Section
Add to GovtDashboard Section 6 (NGO Partners) — already included above.

Also create `src/pages/govt/NGOPortal.jsx` as a separate page:
```
Route: /govt/ngo (add to App.jsx)

NGO Dashboard — simpler version of GovtDashboard focused on one center:
  Header: "Ambedkar Skill Centre — Batch Dashboard"
  
  Section 1: Current Batch Stats (4 cards):
    Active Students: 86 | On Track: 71 | Behind: 15 | Placements: 0 (ongoing)
  
  Section 2: Student Progress Table:
    Mock 8 student rows: Name | Trade | Progress % | Last Active | Status
    Status badges: On Track (emerald) | At Risk (orange) | Completed (blue)
    "Send Reminder" button on At Risk rows
  
  Section 3: Placement Tracker:
    3 placed students (mock): Name | Company | Salary | Date
    "Report Placement" button → opens modal with form
  
  Section 4: Government Report Status:
    Quarterly report submission status
    "Submit Q1 Report" button (purple)
```

### FEATURE 6: Chat History Persistence

Already included in the updated `useAppStore.js` above — the `chatHistory` initial state reads from `localStorage`, and `addChatMessage` writes to `localStorage` on every update.

Also update `AIChatPanel.jsx`:
```jsx
// Add a "Clear History" button in the header:
<button 
  onClick={() => { clearChat(); }}
  className="text-xs text-slate-500 hover:text-red-400 transition-colors mr-2"
>
  Clear
</button>

// Show "Conversation saved" indicator in header:
<span className="text-xs text-emerald-500/60">● Saved</span>
```

---

## STEP 5 — UPDATE App.jsx

Add the new NGO route:
```jsx
import JSResume from './pages/jobseeker/JSResume'
import JSInterview from './pages/jobseeker/JSInterview'
import NGOPortal from './pages/govt/NGOPortal'

// Add routes:
<Route path="/resume" element={<JSResume />} />
<Route path="/interview" element={<JSInterview />} />
<Route path="/govt/ngo" element={<NGOPortal />} />
```

---

## FINAL QUALITY CHECKLIST

Before saying you're done, verify EVERY item:

**Functionality:**
- [ ] Every route renders without crashing
- [ ] AIChatPanel works (no undefined errors)
- [ ] Voice recording works (SpeechRecognition) on interview + BC onboarding
- [ ] Text-to-speech works (SpeechSynthesis) on chat + interview
- [ ] All "Apply", "Enroll", "Register" buttons have real external links
- [ ] LocalStorage chat persistence works across page refreshes
- [ ] Roadmap "Suggest Alternative" calls Gemini and shows response
- [ ] BCLearn module completion marks as done in store

**Design:**
- [ ] No page has placeholder text like "Lorem ipsum" or "Coming soon"
- [ ] No empty white/default sections
- [ ] All score bars/progress rings animate on mount
- [ ] All cards have hover effects
- [ ] Mobile layout works (no overflow, no broken grids)
- [ ] All 3 color themes applied correctly (blue/emerald/purple)
- [ ] Sidebar is shared component, works on all pages
- [ ] Loading states shown where applicable (shimmer/pulse)

**Build all files now. Start with:**
1. `src/store/useAppStore.js` (full replacement)
2. `src/index.css` (add new animations)
3. `src/components/Sidebar.jsx`
4. `src/components/AIChatPanel.jsx` (bug fixes)
5. Job Seeker pages in order: Basic → Skills → Analyzing → Dashboard → Analysis → Roadmap → Jobs → Schemes → Health → Resume → Interview
6. Blue Collar pages: BCOnboarding → BCDashboard → BCJobs → BCSchemes → BCStubs
7. Government pages: GovtLogin → GovtDashboard → NGOPortal
8. `src/App.jsx` (final route update)

**Output every file completely. No partial files. No "rest of file unchanged". Every file from first line to last line.**
