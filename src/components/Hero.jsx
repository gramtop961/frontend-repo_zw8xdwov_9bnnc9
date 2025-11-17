import { Calendar, Checklist, Soup, CreditCard } from 'lucide-react'

export default function Hero({ onQuickAdd }) {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
        Daily Life Optimizer
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        A calm, friendly assistant that organizes your day, meals, bills, and more.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <button onClick={() => onQuickAdd('task')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition">
          <Checklist className="w-5 h-5" /> Quick Task
        </button>
        <button onClick={() => onQuickAdd('pantry')} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-3 transition">
          <Soup className="w-5 h-5" /> Pantry Item
        </button>
        <button onClick={() => onQuickAdd('bill')} className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-3 transition">
          <CreditCard className="w-5 h-5" /> Bill
        </button>
        <button onClick={() => onQuickAdd('checkin')} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 transition">
          <Calendar className="w-5 h-5" /> Check-in
        </button>
      </div>
    </div>
  )
}
