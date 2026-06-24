import { Link } from 'react-router-dom'
import { ArrowRight, Send } from 'lucide-react'

const SERVICES = [
  {
    num: '01',
    slug: 'import',
    image: '/images/import.jpg',
    label: 'Import Services',
    tagline: 'Bringing the World to Your Door',
    title: 'Import Services',
    desc: 'We manage the full import lifecycle, from supplier identification and price negotiation to customs clearance, documentation, and last-mile delivery. Our global network ensures you get the right goods at the right price, every time.',
    features: [
      'Supplier sourcing and vetting across global markets',
      'Price negotiation and purchase order management',
      'Customs clearance and import documentation',
      'Quality inspection before shipment',
      'Door-to-door delivery coordination',
      'Competitive freight rates via established carrier relationships',
    ],
  },
  {
    num: '02',
    slug: 'export',
    image: '/images/export.jpg',
    label: 'Export Services',
    tagline: 'Taking Your Products Global',
    title: 'Export Services',
    desc: 'We connect local producers and manufacturers with international buyers, handling every step of the export process from market identification and compliance to shipping and final delivery. Open new revenue streams with confidence.',
    features: [
      'International buyer identification and matching',
      'Export licensing and regulatory compliance',
      'Packaging, labelling and documentation',
      'Freight forwarding and shipping coordination',
      'Letter of credit and payment facilitation',
      'Post-shipment tracking and reporting',
    ],
  },
  {
    num: '03',
    slug: 'merchandise',
    image: '/images/merchandise.jpg',
    label: 'General Merchandise',
    tagline: 'A Broad Catalog, One Reliable Partner',
    title: 'General Merchandise',
    desc: 'From food commodities and household goods to electronics and building materials, we trade a wide range of general merchandise. Whether you need bulk wholesale quantities or mixed-product orders, we source and deliver with precision.',
    features: [
      'Food commodities: rice, sugar, flour, cooking oil',
      'Building materials: steel, cement, roofing, pipes',
      'Electronics and home appliances',
      'Household goods and personal care products',
      'Textiles, clothing and fabrics',
      'Flexible order sizes, bulk or mixed lots',
    ],
  },
  {
    num: '04',
    slug: 'minerals',
    image: '/images/mineral.png',
    label: 'Minerals & Precious Commodities',
    tagline: 'Responsibly Sourced, Globally Traded',
    title: 'Minerals & Precious Commodities',
    desc: 'We facilitate the trade of high-value natural resources including gold ore, diamonds, and gemstones. All transactions are conducted in full compliance with international regulations, with transparent chain-of-custody documentation from source to buyer.',
    features: [
      'Gold ore sourcing and export facilitation',
      'Diamond and gemstone trade brokerage',
      'Full regulatory compliance and certification',
      'Chain-of-custody documentation',
      'Secure logistics and insured shipment',
      'Buyer-seller matching for large-volume deals',
    ],
  },
  {
    num: '05',
    slug: 'acacia-gum',
    image: '/images/Acaciagum.png',
    label: 'Acacia Gum',
    tagline: "Africa's Natural Export, Delivered Reliably",
    title: 'Acacia Gum',
    desc: "South Sudan and the surrounding region produce some of the world's finest acacia gum, a natural emulsifier used in food, pharmaceuticals, and cosmetics. We source, grade, and export acacia gum to buyers across Europe, Asia, and the Americas.",
    features: [
      'Direct sourcing from local producers',
      'Grading, cleaning and quality certification',
      'Food-grade and pharmaceutical-grade supply',
      'Bulk export in bags or containers',
      'Compliance with international food safety standards',
      'Consistent supply chain with seasonal planning',
    ],
  },
  {
    num: '06',
    slug: 'logistics',
    image: '/images/team-logistics.jpg',
    label: 'Logistics & Supply Chain',
    tagline: 'End-to-End Coordination, Zero Surprises',
    title: 'Logistics & Supply Chain',
    desc: 'Our logistics team coordinates the full supply chain, freight forwarding, customs brokerage, warehousing, and last-mile delivery. We work with trusted carriers and agents worldwide to ensure your cargo moves efficiently and arrives on time.',
    features: [
      'Air, sea and road freight forwarding',
      'Customs brokerage and clearance',
      'Warehousing and inventory management',
      'Last-mile delivery coordination',
      'Real-time shipment tracking',
      'Insurance and risk management',
    ],
  },
  {
    num: '07',
    slug: 'game-lounge',
    image: '/images/gamelounge.png',
    label: 'Game Lounge',
    tagline: 'Entertainment Spaces, Fully Equipped',
    title: 'Game Lounge',
    desc: 'We supply and set up fully equipped game lounges, from gaming consoles and PCs to seating, lighting, and accessories. Whether you are launching a commercial gaming hub or a private entertainment space, we source everything you need.',
    features: [
      'Gaming consoles, PCs and accessories supply',
      'Lounge furniture and interior fit-out',
      'Networking and display equipment',
      'Bulk procurement at competitive prices',
      'Setup and installation coordination',
      'Ongoing restocking and maintenance supply',
    ],
  },
  {
    num: '08',
    slug: 'fast-food-bakery',
    image: '/images/fastfoodbary.png',
    label: 'Fast Food Chains & Bakery',
    tagline: 'Supplying the Food and Beverage Industry',
    title: 'Fast Food Chains & Bakery',
    desc: 'We supply fast food chains, restaurants, and bakeries with the raw materials, equipment, and packaging they need to operate efficiently. From bulk food commodities to commercial kitchen equipment, we are your one-stop supply partner.',
    features: [
      'Bulk food commodities: flour, sugar, oil, dairy',
      'Commercial kitchen equipment sourcing',
      'Packaging materials and disposables',
      'Bakery ingredients and specialty supplies',
      'Cold chain logistics for perishables',
      'Consistent supply with flexible order cycles',
    ],
  },
  {
    num: '09',
    slug: 'laundromat',
    image: '/images/laundromat.png',
    label: 'Laundromat',
    tagline: 'Equipment and Supplies for Laundry Businesses',
    title: 'Laundromat',
    desc: 'We import and supply commercial laundry equipment, detergents, and consumables for laundromat businesses. Whether you are starting a new laundry operation or expanding an existing one, we provide everything from machines to maintenance supplies.',
    features: [
      'Commercial washing machines and dryers import',
      'Industrial detergents and cleaning agents',
      'Laundry consumables and packaging',
      'Equipment installation coordination',
      'Spare parts and maintenance supplies',
      'Bulk pricing for multi-unit operations',
    ],
  },
  {
    num: '10',
    slug: 'auto-detailing',
    image: '/images/serviceauto.png',
    label: 'Auto Detailing & Full Services',
    tagline: 'Everything Your Auto Business Needs',
    title: 'Auto Detailing & Full Services',
    desc: 'We supply auto detailing businesses and full-service garages with professional-grade products, equipment, and tools. From car care chemicals and polishing machines to workshop equipment, we source quality supplies at competitive prices.',
    features: [
      'Professional car care chemicals and detailing products',
      'Polishing, buffing and waxing equipment',
      'Workshop tools and garage equipment',
      'Tyre and wheel care supplies',
      'Interior and exterior detailing consumables',
      'Bulk supply for multi-bay operations',
    ],
  },
]

const STEPS = [
  { num: '01', title: 'Initial Inquiry',      desc: 'Tell us what you need: product, quantity, destination, and timeline.' },
  { num: '02', title: 'Sourcing & Quotation', desc: 'We identify suppliers, negotiate pricing, and send you a detailed quote.' },
  { num: '03', title: 'Order Confirmation',   desc: 'You approve the quote, we raise the purchase order and begin procurement.' },
  { num: '04', title: 'Logistics & Shipping', desc: 'We handle all freight, customs, and documentation end-to-end.' },
  { num: '05', title: 'Delivery & Follow-up', desc: 'Your goods arrive on time. We follow up to ensure everything meets expectations.' },
]

export default function Services() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/images/servicesimport.png"
            alt="Ratel General Trading services"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>
        <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 z-10">
          <div className="section-label text-gold mb-4">What We Offer</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            Our Services
          </h1>
          <p className="text-white/60 max-w-xl leading-relaxed">
            From import and export to precious minerals, acacia gum, and
            end-to-end logistics, we handle every dimension of global trade.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="bg-white">
        {SERVICES.map(({ num, slug, image, label, tagline, title, desc, features }, i) => (
          <div key={slug} className="grid md:grid-cols-2 border-b border-gray-100">

            {/* Image panel */}
            <div className={`relative aspect-[4/3] flex flex-col justify-end ${i % 2 !== 0 ? 'md:order-last' : ''}`}>
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 100%)',
                }}
              />
              <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
              <div className="relative z-10 p-8">
                <div className="text-2xs font-bold uppercase tracking-widest text-gold mb-3">{label}</div>
                <p className="text-white/60 text-sm italic">{tagline}</p>
              </div>
            </div>

            {/* Content panel */}
            <div className={`p-6 md:p-10 flex flex-col justify-center bg-white ${i % 2 !== 0 ? 'md:order-first' : ''}`}>
              <h2 className="text-3xl font-serif font-bold text-navy mb-4">{title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-2.5 mb-8">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary self-start">
                <Send size={13} /> Inquire Now
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* HOW WE WORK */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-4">Simple Process</div>
            <h2 className="text-4xl font-serif font-bold text-navy">How We Work</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
              A straightforward, transparent process from first inquiry to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-gold/30 transition-colors">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 font-bold text-lg"
                  style={{ background: '#2C3E6B', color: '#C9A84C' }}
                >
                  {num}
                </div>
                <h3 className="font-serif font-bold text-navy mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t-2 border-gold" style={{ background: '#2C3E6B' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="section-label justify-center text-gold mb-4">Get Started</div>
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Ready to Move Goods?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Tell us what you need and we will put together a tailored quote,
            fast, transparent, and competitive.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn-primary">
              Get a Quote <ArrowRight size={14} />
            </Link>
            <Link to="/products" className="btn-ghost-white">
              View Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}