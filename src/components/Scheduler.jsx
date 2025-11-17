import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Scheduler() {
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSchedule = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/schedule`)
      const data = await res.json()
      setBlocks(data.blocks || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedule()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Today&apos;s Plan</h2>
        <button onClick={fetchSchedule} className="px-3 py-2 rounded-lg bg-gray-900 text-white">Refresh</button>
      </div>
      {loading && <p className="text-gray-500 mt-4">Generating schedule...</p>}
      <div className="mt-6 space-y-3">
        {blocks.map((b, idx) => (
          <div key={idx} className={`rounded-lg p-4 border ${b.type === 'task' ? 'bg-blue-50 border-blue-200' : b.type === 'break' ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <div className="text-sm text-gray-600">{new Date(b.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(b.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="font-semibold text-gray-900">{b.title}</div>
            {b.priority && <div className="text-xs text-gray-500">Priority {b.priority}</div>}
          </div>
        ))}
        {(!blocks || blocks.length === 0) && !loading && (
          <div className="text-gray-500">No items yet. Add a task to see it scheduled.</div>
        )}
      </div>
    </div>
  )
}
