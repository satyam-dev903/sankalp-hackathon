import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import AIChatPanel from '../../components/AIChatPanel'
import { MessageCircle, Briefcase, GraduationCap, Building2, ShoppingBag, Sparkles, Zap, ChevronRight, User } from 'lucide-react'
import ProfileSummary from '../../components/ProfileSummary'
import ProfileEditor from '../../components/ProfileEditor'

const quickActions = [
    { icon: '💼', label: 'Kaam Dhundo', route: '/simple/jobs', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', span: 'lg:col-span-8 lg:row-span-2' },
    { icon: '🏛️', label: 'Yojana Pao', route: '/simple/schemes', img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=80', span: 'lg:col-span-4 lg:row-span-1' },
    { icon: '📚', label: 'Seekho', route: '/simple/learn', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80', span: 'lg:col-span-4 lg:row-span-1' },
]

const highlights = [
    { icon: <Zap className="text-amber-400" size={18} />, text: 'MUDRA Loan — ₹50,000 tak available', color: 'bg-blue-500/10 border-blue-500/20' },
    { icon: <Briefcase className="text-emerald-400" size={18} />, text: '3 nayi naukri mili aaj Nagpur mein', color: 'bg-emerald-500/10 border-emerald-500/20' },
]

export default function BCDashboard() {
    const navigate = useNavigate()
    const { bcProfile, chatOpen, setChatOpen } = useAppStore()
    const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false)
    const name = bcProfile?.name || 'Arjun'

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-32 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-40 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-[600px] bg-gradient-to-tl from-blue-500/10 via-transparent to-transparent opacity-40 blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-5 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 p-1 overflow-hidden border border-white/20">
                            <img src="/src/assets/logo.png" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-2xl tracking-tight leading-none">KaushalAI</h1>
                            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1">Aapka Digital Saathi</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-12">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Namaste, {name} ji! 👋</h2>
                        <p className="text-slate-400 text-xl font-medium">Aaj aap kya karna chahte ho?</p>
                    </div>
                </div>

                <div className="mb-12">
                    <ProfileSummary 
                        userType="bluecollar" 
                        profile={bcProfile || profile} 
                        onEdit={() => setIsProfileEditorOpen(true)} 
                    />
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {highlights.map((h, i) => (
                        <div key={i} className={`flex items-center gap-4 p-5 rounded-2xl border backdrop-blur-md ${h.color} transition-all hover:scale-[1.02] cursor-default shadow-lg`}>
                            <div className="p-2 rounded-xl bg-white/5">{h.icon}</div>
                            <p className="text-white font-bold text-lg leading-snug">{h.text}</p>
                        </div>
                    ))}
                </div>

                {/* Main Action Grid (Bento Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(action.route)}
                            className={`premium-card p-0 flex flex-col group min-h-[180px] ${action.span}`}>
                            <img src={action.img} alt={action.label} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-8 flex flex-col justify-end">
                                <span className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500 w-fit">{action.icon}</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-black text-2xl tracking-tight group-hover:text-emerald-400 transition-colors">{action.label}</span>
                                    <ChevronRight className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
                                </div>
                            </div>
                        </button>
                    ))}

                    <button
                        onClick={() => setChatOpen(true)}
                        className="lg:col-span-12 w-full flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 rounded-2xl p-8 text-white group shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner">
                                <MessageCircle size={40} className="text-white" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-3xl tracking-tight">AI Salahkar se baat karo</h3>
                                <p className="text-white/80 font-bold text-lg">Naukri, Loan ya Scheme ke baare mein pucho</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/10 font-black uppercase tracking-widest text-sm group-hover:bg-white/20 transition-all">
                            Start Chat <ChevronRight size={18} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl flex p-2 shadow-2xl z-40">
                {[
                    { icon: <Briefcase size={22} />, label: 'Jobs', route: '/simple/jobs' },
                    { icon: <Building2 size={22} />, label: 'Schemes', route: '/simple/schemes' },
                    { icon: <GraduationCap size={22} />, label: 'Seekho', route: '/simple/learn' },
                    { icon: <ShoppingBag size={22} />, label: 'Business', route: '/simple/business' },
                ].map((item, i) => (
                    <button
                        key={i}
                        onClick={() => navigate(item.route)}
                        className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-slate-400 hover:text-emerald-400 hover:bg-white/5 rounded-2xl transition-all active:scale-95">
                        {item.icon}
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
            </div>

            {chatOpen && <AIChatPanel userType="bluecollar" isOpen={chatOpen} onClose={() => setChatOpen(false)} />}

            <ProfileEditor 
                userType="bluecollar" 
                isOpen={isProfileEditorOpen} 
                onClose={() => setIsProfileEditorOpen(false)} 
            />
        </div>
    )
}
