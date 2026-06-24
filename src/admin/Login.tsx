import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) setError('Invalid email or password.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#1e2b55' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <span className="font-serif font-bold text-gold text-2xl">R</span>
          </div>
          <h1 className="text-xl font-serif font-bold text-white">Ratel Admin</h1>
          <p className="text-white/45 text-sm mt-1">Sign in to manage your site</p>
        </div>

        <div className="bg-white rounded-xl p-8">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@rateltrading.com" required />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
