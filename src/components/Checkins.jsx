import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Checkins({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${API}/api/checkins`)
      if (!res.ok) throw new Error('Failed to load check-ins')
      const data = await res.json()
      setItems(data || [])
    } catch (e) {
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [refreshKey])

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl shadow p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Daily check-ins</h3>
        <button onClick={fetchItems} className="text-sm px-3 py-1 rounded bg-gray-900 text-white">Refresh</button>
      </div>
      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      <ul className="divide-y">
        {items.map((t, i) => (
          <li key={t.id || i} className="py-2 flex items-start justify-between">
            <div>
              <div className="font-medium text-gray-900">{t.mood || 'okay'}</div>
              <div className="text-xs text-gray-500">{t.date}</div>
            </div>
            {t.energy && <span className="text-xs rounded px-2 py-1 bg-indigo-100 text-indigo-700">Energy: {t.energy}</span>}
          </li>
        ))}
        {(!items || items.length === 0) && !loading && !error && (
          <li className="py-2 text-sm text-gray-500">No check-ins yet.</li>
        )}
      </ul>
    </div>
  )
}
