import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, MapPin, Briefcase, ChevronLeft } from 'lucide-react'

const jobs = [
    { id: 1, title: 'Factory Helper', company: 'Shreeji Industries', location: 'Patna', salary: '₹12,000/mo', distance: '2.3 km', walkin: false, type: 'Mazdoor' },
    { id: 2, title: 'Cleaning Staff', company: 'City Hospital', location: 'Patna', salary: '₹9,500/mo', distance: '4.1 km', walkin: true, walkinDate: 'Kal aao (Mangalwar)', type: 'Safai' },
    { id: 3, title: 'Security Guard', company: 'SafeGuard Pvt Ltd', location: 'Patna', salary: '₹11,000/mo', distance: '1.8 km', walkin: false, type: 'Security' },
    { id: 4, title: 'Packaging Worker', company: 'Bihar Foods Ltd', location: 'Patna', salary: '₹10,500/mo', distance: '3.2 km', walkin: true, walkinDate: 'Shaniwar aao', type: 'Mazdoor' },
    { id: 5, title: 'Home Cook', company: 'Family, Sector 7', location: 'Patna', salary: '₹8,000/mo', distance: '0.9 km', walkin: false, type: 'Rasoi' },
]

export default function BCJobs() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [listening, setListening] = useState(false)

    const filtered = jobs.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.type.toLowerCase().includes(search.toLowerCase())
    )

    const startVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        const rec = new SR()
        rec.lang = 'hi-IN'
        rec.onresult = (e) => { setSearch(e.results[0][0].transcript); setListening(false) }
        rec.onerror = () => setListening(false)
        rec.onend = () => setListening(false)
        rec.start()
        setListening(true)
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pb-8" style={{ fontSize: 18 }}>
            <div className="bg-slate-800/60 border-b border-slate-700/50 px-5 py-4 flex items-center gap-3">
                <button onClick={() => navigate('/simple/dashboard')} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                    <ChevronLeft size={22} />
                </button>
                <h1 className="font-bold text-white text-xl">💼 Kaam Dhundo</h1>
            </div>

            <div className="px-5 pt-6 pb-4">
                <p className="text-slate-400 mb-4 text-base">Aap kaun sa kaam dhundhte hain?</p>
                <div className="flex gap-3">
                    <div className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-2xl flex items-center px-4 gap-3">
                        <Briefcase size={20} className="text-slate-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Kaam ka naam likho..."
                            className="flex-1 bg-transparent py-4 text-white placeholder-slate-500 text-base focus:outline-none"
                            style={{ fontSize: 18 }}
                        />
                    </div>
                    <button onClick={startVoice}
                        className={`px-5 rounded-2xl font-bold text-white min-h-[60px] transition-all ${listening ? 'bg-red-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                        <Mic size={26} />
                    </button>
                </div>
            </div>

            <div className="px-5 space-y-4">
                {filtered.map(job => (
                    <div key={job.id} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 space-y-3">
                        {job.walkin && (
                            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-bold px-3 py-1.5 rounded-xl">
                                🚶 Walk-in — {job.walkinDate}
                            </div>
                        )}
                        <div>
                            <h3 className="text-white font-bold text-xl leading-tight">{job.title}</h3>
                            <p className="text-slate-400 text-base mt-1">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-4 text-base">
                            <span className="text-emerald-400 font-bold text-lg">{job.salary}</span>
                            <span className="flex items-center gap-1 text-slate-400">
                                <MapPin size={16} /> {job.distance} door
                            </span>
                        </div>
                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-105 active:scale-95">
                            ✅ Apply karo
                        </button>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-500">
                        <p className="text-4xl mb-3">🔍</p>
                        <p className="text-lg">Koi kaam nahi mila. Kuch aur try karein.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
