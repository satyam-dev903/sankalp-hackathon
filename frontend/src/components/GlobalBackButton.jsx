import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function GlobalBackButton() {
    const navigate = useNavigate()
    const location = useLocation()

    // Root hubs where back button is hidden
    const hideOnRoutes = ['/', '/dashboard', '/simple/dashboard', '/govt/dashboard', '/govt/login']
    if (hideOnRoutes.includes(location.pathname)) return null

    // Determine left offset based on sidebar presence
    const hasSidebar = [
        '/analysis', '/jobs', '/schemes', '/roadmap', '/health', '/compass', '/chat'
    ].includes(location.pathname) || (location.pathname.startsWith('/govt/') && location.pathname !== '/govt/login')

    return (
        <button
            onClick={() => navigate(-1)}
            className={`fixed top-24 z-[40] flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-full border border-slate-600/50 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-sm font-medium ${
                hasSidebar ? 'left-4 lg:left-68' : 'left-4 md:left-6'
            }`}
            style={hasSidebar ? { marginLeft: '1rem' } : {}}
        >
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
        </button>
    )
}
