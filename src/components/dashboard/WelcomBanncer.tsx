export default function WelcomeBanner({ onStart }: { onStart?: () => void }) {
  return (
    <div className="relative flex items-center justify-between gap-8 rounded-xl border border-white/[0.07] bg-[#141720] px-8 py-7 overflow-hidden hover:cursor-default">

      {/* subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,217,192,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,192,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* accent glow */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#00d9c0] opacity-[0.06] blur-3xl" />

      {/* ── Left ── */}
      <div className="relative flex-1 min-w-0">

        {/* pill badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00d9c0]/25 bg-[#00d9c0]/10 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d9c0] animate-pulse" />
          <span className="font-mono text-[10px] tracking-wide text-[#00d9c0]">
            // codexa · active
          </span>
        </div>

        {/* tagline */}
        <h2 className="mb-2 text-xl font-semibold leading-snug tracking-tight text-[#e8eaed]"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Start code.{" "}
          <span className="text-[#00d9c0]">Analyse</span> deeply.
          <br />
          Learn fast. Enhance your skills.
        </h2>

        <p className="mb-5 font-mono text-[13px] text-[#676b74]">
          // every submission makes you a sharper engineer
        </p>

        {/* steps */}
        <div className="flex items-center gap-0 flex-wrap">
          {["start code", "analyses", "learn", "enhance skill"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              {i > 0 && (
                <span className="mx-2 font-mono text-[11px] text-[#3e4555]">→</span>
              )}
              <div className="flex items-center gap-2">
                <span className="flex h-6.25 w-6.25 items-center justify-center rounded-full border border-white/10 font-mono text-[15px] text-[#7a8394]">
                  {i + 1}
                </span>
                <span className="font-mono text-[13px] text-[#979ca4]">{step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right ── */}
      <div className="relative flex shrink-0 flex-col items-end gap-4">

        <button
          onClick={onStart}
          className="rounded-full border border-[#00d9c0]/35 bg-[#00d9c0]/10 px-5 py-2.5 font-mono text-[12px] text-[#00d9c0] transition-all hover:bg-[#00d9c0]/20 cursor-pointer whitespace-nowrap"
        >
          + first analysis ↗
        </button>

        {/* mini stats */}
        <div className="flex items-center gap-4">
          {[
            { n: "5",  l: "dimensions"  },
            { n: "∞",  l: "submissions" },
            { n: "AI", l: "powered"     },
          ].map((s, i) => (
            <div key={s.l} className="flex items-center gap-4">
              {i > 0 && <div className="h-6 w-px bg-white/[0.07]" />}
              <div className="text-center">
                <div className="text-lg font-semibold leading-none text-[#e8eaed]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {s.n}
                </div>
                <div className="mt-1 font-mono text-[10px] text-[#3e4555]">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}