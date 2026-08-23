export type TreatmentStage = '初診諮詢' | '全瓷印模製作' | '試戴與調校' | '正式黏著' | '追蹤檢查'
export const TREATMENT_STAGES: TreatmentStage[] = ['初診諮詢', '全瓷印模製作', '試戴與調校', '正式黏著', '追蹤檢查']

export interface Appointment {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  service: string
  note?: string
}

export interface Treatment {
  id: string
  patientName: string
  name: string  // 全瓷冠假牙療程
  total: number
  completed: number
  currentStage: TreatmentStage
  completedStages: TreatmentStage[]
  appointments: Appointment[]
}

export interface Reminder {
  id: string
  date: string
  time: string
  type: string
}

export interface ChatMessage {
  id: string
  patientName: string
  preview: string
  time: string
  unread: boolean
}
