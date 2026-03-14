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
