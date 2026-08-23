import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { listTreatments, listAppointments, listReminders, listChats, advanceTreatmentStage, addAppointment, markChatRead, seedDemoData, getDB } from '../src/lib/db'
import { TREATMENT_STAGES } from '../src/lib/types'

function renderAt(p: string) { return render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>) }

beforeEach(async () => {
  localStorage.clear()
  seedDemoData()
})

describe('Sprint 1 E2E - 診所預約助手', () => {
  it('首頁招呼語', () => {
    renderAt('/')
    expect(screen.getByText(/您好,王小明/)).toBeInTheDocument()
  })

  it('顯示下一次預約區塊', () => {
    renderAt('/')
    expect(screen.getByTestId('next-appointment')).toBeInTheDocument()
  })

  it('療程預載 1 個', () => {
    expect(listTreatments().length).toBe(1)
  })

  it('預約預載 2 筆', () => {
    expect(listAppointments().length).toBe(2)
  })

  it('回診提醒預載 2 個', () => {
    expect(listReminders().length).toBe(2)
  })

  it('訊息預載 5 個對話', () => {
    expect(listChats().length).toBe(5)
  })

  it('療程 5 階段排序正確', () => {
    expect(TREATMENT_STAGES.length).toBe(5)
    expect(TREATMENT_STAGES[0]).toBe('初診諮詢')
    expect(TREATMENT_STAGES[4]).toBe('追蹤檢查')
  })

  it('療程推進可改變狀態', () => {
    const t = listTreatments()[0]
    const before = t.currentStage
    advanceTreatmentStage(t.id)
    expect(getDB().treatments.find(x => x.id === t.id)!.currentStage).not.toBe(before)
  })

  it('新增預約會增長清單', () => {
    const before = listAppointments().length
    addAppointment({ patientName: '王小明', doctorName: '張醫師', date: '2026-09-15', time: '10:00', service: '定期檢查' })
    expect(listAppointments().length).toBe(before + 1)
  })

  it('標訊息已讀', () => {
    const c = listChats().find(x => x.unread)!
    markChatRead(c.id)
    expect(getDB().chats.find(x => x.id === c.id)!.unread).toBe(false)
  })

  it('文件頁面顯示 5 個文件', () => {
    renderAt('/documents')
    expect(screen.getByTestId('docs-list').children.length).toBe(5)
  })
})
