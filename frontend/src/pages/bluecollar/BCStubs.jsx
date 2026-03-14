// Stub pages for Blue Collar additional screens
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AIChatPanel from '../../components/AIChatPanel'
import useAppStore from '../../store/useAppStore'
import { ChevronLeft } from 'lucide-react'

export function BCLearn() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-5 pb-8">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => navigate('/simple/dashboard')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400"><ChevronLeft size={22} /></button>
                <h1 className="text-xl font-bold">📚 Kuch Seekho</h1>
            </div>
            <div className="space-y-4">
                {[
                    { emoji: '📱', title: 'Smartphone Seekhna', desc: 'Video calls, WhatsApp, UPI — bilkul basic se', free: true },
                    { emoji: '💼', title: 'Resume Banana', desc: 'Apni life mein pehli baar resume banao', free: true },
                    { emoji: '🔧', title: 'Electrical Basics', desc: 'Ghar ki wiring — PMKVY certified', free: true },
                    { emoji: '🍳', title: 'Commercial Kitchen', desc: 'Hotel aur restaurant ke liye cooking skills', free: true },
                ].map((course, i) => (
                    <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 flex items-start gap-4">
                        <span className="text-4xl">{course.emoji}</span>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg">{course.title}</h3>
                            <p className="text-slate-400 text-base mt-1">{course.desc}</p>
                            {course.free && <span className="inline-block mt-2 text-xs bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full">✓ BILKUL FREE</span>}
                        </div>
                        <button className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-base transition-all">Seekho</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function BCBusiness() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-5 pb-8">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => navigate('/simple/dashboard')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400"><ChevronLeft size={22} /></button>
                <h1 className="text-xl font-bold">🏪 Business Help</h1>
            </div>
            <div className="space-y-4">
                {[
                    { emoji: '📋', title: 'Udyam Registration', desc: '8 asaan steps mein business register karo', steps: 8 },
                    { emoji: '💰', title: 'MUDRA Loan Guide', desc: 'Documents aur process puri jaankari', steps: 5 },
                    { emoji: '📱', title: 'UPI Kaise Use Karein', desc: 'Paisa bhejo, paisa lo — guided walkthrough', steps: 5 },
                    { emoji: '🛒', title: 'ONDC Pe Becho', desc: 'Apna saman online becho — free platform', steps: 6 },
                    { emoji: '⚖️', title: 'Worker Rights', desc: 'Minimum wage, PF, aur aapke adhikar', steps: null },
                ].map((topic, i) => (
                    <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5">
                        <div className="flex items-start gap-4">
                            <span className="text-4xl">{topic.emoji}</span>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">{topic.title}</h3>
                                <p className="text-slate-400 text-base mt-1">{topic.desc}</p>
                                {topic.steps && <p className="text-emerald-400 text-sm mt-1">{topic.steps} asaan steps</p>}
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl text-lg transition-all">Dekho →</button>
                    </div>
                ))}
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
