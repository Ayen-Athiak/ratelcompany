import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/blog',     label: 'News' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname }    = useLocation()

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center bg-white rounded-lg px-3 py-1.5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.30)' }}
        >
          <img
            src="/images/logo.webp"
            alt="Ratel General Trading"
            className="h-12 w-auto object-contain"
            style={{ maxWidth: 200 }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
              style={{ color: pathname === to ? '#C9A84C' : 'rgba(255,255,255,0.65)' }}
            >
              {label}
              {pathname === to && (
                <span
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: '#C9A84C' }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" className="btn-primary text-xs py-2 px-4">
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden text-white/70 hover:text-white p-1"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[60] flex flex-col"
          style={{ background: '#2C3E6B' }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute left-0 inset-y-0 w-1 bg-gold pointer-events-none" />

          {/* Top bar — logo + close */}
          <div className="relative flex items-center justify-between px-6 h-[72px] border-b border-white/10 flex-shrink-0">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center bg-white rounded-lg px-3 py-1.5"
              style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.30)' }}
            >
              <img
                src="/images/logo.webp"
                alt="Ratel General Trading"
                className="h-12 w-auto object-contain"
                style={{ maxWidth: 200 }}
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white p-1 transition-colors"
            >
              <X size={26} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="relative flex-1 flex flex-col justify-center px-8">
            {NAV.map(({ to, label }, i) => (
              <div key={to}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className="block py-5 transition-colors"
                  style={{ color: pathname === to ? '#C9A84C' : 'rgba(255,255,255,0.85)' }}
                >
                  <span className="text-3xl font-serif font-bold">{label}</span>
                  {pathname === to && (
                    <span
                      className="ml-3 text-xs font-bold uppercase tracking-widest align-middle"
                      style={{ color: '#C9A84C' }}
                    >
                      ●
                    </span>
                  )}
                </Link>
                {i < NAV.length - 1 && (
                  <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                )}
              </div>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="relative px-8 pb-10 flex-shrink-0">
            <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center text-sm"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}