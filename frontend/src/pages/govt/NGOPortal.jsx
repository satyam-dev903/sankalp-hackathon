import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    Users, 
    BookOpen, 
    CheckCircle2, 
    AlertCircle, 
    ArrowLeft, 
    Download,
    Eye,
    Zap,
    MessageSquare,
    Clock
} from 'lucide-react'

const MOCK_BATCH = {
    name: 'Batch #42 (Data Analyst Focus)',
    center: 'Nagpur PMKVY Center 1',
    count: 24,
    enrolled_date: '02 Feb 2026',
    completion_target: '15 May 2026',
    status: 'In Progress',
    attendence: '92%',
    avg_score: '74%',
    students: [
        { id: 1, name: 'Amit Verma', progress: 85, score: 78, status: 'on-track' },
        { id: 2, name: 'Priya Das', progress: 62, score: 45, status: 'at-risk' },
        { id: 3, name: 'Rahul K.', progress: 95, score: 92, status: 'top-performer' },
        { id: 4, name: 'Sneha Rao', progress: 78, score: 71, status: 'on-track' },
        { id: 5, name: 'Vikas T.', progress: 12, score: 10, status: 'dropout-warning' }
    ]
}

export default function NGOPortal() {
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState(null)

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100">
            {/* Sidebar Left Mini */}
            <aside className="w-20 bg-slate-900 border-r border-slate-700/30 flex flex-col items-center py-8 gap-8">
                <button onClick={() => navigate('/govt/dashboard')} className="p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 text-slate-400 transition-all shadow-lg">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1 flex flex-col gap-6">
                    <div className="p-4 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                        <Users size={24} />
                    </div>
                    <div className="p-4 text-slate-600 hover:text-slate-400 transition-colors">
                        <BookOpen size={24} />
                    </div>
                    <div className="p-4 text-slate-600 hover:text-slate-400 transition-colors">
                        <CheckCircle2 size={24} />
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-700">
                    NGO
                </div>
            </aside>

            {/* Main Main */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase tracking-widest mb-2">
                            <Landmark size={14} /> Training Partner Portal
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-1">{MOCK_BATCH.center}</h1>
                        <p className="text-slate-400 font-medium">Monitoring center operations and batch efficiency.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-2">
                            <Clock size={16} /> Batch History
                        </button>
                        <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-900/20">
                            Download MIS Report
                        </button>
                    </div>
                </div>

                {/* Batch Summary Header */}
                <div className="glass-card p-6 mb-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">🎯</div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-0.5">{MOCK_BATCH.name}</h2>
                            <p className="text-slate-500 text-sm font-medium">ID: PMKVY-NGP-B42 · Started {MOCK_BATCH.enrolled_date}</p>
                        </div>
                    </div>
                    <div className="flex gap-10 items-center">
                        <div className="text-center">
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Attendance</p>
                            <p className="text-xl font-black text-emerald-400">{MOCK_BATCH.attendence}</p>
                        </div>
                        <div className="text-center border-l border-slate-700/50 pl-10">
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Avg Score</p>
                            <p className="text-xl font-black text-blue-400">{MOCK_BATCH.avg_score}</p>
                        </div>
                        <div className="text-center border-l border-slate-700/50 pl-10">
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Target</p>
                            <p className="text-sm font-bold text-slate-300 mt-1 uppercase">{MOCK_BATCH.status}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Student List */}
                    <div className="lg:col-span-2 glass-card overflow-hidden">
                        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold text-white tracking-tight">Active Learners ({MOCK_BATCH.students.length})</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                                <input type="text" placeholder="Search students..." className="bg-slate-800 border-none rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:ring-1 focus:ring-purple-500" />
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/40">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Learner</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Course Progress</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Curr Score</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-0">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {MOCK_BATCH.students.map(std => (
                                    <tr 
                                        key={std.id} 
                                        className={`hover:bg-slate-800/60 transition-colors pointer-cursor ${selectedStudent?.id === std.id ? 'bg-purple-600/10 shadow-inner' : ''}`}
                                        onClick={() => setSelectedStudent(std)}
                                    >
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white transition-colors">{std.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 min-w-[60px] h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${std.progress}%` }} />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">{std.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-black ${std.score < 50 ? 'text-rose-400' : 'text-slate-300'}`}>{std.score}%</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${
                                                std.status === 'on-track' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                std.status === 'top-performer' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                            }`}>
                                                {std.status.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Eye size={14} className="text-slate-600" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Operational Alerts Section */}
                    <div className="space-y-6">
                        <section className="glass-card p-6 border-l-4 border-l-rose-500">
                            <h3 className="font-bold text-white text-sm flex items-center gap-2 mb-4">
                                <AlertCircle size={18} className="text-rose-500" /> Dropout Alerts
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-slate-800/60 rounded-xl border border-rose-500/20">
                                    <p className="text-xs font-bold text-white mb-1">Vikas T. (Attendance Drop)</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Inactive for 4 days. Profile suggests "Travel Distance" as potential barrier.</p>
                                    <button className="mt-2 w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase rounded-lg transition-colors">Call Learner</button>
                                </div>
                            </div>
                        </section>

                        <section className="glass-card p-6 border-l-4 border-l-blue-500">
                            <h3 className="font-bold text-white text-sm flex items-center gap-2 mb-4">
                                <Zap size={18} className="text-blue-400" /> Placement Ready
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-slate-800/60 rounded-xl border border-blue-500/20">
                                    <p className="text-xs font-bold text-white mb-1">Rahul K. (Top Skills)</p>
                                    <p className="text-[10px] text-slate-400 font-medium">95% Course Progress. Matches with 3 local Data Entry roles.</p>
                                    <button className="mt-2 w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase rounded-lg transition-colors">Start Mock Interview</button>
                                </div>
                            </div>
                        </section>

                        {/* Quick Comm */}
                        <div className="glass-card p-6 shadow-2xl shadow-purple-900/10 border border-purple-500/20">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <MessageSquare size={16} className="text-purple-400" /> Campaign Tool
                            </h3>
                            <p className="text-[10px] text-slate-400 mb-4 font-medium leading-relaxed">Broadcast SMS to all students in <strong>{MOCK_BATCH.name}</strong>.</p>
                            <textarea className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-700 focus:ring-1 focus:ring-purple-500 outline-none resize-none mb-3" placeholder="Type message..."></textarea>
                            <button className="w-full btn-blue py-3 font-black text-[11px] shadow-lg shadow-blue-900/40">Send to 24 Learners</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function Landmark({ size, className }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="7" x2="21" y2="7"></line><polyline points="3 7 12 2 21 7"></polyline><line x1="5" y1="21" x2="5" y2="7"></line><line x1="9" y1="21" x2="9" y2="7"></line><line x1="15" y1="21" x2="15" y2="7"></line><line x1="19" y1="21" x2="19" y2="7"></line></svg>
}
