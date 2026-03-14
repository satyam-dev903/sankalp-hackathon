import React, { useState, useRef, useEffect } from 'react'
import useAppStore from '../store/useAppStore'
import { Send, Mic, X, ChevronDown, ChevronUp, Loader2, Volume2, Square } from 'lucide-react'

const GEMINI_API_KEY = 'AIzaSyCZiUVg8VEvKGzDlH94MXA4xyDl8RMGlFY'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

function buildSystemPrompt(userType, user, analysis, roadmap) {
    const profile = user || { name: 'User', district: 'Jaipur', skills: ['Excel', 'Hindi Typing'] }
    const latestAnalysis = analysis || {}
    const roadmapStatus = roadmap || {}

    const context = JSON.stringify({ profile, latest_analysis: latestAnalysis, roadmap_status: roadmapStatus })

    if (userType === 'bluecollar') {
        return `Tu KaushalAI ka helper hai ${profile.name || 'User'} ke liye.
Profile: ${context}
Rules: Bilkul simple Hindi. 3 sentences max. Koi English nahi except numbers.
Koi paid course nahi. Sirf PMKVY, MUDRA, Udyam jaise free resources batao.
Always warm aur helpful raho.`
    }

    if (userType === 'govt') {
        return `You are KaushalAI's policy AI for ${profile.name || 'Officer'}, District Collector of ${profile.district || 'Nagpur'}.
District data: ${context}
Rules: Data-driven. Cite specific numbers. Suggest concrete actions with costs. English only.
Be concise — 3-5 sentences max. Always actionable.`
    }

    return `You are KaushalAI's personal career counselor for ${profile.name || 'User'}.
Full context: ${context}
Rules: Always personalized. Never generic. Reference real skill names, real job titles, real schemes.
3-5 sentences unless more detail asked. Hindi if asked in Hindi, English if English.
Never suggest paid courses. Free resources only (SWAYAM, NPTEL, YouTube, Kaggle).`
}

const SUGGESTED_PROMPTS = {
    jobseeker: [
        'Mera score 42 kyun hai?',
        'Sabse pehle kya karoon?',
        'PMKVY mein kaise enroll karoon?',
        'Data Analyst banne mein kitna time lagega?',
    ],
    bluecollar: [
        'Mujhe kaunsa kaam milega?',
        'MUDRA loan ke liye kya chahiye?',
        'PMKVY mein kaise join karein?',
        'Business register kaise karein?',
    ],
    govt: [
        'CNC shortage kyun badh rahi hai?',
        'Best performing center kaun sa hai?',
        'PMKVY budget justify karein?',
        'Is quarter ki forecast batao',
    ],
}

export default function AIChatPanel({ userType = 'jobseeker', isOpen, onClose }) {
    const { profile, analysis, roadmap, chatHistory, addChatMessage } = useAppStore()
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [contextExpanded, setContextExpanded] = useState(false)
    const messagesEndRef = useRef(null)
    const recognitionRef = useRef(null)
    const [listening, setListening] = useState(false)
    const [speakingId, setSpeakingId] = useState(null)

    const themeColor = userType === 'bluecollar' ? 'emerald' : userType === 'govt' ? 'purple' : 'blue'
    const headerTitle = userType === 'bluecollar' ? '🤖 Aapka Salahkar' : userType === 'govt' ? '🤖 AI Policy Assistant' : '🤖 KaushalAI Salahkar'

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory, loading])

    const sendMessage = async (text) => {
        if (!text.trim() || loading) return
        const userMsg = { role: 'user', content: text, time: Date.now() }
        addChatMessage(userMsg)
        setInput('')
        setLoading(true)

        try {
            const systemPrompt = buildSystemPrompt(userType, profile, analysis, roadmap)
            const history = chatHistory.slice(-8)

            let validContents = []
            for (let msg of history) {
                const apiRole = msg.role === 'user' ? 'user' : 'model'
                if (validContents.length > 0 && validContents[validContents.length - 1].role === apiRole) {
                    validContents[validContents.length - 1].parts[0].text += '\\n' + msg.content
                } else {
                    validContents.push({ role: apiRole, parts: [{ text: msg.content }] })
                }
            }
            if (validContents.length > 0 && validContents[validContents.length - 1].role === 'user') {
                validContents[validContents.length - 1].parts[0].text += '\\n' + text
            } else {
                validContents.push({ role: 'user', parts: [{ text: text }] })
            }

            const res = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemPrompt }] },
                    contents: validContents,
                    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                console.error("Gemini API Error Payload:", data)
                throw new Error("Gemini API Error: " + (data.error?.message || res.statusText))
            }
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maafi chahta hoon, kuch gadbad ho gayi. Please dobara try karein.'
            addChatMessage({ role: 'assistant', content: reply, time: Date.now() })
        } catch (e) {
            console.error("Chat panel error:", e)
            addChatMessage({ role: 'assistant', content: 'Network error. Please check your connection. (' + e.message + ')', time: Date.now() })
        }
        setLoading(false)
    }

    const startVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert('Voice input not supported in this browser.')
            return
        }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SR()
        recognitionRef.current.lang = 'hi-IN'
        recognitionRef.current.onresult = (e) => {
            setInput(e.results[0][0].transcript)
            setListening(false)
        }
        recognitionRef.current.onerror = () => setListening(false)
        recognitionRef.current.onend = () => setListening(false)
        recognitionRef.current.start()
        setListening(true)
    }

    const toggleSpeech = (text, id) => {
        if (speakingId === id) {
            window.speechSynthesis.cancel()
            setSpeakingId(null)
        } else {
            window.speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = 'hi-IN'
            utterance.rate = 0.9
            utterance.onend = () => setSpeakingId(null)
            utterance.onerror = () => setSpeakingId(null)
            window.speechSynthesis.speak(utterance)
            setSpeakingId(id)
        }
    }

    const [showHistory, setShowHistory] = useState(false)

    if (!isOpen) return null

    const mockHistory = [
        { id: 'h1', title: 'Resume Review', date: 'March 12' },
        { id: 'h2', title: 'PMKVY Enrollment Help', date: 'March 10' },
        { id: 'h3', title: 'Salary Negotiation Advice', date: 'March 05' },
    ]

    const borderClasses = {
        blue: 'border-blue-600/30',
        emerald: 'border-emerald-600/30',
        purple: 'border-purple-600/30',
    }
    const bgClasses = {
        blue: 'bg-blue-600',
        emerald: 'bg-emerald-600',
        purple: 'bg-purple-700',
    }
    const userBubbleClass = bgClasses[themeColor]

    return (
        <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-slate-900 border-l ${borderClasses[themeColor]} z-50 flex flex-col shadow-2xl animate-slide-in-right`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/80`}>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setShowHistory(!showHistory)}
                        className={`p-1.5 rounded-lg transition-all ${showHistory ? 'bg-purple-600/20 text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
                        title="Chat History"
                    >
                        <Clock size={18} />
                    </button>
                    <div>
                        <h3 className="font-semibold text-white text-sm">{headerTitle}</h3>
                        {profile && <p className="text-xs text-slate-400">
                            {profile.name || 'Raju Sharma'} · {profile.district || 'Jaipur'}
                            <span className="text-xs text-emerald-500/60 ml-2">● Online</span>
                        </p>}
                    </div>
                </div>
                <div className="flex items-center">
                    <button 
                        onClick={() => { useAppStore.getState().clearChat() }}
                        className="text-xs text-slate-500 hover:text-red-400 transition-colors mr-2 font-bold uppercase tracking-wider"
                    >
                        Clear
                    </button>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
                        <X size={18} />
                    </button>
                </div>
            </div>

            {showHistory ? (
                /* History List View */
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Previous Sessions</h4>
                    {mockHistory.map(item => (
                        <div key={item.id} className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:border-purple-500/30 hover:bg-slate-800 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{item.title}</p>
                                <span className="text-[10px] text-slate-600">{item.date}</span>
                            </div>
                            <p className="text-xs text-slate-500">Summary: Personalized roadmap discussed...</p>
                        </div>
                    ))}
                    <div className="p-8 text-center">
                        <p className="text-xs text-slate-600 italic">End of history</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Context bar */}
                    {userType === 'jobseeker' && (
                        <div className="p-3 border-b border-slate-700/30 bg-slate-800/40">
                            <button className="text-xs text-slate-400 flex items-center gap-1 font-bold" onClick={() => setContextExpanded(!contextExpanded)}>
                                CONTEXT {contextExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                            {contextExpanded && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="text-xs bg-orange-500/20 border border-orange-500/30 text-orange-400 px-2 py-1.5 rounded-xl cursor-not-allowed"
                                        title="Analysis data linked">
                                        ❤️ Health: 42
                                    </span>
                                    <span className="text-xs bg-blue-500/20 border border-blue-500/30 text-blue-400 px-2 py-1.5 rounded-xl cursor-not-allowed"
                                        title="Roadmap data linked">
                                        📚 Progress: 18%
                                    </span>
                                    <span className="text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2 py-1.5 rounded-xl cursor-not-allowed"
                                        title="Job matching active">
                                        💼 Match: 85%
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {chatHistory.length === 0 && (
                            <div className="space-y-4">
                                <div className="chat-bubble-ai animate-fade-in border-l-2 border-purple-500">
                                    {userType === 'bluecollar'
                                        ? '🙏 Namaste! Main aapki madad ke liye hoon. Kya poochna chahte ho?'
                                        : userType === 'govt'
                                            ? '👋 Welcome back, Ramesh ji. I have analyzed the latest Nagpur district anomalies. How can I assist with policy intervention?'
                                            : `👋 Namaste! I'm your AI counselor. I've synced your Excel skills and Data Analyst goals from Jaipur. How can we move your roadmap forward?`}
                                </div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-8 mb-2">Suggested Queries</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {(SUGGESTED_PROMPTS[userType] || SUGGESTED_PROMPTS.jobseeker).map((prompt, i) => (
                                        <button key={i}
                                            onClick={() => sendMessage(prompt)}
                                            className="text-xs text-left p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/40 text-slate-300 transition-all duration-200 flex justify-between items-center group">
                                            {prompt}
                                            <ChevronDown size={14} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                {msg.role === 'assistant' ? (
                                    <div className="flex flex-col items-start gap-1 max-w-[90%]">
                                        <div className="chat-bubble-ai whitespace-pre-wrap relative group pr-4 leading-relaxed font-medium">
                                            {msg.content}
                                            <div className="flex justify-end mt-4 pt-2 border-t border-white/5">
                                                <button
                                                    onClick={() => toggleSpeech(msg.content, i)}
                                                    className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-purple-600/30 text-slate-400 hover:text-purple-300 transition-all flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    {speakingId === i ? <><Square size={10} /> Stop</> : <><Volume2 size={10} /> Hear</>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`${userBubbleClass} rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] text-sm font-bold shadow-lg shadow-black/20`}>{msg.content}</div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="chat-bubble-ai flex items-center gap-2 px-6">
                                    <div className="typing-dot bg-purple-500"></div>
                                    <div className="typing-dot bg-indigo-500"></div>
                                    <div className="typing-dot bg-blue-500"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </>
            )}

            {/* Input bar */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-900 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                            placeholder={userType === 'bluecollar' ? 'Sawaal poochhein...' : 'Ask your AI counselor...'}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-4 pr-12 py-3.5 text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all"
                        />
                        <button onClick={startVoice}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${listening ? 'text-red-500 animate-pulse' : 'text-slate-500 hover:text-white'}`}>
                            <Mic size={18} />
                        </button>
                    </div>
                    <button onClick={() => sendMessage(input)} disabled={loading || !input.trim() || showHistory}
                        className={`p-3.5 rounded-xl ${bgClasses[themeColor]} text-white disabled:opacity-40 transition-all hover:scale-105 shadow-lg shadow-purple-900/20`}>
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </button>
                </div>
                <p className="text-[9px] text-center text-slate-600 mt-3 font-bold uppercase tracking-[0.1em]">
                    Powered by KaushalAI Intelligence Server
                </p>
            </div>
        </div>
    )
}

