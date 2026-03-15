// Stub pages for Blue Collar additional screens
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AIChatPanel from '../../components/AIChatPanel'
import useAppStore from '../../store/useAppStore'
import { ChevronLeft, GraduationCap, Building2, ExternalLink, ShieldCheck } from 'lucide-react'

export function BCLearn() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-12 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background Mesh Gradients */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-bl from-orange-500/10 via-transparent to-transparent opacity-40 blur-[120px] pointer-events-none" />
            
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-5 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/simple/dashboard')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="font-bold text-white text-2xl tracking-tight leading-none">Seekho Section</h1>
                            <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mt-1">📚 Skill Courses</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 pt-12 space-y-6">
                <p className="text-slate-400 text-lg font-medium">Aasani se sikho aur kamai badhao:</p>
                <div className="grid grid-cols-1 gap-6">
                    {[
                        { img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80', title: 'Smartphone Seekhna', desc: 'Video calls, WhatsApp, UPI — bilkul basic se', free: true },
                        { img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80', title: 'Resume Banana', desc: 'Apni life mein pehli baar resume banao', free: true },
                        { img: 'https://images.unsplash.com/photo-1558403194-611308249627?w=400&q=80', title: 'Electrical Basics', desc: 'Ghar ki wiring — PMKVY certified', free: true },
                        { img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80', title: 'Commercial Kitchen', desc: 'Hotel aur restaurant ke liye cooking skills', free: true },
                    ].map((course, i) => (
                        <div key={i} className="premium-card flex flex-col md:flex-row gap-6 p-6 border-white/5 hover:border-orange-500/30">
                            <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-2xl group-hover:text-orange-400 transition-colors">{course.title}</h3>
                                    <p className="text-slate-400 text-lg mt-1">{course.desc}</p>
                                    {course.free && <span className="inline-flex mt-3 text-xs font-black bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full uppercase tracking-widest">✓ Bilkul Free</span>}
                                </div>
                                <button className="mt-4 md:mt-0 w-full md:w-fit bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-8 rounded-2xl text-lg shadow-xl shadow-emerald-500/10 transition-all hover:scale-105 active:scale-95">Seekho</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function BCBusiness() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-12 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background Mesh Gradients */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-bl from-purple-500/10 via-transparent to-transparent opacity-40 blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-5 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/simple/dashboard')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="font-bold text-white text-2xl tracking-tight leading-none">Apna Business</h1>
                            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mt-1">🏪 Business Help</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80', title: 'Udyam Registration', desc: '8 asaan steps mein business register karo', steps: 8 },
                        { img: 'https://images.unsplash.com/photo-1579621970795-87f9ac75d651?w=400&q=80', title: 'MUDRA Loan Guide', desc: 'Documents aur process puri jaankari', steps: 5 },
                        { img: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80', title: 'UPI Kaise Use Karein', desc: 'Paisa bhejo, paisa lo — guided walkthrough', steps: 5 },
                        { img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80', title: 'ONDC Pe Becho', desc: 'Apna saman online becho — free platform', steps: 6 },
                        { img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80', title: 'Worker Rights', desc: 'Minimum wage, PF, aur aapke adhikar', steps: null },
                    ].map((topic, i) => (
                        <div key={i} className="premium-card flex flex-col p-0 border-white/5 hover:border-purple-500/30">
                            <div className="relative h-48 w-full">
                                <img src={topic.img} alt={topic.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-2xl group-hover:text-purple-400 transition-colors">{topic.title}</h3>
                                    <p className="text-slate-400 text-lg mt-2 leading-snug">{topic.desc}</p>
                                    {topic.steps && <p className="text-emerald-400 font-bold text-sm mt-3 uppercase tracking-tighter flex items-center gap-1">
                                        <ShieldCheck size={14} /> {topic.steps} asaan steps
                                    </p>}
                                </div>
                                <button className="mt-6 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-2 group-hover:border-purple-500/50">
                                    Dekho <ExternalLink size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function BCChat() {
    const { chatOpen, setChatOpen } = useAppStore()
    const navigate = useNavigate()
    React.useEffect(() => { setChatOpen(true) }, [])
    return (
        <div className="min-h-screen bg-[#0F172A]">
            <AIChatPanel userType="bluecollar" isOpen={true} onClose={() => { setChatOpen(false); navigate('/simple/dashboard') }} />
        </div>
    )
}
