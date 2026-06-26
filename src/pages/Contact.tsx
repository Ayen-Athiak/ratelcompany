import { useState } from 'react'
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { isRateLimited, recordSubmission, rateLimitRetryMs } from '../lib/rateLimit'

const INQUIRY_TYPES = [
  'Import Inquiry',
  'Export Inquiry',
  'General Merchandise',
  'Minerals & Precious Commodities',
  'Acacia Gum',
  'Logistics & Freight',
  'Partnership / Distribution',
  'Other',
]

const CONTACT_INFO = [
  { Icon: Phone,         label: 'Phone',         value: '+211 911 302 810',                 href: 'tel:+211911302810' },
  { Icon: MessageCircle, label: 'WhatsApp',       value: '+211 911 195 255',                 href: 'https://wa.me/211911195255' },
  { Icon: Mail,          label: 'Email',          value: 'info@rateltrading.com',            href: 'mailto:info@rateltrading.com' },
  { Icon: MapPin,        label: 'Location',       value: 'Juba, South Sudan',                href: undefined },
  { Icon: Clock,         label: 'Business Hours', value: 'Mon - Fri 8:00 AM - 6:00 PM EAT', href: undefined },
  { Icon: MessageCircle, label: 'X (Twitter)',    value: '@ratelcompany',                    href: 'https://x.com/ratelcompany' },
]

type Form = {
  name: string
  company: string
  email: string
  phone: string
  inquiry_type: string
  message: string
}

const EMPTY: Form = {
  name: '', company: '', email: '',
  phone: '', inquiry_type: '', message: '',
}

export default function Contact() {
  const [form, setForm]       = useState<Form>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (isRateLimited()) {
      const mins = Math.ceil(rateLimitRetryMs() / 60000)
      setError(`Too many submissions. Please try again in ${mins} minute${mins !== 1 ? 's' : ''}.`)
      return
    }

    setLoading(true)

    const { error: err } = await supabase.from('quotes').insert([{
      name:         form.name,
      company:      form.company || null,
      email:        form.email,
      phone:        form.phone || null,
      inquiry_type: form.inquiry_type,
      message:      form.message,
      status:       'new',
    }])

    setLoading(false)

    if (err) {
      setError('Something went wrong. Please try again or contact us directly.')
      return
    }

    // Send email notification
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          record: {
            name:         form.name,
            company:      form.company || null,
            email:        form.email,
            phone:        form.phone || null,
            inquiry_type: form.inquiry_type,
            message:      form.message,
            created_at:   new Date().toISOString(),
          }
        }),
      })
    } catch {
      // Silent fail — email notification is non-critical
    }

    recordSubmission()
    setSuccess(true)
  }

  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/why.png"
            alt="Contact Ratel General Trading"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(20,30,70,0.97) 40%, rgba(20,30,70,0.55) 100%)',
            }}
          />
        </div>
        <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 z-10 pb-16">
          <div className="section-label text-gold mb-4">Reach Out</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-white/60 max-w-xl leading-relaxed">
            Have a trading inquiry or want to discuss a partnership? We respond
            within one business day.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">

          {/* LEFT */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <div>
              <div className="section-label mb-3">Get in Touch</div>
              <h2 className="text-2xl font-serif font-bold text-navy mb-3">Lets Talk</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you are an importer, exporter, or looking to build a
                long-term partnership, we want to hear from you.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {CONTACT_INFO.map(({ Icon, label, value, href }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-4 px-5 py-4"
                  style={{ borderBottom: i < CONTACT_INFO.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#2C3E6B' }}
                  >
                    <Icon size={15} style={{ color: '#C9A84C' }} />
                  </div>
                  <div>
                    <div
                      className="text-2xs font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: '#C9A84C' }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-navy hover:text-gold transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-navy">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl px-5 py-4 flex items-start gap-3"
              style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <Clock size={17} style={{ color: '#C9A84C', flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-navy">Response time:</span> We reply
                to all inquiries within one business day. For urgent matters, call us directly.
              </p>
            </div>

            <div
              className="rounded-xl p-6 relative overflow-hidden"
              style={{ background: '#2C3E6B' }}
            >
              <div className="absolute left-0 inset-y-0 w-1" style={{ background: '#C9A84C' }} />
              <i
                className="ti ti-quote"
                aria-hidden="true"
                style={{ fontSize: 28, color: '#C9A84C', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}
              />
              <p className="text-white/80 text-sm italic leading-relaxed mb-3">
                "Courage and determination, pushing through any obstacles."
              </p>
              <p
                className="text-2xs font-bold uppercase tracking-widest"
                style={{ color: '#C9A84C' }}
              >
                Ratel General Trading
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl border border-gray-100 p-8">
              {success ? (
                <div className="flex flex-col items-center text-center py-16 gap-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: '#2C3E6B' }}
                  >
                    <CheckCircle size={30} style={{ color: '#C9A84C' }} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-navy">Message Sent!</h3>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Thank you for reaching out. A member of our team will get
                    back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSuccess(false); setForm(EMPTY) }}
                    className="btn-primary mt-2"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="pb-5 border-b border-gray-100">
                    <div className="section-label mb-2">Inquiry Form</div>
                    <h2 className="text-2xl font-serif font-bold text-navy">Send Us a Message</h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Fill in the details below and we will get back to you shortly.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name <span className="text-gold">*</span></label>
                      <input className="form-input" name="name" value={form.name} onChange={set} placeholder="John Smith" required />
                    </div>
                    <div>
                      <label className="form-label">Company</label>
                      <input className="form-input" name="company" value={form.company} onChange={set} placeholder="Your Company Ltd." />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Email <span className="text-gold">*</span></label>
                      <input className="form-input" type="email" name="email" value={form.email} onChange={set} placeholder="you@company.com" required />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input className="form-input" type="tel" name="phone" value={form.phone} onChange={set} placeholder="+211 911 ..." />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Inquiry Type <span className="text-gold">*</span></label>
                    <select className="form-input" name="inquiry_type" value={form.inquiry_type} onChange={set} required>
                      <option value="">Select an inquiry type</option>
                      {INQUIRY_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Message <span className="text-gold">*</span></label>
                    <textarea
                      className="form-input resize-none"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={set}
                      placeholder="Tell us what you need, product, quantity, destination, timeline..."
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                      <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
