import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import AIChatPanel from '../../components/AIChatPanel'
import { MessageCircle, Briefcase, GraduationCap, Building2, ShoppingBag } from 'lucide-react'

const quickActions = [
    { icon: '💼', label: 'Kaam Dhundo', route: '/simple/jobs', color: 'from-emerald-600 to-teal-600' },
    { icon: '🏛️', label: 'Yojana Pao', route: '/simple/schemes', color: 'from-blue-600 to-blue-700' },
    { icon: '📚', label: 'Kuch Seekho', route: '/simple/learn', color: 'from-orange-500 to-amber-600' },
    { icon: '🏪', label: 'Business Help', route: '/simple/business', color: 'from-purple-600 to-purple-700' },
]

const highlights = [
    { icon: '🏛️', text: 'MUDRA Loan — ₹50,000 tak available', color: 'border-blue-500/30 bg-blue-900/10' },
    { icon: '💼', text: '3 nayi naukri mili hain Patna mein aaj', color: 'border-emerald-500/30 bg-emerald-900/10' },
]

export default function BCDashboard() {
    const navigate = useNavigate()
    const { profile, chatOpen, setChatOpen } = useAppStore()
    const name = profile?.name || 'Savitri'

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-24" style={{ fontSize: 18 }}>
            {/* Header */}
            <div className="bg-slate-800/60 border-b border-slate-700/50 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg">⚡</div>
                <div>
                    <h1 className="font-bold text-white leading-none">KaushalAI</h1>
                    <p className="text-emerald-400 text-xs">Aapka saathi</p>
                </div>
            </div>

            <div className="px-5 pt-8 pb-4">
                <h2 className="text-2xl font-extrabold text-white mb-1">Namaste, {name} ji! 🙏</h2>
                <p className="text-slate-400 text-base">Aaj aap kya karna chahte ho?</p>
            </div>

            {/* Highlights */}
            <div className="px-5 space-y-3 mb-8">
                {highlights.map((h, i) => (
                    <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border ${h.color}`}>
                        <span className="text-2xl">{h.icon}</span>
                        <p className="text-slate-200 font-medium text-base">{h.text}</p>
                    </div>
                ))}
            </div>

            {/* Main Action Grid */}
            <div className="px-5 grid grid-cols-2 gap-4 mb-8">
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={() => navigate(action.route)}
                        className={`bg-gradient-to-br ${action.color} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 min-h-[120px]`}>
                        <span className="text-5xl">{action.icon}</span>
                        <span className="text-white font-bold text-lg text-center leading-tight">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* AI Counselor big button */}
            <div className="px-5">
                <button
                    onClick={() => setChatOpen(true)}
                    className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-2xl py-5 px-6 text-white font-bold text-xl transition-all hover:scale-105 active:scale-95">
                    <MessageCircle size={28} className="text-emerald-400" />
                    💬 Salahkar se baat karo
                </button>
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700/50 flex">
                {[
                    { icon: <Briefcase size={22} />, label: 'Kaam Dhundo', route: '/simple/jobs' },
                    { icon: <Building2 size={22} />, label: 'Yojana Pao', route: '/simple/schemes' },
                    { icon: <GraduationCap size={22} />, label: 'Seekho', route: '/simple/learn' },
                    { icon: <ShoppingBag size={22} />, label: 'Business', route: '/simple/business' },
                ].map((item, i) => (
                    <button
                        key={i}
                        onClick={() => navigate(item.route)}
                        className="flex-1 flex flex-col items-center justify-center pt-3 pb-4 gap-1 text-slate-400 hover:text-emerald-400 transition-colors active:scale-95"
                        style={{ minHeight: 60 }}>
                        {item.icon}
                        <span className="text-xs font-bold">{item.label}</span>
                    </button>
                ))}
            </div>

            {chatOpen && <AIChatPanel userType="bluecollar" isOpen={chatOpen} onClose={() => setChatOpen(false)} />}
        </div>
    )
}
