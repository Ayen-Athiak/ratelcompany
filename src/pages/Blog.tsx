import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { cacheGet, cacheSet } from '../lib/cache'
import type { Post } from '../types'

const PAGE_SIZE = 9

export default function Blog() {
  const [posts, setPosts]     = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(0)
  const [total, setTotal]     = useState(0)

  useEffect(() => {
    const cacheKey = `blog_page_${page}`
    const cached = cacheGet<{ posts: Post[]; total: number }>(cacheKey)

    if (cached) {
      setPosts(cached.posts)
      setTotal(cached.total)
      setLoading(false)
      return
    }

    setLoading(true)

    const from = page * PAGE_SIZE
    const to   = from + PAGE_SIZE - 1

    supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to)
      .then(({ data, count }) => {
        const result = { posts: (data as Post[]) ?? [], total: count ?? 0 }
        cacheSet(cacheKey, result)
        setPosts(result.posts)
        setTotal(result.total)
        setLoading(false)
      })
  }, [page])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <>
      <section className="relative pt-20 min-h-[55vh] flex items-end" style={{ background: '#1e2b55' }}>
        <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
        <div className="relative max-w-7xl mx-auto px-6 pb-16 z-10">
          <div className="section-label text-gold mb-4">News & Insights</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4">News & Blog</h1>
          <p className="text-white/60 max-w-xl leading-relaxed">Updates, trade insights, and news from Ratel General Trading.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-gold animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">📰</div>
              <h3 className="text-xl font-serif font-bold text-navy mb-2">No posts yet</h3>
              <p className="text-gray-400 text-sm">Check back soon for news and updates.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {posts.map(post => (
                  <article key={post.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gold/30 hover:shadow-md transition-all group">
                    {post.cover_image && (
                      <div className="aspect-[3/2] overflow-hidden">
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <h2 className="text-lg font-serif font-bold text-navy mb-2 group-hover:text-gold transition-colors leading-snug">{post.title}</h2>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-gold uppercase tracking-wider hover:gap-2.5 transition-all">
                        Read more <ArrowRight size={12} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12">
                  <button
                    onClick={() => setPage(p => p - 1)}
                    disabled={page === 0}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className="w-9 h-9 rounded-lg text-xs font-bold transition-all"
                      style={
                        page === i
                          ? { background: '#2C3E6B', color: '#fff' }
                          : { background: '#f3f4f6', color: '#6b7280' }
                      }
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page === totalPages - 1}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
