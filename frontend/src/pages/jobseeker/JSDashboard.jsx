import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    Heart, 
    Target, 
    Zap, 
    MapPin, 
    ArrowRight, 
    TrendingUp,
    BarChart2,
    Map as MapIcon,
    Briefcase,
    MessageSquare
} from 'lucide-react'

export default function JSDashboard() {
    const navigate = useNavigate()
    const { profile, analysis, chatOpen, setChatOpen } = useAppStore()

    const name = profile?.name || 'Raju'
    const match = analysis?.career_matches?.[0]
    const healthScore = analysis?.career_health_score || 0

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none">
                <div className="max-w-6xl mx-auto space-y-8 pb-20 mt-14 lg:mt-0">
                    
                    {/* Section 1 - Welcome Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900/40 border border-slate-700/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 opacity-0 animate-fade-in shadow-xl">
                        
                        {/* Subtly animated background pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                        <div className="relative z-10">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                                Good morning, {name} <span className="inline-block animate-bounce">👋</span>
                            </h1>
                            <p className="text-slate-400 text-sm sm:text-base font-medium">Your career intelligence is ready.</p>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/80 border border-slate-700/50 backdrop-blur shadow-lg group hover:border-orange-500/50 transition-colors cursor-pointer" onClick={() => navigate('/health')}>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Career Health</div>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-4xl font-black tracking-tighter ${healthScore < 50 ? 'text-orange-500' : healthScore < 75 ? 'text-blue-500' : 'text-emerald-500'}`}>
                                    {healthScore}
                                </span>
                                <span className="text-sm font-semibold text-slate-500">/100</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 - Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                        
                        <div className="stat-card group hover:border-orange-500/30 transition-all duration-300 cursor-pointer" onClick={() => navigate('/health')}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Health</span>
                                <Heart size={16} className="text-orange-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{healthScore}<span className="text-lg text-slate-500 font-medium">/100</span></div>
                            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                <TrendingUp size={12} /> ↑ 8 pts potential
                            </div>
                        </div>

                        <div className="stat-card group hover:border-blue-500/30 transition-all duration-300 cursor-pointer" onClick={() => navigate('/analysis')}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Top Match</span>
                                <Target size={16} className="text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{match?.match_percentage || 0}<span className="text-lg text-slate-500 font-medium">%</span></div>
                            <div className="text-xs text-blue-400 font-semibold truncate leading-normal">
                                {match?.career_title || 'Pending'}
                            </div>
                        </div>

                        <div className="stat-card group hover:border-purple-500/30 transition-all duration-300 cursor-pointer" onClick={() => navigate('/roadmap')}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Skill Gap</span>
                                <Zap size={16} className="text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{analysis?.skill_gaps?.length || 0}</div>
                            <div className="text-xs text-purple-400 font-semibold truncate leading-normal">
                                {analysis?.skill_gaps?.[0]?.skill_name || 'None'} is priority #1
                            </div>
                        </div>

                        <div className="stat-card group hover:border-emerald-500/30 transition-all duration-300 cursor-pointer" onClick={() => navigate('/jobs')}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Jobs Near You</span>
                                <MapPin size={16} className="text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1 count-up">34</div>
                            <div className="text-xs text-emerald-400 font-semibold truncate leading-normal">
                                In {profile?.district || 'Jaipur'} district
                            </div>
                        </div>

                    </div>

                    {/* Section 4 - Quick Actions (Placed above matches for better hierarchy) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <button onClick={() => navigate('/analysis')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-blue-500/50 transition-all group active:scale-95">
                            <BarChart2 size={24} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-slate-300">Analyze Skills</span>
                        </button>
                        <button onClick={() => navigate('/roadmap')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-purple-500/50 transition-all group active:scale-95">
                            <MapIcon size={24} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-slate-300">View Roadmap</span>
                        </button>
                        <button onClick={() => navigate('/jobs')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-emerald-500/50 transition-all group active:scale-95">
                            <Briefcase size={24} className="text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-slate-300">Find Jobs</span>
                        </button>
                        <button onClick={() => setChatOpen(true)} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-orange-500/50 transition-all group active:scale-95 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 scale-150 group-hover:scale-100 transition-transform"></div>
                            <MessageSquare size={24} className="text-orange-400 mb-2 group-hover:scale-110 transition-transform relative z-10" />
                            <span className="text-xs font-bold text-slate-300 relative z-10">Ask AI</span>
                        </button>
                    </div>

                    {/* Section 3 - Top Career Matches */}
                    <div className="opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                            <h2 className="text-lg font-bold text-white tracking-tight">Top Career Matches</h2>
                            <span className="ml-auto text-xs font-bold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 shadow-inner">
                                {analysis?.career_matches?.length || 0} found
                            </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {analysis?.career_matches?.map((match, i) => (
                                <div key={i} className="glass-card p-5 group flex flex-col h-full hover:border-slate-600/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`text-2xl font-black tracking-tighter ${match.match_percentage >= 80 ? 'text-emerald-400' : match.match_percentage >= 65 ? 'text-blue-400' : 'text-slate-400'}`}>
                                            {match.match_percentage}%
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-blue-400 transition-colors">
                                        {match.career_title}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-400 mb-5 flex items-center gap-1">
                                        ₹{(match.salary_today / 1000).toFixed(0)}K <ArrowRight size={10} /> ₹{(match.salary_3_years / 1000).toFixed(0)}K/mo
                                    </p>
                                    
                                    <div className="text-xs font-bold font-mono text-slate-500 mb-2 uppercase tracking-wide">Missing Skills:</div>
                                    <div className="flex flex-wrap gap-1.5 mb-6 flex-1">
                                        {match.missing_skills.map((skill, j) => (
                                            <span key={j} className="text-[10px] font-bold text-orange-300 bg-orange-900/30 border border-orange-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <button onClick={() => navigate('/roadmap')} className="w-full py-2.5 text-xs font-bold bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-auto">
                                        View Roadmap <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 5 - Skill Gap Snapshot */}
                    <div className="opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                            <h2 className="text-lg font-bold text-white tracking-tight">Skill Gap Snapshot</h2>
                        </div>
                        
                        <div className="glass-card p-5 space-y-5">
                            {analysis?.skill_gaps?.map((gap, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-sm text-slate-200">{gap.skill_name}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border
                                                ${gap.demand_trajectory === 'EMERGING' ? 'bg-purple-900/30 text-purple-300 border-purple-500/30' : 
                                                  gap.demand_trajectory === 'RISING' ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' : 
                                                  'bg-slate-800 text-slate-400 border-slate-700'}`}
                                            >
                                                {gap.demand_trajectory}
                                            </span>
                                        </div>
                                        <div className="text-xs font-bold text-emerald-400">
                                            +₹{gap.salary_impact}/mo
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                                            {/* Minimal progress for unlearned skills just to show scale */}
                                            <div className="h-full bg-slate-600 w-[5%] group-hover:bg-purple-500 transition-colors duration-500"></div>
                                        </div>
                                        <span className="text-[10px] font-bold font-mono text-slate-500 whitespace-nowrap min-w-[60px] text-right uppercase">
                                            {gap.weeks_to_learn} wks
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            {chatOpen && <AIChatPanel />}
        </div>
    )
}
