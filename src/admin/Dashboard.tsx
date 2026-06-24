import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { resolveRole, ROLE_TABS, ROLE_ACTIONS, ROLE_LABELS, type Role } from '../lib/roles'
import type { Quote, Product, Post, TeamMember } from '../types'
import { LogOut, Mail, Package, FileText, Users, RefreshCw, CheckCircle, Clock, Eye, EyeOff, ShieldCheck } from 'lucide-react'

type Tab = 'quotes' | 'products' | 'posts' | 'team'

const ALL_TABS: { id: Tab; label: string; Icon: typeof Mail }[] = [
  { id: 'quotes',   label: 'Quote Requests', Icon: Mail },
  { id: 'products', label: 'Products',        Icon: Package },
  { id: 'posts',    label: 'Blog Posts',      Icon: FileText },
  { id: 'team',     label: 'Team',            Icon: Users },
]

const STATUS_STYLES: Record<string, string> = {
  new:     'bg-gold/10 text-gold-700 border border-gold/30',
  read:    'bg-gray-100 text-gray-500',
  replied: 'bg-green-50 text-green-700',
}

export default function Dashboard() {
  const [role, setRole]       = useState<Role>('viewer')
  const [userEmail, setUserEmail] = useState('')
  const [tab, setTab]         = useState<Tab>('quotes')
  const [quotes, setQuotes]   = useState<Quote[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [posts, setPosts]     = useState<Post[]>([])
  const [team, setTeam]       = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const r = resolveRole(data.user?.user_metadata)
      setRole(r)
      setUserEmail(data.user?.email ?? '')
      // set default tab to first allowed tab for this role
      const allowed = ROLE_TABS[r]
      setTab(allowed[0] as Tab)
    })
  }, [])

  const TABS = ALL_TABS.filter(t => ROLE_TABS[role].includes(t.id))
  const actions = ROLE_ACTIONS[role]

  const load = useCallback(async () => {
    setLoading(true)
    if (tab === 'quotes')   { const { data } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });   setQuotes(data as Quote[] ?? []) }
    if (tab === 'products') { const { data } = await supabase.from('products').select('*').order('sort_order');                         setProducts(data as Product[] ?? []) }
    if (tab === 'posts')    { const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });     setPosts(data as Post[] ?? []) }
    if (tab === 'team')     { const { data } = await supabase.from('team').select('*').order('sort_order');                             setTeam(data as TeamMember[] ?? []) }
    setLoading(false)
  }, [tab])

  useEffect(() => { load() }, [load])

  const markRead = async (id: string) => {
    await supabase.from('quotes').update({ status: 'read' }).eq('id', id)
    load()
  }

  const togglePublish = async (post: Post) => {
    await supabase.from('posts').update({ published: !post.published }).eq('id', post.id)
    load()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div style={{ background: '#2C3E6B' }} className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="font-serif font-bold text-gold text-sm">R</span>
            </div>
            <span className="text-white font-semibold text-sm">Ratel Admin</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-bold uppercase tracking-wider" style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}>
              <ShieldCheck size={11} /> {ROLE_LABELS[role]}
            </div>
          </div>
          <span className="text-white/30 text-xs hidden md:block">{userEmail}</span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs transition-colors"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit mb-8">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                tab === id ? 'bg-navy text-white' : 'text-gray-500 hover:text-navy'
              }`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif font-bold text-navy text-xl">
            {TABS.find(t => t.id === tab)?.label}
          </h2>
          <button onClick={load} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-navy transition-colors">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-navy animate-spin" />
          </div>
        ) : (
          <>
            {/* QUOTES */}
            {tab === 'quotes' && (
              <div className="space-y-3">
                {quotes.length === 0 && <EmptyState message="No quote requests yet." />}
                {quotes.map(q => (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl border p-6 ${q.status === 'new' ? 'border-gold/40' : 'border-gray-100'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-semibold text-navy text-sm">{q.name}</span>
                          <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_STYLES[q.status ?? 'new']}`}>
                            {q.status ?? 'new'}
                          </span>
                          <span className="text-2xs text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {new Date(q.created_at ?? '').toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                          <span>✉ {q.email}</span>
                          {q.phone && <span>📞 {q.phone}</span>}
                          {q.company && <span>🏢 {q.company}</span>}
                          <span className="font-medium text-navy">📋 {q.inquiry_type}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{q.message}</p>
                      </div>
                      {q.status === 'new' && actions.markRead && (
                        <button
                          onClick={() => markRead(q.id!)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-700 flex-shrink-0 transition-colors"
                        >
                          <CheckCircle size={13} /> Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PRODUCTS */}
            {tab === 'products' && (
              <div>
                {products.length === 0 && <EmptyState message="No products yet. Add them in the Supabase Table Editor." />}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {products.map(p => (
                    <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-5 text-center hover:border-gold/30 transition-colors">
                      <div className="text-3xl mb-2">
                        {{'food':'🌾','building':'🏗️','electronics':'📱','industrial':'⚙️','household':'🏠','textiles':'👗','healthcare':'💊','automotive':'🚗'}[p.category] ?? '📦'}
                      </div>
                      <div className="font-semibold text-navy text-sm">{p.name}</div>
                      <div className="text-2xs text-gold font-medium mt-1">{p.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* POSTS */}
            {tab === 'posts' && (
              <div className="space-y-3">
                {posts.length === 0 && <EmptyState message="No blog posts yet. Add them in the Supabase Table Editor." />}
                {posts.map(p => (
                  <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-gray-200 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-navy text-sm">{p.title}</span>
                        <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {p.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{p.excerpt}</p>
                      <span className="text-2xs text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> {new Date(p.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {actions.togglePublish && (
                      <button
                        onClick={() => togglePublish(p)}
                        className="flex items-center gap-1.5 text-xs font-semibold flex-shrink-0 transition-colors hover:text-navy text-gray-400"
                      >
                        {p.published ? <><EyeOff size={13} /> Unpublish</> : <><Eye size={13} /> Publish</>}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TEAM */}
            {tab === 'team' && (
              <div className="grid md:grid-cols-3 gap-4">
                {team.length === 0 && <div className="col-span-3"><EmptyState message="No team members yet. Add them in the Supabase Table Editor." /></div>}
                {team.map(m => (
                  <div key={m.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-gold/30 transition-colors">
                    {m.photo_url && (
                      <img src={m.photo_url} alt={m.name} className="w-14 h-14 rounded-full object-cover mb-4" />
                    )}
                    <div className="font-serif font-bold text-navy">{m.name}</div>
                    <div className="text-gold text-xs font-semibold mt-0.5">{m.role}</div>
                    <div className="text-gray-400 text-2xs mt-0.5">{m.department}</div>
                    <p className="text-xs text-gray-500 leading-relaxed mt-3">{m.bio}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-xl border border-gray-100">
      {message}
    </div>
  )
}
