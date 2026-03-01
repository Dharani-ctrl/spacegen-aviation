'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react'

interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  schoolName: string
  studentClass: string
  programLevel: string
  message: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('/api/enquiries')
        if (response.ok) {
          const data = await response.json()
          setEnquiries(data)
        }
      } catch (error) {
        console.error('Failed to fetch enquiries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [])

  const filteredEnquiries = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-900/30 text-blue-400 border-blue-500/50'
      case 'contacted':
        return 'bg-green-900/30 text-green-400 border-green-500/50'
      case 'closed':
        return 'bg-gray-900/30 text-gray-400 border-gray-500/50'
      default:
        return 'bg-blue-900/30 text-blue-400 border-blue-500/50'
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      setEnquiries(enquiries.filter(e => e.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage student enquiries and applications</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6 border-border">
            <div className="text-3xl font-bold text-primary">{enquiries.length}</div>
            <p className="text-sm text-muted-foreground">Total Enquiries</p>
          </Card>
          <Card className="p-6 border-border">
            <div className="text-3xl font-bold text-green-400">{enquiries.filter(e => e.status === 'new').length}</div>
            <p className="text-sm text-muted-foreground">New</p>
          </Card>
          <Card className="p-6 border-border">
            <div className="text-3xl font-bold text-blue-400">{enquiries.filter(e => e.status === 'contacted').length}</div>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </Card>
          <Card className="p-6 border-border">
            <div className="text-3xl font-bold text-gray-400">{enquiries.filter(e => e.status === 'closed').length}</div>
            <p className="text-sm text-muted-foreground">Closed</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'new', 'contacted', 'closed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:border-primary/50'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Enquiries List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center border-border">
              <p className="text-muted-foreground">Loading enquiries...</p>
            </Card>
          ) : filteredEnquiries.length === 0 ? (
            <Card className="p-8 text-center border-border">
              <p className="text-muted-foreground">No enquiries found</p>
            </Card>
          ) : (
            filteredEnquiries.map(enquiry => (
              <Card key={enquiry.id} className="p-6 border-border hover:border-primary/50 transition-colors">
                <div className="grid gap-6 md:grid-cols-4 items-start">
                  {/* Left - Contact Info */}
                  <div className="space-y-3 col-span-2">
                    <div>
                      <h3 className="font-semibold text-lg">{enquiry.name}</h3>
                      <p className="text-sm text-muted-foreground">{enquiry.schoolName}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={16} className="text-primary flex-shrink-0" />
                        <a href={`mailto:${enquiry.email}`} className="text-primary hover:underline">
                          {enquiry.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={16} className="text-primary flex-shrink-0" />
                        <a href={`tel:${enquiry.phone}`} className="text-primary hover:underline">
                          {enquiry.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Middle - Details */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Program</p>
                      <p className="text-sm font-medium">{enquiry.programLevel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Class</p>
                      <p className="text-sm font-medium">{enquiry.studentClass || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Date</p>
                      <p className="text-sm font-medium">{new Date(enquiry.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Right - Status & Actions */}
                  <div className="flex flex-col gap-3 md:items-end">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(enquiry.status)}`}>
                      {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        {enquiry.status === 'new' ? 'Mark Contacted' : enquiry.status === 'contacted' ? 'Mark Closed' : 'Reopen'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(enquiry.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {enquiry.message && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Message</p>
                    <p className="text-sm text-muted-foreground">{enquiry.message}</p>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
