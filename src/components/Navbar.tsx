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
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 py-4 space-y-1">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors"
              style={{
                color:      pathname === to ? '#C9A84C' : 'rgba(255,255,255,0.7)',
                background: pathname === to ? 'rgba(201,168,76,0.08)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block mt-3 btn-primary text-center text-sm"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}