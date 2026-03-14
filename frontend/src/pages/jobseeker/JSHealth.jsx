import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    AlertTriangle,
    ArrowRight,
    Zap,
    TrendingUp,
    Info
} from 'lucide-react'

function HealthGauge({ score }) {
    const [offset, setOffset] = useState(230 * Math.PI)
    const r = 115
    const circ = 2 * Math.PI * r

    useEffect(() => {
        const timer = setTimeout(() => {
            const progress = score / 100
            setOffset(circ - progress * circ)
        }, 100)
        return () => clearTimeout(timer)
    }, [score, circ])

    let colorClass, strokeColor, label
    if (score <= 40) {
        colorClass = 'text-rose-500'
        strokeColor = '#F43F5E'
        label = 'Needs Attention'
    } else if (score <= 60) {
        colorClass = 'text-orange-500'
        strokeColor = '#F97316'
        label = 'Moderate Risk'
    } else if (score <= 80) {
        colorClass = 'text-blue-500'
        strokeColor = '#3B82F6'
        label = 'Stable'
    } else {
        colorClass = 'text-emerald-500'
        strokeColor = '#10B981'
        label = 'Excellent'
    }

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-[280px] h-[160px] flex items-end justify-center overflow-hidden mb-4 scale-110">
                <svg className="w-[280px] h-[280px] transform -rotate-180 absolute bottom-0 origin-center">
                    {/* Background arc */}
                    <path 
                        d="M 20 140 A 120 120 0 1 1 260 140" 
                        fill="none" 
                        stroke="#1E293B" 
                        strokeWidth="16" 
                        strokeLinecap="round"
                    />
                    {/* Progress arc */}
                    <path 
                        d="M 20 140 A 120 120 0 1 1 260 140" 
                        fill="none" 
                        stroke={strokeColor} 
                        strokeWidth="16" 
                        strokeLinecap="round"
                        strokeDasharray={120 * Math.PI}
                        strokeDashoffset={(120 * Math.PI) * (1 - score / 100)}
                        className="transition-all duration-1500 ease-in-out"
                        style={{ filter: `drop-shadow(0 0 12px ${strokeColor}66)` }}
                    />
                </svg>
                <div className="absolute bottom-2 flex flex-col items-center justify-end h-full">
                    <span className={`text-6xl font-black tracking-tighter leading-none ${colorClass}`}>
                        {score}
                    </span>
                    <span className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{label}</span>
                </div>
            </div>
            
            {/* Recommendation Pill */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 animate-[fade-in-up_0.5s_ease-out_0.5s_forwards] opacity-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Zap size={14} className="animate-pulse" /> Add SQL → score jumps to 61 in 6 weeks <ArrowRight size={14} />
            </div>
        </div>
    )
}

function SubScoreBar({ label, score, max, tooltip, delay }) {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth((score / max) * 100)
        }, delay)
        return () => clearTimeout(timer)
    }, [score, max, delay])

    return (
        <div className="mb-5 last:mb-0 group relative">
            <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-200 flex items-center gap-1.5 cursor-help">
                    {label} <Info size={14} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                </span>
                <span className="text-slate-400">{score}/{max}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    style={{ width: `${width}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-slate-800 text-xs text-slate-300 rounded shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-medium">
                {tooltip}
            </div>
        </div>
    )
}

export default function JSHealth() {
    const { analysis, chatOpen, setChatOpen } = useAppStore()
    
    // Mock data if analysis is not fully populated for this page
    const score = analysis?.career_health_score || 42
    
    const subScores = [
        { label: "Skill Demand Match", score: 8, max: 20, tooltip: "How well your current skills match what employers are asking for today." },
        { label: "Skill Diversification", score: 6, max: 20, tooltip: "The variety of your skills across different domains. Too narrow increases risk." },
        { label: "Automation Safety", score: 10, max: 20, tooltip: "Resistance of your skillset to being automated by AI and robotics." },
        { label: "Salary Potential", score: 9, max: 20, tooltip: "Your earning potential compared to the national median for similar roles." },
        { label: "Regional Demand", score: 9, max: 20, tooltip: "The volume of open jobs requiring your skills in your specific geographic area." },
    ]

    const risks = [
        { id: 1, title: "High Automation Risk in Primary Skills", desc: "Data Entry and Basic Excel routines are highly susceptible to automation within 2 years." },
        { id: 2, title: "Narrow Skill Portfolio", desc: "You lack complementary technical skills (like SQL or Python) which restricts you to entry-level administrative roles." },
        { id: 3, title: "Stagnant Salary Trajectory", desc: "Without upskilling, your projected salary growth is outpaced by inflation over the next 3 years." }
    ]

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none">
                <div className="max-w-5xl mx-auto space-y-8 pb-32 mt-14 lg:mt-0">
                    
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Career Health Report</h1>
                        <p className="text-slate-400 font-medium">A deep dive into your professional resilience and growth potential.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        
                        {/* Left Column: Gauge & Sub-scores */}
                        <div className="space-y-8">
                            <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[300px] opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards]">
                                <HealthGauge score={score} />
                            </div>

                            <div className="glass-card p-6 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.2s_forwards]">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-slate-700/50">Score Breakdown</h3>
                                <div>
                                    {subScores.map((sub, i) => (
                                        <SubScoreBar 
                                            key={sub.label}
                                            label={sub.label}
                                            score={sub.score}
                                            max={sub.max}
                                            tooltip={sub.tooltip}
                                            delay={300 + (i * 150)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Prediction & Risks */}
                        <div className="space-y-8">
                            
                            {/* Prediction Card */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 p-1 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.3s_forwards] group">
                                {/* Gradient animated border effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-300 to-blue-500 animate-[spin_4s_linear_infinite] opacity-20 group-hover:opacity-40 transition-opacity" />
                                
                                <div className="relative bg-slate-900 rounded-xl p-6 h-full border border-slate-800">
                                    <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-4">
                                        <TrendingUp size={18} /> Skill Genome Prediction
                                    </h3>
                                    <p className="text-sm text-slate-300 font-medium mb-5">
                                        If you complete <strong className="text-white">SQL</strong> + <strong className="text-white">Power BI</strong> in 10 weeks:
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Career Health</span>
                                            <div className="flex items-center gap-2 font-black">
                                                <span className="text-slate-400 line-through decoration-rose-500/50">42</span>
                                                <ArrowRight size={14} className="text-emerald-500" />
                                                <span className="text-emerald-400 text-lg">73</span>
                                                <span className="text-emerald-500/80 text-xs ml-1">(+31)</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expected Salary</span>
                                            <div className="flex items-center gap-2 font-black">
                                                <span className="text-slate-400">₹18,000</span>
                                                <ArrowRight size={14} className="text-emerald-500" />
                                                <span className="text-emerald-400 text-lg">₹26,000</span>
                                                <span className="text-slate-500 text-xs font-medium ml-1">/mo</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Matches</span>
                                            <div className="flex items-center gap-2 font-black">
                                                <span className="text-slate-400">34</span>
                                                <ArrowRight size={14} className="text-emerald-500" />
                                                <span className="text-emerald-400 text-lg">67</span>
                                                <span className="text-slate-500 text-xs font-medium ml-1">in district</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button onClick={() => navigate('/roadmap')} className="w-full mt-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold text-sm transition-colors flex justify-center items-center gap-2">
                                        Start This Path Now <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Risk Cards */}
                            <div className="opacity-0 animate-[fade-in-up_0.6s_ease-out_0.4s_forwards]">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <AlertTriangle size={16} className="text-rose-500" /> Top Risk Factors
                                </h3>
                                <div className="space-y-4">
                                    {risks.map(risk => (
                                        <div key={risk.id} className="bg-rose-950/20 border border-rose-900/50 p-5 rounded-xl flex items-start gap-4 group hover:border-rose-500/40 hover:bg-rose-900/20 transition-all">
                                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500 border border-rose-500/20 group-hover:scale-110 transition-transform">
                                                <AlertTriangle size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-rose-200 font-bold text-sm mb-1">{risk.title}</h4>
                                                <p className="text-xs text-rose-200/60 leading-relaxed font-medium mb-3">
                                                    {risk.desc}
                                                </p>
                                                <button onClick={() => navigate('/analysis')} className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 group-hover:underline">
                                                    Analyze & Fix <ArrowRight size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {chatOpen && <AIChatPanel />}
        </div>
    )
}
