import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Zap } from 'lucide-react'

const steps = [
    { text: 'Analyzing your skill profile...', delay: 800 },
    { text: 'Scanning 50,000+ live job postings...', delay: 1600 },
    { text: 'Running Skill Genome DNA matching...', delay: 2400 },
    { text: 'Calculating your LPI scores...', delay: 3200 },
    { text: 'Building personalized roadmap...', delay: 4000 },
]

export default function JSAnalyzing() {
    const navigate = useNavigate()
    const [doneSteps, setDoneSteps] = useState([])

    useEffect(() => {
        const timers = []
        steps.forEach((step, i) => {
            const t = setTimeout(() => {
                setDoneSteps(prev => [...prev, i])
            }, step.delay)
            timers.push(t)
        })
        const nav = setTimeout(() => navigate('/dashboard'), 4500)
        timers.push(nav)
        return () => timers.forEach(clearTimeout)
    }, [navigate])

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            
            {/* Ambient glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Pulsing Circle */}
            <div className="relative w-24 h-24 mb-12 flex items-center justify-center pulse-ring text-blue-400">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30"></div>
                <Zap size={40} className="relative z-10 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-sm mb-8">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 progress-animated" style={{ animationDuration: '4.5s' }}></div>
                </div>
            </div>

            {/* Steps List */}
            <div className="w-full max-w-sm space-y-4 mb-12 min-h-[160px]">
                {steps.map((step, i) => {
                    const isDone = doneSteps.includes(i)
                    return (
                        <div 
                            key={i} 
                            className={`flex items-center gap-3 transition-opacity duration-300 ${isDone ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}
                        >
                            <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-300">
                                {step.text}
                            </span>
                        </div>
                    )
                })}
            </div>

            <p className="text-slate-500 text-xs font-semibold tracking-wide uppercase mt-8 absolute bottom-8">
                Powered by KaushalBridge Intelligence Engine
            </p>
        </div>
    )
}
