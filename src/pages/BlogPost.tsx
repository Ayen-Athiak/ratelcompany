import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Post } from '../types'

export default function BlogPost() {
  const { slug }                = useParams<{ slug: string }>()
  
  const [post, setPost]         = useState<Post | null>(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true)
        } else {
          setPost(data as Post)
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="space-y-4 w-full max-w-2xl px-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 px-6">
        <div className="text-5xl mb-4">📰</div>
        <h1 className="text-2xl font-serif font-bold text-navy mb-2">Post Not Found</h1>
        <p className="text-gray-400 text-sm mb-6">This article does not exist or has been removed.</p>
        <Link to="/blog" className="btn-primary">
          <ArrowLeft size={14} /> Back to News
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden pt-20">
        {post.cover_image ? (
          <>
            <img
              src={post.cover_image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(20,30,70,0.97) 40%, rgba(20,30,70,0.5) 100%)',
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1e2b55 0%, #2C3E6B 100%)' }}
          />
        )}
        <div className="absolute left-0 inset-y-0 w-1 bg-gold" />
        <div className="relative max-w-4xl mx-auto px-6 pb-16 z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-gold text-xs font-semibold uppercase tracking-wider transition-colors mb-6"
          >
            <ArrowLeft size={13} /> Back to News
          </Link>
          <div className="text-2xs font-bold uppercase tracking-widest text-gold mb-3">
            {new Date(post.created_at).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-white/60 max-w-2xl leading-relaxed text-base">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((para, i) => (
              para.trim() ? (
                <p
                  key={i}
                  className="text-gray-600 leading-relaxed mb-6 text-base"
                >
                  {para.trim()}
                </p>
              ) : null
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-12">
            <div className="flex-1 h-px bg-gray-100" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* CTA */}
          <div
            className="rounded-xl p-8 text-center relative overflow-hidden"
            style={{ background: '#2C3E6B' }}
          >
            <div className="absolute left-0 inset-y-0 w-1" style={{ background: '#C9A84C' }} />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative z-10">
              <div className="section-label justify-center text-gold mb-3">Ready to Trade?</div>
              <h3 className="text-2xl font-serif font-bold text-white mb-3">
                Get in Touch With Our Team
              </h3>
              <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                Whether you need to source goods, find export markets, or build a
                supply chain partnership, we are ready to help.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/contact" className="btn-primary">
                  Get a Quote <ArrowRight size={14} />
                </Link>
                <Link to="/services" className="btn-ghost-white">
                  Our Services
                </Link>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
