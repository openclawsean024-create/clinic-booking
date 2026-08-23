import { listReminders } from '../lib/db'
export default function RemindersPage() {
  const reminders = listReminders()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">⏰ 回診提醒</h1>
      <p className="text-sm text-slate-500 mb-3">重要回診不漏</p>
      <div className="space-y-2" data-testid="reminders-list">
        {reminders.map(r => (
          <div key={r.id} className="border border-slate-200 rounded p-3" data-testid={`reminder-${r.id}`}>
            <div className="font-medium">{r.type}</div>
            <div className="text-xs text-slate-500">{r.date} {r.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
