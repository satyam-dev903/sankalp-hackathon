import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import { Landmark, ShieldCheck, ArrowRight, Lock, User } from 'lucide-react'

export default function GovtLogin() {
    const navigate = useNavigate()
    const { setUser, setCategory } = useAppStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Cinematic delay
        setTimeout(() => {
            setUser({ 
                name: 'Ramesh IAS', 
                district: 'Nagpur', 
                role: 'collector', 
                email 
            })
            setCategory('govt')
            navigate('/govt/dashboard')
        }, 1200)
    }

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-3xl shadow-2xl shadow-purple-500/20 mb-4 border border-white/10">
                        <Landmark className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">KaushalAI</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <ShieldCheck size={14} className="text-purple-400" />
                        <p className="text-purple-400 text-xs font-black uppercase tracking-widest">Secure Government Portal</p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="glass-card p-10 border-white/5 bg-slate-900/40 backdrop-blur-2xl">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Officer Sign-in</h2>
                        <p className="text-slate-400 text-sm font-medium">Please enter your government credentials to access the district intelligence suite.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Official Email</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                    <User size={18} />
                                </span>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@nagpur.gov.in" 
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-600 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                    <Lock size={18} />
                                </span>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-600 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Access Command Center <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col items-center gap-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] text-center">
                            Authorized Access Only · IP Logged
                        </p>
                        <div className="flex gap-4 opacity-40 grayscale h-6">
                            {/* Mocking department logos/stamps */}
                            <div className="w-8 h-8 rounded bg-slate-700" />
                            <div className="w-8 h-8 rounded bg-slate-700" />
                            <div className="w-8 h-8 rounded bg-slate-700" />
                        </div>
                    </div>
                </div>
                
                <p className="text-center mt-8 text-slate-500 text-xs font-medium">
                    Technical issues? Contact <span className="text-purple-400 hover:underline cursor-pointer">State Data Center</span>
                </p>
            </div>
        </div>
    )
}
