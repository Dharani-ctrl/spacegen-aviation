'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Lock, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Default admin password (in production, use proper authentication)
  const DEFAULT_PASSWORD = 'spacegen@2024'

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (password === DEFAULT_PASSWORD) {
        // Set session/cookie in production
        localStorage.setItem('admin_authenticated', 'true')
        router.push('/admin/dashboard')
      } else {
        setError('Invalid password')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-border">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">SpaceGen Aviation Management</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter password"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Note: Default password is provided. Update this in production.
        </p>
      </Card>
    </div>
  )
}
