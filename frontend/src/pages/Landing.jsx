import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/useAppStore'
import { TrendingUp, TrendingDown, ArrowRight, Zap, Sparkles } from 'lucide-react'

const skillData = [
    { skill: 'Python', change: '+47%', state: 'Rajasthan', trend: 'up' },
    { skill: 'Solar Tech', change: '+38%', state: 'MP', trend: 'up' },
    { skill: 'CNC Operation', change: '+29%', state: 'Maharashtra', trend: 'up' },
    { skill: 'React.js', change: '+52%', state: 'Karnataka', trend: 'up' },
    { skill: 'AWS Cloud', change: '+41%', state: 'Delhi', trend: 'up' },
    { skill: 'Data Entry', change: '-43%', state: 'Rajasthan', trend: 'down' },
    { skill: 'Tally Basic', change: '-31%', state: 'Gujarat', trend: 'down' },
    { skill: 'MS Word', change: '-28%', state: 'UP', trend: 'down' },
    { skill: 'Python', change: '+47%', state: 'Rajasthan', trend: 'up' },
    { skill: 'Solar Tech', change: '+38%', state: 'MP', trend: 'up' },
    { skill: 'CNC Operation', change: '+29%', state: 'Maharashtra', trend: 'up' },
    { skill: 'Data Entry', change: '-43%', state: 'Rajasthan', trend: 'down' },
]

const categories = [
    {
        id: 'jobseeker',
        icon: '🎯',
        title: 'Job Seeker',
        hindi: 'Main kaam dhundhna chahta hoon',
        description: 'Professional Career Intelligence. AI skill analysis, personalized roadmaps, and automated job matching.',
        glow: 'from-blue-500/20 via-indigo-500/10 to-transparent',
        borderGlow: 'group-hover:border-blue-500/50',
        btnGrad: 'from-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]',
        route: '/onboarding',
        btnText: 'Start Journey',
    },
    {
        id: 'bluecollar',
        icon: '🔧',
        title: 'Blue Collar',
        hindi: 'Koi form nahi, sirf tasveer tap karo',
        description: 'Voice-first, picture tap interface. Government schemes and jobs matching with zero typing needed.',
        glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        borderGlow: 'group-hover:border-emerald-500/50',
        btnGrad: 'from-emerald-600 to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]',
        route: '/simple/onboarding',
        btnText: 'Shuru Karo',
    },
    {
        id: 'govt',
        icon: '🏛️',
        title: 'Government',
        hindi: 'District Analytics & Policy',
        description: 'Real-time data dashboard for administrators. 6-month skill forecast and AI policy assistant.',
        glow: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
        borderGlow: 'group-hover:border-purple-500/50',
        btnGrad: 'from-purple-600 to-fuchsia-600 shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]',
        route: '/govt/login',
        btnText: 'Admin Login',
    },
]

export default function Landing() {
    const navigate = useNavigate()
    const { setCategory } = useAppStore()

    const handleSelect = (cat) => {
        setCategory(cat.id)
        navigate(cat.route)
    }

    return (
        <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden relative">

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen transition-opacity duration-1000" />
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen transition-opacity duration-1000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen transition-opacity duration-1000" />

            {/* Sticky Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                            <Zap size={16} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">KaushalAI</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
                            className="hidden md:block text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">
                            Manifesto
                        </span>
                        <span onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
                            className="hidden md:block text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">
                            OS Architecture
                        </span>
                        <button onClick={() => navigate('/govt/login')} className="text-sm font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] px-5 py-2 rounded-full transition-all text-white hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                            Partner Portal
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center z-10 min-h-[70vh]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mb-8 animate-fade-in-up">
                    <Sparkles size={14} className="text-blue-400 animate-pulse" />
                    <span className="text-sm font-medium text-slate-300">India's First Active Career OS</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-6 max-w-4xl leading-tight drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Intelligence for the <br />
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent pr-2">Next Billion</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-16 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Bridging the gap between 500 million workers and the future of work.
                    Three distinct platforms, powered by a single intelligent loop.
                </p>

                {/* Glassmorphic Ticker */}
                <div className="w-full max-w-4xl mx-auto bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl rounded-2xl p-4 shadow-2xl relative overflow-hidden group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                    <div className="flex items-center gap-3 mb-3 px-2 border-b border-white/[0.05] pb-3 relative z-10">
                        <div className="flex items-center gap-2 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live</span>
                        </div>
                        <span className="text-xs text-slate-300 font-semibold uppercase tracking-widest">Skill Futures Index</span>
                    </div>
                    <div className="overflow-hidden relative flex items-center h-10 cursor-default">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

                        <div className="ticker-wrapper w-full absolute whitespace-nowrap">
                            <div className="ticker-content inline-block">
                                {skillData.map((item, i) => (
                                    <span key={i} className="inline-flex items-center gap-2 mx-8 transition-transform hover:scale-105 duration-300">
                                        {item.trend === 'up' ? (
                                            <TrendingUp size={16} className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
                                        ) : (
                                            <TrendingDown size={16} className="text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]" />
                                        )}
                                        <span className="font-semibold text-sm text-slate-100">{item.skill}</span>
                                        <span className={item.trend === 'up' ? 'text-sm font-bold text-emerald-400' : 'text-sm font-bold text-red-400'}>
                                            {item.change}
                                        </span>
                                        <span className="text-slate-500 text-xs tracking-wider">{item.state}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Stats Section */}
            <section id="stats" className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 text-center backdrop-blur-md">
                        <div className="text-3xl font-bold text-white mb-1">500M+</div>
                        <div className="text-sm text-slate-400">Workers Served</div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 text-center backdrop-blur-md">
                        <div className="text-3xl font-bold text-white mb-1">22</div>
                        <div className="text-sm text-slate-400">Languages</div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 text-center backdrop-blur-md">
                        <div className="text-3xl font-bold text-white mb-1">309M</div>
                        <div className="text-sm text-slate-400">Informal Workers</div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 text-center backdrop-blur-md">
                        <div className="text-3xl font-bold text-white mb-1">48%</div>
                        <div className="text-sm text-slate-400">Placement Rate</div>
                    </div>
                </div>
            </section>

            {/* Platform Grid */}
            <section id="platforms" className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
                <div className="flex items-center justify-center gap-4 mb-16 opacity-0 animate-[fade-in-up_1s_ease-out_0.5s_forwards]">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full max-w-[100px]" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Select your module</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full max-w-[100px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div
                            key={cat.id}
                            className={"group relative rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] cursor-pointer overflow-hidden backdrop-blur-md opacity-0 animate-[fade-in-up_1s_ease-out_forwards] " + cat.borderGlow}
                            style={{ animationDelay: (0.6 + idx * 0.15) + 's' }}
                            onClick={() => handleSelect(cat)}
                        >
                            {/* Inner ambient glow */}
                            <div className={"absolute top-0 left-0 w-full h-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none " + cat.glow} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="text-4xl mb-6 bg-white/[0.04] w-16 h-16 rounded-2xl flex items-center justify-center border border-white/[0.08] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                                    {cat.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{cat.title}</h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5 h-5 opacity-80">{cat.hindi}</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                                    {cat.description}
                                </p>

                                <button className={"w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3 " + cat.btnGrad}>
                                    {cat.btnText} <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/[0.05] bg-[#030712]/80 backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-slate-500 text-sm font-medium hover:text-white transition-colors cursor-pointer">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-xs">⚡</div>
                        KaushalAI © 2026
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
                        <button onClick={() => navigate('/help')} className="hover:text-blue-400 transition-colors">Livelihood Help</button>
                        <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
                    </div>
                </div>
            </footer>

            {/* Global style overrides */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(30px) scale(0.98); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    opacity: 0;
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            ` }} />
        </div>
    )
}
