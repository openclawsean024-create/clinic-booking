export default function DocumentsPage() {
  const docs = [
    { id: 'd1', name: '健保卡影本', category: '身份證件', uploadedAt: '2026-05-20' },
    { id: 'd2', name: '過敏史表單', category: '病史', uploadedAt: '2026-05-20' },
    { id: 'd3', name: 'X 光片', category: '影像', uploadedAt: '2026-05-22' },
    { id: 'd4', name: '報價單', category: '報價', uploadedAt: '2026-05-25' },
    { id: 'd5', name: '同意書', category: '表單', uploadedAt: '2026-05-25' },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📂 文件記錄</h1>
      <div className="text-xs text-slate-500 mb-3">LINE 對話中</div>
      <div className="space-y-2" data-testid="docs-list">
        {docs.map(d => (
          <div key={d.id} className="border border-slate-200 rounded p-3" data-testid={`doc-${d.id}`}>
            <div className="font-medium text-sm">{d.name}</div>
            <div className="text-xs text-slate-500">{d.category} · {d.uploadedAt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
