import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    CloudUpload, 
    FileText, 
    CheckCircle2, 
    AlertCircle, 
    ArrowRight, 
    Download,
    Lightbulb,
    Check,
    Loader2
} from 'lucide-react'

const MOCK_REWRITES = [
    {
        id: 1,
        before: "Worked on customer complaints",
        after: "Resolved 120+ customer escalations monthly, reducing churn by 18%",
        impact: "Quantified Impact"
    },
    {
        id: 2,
        before: "Made Excel reports",
        after: "Built 15+ automated Excel dashboards tracking ₹2.4Cr in monthly revenue",
        impact: "Automation & Revenue"
    },
    {
        id: 3,
        before: "Helped team with tasks",
        after: "Coordinated cross-functional team of 8, delivering 3 projects ahead of deadline",
        impact: "Leadership"
    }
]

const MISSING_SKILLS = [
    { name: "SQL", impact: "+₹8,000/month", time: "6 weeks" },
    { name: "Power BI", impact: "+₹6,000/month", time: "4 weeks" },
    { name: "Python", impact: "+₹12,000/month", time: "10 weeks" }
]

export default function JSResume() {
    const navigate = useNavigate()
    const { chatOpen, setChatOpen } = useAppStore()
    const [state, setState] = useState('upload') // upload, analyzing, results
    const [fileName, setFileName] = useState('')
    const [atsScore, setAtsScore] = useState(0)

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFileName(file.name)
            processFile()
        }
    }

    const handleSample = () => {
        setFileName('Sample_Resume.pdf')
        processFile()
    }

    const processFile = () => {
        setState('analyzing')
        setTimeout(() => {
            setState('results')
        }, 1500)
    }

    useEffect(() => {
        if (state === 'results') {
            const timer = setTimeout(() => {
                setAtsScore(58)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [state])

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100 relative">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none">
                <div className="max-w-4xl mx-auto space-y-8 pb-32 mt-14 lg:mt-0">
                    
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Resume Intelligence</h1>
                        <p className="text-slate-400 font-medium">AI-powered analysis to beat the ATS 10x faster.</p>
                    </div>

                    {state === 'upload' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Upload Zone */}
                            <label className="block group cursor-pointer">
                                <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileUpload} />
                                <div className="border-2 border-dashed border-slate-700 group-hover:border-blue-500/50 rounded-2xl p-16 flex flex-col items-center justify-center bg-slate-800/20 group-hover:bg-blue-500/5 transition-all duration-300">
                                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
                                        <CloudUpload className="text-slate-400 group-hover:text-blue-400" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Drag your resume here or click to browse</h3>
                                    <p className="text-slate-500 font-medium">Supports PDF, DOCX up to 5MB</p>
                                </div>
                            </label>

                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-slate-800"></div>
                                <span className="text-slate-600 font-bold uppercase tracking-widest text-xs">or</span>
                                <div className="h-px flex-1 bg-slate-800"></div>
                            </div>

                            <div className="flex justify-center">
                                <button 
                                    onClick={handleSample}
                                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl font-bold transition-all flex items-center gap-2"
                                >
                                    <FileText size={18} /> Try with sample resume
                                </button>
                            </div>
                        </div>
                    )}

                    {state === 'analyzing' && (
                        <div className="flex flex-col items-center justify-center py-24 space-y-6 animate-pulse">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                                <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400" size={32} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1">Analyzing {fileName}...</h3>
                                <p className="text-slate-500 text-sm font-medium">Scanning for industry keywords and structural flaws</p>
                            </div>
                            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 animate-[shimmer_2s_infinite]" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    )}

                    {state === 'results' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
                            
                            {/* ATS Score Section */}
                            <div className="glass-card p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <AlertCircle size={100} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">ATS Compatibility Score</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-6xl font-black text-white tracking-tighter">
                                                    {atsScore}
                                                </span>
                                                <span className="text-slate-500 text-2xl font-bold">/100</span>
                                            </div>
                                        </div>
                                        <div className="bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider mb-2">
                                            Medium Risk
                                        </div>
                                    </div>
                                    <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden mb-4 p-0.5 border border-slate-700/50">
                                        <div 
                                            className="h-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                                            style={{ width: `${atsScore}%` }}
                                        />
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">
                                        <strong className="text-rose-400">42% chance of rejection</strong> by automated filters. Key metrics like Quantification and Formatting need work.
                                    </p>
                                </div>
                            </div>

                            {/* Bullet Point Comparison */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                                        <Lightbulb size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">AI-Rewritten Bullet Points</h2>
                                </div>
                                
                                <div className="space-y-4">
                                    {MOCK_REWRITES.map((item, idx) => (
                                        <div 
                                            key={item.id} 
                                            className="grid md:grid-cols-2 gap-px bg-slate-700 rounded-2xl overflow-hidden border border-slate-700 transition-all hover:border-slate-500 opacity-0 animate-[fade-in-up_0.5s_ease-out_forwards]"
                                            style={{ animationDelay: `${idx * 150}ms` }}
                                        >
                                            <div className="bg-slate-900/50 p-5 relative">
                                                <span className="absolute top-2 right-4 text-[10px] font-black text-rose-500 uppercase tracking-widest opacity-50">Before</span>
                                                <p className="text-slate-500 line-through decoration-rose-500/50 font-medium italic pr-4">{item.before}</p>
                                            </div>
                                            <div className="bg-slate-800 p-5 relative">
                                                <span className="absolute top-2 right-4 text-[10px] font-black text-emerald-500 uppercase tracking-widest">After</span>
                                                <p className="text-emerald-50 text-sm font-bold leading-relaxed pr-4">{item.after}</p>
                                                <div className="mt-2 text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded inline-block">
                                                    {item.impact}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Missing Skills */}
                            <section className="space-y-4">
                                <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest pl-1">Target Skill Impact</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {MISSING_SKILLS.map((skill, idx) => (
                                        <div 
                                            key={skill.name} 
                                            className="glass-card p-5 border-l-4 border-l-blue-500/50 opacity-0 animate-[fade-in-up_0.5s_ease-out_forwards]"
                                            style={{ animationDelay: `${600 + idx * 100}ms` }}
                                        >
                                            <h4 className="text-white font-bold mb-1">{skill.name}</h4>
                                            <p className="text-emerald-400 text-sm font-black">{skill.impact}</p>
                                            <p className="text-slate-500 text-xs font-medium mt-1">{skill.time} to learn</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Suggestions */}
                            <section className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 opacity-0 animate-[fade-in_1s_ease-out_0.8s_forwards]">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-emerald-400" /> Format Recommendations
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Add a professional summary section at the top",
                                        "Quantify at least 3 more achievements with numbers",
                                        "Remove \"References available on request\"",
                                        "Use consistent date format (MM/YYYY)"
                                    ].map((text, i) => (
                                        <li key={i} className="flex gap-3 text-sm font-medium text-slate-400">
                                            <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0">
                                                <Check size={10} strokeWidth={4} />
                                            </div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Footer Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800">
                                <button 
                                    onClick={() => navigate('/roadmap')}
                                    className="flex-1 btn-blue py-4 text-base font-black shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
                                >
                                    Generate My Learning Roadmap <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2">
                                    <Download size={20} /> Download Improved Resume Tips
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {chatOpen && (
                <AIChatPanel 
                    userType="jobseeker" 
                    isOpen={chatOpen} 
                    onClose={() => setChatOpen(false)} 
                />
            )}
        </div>
    )
}
