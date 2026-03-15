import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import { Mic, Volume2, CheckCircle, ArrowRight, Phone } from 'lucide-react'

const STEPS = [
    {
        question: 'Aap kya kaam karte ho?',
        questionEn: 'What is your work?',
        field: 'kaam',
        options: [
            { img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', label: 'Mazdoor' },
            { img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80', label: 'Rasoi' },
            { img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80', label: 'Driver' },
            { img: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=400&q=80', label: 'Darzi' },
            { img: 'https://images.unsplash.com/photo-1581578731522-f83ed5bc2250?w=400&q=80', label: 'Safai' },
            { img: 'https://images.unsplash.com/photo-1534452203294-49c8913c60bd?w=400&q=80', label: 'Dukaan' },
            { img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400&q=80', label: 'Security' },
            { img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', label: 'Khet' },
            { img: 'https://images.unsplash.com/photo-1503387762-592dee58c460?w=400&q=80', label: 'Mistri' },
            { img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80', label: 'Painter' },
            { img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80', label: 'Ghar ka kaam' },
            { img: 'https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?w=400&q=80', label: 'Kuch aur' },
        ],
    },
    {
        question: 'Aap kahan rehte ho?',
        questionEn: 'Where do you live?',
        field: 'jagah',
        options: [
            { img: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&q=80', label: 'Rajasthan' },
            { img: 'https://images.unsplash.com/photo-1584824486516-0555a07fc511?w=400&q=80', label: 'Bihar' },
            { img: 'https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?w=400&q=80', label: 'UP' },
            { img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&q=80', label: 'Maharashtra' },
            { img: 'https://images.unsplash.com/photo-1594913785162-e67894101a0a?w=400&q=80', label: 'MP' },
            { img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80', label: 'Gujarat' },
            { img: 'https://images.unsplash.com/photo-1589135010620-307521197931?w=400&q=80', label: 'Jharkhand' },
            { img: 'https://images.unsplash.com/photo-1558431382-27e30d148b67?w=400&q=80', label: 'WB' },
            { img: 'https://images.unsplash.com/photo-1587474260584-1f39e4caec7d?w=400&q=80', label: 'Delhi' },
            { img: 'https://images.unsplash.com/photo-1561081519-86927d2c3848?w=400&q=80', label: 'Punjab' },
            { img: 'https://images.unsplash.com/photo-1594939223168-348b68831e5f?w=400&q=80', label: 'Odisha' },
            { img: 'https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?w=400&q=80', label: 'Koi aur' },
        ],
    },
    {
        question: 'Mahine mein kitna kamate ho?',
        questionEn: 'Monthly income?',
        field: 'kamaai',
        options: [
            { img: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80', label: '₹0–5K' },
            { img: 'https://images.unsplash.com/photo-1554224155-169745fe9a5d?w=400&q=80', label: '₹5–8K' },
            { img: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80', label: '₹8–12K' },
            { img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&q=80', label: '₹12–18K' },
            { img: 'https://images.unsplash.com/photo-1579621970795-87f9ac75d651?w=400&q=80', label: '₹18–25K' },
            { img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80', label: '₹25K+' },
        ],
    },
    {
        question: 'Aapki padhai kitni hui hai?',
        questionEn: 'Education level?',
        field: 'padhai',
        options: [
            { img: 'https://images.unsplash.com/photo-1497633762265-9a177c8098a2?w=400&q=80', label: 'Padha nahi' },
            { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80', label: '5th Class' },
            { img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80', label: '8th Class' },
            { img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80', label: '10th Pass' },
            { img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80', label: '12th Pass' },
            { img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80', label: 'ITI/Diploma' },
        ],
    },
    {
        question: 'Aap kya karna chahte ho?',
        questionEn: 'What is your goal?',
        field: 'sapna',
        options: [
            { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', label: 'Naukri chahiye' },
            { img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&q=80', label: 'Business shuru' },
            { img: 'https://images.unsplash.com/photo-1589758438368-0ad531955287?w=400&q=80', label: 'Paisa badhao' },
            { img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80', label: 'Shehar mein kaam' },
            { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80', label: 'Online becho' },
            { img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80', label: 'Kuch seekhna' },
        ],
    },
]

const SCHEME_RESULTS = {
    'Naukri chahiye': [
        { name: 'PMKVY', desc: 'Free skill training + ₹8,000 stipend' },
        { name: 'NAPS', desc: 'Apprenticeship with stipend support' },
    ],
    'Business shuru': [
        { name: 'MUDRA Loan', desc: '₹50,000 tak ka loan, koi guarantee nahi' },
        { name: 'Udyam Registration', desc: 'Free MSME registration online' },
        { name: 'PM SVANidhi', desc: '₹10,000 working capital loan' },
    ],
    'Paisa badhao': [
        { name: 'PMKVY Skill Upgrade', desc: 'Apni skill badhaao, income badhao' },
        { name: 'e-Shram Registration', desc: 'Free insurance ₹2L + identity card' },
    ],
    'Shehar mein kaam': [
        { name: 'DDU-GKY', desc: 'Free training + hostel + placement' },
        { name: 'PMKVY', desc: 'Skill training + job placement' },
    ],
    'Online becho': [
        { name: 'ONDC Seller', desc: 'Online apnan saman becho — free' },
        { name: 'Udyam Registration', desc: 'Business registered karao — free' },
    ],
    'Kuch seekhna': [
        { name: 'PMKVY', desc: 'Government free skill courses' },
        { name: 'SWAYAM', desc: 'Free online courses in Hindi' },
    ],
}

function CircularProgress({ percent }) {
    const r = 42
    const circ = 2 * Math.PI * r
    const offset = circ - (percent / 100) * circ
    return (
        <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={r} fill="none" stroke="#1E293B" strokeWidth="8" />
            <circle
                cx="50" cy="50" r={r} fill="none"
                stroke="#059669" strokeWidth="8"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="progress-ring-circle"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
            <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14" fontWeight="bold">
                {Math.round(percent)}%
            </text>
        </svg>
    )
}

export default function BCOnboarding() {
    const navigate = useNavigate()
    const { setProfile, setCategory } = useAppStore()
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [messages, setMessages] = useState([
        { role: 'ai', text: `Namaste! 🙏 Main aapki profile banaoonga. Sirf tasveer tap karo!\n\n${STEPS[0].question}` }
    ])
    const [showResults, setShowResults] = useState(false)
    const [showPhoneInput, setShowPhoneInput] = useState(false)
    const [phone, setPhone] = useState('')
    const [customInput, setCustomInput] = useState('')
    const [listening, setListening] = useState(false)
    const recognitionRef = useRef(null)

    const handleSelect = (option) => {
        if (option.label === 'Kuch aur') {
            // handled by inline input
            return
        }
        const newAnswers = { ...answers, [STEPS[currentStep].field]: option.label }
        setAnswers(newAnswers)
        setMessages(prev => [...prev, { role: 'user', text: `${option.emoji} ${option.label}` }])

        if (currentStep < STEPS.length - 1) {
            setTimeout(() => {
                const nextStep = currentStep + 1
                setCurrentStep(nextStep)
                setMessages(prev => [...prev, { role: 'ai', text: STEPS[nextStep].question }])
            }, 400)
        } else {
            // Done!
            setTimeout(() => {
                showFinalResults(newAnswers)
            }, 600)
        }
    }

    const showFinalResults = (finalAnswers) => {
        const schemeKey = finalAnswers.sapna || 'Naukri chahiye'
        const schemes = SCHEME_RESULTS[schemeKey] || SCHEME_RESULTS['Naukri chahiye']
        const schemeText = schemes.map(s => `✅ ${s.name} — ${s.desc}`).join('\n')
        setMessages(prev => [
            ...prev,
            {
                role: 'ai',
                text: `🎉 Bahut badhiya! Aapke sapne "${finalAnswers.sapna}" ke liye yeh yojanaein milti hain:\n\n${schemeText}\n\n👇 Neeche apna number save karo taaki dobara aa sako!`,
            },
        ])
        setShowResults(true)
    }

    const speakQuestion = () => {
        if (!('speechSynthesis' in window)) return
        const step = STEPS[currentStep]
        const utter = new SpeechSynthesisUtterance(step.question)
        utter.lang = 'hi-IN'
        utter.rate = 0.9
        window.speechSynthesis.speak(utter)
    }

    const startVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert('Voice not supported')
            return
        }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SR()
        recognitionRef.current.lang = 'hi-IN'
        recognitionRef.current.onresult = (e) => {
            setCustomInput(e.results[0][0].transcript)
            setListening(false)
        }
        recognitionRef.current.onerror = () => setListening(false)
        recognitionRef.current.onend = () => setListening(false)
        recognitionRef.current.start()
        setListening(true)
    }

    const handleCustomSubmit = () => {
        if (!customInput.trim()) return
        const newAnswers = { ...answers, [STEPS[currentStep].field]: customInput }
        setAnswers(newAnswers)
        setMessages(prev => [...prev, { role: 'user', text: `✏️ ${customInput}` }])
        setCustomInput('')

        if (currentStep < STEPS.length - 1) {
            setTimeout(() => {
                const nextStep = currentStep + 1
                setCurrentStep(nextStep)
                setMessages(prev => [...prev, { role: 'ai', text: STEPS[nextStep].question }])
            }, 400)
        } else {
            setTimeout(() => {
                showFinalResults(newAnswers)
            }, 600)
        }
    }

    const handleContinue = () => {
        setCategory('bluecollar')
        setProfile({ name: 'Savitri Devi', ...answers, userType: 'bluecollar' })
        navigate('/simple/dashboard')
    }

    const progress = (Object.keys(answers).length / STEPS.length) * 100
    const currentStepData = STEPS[currentStep]
    const cols = currentStep <= 1 ? 4 : 3

    return (
        <div className="min-h-screen bg-[#0F172A] flex" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* LEFT — Conversation */}
            <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg">⚡</div>
                    <div>
                        <h1 className="text-white font-bold text-lg leading-none">KaushalAI</h1>
                        <p className="text-emerald-400 text-xs">Profile Builder</p>
                    </div>
                    <div className="ml-auto bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-400">
                        Step {Math.min(currentStep + 1, 5)}/5
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 mb-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                            {msg.role === 'ai' ? (
                                <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm p-4 max-w-sm">
                                    <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-semibold">
                                        🤖 KaushalAI Bot
                                    </div>
                                    <p className="text-white text-base whitespace-pre-line leading-relaxed">{msg.text}</p>
                                </div>
                            ) : (
                                <div className="bg-emerald-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs text-white text-base font-medium">
                                    {msg.text}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Input area */}
                {!showResults && (
                    <>
                        {/* Voice/Listen buttons */}
                        <div className="flex gap-2 mb-4">
                            <button onClick={speakQuestion}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700/60 border border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-medium">
                                <Volume2 size={16} className="text-emerald-400" />
                                🔊 Sawaal sunaiye
                            </button>
                            <button onClick={startVoice}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${listening ? 'bg-red-500 border-red-500 text-white animate-pulse' : 'bg-slate-700/60 border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700'}`}>
                                <Mic size={16} />
                                {listening ? 'Sun raha hoon...' : 'Bol ke batao'}
                            </button>
                        </div>

                        {/* Picture Grid */}
                        <div className={`grid gap-3 mb-6`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                            {currentStepData.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(opt)}
                                    className="picture-card group">
                                    <img src={opt.img} alt={opt.label} />
                                    <span className="label-overlay">{opt.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Custom text input & Navigation */}
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={customInput}
                                    onChange={e => setCustomInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleCustomSubmit()}
                                    placeholder="Ya type karein..."
                                    className="flex-1 bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                                />
                                <button onClick={handleCustomSubmit} disabled={!customInput.trim()}
                                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/20 disabled:opacity-40 transition-all">
                                    ✓
                                </button>
                            </div>

                            {currentStep > 0 && (
                                <button 
                                    onClick={() => {
                                        const prevStep = currentStep - 1
                                        setCurrentStep(prevStep)
                                        // Remove the last two messages (user response and prev AI question) to maintain flow
                                        setMessages(prev => prev.slice(0, -2))
                                        // Reset answers for the current step
                                        const newAnswers = { ...answers }
                                        delete newAnswers[STEPS[currentStep].field]
                                        setAnswers(newAnswers)
                                    }}
                                    className="w-fit text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 flex items-center gap-1 transition-colors"
                                >
                                    ← Piche chalo (Back)
                                </button>
                            )}
                        </div>
                    </>
                )}

                {/* Results actions */}
                {showResults && (
                    <div className="space-y-3 mt-2">
                        {!showPhoneInput ? (
                            <>
                                <button onClick={handleContinue}
                                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all hover:scale-105">
                                    💼 Kaam Dhundo <ArrowRight size={16} />
                                </button>
                                <button onClick={() => navigate('/simple/schemes')}
                                    className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all">
                                    🏛️ Yojana Dekho
                                </button>
                                <button onClick={() => setShowPhoneInput(true)}
                                    className="w-full text-emerald-400 hover:text-emerald-300 text-sm text-center py-2 underline underline-offset-2 transition-colors">
                                    📱 Apna number save karein taaki wapas aa sakein
                                </button>
                                <button onClick={handleContinue}
                                    className="w-full text-slate-500 hover:text-slate-400 text-sm text-center py-1 transition-colors">
                                    Abhi nahi →
                                </button>
                            </>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-slate-300 text-sm">📱 Apna mobile number dalein:</p>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="e.g. 9876543210"
                                    className="w-full bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-emerald-500"
                                />
                                <button onClick={handleContinue}
                                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all">
                                    <Phone size={16} /> Number Save karo & Dashboard dekho
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* RIGHT — Live Profile Card */}
            <div className="hidden md:flex w-72 bg-slate-900/80 border-l border-slate-700/50 flex-col items-center p-6 gap-6">
                <div className="text-center">
                    <CircularProgress percent={progress} />
                    <p className="text-emerald-400 font-semibold text-sm mt-2">Aapki Profile</p>
                    <p className="text-slate-500 text-xs">{5 - Object.keys(answers).length} sawaal bache hain</p>
                </div>

                <div className="w-full space-y-3">
                    {STEPS.map((step, i) => {
                        const value = answers[step.field]
                        return (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${value ? 'border-emerald-500/40 bg-emerald-900/20 animate-fade-in' : 'border-slate-700/30 bg-slate-800/30'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${value ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-500'}`}>
                                    {value ? <CheckCircle size={14} /> : <span className="text-xs">{i + 1}</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-500">{step.field.charAt(0).toUpperCase() + step.field.slice(1)}</p>
                                    <p className={`text-sm font-semibold truncate ${value ? 'text-white' : 'text-slate-600'}`}>
                                        {value || '—'}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {progress === 100 && (
                    <div className="text-center text-emerald-400 font-bold text-sm animate-bounce">
                        🎉 Profile tayyar!
                    </div>
                )}
            </div>
        </div>
    )
}
