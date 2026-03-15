import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    Mic, 
    StopCircle, 
    X, 
    Play, 
    MessageSquare,
    Zap,
    TrendingUp,
    Volume2,
    CheckCircle2,
    ArrowRight
} from 'lucide-react'

const MOCK_TRANSCRIPT = [
    { sender: 'AI', text: "Hello! I'm your AI interviewer. Today we'll focus on your Data Analyst role. Tell me, how do you handle large datasets in Excel?" },
    { sender: 'User', text: "I use VLOOKUPs and pivot tables to summarize findings and then create charts for the stakeholders to see the trends clearly." },
    { sender: 'AI', text: "Good. How would you handle a situation where the data has missing values or inconsistent formatting?" }
]

const FEEDBACK_SCORES = [
    { label: "Confidence", score: 72, color: "bg-blue-500" },
    { label: "Technical Precision", score: 65, color: "bg-emerald-500" },
    { label: "Clarity", score: 88, color: "bg-purple-500" }
]

export default function JSInterview() {
    const navigate = useNavigate()
    const { 
        chatOpen, setChatOpen, 
        profile, 
        interviewTranscript, setInterviewTranscript,
        fetchInterviewResponse 
    } = useAppStore()
    
    const [status, setStatus] = useState('lobby') // lobby, active, feedback
    const [isRecording, setIsRecording] = useState(false)
    const [voiceWave, setVoiceWave] = useState(Array(20).fill(5))
    const [inputValue, setInputValue] = useState('')
    const timerRef = useRef()

    const role = profile?.skills?.length > 0 ? profile.skills[0] : "Data Analyst";

    // Simulate voice recording animation
    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setVoiceWave(prev => prev.map(() => Math.floor(Math.random() * 40) + 10))
            }, 100)
        } else {
            clearInterval(timerRef.current)
            setVoiceWave(Array(20).fill(5))
        }
        return () => clearInterval(timerRef.current)
    }, [isRecording])

    const startInterview = async () => {
        setInterviewTranscript([])
        setStatus('active')
        await fetchInterviewResponse(role, "Hello, start the interview.", [])
    }

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return
        const userMsg = { role: 'user', content: inputValue }
        setInterviewTranscript([...interviewTranscript, userMsg])
        setInputValue('')
        await fetchInterviewResponse(role, inputValue, [...interviewTranscript, userMsg])
    }

    const finishInterview = async () => {
        setStatus('feedback')
        await fetchInterviewResponse(role, "Provide feedback for this interview.", interviewTranscript, 'feedback')
    }

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100 relative">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none">
                <div className="max-w-4xl mx-auto pb-32 mt-14 lg:mt-0">
                    
                    {status === 'lobby' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-2xl mx-auto py-12 text-center">
                            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                                <Mic size={40} className="text-blue-400" />
                                <div className="absolute inset-0 rounded-full border border-blue-500/40 animate-ping opacity-20"></div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">AI Mock Interview</h1>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                    Our AI will conduct a realistic interview for your <strong className="text-white">{role}</strong> path. Get real-time feedback on your voice, confidence, and context.
                                </p>
                            </div>
                            
                            <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl text-left space-y-4">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">How it works</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Voice-first interaction (text enabled)",
                                        "Tailored professional questions",
                                        "Detailed performance scorecard at the end"
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                                <CheckCircle2 size={12} strokeWidth={3} />
                                            </div>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                onClick={startInterview}
                                className="w-full btn-blue py-4 text-lg font-black shadow-xl shadow-blue-500/25 flex justify-center items-center gap-2 group"
                            >
                                Start Interview Session <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {status === 'active' && (
                        <div className="space-y-8 animate-in zoom-in-95 duration-500 h-[calc(100vh-180px)] flex flex-col">
                            {/* Interview Header */}
                            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <h3 className="font-bold text-white tracking-tight">Session Live: {role} Role</h3>
                                </div>
                                <button onClick={() => setStatus('lobby')} className="text-slate-500 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Dialogue Area */}
                            <div className="flex-1 overflow-y-auto space-y-6 pr-4 focus:outline-none custom-scrollbar">
                                {interviewTranscript.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
                                        <div className={`max-w-[80%] p-4 rounded-2xl ${
                                            msg.role === 'assistant' 
                                            ? 'bg-slate-800 border-l-4 border-l-blue-500 text-slate-200' 
                                            : 'bg-blue-600 text-white shadow-lg'
                                        }`}>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                                    {msg.role === 'assistant' ? 'AI Interviewer' : 'You'}
                                                </span>
                                                {msg.role === 'assistant' && <Volume2 size={12} className="text-blue-400" />}
                                            </div>
                                            <p className="text-sm font-semibold leading-relaxed">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="flex gap-4 mb-4">
                                <input 
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your response..."
                                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                                />
                                <button 
                                    onClick={handleSendMessage}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl font-bold transition-all"
                                >
                                    Send
                                </button>
                            </div>

                            {/* Voice Control Bar */}
                            <div className="bg-slate-900/80 backdrop-blur-3xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="flex-1 flex items-center justify-center gap-1 h-12">
                                        {voiceWave.map((h, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-1 rounded-full transition-all duration-100 ${isRecording ? 'bg-blue-500' : 'bg-slate-700 opacity-30'}`}
                                                style={{ height: `${h}%` }}
                                            />
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => setIsRecording(!isRecording)}
                                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                                            isRecording 
                                            ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/40 animate-pulse' 
                                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/40'
                                        }`}
                                    >
                                        {isRecording ? <StopCircle size={36} strokeWidth={2.5} /> : <Mic size={36} strokeWidth={2.5} />}
                                    </button>

                                    <div className="flex-1 flex justify-center">
                                        <button 
                                            onClick={finishInterview}
                                            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-sm transition-all"
                                        >
                                            End Interview
                                        </button>
                                    </div>
                                </div>
                                {isRecording && (
                                    <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
                                )}
                            </div>
                        </div>
                    )}

                    {status === 'feedback' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-top-6 duration-700">
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Interview Performance</h2>
                                <p className="text-slate-400 font-medium">Detailed feedback from your mock session.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { label: 'Confidence', score: 85 },
                                    { label: 'Clarity', score: 78 },
                                    { label: 'Tech Skill', score: 92 }
                                ].map((item, idx) => (
                                    <div key={item.label} className="glass-card p-6 flex flex-col items-center text-center">
                                        <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="48" cy="48" r="42" stroke="#1E293B" strokeWidth="6" fill="transparent" />
                                                <circle 
                                                    cx="48" cy="48" r="42" 
                                                    stroke="currentColor" 
                                                    strokeWidth="6" 
                                                    fill="transparent" 
                                                    strokeDasharray={264}
                                                    strokeDashoffset={264 - (264 * item.score) / 100}
                                                    className={`${item.label === 'Confidence' ? 'text-blue-500' : item.label === 'Clarity' ? 'text-purple-500' : 'text-emerald-500'} transition-all duration-[1.5s] ease-out`}
                                                />
                                            </svg>
                                            <span className="absolute text-xl font-black text-white">{item.score}%</span>
                                        </div>
                                        <h4 className="font-bold text-slate-300">{item.label}</h4>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-card p-8">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <MessageSquare size={20} className="text-blue-400" /> AI Insights
                                </h3>
                                <div className="space-y-6">
                                    <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-xl">
                                        <h4 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2"><Zap size={14} /> Comprehensive Review</h4>
                                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                            {interviewTranscript[interviewTranscript.length - 1]?.content || "Your performance was commendable. Focus on articulation during technical deep-dives."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button 
                                    onClick={() => navigate('/roadmap')}
                                    className="flex-1 btn-blue py-4 font-black shadow-lg"
                                >
                                    Improve via Learning Roadmap
                                </button>
                                <button 
                                    onClick={() => setStatus('lobby')}
                                    className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all"
                                >
                                    Restart Interview
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
