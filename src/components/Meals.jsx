import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Meals() {
  const [suggestions, setSuggestions] = useState([])

  const fetchSuggestions = async () => {
    try {
      const res = await fetch(`${API}/api/suggest-meals`)
      const data = await res.json()
      setSuggestions(data.suggestions || [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchSuggestions() }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 pb-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Meal ideas from your pantry</h2>
        <button onClick={fetchSuggestions} className="px-3 py-2 rounded-lg bg-gray-900 text-white">Refresh</button>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {suggestions.map((m, i) => (
          <div key={i} className="rounded-lg border p-4 bg-white">
            <div className="font-semibold text-gray-900">{m.title}</div>
            {m.ingredients && <div className="text-sm text-gray-600 mt-1">Ingredients: {m.ingredients.join(', ')}</div>}
            {m.steps && (
              <ol className="list-decimal ml-5 mt-2 text-sm text-gray-700 space-y-1">
                {m.steps.map((s, idx) => <li key={idx}>{s}</li>)}
              </ol>
            )}
            {m.tags && m.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {m.tags.map((t, idx) => <span key={idx} className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">{t}</span>)}
              </div>
            )}
          </div>
        ))}
        {suggestions.length === 0 && (
          <div className="text-gray-500">No ideas yet. Add pantry items to get suggestions.</div>
        )}
      </div>
    </div>
  )}
