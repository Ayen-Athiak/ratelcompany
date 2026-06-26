import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#2C3E6B' }} className="border-t-2 border-gold">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center bg-white rounded-lg px-3 py-1.5 mb-4"
              style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.30)' }}
            >
              <img
                src="/images/logo.png"
                alt="Ratel General Trading"
                className="h-12 w-auto object-contain"
                style={{ maxWidth: 200 }}
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-5">
              Courage and determination, pushing through any obstacles.
            </p>
            <a
              href="https://x.com/ratelcompany"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-gold transition-colors uppercase tracking-wider"
            >
              X (Twitter) @ratelcompany
            </a>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-2xs font-bold uppercase tracking-widest text-gold mb-4">Quick Links</div>
            <ul className="space-y-2.5">
              {[
                { to: '/',         label: 'Home' },
                { to: '/about',    label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/products', label: 'Products' },
                { to: '/contact',  label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-white/55 hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Ratel */}
          <div>
            <div className="text-2xs font-bold uppercase tracking-widest text-gold mb-4">Why Ratel</div>
            <ul className="space-y-2.5">
              {[
                'Registered Business',
                'Dedicated Managers',
                'Full Documentation',
                'Fast Turnaround',
              ].map(item => (
                <li key={item} className="text-sm text-white/55">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-2xs font-bold uppercase tracking-widest text-gold mb-4">Contact Us</div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:+211911302810"
                  className="text-sm text-white/55 hover:text-gold transition-colors"
                >
                  +211 911 302 810
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/211911195255"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/55 hover:text-gold transition-colors"
                >
                  WhatsApp: +211 911 195 255
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@rateltrading.com"
                  className="text-sm text-white/55 hover:text-gold transition-colors"
                >
                  info@rateltrading.com
                </a>
              </li>
              <li>
                <span className="text-sm text-white/55">Juba, South Sudan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4">
          <p className="text-white/30 text-xs">
            2026 Ratel General Trading. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/faq" className="text-white/30 text-xs hover:text-gold transition-colors">
              FAQ
            </Link>
            <Link to="/privacy" className="text-white/30 text-xs hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/30 text-xs hover:text-gold transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/211911195255"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-50 transition-transform hover:scale-110"
        style={{ background: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  )
}
