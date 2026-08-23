import { useEffect, useState } from 'react'
import { listTreatments, advanceTreatmentStage } from '../lib/db'
import { TREATMENT_STAGES } from '../lib/types'

export default function TreatmentsPage() {
  const [, setTick] = useState(0)
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 10000); return () => clearInterval(t) }, [])
  const treatments = listTreatments()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📋 療程追蹤</h1>
      {treatments.length === 0 && <div className="text-center text-slate-400 py-12">沒有療程</div>}
      <div className="space-y-3" data-testid="treatments-list">
        {treatments.map(t => {
          const idx = TREATMENT_STAGES.indexOf(t.currentStage)
          return (
            <div key={t.id} className="border border-slate-200 rounded p-4" data-testid={`treatment-${t.id}`}>
              <div className="mb-3">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-slate-500">{t.patientName} · 進度 {t.completed}/{t.total}</div>
              </div>
              <div className="flex gap-1 mb-3" data-testid={`stage-bar-${t.id}`}>
                {TREATMENT_STAGES.map((s, i) => (
                  <div key={s} className="flex-1 text-center" data-testid={`stage-${t.id}-${s}`}>
                    <div className={`text-xs ${i <= idx ? 'text-orange-600 font-medium' : 'text-slate-400'}`}>{s}</div>
                    <div className={`h-1 mt-1 ${i <= idx ? 'bg-orange-500' : 'bg-slate-100'}`} />
                  </div>
                ))}
              </div>
              {t.currentStage !== '追蹤檢查' && (
                <button onClick={() => { advanceTreatmentStage(t.id); setTick(x => x + 1) }}
                  className="w-full px-3 py-1 bg-orange-500 text-white rounded text-sm" data-testid={`advance-${t.id}`}>
                  推進 → {TREATMENT_STAGES[idx + 1]}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
