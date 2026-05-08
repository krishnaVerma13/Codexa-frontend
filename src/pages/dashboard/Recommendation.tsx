import { useEffect, useState } from "react";
import { GetMyPattern, GetRecommendation } from "../../services/NwConfig";
import type { RecommendationsData , Recommendation, PatternData } from "../../components/recommendation/constant";
import {  RESOURCE_CONFIG } from "../../components/recommendation/constant";
import { PatternPill  , RecommendationCard , EmptyState} from "../../components/recommendation/Cards";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "../../components/dashboard/WelcomBanncer";





// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return "just now";
}


type FilterType = "all" | "beginner" | "intermediate" | "advanced";
type ResourceFilter = "all" | Recommendation["resourceType"];


export default function Recommendations() {

  const navigator = useNavigate()

  const { data, isLoading, error } = useQuery({
  queryKey: ["RecData"],
  queryFn: async () => {
    const [recom, pattern] = await Promise.all([
      GetRecommendation(),
      GetMyPattern(),
    ]);

    return { recom, pattern };
  },
  refetchOnWindowFocus : false,
    refetchOnMount : false,
    staleTime: 5 * 60 * 1000 // 5 minute
});

const  recResponse = data?.recom;
  const  patResponse = data?.pattern;

  const [recData, setData] = useState<RecommendationsData | null>(null);
  const [patterns, setPatterns] = useState<PatternData | null>(null);
  const [err, setError] = useState<string | null>(error?.message || null);
  const [diffFilter, setDiffFilter] = useState<FilterType>("all");
  const [resFilter, setResFilter] = useState<ResourceFilter>("all");
  const [showPatterns, setShowPatterns] = useState(false);


  useEffect(() => {
   if(!isLoading){
    if (!recResponse || recResponse.success === false) {
        setError(recResponse.message)
        return;
        // throw new Error(`Failed to fetch recommendations (${recResponse.status})`);
      }
      if (!patResponse || patResponse.success === false) {
        setError(patResponse.message)
        return
        // throw new Error(`Failed to fetch recommendations (${recResponse.status})`);
      }
      setData(recResponse.data);
      setPatterns(patResponse.data);
   }
  }, [data]);

  // ── Filtered recs ──
  const recs = recData?.recommendations ?? [];
  const filtered = recs.filter((r) => {
    if (diffFilter !== "all" && r.difficulty !== diffFilter) return false;
    if (resFilter !== "all" && r.resourceType !== resFilter) return false;
    return true;
  });

  // ── Counts by difficulty ──
  const counts = {
    beginner: recs.filter((r) => r.difficulty === "beginner").length,
    intermediate: recs.filter((r) => r.difficulty === "intermediate").length,
    advanced: recs.filter((r) => r.difficulty === "advanced").length,
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#0d0f12",
    color: "#e8eaed",
    fontFamily: "'Syne', sans-serif",
    padding: "1.75rem 1.5rem 4rem",
    minWidth: "100vh",
    margin: "0 auto",
  };

  // ── Loading ──
  if (isLoading) {
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
          loading recommendations...
        </span>
      </div>
    );
  }

  // ── Error ──
  if (err) {
    return (
      <div
      className="flex flex-col"
        style={{
          ...pageStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
            <WelcomeBanner onStart={() => navigator("/codeEditor")} /> 

         <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            color: "#3e4555",
            textAlign: "center",
          }}
        >
          <div className="flex justify-center mb-5">
            {/* <PiWarningDiamondBold className="mx-2 text-5xl"/> */}
            </div>
         {err}
        </div>
       
      </div>
    );
  }

   if(patResponse?.data?.length  == 0  || recResponse?.data?.length == 0 ){
            return<div
            className="absolute top-70 left-130 flex justify-center items-center"
            > <WelcomeBanner onStart={() => navigator("/codeEditor")} /></div>    
        }

  return (
    <div className="mx-10 mt-10 mb-20">
      

      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "1.75rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              color: "#3e4555",
              marginTop: 0,
            }}
          >
            // based on {patterns?.basedOnCount ?? 0} analyses ·{" "}
            {recData?.generatedAt ? timeAgo(recData.generatedAt) : ""}
        
        </div>

        {/* Pattern toggle */}
        {patterns?.patterns?.length ? (
          <button
            onClick={() => setShowPatterns((p) => !p)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              padding: "5px 12px",
              borderRadius: 20,
              border: `1px solid ${showPatterns ? "#00d9c0" : "rgba(255,255,255,0.11)"}`,
              background: showPatterns ? "rgba(0,217,192,0.1)" : "transparent",
              color: showPatterns ? "#00d9c0" : "#7a8394",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {showPatterns ? "hide" : "show"} patterns ({patterns.patterns.length})
          </button>
        ) : null}
      </div>

      {/* ── Patterns panel ── */}
      {showPatterns && patterns?.patterns?.length ? (
        <div
          style={{
            background: "#131618",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "16px 18px",
            marginBottom: "1.5rem",
            animation: "fadeUp 0.2s ease both",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "#3e8555",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: 10,
            }}
          >
            detected patterns
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 , paddingBottom : 16 }}>
            {patterns.patterns.map((p, i) => (
              <PatternPill key={i} pattern={p} />
            ))}
          </div>
        </div>
      ) : null}

      {/* ── Stats row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          marginBottom: "1.5rem",
          alignItems : "center",
          justifyItems: "center"
        }}
      >
        {[
          { label: "Total", value: recs.length, color: "#e8eaed" },
          { label: "Beginner", value: counts.beginner, color: "#4ade80" },
          { label: "Intermediate", value: counts.intermediate, color: "#fbbf24" },
          { label: "Advanced", value: counts.advanced, color: "#f87171" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: "#131618",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "12px 14px",
              width : 180,
              height : 110
            }}
          >
            <div style={{ fontSize: 42, fontWeight: 600, color , justifyContent : "center"  }}>{value}</div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace    ",
                fontSize: 12,
                color: "#3e4555",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: 5,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop : "3.75rem",
          marginBottom: "1.75rem",
          flexWrap: "wrap",
        }}
      >
        {/* Difficulty filter */}
        {(["all", "beginner", "intermediate", "advanced"] as FilterType[]).map(
          (f) => (
            <button
              key={f}
              onClick={() => setDiffFilter(f)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                padding: "4px 10px",
                borderRadius: 20,
                border: `1px solid ${
                  diffFilter === f ? "#00d9c0" : "rgba(255,255,255,0.08)"
                }`,
                background:
                  diffFilter === f ? "rgba(0,217,192,0.1)" : "transparent",
                color: diffFilter === f ? "#00d9c0" : "#7a8394",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f === "all" ? "all levels" : f}
            </button>
          )
        )}

        <div
          style={{
            width: 2,
            background: "rgba(255,255,255,0.4)",
            margin: "0 4px",
          }}
        />

        {/* Resource type filter */}
        {(
          [
            "all",
            "documentation",
            "video",
            "practice",
            "book",
            "article",
          ] as ResourceFilter[]
        ).map((f) => (
          <button
            key={f}
            onClick={() => setResFilter(f)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              padding: "4px 10px",
              borderRadius: 20,
              border: `1px solid ${
                resFilter === f
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.06)"
              }`,
              background:
                resFilter === f ? "rgba(255,255,255,0.06)" : "transparent",
              color: resFilter === f ? "#e8eaed" : "#7a8394",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {f === "all"
              ? "all types"
              : (RESOURCE_CONFIG[f as Recommendation["resourceType"]]?.icon ?? "") +
                " " +
                f}
          </button>
        ))}
      </div>

      {/* ── Cards grid ── */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: 10,
          }}
        >
          {filtered.map((rec, i) => (
            <RecommendationCard key={i} rec={rec} index={i} />
          ))}
        </div>
      )}

      
    </div>
  );
}
