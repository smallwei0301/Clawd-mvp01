import Link from "next/link";

const examples = [
  {
    title: "1) 原始商品照（雜背景）",
    desc: "使用者上傳：手機拍攝、背景雜、光線不一。",
    img: "/examples/input_bottle_scene.jpg",
    badge: "INPUT",
  },
  {
    title: "2) 去背 PNG（透明背景）",
    desc: "輸出：商品被乾淨分離，可用於各種底色/版型。",
    img: "/examples/output_cutout.png",
    badge: "OUTPUT",
  },
  {
    title: "3) 白底商品照（置中）",
    desc: "輸出：純白背景、置中、柔和陰影，可直接上架。",
    img: "/examples/output_white_bg.jpg",
    badge: "OUTPUT",
  },
  {
    title: "4) 白底 + 4:5 規格（直式）",
    desc: "輸出：4:5 直式常見於商城/社群，減少人工裁切重工。",
    img: "/examples/output_4x5.jpg",
    badge: "OUTPUT",
  },
];

export default function UsePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-400 to-cyan-300" />
            <div className="leading-tight">
              <div className="font-semibold">商品圖一鍵去背</div>
              <div className="text-xs text-slate-400">輸入/輸出示例（使用頁）</div>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link className="hover:text-white" href="/">回首頁</Link>
            <a className="hover:text-white" href="#examples">示例</a>
            <a className="hover:text-white" href="#rules">我們做得到什麼</a>
            <a className="hover:text-white" href="#faq">注意事項</a>
          </nav>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdG1hjniZ0OuLbe3amraP3Tp-b5eeDzR5-5edoNW3iuZlEV-w/viewform?usp=publish-editor"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            target="_blank"
            rel="noreferrer"
          >
            申請試用
          </a>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.16),transparent_55%)]" />
          <div className="px-8 md:px-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              你上傳什麼 → 我們會交付什麼（一眼看懂）
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
              商品圖使用頁：<span className="text-slate-200">輸入 / 輸出範例</span>
            </h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              這頁是給使用者「預期管理」：你上傳什麼照片、系統會給你什麼格式的結果。
              目標是把上架流程變成：<span className="text-slate-100">批次上傳 → 自動處理 → ZIP 下載</span>。
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#examples"
                className="rounded-xl bg-white px-6 py-3 text-center font-medium text-slate-900 hover:bg-slate-100"
              >
                看示例（Before/After）
              </a>
              <Link
                href="/#pricing"
                className="rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3 text-center font-medium text-white hover:bg-slate-900"
              >
                回到定價
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-400">
              * 本頁示例圖目前為 Gemini 生成/裁切的示例資產，用於說明交付格式；正式版會以實際處理結果為準。
            </div>
          </div>
        </section>

        <section id="examples" className="py-14">
          <h2 className="text-2xl font-semibold">示例（輸入 → 輸出）</h2>
          <p className="mt-2 text-slate-300">
            你會看到：原始雜背景商品照 → 去背 PNG → 白底 + 不同比例輸出。
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {examples.map((ex) => (
              <div
                key={ex.title}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <div className="font-medium">{ex.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{ex.desc}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ${ex.badge === "INPUT" ? "bg-slate-800 text-slate-200" : "bg-emerald-500/15 text-emerald-200"}`}>
                    {ex.badge}
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ex.img}
                  alt={ex.title}
                  className="h-auto w-full bg-white/5"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="rules" className="pb-14">
          <h2 className="text-2xl font-semibold">我們做得到什麼（交付標準）</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="font-medium text-slate-100">去背（給你透明 PNG）</div>
              <div className="mt-2 text-sm text-slate-300">
                將商品主體分離成透明背景 PNG，方便你套模板、換底色、做合成。
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="font-medium text-slate-100">白底 + 置中（可重現）</div>
              <div className="mt-2 text-sm text-slate-300">
                輸出統一白底、置中，不會每張尺寸/邊距亂跳，減少上架重工。
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="font-medium text-slate-100">比例/尺寸規格化</div>
              <div className="mt-2 text-sm text-slate-300">
                支援常見比例（1:1、4:5…）與像素規格（長邊 2000px），批次一致輸出。
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="pb-16">
          <h2 className="text-2xl font-semibold">注意事項（避免落差）</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="font-medium">建議的輸入照片</div>
              <div className="mt-2 text-sm text-slate-300">
                商品主體清楚、不要被手遮到、不要過曝；背景再亂也可以，但主體輪廓要完整。
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="font-medium">不適合的情況</div>
              <div className="mt-2 text-sm text-slate-300">
                透明/鏡面材質、毛髮邊緣極細、或與背景顏色極接近時，可能需要人工微調。
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="font-medium">交付方式</div>
              <div className="mt-2 text-sm text-slate-300">
                批次處理後以 ZIP 打包下載；連結有效時間（例如 2 小時），到期自動失效。
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-900 py-10 text-sm text-slate-500">
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <div>© 2026 商品圖一鍵去背 · MVP</div>
            <div className="flex gap-4">
              <Link className="hover:text-slate-300" href="/">首頁</Link>
              <Link className="hover:text-slate-300" href="/#pricing">定價</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
