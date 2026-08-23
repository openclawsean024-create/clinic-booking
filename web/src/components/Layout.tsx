import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">🏥 診所預約助手</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="hover:underline">會員首頁</Link>
            <Link to="/appointments" className="hover:underline">線上預約</Link>
            <Link to="/treatments" className="hover:underline">療程追蹤</Link>
            <Link to="/reminders" className="hover:underline">回診提醒</Link>
            <Link to="/messages" className="hover:underline">訊息中心</Link>
            <Link to="/documents" className="hover:underline">文件記錄</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">診所預約助手 · Sprint 1 · LINE 整合對話中</footer>
    </div>
  )
}
