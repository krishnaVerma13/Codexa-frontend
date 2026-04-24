import { DIFFICULTY_CONFIG, RESOURCE_CONFIG, type Recommendation } from "./constant";

export function PatternPill({ pattern }: { pattern: string }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        padding: "5px 12px",
        borderRadius: 6,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#7a8394",
        lineHeight: 1.4,
      }}
    >
      <span style={{ color: "#3e4555", marginRight: 6 }}>//</span>
      {pattern}
    </div>
  );
}


export function RecommendationCard({
  rec,
  index,
}: {
  rec: Recommendation;
  index: number;
}) {
  const diff = DIFFICULTY_CONFIG[rec.difficulty] ?? DIFFICULTY_CONFIG.beginner;
  const res = RESOURCE_CONFIG[rec.resourceType] ?? RESOURCE_CONFIG.article;

  return (
    <div
      style={{
        background: "#131618",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        animation: "fadeUp 0.3s ease both",
        animationDelay: `${index * 0.06}s`,
        transition: "border-color 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.12)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.06)")
      }
    >
      {/* Top row: index + badges */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#3e9555",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 4,
            padding: "2px 8px",
          }}
        >
          #{String(index + 1).padStart(2, "0")}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {/* Resource type */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              padding: "3px 9px",
              borderRadius: 20,
              background: `${res.color}15`,
              border: `1px solid ${res.color}30`,
              color: res.color,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 9 }}>{res.icon}</span>
            {res.label}
          </span>
          {/* Difficulty */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              padding: "3px 9px",
              borderRadius: 20,
              background: diff.bg,
              border: `1px solid ${diff.border}`,
              color: diff.color,
            }}
          >
            {diff.label}
          </span>
        </div>
      </div>

      {/* Topic */}
      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 400,
            wordSpacing : 2,
            color: "#e8eaed",
            lineHeight: 1.35,
            marginBottom: 6,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {rec.topic}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#7a8394",
            lineHeight: 1.6,
          }}
        >
          <span style={{fontSize : 18 , color: "#3e4555" }}>reason: </span>
          {rec.reason}
        </div>
      </div>

      {/* Accent bar bottom */}
      <div
        style={{
          height: 2,
          borderRadius: 1,
          background: `linear-gradient(to right, ${diff.color}40, transparent)`,
          marginTop: 2,
        }}
      />
    </div>
  );
}


export function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        gap: 12,
        color: "#3e4555",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 32, opacity: 0.4 }}>◈</div>
      <div>// no recommendations yet</div>
      <div style={{ fontSize: 10, color: "#2a2f3a" }}>
        submit more code analyses to generate personalized suggestions
      </div>
    </div>
  );
}