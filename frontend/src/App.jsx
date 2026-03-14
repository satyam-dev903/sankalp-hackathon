import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GlobalBackButton from './components/GlobalBackButton'

// Landing
import Landing from './pages/Landing'

// Job Seeker
import JSOnboardingBasic from './pages/jobseeker/JSOnboardingBasic'
import JSOnboardingSkills from './pages/jobseeker/JSOnboardingSkills'
import JSAnalyzing from './pages/jobseeker/JSAnalyzing'
import JSDashboard from './pages/jobseeker/JSDashboard'
import JSAnalysis from './pages/jobseeker/JSAnalysis'
import JSRoadmap from './pages/jobseeker/JSRoadmap'
import JSJobs from './pages/jobseeker/JSJobs'
import JSSchemes from './pages/jobseeker/JSSchemes'
import JSHealth from './pages/jobseeker/JSHealth'
import JSResume from './pages/jobseeker/JSResume'
import JSInterview from './pages/jobseeker/JSInterview'

// Blue Collar
import BCOnboarding from './pages/bluecollar/BCOnboarding'
import BCDashboard from './pages/bluecollar/BCDashboard'
import BCJobs from './pages/bluecollar/BCJobs'
import BCSchemes from './pages/bluecollar/BCSchemes'
import { BCLearn, BCBusiness, BCChat } from './pages/bluecollar/BCStubs'

// Government
import GovtLogin from './pages/govt/GovtLogin'
import GovtDashboard from './pages/govt/GovtDashboard'
import NGOPortal from './pages/govt/NGOPortal'

// Simple not-found
function NotFound() {
    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-white">
            <p className="text-6xl mb-4">🔍</p>
            <h1 className="text-2xl font-bold mb-2">Page not found</h1>
            <a href="/" className="text-blue-400 hover:underline mt-2">← Go to Landing</a>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <GlobalBackButton />
            <Routes>
                {/* Landing */}
                <Route path="/" element={<Landing />} />

                {/* Job Seeker Onboarding */}
                <Route path="/onboarding" element={<JSOnboardingBasic />} />
                <Route path="/onboarding/skills" element={<JSOnboardingSkills />} />
                <Route path="/onboarding/analyzing" element={<JSAnalyzing />} />

                {/* Job Seeker Main */}
                <Route path="/dashboard" element={<JSDashboard />} />
                <Route path="/analysis" element={<JSAnalysis />} />
                <Route path="/roadmap" element={<JSRoadmap />} />
                <Route path="/jobs" element={<JSJobs />} />
                <Route path="/schemes" element={<JSSchemes />} />
                <Route path="/health" element={<JSHealth />} />
                <Route path="/resume" element={<JSResume />} />
                <Route path="/interview" element={<JSInterview />} />
                {/* Redirect /compass and /chat to dashboard */}
                <Route path="/compass" element={<Navigate to="/dashboard" replace />} />
                <Route path="/chat" element={<Navigate to="/dashboard" replace />} />

                {/* Blue Collar */}
                <Route path="/simple" element={<Navigate to="/simple/dashboard" replace />} />
                <Route path="/simple/onboarding" element={<BCOnboarding />} />
                <Route path="/simple/dashboard" element={<BCDashboard />} />
                <Route path="/simple/jobs" element={<BCJobs />} />
                <Route path="/simple/schemes" element={<BCSchemes />} />
                <Route path="/simple/learn" element={<BCLearn />} />
                <Route path="/simple/business" element={<BCBusiness />} />
                <Route path="/simple/chat" element={<BCChat />} />

                {/* Livelihood Help */}
                <Route path="/help" element={<BCBusiness />} />

                {/* Government */}
                <Route path="/govt" element={<Navigate to="/govt/login" replace />} />
                <Route path="/govt/login" element={<GovtLogin />} />
                <Route path="/govt/dashboard" element={<GovtDashboard />} />
                <Route path="/govt/ngo" element={<NGOPortal />} />
                {/* Stub redirects for other govt routes */}
                <Route path="/govt/*" element={<Navigate to="/govt/dashboard" replace />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
