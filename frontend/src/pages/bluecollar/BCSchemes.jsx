import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ExternalLink } from 'lucide-react'

const schemes = [
    {
        name: 'MUDRA Loan',
        ministry: 'Ministry of Finance',
        emoji: '💰',
        benefit: '₹50,000 tak ka loan',
        description: 'Koi guarantee nahi chahiye. Business shuru karo ya badhao.',
        color: 'border-blue-500/40 bg-blue-900/10',
        steps: ['Apne bank mein jao', 'MUDRA Loan form maango', 'Aadhaar aur photo do', '2 hafte mein paisa milega'],
    },
    {
        name: 'PMKVY',
        ministry: 'Ministry of Skill Development',
        emoji: '🎓',
        benefit: 'Free training + ₹8,000 stipend',
        description: 'Skill seekho, naukri pao. Bilkul free.',
        color: 'border-emerald-500/40 bg-emerald-900/10',
        steps: ['pmkvyofficial.org pe jaao', 'Apna naam register karo', 'Paas ka center chunlho', 'Training shuru!'],
    },
    {
        name: 'PM SVANidhi',
        ministry: 'Ministry of Housing',
        emoji: '🏪',
        benefit: '₹10,000 working capital loan',
        description: 'Street vendors aur hawkers ke liye. Koi guarantee nahi.',
        color: 'border-orange-500/40 bg-orange-900/10',
        steps: ['SVANidhi portal pe jaao', 'ULB ya Nagar Palika se contact', 'KYC documents do', 'Loan account mein aayega'],
    },
    {
        name: 'e-Shram Card',
        ministry: 'Ministry of Labour',
        emoji: '🪪',
        benefit: 'Free insurance ₹2 lakh + UAN card',
        description: 'Har kamaane wale ke liye. Accident hone par ₹2 lakh milte hain.',
        color: 'border-purple-500/40 bg-purple-900/10',
        steps: ['eshram.gov.in pe jaao', 'Register karo apna number se', 'Aadhaar verify karo', 'Card download karo'],
    },
    {
        name: 'Udyam Registration',
        ministry: 'Ministry of MSME',
        emoji: '📋',
        benefit: 'Free MSME certificate — business ke fayde',
        description: 'Business register karao, bank loan aur subsidy ke liye zaroori.',
        color: 'border-teal-500/40 bg-teal-900/10',
        steps: ['udyamregistration.gov.in', 'Aadhaar number se login', 'Business details bharo', 'Certificate turant milega'],
    },
]

export default function BCSchemes() {
    const navigate = useNavigate()
    const [expanded, setExpanded] = React.useState(null)

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-8" style={{ fontSize: 18 }}>
            <div className="bg-slate-800/60 border-b border-slate-700/50 px-5 py-4 flex items-center gap-3">
                <button onClick={() => navigate('/simple/dashboard')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                    <ChevronLeft size={22} />
                </button>
                <h1 className="font-bold text-white text-xl">🏛️ Sarkari Yojanaein</h1>
            </div>

            <div className="px-5 pt-6 space-y-5">
                <p className="text-slate-400 text-base">Aapke liye government ki free schemes:</p>
                {schemes.map((s, i) => (
                    <div key={i} className={`border rounded-2xl overflow-hidden ${s.color} transition-all duration-300`}>
                        <button
                            className="w-full p-5 text-left"
                            onClick={() => setExpanded(expanded === i ? null : i)}>
                            <div className="flex items-start gap-4">
                                <span className="text-4xl">{s.emoji}</span>
                                <div className="flex-1">
                                    <h3 className="text-white font-extrabold text-xl leading-tight">{s.name}</h3>
                                    <p className="text-emerald-400 font-bold text-base mt-1">{s.benefit}</p>
                                    <p className="text-slate-400 text-base mt-1">{s.description}</p>
                                </div>
                                <span className="text-slate-400 text-2xl">{expanded === i ? '▲' : '▼'}</span>
                            </div>
                        </button>

                        {expanded === i && (
                            <div className="px-5 pb-5 border-t border-slate-700/30 pt-4 animate-fade-in">
                                <p className="text-slate-300 font-semibold mb-3 text-base">Kaise milega? ({s.steps.length} steps):</p>
                                <div className="space-y-2">
                                    {s.steps.map((step, si) => (
                                        <div key={si} className="flex items-start gap-3">
                                            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                                {si + 1}
                                            </span>
                                            <p className="text-slate-200 text-base">{step}</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg transition-all">
                                    Apply karo <ExternalLink size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
