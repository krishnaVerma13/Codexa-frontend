import { useState } from "react";
import { GetTimeline } from "../../services/NwConfig";
import { DIMS, DIM_LABELS, type Dim } from "../../components/timeline/constants";
import { KPICard, WeekCard, scoreColor } from "../../components/timeline/Cards";
import { type WeekData } from "../../components/timeline/constants";
import { TrendChart } from "../../components/timeline/TrendChart";
import { useQuery } from "@tanstack/react-query";
import WelcomeBanner from "../../components/dashboard/WelcomBanncer";
import { useNavigate } from "react-router-dom";

interface APIResponce {
  success: boolean;
  message: string;
  data?: object;
  error?: any;
}

type TimelineFetchIn = "week" | "month" | "day";

export default function Timeline() {
  const navigator = useNavigate()
  const [groupBy, setGroupBy] = useState<TimelineFetchIn>("day");
  const [hiddenDims, setHiddenDims] = useState<Set<Dim>>(new Set());

  const { data: APiData, isLoading: loading, error: err } = useQuery<APIResponce>({
    queryKey: ["Timeline", groupBy],        // ← groupBy in key = refetch on change
    queryFn: () => GetTimeline(groupBy),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });

  // ── Derive allData directly from query (no shadow useState needed) ──
  const allData: WeekData[] = (() => {
    if (!APiData?.success || !APiData.data) return [];
    return [...(APiData.data as WeekData[])].sort((a, b) =>
      a.period.localeCompare(b.period)
    );
  })();

  const data = allData; // all periods returned; backend already scopes by groupBy

  // ── Derived stats ──
  const latest = data[data.length - 1];
  const prev4 = data.length >= 5 ? data[data.length - 5] : data[0];

  const peak = data.reduce(
    (m, d) => (d.overallScore > m.overallScore ? d : m),
    data[0] ?? ({ overallScore: 0 } as WeekData)
  );

  const trend =
    latest && prev4
      ? +(latest.overallScore - prev4.overallScore).toFixed(1)
      : 0;

  const avgByDim = DIMS.map((d) => ({
    d,
    v: data.length ? data.reduce((s, w) => s + w[d], 0) / data.length : 0,
  })).sort((a, b) => a.v - b.v);
  const weakest = avgByDim[0];

  const toggleDim = (d: Dim) => {
    setHiddenDims((prev) => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  };

  // ── Styles ──
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#0d0f12",
    color: "#e8eaed",
    fontFamily: "'Syne', sans-serif",
    padding: "1.75rem 1.5rem 4rem",
    minWidth: "100vh",
    margin: "0 auto",
  };

  // ── Render guards ──
  if (loading) {
    return (
      <div
        style={{
          ...pageStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            border: "2px solid rgba(0,217,192,0.2)",
            borderTopColor: "#00d9c0",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#3e4555",
          }}
        >
          fetching timeline...
        </span>
      </div>
    );
  }

  if (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return (
      <div
        style={{
          ...pageStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#f87171",
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: 8,
            padding: "12px 16px",
          }}
        >
            {msg}
        </div>
      </div>
    );
  }

 


  if(loading == false && data.length == 0 ){
          return<div
          className="absolute top-70 left-130 flex justify-center items-center"
          > <WelcomeBanner onStart={() => navigator("/codeEditor")} /></div>    
      }

  return (
    <div className="mx-15 mt-10 mb-20">
      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          marginBottom: "1.75rem",
        }}
      >
        <KPICard
          label="Current score"
          value={latest?.overallScore.toFixed(1) ?? "—"}
          valueColor={latest ? scoreColor(latest.overallScore) : undefined}
          sub={latest?.period ?? ""}
        />
        <KPICard
          label="Peak score"
          value={peak?.overallScore.toFixed(1) ?? "—"}
          valueColor={peak ? scoreColor(peak.overallScore) : undefined}
          sub={peak?.period ?? "best period"}
        />
        <KPICard
          label="Trend"
          value={(trend >= 0 ? "+" : "") + trend}
          valueColor={trend >= 0 ? "#4ade80" : "#f87171"}
          sub={trend >= 0 ? "improving" : "declining"}
          subColor={trend >= 0 ? "#4ade80" : "#f87171"}
        />
        <KPICard
          label="Weakest dim"
          value={weakest ? DIM_LABELS[weakest.d] : "—"}
          valueColor="#fbbf24"
          sub={weakest ? `${weakest.v.toFixed(1)} avg` : ""}
        />
      </div>

      {/* Group-by toggle */}
      <div style={{ display: "flex", gap: 5, justifyContent: "end", marginBottom: 10 }}>
        {(["day", "week", "month"] as TimelineFetchIn[]).map((label) => (
          <button
            key={label}
            onClick={() => setGroupBy(label)}           // ← single setter, query auto-refetches
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              padding: "4px 10px",
              borderRadius: 20,
              border: `1px solid ${groupBy === label ? "#00d9c0" : "rgba(255,255,255,0.11)"}`,
              background: groupBy === label ? "rgba(0,217,192,0.1)" : "transparent",
              color: groupBy === label ? "#00d9c0" : "#7a8394",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Trend chart */}
      <TrendChart data={data} hiddenDims={hiddenDims} onToggleDim={toggleDim} />

      {/* Period list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[...data].reverse().map((week, ii) => (
          <div key={ii} className="tl-row" style={{ animationDelay: `${ii * 0.04}s` }}>
            <WeekCard week={week} index={ii} />
          </div>
        ))}
      </div>
    </div>
  );
}
