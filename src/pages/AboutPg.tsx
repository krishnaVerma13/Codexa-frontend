import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../routes/queryHooks/User.Query";
// ─── Types ────────────────────────────────────────────────────────────────────

interface DimBar {
  name: string;
  desc: string;
  pct: number;
  color: string;
}

interface PurposeCard {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
}

interface Feature {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
}

interface AudienceCard {
  emoji: string;
  title: string;
  desc: string;
}

interface Step {
  num: string;
  title: string;
  desc: string;
  tag: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// function PulseDot({ size = "w-2 h-2" }: { size?: string }) {
//   return (
//     <span
//       className={`${size} rounded-full bg-[#3fb950] inline-block`}
//       style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
//     />
//   );
// }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[13px] text-[#3fb950] tracking-widest uppercase mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[27px] md:text-[52px] font-semibold text-[#f0f6fc] tracking-wider mb-2 leading-snug">
      {children}
    </h2>
  );
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17px]  text-[#8b949e] max-w-2xl leading-relaxed">
      {children}
    </p>
  );
}

// ─── Animated DimBar ──────────────────────────────────────────────────────────

function DimCard({ dim, animate }: { dim: DimBar; animate: boolean }) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
      <p className="text-[20px] font-semibold text-[#d3e0ed] mb-1">{dim.name}</p>
      <p className="text-[14px] text-[#8b949e] leading-relaxed">{dim.desc}</p>
      <div className="mt-4 h-0.75 bg-[#21262d] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${dim.pct}%` : "0%",
            backgroundColor: dim.color,
          }}
        />
      </div>
    </div>
  );
}


// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-[#21262d] px-6 md:px-12 pt-24 pb-20">
      {/* grid bg */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#21262d 1px, transparent 1px), linear-gradient(90deg, #21262d 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* glows */}
      <div
        className="absolute -top-20 -left-16 w-145 h-95 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(63,185,80,0.1) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-20 w-120 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(88,166,255,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-200 mx-auto">
       

        <h1 className="text-[clamp(36px,5.5vw,60px)] font-bold text-[#f0f6fc] leading-[1.12] tracking-wider mb-6">
          Code smarter.<br />
          Grow <span className="text-[#3fb950]">faster</span>.<br />
          Ship with <span className="text-[#58a6ff]">confidence</span>.
        </h1>

        <p className="text-[20px] text-[#8b949e] max-w-155 leading-[1.75] mb-10">
          Codexa is a learning-first skill intelligence platform built for beginner
          and early-stage developers who want real feedback — not just syntax errors.
        </p>

        {/* code snippet */}
        <div className="font-mono text-[14px] bg-[#161b22] border border-[#30363d] border-l-[3px] border-l-[#3fb950] rounded-lg px-6 py-10 inline-block leading-loose max-w-full">
          <span className="text-[#6e7681]">{"// submit your code, get instant insight"}</span>
          <br />
          <span className="text-[#ff7b72]">const </span>
          <span className="text-[#c9d1d9]">result = </span>
          <span className="text-[#ff7b72]">await </span>
          <span className="text-[#d2a8ff]">codexa</span>
          <span className="text-[#c9d1d9]">.</span>
          <span className="text-[#d2a8ff]">analyze</span>
          <span className="text-[#c9d1d9]">{"({"}</span>
          <br />
          <span className="text-[#c9d1d9]">&nbsp;&nbsp;</span>
          <span className="text-[#79c0ff]">code</span>
          <span className="text-[#c9d1d9]">: </span>
          <span className="text-[#58a6ff]">myCode</span>
          <span className="text-[#c9d1d9]">,</span>
          <br />
          <span className="text-[#c9d1d9]">&nbsp;&nbsp;</span>
          <span className="text-[#79c0ff]">language</span>
          <span className="text-[#c9d1d9]">: </span>
          <span className="text-[#58a6ff]">"javascript"</span>
          <br />
          <span className="text-[#c9d1d9]">{"});"}</span>
          <br />
          <span className="text-[#6e7681]">{"// → scores, feedback & growth suggestions"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { num: "5", label: "Analysis dimensions" },
    { num: "<2s", label: "Average analysis time" },
    { num: "100%", label: "AI-powered feedback" },
    { num: "∞", label: "Submissions tracked" },
  ];

  return (
    <div className="bg-[#161b22] border-y border-[#21262d] px-6 md:px-12 py-9 flex flex-wrap justify-center gap-10 md:gap-20">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <span className="block font-mono text-[32px] font-semibold text-[#3fb950]">
            {s.num}
          </span>
          <span className="text-[14px] text-[#8b949e] mt-1 block">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Purpose ──────────────────────────────────────────────────────────────────

function PurposeSection() {
  const cards: PurposeCard[] = [
    {
      iconBg: "rgba(63,185,80,0.12)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L2 6v8l8 4 8-4V6l-8-4z" stroke="#3fb950" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M2 6l8 4 8-4M10 10v10" stroke="#3fb950" strokeWidth="1.5" />
        </svg>
      ),
      title: "Real code feedback",
      desc: "Not just \"works / doesn't work.\" Get dimensional scores on readability, efficiency, security, maintainability, and more.",
    },
    {
      iconBg: "rgba(88,166,255,0.12)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 10h14M3 6h14M3 14h9" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "Learning over judging",
      desc: "Every suggestion comes with a reason. Understand the \"why\" behind better code, not just what to change.",
    },
    {
      iconBg: "rgba(210,168,255,0.12)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 14l4-4 3 3 6-7" stroke="#d2a8ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Track your growth",
      desc: "A timeline of every submission shows how your score improves week over week across all dimensions.",
    },
    {
      iconBg: "rgba(240,167,66,0.12)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="#f0a742" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="10" r="3" stroke="#f0a742" strokeWidth="1.5" />
        </svg>
      ),
      title: "Personal recommendations",
      desc: "Codexa detects your recurring patterns and generates custom learning paths based on your real behavior.",
    },
  ];

  return (
    <section className="max-w-330 mx-auto px-6 md:px-12 py-16 border-b border-[#21262d]">
      <SectionLabel>// purpose</SectionLabel>
      <SectionTitle>Why Codexa exists</SectionTitle>
      <SectionBody>
        Learning to code is hard. Tutorials teach syntax, but they rarely tell you why your code is slow,
        fragile, or hard to read. Codexa bridges that gap — giving you the kind of review a senior developer
        would give, right in your browser.
      </SectionBody>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 transition-all duration-200 hover:border-[#3fb950] hover:-translate-y-1"
          >
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4"
              style={{ background: c.iconBg }}
            >
              {c.icon}
            </div>
            <h3 className="text-[22px] font-semibold text-[#f0f6fc] mb-2 tracking-widest">{c.title}</h3>
            <p className="text-[15px] text-[#8b949e] leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps: Step[] = [
    {
      num: "01",
      title: "Paste or write your code",
      desc: "Submit any snippet — a function, a module, a full file. Codexa supports multiple languages and auto-detects from your submission.",
      tag: "language detection",
    },
    {
      num: "02",
      title: "AI analysis runs across 5 dimensions",
      desc: "Codexa scores your code on Readability, Efficiency, Security, Maintainability, and Best Practices — each with a score and a plain-English reason.",
      tag: "AI-powered scoring",
    },
    {
      num: "03",
      title: "Read your feedback and suggestions",
      desc: "You get an overall score, dimension breakdowns, and prioritized suggestions — each explaining what to improve and exactly why it matters.",
      tag: "actionable suggestions",
    },
    {
      num: "04",
      title: "Watch your timeline grow",
      desc: "Every submission is logged. Your dashboard tracks improvement over time — weekly, monthly, by dimension — so you see exactly where you're getting better.",
      tag: "progress timeline",
    },
  ];

  return (
    <section className="max-w-330 mx-auto px-6 md:px-12 py-16 border-b border-[#21262d]">
      <SectionLabel>// how it works</SectionLabel>
      <SectionTitle>Submit → Analyze → Improve</SectionTitle>
      <SectionBody>
        The workflow is simple. You write code, Codexa does the heavy lifting — no configuration, no setup,
        no waiting for a senior dev to be free.
      </SectionBody>

      <div className="mt-11 ml-10 flex flex-col">
        {steps.map((step, i) => (
          <div key={step.num} className="grid grid-cols-[56px_1fr]">
            {/* left rail */}
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center font-mono text-[18px] font-semibold text-[#3fb950] shrink-0 z-10">
                {step.num}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-[#21262d] my-1.5 min-h-12" />
              )}
            </div>
            {/* content */}
            <div className={`pb-11 ${i === steps.length - 1 ? "pb-0" : ""}`}>
              <h3 className="text-[24px] font-semibold text-[#bcc3c9] mb-2 pt-1.5 tracking-wider">{step.title}</h3>
              <p className="text-[16px] text-[#8b949e] leading-[1.75]">{step.desc}</p>
              <span className="inline-block mt-3 font-mono text-[12px] text-[#58a6ff] bg-[rgba(88,166,255,0.1)] border border-[rgba(88,166,255,0.25)] px-3 py-0.5 rounded">
                {step.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Dimensions ───────────────────────────────────────────────────────────────

function DimensionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dims: DimBar[] = [
    { name: "Readability", desc: "Can someone else understand at a glance? Naming, comments, structure.", pct: 82, color: "#3fb950" },
    { name: "Efficiency", desc: "Does it run fast? Avoids unnecessary loops, memory waste, redundant work.", pct: 74, color: "#58a6ff" },
    { name: "Security", desc: "Catches common vulns — injection, data exposure, unsafe inputs.", pct: 68, color: "#ff7b72" },
    { name: "Maintainability", desc: "Easy to change later? DRY principles, modularity, coupling.", pct: 79, color: "#d2a8ff" },
    { name: "Best Practices", desc: "Language conventions, patterns, and standards your ecosystem expects.", pct: 88, color: "#f0a742" },
  ];

  return (
    <section className="max-w-330 mx-auto px-6 md:px-12 py-16 border-b border-[#21262d]">
      <SectionLabel>// analysis dimensions</SectionLabel>
      <SectionTitle>Five lenses. One overall score.</SectionTitle>
      <SectionBody>
        Good code isn't one-dimensional. Codexa evaluates your work across the five qualities that senior
        developers actually care about when reviewing a pull request.
      </SectionBody>
      <div
        ref={ref}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      >
        {dims.map((d) => (
          <DimCard key={d.name} dim={d} animate={animate} />
        ))}
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  const features: Feature[] = [
    {
      iconBg: "rgba(63,185,80,0.12)",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 9h12M4 13h8" stroke="#3fb950" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: "Multi-language support",
      desc: "JavaScript, TypeScript, Python, and more — language auto-detected from your submission, no config needed.",
    },
    {
      iconBg: "rgba(88,166,255,0.12)",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 14l4-4 3 3 6-7" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: "Progress timeline",
      desc: "Day, week, and month grouping shows your improvement curve across all five dimensions over time.",
    },
    {
      iconBg: "rgba(240,167,66,0.12)",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="#f0a742" strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="10" r="3" stroke="#f0a742" strokeWidth="1.5" /></svg>,
      title: "Behavioral pattern detection",
      desc: "Codexa learns your recurring weaknesses after 3+ submissions and surfaces personalized recommendations.",
    },
    {
      iconBg: "rgba(255,123,114,0.12)",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#ff7b72" strokeWidth="1.5" /><path d="M7 9h6M7 12h4" stroke="#ff7b72" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: "Plain-English reasoning",
      desc: "Every score comes with a human-readable explanation — no jargon, no cryptic error messages.",
    },
    {
      iconBg: "rgba(63,185,80,0.12)",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6 4l-4 6 4 6M14 4l4 6-4 6" stroke="#3fb950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: "REST API access",
      desc: "Integrate Codexa into your own workflow via a clean JSON API with full TypeScript types and schemas.",
    },
    {
      iconBg: "rgba(210,168,255,0.12)",
      icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="4" stroke="#d2a8ff" strokeWidth="1.5" /><path d="M3 18c0-3 3-5 7-5s7 2 7 5" stroke="#d2a8ff" strokeWidth="1.5" strokeLinecap="round" /></svg>,
      title: "User pattern memory",
      desc: "Recommendations refresh automatically when your behavioral patterns update — always stays relevant.",
    },
  ];

  return (
    <section className="max-w-330 mx-auto px-6 md:px-12 py-16 border-b border-[#21262d]">
      <SectionLabel>// features</SectionLabel>
      <SectionTitle>Everything a beginner needs to level up</SectionTitle>
      <SectionBody>
        Codexa isn't just an analyzer — it's a full learning environment designed around how early-stage
        developers actually improve over time.
      </SectionBody>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex gap-4 items-start bg-[#161b22] border border-[#30363d] rounded-xl p-5 transition-colors duration-200 hover:border-[#30363d]"
          >
            <div
              className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0"
              style={{ background: f.iconBg }}
            >
              {f.icon}
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-[#c0ccd8] mb-1 tracking-widest">{f.title}</h4>
              <p className="text-[14px] text-[#8b949e] leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Audience ─────────────────────────────────────────────────────────────────

function AudienceSection() {
  const cards: AudienceCard[] = [
    { emoji: "🌱", title: "Total beginners", desc: "Just learning to code? Codexa explains what makes code good — not just what runs without errors." },
    { emoji: "📚", title: "Self-taught devs", desc: "No bootcamp or CS degree? Get the senior-dev feedback you can't get from YouTube tutorials." },
    { emoji: "🎓", title: "CS students", desc: "Assignments get graded, not reviewed. Codexa fills the gap between a passing grade and production quality." },
    { emoji: "🚀", title: "Curious builders", desc: "Side project coders who want their code to be something they're proud to show, not just something that works." },
  ];

  return (
    <section className="max-w-300 mx-auto px-6 md:px-12 py-16 border-b border-[#21262d]">
      <SectionLabel>// who is this for</SectionLabel>
      <SectionTitle>Built for developers at every early stage</SectionTitle>
      <SectionBody>
        Codexa meets you where you are — whether you just finished your first tutorial or you're
        shipping your first real project.
      </SectionBody>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 text-center transition-all duration-200 hover:border-[rgba(88,166,255,0.4)] hover:-translate-y-1"
          >
            <span className="text-[30px] block mb-3">{c.emoji}</span>
            <h4 className="text-[20px] tracking-widest font-semibold text-[#d6e4f2] mb-2">{c.title}</h4>
            <p className="text-[14px] text-[#8b949e] leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  const navigator = useNavigate()
  const {data} = useUser()
  return (
    <div className="max-w-300 mx-auto px-6 md:px-12 py-20 text-center">
      {/* terminal */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-155 mx-auto overflow-hidden mb-9">
        <div className="bg-[#21262d] border-b border-[#30363d] px-4 py-2.5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="font-mono text-[13px] text-[#6e7681] ml-2">codexa — terminal</span>
        </div>
        <div className="px-8 py-7 text-left">
          {[
            { prompt: true, text: "codexa analyze ./my-first-function.js" },
            { prompt: false, text: "→ analyzing 42 lines across 5 dimensions..." },
            { prompt: false, text: "→ overall score:", highlight: "78 / 100" },
            { prompt: false, text: "→ 3 high-priority suggestions ready" },
            { prompt: false, text: "→ keep going. you're improving. 🚀" },
          ].map((line, i) => (
            <div key={i} className="font-mono text-[14px] leading-[2.1]">
              {line.prompt && <span className="text-[#3fb950]">$ </span>}
              {!line.prompt && !line.highlight && <span className="text-[#8b949e]">{line.text}</span>}
              {line.prompt && <span className="text-[#c9d1d9]">{line.text}</span>}
              {line.highlight && (
                <span className="text-[#8b949e]">
                  {line.text}{" "}
                  <span className="text-[#3fb950] font-semibold">{line.highlight}</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-[42px] font-bold text-[#f0f6fc] tracking-wider mb-3">
        Ready to write better code?
      </h2>
      <p className="text-[18px] text-[#8b949e] mb-8">
        Analyze your first snippet in under 30 seconds — no setup required.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          onClick={()=>{data ? navigator("/dashboard") : navigator("/onboarding")}}
          className="text-[16px] font-semibold text-[#0d1117] bg-[#3fb950] px-10 py-3.5 rounded-lg no-underline hover:bg-[#56d364] transition-colors"
        >
          Start analyzing →
        </a>
        {/* <a
          href="#"
          className="text-[16px] font-medium text-[#c9d1d9] border border-[#30363d] px-9 py-3.5 rounded-lg no-underline hover:border-[#8b949e] hover:text-[#f0f6fc] transition-colors"
        >
          View docs
        </a> */}
      </div>
    </div>
  );
}



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPg() {

useEffect(()=>{
  window.scroll(0,0)
},[])
  return (
    <>
      <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen font-sans antialiased">
       <Navbar/>
        <Hero />
        <StatsBar />
        <PurposeSection />
        <HowItWorksSection />
        <DimensionsSection />
        <FeaturesSection />
        <AudienceSection />
        <CTASection />
        <Footer/>
      </div>
    </>
  );
}
