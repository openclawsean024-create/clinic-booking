import { markChatRead, listChats } from '../lib/db'
export default function MessagesPage() {
  const chats = listChats()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">💬 訊息中心</h1>
      <div className="text-xs text-slate-500 mb-3">LINE 整合對話中({chats.filter(c => c.unread).length} 未讀)</div>
      <div className="space-y-2" data-testid="chats-list">
        {chats.map(c => (
          <div key={c.id} className="border border-slate-200 rounded p-3 flex items-center justify-between" data-testid={`chat-${c.id}`}>
            <div>
              <div className="flex items-center gap-2">
                {c.unread && <span className="w-2 h-2 bg-orange-500 rounded-full" data-testid={`unread-${c.id}`} />}
                <span className="font-medium">{c.patientName}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">{c.preview}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">{c.time}</div>
              {c.unread && (
                <button onClick={() => markChatRead(c.id)} className="text-xs text-orange-600 hover:underline mt-1">標已讀</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
