import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
    LayoutDashboard, 
    Brain, 
    Map, 
    Briefcase, 
    Building2, 
    Heart, 
    FileText, 
    Mic2,
    TrendingUp,
    AlertTriangle,
    Users,
    FileBarChart,
    Zap,
    MessageSquare,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import useAppStore from '../store/useAppStore'

const JOBSEEKER_NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Brain, label: 'Career Analysis', path: '/analysis' },
    { icon: Map, label: 'Learning Roadmap', path: '/roadmap' },
    { icon: Briefcase, label: 'Job Matches', path: '/jobs' },
    { icon: Building2, label: 'Schemes', path: '/schemes' },
    { icon: Heart, label: 'Career Health', path: '/health' },
    { icon: FileText, label: 'Resume AI', path: '/resume' },
    { icon: Mic2, label: 'Mock Interview', path: '/interview' },
]

const GOVT_NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/govt/dashboard' },
    { icon: TrendingUp, label: 'Skill Gaps', path: '/govt/skills' },
    { icon: Building2, label: 'Training Centers', path: '/govt/centers' },
    { icon: AlertTriangle, label: 'Fraud Alerts', path: '/govt/alerts' },
    { icon: Users, label: 'NGO Partners', path: '/govt/ngo' },
    { icon: FileBarChart, label: 'Reports', path: '/govt/reports' },
]

export default function Sidebar({ userType = 'jobseeker', onChatOpen }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)
    const { profile, govtProfile } = useAppStore()

    const navItems = userType === 'govt' ? GOVT_NAV : JOBSEEKER_NAV
    const currentUser = userType === 'govt' ? govtProfile : profile
    
    // Theme colors
    const activeBgClass = userType === 'govt' ? 'bg-purple-600/20 border-purple-500' : 'bg-blue-600/20 border-blue-500'
    const hoverBgClass = userType === 'govt' ? 'hover:bg-purple-900/40' : 'hover:bg-slate-800/50'
    const activeTextClass = 'text-white font-semibold'
    const inactiveTextClass = 'text-slate-400 hover:text-white'

    const handleNavigation = (path) => {
        navigate(path)
        setMobileOpen(false)
    }

    const toggleMobileMenu = () => setMobileOpen(!mobileOpen)

    return (
        <>
            {/* Mobile menu button */}
            <button 
                onClick={toggleMobileMenu}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white border border-slate-700"
            >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Backdrop for mobile */}
            {mobileOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed top-0 left-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 z-40
                flex flex-col transition-transform duration-300 ease-in-out
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg
                            ${userType === 'govt' ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-900/50' : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-900/50'}
                        `}>
                            <Zap size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                            {userType === 'govt' ? 'Kaushal Govt' : 'KaushalAI'}
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname.startsWith(item.path) || 
                                         (location.pathname === '/' && item.path === '/dashboard')
                        
                        return (
                            <div 
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer
                                    ${isActive ? `${activeBgClass} border-l-2 ${activeTextClass}` : `${hoverBgClass} border-l-2 border-transparent ${inactiveTextClass}`}
                                `}
                            >
                                <Icon size={18} className={isActive ? (userType === 'govt' ? 'text-purple-400' : 'text-blue-400') : ''} />
                                <span className="text-sm">{item.label}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-slate-800 bottom-section">
                    
                    {/* Ask AI Button */}
                    <button 
                        onClick={onChatOpen}
                        className={`
                            w-full mb-4 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all
                            font-semibold text-sm shadow-lg
                            ${userType === 'govt' 
                                ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-900/20 hover:shadow-purple-900/40' 
                                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20 hover:shadow-blue-900/40'
                            } text-white
                        `}
                    >
                        <MessageSquare size={16} />
                        <span>Ask AI Assistant</span>
                    </button>

                    {/* User Profile Mini Card */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                            ${userType === 'govt' ? 'bg-purple-900/50 text-purple-300' : 'bg-blue-900/50 text-blue-300'}
                        `}>
                            {currentUser?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-semibold text-white truncate">
                                {currentUser?.name || 'User Profile'}
                            </h4>
                            <p className="text-xs text-slate-400 truncate">
                                {userType === 'govt' ? currentUser?.role : currentUser?.district || 'Setup Profile'}
                            </p>
                        </div>
                        <LogOut size={16} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400" />
                    </div>
                </div>

            </div>
        </>
    )
}
