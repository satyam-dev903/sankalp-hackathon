import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    Send, 
    Mic, 
    Loader2, 
    BarChart2, 
    Users, 
    BookOpen, 
    TrendingUp,
    AlertTriangle,
    ShieldAlert,
    Map as MapIcon,
    ChevronRight,
    Search,
    Download,
    Eye
} from 'lucide-react'

const GOVT_CONTEXT = {
    district: 'Nagpur',
    active_enrollments: 847,
    completions_this_month: 234,
    dropouts_this_month: 43,
    placement_rate: 0.673,
    critical_shortage: { skill: 'CNC Operators', demand: 340, supply: 180, gap: 160, quarter: 'Q3 2026' },
    training_centers: [
        { name: 'Nagpur PMKVY Center 1', placement_rate: 0.78, completion_rate: 0.85, rank: 1, location: 'Sitabuldi' },
        { name: 'Wardha Skill Hub', placement_rate: 0.71, completion_rate: 0.79, rank: 2, location: 'Wardha Road' },
        { name: 'Amravati ITI', placement_rate: 0.62, completion_rate: 0.73, rank: 3, location: 'MIDC Area' },
        { name: 'Bhandara Training Ctr', placement_rate: 0.45, completion_rate: 0.61, rank: 4, location: 'East Gate' },
    ],
    fraud_alerts: [
        { id: 1, type: 'Ghost Enrollment', center: 'Nagpur North Center', count: 12, severity: 'high' },
        { id: 2, type: 'Stipend Anomaly', center: 'Amravati ITI', amount: '₹1.2L', severity: 'medium' }
    ]
}

export default function GovtDashboard() {
    const navigate = useNavigate()
    const [chatMsg, setChatMsg] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [chatLoading, setChatLoading] = useState(false)
    const [activeNav, setActiveNav] = useState('dashboard')
    const endRef = useRef(null)

    useEffect(() => { 
        endRef.current?.scrollIntoView({ behavior: 'smooth' }) 
    }, [chatHistory, chatLoading])

    const sendChat = (text) => {
        if (!text.trim() || chatLoading) return
        setChatHistory(prev => [...prev, { role: 'user', text }])
        setChatMsg('')
        setChatLoading(true)
        setTimeout(() => {
            setChatHistory(prev => [...prev, { role: 'ai', text: "Analyzing the request for Nagpur District... Based on the data, I recommend re-allocating ₹12L from the DDU-GKY marketing budget to CNC training subsidies to close the 160-operator gap by August." }])
            setChatLoading(false)
        }, 1500)
    }

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100">
            {/* Minimal Govt Sidebar */}
            <aside className="w-20 lg:w-64 bg-slate-900 border-r border-purple-900/20 flex flex-col items-center lg:items-stretch py-6 transition-all">
                <div className="px-6 flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <ShieldAlert className="text-white" size={24} />
                    </div>
                    <span className="hidden lg:block font-black text-xl tracking-tighter">KAUSHALAI <span className="text-purple-500">GOVT</span></span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { id: 'dashboard', icon: <BarChart2 size={20} />, label: 'Intelligence' },
                        { id: 'map', icon: <MapIcon size={20} />, label: 'Heatmap' },
                        { id: 'centers', icon: <BookOpen size={20} />, label: 'Centers' },
                        { id: 'fraud', icon: <ShieldAlert size={20} />, label: 'Fraud Alerts', badge: '2' },
                    ].map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            className={`w-full flex items-center justify-center lg:justify-start gap-4 p-3.5 rounded-xl transition-all ${
                                activeNav === item.id 
                                ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            {item.icon}
                            <span className="hidden lg:block font-bold text-sm">{item.label}</span>
                            {item.badge && <span className="hidden lg:block ml-auto bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">{item.badge}</span>}
                        </button>
                    ))}
                </nav>

                <div className="px-4 mt-auto">
                    <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">RI</div>
                            <div className="hidden lg:block">
                                <p className="text-xs font-black text-white">Ramesh IAS</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-left">District Collector</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {/* Header */}
                    <header className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight mb-1">District Intelligence Center</h1>
                            <p className="text-slate-400 font-medium">Real-time oversight for <span className="text-purple-400 font-black">NAGPUR</span> District · Q1 2026</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-2 transition-all">
                                <Download size={14} /> Export Report
                            </button>
                            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border border-purple-400/30 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all shadow-lg shadow-purple-900/20">
                                <Search size={14} /> Audit Trail
                            </button>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Active Learners', value: '847', trend: '+12%', color: 'border-purple-500/30' },
                            { label: 'Placement Rate', value: '67.3%', trend: '+4%', color: 'border-emerald-500/30' },
                            { label: 'Unskilled Gap', value: '4.2k', trend: '-2%', color: 'border-rose-500/30' },
                            { label: 'Scheme Budget', value: '₹2.4Cr', trend: '82%', color: 'border-blue-500/30' },
                        ].map(stat => (
                            <div key={stat.label} className={`glass-card p-6 border-b-2 ${stat.color} hover:bg-slate-800/40 transition-all cursor-default`}>
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">{stat.label}</h4>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-3xl font-black text-white">{stat.value}</span>
                                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md">{stat.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Middle Section: Heatmap Mock & Alerts */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                        {/* Heatmap Visual Mock */}
                        <div className="xl:col-span-2 glass-card p-6 min-h-[400px]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white flex items-center gap-2 tracking-tight">
                                    <MapIcon size={18} className="text-purple-400" /> Skill Demand Heatmap
                                </h3>
                                <div className="flex gap-2">
                                    {['Density', 'Placement', 'Fraud'].map(mode => (
                                        <button key={mode} className={`text-[10px] font-black px-2 py-1 rounded border ${mode === 'Density' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Animated Grid Simulation */}
                            <div className="w-full h-[300px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative group">
                                <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-0.5 p-0.5 opacity-40">
                                    {Array(96).fill(0).map((_, i) => {
                                        const intensity = Math.random()
                                        return (
                                            <div 
                                                key={i} 
                                                className="transition-colors duration-1000"
                                                style={{ 
                                                    backgroundColor: intensity > 0.8 ? '#A855F7' : intensity > 0.5 ? '#6366F1' : intensity > 0.3 ? '#1E293B' : '#0F172A',
                                                    opacity: intensity
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-slate-900/90 border border-purple-500/50 p-4 rounded-2xl shadow-2xl">
                                        <p className="text-xs font-bold text-white mb-1">Zone 4: MIDC Area</p>
                                        <p className="text-[10px] text-slate-400 mb-2">High Demand: CNC Operators (160 Gap)</p>
                                        <button className="w-full btn-blue py-2 text-[10px]">Deep Audit Zone</button>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 flex gap-2">
                                        <div className="w-3 h-3 bg-slate-900 border border-slate-700"></div>
                                        <div className="w-3 h-3 bg-indigo-900"></div>
                                        <div className="w-3 h-3 bg-indigo-600"></div>
                                        <div className="w-3 h-3 bg-purple-500"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nagpur Interactive Map v2.1</span>
                                </div>
                            </div>
                        </div>

                        {/* Fraud Alerts Side */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-white flex items-center gap-2 px-1">
                                <AlertTriangle size={18} className="text-rose-500" /> Fraud & Anomaly Engine
                            </h3>
                            {GOVT_CONTEXT.fraud_alerts.map(alert => (
                                <div key={alert.id} className="glass-card p-5 border-l-4 border-l-rose-500 group hover:bg-rose-950/20 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-white font-bold text-sm tracking-tight">{alert.type}</h4>
                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest ${alert.severity === 'high' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium mb-4">{alert.center} · <span className="text-rose-400">{alert.count || alert.amount} detected</span></p>
                                    <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Eye size={12} /> View Evidence
                                    </button>
                                </div>
                            ))}
                            <div className="p-5 rounded-2xl border border-white/5 bg-slate-800/20 text-center">
                                <p className="text-[11px] text-slate-500 font-medium italic">Scanning training sessions via biometric logs... 100% Secure.</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Table */}
                    <div className="glass-card overflow-hidden">
                        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold text-white tracking-tight">Center Performance Leaderboard</h3>
                            <button className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                                View Full Directory <ChevronRight size={14} />
                            </button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/40">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Center Name</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Zone</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Placement</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Audit Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {GOVT_CONTEXT.training_centers.map(center => (
                                    <tr key={center.name} className="hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{center.name}</p>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">{center.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full" style={{ width: `${center.placement_rate * 100}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-300">{(center.placement_rate * 100).toFixed(0)}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${center.rank <= 2 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-700/30 border-slate-700/50 text-slate-500'}`}>
                                                {center.rank <= 2 ? 'VERIFIED' : 'PENDING'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all" onClick={() => navigate('/govt/ngo')}>
                                                <ChevronRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Sidebar — Floating Cinematic Look */}
                <aside className="w-[350px] bg-slate-900 border-l border-purple-900/20 flex flex-col transition-all">
                    <div className="p-6 border-b border-purple-900/20 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black text-white tracking-widest uppercase">Policy AI</h3>
                            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live Nagpur Context
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-400 cursor-help">
                            <TrendingUp size={16} />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {chatHistory.length === 0 ? (
                            <div className="space-y-6">
                                <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-3">
                                    <p className="text-xs font-bold text-slate-300 leading-relaxed italic">
                                        "Ramesh ji, Nagpur faces a critical shortage of <strong className="text-rose-400">CNC Operators</strong> (160 gap) by mid-2026. How should we iterate on the budget?"
                                    </p>
                                </div>
                                
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Quick Queries</p>
                                    {[
                                        'CNC shortage why Nagpur?',
                                        'Best performing center?',
                                        'PMKVY budget justify?',
                                        'Q3 2026 forecast?'
                                    ].map(q => (
                                        <button key={q} onClick={() => sendChat(q)} className="w-full p-3 bg-slate-900 border border-slate-700/50 hover:border-purple-500/50 text-left text-xs font-bold text-slate-400 hover:text-white rounded-xl transition-all">
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {chatHistory.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[90%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                                            m.role === 'user' 
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                                            : 'bg-slate-800/80 border border-slate-700/50 text-slate-200'
                                        }`}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                                {chatLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 flex gap-1">
                                            <div className="typing-dot bg-purple-500" />
                                            <div className="typing-dot bg-indigo-500" />
                                            <div className="typing-dot bg-blue-500" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    <div className="p-6 bg-slate-900 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={chatMsg}
                                onChange={e => setChatMsg(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendChat(chatMsg)}
                                placeholder="Query policy engine..."
                                className="w-full bg-slate-800 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-4 pr-12 text-xs font-bold text-white placeholder-slate-600 focus:outline-none transition-all"
                            />
                            <button onClick={() => sendChat(chatMsg)} disabled={!chatMsg.trim() || chatLoading} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg disabled:opacity-40 transition-all shadow-md">
                                {chatLoading ? <Loader2 size={16} className="animate-spin" /> : <Mic size={16} />}
                            </button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    )
}
