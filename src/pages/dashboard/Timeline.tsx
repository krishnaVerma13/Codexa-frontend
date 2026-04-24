import { useEffect, useState } from "react";
import { GetTimeline } from "../../services/NwConfig";
import { DIMS, DIM_LABELS , type Dim } from "../../components/timeline/constants";
import { KPICard , WeekCard , scoreColor} from "../../components/timeline/Cards";
import { type WeekData } from "../../components/timeline/constants";
import { TrendChart } from "../../components/timeline/TrendChart";
import { useQuery } from "@tanstack/react-query";


const PPdata = [
  {
    "bestPractices": 65.6,
    "efficiency": 79.9,
    "maintainability": 34,
    "overallScore": 74.3,
    "period": "2026-W9",
    "readability": 90.1,
    "security": 72.4,
  },
  {
    "bestPractices": 35.6,
    "efficiency": 79.9,
    "maintainability": 74,
    "overallScore": 74.3,
    "period": "2026-W10",
    "readability": 80.1,
    "security": 72.4,
  },
  {
    "bestPractices": 65.6,
    "efficiency": 29.9,
    "maintainability": 74,
    "overallScore": 44.3,
    "period": "2026-W4",
    "readability": 80.1,
    "security": 72.4,
  },
  {
    "bestPractices": 65.6,
    "efficiency": 79.9,
    "maintainability": 70,
    "overallScore": 43,
    "period": "2026-W4",
    "readability": 80.1,
    "security": 34,
  },
  {
    "bestPractices": 65.6,
    "efficiency": 79.9,
    "maintainability": 74,
    "overallScore": 74.3,
    "period": "2026-04",
    "readability": 80.1,
    "security": 72.4,
  },
  {
    "bestPractices": 65.6,
    "efficiency": 55,
    "maintainability": 74,
    "overallScore": 74.3,
    "period": "2026-04",
    "readability": 88,
    "security": 72.4,
  },
  {
    "bestPractices": 65.6,
    "efficiency": 79.9,
    "maintainability": 74,
    "overallScore": 74.3,
    "period": "2026-04",
    "readability": 80.1,
    "security": 72.4,
  },
]

type TimelineFetchIn = "week" | "month";

export default function Timeline() {

  const [timelineDueration , setTimelineDuration] = useState<TimelineFetchIn>("week")
  
  const {data : APiData , isLoading , error : err} = useQuery({
    queryKey : ['Timeline'],
    queryFn : ()=> GetTimeline(timelineDueration),
    refetchOnWindowFocus : false,
    refetchOnMount : false,
    staleTime: 5 * 60 * 1000 // 5 minute
  })
  // const response = APiData;
  const [allData, setAllData] = useState<WeekData[]>([]);
  const [rangeN, setRangeN] = useState(8);
  const [hiddenDims, setHiddenDims] = useState<Set<Dim>>(new Set());
  const [error, setError] = useState<string | null>(err?.message || null);

 

  useEffect(() => {
    // console.log("loading :",isLoading);
    // console.log("error :",err);
    // console.log("data :",APiData);

    if(!isLoading){
   if (!APiData ) {
        setError("No response from GetTimeline");
        return
      }
      const payload = "data" in APiData ? APiData.data : APiData;

      if (!payload?.success) {
        setError(payload?.message ?? "Failed to load timeline");
        return
      }
      // console.log("payload data :", payload.data);

      const sorted = [...(PPdata as WeekData[])].sort((a, b) =>
        a.period.localeCompare(b.period)
      );
      setAllData(sorted);
    if(err) {
      setError(err instanceof Error ? err.message : String(err));
    } 
  }
  }, [APiData]);

  // ── Derived ──
  const data = allData.slice(-rangeN);

  const latest = data[data.length - 1];
  const prev4 = data.length >= 5 ? data[data.length - 5] : data[0];

  const peak = data.reduce(
    (m, d) => (d.overallScore > m.overallScore ? d : m),
    data[0] ?? ({ overallScore: 0 } as WeekData)
  );
  const trend = latest && prev4
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
    maxWidth: 900,
    margin: "0 auto",
  };

  // ── Render ──
  if (isLoading) {
    return (
      <div style={{ ...pageStyle, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
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
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#3e4555" }}>
          fetching timeline...
        </span>
      </div>
    );
  }

  if (error != null) {
    return (
      <div style={{ ...pageStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          // error: {error}
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div style={{ ...pageStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#3e4555",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 12 }}>⌀</div>
          // no analyses yet — submit code to build your timeline
        </div>
      </div>
    );
  }

  return (
    <div className="mx-15 mt-10 mb-20"    >

      {/* Header */}
      {/* <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "1.75rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.3px", color: "#e8eaed" }}>
            Timeline
          </h1>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#3e4555",
              marginTop: 3,
            }}
          >
            // weekly_quality_report · {allData.length} weeks tracked
          </div>
        </div>

        
      </div> */}

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
          sub={peak?.period ?? "best week"}
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

      {/* Range toggle */}
      <div style={{ display: "flex", gap: 5, justifyContent: "end", marginBottom: 10 }}>
        {[
          { n: 8, label: "8w" },
          { n: 16, label: "16w" },
          { n: 9999, label: "All" },
        ].map(({ n, label }) => (
          <button
            key={n}
            onClick={() => setRangeN(n)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              padding: "4px 10px",
              borderRadius: 20,
              border: `1px solid ${rangeN === n ? "#00d9c0" : "rgba(255,255,255,0.11)"}`,
              background: rangeN === n ? "rgba(0,217,192,0.1)" : "transparent",
              color: rangeN === n ? "#00d9c0" : "#7a8394",
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

      {/* Week list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[...data].reverse().map((week, ii) => (
          <div
            key={ii}
            className="tl-row"
            style={{ animationDelay: `${ii * 0.04}s` }}
          >
            <WeekCard week={week} index={ii} />
          </div>
        ))}
      </div>
    </div>
  );
}