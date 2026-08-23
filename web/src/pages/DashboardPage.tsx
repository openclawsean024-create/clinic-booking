import { Link } from 'react-router-dom'
import { listAppointments, listTreatments } from '../lib/db'
export default function DashboardPage() {
  const next = listAppointments()[0]
  const treatment = listTreatments()[0]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">🏥 您好,王小明</h1>
      <div className="text-xs text-slate-500 mb-4">您最信任的健康計畫正在進行中</div>

      <div className="border border-slate-200 rounded p-4 mb-4" data-testid="next-appointment">
        <div className="text-xs text-slate-500 mb-1">下一次預約</div>
        {next && (
          <>
            <div className="font-medium">{next.service}</div>
            <div className="text-xs text-slate-500 mt-1">{next.date} {next.time} · {next.doctorName}</div>
          </>
        )}
        <Link to="/appointments" className="inline-block mt-2 text-xs text-orange-600 hover:underline">查看預約 →</Link>
      </div>

      {treatment && (
        <div className="border border-slate-200 rounded p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs text-slate-500">會員方案</div>
              <div className="font-medium">{treatment.name}</div>
              <div className="text-xs text-slate-500 mt-1">已完成 {treatment.completed}/{treatment.total} 次</div>
            </div>
            <Link to="/treatments" className="text-xs text-orange-600 hover:underline">方案詳情</Link>
          </div>
          <div className="h-2 bg-slate-100 rounded">
            <div className="h-full bg-orange-500 rounded" style={{ width: `${(treatment.completed / treatment.total) * 100}%` }} />
          </div>
        </div>
      )}

      <Link to="/reminders" className="inline-block px-4 py-2 bg-orange-500 text-white rounded">
        📋 查看回診提醒
      </Link>
    </div>
  )
}
