import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const ALL_SKILLS = [
    { id: 'excel', label: 'Excel', img: 'https://images.unsplash.com/photo-1543286386-713bcc549fd0?w=400&q=80' },
    { id: 'hindi_typing', label: 'Hindi Typing', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?w=400&q=80' },
    { id: 'tally', label: 'Tally ERP', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80' },
    { id: 'data_entry', label: 'Data Entry', img: 'https://images.unsplash.com/photo-1593060242202-386d7560829e?w=400&q=80' },
    { id: 'social_media', label: 'Social Media', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80' },
    { id: 'customer_service', label: 'Customer Service', img: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&q=80' },
    { id: 'ms_word', label: 'MS Word', img: 'https://images.unsplash.com/photo-1611095773767-114bab3a4505?w=400&q=80' },
    { id: 'powerpoint', label: 'PowerPoint', img: 'https://images.unsplash.com/photo-1586281380349-631531a744c2?w=400&q=80' },
    { id: 'basic_english', label: 'Basic English', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80' },
    { id: 'sales', label: 'Sales', img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&q=80' },
    { id: 'accounts', label: 'Accounts', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
    { id: 'logistics', label: 'Logistics', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80' },
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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="w-full max-w-3xl glass-card p-8 animate-fade-in z-10 border-white/5">
                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-3 font-bold uppercase tracking-widest">
                        <span>Step 2 of 3</span>
                        <span>Selection: {selectedSkills.length} SKILLS</span>
                    </div>
                    <div className="flex gap-2.5">
                        <div className="h-1 flex-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                        <div className="h-1 flex-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                        <div className="h-1 flex-1 bg-slate-800 rounded-full"></div>
                    </div>
                </div>

                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-white mb-4 tracking-tight">What are you good at?</h1>
                    <p className="text-slate-400 max-w-lg mx-auto font-medium">Be honest, this helps us find your hidden strengths through our Skill Genome™ Engine.</p>
                </div>

                {/* Skill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                    {ALL_SKILLS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill.id)
                        return (
                            <div
                                key={skill.id}
                                onClick={() => toggleSkill(skill.id)}
                                className={`picture-card group ${isSelected ? 'selected' : ''}`}
                            >
                                <img src={skill.img} alt={skill.label} />
                                <span className="label-overlay text-[10px] sm:text-xs">
                                    {skill.label}
                                </span>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 z-20 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Footer Actions */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button
                        onClick={() => navigate('/onboarding')}
                        className="text-slate-500 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                    >
                        <ArrowLeft size={14} /> Go Back
                    </button>
                    
                    <button
                        onClick={handleSubmit}
                        disabled={selectedSkills.length === 0}
                        className={`w-full sm:w-auto px-10 py-4 rounded-xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-wider transition-all duration-300
                            ${selectedSkills.length > 0 
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1' 
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'
                            }
                        `}
                    >
                        Analyze My Genome <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}
