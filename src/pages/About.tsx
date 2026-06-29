import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Globe, Heart } from 'lucide-react'

const VALUES = [
  {
    Icon: Shield,
    title: 'Integrity',
    desc: 'We operate with full transparency and honesty in every transaction, building relationships that stand the test of time.',
  },
  {
    Icon: Zap,
    title: 'Reliability',
    desc: 'When we commit to a delivery, a price, or a timeline, we deliver. Our partners count on us and we never let them down.',
  },
  {
    Icon: Globe,
    title: 'Global Reach',
    desc: 'We are actively building connections across East Africa and global markets, opening doors that would otherwise be out of reach for our partners.',
  },
  {
    Icon: Heart,
    title: 'Partnership',
    desc: 'We do not just close deals. We build lasting partnerships. Your success is our success and we invest in it fully.',
  },
]

const TIMELINE = [
  { date: 'April 2026', event: 'Ratel General Trading founded in Juba, South Sudan' },
  { date: 'May 2026',   event: 'Launched import and export operations across key commodity categories' },
  { date: 'June 2026',  event: 'Expanding into East Africa and global markets' },
]

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(20,30,70,0.97) 0%, rgba(44,62,107,0.95) 55%, rgba(20,30,70,0.97) 100%)' }}
        />
        <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 z-10">
          <div className="section-label text-gold mb-4">Our Story</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            About Ratel<br />General Trading
          </h1>
          <p className="text-white/60 max-w-xl leading-relaxed">
            Named after nature's most fearless animal, built on trust,
            resilience, and a relentless drive to deliver.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src="/images/Gemini_Generated_Image_qcqjj4qcqjj4qcqj.webp"
                alt="Our founding story"
                loading="lazy" className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute top-0 left-0 bottom-0 w-1 rounded-l-xl"
              style={{ background: '#C9A84C' }}
            />
            <div className="absolute -bottom-4 left-6 bg-navy rounded-xl px-6 py-4 shadow-xl">
              <div className="text-3xl font-bold text-gold leading-none">2026</div>
              <div className="text-white/60 text-2xs uppercase tracking-widest mt-1">Est. Juba, SS</div>
            </div>
          </div>

          <div>
            <div className="section-label mb-4">Who We Are</div>
            <h2 className="text-4xl font-serif font-bold text-navy mb-5 leading-tight">
              Built on Fearlessness and Trust
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed text-sm">
              <p>
                Ratel General Trading was founded in 2026 in Juba, South Sudan,
                with a simple but powerful belief: that great trading is built on
                trust, resilience, and a commitment to results. We took our name
                from the honey badger, one of nature's most fearless and tenacious
                animals. It is a name that reflects who we are.
              </p>
              <p>
                From our base in Juba, we are expanding across East Africa and into
                global markets, handling import and export operations, general
                merchandise supply, precious commodities, acacia gum, and
                end-to-end logistics.
              </p>
              <p>
                We may be young, but we move with the boldness and determination of
                the animal we are named after. Our goal is clear: to become the most
                trusted general trading company across Africa and beyond.
              </p>
            </div>
            <Link to="/contact" className="btn-primary mt-8 inline-flex">
              Work With Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

     {/* OUR PEOPLE */}
<section className="py-16 bg-white border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <div className="section-label justify-center mb-4">The People Behind Ratel</div>
      <h2 className="text-4xl font-serif font-bold text-navy">Our Team</h2>
      <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
        A focused team with deep experience in trade, logistics, and business
        development across East Africa and global markets.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          image: '/images/mrbiden.webp',
          pos: 'object-center',
          label: 'Chairperson, CEO & Co-Founder',
          name: 'Biden Alone Akech Tong',
          bio: 'Biden founded Ratel General Trading in 2026 with a vision to build the most trusted trading company in East Africa. He leads the company with clarity, ambition, and an unwavering commitment to results.',
        },
        {
          image: '/images/victoria.webp',
          pos: 'object-center',
          label: 'Vice Chairperson & Co-Founder',
          name: 'Victoria Kitale Jaden',
          bio: 'Victoria serves as Vice Chief at Ratel, overseeing strategic partnerships and business operations. She brings years of experience in cross-border trade with a network of suppliers and buyers across Africa, Asia, and Europe.',
        },
        {
          image: '/images/mrlogistic.webp',
          pos: 'object-top',
          label: 'Head of Trade Operations',
          name: 'John Okora',
          bio: 'John manages Ratel\'s import and export operations, ensuring every order is sourced, documented, and delivered to specification. His expertise in trade compliance is central to Ratel\'s reliability.',
        },
        {
          image: '/images/team-bizdev.webp',
          pos: 'object-top',
          label: 'Logistics & Compliance Manager',
          name: 'David Wani',
          bio: 'David oversees logistics and supply chain operations, from freight forwarding and customs clearance to last-mile delivery. His knowledge of South Sudan\'s regulatory environment ensures shipments move smoothly.',
        },
      ].map(({ image, pos, label, name, bio }) => (
        <div
          key={name}
          className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row"
        >
          {/* Photo */}
          <div className="h-60 sm:h-auto sm:w-52 w-full flex-shrink-0 relative overflow-hidden">
            <img
              src={image}
              alt={name}
              className={`absolute inset-0 w-full h-full object-cover ${pos} group-hover:scale-105 transition-transform duration-500`}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 flex-1 relative">
            {/* Gold left accent */}
            <div
              className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
              style={{ background: '#C9A84C' }}
            />
            <div
              className="text-2xs font-bold uppercase tracking-widest mb-1.5"
              style={{ color: '#C9A84C' }}
            >
              {label}
            </div>
            <h3 className="text-xl font-serif font-bold text-navy mb-2 leading-tight">
              {name}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* MISSION AND VISION */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 mb-14">

            {/* Mission */}
            <div className="rounded-xl p-8" style={{ background: '#2C3E6B' }}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                style={{ background: '#C9A84C' }}
              >
                <i className="ti ti-target" aria-hidden="true" style={{ fontSize: 22, color: '#1e2b55' }} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                To be the most trusted general trading partner in the region,
                delivering quality goods and services with integrity, speed, and a
                genuine commitment to our partners' success. We exist to make global
                trade accessible, reliable, and straightforward for every business
                we serve.
              </p>
            </div>

            {/* Vision */}
            <div
              className="rounded-xl p-8 border-2"
              style={{ background: '#ffffff', borderColor: '#2C3E6B' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                style={{ background: '#2C3E6B' }}
              >
                <i className="ti ti-eye" aria-hidden="true" style={{ fontSize: 22, color: '#ffffff' }} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: '#2C3E6B' }}>
                Our Vision
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                To become the leading general trading company across Africa and the
                world, a name known for bold action, reliable delivery, and
                partnerships that last. We believe every business, regardless of
                size, deserves access to the global markets they need to grow.
              </p>
            </div>
          </div>

          {/* Quote image */}
          <div className="relative rounded-xl overflow-hidden">
            <div className="aspect-[4/3] sm:aspect-[16/7] md:aspect-[21/6]">
              <img
                src="/images/south sudan.jpeg"
                alt="South Sudan connecting the world"
                loading="lazy" className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 100%)',
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center px-6 md:px-12 z-10">
              <div className="max-w-lg">
                <div className="bg-white/10 backdrop-blur-md backdrop-saturate-150 rounded-xl px-6 py-6 md:px-8 md:py-8 shadow-xl border border-white/20">
                  <i
                    className="ti ti-quote"
                    aria-hidden="true"
                    style={{ fontSize: 32, color: '#C9A84C', opacity: 0.8, display: 'block', marginBottom: '1rem' }}
                  />
                  <p className="text-white text-3xl md:text-4xl font-serif font-bold leading-snug">
                    Your Gateway to Global Markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-4">What Drives Us</div>
            <h2 className="text-4xl font-serif font-bold text-navy">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-50 border border-gray-100 rounded-xl p-7 hover:border-gold/30 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center mb-5 group-hover:bg-gold transition-colors">
                  <Icon size={20} className="text-gold group-hover:text-navy transition-colors" />
                </div>
                <h3 className="font-serif font-bold text-navy text-xl mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 border-t border-gray-100" style={{ background: '#2C3E6B' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center text-gold mb-4">Our Journey</div>
            <h2 className="text-4xl font-serif font-bold text-white">Just Getting Started</h2>
            <p className="text-white/50 mt-3 text-sm">Founded in 2026, already moving fast.</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
            <div className="space-y-6 md:space-y-10">
              {TIMELINE.map(({ date, event }, i) => (
                <div
                  key={date}
                  className={`relative flex items-center gap-4 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 text-left ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                      <div className="text-2xs font-bold uppercase tracking-widest text-gold mb-1">
                        {date}
                      </div>
                      <p className="text-sm text-white/75">{event}</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-gold border-4 border-navy z-10 flex-shrink-0" />
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="section-label justify-center mb-4">Ready to Start?</div>
          <h2 className="text-4xl font-serif font-bold text-navy mb-4">
            Let's Trade Together
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Whether you are looking to source goods, find export markets, or build
            a long-term supply chain partnership, we are ready.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary">
              Get a Quote <ArrowRight size={14} />
            </Link>
            <Link to="/services" className="btn-outline">View Our Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}