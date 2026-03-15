import { create } from 'zustand'

const API_BASE = 'http://localhost:8000/api'

const useAppStore = create((set, get) => ({
  // ─── SHARED ──────────────────────────────────────────
  category: null,
  setCategory: (cat) => set({ category: cat }),
  userType: 'jobseeker',
  setUserType: (type) => set({ userType: type }),

  // ─── JOB SEEKER ──────────────────────────────────────
  profile: { name: 'Rahul', district: 'Patna', education: 'Graduate', skills: ['Excel', 'SQL'], summary: 'Enthusiastic professional looking for data-driven roles.' },
  setProfile: (profile) => set({ profile }),

  analysis: {
    career_health_score: 42,
    career_matches: [],
    skill_gaps: [],
    latent_skills: [],
    career_health_breakdown: {
      skill_demand: 0,
      top_risks: [],
    },
  },
  setAnalysis: (analysis) => set({ analysis }),

  fetchAnalysis: async (userData) => {
    set({ loading: true })
    try {
      const currentProfile = get().userType === 'bluecollar' ? get().bcProfile : get().profile;
      
      const payload = userData || {
        skills: currentProfile?.skills || [],
        district: currentProfile?.district || 'Patna',
        education: currentProfile?.education || 'Graduate',
        experience_years: currentProfile?.experience || 0
      }

      const resp = await fetch(`${API_BASE}/jobseeker/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await resp.json()
      
      set({ 
        analysis: data, 
        roadmap: data.roadmap || get().roadmap,
        loading: false 
      })
      
    } catch (err) {
      console.error('Failed to fetch analysis:', err)
      // Robust fallback for demo - Role-specific
      const isDriver = (get().profile?.skills || []).some(s => s.toLowerCase().includes('drive')) || 
                       (get().profile?.name?.toLowerCase().includes('driver'));
      
      const fallbackAnalysis = isDriver ? {
        career_health_score: 65,
        career_matches: [
          { career_title: "Heavy Truck Driver", match_percentage: 92, salary_today: 18000, salary_3_years: 35000, missing_skills: ["Navigation Tech", "Safety Safety"], automation_risk: 15 },
          { career_title: "Logistics Coordinator", match_percentage: 70, salary_today: 22000, salary_3_years: 45000, missing_skills: ["Basic Computer"], automation_risk: 30 }
        ],
        skill_gaps: [
          { skill_name: "Advanced Route Optimization", salary_impact: 5000, weeks_to_learn: 2, demand_trajectory: "RISING" },
          { skill_name: "EV Charging Infrastructure", salary_impact: 8000, weeks_to_learn: 3, demand_trajectory: "EMERGING" }
        ],
        genome_shortcut: { message: "Your 5 years of experience saves you 4 weeks on 'Safety Protocols' module.", saved_weeks: 4 }
      } : {
        career_health_score: 42,
        career_matches: [
          { career_title: "Data Analyst", match_percentage: 85, salary_today: 35000, salary_3_years: 75000, missing_skills: ["SQL", "Python"], automation_risk: 12 },
          { career_title: "MIS Executive", match_percentage: 92, salary_today: 28000, salary_3_years: 45000, missing_skills: ["Advanced Excel"], automation_risk: 45 }
        ],
        skill_gaps: [
          { skill_name: "SQL Database Control", salary_impact: 12000, weeks_to_learn: 4, demand_trajectory: "EMERGING" },
          { skill_name: "Python for Automation", salary_impact: 18000, weeks_to_learn: 8, demand_trajectory: "RISING" }
        ],
        genome_shortcut: { message: "Excel proficiency detected. Bypassing introductory modules. Save 3 weeks.", saved_weeks: 3 }
      };

      const fallbackRoadmap = isDriver ? {
        current_week: 1,
        progress_percentage: 15,
        modules: [
          { id: "m1", title: "Defensive Driving & Safety", week: 1, status: "current", resources: ["Safety First PDF", "Eco-Driving Tips Video"] },
          { id: "m2", title: "Route Planning Tools", week: 2, status: "locked", resources: ["Google Maps for Business"] },
          { id: "m3", title: "EV Logistics Basics", week: 3, status: "locked", resources: ["Charging Networks Intro"] }
        ]
      } : {
        current_week: 3,
        progress_percentage: 45,
        modules: [
          { id: "m1", title: "Data Visualization Basics", week: 1, status: "completed", resources: ["Excel Charts Mastery"] },
          { id: "m2", title: "Advanced Formulas", week: 2, status: "completed", resources: ["VLOOKUP to XLOOKUP"] },
          { id: "m3", title: "Intro to SQL", week: 3, status: "current", resources: ["Select Queries Video", "SQLBolt Interactive"] },
          { id: "m4", title: "Data Cleaning with Python", week: 4, status: "locked", resources: ["Pandas Intro"] }
        ]
      };

      set({ 
        analysis: fallbackAnalysis,
        roadmap: fallbackRoadmap,
        loading: false 
      })
    }
  },

  roadmap: null,
  setRoadmap: (roadmap) => set({ roadmap }),
  
  // ─── CHAT ───────────────────────────────────────────
  chatOpen: false,
  setChatOpen: (open) => set({ chatOpen: open }),
  chatHistory: [],
  addChatMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
  
  sendChatMessage: async (message, userTypeOverride) => {
    const { chatHistory, userType, profile, bcProfile, govtProfile, analysis } = get()
    const activeUserType = userTypeOverride || userType;
    
    // Select active profile for context
    let activeProfile = profile;
    if (activeUserType === 'bluecollar') activeProfile = bcProfile;
    if (activeUserType === 'govt') activeProfile = govtProfile;

    const userMsg = { role: 'user', content: message }
    set((state) => ({ chatHistory: [...state.chatHistory, userMsg], loading: true }))

    try {
      const resp = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          history: chatHistory, 
          user_type: activeUserType,
          profile: activeProfile,
          analysis
        }),
      })
      const data = await resp.json()
      const aiMsg = { role: 'assistant', content: data.reply }
      set((state) => ({ chatHistory: [...state.chatHistory, aiMsg], loading: false }))
    } catch (err) {
      console.error('Chat failed:', err)
      const fallback = activeUserType === 'bluecollar' 
        ? "Namaste! Main KaushalAI Assistant hoon. Main aapki career goals achieve karne mein madad kar sakta hoon. Poochiye apna sawaal!"
        : "I apologize, our intelligence servers are experiencing high load. How can I assist you with your career today?";
      set((state) => ({ 
        chatHistory: [...state.chatHistory, { role: 'assistant', content: fallback }],
        loading: false
      }))
    }
  },

  // ─── BLUE COLLAR ─────────────────────────────────────
  bcProfile: { name: 'Arjun', trade: 'Skilled Worker', district: 'Lucknow', experience: 5, salary: 18000, skills: ['Driving', 'Logistics'], summary: 'Dedicated professional with extensive experience in transport and logistics.' },
  setBcProfile: (p) => set({ bcProfile: p }),

  // ─── JOBS & SCHEMES ────────────────────────────────
  jobs: [],
  fetchJobs: async (district) => {
    try {
      const targetDistrict = district || get().profile?.district || 'Patna'
      const resp = await fetch(`${API_BASE}/jobseeker/jobs?district=${targetDistrict}`)
      const data = await resp.json()
      
      // Transform backend data to match frontend property names
      const transformedJobs = (data.jobs || []).map(j => ({
        ...j,
        role: j.title,
        location: j.district,
        skills: j.required_skills || [],
        match: j.match_percentage || 85,
        type: j.job_type || 'Full-time'
      }))
      
      set({ jobs: transformedJobs })
    } catch (err) {
      console.error('Jobs fetch failed:', err)
    }
  },

  schemes: [],
  fetchSchemes: async () => {
    try {
      const resp = await fetch(`${API_BASE}/jobseeker/schemes`)
      const data = await resp.json()
      
      const transformedSchemes = (data.schemes || []).map(s => ({
        ...s,
        title: s.name, // Map name to title
        icon: s.emoji || s.icon // Ensure icon exists
      }))
      
      set({ schemes: transformedSchemes })
    } catch (err) {
      console.error('Schemes fetch failed:', err)
    }
  },

  bcJobs: [],
  fetchBcJobs: async (district) => {
    try {
      const targetDistrict = district || get().bcProfile?.district || 'Lucknow'
      const resp = await fetch(`${API_BASE}/jobseeker/jobs?district=${targetDistrict}`)
      const data = await resp.json()
      
      // Transform backend data to match frontend property names
      const transformedJobs = (data.jobs || []).map(j => ({
        ...j,
        role: j.title,
        location: j.district,
        skills: j.required_skills || [],
        match: j.match_percentage || 85,
        type: j.job_type || 'Full-time'
      }))
      
      set({ bcJobs: transformedJobs })
    } catch (err) {
      console.error('Jobs fetch failed:', err)
    }
  },

  bcSchemes: [],
  fetchBcSchemes: async () => {
    try {
      const resp = await fetch(`${API_BASE}/jobseeker/schemes`)
      const data = await resp.json()
      
      const transformedSchemes = (data.schemes || []).map(s => ({
        ...s,
        title: s.name, // Map name to title
        icon: s.emoji || s.icon // Ensure icon exists
      }))
      
      set({ bcSchemes: transformedSchemes })
    } catch (err) {
      console.error('Schemes fetch failed:', err)
    }
  },

  bcLearnModules: [
    { id: 1, title: 'Pehla WhatsApp Call', img: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&q=80', duration: '10 min', level: 'Bilkul basic', completed: true },
    { id: 2, title: 'Google Maps Use Karo', img: 'https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?w=400&q=80', duration: '8 min', level: 'Basic', completed: true },
    { id: 3, title: 'UPI Payment Karna Seekho', img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e41?w=400&q=80', duration: '12 min', level: 'Basic', completed: false },
  ],

  // ─── PROFILE MANAGEMENT ───────────────────────────
  updateProfile: (userType, data) => {
    if (userType === 'jobseeker') set({ profile: { ...get().profile, ...data } })
    else if (userType === 'bluecollar') set({ bcProfile: { ...get().bcProfile, ...data } })
    else if (userType === 'govt') set({ govtProfile: { ...get().govtProfile, ...data } })
  },

  enhanceProfile: async (userType, profile_data) => {
    try {
      const resp = await fetch(`${API_BASE}/ai/enhance-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_type: userType, profile_data }),
      })
      const data = await resp.json()
      return data.enhanced_summary
    } catch (err) {
      console.error('Profile enhancement failed:', err)
      return null
    }
  },

  // ─── GOVERNMENT ──────────────────────────────────────
  govtProfile: { 
    name: 'Ramesh IAS', 
    designation: 'District Collector', 
    department: 'Nagpur Administration',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    summary: 'Dedicated civil servant focused on regional skill development and labor welfare.'
  },
  govtStats: null,
  
  // ─── INTERVIEW ─────────────────────────────────────
  interviewTranscript: [],
  setInterviewTranscript: (t) => set({ interviewTranscript: t }),
  
  fetchInterviewResponse: async (role, message, history, mode = 'question') => {
    set({ loading: true })
    try {
      const resp = await fetch(`${API_BASE}/ai/interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, message, history, mode }),
      })
      const data = await resp.json()
      set((state) => ({ 
        interviewTranscript: [...state.interviewTranscript, { role: 'assistant', content: data.reply }],
        loading: false 
      }))
      return data.reply
    } catch (err) {
      console.error('Interview API failed:', err)
      set({ loading: false })
      return mode === 'feedback' 
        ? "You did a great job! Your technical clarity is impressive." 
        : "Interesting. Can you tell me more about how you handle pressure at work?";
    }
  },
}))

export default useAppStore
