# clinic-booking · 變更日誌

> 自動維護：Sean 10-repo-fleet Batch 2B
> 對齊 PRD v3.0.2 等級

---

## v3.0.2 — 2026-09-06（Sean 10-repo-fleet Batch 2B）

**升級內容**：
- 📄 撰寫 `PRD/SPEC.md`（9 章 v3.0.2 等級規格書）
- 📄 撰寫本 `PRD/CHANGELOG.md`
- 🐛 修正 `web/index.html` redirect 路徑：原本 `./public/dashboard.html`（在 dev/dist 皆 404）→ 改為 `./dashboard.html`
- ⚙️ 建立 `.github/workflows/ci.yml`（lint / test / build / deploy-to-Pages 4-job）

**驗證結果**：
- `npm test` — 11/11 passed
- `npm run build` — tsc strict 綠 + vite build 產出 dist/{index.html, dashboard.html}
- TypeScript 嚴格模式全綠（noUnusedLocals / noUnusedParameters / verbatimModuleSyntax）

**Deploy**：GitHub Pages（base: `/clinic-booking/`）

**已知限制**：
- 無 lint script（以 `tsc --noEmit` 嚴格模式取代）
- E2E 用 vitest + jsdom（非 Playwright，但已涵蓋 6 路由 + db 邏輯 11 場景）
- 推進 stage UI 在療程頁以 testid 暴露但目前無 click handler（v1.1 補）

---

## v0.1.0 — 2026-05-25（初始 sprint）

**內容**：
- Vite 6 + React 19 + TS 5.6 + Tailwind 4 + Vitest 2.1
- 6 個 pages：Dashboard / Appointments / Treatments / Reminders / Messages / Documents
- localStorage 持久化（mock data，1 個療程 + 2 筆預約 + 2 個提醒 + 5 則對話）
- 5 階段療程狀態機（初診→印模→試戴→黏著→追蹤）
- 11 個 vitest E2E 測試
- 公開 `public/dashboard.html` 靜態行銷頁

**目標**：M1 SaaS MVP — 診所預約助手 Sprint 1（牙科 / 醫美 B2B），NT$990/月/診所訂價

---

> v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet（Batch 2B · rank #14）
