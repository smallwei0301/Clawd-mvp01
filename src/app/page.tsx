import Link from "next/link";

const pricing = [
  {
    name: "Starter",
    price: "NT$1,590",
    hint: "/月",
    bullets: ["3,000 張/月", "一次性下載連結（有效 2 小時）", "處理完成即刪檔（不留存）", "Email/表單支援"],
    cta: "加入候補名單",
  },
  {
    name: "Pro",
    price: "NT$2,190",
    hint: "/月",
    bullets: ["8,000 張/月", "批次上傳 + ZIP 交付", "重跑規則透明（避免爭議）", "優先處理"],
    cta: "預約 Demo",
  },
  {
    name: "Team",
    price: "客製",
    hint: "",
    bullets: ["更高用量", "API/自動化流程", "SLA/白名單", "專屬模板"],
    cta: "聯絡我們",
  },
];

const faqs = [
  {
    q: "你們會保存我的商品圖片嗎？",
    a: "不會。圖片僅在處理期間短暫暫存，完成後立即刪除。",
  },
  {
    q: "下載連結會不會外流？",
    a: "預設採一次性下載 token + TTL（2 小時）。即使轉發，連結也只能用一次，過期後自動失效。",
  },
  {
    q: "失敗或重跑怎麼算？",
    a: "系統錯誤重試不扣點；使用者主動重跑（換模板/參數）才扣點。另提供少量重跑 buffer 降低客訴。",
  },
  {
    q: "支援哪些輸出？",
    a: "去背 PNG / 白底 / 指定尺寸裁切，並提供 ZIP 批次下載。",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        {/* Top bar */}
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-400 to-cyan-300" />
            <div className="leading-tight">
              <div className="font-semibold">商品圖一鍵去背</div>
              <div className="text-xs text-slate-400">不留存｜批次｜可監控</div>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a className="hover:text-white" href="#features">賣點</a>
            <a className="hover:text-white" href="#compare">對照</a>
            <a className="hover:text-white" href="#pricing">定價</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
          </nav>
          <a
            href="#cta"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            取得試用
          </a>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 py-16">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.18),transparent_55%)]" />
          <div className="px-8 md:px-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              MVP 上線中：批量去背 → 白底/模板 → 尺寸規格化 → ZIP 下載
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              電商商品圖批次去背
              <span className="block bg-gradient-to-r from-indigo-300 to-cyan-200 bg-clip-text text-transparent">
                3 分鐘做完 100 張
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              專為商品上架流程設計：去背、白底、裁切成平台規格，打包 ZIP 一次下載。
              <span className="text-slate-200">雲端不留存</span>（處理完成即刪除檔案），並提供限時下載連結。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                className="rounded-xl bg-white px-6 py-3 text-center font-medium text-slate-900 hover:bg-slate-100"
              >
                立即取得試用（20 張）
              </a>
              <a
                href="#pricing"
                className="rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3 text-center font-medium text-white hover:bg-slate-900"
              >
                看定價與用量
              </a>
            </div>

            <div className="mt-10 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="font-medium text-slate-100">不留存（完成即刪）</div>
                <div className="mt-1">處理完成即刪除檔案；提供一次性下載連結（有效 2 小時）。</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="font-medium text-slate-100">批次 ZIP 交付</div>
                <div className="mt-1">上傳 100 張 → 自動處理 → 打包 ZIP，省去逐張下載。</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="font-medium text-slate-100">交付可控、流程省工</div>
                <div className="mt-1">批量處理＋ZIP 打包，減少人工整理與重工。</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">賣點（為電商上架而生）</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Feature
              title="去背 + 白底 + 指定尺寸裁切"
              desc="支援常見平台規格（1:1、4:5、長邊 2000px…），輸出一致、可重現。"
            />
            <Feature
              title="批量處理：快出圖、少重工"
              desc="一次處理整批圖片，避免逐張操作與反覆下載整理。"
            />
            <Feature
              title="一次性下載連結（2 小時 TTL）"
              desc="避免外流：token 用過即作廢；zip 下載後立即刪除，Lifecycle 兜底。"
            />
            <Feature
              title="重跑規則清楚（避免爭議）"
              desc="系統失敗不扣點；更改模板/尺寸等參數重跑才會扣點。"
            />
          </div>
        </section>

        {/* Compare */}
        <section id="compare" className="py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">對照：傳統流程 vs 我們</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <CompareCard
              title="傳統手動/零散工具"
              bullets={["逐張處理、逐張下載", "產出規格不一致", "資料常被工具/雲端留存", "尖峰時卡住，無監控"]}
              tone="bad"
            />
            <CompareCard
              title="本產品（MVP）"
              bullets={["批次上傳→自動處理→ZIP 一次下載", "模板化輸出，規格一致", "完成即刪，只留 metadata", "隊列/監控/告警/限流一開始就有"]}
              tone="good"
            />
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">Pricing</h2>
          <p className="mt-2 text-slate-300">首發建議：以 3,000 張/月為核心方案，超量可加購或升級。</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <div key={p.name} className="rounded-3xl border border-slate-800 bg-slate-950/40 p-7">
                <div className="flex items-baseline justify-between">
                  <div className="text-lg font-semibold">{p.name}</div>
                  <div className="text-xs text-slate-400">含稅另計</div>
                </div>
                <div className="mt-4 flex items-end gap-2">
                  <div className="text-3xl font-semibold">{p.price}</div>
                  <div className="pb-1 text-slate-400">{p.hint}</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className="mt-6 block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100"
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">
            * MVP 期間價格可調整；實際將依推理成本/下載頻寬/重跑率與用量分佈校準。
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">FAQ</h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <summary className="cursor-pointer select-none text-base font-medium">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-16">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950 p-10 md:p-14">
            <h2 className="text-2xl font-semibold md:text-3xl">想要搶先試用？</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              填寫表單，我們會在 MVP 開放名單中優先通知你（含試用額度與上線時間）。
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-xl bg-white px-6 py-3 text-center font-medium text-slate-900 hover:bg-slate-100"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdG1hjniZ0OuLbe3amraP3Tp-b5eeDzR5-5edoNW3iuZlEV-w/viewform?usp=publish-editor"
                target="_blank"
                rel="noreferrer"
              >
                填表申請試用
              </a>
              <Link
                className="rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3 text-center font-medium text-white hover:bg-slate-900"
                href="#pricing"
              >
                我先看價格
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              申請後我們會回覆你：試跑方式、交付格式與試用額度。
            </p>
          </div>
        </section>

        <footer className="py-10 text-xs text-slate-500">
          © {new Date().getFullYear()} 商品圖一鍵去背 · MVP
        </footer>
      </div>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-7">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>
    </div>
  );
}

function CompareCard({
  title,
  bullets,
  tone,
}: {
  title: string;
  bullets: string[];
  tone: "good" | "bad";
}) {
  const bar = tone === "good" ? "from-emerald-400 to-cyan-300" : "from-rose-400 to-amber-300";
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-7">
      <div className="flex items-center gap-3">
        <div className={`h-2 w-10 rounded-full bg-gradient-to-r ${bar}`} />
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
