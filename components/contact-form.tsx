'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    schoolName: '',
    currentClass: '10',
    programInterest: 'Level 1',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiUrl}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to submit enquiry')
      }

      setSuccess(true)
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        schoolName: '',
        currentClass: '10',
        programInterest: 'Level 1',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 sm:p-12 max-w-3xl mx-auto rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-indigo-600" />

      <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">Start Your Journey</h3>
      <p className="text-gray-600 font-medium mb-10">Fill in your details and our training specialists will reach out shortly.</p>

      {success && (
        <div className="mb-8 p-6 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
          <div>
            <p className="font-black text-green-900 uppercase tracking-tight">Enquiry Received!</p>
            <p className="text-sm text-green-700 font-medium">We'll contact you at {formData.phone} within 24 hours.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={24} />
          <div>
            <p className="font-black text-red-900 uppercase tracking-tight">Something Went Wrong</p>
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row 1: Student & Parent Names */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="studentName" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
              Student Name <span className="text-blue-600">*</span>
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-medium"
              placeholder="Full name of student"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="parentName" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
              Parent/Guardian <span className="text-blue-600">*</span>
            </label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-medium"
              placeholder="Full name of parent"
            />
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
              Email Address <span className="text-blue-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-medium"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
              Contact Number <span className="text-blue-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-medium"
              placeholder="10-digit number"
            />
          </div>
        </div>

        {/* Row 3: School & Class */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="schoolName" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
              School Name <span className="text-blue-600">*</span>
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-medium"
              placeholder="Name of institute"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="currentClass" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
              Current Class <span className="text-blue-600">*</span>
            </label>
            <select
              id="currentClass"
              name="currentClass"
              value={formData.currentClass}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
            >
              <option value="">Select class</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
        </div>

        {/* Program Interest */}
        <div className="space-y-2">
          <label htmlFor="programInterest" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
            Desired Program <span className="text-blue-600">*</span>
          </label>
          <select
            id="programInterest"
            name="programInterest"
            value={formData.programInterest}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
          >
            <option value="Level 1">Level 1 - Foundation Program (40 hrs)</option>
            <option value="Level 2">Level 2 - Advanced Program (60+ hrs)</option>
            <option value="Both">Both Levels</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-[10px] font-black text-black uppercase tracking-widest pl-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white resize-none transition-all font-medium"
            placeholder="Tell us about your specific aviation interests..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white hover:bg-black transition-all disabled:opacity-50 py-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-blue-200 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Submit My Enquiry'
            )}
          </Button>
        </div>

        <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest italic">
          🔒 Secure submission. Your data is protected by SpaceGen.
        </p>
      </form>
    </div>
  )
}
