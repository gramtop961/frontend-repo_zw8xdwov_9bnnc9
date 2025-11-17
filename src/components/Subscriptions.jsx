import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Subscriptions({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${API}/api/subscriptions`)
      if (!res.ok) throw new Error('Failed to load subscriptions')
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
        <h3 className="font-semibold text-gray-900">Subscriptions</h3>
        <button onClick={fetchItems} className="text-sm px-3 py-1 rounded bg-gray-900 text-white">Refresh</button>
      </div>
      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      <ul className="divide-y">
        {items.map((t, i) => (
          <li key={t.id || i} className="py-2 flex items-start justify-between">
            <div>
              <div className="font-medium text-gray-900">{t.name || 'Subscription'}</div>
              <div className="text-xs text-gray-500">Renewal: {t.renewal_interval || 'monthly'}</div>
            </div>
            <span className="text-sm font-semibold text-indigo-700">${t.cost?.toFixed?.(2) || Number(t.cost || 0).toFixed(2)}</span>
          </li>
        ))}
        {(!items || items.length === 0) && !loading && !error && (
          <li className="py-2 text-sm text-gray-500">No subscriptions yet.</li>
        )}
      </ul>
    </div>
  )
}
