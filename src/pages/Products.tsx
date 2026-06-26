import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { cacheGet, cacheSet } from '../lib/cache'
import type { Product } from '../types'

const FALLBACK: Product[] = [
  {
    id: '1', name: 'Food & Commodities', category: 'food',
    description: 'Bulk agricultural products including rice, sugar, flour, cooking oil, and other staple food commodities for wholesale and retail distribution.',
    tags: ['Rice', 'Sugar', 'Flour', 'Cooking Oil', 'Grains'],
    image_url: '/images/food-commodities.jpg',
    large: true, sort_order: 1, created_at: '',
  },
  {
    id: '2', name: 'Building Materials', category: 'building',
    description: 'Quality construction materials, steel, cement, roofing sheets, pipes, and hardware supplies for large-scale and residential projects.',
    tags: ['Steel', 'Cement', 'Roofing', 'Pipes', 'Hardware'],
    image_url: '/images/building-materials.jpg',
    large: false, sort_order: 2, created_at: '',
  },
  {
    id: '3', name: 'Electronics & Appliances', category: 'electronics',
    description: 'Consumer electronics, home appliances, and technology products sourced from trusted global manufacturers at competitive wholesale prices.',
    tags: ['Appliances', 'Gadgets', 'Lighting', 'Power', 'Tech'],
    image_url: '/images/electronics.jpg',
    large: false, sort_order: 3, created_at: '',
  },
  {
    id: '4', name: 'Industrial Supplies', category: 'industrial',
    description: 'Heavy-duty industrial equipment, tools, safety gear, and machinery components for manufacturing, construction, and energy sectors.',
    tags: ['Tools', 'Machinery', 'Safety Gear', 'Equipment', 'Parts'],
    image_url: '/images/industrial-supplies.jpg',
    large: true, sort_order: 4, created_at: '',
  },
  {
    id: '5', name: 'Household Goods', category: 'household',
    description: 'Everyday household essentials, cleaning products, kitchenware, furniture, and personal care items for retail and wholesale buyers.',
    tags: ['Kitchenware', 'Cleaning', 'Furniture', 'Personal Care'],
    image_url: '/images/household-goods.jpg',
    large: false, sort_order: 5, created_at: '',
  },
  {
    id: '6', name: 'Textiles & Clothing', category: 'textiles',
    description: 'Wholesale fabrics, garments, and apparel sourced from leading textile manufacturers across Asia and Africa for retail and distribution.',
    tags: ['Fabrics', 'Garments', 'Uniforms', 'Apparel', 'Wholesale'],
    image_url: '/images/textiles-clothing.jpg',
    large: false, sort_order: 6, created_at: '',
  },
  {
    id: '7', name: 'Healthcare & Pharma', category: 'healthcare',
    description: 'Medical supplies, equipment, and pharmacy stock sourced to international standards for hospitals, clinics, and retail pharmacies.',
    tags: ['Medical Supplies', 'Equipment', 'Pharma', 'Certified'],
    image_url: '/images/healthcare.jpg',
    large: false, sort_order: 7, created_at: '',
  },
  {
    id: '8', name: 'Automotive Parts', category: 'automotive',
    description: 'Spare parts, accessories, and automotive supplies from verified manufacturers for garages, dealerships, and retail buyers.',
    tags: ['Spare Parts', 'Accessories', 'Lubricants', 'Tools'],
    image_url: '/images/automotive.jpg',
    large: false, sort_order: 8, created_at: '',
  },
]

const CAT_LABELS: Record<string, string> = {
  all:         'All Categories',
  food:        'Food & Commodities',
  building:    'Building Materials',
  electronics: 'Electronics',
  industrial:  'Industrial Supplies',
  household:   'Household Goods',
  textiles:    'Textiles & Clothing',
  healthcare:  'Healthcare & Pharma',
  automotive:  'Automotive Parts',
}

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [category, setCategory] = useState('all')
  const [hovered, setHovered]   = useState<string | null>(null)

  useEffect(() => {
    const cached = cacheGet<Product[]>('products')
    if (cached) {
      setProducts(cached)
      setLoading(false)
      return
    }
    ;(async () => {
      const { data } = await supabase.from('products').select('*').order('sort_order')
      const result = data && data.length > 0 ? data as Product[] : FALLBACK
      cacheSet('products', result)
      setProducts(result)
      setLoading(false)
    })()
  }, [])

  const cats = ['all', ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = category === 'all' ? products : products.filter(p => p.category === category)

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/images/producthero.jpg"
            alt="Ratel General Trading product catalog"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(20,30,70,0.97) 30%, rgba(20,30,70,0.5) 100%)',
            }}
          />
        </div>
        <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-label text-gold mb-4">What We Trade</div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
              Products & Catalog
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              A broad range of quality goods available for import, export, and
              wholesale distribution across global markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-4">
            {cats.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="relative flex-shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200"
                style={
                  category === cat
                    ? { background: '#2C3E6B', color: '#fff' }
                    : { background: '#f3f4f6', color: '#374151' }
                }
              >
                <span className="relative z-10">{CAT_LABELS[cat] ?? cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Skeleton loading */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                    className={`group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gold/40 hover:shadow-xl transition-all duration-300 flex flex-col ${
                      product.large ? 'md:col-span-2' : ''
                    }`}
                    onMouseEnter={() => setHovered(product.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden aspect-[3/2]"
                    >
                      <motion.img
                        src={product.image_url ?? '/images/supply.png'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        animate={{ scale: hovered === product.id ? 1.05 : 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(to top, rgba(20,30,70,0.8) 0%, rgba(20,30,70,0.1) 60%)',
                          opacity: hovered === product.id ? 1 : 0.7,
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-2xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                          style={{ background: '#C9A84C', color: '#1e2b55' }}
                        >
                          {CAT_LABELS[product.category] ?? product.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-xl font-serif font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {product.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-2xs font-semibold px-2.5 py-1 rounded bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-3 duration-200"
                        style={{ color: '#C9A84C' }}
                      >
                        Inquire About This Category <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-serif font-bold text-navy mb-2">No products found</h3>
              <p className="text-gray-400 text-sm">Try selecting a different category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CUSTOM ORDERS */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: '#2C3E6B' }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute left-0 inset-y-0 w-1" style={{ background: '#C9A84C' }} />
            <div className="relative px-10 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="section-label text-gold mb-4">Custom Orders</div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                  Don't See What You Need?
                </h2>
                <p className="text-white/65 text-sm leading-relaxed">
                  We source and trade a wide variety of goods beyond what is listed
                  here. Tell us what you are looking for and we will find it at the
                  right price, with reliable delivery.
                </p>
              </div>
              <Link to="/contact" className="btn-primary flex-shrink-0">
                Send an Inquiry <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}