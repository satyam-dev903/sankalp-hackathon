import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    ExternalLink, 
    CheckCircle2, 
    X,
    Building2,
    ShieldCheck,
    Briefcase
} from 'lucide-react'

const MOCK_SCHEMES = [
    {
        id: 1,
        title: "PMKVY 4.0",
        ministry: "Ministry of Skill Dev",
        benefit: "Free training + ₹500 stipend",
        eligibility: ["18-45 years", "Unemployed"],
        color: "bg-blue-600",
        icon: <Building2 size={24} />
    },
    {
        id: 2,
        title: "PM Kaushal Vikas",
        ministry: "NSDC",
        benefit: "₹8,000 course subsidy",
        eligibility: ["Below ₹1.5L income", "10th Pass"],
        color: "bg-emerald-600",
        icon: <Briefcase size={24} />
    },
    {
        id: 3,
        title: "NSDC Scholarship",
        ministry: "NSDC",
        benefit: "Up to ₹50,000/year",
        eligibility: ["Merit based", "Tech Courses"],
        color: "bg-purple-600",
        icon: <Building2 size={24} />
    },
    {
        id: 4,
        title: "Startup India",
        ministry: "DPIIT",
        benefit: "₹10L seed fund + mentoring",
        eligibility: ["Innovative idea", "Registered Entity"],
        color: "bg-orange-600",
        icon: <Briefcase size={24} />
    },
    {
        id: 5,
        title: "DigiLocker Cert",
        ministry: "MeitY",
        benefit: "Free digital credential vault",
        eligibility: ["All citizens", "Aadhaar linked"],
        color: "bg-indigo-600",
        icon: <ShieldCheck size={24} />
    },
    {
        id: 6,
        title: "State Skill Msn",
        ministry: "State Govt",
        benefit: "District-specific training",
        eligibility: ["Local residents", "Below Poverty Line"],
        color: "bg-rose-600",
        icon: <Building2 size={24} />
    }
]

export default function JSSchemes() {
    const navigate = useNavigate()
    const { chatOpen, setChatOpen } = useAppStore()
    const [selectedScheme, setSelectedScheme] = useState(null)
    const [modalStep, setModalStep] = useState(0)
    const [eligibilityAnswers, setEligibilityAnswers] = useState({})
    const [isEligible, setIsEligible] = useState(null)

    const handleCheckEligibility = (scheme) => {
        setSelectedScheme(scheme)
        setModalStep(1)
        setEligibilityAnswers({})
        setIsEligible(null)
    }

    const closeModal = () => {
        setSelectedScheme(null)
        setModalStep(0)
    }

    const answerQuestion = (index, ans) => {
        const newAnswers = { ...eligibilityAnswers, [index]: ans }
        setEligibilityAnswers(newAnswers)

        const questionsLength = 3 // Assuming 3 questions
        if (Object.keys(newAnswers).length === questionsLength) {
            // Check eligibility logic (simple mock)
            const allYes = Object.values(newAnswers).every(v => v === 'yes')
            setIsEligible(allYes)
            setModalStep(2)
        }
    }

    const getQuestions = (scheme) => [
        `Are you currently a resident of India?`,
        `Do you meet the age criteria constraint of ${scheme.eligibility[0]}?`,
        `Does your profile match the requirement: ${scheme.eligibility[1]}?`
    ]

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100 relative">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none backdrop-blur-3xl">
                {/* Ambient glow */}
                <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                
                <div className="max-w-6xl mx-auto space-y-8 pb-32 mt-14 lg:mt-0 relative z-10">
                    
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Government Schemes</h1>
                        <p className="text-slate-400 font-medium">Verified programs and subsidies matched to your profile.</p>
                    </div>

                    {/* Schemes Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {MOCK_SCHEMES.map((scheme, idx) => (
                            <div 
                                key={scheme.id} 
                                className="glass-card flex flex-col hover:-translate-y-1 hover:border-slate-600 transition-all duration-300 opacity-0 animate-[fade-in-up_0.5s_ease-out_forwards]"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="p-6 flex-1 border-b border-slate-700/50">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-inner ${scheme.color}`}>
                                            {scheme.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white leading-tight mb-1">{scheme.title}</h3>
                                            <p className="text-sm font-semibold text-slate-400">{scheme.ministry}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Primary Benefit</p>
                                        <p className="text-xl font-bold text-emerald-400">
                                            {scheme.benefit}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Eligibility Criteria</p>
                                        <div className="flex flex-wrap gap-2">
                                            {scheme.eligibility.map(req => (
                                                <span key={req} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 shadow-sm">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-slate-800/20 flex gap-3 rounded-b-xl border-t border-slate-700/50">
                                    <button 
                                        onClick={() => handleCheckEligibility(scheme)}
                                        className="flex-1 btn-outline text-sm py-2.5 font-bold border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                                    >
                                        Check Eligibility
                                    </button>
                                    <button className="flex-1 btn-blue text-sm py-2.5 font-bold flex justify-center items-center gap-2">
                                        Apply Now <ExternalLink size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Eligibility Modal */}
            {selectedScheme && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                            <div>
                                <h3 className="text-lg font-bold text-white">Eligibility Check</h3>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">{selectedScheme.title}</p>
                            </div>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {modalStep === 1 && (
                                <div className="space-y-6">
                                    <p className="text-sm text-slate-300 leading-relaxed font-medium">Please answer the following questions to verify your eligibility for <strong className="text-white">{selectedScheme.title}</strong>.</p>
                                    
                                    <div className="space-y-5">
                                        {getQuestions(selectedScheme).map((q, idx) => (
                                            <div key={idx} className={`space-y-3 transition-opacity duration-300 ${eligibilityAnswers[idx] ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                                                <p className="text-sm font-semibold text-white">{idx + 1}. {q}</p>
                                                <div className="flex gap-3">
                                                    <button 
                                                        onClick={() => answerQuestion(idx, 'yes')}
                                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all border ${eligibilityAnswers[idx] === 'yes' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button 
                                                        onClick={() => answerQuestion(idx, 'no')}
                                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all border ${eligibilityAnswers[idx] === 'no' ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {modalStep === 2 && (
                                <div className="text-center py-6 animate-in zoom-in-95 duration-500">
                                    {isEligible ? (
                                        <>
                                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-5 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                                <CheckCircle2 size={40} className="animate-[bounce_2s_infinite]" />
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">You're Eligible!</h3>
                                            <p className="text-slate-400 text-sm mb-8 font-medium">Great news! You meet all the basic criteria for this scheme.</p>
                                            <button className="w-full btn-blue py-3.5 text-base shadow-lg shadow-blue-500/25 flex justify-center items-center gap-2">
                                                Proceed to Application <ExternalLink size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 mx-auto mb-5 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                                                <X size={40} />
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Not Eligible</h3>
                                            <p className="text-slate-400 text-sm mb-8 font-medium">Unfortunately, you do not meet the criteria for this scheme at this time.</p>
                                            <button onClick={closeModal} className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors border border-slate-700">
                                                Explore Other Schemes
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {chatOpen && <AIChatPanel />}
        </div>
    )
}
