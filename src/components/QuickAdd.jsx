import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function QuickAdd({ type = 'task', onDone }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(3)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let url = ''
      let payload = {}
      if (type === 'task') {
        url = `${API}/api/tasks`
        payload = { title, priority: Number(priority) }
      } else if (type === 'pantry') {
        url = `${API}/api/pantry`
        payload = { name: title }
      } else if (type === 'bill') {
        url = `${API}/api/bills`
        payload = { name: title, amount: 0, due_day: 1 }
      } else if (type === 'checkin') {
        url = `${API}/api/checkins`
        const today = new Date().toISOString().slice(0,10)
        payload = { date: today, mood: title || 'okay' }
      }
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed')
      setTitle('')
      if (onDone) onDone()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={type === 'task' ? 'Add a task...' : type === 'pantry' ? 'Add pantry item...' : type === 'bill' ? 'Add a bill...' : 'How are you today?'} className="flex-1 border rounded-lg px-3 py-2" />
      {type === 'task' && (
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded-lg px-2">
          <option value={1}>P1</option>
          <option value={2}>P2</option>
          <option value={3}>P3</option>
          <option value={4}>P4</option>
          <option value={5}>P5</option>
        </select>
      )}
      <button disabled={loading} className="bg-gray-900 text-white rounded-lg px-4 py-2">{loading ? 'Saving...' : 'Add'}</button>
    </form>
  )
}
