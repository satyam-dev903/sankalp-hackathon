import React, { useState, useEffect } from 'react'
import { X, Sparkles, Loader2, Save, User as UserIcon, Briefcase, MapPin, Phone } from 'lucide-react'
import useAppStore from '../store/useAppStore'

export default function ProfileEditor({ userType, isOpen, onClose }) {
    const { profile, bcProfile, govtProfile, updateProfile, enhanceProfile } = useAppStore()
    
    // Select correct profile source
    const initialData = userType === 'govt' ? govtProfile : userType === 'bluecollar' ? bcProfile : profile
    
    const [formData, setFormData] = useState(initialData || {})
    const [isEnhancing, setIsEnhancing] = useState(false)
    const [aiPreview, setAiPreview] = useState(null)

    useEffect(() => {
        if (isOpen) setFormData(initialData || {})
    }, [isOpen, initialData])

    if (!isOpen) return null

    const handleSave = () => {
        updateProfile(userType, formData)
        onClose()
    }

    const handleAIEnhance = async () => {
        setIsEnhancing(true)
        const enhanced = await enhanceProfile(userType, formData)
        if (enhanced) {
            setAiPreview(enhanced)
        }
        setIsEnhancing(false)
    }

    const applyAI = () => {
        setFormData(prev => ({ ...prev, summary: aiPreview }))
        setAiPreview(null)
    }

    const themeColor = userType === 'govt' ? 'purple' : userType === 'bluecollar' ? 'emerald' : 'blue'

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#0F172A] border border-slate-700/50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-${themeColor}-500/10 flex items-center justify-center text-${themeColor}-400`}>
                            <UserIcon size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tight">Edit Profile</h3>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">Customize your professional presence</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scroll-smooth">
                    {/* Common Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    value={formData.name || ''}
                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        {/* Category Specific Fields */}
                        {userType === 'jobseeker' && (
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Current Education</label>
                                <input 
                                    type="text" 
                                    value={formData.education || ''}
                                    onChange={e => setFormData(prev => ({ ...prev, education: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none transition-all"
                                    placeholder="e.g. B.Tech Computer Science"
                                />
                            </div>
                        )}

                        {userType === 'bluecollar' && (
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Trade / Skill</label>
                                <input 
                                    type="text" 
                                    value={formData.trade || ''}
                                    onChange={e => setFormData(prev => ({ ...prev, trade: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none transition-all"
                                    placeholder="e.g. Plumber, Electrician"
                                />
                            </div>
                        )}

                        {userType === 'govt' && (
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Designation</label>
                                <input 
                                    type="text" 
                                    value={formData.designation || ''}
                                    onChange={e => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none transition-all"
                                    placeholder="e.g. District Magistrate"
                                />
                            </div>
                        )}
                    </div>

                    {/* Summary Section with AI Feature */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Professional Summary</label>
                            <button 
                                onClick={handleAIEnhance}
                                disabled={isEnhancing}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-${themeColor}-500/10 text-${themeColor}-400 border border-${themeColor}-500/20 hover:bg-${themeColor}-500/20 transition-all disabled:opacity-50 shadow-lg shadow-${themeColor}-500/5`}
                            >
                                {isEnhancing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                AI Enhance
                            </button>
                        </div>

                        {aiPreview ? (
                            <div className={`p-4 rounded-xl bg-${themeColor}-500/5 border border-${themeColor}-500/20 animate-in slide-in-from-top-2 duration-300`}>
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles size={14} className={`text-${themeColor}-400`} />
                                    <span className={`text-[10px] font-black uppercase tracking-widest text-${themeColor}-400`}>AI Suggested Bio</span>
                                </div>
                                <p className="text-sm font-medium text-slate-200 mb-4 leading-relaxed italic">"{aiPreview}"</p>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={applyAI}
                                        className={`flex-1 py-1.5 rounded-lg bg-${themeColor}-600 hover:bg-${themeColor}-500 text-white text-[10px] font-black uppercase tracking-widest transition-all`}
                                    >
                                        Apply Suggestion
                                    </button>
                                    <button 
                                        onClick={() => setAiPreview(null)}
                                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all"
                                    >
                                        Discard
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <textarea 
                                value={formData.summary || ''}
                                onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                                rows={4}
                                className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-200 focus:outline-none transition-all resize-none"
                                placeholder="Write a short bio about yourself..."
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex gap-4">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-4 px-6 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className={`flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-700 hover:from-${themeColor}-500 hover:to-${themeColor}-600 text-white font-black uppercase tracking-widest shadow-xl shadow-${themeColor}-900/20 transition-all flex items-center justify-center gap-2 active:scale-95`}
                    >
                        <Save size={18} />
                        Save Profile
                    </button>
                </div>
            </div>
        </div>
    )
}
