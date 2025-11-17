import { useState } from 'react'
import Hero from './components/Hero'
import Scheduler from './components/Scheduler'
import QuickAdd from './components/QuickAdd'
import Meals from './components/Meals'

function App() {
  const [quickType, setQuickType] = useState('task')
  const [refreshKey, setRefreshKey] = useState(0)

  const onQuickAdd = (type) => {
    setQuickType(type)
  }

  const bump = () => setRefreshKey(k => k + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50">
      <Hero onQuickAdd={onQuickAdd} />
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <div className="bg-white/80 backdrop-blur rounded-xl shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Quick add</h3>
            <div className="text-sm text-gray-500">Backend: {import.meta.env.VITE_BACKEND_URL || 'not set'}</div>
          </div>
          <QuickAdd key={quickType + refreshKey} type={quickType} onDone={bump} />
        </div>
      </div>
      <Scheduler key={`sched-${refreshKey}`} />
      <Meals />
      <div className="text-center text-xs text-gray-500 pb-6">Daily Life Optimizer — calm, friendly, and helpful</div>
    </div>
  )
}

export default App
