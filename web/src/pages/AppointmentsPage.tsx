import { useState } from 'react'
import { addAppointment, listAppointments } from '../lib/db'

export default function AppointmentsPage() {
  const [, setTick] = useState(0)
  const appts = listAppointments()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📅 線上預約</h1>
      <div className="space-y-2 mb-6" data-testid="appts-list">
        {appts.map(a => (
          <div key={a.id} className="border border-slate-200 rounded p-3" data-testid={`appt-${a.id}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{a.service}</div>
                <div className="text-xs text-slate-500">{a.date} {a.time} · {a.doctorName}</div>
              </div>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{a.patientName}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-slate-200 rounded p-4">
        <h2 className="font-medium mb-2">＋ 新增預約(mock)</h2>
        <button onClick={() => { addAppointment({ patientName: '王小明', doctorName: '張醫師', date: '2026-09-15', time: '10:00', service: '定期檢查' }); setTick(t => t + 1) }}
          className="w-full px-3 py-2 bg-orange-500 text-white rounded text-sm" data-testid="add-appt">
          新增
        </button>
      </div>
    </div>
  )
}
