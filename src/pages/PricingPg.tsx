import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { LuSparkles } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

type Billing = "monthly" | "annual";

interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  color: string;
  popular?: boolean;
  cta: string;
  ctaTo: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "01",
    name: "Starter",
    tagline: "For developers getting their first read on their own code.",
    monthly: 0,
    annual: 0,
    color: "#B8E8FF",
    cta: "Start Free",
    ctaTo: "/onboarding",
    features: [
      "1 repository analysis / month",
      "Core 5-dimension skill score",
      "Basic learning recommendations",
      "Community support",
    ],
  },
  {
    id: "02",
    name: "Developer",
    tagline: "For developers who want the full picture, updated continuously.",
    monthly: 10,
    annual: 7,
    color: "#B8F5D4",
    popular: false,
    cta: "Start Analysis",
    ctaTo: "/onboarding",
    features: [
      "Unlimited repository analysis",
      "Full skill growth timeline",
      "AI-powered recommendations (Gemini)",
      "Behavioral pattern detection",
      "Priority email support",
    ],
  },
  // {
  //   id: "03",
  //   name: "Squad",
  //   tagline: "For teams who want a shared read on engineering skill.",
  //   monthly: 39,
  //   annual: 31,
  //   color: "#D4BCFF",
  //   cta: "Talk to Us",
  //   ctaTo: "/onboarding",
  //   features: [
  //     "Everything in Developer",
  //     "Team analytics dashboard",
  //     "Admin panel & role management",
  //     "Shared skill benchmarks",
  //     "Dedicated support",
  //   ],
  // },
];

const faqs = [
  {
    q: "Do you store my source code?",
    a: "No. Codexa reads metadata, commit patterns, and file structure to generate your score — your code itself is never stored on our servers.",
  },
  {
    q: "What counts as a repository analysis?",
    a: "Each time you run a fresh analysis on a repository. Re-viewing a report you've already generated doesn't count against your limit.",
  },
  {
    q: "Can I switch plans or cancel anytime?",
    a: "Yes. Upgrades apply immediately, downgrades and cancellations take effect at the end of your current billing cycle — no lock-in.",
  },
  // {
  //   q: "Is there a discount for students?",
  //   a: "Yes — students with a verified .edu or campus email get 50% off the Developer plan. Reach out after signing up and we'll apply it.",
  // },
];

const PricingPg = () => {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      <Navbar variant="landing" />

      {/* Hero */}
      <section className="pt-40 pb-16 md:pb-24 px-4 md:px-12">
        <div className="max-w-350 mx-auto text-center">
          <div className="font-mono text-xs text-[#B8F5D4] mb-6 tracking-wider">
            PRICING · SIMPLE &amp; TRANSPARENT
          </div>
          <h1 className="font-display text-[13vw] md:text-[6.5vw] leading-none text-[#F0F2F5] mb-6">
            PLANS THAT{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #F0F2F5" }}>
              SCALE
            </span>{" "}
            WITH YOU.
          </h1>
          <p className="font-mono text-sm text-[#454C5E] font-light max-w-lg mx-auto mb-10">
            Start free, see where you stand, and upgrade only when your codebase
            outgrows the basics.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 border border-[#1E2330] rounded-full p-1 bg-[#0D1117]">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full font-mono text-xs transition-colors cursor-pointer border-none ${
                billing === "monthly"
                  ? "bg-[#B8F5D4] text-[#06070A]"
                  : "bg-transparent text-[#454C5E]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-full font-mono text-xs transition-colors cursor-pointer border-none flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-[#B8F5D4] text-[#06070A]"
                  : "bg-transparent text-[#454C5E]"
              }`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FFD4B8]/10 text-[#FFD4B8]">
                Save 25%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 md:px-12 pb-20 md:pb-40">
        <div className="max-w-250 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#0D1117] border rounded-xl p-8 md:p-10 flex flex-col transition-all ${
                plan.popular
                  ? "border-[#B8F5D4]/50 md:-translate-y-4"
                  : "border-[#1E2330] hover:border-[#454C5E]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-[#B8F5D4] to-[#D4BCFF] font-mono text-[10px] tracking-wider text-[#06070A] whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}

              <div className="font-display text-3xl text-[#1E2330] leading-none mb-4">
                {plan.id}
              </div>

              <h3 className="font-display text-3xl mb-2" style={{ color: plan.color }}>
                {plan.name}
              </h3>
              <p className="font-mono text-xs text-[#454C5E] font-light mb-8 min-h-10">
                {plan.tagline}
              </p>

              <div className="flex items-end gap-2 mb-8">
                <span className="font-display text-6xl text-[#F0F2F5]">
                  ${billing === "monthly" ? plan.monthly : plan.annual}
                </span>
                <span className="font-mono text-xs text-[#454C5E] mb-2">
                  / month{plan.monthly > 0 && billing === "annual" ? ", billed annually" : ""}
                </span>
              </div>

              <Link
                to={plan.ctaTo}
                className={`w-full px-6 py-3.5 rounded-sm font-mono text-sm text-center transition-colors flex items-center justify-center gap-2 mb-8 ${
                  plan.popular
                    ? "bg-[#B8F5D4] text-[#06070A] hover:bg-[#A5E5C1]"
                    : "border border-[#1E2330] text-[#F0F2F5] hover:border-[#B8F5D4]"
                }`}
              >
                {plan.cta} <FaArrowRight size={12} />
              </Link>

              <div className="flex flex-col gap-3 mt-auto">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <IoMdCheckmarkCircle
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: plan.color }}
                    />
                    <span className="font-mono text-xs text-[#F0F2F5] font-light">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature strip — what a repo analysis buys you */}
      <section className="border-y border-[#1E2330] py-6 overflow-hidden bg-[#0D1117]">
        <div className="animate-marquee whitespace-nowrap font-display text-lg md:text-2xl text-[#454C5E]">
          <span className="inline-flex items-center gap-6 px-6">
            No card required on Starter <span className="w-2 h-2 rounded-full bg-[#B8F5D4]" />
            Cancel anytime <span className="w-2 h-2 rounded-full bg-[#D4BCFF]" />
            Code never stored <span className="w-2 h-2 rounded-full bg-[#FFD4B8]" />
            Upgrade in one click <span className="w-2 h-2 rounded-full bg-[#B8E8FF]" />
            Student discount available <span className="w-2 h-2 rounded-full bg-[#FFF0A8]" />
          </span>
          <span className="inline-flex items-center gap-6 px-6">
            No card required on Starter <span className="w-2 h-2 rounded-full bg-[#B8F5D4]" />
            Cancel anytime <span className="w-2 h-2 rounded-full bg-[#D4BCFF]" />
            Code never stored <span className="w-2 h-2 rounded-full bg-[#FFD4B8]" />
            Upgrade in one click <span className="w-2 h-2 rounded-full bg-[#B8E8FF]" />
            Student discount available <span className="w-2 h-2 rounded-full bg-[#FFF0A8]" />
          </span>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-40 px-4 md:px-12">
        <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="font-mono text-xs text-[#B8F5D4] mb-6 tracking-wider">
              QUESTIONS
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-[#F0F2F5] leading-tight mb-4">
              Still deciding /<br />
              <span className="font-accent italic text-[#D4BCFF]">that's fair</span>
            </h2>
            <p className="font-mono text-sm text-[#454C5E] font-light max-w-md">
              The essentials, answered plainly. Reach out if yours isn't here.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="bg-[#0D1117] border border-[#1E2330] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-transparent border-none cursor-pointer text-left"
                  >
                    <span className="font-mono text-sm text-[#F0F2F5]">{item.q}</span>
                    <span className="font-display text-xl text-[#B8F5D4] shrink-0">
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="font-mono text-xs text-[#454C5E] font-light leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-40 px-4 md:px-12 bg-[#0D1117]">
        <div className="max-w-350 mx-auto flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-lg bg-[#B8F5D4]/10 flex items-center justify-center mb-8">
            <LuSparkles className="text-[#B8F5D4]" size={24} />
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-[#F0F2F5] mb-6">
            Know your<br />real level.
          </h2>
          <p className="font-mono text-sm text-[#454C5E] mb-10 font-light max-w-md">
            Stop guessing. Start knowing. Your first repository analysis is free —
            no card required.
          </p>
          <Link
            to="/onboarding"
            className="px-8 py-4 bg-[#B8F5D4] text-[#06070A] font-mono text-sm rounded-sm hover:bg-[#A5E5C1] transition-colors flex items-center gap-2"
          >
            Start Free Analysis <FaArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPg;