import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    Zap, 
    TrendingUp, 
    TrendingDown, 
    ArrowRight,
    ExternalLink,
    AlertCircle,
    CheckCircle2
} from 'lucide-react'

function CircularGauge({ score }) {
    const [offset, setOffset] = useState(230 * Math.PI) // 2 * pi * r
    const r = 115
    const circ = 2 * Math.PI * r

    useEffect(() => {
        // SVG arc animation
        const timer = setTimeout(() => {
            const progress = score / 100
            setOffset(circ - progress * circ)
        }, 300)
        return () => clearTimeout(timer)
    }, [score, circ])

    const colorClass = score < 50 ? 'text-orange-500' : score < 76 ? 'text-blue-500' : 'text-emerald-500'
    const strokeColor = score < 50 ? '#F97316' : score < 76 ? '#3B82F6' : '#10B981'

    return (
        <div className="relative w-[280px] h-[280px] flex items-center justify-center mx-auto">
            <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle 
                    cx="140" cy="140" r={r} 
                    fill="none" 
                    stroke="#1E293B" 
                    strokeWidth="16" 
                    className="opacity-50"
                />
                {/* Progress circle */}
                <circle 
                    cx="140" cy="140" r={r} 
                    fill="none" 
                    stroke={strokeColor} 
                    strokeWidth="16" 
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    className="transition-all duration-1500 ease-out drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-6xl font-black tracking-tighter ${colorClass}`}>
                    {score}
                </span>
                <span className="text-xl font-bold text-slate-500">/100</span>
                <span className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-widest">Health Score</span>
            </div>
        </div>
    )
}

function ProgressRow({ label, score, max, color }) {
    const percentage = (score / max) * 100
    return (
        <div className="mb-4 last:mb-0">
            <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-300">{label}</span>
                <span className="text-slate-400">{score}/{max}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

export default function JSAnalysis() {
    const navigate = useNavigate()
    const { profile, analysis, fetchAnalysis, roadmap, chatOpen, setChatOpen } = useAppStore()
    
    useEffect(() => {
        if (!analysis || analysis.career_matches.length === 0) {
            fetchAnalysis()
        }
    }, [analysis, fetchAnalysis])

    if (!analysis || (analysis.career_matches.length === 0 && !analysis.career_health_score)) {
        return (
            <div className="flex h-screen bg-[#0F172A] items-center justify-center text-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold">Analyzing Your Skill Genome...</p>
                </div>
            </div>
        )
    }

    const score = analysis.career_health_score || 0
    const matches = analysis.career_matches || []
    const gaps = analysis.skill_gaps || []

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none">
                <div className="max-w-6xl mx-auto space-y-8 pb-20 mt-14 lg:mt-0">
                    
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Deep Intelligence Analysis</h1>
                        <p className="text-slate-400 font-medium">Inside look at how the Skill Genome views your career trajectory.</p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6">
                        
                        {/* Section 1 - Career Health Score Column */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="glass-card p-6 flex flex-col items-center opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards]">
                                <CircularGauge score={score} />
                            </div>

                            <div className="glass-card p-6 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.2s_forwards]">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-slate-700/50">Score Breakdown</h3>
                                <ProgressRow label="Skill Demand Match" score={8} max={20} color="bg-blue-500" />
                                <ProgressRow label="Skill Diversification" score={10} max={20} color="bg-blue-500" />
                                <ProgressRow label="Automation Safety" score={12} max={20} color="bg-emerald-500" />
                                <ProgressRow label="Salary vs Median" score={7} max={20} color="bg-orange-500" />
                                <ProgressRow label="Regional Demand" score={5} max={20} color="bg-blue-500" />
                            </div>

                            {/* Section 4 - Hidden Strengths Banner */}
                            {(analysis.genome_shortcut || (roadmap && roadmap.genome_shortcut)) && (
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/20 to-orange-900/40 border border-amber-500/30 p-6 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.3s_forwards] group cursor-pointer hover:border-amber-400/50 transition-colors" onClick={() => navigate('/roadmap')}>
                                    <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Zap size={100} className="text-amber-500" />
                                    </div>
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                            <Zap size={20} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-amber-300 mb-2">⚡ Skill Genome Found a Shortcut!</h3>
                                            <p className="text-sm font-medium text-amber-100/80 mb-4 leading-relaxed">
                                                {(analysis.genome_shortcut || roadmap.genome_shortcut).message}
                                            </p>
                                            <button className="flex items-center gap-2 text-xs font-bold bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 px-4 py-2 rounded-lg transition-colors border border-amber-500/30">
                                                Start {profile?.skills?.[0] || 'Skill'} Shortcut Path <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column (Sections 2 & 3) */}
                        <div className="lg:col-span-8 space-y-6">
                            
                            {/* Section 2 - Career Matches Table */}
                            <div className="glass-card overflow-hidden opacity-0 animate-[fade-in-up_0.6s_ease-out_0.4s_forwards]">
                                <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-white">Career Matches</h2>
                                        <p className="text-xs text-slate-400 mt-1">Trajectories evaluated against real-time market data</p>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[700px]">
                                        <thead>
                                            <tr className="bg-slate-800/50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">
                                                <th className="px-6 py-4 font-medium">Career Path</th>
                                                <th className="px-6 py-4 font-medium text-center">Match</th>
                                                <th className="px-6 py-4 font-medium text-center">Automation Risk</th>
                                                <th className="px-6 py-4 font-medium text-right">Potential (3 Yrs)</th>
                                                <th className="px-6 py-4 font-medium text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {matches.map((match, i) => (
                                                <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{match.career_title}</div>
                                                        <div className="text-xs text-slate-500 mt-1">₹{(match.salary_today / 1000).toFixed(0)}K current base</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${match.match_percentage >= 80 ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' : match.match_percentage >= 65 ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                                            {match.match_percentage}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${match.automation_risk < 25 ? 'text-emerald-400' : match.automation_risk < 50 ? 'text-amber-400' : 'text-orange-500'}`}>
                                                            {match.automation_risk < 25 ? <CheckCircle2 size={14} /> : match.automation_risk < 50 ? <AlertCircle size={14} /> : <TrendingDown size={14} />}
                                                            {match.automation_risk}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="font-bold text-emerald-400 flex items-center justify-end gap-1">
                                                            <TrendingUp size={14} className="opacity-70" />
                                                            ₹{(match.salary_3_years / 1000).toFixed(0)}K/mo
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button onClick={() => navigate('/roadmap')} className="text-xs font-bold bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors border border-slate-700 hover:border-blue-500 shadow-sm flex items-center justify-center min-w-[100px] mx-auto group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                                            View Plan
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Section 3 - Skill Gaps */}
                            <div className="opacity-0 animate-[fade-in-up_0.6s_ease-out_0.5s_forwards]">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Zap size={18} className="text-purple-400" /> Highest Value Skill Gaps
                                </h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {gaps.map((gap, i) => (
                                        <div key={i} className="glass-card p-5 group hover:border-purple-500/40 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-purple-900/10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="font-bold text-slate-200">{gap.skill_name}</div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border
                                                    ${gap.demand_trajectory === 'EMERGING' ? 'bg-purple-900/30 text-purple-300 border-purple-500/30' : 
                                                    gap.demand_trajectory === 'RISING' ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' : 
                                                    'bg-slate-800 text-slate-400 border-slate-700'}`}
                                                >
                                                    {gap.demand_trajectory}
                                                </span>
                                            </div>
                                            
                                            <div className="text-center py-4 bg-slate-800/30 rounded-xl border border-slate-700/50 mb-4 flex-1 flex flex-col justify-center">
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Impact</div>
                                                <div className="text-2xl font-black text-emerald-400 pointer-events-none count-up">+₹{gap.salary_impact}</div>
                                                <div className="text-[10px] font-semibold text-slate-500">per month</div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full border-[3px] border-slate-700 relative flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{gap.weeks_to_learn} wks</span>
                                                </div>
                                                
                                                <a href="#" className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-2.5 py-1.5 rounded-lg border border-blue-500/20">
                                                    Swayam <ExternalLink size={12} />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {chatOpen && (
                <AIChatPanel 
                    userType="jobseeker" 
                    isOpen={chatOpen} 
                    onClose={() => setChatOpen(false)} 
                />
            )}
        </div>
    )
}
