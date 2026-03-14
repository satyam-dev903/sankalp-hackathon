import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const ALL_SKILLS = [
    { id: 'excel', label: 'Excel', icon: '📊' },
    { id: 'hindi_typing', label: 'Hindi Typing', icon: '⌨️' },
    { id: 'tally', label: 'Tally ERP', icon: '🧾' },
    { id: 'data_entry', label: 'Data Entry', icon: '💻' },
    { id: 'social_media', label: 'Social Media', icon: '📱' },
    { id: 'customer_service', label: 'Customer Service', icon: '🤝' },
    { id: 'ms_word', label: 'MS Word', icon: '📝' },
    { id: 'powerpoint', label: 'PowerPoint', icon: '📌' },
    { id: 'basic_english', label: 'Basic English', icon: '🗣️' },
    { id: 'sales', label: 'Sales', icon: '💼' },
    { id: 'accounts', label: 'Accounts', icon: '🏦' },
    { id: 'logistics', label: 'Logistics', icon: '🚚' },
]

export default function JSOnboardingSkills() {
    const navigate = useNavigate()
    const { profile, setProfile } = useAppStore()
    const [selectedSkills, setSelectedSkills] = useState([])

    const toggleSkill = (skillId) => {
        setSelectedSkills(prev => 
            prev.includes(skillId) 
                ? prev.filter(id => id !== skillId)
                : [...prev, skillId]
        )
    }

    const handleSubmit = () => {
        if (selectedSkills.length === 0) return
        
        const skillLabels = selectedSkills.map(id => ALL_SKILLS.find(s => s.id === id)?.label)
        setProfile({ ...profile, skills: skillLabels })
        navigate('/onboarding/analyzing')
    }

    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="w-full max-w-2xl glass-card p-8 animate-fade-in z-10">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                        <span>Step 2 of 3</span>
                        <span>Your Skills</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-1.5 flex-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div className="h-1.5 flex-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div className="h-1.5 flex-1 bg-slate-700 rounded-full transition-colors duration-500"></div>
                    </div>
                </div>

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">What skills do you already have?</h1>
                    <p className="text-sm text-slate-400 max-w-md mx-auto">Select all that apply — be honest, this helps us find your hidden strengths.</p>
                </div>

                {/* Skill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {ALL_SKILLS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill.id)
                        return (
                            <div
                                key={skill.id}
                                onClick={() => toggleSkill(skill.id)}
                                className={`picture-card group ${isSelected ? 'selected border-emerald-500 bg-emerald-900/30' : 'border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800'}`}
                            >
                                <div className={`text-3xl mb-1 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {skill.icon}
                                </div>
                                <span className={`text-xs font-semibold text-center transition-colors ${isSelected ? 'text-emerald-400' : 'text-slate-300 group-hover:text-emerald-300'}`}>
                                    {skill.label}
                                </span>
                            </div>
                        )
                    })}
                </div>

                {/* Footer Actions */}
                <div className="pt-6 border-t border-slate-700/50 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/onboarding')}
                        className="text-slate-400 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors px-4 py-2"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    
                    <div className="flex items-center gap-4">
                        {selectedSkills.length > 0 && (
                            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 animate-fade-in">
                                {selectedSkills.length} skills selected
                            </span>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={selectedSkills.length === 0}
                            className={`px-8 py-3 rounded-lg flex items-center gap-2 font-bold transition-all duration-300
                                ${selectedSkills.length > 0 
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5' 
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                }
                            `}
                        >
                            Analyze My Profile <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
