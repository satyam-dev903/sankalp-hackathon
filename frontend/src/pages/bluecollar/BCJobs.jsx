import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, MapPin, Briefcase, ChevronLeft, Zap, MessageCircle } from 'lucide-react'
import useAppStore from '../../store/useAppStore'
import AIChatPanel from '../../components/AIChatPanel'

const JOB_IMAGES = {
    'plumber': 'https://images.unsplash.com/photo-1581244276261-f732dfa6d68c?w=600&q=80',
    'electrician': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    'mazdoor': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    'mistri': 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=600&q=80',
    'driver': 'https://images.unsplash.com/photo-1619020922434-2e210a5ae26b?w=600&q=80',
    'default': 'https://images.unsplash.com/photo-1590103511874-9f766e4a2e0a?w=600&q=80'
}

const getJobImage = (title) => {
    const t = title.toLowerCase()
    if (t.includes('plumb')) return JOB_IMAGES.plumber
    if (t.includes('elect')) return JOB_IMAGES.electrician
    if (t.includes('mazdoor')) return JOB_IMAGES.mazdoor
    if (t.includes('mistri') || t.includes('construct')) return JOB_IMAGES.mistri
    if (t.includes('driver')) return JOB_IMAGES.driver
    return JOB_IMAGES.default
}

export default function BCJobs() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [listening, setListening] = useState(false)
    const { bcJobs, fetchBcJobs, bcProfile, chatOpen, setChatOpen } = useAppStore()

    useEffect(() => {
        fetchBcJobs(bcProfile?.district || 'Nagpur')
    }, [fetchBcJobs, bcProfile])

    const filtered = bcJobs.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        (j.type && j.type.toLowerCase().includes(search.toLowerCase()))
    )

    const startVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        const rec = new SR()
        rec.lang = 'hi-IN'
        rec.onresult = (e) => { setSearch(e.results[0][0].transcript); setListening(false) }
        rec.onerror = () => setListening(false)
        rec.onend = () => setListening(false)
        rec.start()
        setListening(true)
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-12 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-5 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/simple/dashboard')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="font-bold text-white text-2xl tracking-tight">Kaushal Bridge</h1>
                            <p className="text-emerald-400 text-sm font-semibold">💼 Kaam Dhundo</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 w-full">
                <p className="text-slate-400 mb-4 text-lg font-medium">Aap kaun sa kaam dhundhte hain?</p>
                <div className="flex gap-4">
                    <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center px-5 gap-4 group focus-within:border-emerald-500/50 transition-all shadow-lg">
                        <Briefcase size={24} className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Kaam ka naam likho..."
                            className="flex-1 bg-transparent py-5 text-white placeholder-slate-500 text-lg font-semibold focus:outline-none"
                        />
                    </div>
                    <button onClick={startVoice}
                        className={`px-6 rounded-2xl font-bold text-white min-h-[60px] shadow-lg transition-all ${listening ? 'bg-red-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-500 hover:scale-105 active:scale-95'}`}>
                        <Mic size={28} />
                    </button>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-20">
                {filtered.map((job, idx) => {
                    const isLarge = job.urgent || idx % 4 === 0;
                    const isMedium = !isLarge && idx % 3 === 0;
                    const gridClass = isLarge ? 'lg:col-span-8 lg:row-span-2' : isMedium ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-4 lg:row-span-1';

                    return (
                        <div key={job.id} 
                             className={`premium-card p-0 flex flex-col min-h-[220px] ${gridClass}`}>
                            <img src={getJobImage(job.title)} alt={job.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 flex flex-col justify-end">
                                <div className="space-y-3">
                                    {job.urgent && (
                                        <div className="inline-flex items-center gap-2 bg-amber-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
                                            <Zap size={14} fill="currentColor" /> Urgent
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-white font-bold text-2xl leading-tight group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                                        <p className="text-slate-300 text-base font-semibold">{job.company}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Salary</span>
                                            <span className="text-emerald-400 font-bold text-xl leading-none">
                                                {job.salary || `₹${job.salary_min} - ₹${job.salary_max}`}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Location</span>
                                            <span className="flex items-center gap-1 text-white font-semibold">
                                                <MapPin size={16} className="text-emerald-400" /> {job.location || job.district}
                                            </span>
                                        </div>
                                    </div>
                                    <a 
                                        href={job.apply_url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 w-full bg-emerald-600/20 backdrop-blur-md border border-emerald-500/30 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg transition-all flex items-center justify-center group-hover:border-emerald-400"
                                    >
                                        ✅ Apply karo
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div className="col-span-12 text-center py-24 glass-card border-white/5 mx-auto w-full">
                        <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Koi kaam nahi mila</h3>
                        <p className="text-slate-500 text-lg">Kuch aur try karein ya district badal kar dekhein.</p>
                    </div>
                )}
            </div>

            {/* Floating AI Button */}
            <button
                onClick={() => setChatOpen(true)}
                className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 z-50 transition-all hover:scale-110 active:scale-95 group border-2 border-white/20"
            >
                <MessageCircle size={32} className="text-white group-hover:rotate-12 transition-transform" />
                <div className="absolute -top-2 -right-2 bg-white text-emerald-600 text-[10px] font-black px-2 py-1 rounded-full shadow-lg">ASK AI</div>
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
