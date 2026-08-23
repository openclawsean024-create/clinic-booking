import type { Treatment, Appointment, Reminder, ChatMessage, TreatmentStage } from './types'
const KEY = 'clinic-booking:db'
interface DBSchema { treatments: Treatment[]; appointments: Appointment[]; reminders: Reminder[]; chats: ChatMessage[] }
function read(): DBSchema {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p.treatments)) return p }
  } catch {}
  return { treatments: [], appointments: [], reminders: [], chats: [] }
}
function write(db: DBSchema) { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch {} }

const STAGE_NEXT: Record<TreatmentStage, TreatmentStage | null> = {
  '初診諮詢': '全瓷印模製作', '全瓷印模製作': '試戴與調校',
  '試戴與調校': '正式黏著', '正式黏著': '追蹤檢查', '追蹤檢查': null,
}

export function seedDemoData() {
  const db = read()
  if (db.treatments.length > 0) return
  db.appointments.push({ id: 'a1', patientName: '王小明', doctorName: '張醫師', date: '2026-05-28', time: '14:30', service: '成人潔牙 + 牙齒檢查' })
  db.appointments.push({ id: 'a2', patientName: '王小明', doctorName: '張醫師', date: '2026-06-25', time: '14:30', service: '牙週追蹤' })

  db.treatments.push({
    id: 't1', patientName: '王小明', name: '全瓷冠假牙療程', total: 5, completed: 2,
    currentStage: '試戴與調校',
    completedStages: ['初診諮詢', '全瓷印模製作'],
    appointments: db.appointments.filter(a => a.patientName === '王小明'),
  })

  db.reminders.push({ id: 'r1', date: '2026-05-28', time: '14:30', type: '重要回診不漏' })
  db.reminders.push({ id: 'r2', date: '2026-06-25', time: '14:30', type: '牙週追蹤' })

  db.chats.push({ id: 'c1', patientName: '王小明', preview: '請問週三下午還有名額嗎?', time: '14:32', unread: true })
  db.chats.push({ id: 'c2', patientName: '林心妍', preview: '上次療程會痛,想換個時間', time: '12:18', unread: true })
  db.chats.push({ id: 'c3', patientName: '陳柏志', preview: '請問報價表?', time: '昨日', unread: false })
  db.chats.push({ id: 'c4', patientName: '黃小琪', preview: '謝謝張醫師!', time: '昨日', unread: false })
  db.chats.push({ id: 'c5', patientName: '何先生', preview: '可以晚 30 分嗎', time: '前日', unread: false })

  write(db)
}

export function getDB(): DBSchema { return read() }
export function listTreatments(): Treatment[] { return read().treatments }
export function getTreatment(id: string): Treatment | undefined { return read().treatments.find(t => t.id === id) }
export function listAppointments(): Appointment[] { return read().appointments }
export function listReminders(): Reminder[] { return read().reminders }
export function listChats(): ChatMessage[] { return read().chats }
export function advanceTreatmentStage(id: string) {
  const db = read()
  const t = db.treatments.find(x => x.id === id)
  if (!t) return
  const next = STAGE_NEXT[t.currentStage]
  if (!next) return
  if (!t.completedStages.includes(t.currentStage)) t.completedStages.push(t.currentStage)
  t.currentStage = next
  t.completed = t.completedStages.length
  write(db)
}
export function addAppointment(a: Omit<Appointment, 'id'>) {
  const db = read()
  db.appointments.push({ ...a, id: 'a' + Date.now() })
  write(db)
}
export function markChatRead(id: string) {
  const db = read()
  const c = db.chats.find(x => x.id === id)
  if (c) { c.unread = false; write(db) }
}
