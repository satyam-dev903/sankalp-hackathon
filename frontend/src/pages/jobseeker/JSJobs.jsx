import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'
import Sidebar from '../../components/Sidebar'
import AIChatPanel from '../../components/AIChatPanel'
import { 
    Search,
    MapPin,
    Briefcase,
    IndianRupee,
    Bookmark,
    ExternalLink,
    Zap,
    Filter
} from 'lucide-react'

const MOCK_JOBS = [
    {
        id: 1,
        company: "TechSolutions India",
        initial: "TS",
        bg: "bg-blue-600",
        posted: "2 hours ago",
        role: "Data Analyst",
        location: "Jaipur, Rajasthan (Hybrid)",
        salary: "₹4,00,000 - ₹6,00,000",
        match: 92,
        skills: ["SQL", "Excel", "Python"],
        urgent: true,
        type: "private"
    },
    {
        id: 2,
        company: "State Planning Department",
        initial: "SP",
        bg: "bg-emerald-600",
        posted: "1 day ago",
        role: "MIS Executive",
        location: "Lucknow, UP",
        salary: "₹3,50,000 - ₹4,50,000",
        match: 85,
        skills: ["Excel", "Data Entry", "Reporting"],
        urgent: false,
        type: "government"
    },
    {
        id: 3,
        company: "GlobalRetail Analytics",
        initial: "GR",
        bg: "bg-purple-600",
        posted: "3 days ago",
        role: "Junior Data Scientist",
        location: "Remote",
        salary: "₹6,00,000 - ₹8,00,000",
        match: 78,
        skills: ["Python", "Machine Learning", "SQL"],
        urgent: false,
        type: "remote"
    },
    {
        id: 4,
        company: "Rajasthan Skill Mission",
        initial: "RS",
        bg: "bg-orange-600",
        posted: "5 hours ago",
        role: "Project Coordinator (Data)",
        location: "Jaipur, Rajasthan",
        salary: "₹4,20,000 Fixed",
        match: 88,
        skills: ["Project Management", "Excel"],
        urgent: true,
        type: "government"
    },
    {
        id: 5,
        company: "FinServe Corp",
        initial: "FC",
        bg: "bg-indigo-600",
        posted: "1 week ago",
        role: "Business Intelligence Analyst",
        location: "Noida, UP (Hybrid)",
        salary: "₹5,00,000 - ₹7,50,000",
        match: 65,
        skills: ["Power BI", "SQL", "Tableau"],
        urgent: false,
        type: "private"
    },
    {
        id: 6,
        company: "DataCloud Services",
        initial: "DC",
        bg: "bg-slate-600",
        posted: "2 days ago",
        role: "Data Operations Associate",
        location: "Remote",
        salary: "₹3,00,000 - ₹4,00,000",
        match: 95,
        skills: ["Excel", "Communication", "Data Cleaning"],
        urgent: false,
        type: "remote"
    }
]

export default function JSJobs() {
    const navigate = useNavigate()
    const { chatOpen, setChatOpen } = useAppStore()
    const [activeTab, setActiveTab] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredJobs = MOCK_JOBS.filter(job => {
        const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              job.company.toLowerCase().includes(searchQuery.toLowerCase())
        
        if (!matchesSearch) return false

        switch (activeTab) {
            case 'High Match': return job.match >= 85
            case 'Government': return job.type === 'government'
            case 'Remote': return job.type === 'remote'
            default: return true
        }
    })

    return (
        <div className="flex h-screen bg-[#0F172A] overflow-hidden text-slate-100 relative">
            <Sidebar userType="jobseeker" onChatOpen={() => setChatOpen(!chatOpen)} />
            
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative scroll-smooth focus:outline-none">
                <div className="max-w-6xl mx-auto space-y-8 pb-32 mt-14 lg:mt-0">
                    
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Job Matches</h1>
                            <p className="text-slate-400 font-medium">Curated roles based on your Skill Genome</p>
                        </div>
                        
                        <div className="w-full md:w-96 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                                placeholder="Search roles, companies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filter Tabs (Sticky Wrapper) */}
                    <div className="sticky top-0 z-20 bg-[#0F172A]/80 backdrop-blur-md pt-2 pb-4 -mx-2 px-2 border-b border-slate-800">
                        <div className="flex overflow-x-auto hide-scrollbar gap-2">
                            {['All', 'High Match', 'Government', 'Remote'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                                        activeTab === tab 
                                        ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                                    }`}
                                >
                                    {tab} {tab === 'All' && <span className="ml-1 opacity-60">({MOCK_JOBS.length})</span>}
                                    {tab === 'High Match' && <span className="ml-1 opacity-60">({MOCK_JOBS.filter(j => j.match >= 85).length})</span>}
                                </button>
                            ))}
                            <button className="whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 ml-auto">
                                <Filter size={16} /> Filters
                            </button>
                        </div>
                    </div>

                    {/* Job Cards Grid */}
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredJobs.map((job, index) => (
                                <div 
                                    key={job.id} 
                                    className="glass-card p-6 relative group hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-blue-900/10 hover:-translate-y-1 opacity-0 animate-[fade-in-up_0.5s_ease-out_forwards]"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Urgent Banner */}
                                    {job.urgent && (
                                        <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 rounded-tr-xl pointer-events-none">
                                            <div className="absolute top-4 -right-8 w-[140%] bg-orange-500/90 text-white text-[10px] font-black uppercase tracking-widest text-center py-1 transform rotate-45 shadow-lg border-b border-orange-400">
                                                Urgent
                                            </div>
                                        </div>
                                    )}

                                    {/* Card Header */}
                                    <div className="flex items-start gap-4 mb-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-inner ${job.bg}`}>
                                            {job.initial}
                                        </div>
                                        <div className="flex-1 pr-12">
                                            <h3 className="text-slate-300 font-semibold text-sm mb-0.5">{job.company}</h3>
                                            <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                                {job.posted}
                                                {job.type === 'government' && <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">GOVT</span>}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Role & Match */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{job.role}</h2>
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                                    <MapPin size={14} className="opacity-70" /> {job.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-300 font-semibold">
                                                    <IndianRupee size={14} className="opacity-70 text-emerald-400" /> {job.salary}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-4 shadow-inner flex-shrink-0 ${
                                            job.match >= 90 ? 'border-emerald-500/30 bg-emerald-900/20 text-emerald-400' :
                                            job.match >= 80 ? 'border-blue-500/30 bg-blue-900/20 text-blue-400' :
                                            'border-slate-600/50 bg-slate-800/50 text-slate-400'
                                        }`}>
                                            <span className="text-lg font-black leading-none">{job.match}</span>
                                            <span className="text-[9px] font-bold uppercase">Match</span>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {job.skills.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/50">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                                        <a 
                                            href="https://www.ncs.gov.in" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="flex-1 btn-blue text-sm py-2.5 flex justify-center items-center gap-2"
                                        >
                                            Apply on NCS <ExternalLink size={14} />
                                        </a>
                                        <button className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-colors group-hover:shadow-md">
                                            <Bookmark size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 animate-fade-in">
                            <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-slate-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No jobs found</h3>
                            <p className="text-slate-400 text-sm">Adjust your filters or search query to find more matches.</p>
                            <button onClick={() => {setSearchQuery(''); setActiveTab('All')}} className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-bold transition-colors">
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {chatOpen && <AIChatPanel />}
        </div>
    )
}
