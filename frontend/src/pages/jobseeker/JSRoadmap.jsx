import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    CheckCircle2, 
    Lock, 
    Zap, 
    Bot, 
    Plus, 
    Save, 
    ChevronRight,
    ExternalLink,
    PlayCircle,
    FileText,
    MessageSquare,
    X
} from 'lucide-react'

export default function JSRoadmap() {
    const navigate = useNavigate()
    const { roadmap, updateRoadmapModule, addCustomModule, chatOpen, setChatOpen } = useAppStore()
    
    const [toast, setToast] = useState(false)
    const [aiPanelOpen, setAiPanelOpen] = useState(false)
    const [aiTargetModuleId, setAiTargetModuleId] = useState(null)
    const [aiQuery, setAiQuery] = useState('')
    const [aiResponse, setAiResponse] = useState(null)
    const [isAiLoading, setIsAiLoading] = useState(false)

    // Form states for custom module
    const [showAddForm, setShowAddForm] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newWeek, setNewWeek] = useState('')

    if (!roadmap) return null

    const handleSyncSave = () => {
        setToast(true)
        setTimeout(() => setToast(false), 3000)
    }

    const handleAiSuggest = (moduleId) => {
        const module = roadmap.modules.find(m => m.id === moduleId)
        if (!module) return
        setAiTargetModuleId(moduleId)
        setAiPanelOpen(true)
        setAiResponse(null)
        setAiQuery('')
    }

    const submitAiQuery = (e) => {
        e.preventDefault()
        if (!aiQuery.trim()) return
        
        setIsAiLoading(true)
        // Mock Gemini response delay
        setTimeout(() => {
            setAiResponse({
                suggestion: `Based on your challenge with "${aiQuery}", I recommend trying "SQLBolt" instead of traditional video tutorials. It provides interactive, bite-sized lessons perfectly suited for visual learners.`,
                newResource: "SQLBolt Interactive Lessons - https://sqlbolt.com/"
            })
            setIsAiLoading(false)
        }, 1500)
    }

    const applyAiSuggestion = () => {
        if (!aiResponse || !aiTargetModuleId) return
        
        const targetModule = roadmap.modules.find(m => m.id === aiTargetModuleId)
        if (targetModule) {
            updateRoadmapModule(aiTargetModuleId, {
                resources: [aiResponse.newResource, ...(targetModule.resources || [])]
            })
        }
        
        setAiPanelOpen(false)
        setAiResponse(null)
        setAiQuery('')
    }

    const handleAddCustom = (e) => {
        e.preventDefault()
        if (!newTitle.trim() || !newWeek.trim()) return
        
        addCustomModule({
            title: newTitle,
            week: parseInt(newWeek) || roadmap.modules.length + 1,
            resources: ["Custom resource linked by user"]
        })
        
        setShowAddForm(false)
        setNewTitle('')
        setNewWeek('')
    }

    const getResourceIcon = (url) => {
        if (url.includes('youtube') || url.includes('video')) return <PlayCircle size={14} className="text-red-400" />
        if (url.includes('pdf') || url.includes('docs')) return <FileText size={14} className="text-blue-400" />
        return <ExternalLink size={14} className="text-slate-400" />
    }

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100 relative">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none">
                <div className="max-w-4xl mx-auto space-y-8 pb-32 mt-14 lg:mt-0">
                    
                    {/* Top Bar */}
                    <div className="glass-card p-6 border-b-4 border-b-blue-500 opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                                    Adaptive Roadmap 
                                    <span className="bg-blue-900/40 text-blue-400 text-xs px-2 py-1 rounded-md border border-blue-500/30 font-semibold tracking-wider uppercase ml-2">
                                        Data Analyst
                                    </span>
                                </h1>
                                <p className="text-slate-400 text-sm mt-1">Week {roadmap.current_week} of 12 • AI synchronized</p>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button onClick={() => setChatOpen(true)} className="flex-1 md:flex-none btn-outline text-xs px-4 py-2 border-purple-500/50 text-purple-300 hover:bg-purple-900/30 flex items-center justify-center gap-2 group">
                                    <Bot size={14} className="group-hover:animate-bounce" /> Ask AI to Modify
                                </button>
                                <button onClick={handleSyncSave} className="flex-1 md:flex-none btn-blue text-xs px-4 py-2 flex items-center justify-center gap-2 group">
                                    <Save size={14} className="group-hover:scale-110 transition-transform" /> Sync & Save
                                </button>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-slate-300">Overall Progress</span>
                                <span className="text-blue-400">{roadmap.progress_percentage}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 relative">
                                <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-1500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${roadmap.progress_percentage}%` }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                                </div>
                            </div>
                        </div>

                        {/* Genome Shortcut Banner */}
                        {roadmap.genome_shortcut && (
                            <div className="mt-6 bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 flex items-start gap-4 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                <div className="p-2 border border-amber-500/30 bg-amber-900/40 rounded-lg text-amber-400 flex-shrink-0 animate-pulse-slow">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-amber-300 mb-1">⚡ Excel Shortcut Active</h4>
                                    <p className="text-xs text-amber-200/80 leading-relaxed font-medium">
                                        {roadmap.genome_shortcut.message}. Bypassing introduction modules.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-4 md:pl-8 space-y-8 before:absolute before:inset-0 before:ml-[1.7rem] md:before:ml-[2.7rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-blue-500 before:to-slate-800">
                        {roadmap.modules.map((module, i) => {
                            const isComplete = module.status === 'completed'
                            const isCurrent = module.status === 'current'
                            const isLocked = module.status === 'locked' || module.status === 'custom' // Custom treated as locked for UI if not current
                            
                            return (
                                <div key={module.id} className={`relative flex items-start gap-6 group transition-all duration-500 opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards] ${isLocked ? 'opacity-40 grayscale-[50%]' : ''}`} style={{ animationDelay: `${(i+1)*150}ms` }}>
                                    
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[1.3rem] md:-left-[0.8rem] w-5 h-5 rounded-full border-4 border-[#0F172A] z-10 transition-colors duration-300
                                        ${isComplete ? 'bg-emerald-500' : isCurrent ? 'bg-blue-500 animate-[pulse_2s_ease-in-out_infinite]' : 'bg-slate-700'}`} 
                                    />
                                    
                                    {/* Card */}
                                    <div className={`flex-1 glass-card p-5 transition-all duration-300
                                        ${isComplete ? 'border-l-4 border-l-emerald-500 bg-emerald-900/5 hover:bg-emerald-900/10' : ''}
                                        ${isCurrent ? 'border-l-4 border-l-blue-500 bg-blue-900/10 shadow-[0_4px_30px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20 -translate-y-1' : ''}
                                        ${isLocked ? 'border-l-4 border-l-slate-700 hover:border-l-slate-600' : ''}
                                    `}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Week {module.week}</span>
                                            {isComplete && <span className="text-[10px] font-bold bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1"><CheckCircle2 size={10} /> Completed</span>}
                                            {isCurrent && <span className="text-[10px] font-bold bg-blue-900/40 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full flex items-center gap-1"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" /> Active Now</span>}
                                            {isLocked && <span className="text-slate-500"><Lock size={14} /></span>}
                                        </div>
                                        
                                        <h3 className={`text-lg font-bold mb-3 transition-colors ${isComplete ? 'text-slate-300 line-through decoration-emerald-500/30' : isCurrent ? 'text-white' : 'text-slate-400'}`}>
                                            {module.title}
                                        </h3>
                                        
                                        {(isComplete || isCurrent) && module.resources && (
                                            <div className="space-y-2 mb-4">
                                                {module.resources.map((res, j) => (
                                                    <a key={j} href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50 hover:border-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 group/link">
                                                        {getResourceIcon(res)}
                                                        <span className="truncate flex-1 font-medium">{res}</span>
                                                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {isCurrent && (
                                            <div className="pt-2 border-t border-slate-700/50 mt-4">
                                                <button 
                                                    onClick={() => handleAiSuggest(module.id)}
                                                    className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-2 rounded-lg transition-colors border border-purple-500/20 group"
                                                >
                                                    <Bot size={14} className="group-hover:scale-110 transition-transform" /> Stuck? Suggest Alternative
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Add Custom Module Form */}
                    <div className="pt-6 border-t border-slate-700/50 opacity-0 animate-[fade-in-up_0.6s_ease-out_1s_forwards]">
                        {!showAddForm ? (
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-300 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors text-sm group bg-slate-800/20 hover:bg-slate-800/40"
                            >
                                <Plus size={18} className="group-hover:scale-125 transition-transform" /> Add Custom Module
                            </button>
                        ) : (
                            <form onSubmit={handleAddCustom} className="glass-card p-6 border-blue-500/30 animate-[zoom-in_0.3s_ease-out_forwards]">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Plus size={16} className="text-blue-400" /> Add Custom Learning Module
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Module Title</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={newTitle}
                                            onChange={e => setNewTitle(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium placeholder-slate-600 focus:bg-slate-800/80"
                                            placeholder="e.g., Advanced Pandas Techniques"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Target Week</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={newWeek}
                                            onChange={e => setNewWeek(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium placeholder-slate-600 focus:bg-slate-800/80"
                                            placeholder="e.g., 5"
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-600">
                                            Cancel
                                        </button>
                                        <button type="submit" className="flex-1 btn-blue text-sm px-4 py-2.5 relative overflow-hidden group">
                                            <span className="relative z-10 flex items-center justify-center gap-2">Add Module <Plus size={14} /></span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            {/* AI Suggestion Panel (Slide-in) */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-[#0F172A] border-l border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 z-50 flex flex-col ${aiPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-slate-800 flex justify-between items-center relative overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 pointer-events-none" />
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white tracking-tight">AI Roadmap Guide</h3>
                            <p className="text-xs text-slate-400 font-medium">Powered by Skill Genome</p>
                        </div>
                    </div>
                    <button onClick={() => setAiPanelOpen(false)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors relative z-10">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scroll-smooth relative">
                    {/* Background decoration */}
                    <div className="absolute top-20 right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
                    <div className="absolute bottom-40 left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />
                    
                    <div className="glass-card bg-slate-800/40 p-5 mb-8 relative z-10 border-blue-500/20">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Targeting Module</p>
                                <p className="text-sm text-white font-bold leading-tight">
                                    {roadmap.modules.find(m => m.id === aiTargetModuleId)?.title}
                                </p>
                            </div>
                        </div>
                    </div>

                    {!aiResponse ? (
                        <form onSubmit={submitAiQuery} className="space-y-6 relative z-10 animate-[fade-in-up_0.4s_ease-out_forwards]">
                            <div>
                                <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                                    <MessageSquare size={16} className="text-purple-400" /> What's holding you up?
                                </label>
                                <p className="text-xs text-slate-400 font-medium mb-3">Explain why the current resources aren't working for you (e.g., "Too much reading", "Need Hindi videos").</p>
                                <textarea
                                    value={aiQuery}
                                    onChange={(e) => setAiQuery(e.target.value)}
                                    placeholder="I'm finding the video tutorials a bit too theoretical..."
                                    className="w-full h-36 bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-slate-600 resize-none font-medium transition-all shadow-inner"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isAiLoading}
                                className="w-full py-3.5 bg-gradient-to-r from-purple-600 pb border border-purple-500/50 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                {isAiLoading ? (
                                    <>
                                        <div className="absolute inset-0 bg-white/10 animate-[shimmer_1.5s_infinite]" />
                                        <span className="animate-pulse flex items-center gap-2 relative z-10">AI is thinking <span className="flex gap-0.5"><span className="animate-bounce">.</span><span className="animate-bounce" style={{animationDelay:'0.1s'}}>.</span><span className="animate-bounce" style={{animationDelay:'0.2s'}}>.</span></span></span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10 flex items-center gap-2">Find Better Resources <Zap size={16} className="group-hover:scale-125 transition-transform" /></span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-6 animate-[fade-in-up_0.4s_ease-out_forwards] relative z-10">
                            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-purple-500/30 p-5 rounded-xl shadow-lg shadow-purple-900/10">
                                <div className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Bot size={14} /> AI Recommendation
                                </div>
                                <p className="text-sm text-white/90 leading-relaxed font-medium">
                                    {aiResponse.suggestion}
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2"><Plus size={14} /> Proposed Addition</h4>
                                <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center gap-4 group hover:border-blue-500/40 transition-colors cursor-pointer">
                                    <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <ExternalLink size={18} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-sm text-slate-200 font-bold block truncate mb-0.5">
                                            {aiResponse.newResource.split(' - ')[0]}
                                        </span>
                                        <span className="text-xs text-slate-400 truncate block">
                                            {aiResponse.newResource.split(' - ')[1]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 pt-6 border-t border-slate-800/80 mt-8">
                                <button onClick={() => setAiResponse(null)} className="flex-1 px-4 py-3.5 bg-slate-800 border border-slate-700 text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-700 hover:text-white transition-colors">
                                    Ask Again
                                </button>
                                <button onClick={applyAiSuggestion} className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/50 text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex justify-center items-center gap-2 group overflow-hidden relative">
                                    <span className="relative z-10 flex items-center gap-2">Apply Change <CheckCircle2 size={16} /></span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Backdrop for AI Panel */}
            {aiPanelOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-300"
                    onClick={() => setAiPanelOpen(false)}
                />
            )}

            {/* Sync Toast overlay */}
            <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500/90 backdrop-blur-sm border border-emerald-400 text-white px-6 py-3.5 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center gap-3 z-50 transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <CheckCircle2 size={18} className="animate-pulse" />
                <span className="text-sm font-bold tracking-wide">Roadmap synced to your profile</span>
            </div>

            {chatOpen && <AIChatPanel />}
        </div>
    )
}
