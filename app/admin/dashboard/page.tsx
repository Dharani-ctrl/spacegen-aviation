'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Calendar, Trash2, CheckCircle, Clock, Edit, List, Save, Layout, Plus, X, Image as ImageIcon, Rocket, Globe, Lightbulb, Zap, BookOpen } from 'lucide-react'

interface Enquiry {
  studentName: string
  parentName: string
  email: string
  phone: string
  schoolName: string
  currentClass: string
  programInterest: string
  message: string
  status: string
  createdAt: string
  _id: string
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'enquiries' | 'content'>('enquiries')
  const [content, setContent] = useState<any>({
    hero: { title: '', subtitle: '', image: '' },
    about: { title: '', description: '', description2: '', image: '' },
    programs: { title: '', subtitle: '', programs: [] },
    features: { title: '', subtitle: '', features: [], benefits: [], stats: [] },
    gallery: { title: '', subtitle: '', images: [] }
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      window.location.href = '/admin'
      return
    }

    const fetchEnquiries = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/enquiries`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setEnquiries(data.enquiries || [])
        }
      } catch (error) {
        console.error('Failed to fetch enquiries:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content`)
        if (response.ok) {
          const result = await response.json()
          const items = result.data || []
          const contentMap: any = {}
          items.forEach((item: any) => {
            contentMap[item.section] = item.data
          })
          setContent((prev: any) => ({ ...prev, ...contentMap }))
        }
      } catch (error) {
        console.error('Failed to fetch content:', error)
      }
    }

    fetchEnquiries()
    fetchContent()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string, programIdx?: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    const uploadKey = programIdx !== undefined ? `${section}-${programIdx}` : section
    setUploading(uploadKey)

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        if (section === 'programs' && programIdx !== undefined) {
          const list = [...content.programs.programs]
          list[programIdx].image = data.url
          setContent({ ...content, programs: { ...content.programs, programs: list } })
        } else if (section === 'gallery' && programIdx !== undefined) {
          const list = [...content.gallery.images]
          list[programIdx].url = data.url
          setContent({ ...content, gallery: { ...content.gallery, images: list } })
        } else {
          setContent({ ...content, [section]: { ...content[section], image: data.url } })
        }
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image')
    } finally {
      setUploading(null)
    }
  }

  const handleSaveContent = async (section: string) => {
    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: content[section] })
      })
      if (response.ok) {
        alert(`${section} updated successfully!`)
      } else {
        alert('Failed to update content. Please check permissions.')
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('An error occurred while saving.')
    } finally {
      setSaving(false)
    }
  }

  const filteredEnquiries = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'contacted': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'reviewed': return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-200'
      default: return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    let nextStatus = 'contacted'
    if (currentStatus === 'contacted') nextStatus = 'reviewed'
    else if (currentStatus === 'reviewed') nextStatus = 'new'

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      })
      if (response.ok) {
        setEnquiries(enquiries.map(e => e._id === id ? { ...e, status: nextStatus } : e))
      }
    } catch (error) {
      console.error('Status update error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      try {
        const token = localStorage.getItem('admin_token')
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/enquiries/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          setEnquiries(enquiries.filter(e => e._id !== id))
        }
      } catch (error) {
        console.error('Delete error:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">
              Dashboard <span className="text-blue-600">Admin</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              {activeTab === 'enquiries' ? 'Student Enrollment & Inquiry Management' : 'Global Website Content & Asset Control'}
            </p>
          </div>
          <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
            <div className="flex min-w-max">
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'enquiries' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <List size={18} />
                Enquiries
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'content' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Layout size={18} />
                Edit Content
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="p-4 md:p-6 border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                <List size={24} />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-slate-900">{enquiries.length}</div>
                <p className="text-xs md:text-sm text-slate-500 font-medium">Total Enquiries</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6 border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                <Plus size={24} />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-emerald-600">{enquiries.filter(e => e.status === 'new').length}</div>
                <p className="text-xs md:text-sm text-slate-500 font-medium">New Inbox</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6 border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-purple-600">{enquiries.filter(e => e.status === 'reviewed').length}</div>
                <p className="text-xs md:text-sm text-slate-500 font-medium">Processed</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6 border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 md:gap-4 text-center sm:text-left">
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                <X size={24} />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-slate-400">{enquiries.filter(e => e.status === 'rejected').length}</div>
                <p className="text-xs md:text-sm text-slate-500 font-medium">Rejected</p>
              </div>
            </div>
          </Card>
        </div>

        {activeTab === 'enquiries' ? (
          <>
            {/* Filters */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {['all', 'new', 'contacted', 'reviewed', 'rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${filter === status
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
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
                filteredEnquiries.map((enquiry: any) => (
                  <Card key={enquiry._id} className="p-5 md:p-8 border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl group">
                    <div className="grid gap-6 lg:grid-cols-4 items-start">
                      {/* Left - Contact Info */}
                      <div className="space-y-4 lg:col-span-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h3 className="font-black text-xl text-slate-900">{enquiry.studentName}</h3>
                            <div className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(enquiry.status)}`}>
                              {enquiry.status}
                            </div>
                          </div>
                          <p className="text-sm text-slate-500 font-semibold">{enquiry.schoolName}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                              <Mail size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Email</p>
                              <a href={`mailto:${enquiry.email}`} className="text-sm font-bold text-slate-700 hover:text-blue-600 truncate block">
                                {enquiry.email}
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                              <Phone size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Phone</p>
                              <a href={`tel:${enquiry.phone}`} className="text-sm font-bold text-slate-700 hover:text-emerald-600 truncate block">
                                {enquiry.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle - Details */}
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Program Interest</p>
                          <p className="text-sm font-bold text-slate-700 py-1 px-3 rounded-lg bg-slate-100 inline-block border border-slate-200">{enquiry.programInterest}</p>
                        </div>
                        <div className="flex justify-between lg:flex-col gap-4">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Class</p>
                            <p className="text-sm font-bold text-slate-700">{enquiry.currentClass || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Date</p>
                            <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                              <Calendar size={14} className="text-slate-400 shrink-0" />
                              {new Date(enquiry.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right - Actions */}
                      <div className="flex sm:flex-row lg:flex-col gap-2 items-stretch lg:items-center justify-end lg:justify-start">
                        <Button
                          size="lg"
                          className={`flex-1 lg:w-full font-black text-xs uppercase tracking-widest h-12 rounded-xl shadow-sm transition-all ${
                            enquiry.status === 'new' 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200' 
                              : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                          }`}
                          onClick={() => handleStatusUpdate(enquiry._id, enquiry.status)}
                        >
                          <CheckCircle size={16} className="mr-2 shrink-0" />
                          <span className="truncate">{enquiry.status === 'new' ? 'Reach Out' : 'Update Task'}</span>
                        </Button>
                        <Button
                          size="lg"
                          variant="ghost"
                          className="px-4 lg:w-full h-12 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          onClick={() => handleDelete(enquiry._id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>

                    {enquiry.message && (
                      <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 border-dashed">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Mail size={12} /> Message from Student
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{enquiry.message}"</p>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="grid gap-8">
            {/* HERO SECTION EDITOR */}
            <Card className="p-6 md:p-8 border-slate-200 bg-white shadow-sm rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Hero Section</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Main Landing Content</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveContent('hero')} 
                  disabled={saving}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 px-6 h-12 rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving...' : 'Publish Changes'}
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Main Headline</label>
                    <input
                      type="text"
                      value={content.hero?.title || ''}
                      onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-700 font-bold transition-all"
                      placeholder="Enter main headline..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Supportive Subtitle</label>
                    <input
                      type="text"
                      value={content.hero?.subtitle || ''}
                      onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-700 font-medium transition-all"
                      placeholder="Enter supporting text..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Featured Visual</label>
                  <div className="relative group rounded-3xl overflow-hidden border-2 border-slate-100 bg-slate-50 aspect-video flex items-center justify-center">
                    {content.hero?.image ? (
                      <>
                        <img src={content.hero.image} alt="Hero" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            variant="secondary" 
                            className="bg-white/90 hover:bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-xl"
                            onClick={() => document.getElementById('hero-upload')?.click()}
                          >
                            <ImageIcon size={18} className="mr-2" /> Change Image
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button 
                        variant="ghost" 
                        className="flex flex-col gap-3 h-full w-full hover:bg-slate-100 text-slate-400"
                        onClick={() => document.getElementById('hero-upload')?.click()}
                      >
                        <Plus size={32} />
                        <span className="font-black text-xs uppercase tracking-widest">Upload Hero Image</span>
                      </Button>
                    )}
                    {uploading === 'hero' && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <Clock className="animate-spin text-blue-600" size={32} />
                      </div>
                    )}
                    <input
                      type="file"
                      id="hero-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'hero')}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* ABOUT SECTION EDITOR */}
            <Card className="p-6 md:p-8 border-slate-200 bg-white shadow-sm rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">About Section</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Our Story & Mission</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveContent('about')} 
                  disabled={saving}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 px-6 h-12 rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving...' : 'Update Mission'}
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Section Heading</label>
                    <input
                      type="text"
                      value={content.about?.title || ''}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-700 font-bold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Description</label>
                    <textarea
                      rows={4}
                      value={content.about?.description || ''}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, description: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-700 font-medium transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Additional Description</label>
                    <textarea
                      rows={4}
                      value={content.about?.description2 || ''}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, description2: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-700 font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Story Visual</label>
                  <div className="relative group rounded-3xl overflow-hidden border-2 border-slate-100 bg-slate-50 aspect-video flex items-center justify-center">
                    {content.about?.image ? (
                      <>
                        <img src={content.about.image} alt="About" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            variant="secondary" 
                            className="bg-white/90 hover:bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-xl"
                            onClick={() => document.getElementById('about-upload')?.click()}
                          >
                            <ImageIcon size={18} className="mr-2" /> Change Photo
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button 
                        variant="ghost" 
                        className="flex flex-col gap-3 h-full w-full hover:bg-slate-100 text-slate-400"
                        onClick={() => document.getElementById('about-upload')?.click()}
                      >
                        <Plus size={32} />
                        <span className="font-black text-xs uppercase tracking-widest">Upload Image</span>
                      </Button>
                    )}
                    {uploading === 'about' && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <Clock className="animate-spin text-emerald-600" size={32} />
                      </div>
                    )}
                    <input
                      type="file"
                      id="about-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'about')}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* PROGRAMS SECTION EDITOR */}
            <Card className="p-6 md:p-8 border-slate-200 bg-white shadow-sm rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Programs</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Courses & Training Levels</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveContent('programs')} 
                  disabled={saving}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 px-6 h-12 rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving...' : 'Publish Programs'}
                </Button>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Section Heading</label>
                    <input
                      type="text"
                      value={content.programs?.title || ''}
                      onChange={(e) => setContent({ ...content, programs: { ...content.programs, title: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Intro Text</label>
                    <input
                      type="text"
                      value={content.programs?.subtitle || ''}
                      onChange={(e) => setContent({ ...content, programs: { ...content.programs, subtitle: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Program Inventory</h3>
                    <Button 
                      size="sm" 
                      className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-4 font-black text-[10px] uppercase tracking-widest h-10"
                      onClick={() => {
                        const newProg = { level: 'Level X', title: 'New Program', subtitle: '', duration: '', target: '', price: '', features: [], image: '' }
                        const list = content.programs?.programs || []
                        setContent({ ...content, programs: { ...content.programs, programs: [...list, newProg] } })
                      }}
                    >
                      <Plus size={14} className="mr-2" /> Add Program Profile
                    </Button>
                  </div>

                  <div className="grid gap-8">
                    {(content.programs?.programs || []).map((prog: any, idx: number) => (
                      <div key={idx} className="p-5 md:p-8 border border-slate-200 bg-white rounded-3xl relative group shadow-sm hover:shadow-md transition-all">
                        <button 
                          onClick={() => {
                            const filtered = content.programs.programs.filter((_: any, i: number) => i !== idx)
                            setContent({ ...content, programs: { ...content.programs, programs: filtered } })
                          }}
                          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all z-10"
                        >
                          <Trash2 size={18} />
                        </button>
                        
                        <div className="grid lg:grid-cols-3 gap-8">
                          {/* Program Image */}
                          <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Program Thumb</label>
                            <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group/img relative">
                              {prog.image ? (
                                <>
                                  <img src={prog.image} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button 
                                      size="sm" 
                                      className="bg-white/90 hover:bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl"
                                      onClick={() => document.getElementById(`prog-upload-${idx}`)?.click()}
                                    >
                                      Change Photo
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  className="flex flex-col gap-2 h-full w-full hover:bg-slate-100 text-slate-400"
                                  onClick={() => document.getElementById(`prog-upload-${idx}`)?.click()}
                                >
                                  <Plus size={24} />
                                  <span className="font-black text-[10px] uppercase tracking-widest">Add Thumbnail</span>
                                </Button>
                              )}
                              {uploading === `programs-${idx}` && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                  <Clock className="animate-spin text-indigo-600" size={24} />
                                </div>
                              )}
                              <input
                                type="file"
                                id={`prog-upload-${idx}`}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'programs', idx)}
                              />
                            </div>
                            <input 
                              placeholder="Direct Image URL"
                              value={prog.image}
                              onChange={(e) => {
                                const list = [...content.programs.programs]
                                list[idx].image = e.target.value
                                setContent({ ...content, programs: { ...content.programs, programs: list } })
                              }}
                              className="w-full text-[10px] font-bold text-slate-400 bg-transparent border-b border-transparent hover:border-slate-200 outline-none p-1 transition-all"
                            />
                          </div>

                          <div className="lg:col-span-2 grid gap-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest leading-none">Profile Title</label>
                                <input 
                                  placeholder="e.g. Amateur Pilot Licence"
                                  value={prog.title}
                                  onChange={(e) => {
                                    const list = [...content.programs.programs]
                                    list[idx].title = e.target.value
                                    setContent({ ...content, programs: { ...content.programs, programs: list } })
                                  }}
                                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-black text-slate-800 focus:border-indigo-500 outline-none text-sm transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest leading-none">Difficulty</label>
                                <input 
                                  placeholder="e.g. Level 1"
                                  value={prog.level}
                                  onChange={(e) => {
                                    const list = [...content.programs.programs]
                                    list[idx].level = e.target.value
                                    setContent({ ...content, programs: { ...content.programs, programs: list } })
                                  }}
                                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-indigo-600 focus:border-indigo-500 outline-none text-sm transition-all"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest leading-none">Program Summary</label>
                              <textarea 
                                placeholder="Short overview of the course curriculum..."
                                value={prog.subtitle}
                                onChange={(e) => {
                                  const list = [...content.programs.programs]
                                  list[idx].subtitle = e.target.value
                                  setContent({ ...content, programs: { ...content.programs, programs: list } })
                                }}
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm h-16 resize-none outline-none focus:border-indigo-500 transition-all font-medium text-slate-600"
                              />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest leading-none text-blue-400">Duration</label>
                                <input placeholder="e.g. 6 Months" value={prog.duration} onChange={(e) => {
                                  const list = [...content.programs.programs]
                                  list[idx].duration = e.target.value
                                  setContent({ ...content, programs: { ...content.programs, programs: list } })
                                }} className="w-full bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs font-bold text-blue-700 outline-none" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest leading-none text-emerald-400">Enrollment Fee</label>
                                <input placeholder="e.g. $299" value={prog.price} onChange={(e) => {
                                  const list = [...content.programs.programs]
                                  list[idx].price = e.target.value
                                  setContent({ ...content, programs: { ...content.programs, programs: list } })
                                }} className="w-full bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-xs font-bold text-emerald-700 outline-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* FEATURES SECTION EDITOR */}
            <Card className="p-6 md:p-8 border-slate-200 bg-white shadow-sm rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Core Features</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Selling Points & Stats</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveContent('features')} 
                  disabled={saving}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200 px-6 h-12 rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving...' : 'Publish Features'}
                </Button>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest leading-none">Main Heading</label>
                    <input
                      placeholder="Main Title"
                      value={content.features?.title || ''}
                      onChange={(e) => setContent({ ...content, features: { ...content.features, title: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-700 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest leading-none">Support Text</label>
                    <input
                      placeholder="Section Subtitle..."
                      value={content.features?.subtitle || ''}
                      onChange={(e) => setContent({ ...content, features: { ...content.features, subtitle: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Growth Benefits</h3>
                      <Button size="sm" variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-black text-[10px] uppercase h-10 px-4" onClick={() => {
                        const list = [...(content.features?.benefits || []), 'New Benefit']
                        setContent({ ...content, features: { ...content.features, benefits: list } })
                      }}>
                        <Plus size={14} className="mr-2" /> Add Item
                      </Button>
                   </div>
                   <div className="grid border border-slate-100 rounded-3xl overflow-hidden shadow-inner bg-slate-50/50">
                      {(content.features?.benefits || []).map((ben: string, idx: number) => (
                        <div key={idx} className="flex gap-2 p-3 border-b border-slate-100 last:border-0 hover:bg-white transition-colors group">
                           <input 
                             value={ben} 
                             onChange={(e) => {
                               const list = [...content.features.benefits]
                               list[idx] = e.target.value
                               setContent({ ...content, features: { ...content.features, benefits: list } })
                             }}
                             className="flex-1 bg-transparent p-2 rounded-lg text-sm font-bold text-slate-700 outline-none"
                           />
                           <button 
                             onClick={() => {
                               const list = content.features.benefits.filter((_: any, i: number) => i !== idx)
                               setContent({ ...content, features: { ...content.features, benefits: list } })
                             }}
                             className="p-2 text-muted-foreground hover:text-destructive"
                           >
                             <Trash2 size={14} />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Key Performance Stats</h3>
                      <Button size="sm" variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-black text-[10px] uppercase h-10 px-4" onClick={() => {
                        const list = [...(content.features?.stats || []), { value: '0', label: 'New Stat' }]
                        setContent({ ...content, features: { ...content.features, stats: list } })
                      }}>
                        <Plus size={14} className="mr-2" /> Add Metric
                      </Button>
                   </div>
                   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(content.features?.stats || []).map((stat: any, idx: number) => (
                        <div key={idx} className="p-6 border border-slate-200 bg-white shadow-sm rounded-2xl relative group">
                           <button 
                             onClick={() => {
                               const list = content.features.stats.filter((_: any, i: number) => i !== idx)
                               setContent({ ...content, features: { ...content.features, stats: list } })
                             }}
                             className="absolute top-4 right-4 text-slate-400 hover:text-rose-600 transition-colors"
                           >
                             <Trash2 size={16} />
                           </button>
                           <div className="space-y-3">
                              <input 
                                value={stat.value} 
                                onChange={(e) => {
                                  const list = [...content.features.stats]
                                  list[idx].value = e.target.value
                                  setContent({ ...content, features: { ...content.features, stats: list } })
                                }}
                                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xl font-black text-orange-600 outline-none"
                              />
                              <input 
                                value={stat.label} 
                                onChange={(e) => {
                                  const list = [...content.features.stats]
                                  list[idx].label = e.target.value
                                  setContent({ ...content, features: { ...content.features, stats: list } })
                                }}
                                className="w-full bg-transparent p-1 rounded-lg text-xs font-black uppercase tracking-widest text-slate-400 outline-none"
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </Card>

            {/* GALLERY SECTION EDITOR */}
            <Card className="p-6 md:p-8 border-slate-200 bg-white shadow-sm rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                    <ImageIcon size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Gallery Control</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Immersive Aviation Visuals</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveContent('gallery')} 
                  disabled={saving}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 px-6 h-12 rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving...' : 'Publish Gallery'}
                </Button>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest leading-none">Main Heading</label>
                    <input
                      placeholder="Gallery Title..."
                      value={content.gallery?.title || ''}
                      onChange={(e) => setContent({ ...content, gallery: { ...content.gallery, title: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-700 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest leading-none">Introductory Subtitle</label>
                    <input
                      placeholder="Short description of the gallery..."
                      value={content.gallery?.subtitle || ''}
                      onChange={(e) => setContent({ ...content, gallery: { ...content.gallery, subtitle: e.target.value } })}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Asset Management</h3>
                    <Button 
                      size="sm" 
                      className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-4 font-black text-[10px] uppercase tracking-widest h-10"
                      onClick={() => {
                        const newImg = { url: '', title: 'New Vision', description: '' }
                        const list = content.gallery?.images || []
                        setContent({ ...content, gallery: { ...content.gallery, images: [...list, newImg] } })
                      }}
                    >
                      <Plus size={14} className="mr-2" /> Add New Visual
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(content.gallery?.images || []).map((img: any, idx: number) => (
                      <div key={idx} className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="aspect-[4/3] bg-slate-50 relative flex items-center justify-center overflow-hidden">
                          {img.url ? (
                            <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <ImageIcon className="text-slate-200" size={48} />
                          )}
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <Button 
                               size="sm" 
                               className="bg-white text-slate-900 font-black text-[10px] uppercase rounded-xl"
                               onClick={() => document.getElementById(`gallery-upload-${idx}`)?.click()}
                             >
                               Update
                             </Button>
                             <Button 
                               size="sm" 
                               className="bg-rose-600 text-white font-black text-[10px] uppercase rounded-xl"
                               onClick={() => {
                                 const filtered = content.gallery.images.filter((_: any, i: number) => i !== idx)
                                 setContent({ ...content, gallery: { ...content.gallery, images: filtered } })
                               }}
                             >
                               Delete
                             </Button>
                          </div>
                          {uploading === `gallery-${idx}` && (
                             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                               <Clock className="animate-spin text-blue-600" size={24} />
                             </div>
                          )}
                          <input
                            type="file"
                            id={`gallery-upload-${idx}`}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'gallery', idx)}
                          />
                        </div>
                        <div className="p-4 space-y-3">
                          <input 
                            placeholder="Visual Title"
                            value={img.title}
                            onChange={(e) => {
                              const list = [...content.gallery.images]
                              list[idx].title = e.target.value
                              setContent({ ...content, gallery: { ...content.gallery, images: list } })
                            }}
                            className="w-full bg-slate-50 border border-slate-100 p-2 rounded-xl text-sm font-black text-slate-800 outline-none focus:border-blue-500 transition-all"
                          />
                          <input 
                            placeholder="Alt text or path"
                            value={img.url}
                            onChange={(e) => {
                              const list = [...content.gallery.images]
                              list[idx].url = e.target.value
                              setContent({ ...content, gallery: { ...content.gallery, images: list } })
                            }}
                            className="w-full bg-transparent p-1 rounded-lg text-[10px] font-bold text-slate-400 outline-none border-b border-transparent hover:border-slate-100 transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
