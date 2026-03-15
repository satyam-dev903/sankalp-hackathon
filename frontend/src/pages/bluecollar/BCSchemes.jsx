import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ExternalLink, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react'
import useAppStore from '../../store/useAppStore'
import AIChatPanel from '../../components/AIChatPanel'

const SCHEME_IMAGES = {
    'mudra': 'https://images.unsplash.com/photo-1579621970795-87f9ac75d651?w=600&q=80',
    'pmkvy': 'https://images.unsplash.com/photo-1544650030-3c97974c0e49?w=600&q=80',
    'e-shram': 'https://images.unsplash.com/photo-1521791136064-7986c295944b?w=600&q=80',
    'default': 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=80'
}

const getSchemeImage = (name) => {
    const n = name.toLowerCase()
    if (n.includes('mudra')) return SCHEME_IMAGES.mudra
    if (n.includes('pmkvy')) return SCHEME_IMAGES.pmkvy
    if (n.includes('shram')) return SCHEME_IMAGES['e-shram']
    return SCHEME_IMAGES.default
}

export default function BCSchemes() {
    const navigate = useNavigate()
    const [expanded, setExpanded] = React.useState(null)
    const { bcSchemes, fetchBcSchemes, chatOpen, setChatOpen } = useAppStore()

    useEffect(() => {
        fetchBcSchemes()
    }, [fetchBcSchemes])

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-12 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background Mesh Gradients */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-bl from-purple-500/10 via-transparent to-transparent opacity-50 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-50 blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-5 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/simple/dashboard')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="font-bold text-white text-2xl tracking-tight">Sarkari Yojana</h1>
                            <p className="text-emerald-400 text-sm font-semibold">🏛️ Government Schemes</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 pt-10 space-y-6">
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                    <Sparkles className="text-emerald-400" size={20} />
                    <p className="text-emerald-100 text-lg font-medium">Aapke liye sarkari free schemes:</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {bcSchemes.map((s, i) => (
                        <div key={s.id || i} 
                             className={`premium-card border-white/5 hover:border-emerald-500/30 overflow-hidden ${expanded === i ? 'ring-2 ring-emerald-500/20' : ''}`}>
                            <button
                                className="w-full text-left focus:outline-none"
                                onClick={() => setExpanded(expanded === i ? null : i)}>
                                <div className="flex items-center gap-6 p-6">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-emerald-900/10">
                                        <img src={getSchemeImage(s.name)} alt={s.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">Ministry of Skill</span>
                                        </div>
                                        <h3 className="text-white font-bold text-2xl leading-tight tracking-tight">{s.name || s.title}</h3>
                                        <p className="text-blue-400 font-bold text-base mt-1 flex items-center gap-1">
                                            <ShieldCheck size={16} /> {s.benefit}
                                        </p>
                                    </div>
                                    <div className={`p-2 rounded-full bg-white/5 border border-white/10 transition-transform duration-500 ${expanded === i ? 'rotate-180 bg-emerald-500/20 border-emerald-500/20' : ''}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </button>

                            {expanded === i && (
                                <div className="px-6 pb-6 pt-2 border-t border-white/5 animate-fade-in">
                                    <div className="bg-white/5 rounded-2xl p-5 mb-5 border border-white/10">
                                        <p className="text-slate-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                            <Sparkles size={14} className="text-emerald-400" /> Paise/Training kaise milega?
                                        </p>
                                        <div className="space-y-4">
                                            {s.steps ? s.steps.map((step, si) => (
                                                <div key={si} className="flex items-start gap-4">
                                                    <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 text-base font-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                                                        {si + 1}
                                                    </span>
                                                    <p className="text-slate-200 text-lg leading-snug font-medium pt-1">{step}</p>
                                                </div>
                                            )) : (
                                                <div className="flex items-center gap-3 text-slate-400 italic py-2">
                                                    <p>Is scheme ki sahi jankari ke liye button dabayein.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <a 
                                        href={s.link || s.apply_url || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 rounded-2xl text-xl shadow-xl shadow-emerald-500/10 transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        Apply karo <ExternalLink size={20} />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                    {bcSchemes.length === 0 && (
                        <div className="text-center py-20 glass-card">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">🏛️</div>
                            <p className="text-slate-400 text-lg font-medium">Yojanaein load ho rahi hain...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating AI Button */}
            <button
                onClick={() => setChatOpen(true)}
                className="fixed bottom-12 right-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/40 z-50 transition-all hover:scale-110 active:scale-95 group border-2 border-white/20"
            >
                <MessageCircle size={32} className="text-white group-hover:rotate-12 transition-transform" />
                <div className="absolute -top-2 -right-2 bg-white text-purple-600 text-[10px] font-black px-2 py-1 rounded-full shadow-lg">ASK AI</div>
            </button>

            {chatOpen && (
                <AIChatPanel 
                    userType="bluecollar" 
                    isOpen={chatOpen} 
                    onClose={() => setChatOpen(false)} 
                />
            )}
        </div>
    )
}
