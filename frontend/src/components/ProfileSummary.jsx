import React from 'react'
import { User, Edit3, Shield, Briefcase, UserCheck } from 'lucide-react'

export default function ProfileSummary({ userType, profile, onEdit }) {
    if (!profile) return null

    const getIcon = () => {
        if (userType === 'govt') return <Shield className="text-purple-400" size={20} />
        if (userType === 'bluecollar') return <UserCheck className="text-emerald-400" size={20} />
        return <Briefcase className="text-blue-400" size={20} />
    }

    const getRoleLabel = () => {
        if (userType === 'govt') return profile.designation || 'Officer'
        if (userType === 'bluecollar') return profile.trade || 'Skilled Worker'
        return profile.education || 'Job Seeker'
    }

    const getThemeClass = () => {
        if (userType === 'govt') return 'border-purple-500/20 hover:border-purple-500/40 bg-purple-900/5'
        if (userType === 'bluecollar') return 'border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-900/5'
        return 'border-blue-500/20 hover:border-blue-500/40 bg-blue-900/5'
    }

    const avatar = profile.avatar || profile.profile_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'

    return (
        <div className={`glass-card p-5 relative overflow-hidden group transition-all duration-300 ${getThemeClass()}`}>
            {/* Ambient background glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 pointer-events-none ${
                userType === 'govt' ? 'bg-purple-500' : userType === 'bluecollar' ? 'bg-emerald-500' : 'bg-blue-500'
            }`} />

            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                {/* Avatar Section */}
                <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 p-0.5 ${
                        userType === 'govt' ? 'border-purple-500/30' : userType === 'bluecollar' ? 'border-emerald-500/30' : 'border-blue-500/30'
                    }`}>
                        <img 
                            src={avatar} 
                            alt={profile.name} 
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 p-1.5 rounded-lg shadow-lg">
                        {getIcon()}
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="text-xl font-black text-white tracking-tight">{profile.name}</h3>
                        <span className={`w-fit mx-auto sm:mx-0 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                            userType === 'govt' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 
                            userType === 'bluecollar' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                            'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        }`}>
                            {getRoleLabel()}
                        </span>
                    </div>
                    <div className="text-sm text-slate-400 font-medium leading-relaxed italic line-clamp-2">
                        "{profile.summary || 'Professional dedicated to growth and excellence in their field.'}"
                    </div>
                </div>

                {/* Edit Action */}
                <button 
                    onClick={onEdit}
                    className="group/btn flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl border border-slate-700/50 transition-all font-bold text-xs shadow-lg active:scale-95"
                >
                    <Edit3 size={14} className="group-hover/btn:rotate-12 transition-transform" />
                    Edit Profile
                </button>
            </div>
        </div>
    )
}
