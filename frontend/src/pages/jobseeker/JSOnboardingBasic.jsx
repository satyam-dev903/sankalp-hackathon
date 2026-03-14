import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import { User, MapPin, Phone, Hash } from 'lucide-react'

const districts = [
    'Jaipur', 'Nagpur', 'Lucknow', 'Pune', 'Delhi', 
    'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Ahmedabad', 'Bhopal', 'Patna', 
    'Ranchi', 'Chandigarh'
]

export default function JSOnboardingBasic() {
    const navigate = useNavigate()
    const { setProfile } = useAppStore()
    
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        district: '',
        state: '',
        phone: ''
    })

    const isComplete = formData.name && formData.age && formData.district && formData.phone.length === 10

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isComplete) return
        
        // Simple state inference mock based on district selected
        const inferredState = 
            ['Jaipur'].includes(formData.district) ? 'Rajasthan' :
            ['Nagpur', 'Mumbai', 'Pune'].includes(formData.district) ? 'Maharashtra' :
            ['Lucknow'].includes(formData.district) ? 'Uttar Pradesh' :
            ['Delhi'].includes(formData.district) ? 'Delhi' :
            ['Bengaluru'].includes(formData.district) ? 'Karnataka' :
            ['Hyderabad'].includes(formData.district) ? 'Telangana' :
            ['Chennai'].includes(formData.district) ? 'Tamil Nadu' :
            ['Kolkata'].includes(formData.district) ? 'West Bengal' :
            ['Ahmedabad'].includes(formData.district) ? 'Gujarat' :
            ['Bhopal'].includes(formData.district) ? 'Madhya Pradesh' :
            ['Patna'].includes(formData.district) ? 'Bihar' :
            ['Ranchi'].includes(formData.district) ? 'Jharkhand' :
            ['Chandigarh'].includes(formData.district) ? 'Chandigarh' : 'Unknown State'

        setProfile({ ...formData, state: formData.state || inferredState })
        navigate('/onboarding/skills')
    }

    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="w-full max-w-lg glass-card p-8 animate-fade-in z-10">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                        <span>Step 1 of 3</span>
                        <span>Basic Details</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-1.5 flex-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div className="h-1.5 flex-1 bg-slate-700 rounded-full transition-colors duration-500"></div>
                        <div className="h-1.5 flex-1 bg-slate-700 rounded-full transition-colors duration-500"></div>
                    </div>
                </div>

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Let's build your career profile</h1>
                    <p className="text-sm text-slate-400">Takes 2 minutes. Completely free.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                <User size={16} />
                            </div>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-slate-900/50 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                placeholder="e.g. Rahul Sharma"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Age */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Age</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Hash size={16} />
                                </div>
                                <input
                                    type="number"
                                    min="16" max="60"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    className="w-full bg-slate-900/50 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                    placeholder="Years"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Phone size={16} />
                                </div>
                                <input
                                    type="tel"
                                    maxLength="10"
                                    pattern="[0-9]{10}"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                                    className="w-full bg-slate-900/50 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                    placeholder="10 digits"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">District</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                <MapPin size={16} />
                            </div>
                            <select
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                className="w-full bg-slate-900/50 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium appearance-none"
                                required
                            >
                                <option value="" disabled hidden>Select your district...</option>
                                {districts.map(d => (
                                    <option key={d} value={d} className="bg-slate-800">{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-6 border-t border-slate-700/50 mt-8">
                        <button
                            type="submit"
                            disabled={!isComplete}
                            className={`w-full py-3.5 rounded-lg flex items-center justify-center font-bold transition-all duration-300
                                ${isComplete 
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5' 
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                }
                            `}
                        >
                            Next: Choose your skills →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
