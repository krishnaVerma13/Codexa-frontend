import { useState } from "react";
import { DIM_COLORS, DIM_LABELS, DIMS, type WeekData } from "./constants";

export function KPICard({
  label,
  value,
  valueColor,
  sub,
  subColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
  sub: string;
  subColor?: string;
}) {
  return (
    <div
      style={{
        background: "#131618",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "#3e4555",
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          marginBottom: 5,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          lineHeight: 1,
          color: valueColor ?? "#e8eaed",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          marginTop: 3,
          color: subColor ?? "#3e4555",
        }}
      >
        {sub}
      </div>
    </div>
  );
}


export function WeekMiniBar({ week }: { week: WeekData }) {
  const max = Math.max(...DIMS.map((d) => week[d]));
  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        alignItems: "flex-end",
        height: 28,
      }}
    >
      {DIMS.map((d) => (
        <div
          key={d}
          title={`${DIM_LABELS[d]}: ${week[d].toFixed(1)}`}
          style={{
            width: 12,
            height: Math.round((week[d] / max) * 26),
            background: DIM_COLORS[d],
            borderRadius: "2px 2px 0 0",
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
}

export function scoreColor(s: number): string {
  if (s >= 80) return "#4ade80";
  if (s >= 70) return "#00d9c0";
  if (s >= 60) return "#fbbf24";
  return "#f87171";
}

function scoreGrade(s: number): string {
  if (s >= 90) return "A+";
  if (s >= 80) return "A";
  if (s >= 70) return "B";
  if (s >= 60) return "C";
  return "D";
}

function formatPeriod(p: string): string {
  // "2026-W17" → "W17 · 2026"
  const [year, week] = p.split("-");
  return `${week} · ${year}`;
}

export function WeekCard({ week, index }: { week: WeekData; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      key={index}
      onClick={() => setOpen((o) => !o)}
      style={{
        background: "#131618",
        border: `1px solid ${open ? "rgba(0,217,192,0.22)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.15s",
      }}
    >
      {/* Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 1fr auto 32px",
          alignItems: "center",
          gap: 12,
          padding: "12px 14px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#7a8394",
            }}
          >
            {formatPeriod(week.period)}
          </div>
          {week.topLanguage && (
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: "#3e4555",
                marginTop: 2,
              }}
            >
              {week.topLanguage}
              {week.count ? ` · ${week.count} analyses` : ""}
            </div>
          )}
        </div>

        <WeekMiniBar week={week} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {week.improved !== undefined && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: week.improved ? "#4ade80" : "#f87171",
              }}
            >
              {week.improved ? "▲" : "▼"}
            </span>
          )}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 500,
              color: scoreColor(week.overallScore),
            }}
          >
            {week.overallScore.toFixed(1)}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              padding: "2px 7px",
              borderRadius: 20,
              background: `${scoreColor(week.overallScore)}18`,
              border: `1px solid ${scoreColor(week.overallScore)}33`,
              color: scoreColor(week.overallScore),
            }}
          >
            {scoreGrade(week.overallScore)}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#3e4555",
            textAlign: "center",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ↓
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div
          style={{
            padding: "0 14px 14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
              marginTop: 12,
            }}
          >
            {DIMS.map((d) => (
              <div
                key={d}
                style={{
                  background: "#0d0f12",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  padding: "10px 10px 8px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "#3e4555",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: 5,
                  }}
                >
                  {DIM_LABELS[d]}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 20,
                    fontWeight: 600,
                    color: DIM_COLORS[d],
                    marginBottom: 6,
                    lineHeight: 1,
                  }}
                >
                  {week[d].toFixed(1)}
                </div>
                <div
                  style={{
                    height: 2,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${week[d]}%`,
                      background: DIM_COLORS[d],
                      borderRadius: 1,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}