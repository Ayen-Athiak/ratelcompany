import { Link } from 'react-router-dom'
import { ArrowRight, Ship, Globe, Package, Truck } from 'lucide-react'

const SERVICES = [
  {
    Icon: Ship,
    num: '01',
    title: 'Import',
    desc: 'Quality goods sourced from global markets with competitive pricing and reliable delivery to your door.',
    image: '/images/import.webp',
  },
  {
    Icon: Globe,
    num: '02',
    title: 'Export',
    desc: 'Connecting local producers with international buyers with full process management from documentation to delivery.',
    image: '/images/export.webp',
  },
  {
    Icon: Package,
    num: '03',
    title: 'General Merchandise',
    desc: 'A broad catalog of consumer goods, industrial supplies, and specialty products for bulk and retail trade.',
    image: '/images/merchandise.webp',
  },
  {
    Icon: Truck,
    num: '04',
    title: 'Logistics Support',
    desc: 'End-to-end logistics including freight forwarding, customs clearance, and last-mile delivery solutions.',
    image: '/images/logistics.webp',
  },
]

const PRODUCTS = [
  { image: '/images/food-commodities.webp',    cat: 'Food',         name: 'Food & Commodities',  desc: 'Rice, sugar, flour, cooking oil and staple food commodities for wholesale distribution.' },
  { image: '/images/building-materials.webp',  cat: 'Construction', name: 'Building Materials',  desc: 'Steel, cement, roofing sheets, pipes and hardware for large and residential projects.' },
  { image: '/images/electronics.webp',         cat: 'Technology',   name: 'Electronics',         desc: 'Consumer electronics and home appliances from trusted global manufacturers.' },
  { image: '/images/industrial-supplies.webp', cat: 'Industrial',   name: 'Industrial Supplies', desc: 'Heavy-duty equipment, tools, safety gear and machinery for construction and energy.' },
  { image: '/images/household-goods.webp',     cat: 'Consumer',     name: 'Household Goods',     desc: 'Everyday essentials, kitchenware, cleaning products and personal care items.' },
  { image: '/images/textiles-clothing.webp',   cat: 'Apparel',      name: 'Textiles & Clothing', desc: 'Wholesale fabrics, garments and apparel from leading manufacturers across Africa and Asia.' },
  { image: '/images/healthcare.webp',          cat: 'Healthcare',   name: 'Healthcare & Pharma', desc: 'Medical supplies and pharmacy stock sourced to international standards.' },
  { image: '/images/automotive.webp',          cat: 'Automotive',   name: 'Automotive Parts',    desc: 'Spare parts, accessories and lubricants from verified manufacturers.' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0, filter: 'blur(5px) brightness(0.55) saturate(0.7)' }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(10,15,40,0.72) 0%, rgba(30,43,85,0.65) 55%, rgba(10,15,40,0.60) 100%)',
            zIndex: 1,
          }}
        />

        <div className="absolute left-0 inset-y-0 w-1 bg-gold" style={{ zIndex: 2 }} />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            zIndex: 2,
          }}
        />

        <div
          className="relative w-full max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center"
          style={{ zIndex: 3 }}
        >
          <div>
            <div className="section-label text-gold mb-5">
              General Trading · Import · Export
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-[1.05] mb-6">
              Bold.<br />
              <span className="text-gold">Reliable.</span><br />
              Built to Last.
            </h1>
            <p className="text-white/65 text-base leading-relaxed mb-8 max-w-md">
              Ratel General Trading connects businesses to global markets,
              delivering quality goods, seamless logistics, and partnerships
              built on trust from Juba to the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Get a Quote <ArrowRight size={15} />
              </Link>
              <Link to="/services" className="btn-ghost-white">
                Our Services
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="section-label text-gold/80 mb-6">Active Trade Routes</div>
              <div className="space-y-4">
                {[
                  { city: 'Juba, South Sudan',    tag: 'HQ',     active: true  },
                  { city: 'East Africa Region',    tag: 'Active', active: false },
                  { city: 'Global Import Markets', tag: 'Active', active: false },
                ].map(({ city, tag, active }, i) => (
                  <div key={city}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${active ? 'bg-gold' : 'border-2 border-gold/50'}`} />
                      <span className="text-sm text-white/80 flex-1">{city}</span>
                      <span className="text-2xs font-semibold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    </div>
                    {i < 2 && <div className="ml-[4.5px] mt-1 h-4 w-px bg-white/15" />}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                {[
                  ['Import', 'Inbound goods from global markets'],
                  ['Export', 'Connecting local producers to global buyers'],
                ].map(([t, d]) => (
                  <div key={t} className="bg-white/5 rounded-lg p-4">
                    <div className="text-gold font-semibold text-sm mb-1">{t}</div>
                    <div className="text-white/45 text-xs leading-relaxed">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-end mb-8 md:mb-14">
            <div>
              <div className="section-label mb-3">What We Do</div>
              <h2 className="text-4xl font-serif font-bold text-navy">Our Trading Services</h2>
            </div>
            <div>
              <p className="text-gray-500 leading-relaxed">
                From sourcing to delivery, we manage every step of the global
                trade process so you can focus on growing your business.
              </p>
              <Link to="/services" className="btn-outline mt-5 inline-flex">
                All Services <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map(({ Icon, num, title, desc, image }) => (
              <div
                key={title}
                className="group relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.05) 70%)',
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-7 z-10">
                  <div
                    className="text-2xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: 'rgba(201,168,76,0.7)' }}
                  >
                    {num}
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
                    style={{ background: '#C9A84C' }}
                  >
                    <Icon size={17} className="text-navy" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{title}</h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {desc}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-3"
                    style={{ color: '#C9A84C' }}
                  >
                    Learn more <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8 md:mb-14">
            <div>
              <div className="section-label mb-3">What We Trade</div>
              <h2 className="text-4xl font-serif font-bold text-navy">Product Categories</h2>
            </div>
            <Link to="/products" className="btn-outline hidden md:inline-flex">
              Full Catalog <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.map(({ image, cat, name, desc }) => (
              <Link
                key={name}
                to="/products"
                className="group relative rounded-xl overflow-hidden block aspect-[3/4]"
              >
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.78) 35%, rgba(0,0,0,0.05) 70%)',
                  }}
                />
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 group-hover:w-1"
                  style={{ background: '#C9A84C' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                  <div
                    className="text-2xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: '#C9A84C' }}
                  >
                    {cat}
                  </div>
                  <h3 className="font-serif font-bold text-white text-sm leading-snug mb-2 group-hover:text-gold transition-colors duration-300">
                    {name}
                  </h3>
                  <p
                    className="text-xs leading-relaxed overflow-hidden transition-all duration-500"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      maxHeight: 0,
                    }}
                  >
                    {desc}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-2 text-2xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: '#C9A84C' }}
                  >
                    View Products <ArrowRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 md:hidden text-center">
            <Link to="/products" className="btn-outline">
              Full Catalog <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY RATEL */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative pb-6 md:pb-0">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/team.webp"
                  alt="Ratel General Trading team"
                  loading="lazy" className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-6 bg-navy rounded-xl px-6 py-4 shadow-xl">
                <div className="text-3xl font-bold text-gold leading-none">2026</div>
                <div className="text-white/60 text-2xs uppercase tracking-widest mt-1">Est. Juba, SS</div>
              </div>
              <div
                className="absolute top-0 left-0 bottom-0 w-1 rounded-l-xl"
                style={{ background: '#C9A84C' }}
              />
            </div>

            <div>
              <div className="section-label mb-4">Why Ratel</div>
              <h2 className="text-4xl font-serif font-bold text-navy mb-5 leading-tight">
                A Partner You Can Count On
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Named after the honey badger, one of nature's most fearless and
                resilient animals, Ratel was built on trust, hard work, and a
                commitment to delivering results for every client.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Full-service import and export management',
                  'Competitive pricing with no hidden fees',
                  'Dedicated account managers for every client',
                  'Customs clearance and documentation handled',
                  'Fast turnaround and reliable delivery timelines',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <Link to="/about" className="btn-primary">
                  Our Story <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="btn-outline">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-14">
            <div className="section-label justify-center mb-4">Client Voices</div>
            <h2 className="text-4xl font-serif font-bold text-navy">What Our Partners Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                quote: 'Ratel General Trading has been our most reliable partner for cross-border procurement. Their team handles everything with precision and speed.',
                name: 'Ahmed Al-Rashid',
                role: 'Al-Rashid Procurement Group',
              },
              {
                quote: 'We have worked with many trading companies, but none match Ratel\'s commitment to quality and on-time delivery. Truly a partner you can count on.',
                name: 'Sarah Okonkwo',
                role: 'West Africa Distributors Ltd.',
              },
              {
                quote: 'From the first inquiry to final delivery, the process was seamless. Ratel\'s professionalism sets them apart in the industry.',
                name: 'James Mwangi',
                role: 'East Africa Supply Chain Co.',
              },
              {
                quote: 'The customs clearance and documentation process used to be our biggest headache. Ratel made it completely stress-free. We will not use anyone else.',
                name: 'Fatima Hassan',
                role: 'Regional Import Manager',
              },
            ].map(({ quote, name, role }, i) => (
              <div
                key={i}
                className="group relative bg-gray-50 border border-gray-100 rounded-xl p-5 md:p-8 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-8 right-8 h-0.5 rounded-full transition-all duration-300 group-hover:left-6 group-hover:right-6"
                  style={{ background: '#C9A84C' }}
                />
                <i
                  className="ti ti-quote"
                  aria-hidden="true"
                  style={{ fontSize: 28, color: '#C9A84C', opacity: 0.3, display: 'block', marginBottom: '1rem' }}
                />
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "{quote}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: '#2C3E6B', color: '#C9A84C' }}
                  >
                    {name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">{name}</div>
                    <div className="text-2xs text-gray-400 mt-0.5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#2C3E6B' }} className="py-16 border-t-2 border-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="section-label justify-center mb-5" style={{ color: '#C9A84C' }}>
            Ready to Trade?
          </div>
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 max-w-lg mx-auto">
            Whether you need to source goods, reach new export markets, or
            improve your supply chain, we are ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get a Quote <ArrowRight size={14} />
            </Link>
            <Link to="/services" className="btn-ghost-white">View Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
