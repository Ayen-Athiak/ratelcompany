import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import Home      from './pages/Home'
import About     from './pages/About'
import Services  from './pages/Services'
import Products  from './pages/Products'
import Blog      from './pages/Blog'
import BlogPost  from './pages/BlogPost'
import Contact   from './pages/Contact'
import FAQ       from './pages/FAQ'
import Login     from './admin/Login'
import Dashboard from './admin/Dashboard'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function SplashScreen() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#ffffff' }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <img
          src="/images/logo.webp"
          alt="Ratel General Trading"
          style={{ height: 120, width: 'auto', objectFit: 'contain' }}
        />
        <div className="w-32 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,168,76,0.2)' }}>
          <div
            className="h-full rounded-full"
            style={{
              background: '#C9A84C',
              animation: 'loadbar 2.5s ease-in-out forwards',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes loadbar {
          0%   { width: 0% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  )
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-0">{children}</main>
      <Footer />
    </>
  )
}

function AdminRoute({ session }: { session: Session | null }) {
  if (session === null) return <Login />
  return <Dashboard />
}

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [splash, setSplash]   = useState(() => {
    const seen = sessionStorage.getItem('splash_seen')
    return !seen
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!splash) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('splash_seen', 'true')
      setSplash(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [splash])

  if (splash) return <SplashScreen />

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1e2b55' }}>
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-gold animate-spin" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about"      element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services"   element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/products"   element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/blog"       element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/contact"    element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/faq"        element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/admin"      element={<AdminRoute session={session} />} />
        <Route path="*"           element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  )
}