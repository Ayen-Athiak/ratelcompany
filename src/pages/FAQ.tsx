import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQS = [
  {
    category: 'General',
    items: [
      {
        q: 'What does Ratel General Trading do?',
        a: 'Ratel General Trading is a South Sudan-based trading company specialising in import, export, and wholesale distribution of goods across East Africa and global markets. We source, procure, and deliver a wide range of products including food commodities, building materials, electronics, industrial supplies, and more.',
      },
      {
        q: 'Where is Ratel General Trading based?',
        a: 'Our headquarters is in Juba, South Sudan. We operate across East Africa and work with suppliers and buyers from global markets including Asia, Europe, and the Americas.',
      },
      {
        q: 'Is Ratel a registered business?',
        a: 'Yes. Ratel General Trading is a fully registered business under the South Sudan Trade Registry, operating in full compliance with local and international trade regulations.',
      },
    ],
  },
  {
    category: 'Orders & Sourcing',
    items: [
      {
        q: 'How do I place an order or make an inquiry?',
        a: 'You can reach us through our Contact page, by email at biden@ratel-company.com, or via WhatsApp. We will respond with a tailored quote based on your product, quantity, and destination.',
      },
      {
        q: 'Can you source products not listed on your website?',
        a: 'Absolutely. Our catalog represents a portion of what we trade. If you need something not listed, contact us and our team will identify the right suppliers and get you a competitive quote.',
      },
      {
        q: 'What is the minimum order quantity?',
        a: 'Minimum order quantities vary by product. We handle both bulk wholesale orders and smaller mixed-product orders. Get in touch and we will advise based on your specific requirements.',
      },
    ],
  },
  {
    category: 'Shipping & Logistics',
    items: [
      {
        q: 'Do you handle shipping and customs clearance?',
        a: 'Yes. We manage the full logistics chain including freight forwarding, customs documentation, clearance, and last-mile delivery. You do not need to coordinate separately with a freight agent.',
      },
      {
        q: 'What shipping methods do you use?',
        a: 'We ship via air, sea, and road depending on the nature of the goods, urgency, and destination. We work with established carriers to offer competitive freight rates.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Delivery timelines depend on the origin, shipping method, and destination. We provide estimated timelines at the quoting stage and keep you updated throughout the process.',
      },
    ],
  },
  {
    category: 'Payments',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfers and letters of credit (LC) for large orders. Payment terms are discussed and agreed upon before order confirmation.',
      },
      {
        q: 'Do you require a deposit before processing an order?',
        a: 'Yes, most orders require a deposit upon confirmation. The exact percentage depends on the order value and terms agreed. Full payment details are outlined in every purchase agreement.',
      },
    ],
  },
  {
    category: 'Minerals & Precious Commodities',
    items: [
      {
        q: 'Do you trade in gold and other minerals?',
        a: 'Yes. We facilitate the trade of gold ore, diamonds, and gemstones in full compliance with international regulations. All transactions include transparent chain-of-custody documentation.',
      },
      {
        q: 'How do you ensure compliance in mineral trading?',
        a: 'We follow all applicable local and international regulations including certification requirements, export licensing, and chain-of-custody documentation from source to buyer.',
      },
    ],
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('General')

  const toggle = (key: string) => setOpen(prev => prev === key ? null : key)

  const current = FAQS.find(f => f.category === activeCategory)!

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden pt-20" style={{ background: '#1e2b55' }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-label text-gold mb-4">Support</div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
              Frequently Asked<br />Questions
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              Everything you need to know about trading with Ratel — from sourcing to delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[260px_1fr] gap-12">

            {/* Sidebar categories */}
            <div className="space-y-1">
              <p className="text-2xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-3">Categories</p>
              {FAQS.map(({ category }) => (
                <button
                  key={category}
                  onClick={() => { setActiveCategory(category); setOpen(null) }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={
                    activeCategory === category
                      ? { background: '#2C3E6B', color: '#fff' }
                      : { background: 'transparent', color: '#6b7280' }
                  }
                >
                  {category}
                </button>
              ))}

              {/* Contact nudge */}
              <div className="mt-8 rounded-xl p-5" style={{ background: '#2C3E6B' }}>
                <HelpCircle size={20} className="text-gold mb-3" />
                <p className="text-white text-xs font-semibold mb-1">Can't find an answer?</p>
                <p className="text-white/50 text-xs leading-relaxed mb-4">Our team replies within 24 hours.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:gap-3 transition-all"
                >
                  Contact Us <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Questions */}
            <div>
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-serif font-bold text-navy mb-6">{activeCategory}</h2>
                <div className="space-y-3">
                  {current.items.map(({ q, a }) => {
                    const key = `${activeCategory}-${q}`
                    const isOpen = open === key
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-xl border transition-all duration-200"
                        style={{ borderColor: isOpen ? '#C9A84C' : '#f3f4f6' }}
                      >
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        >
                          <span className="text-sm font-semibold text-navy leading-snug">{q}</span>
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                            style={{ background: isOpen ? '#C9A84C' : '#f3f4f6' }}
                          >
                            <ChevronDown
                              size={14}
                              style={{
                                color: isOpen ? '#fff' : '#9ca3af',
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                              }}
                            />
                          </div>
                        </button>
                        <div
                          className="overflow-hidden transition-all duration-200"
                          style={{ maxHeight: isOpen ? '600px' : '0px', opacity: isOpen ? 1 : 0 }}
                        >
                          <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                            {a}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 border-t-2 border-gold" style={{ background: '#2C3E6B' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="section-label text-gold mb-3">Get in Touch</div>
              <h2 className="text-4xl font-serif font-bold text-white">Still have questions?</h2>
              <p className="text-white/55 text-sm mt-2 leading-relaxed max-w-md">
                Our team is available to answer any questions about our services, pricing, or trade process.
              </p>
            </div>
            <Link to="/contact" className="btn-primary flex-shrink-0">
              Send Us a Message <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
