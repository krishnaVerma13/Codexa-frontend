import { useNavigate } from "react-router-dom"
import { diffColor, langColor, langLabel, timeAgo, type Analysis } from "../../components/dashboard/constant";
import { useAnalysisHistory, useMyPatterns, useRecommendation, useUser } from "../../routes/queryHooks/User.Query";
import type { PatternData, Recommendation } from "../../components/recommendation/constant";
import { scoreColor } from "../../components/timeline/Cards";
import WelcomeBanner from "../../components/dashboard/WelcomBanncer";


const mono = (size = 11, color = "#3e4555"): React.CSSProperties => ({
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: size,
    color,
});

const cardStyle: React.CSSProperties = {
    background: "#141720",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: 16,
};

// ── Sub-components ────────────────────────────────────────────────────────────

const CardTitle = ({
    label,
    action,
    onAction,
}: {
    label: string;
    action?: string;
    onAction?: () => void;
}) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={mono(14, "#575873")}>{label}</span>
        {action && (
            <span onClick={onAction} style={{ ...mono(13, "#00d9c0"), cursor: "pointer" }}>
                {action}
            </span>
        )}
    </div>
);

const Spinner = () => (
    <div style={{
        width: 14, height: 14,
        border: "2px solid rgba(0,217,192,0.2)",
        borderTopColor: "#00d9c0",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        flexShrink: 0,
    }} />
);

const LoadingRow = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 0" }}>
        <Spinner />
        <span style={mono(13, "#3e4555")}>loading...</span>
    </div>
);

const EmptyNote = ({ msg }: { msg: string }) => (
    <div style={{ ...mono(13, "#3e4555"), padding: "20px 0", textAlign: "center" }}>{msg}</div>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────

const DIMS = ["readability", "efficiency", "security", "maintainability", "bestPractices"] as const;
type DimKey = typeof DIMS[number];



export default function Dashboard() {

    const navigate = useNavigate();

    // ── Queries ──
    const { data: userData } = useUser()
    const { data: historyRaw, isLoading: histLoading } = useAnalysisHistory()
    const { data: patternRaw, isLoading: patLoading } = useMyPatterns()
    const { data: recRaw, isLoading: recLoading } = useRecommendation()
    console.log("userData :", userData);
    console.log("historyRaw :", historyRaw);
    console.log("patternData :", patternRaw);
    console.log("recRaw :", recRaw);

    // ── Derived ──
    const analyses: Analysis[] = Array.isArray(historyRaw)
        ? historyRaw
        : historyRaw?.analyses ?? [];

    const recentAnalyses = [...analyses]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const totalAnalyses = analyses.length;

    const avgScore = analyses.length
        ? +(analyses.reduce((s, a) => s + a.overallScore, 0) / analyses.length).toFixed(1)
        : 0;

    const bestAnalysis = analyses.length
        ? analyses.reduce((m, a) => (a.overallScore > m.overallScore ? a : m), analyses[0])
        : null;

    const dimAvgs = DIMS.reduce((acc, dim) => {
        acc[dim] = analyses.length
            ? +(analyses.reduce((s, a) => s + (a.scores?.[dim]?.score ?? 0), 0) / analyses.length).toFixed(1)
            : 0;
        return acc;
    }, {} as Record<DimKey, number>);

    const weakestDim = analyses.length
        ? DIMS.reduce((a, b) => (dimAvgs[a] < dimAvgs[b] ? a : b))
        : null;

    // Sparkline — last 7 days ----------------------------------------------

    const last7 = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const label = d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2);
        const iso = d.toISOString().slice(0, 10);
        const count = analyses.filter((a) => a.createdAt?.startsWith(iso)).length;
        return { label, count };
    });

    const maxCount = Math.max(...last7.map((d) => d.count), 1);
    const thisWeekCount = last7.reduce((s, d) => s + d.count, 0);

    const patternData: PatternData = patternRaw?.data ?? { basedOnCount: 0, patterns: [] };
    const patterns: string[] = patternData.patterns ?? [];

    const recommendations: Recommendation[] =
        recRaw?.data?.recommendations ?? recRaw?.data ?? [];
    const topRecs = recommendations.slice(0, 3);

    // const userName = userData?.name ?? userData?.githubUsername ?? "there";
    // const anyLoading = histLoading || patLoading || recLoading;

    if(histLoading == false && analyses.length == 0 ){
        return<div
        className="absolute top-70 left-130 flex justify-center items-center"
        > <WelcomeBanner onStart={() => navigate("/codeEditor")} /></div>    
    }
    return (<>

        <div className="m-10" >
            <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeUp { from { opacity:0;transform:translateY(10px) } to { opacity:1;transform:translateY(0) } }
        .dc { animation: fadeUp 0.35s ease both }
        .dash-row:hover { background: rgba(255,255,255,0.025); border-radius: 6px }
        .dash-cta:hover { background: rgba(0,217,192,0.18) !important }
      `}</style>



            {/* ── KPI cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: "1.5rem" }}>
                {[
                    { label: "Total Analyses", value: totalAnalyses || "—", color: "#00d9c0", sub: `+${thisWeekCount} this week` },
                    { label: "Avg Score", value: avgScore || "—", color: avgScore ? scoreColor(avgScore) : "#3e4555", sub: "across all time" },
                    {
                        label: "Best Score",
                        value: bestAnalysis ? bestAnalysis.overallScore.toFixed(1) : "—",
                        color: bestAnalysis ? scoreColor(bestAnalysis.overallScore) : "#3e4555",
                        sub: bestAnalysis ? `${langLabel(bestAnalysis.language)} · ${timeAgo(bestAnalysis.createdAt)} ago` : "no analyses yet",
                    },
                    { label: "Patterns Found", value: patterns.length || "—", color: "#a78bfa", sub: `from ${patternData.basedOnCount} analyses` },
                ].map((item, i) => (
                    <div key={i} className="dc" style={{ ...cardStyle, animationDelay: `${i * 0.06}s` }}>
                        <div style={mono(14, "#777896")}>{item.label}</div>
                        <div style={{ fontSize: 26, fontWeight: 600, color: item.color, letterSpacing: "-0.5px", margin: "8px 0 4px" }}>
                            {item.value}
                        </div>
                        <div style={mono(13, "#575873")}>{item.sub}</div>
                    </div>
                ))}
            </div>


            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>

                {/* Recent analyses */}
                <div className="dc" style={{ ...cardStyle, animationDelay: "0.1s" }}>
                    
                    <CardTitle label="// recent_analyses" />
                    
                    {histLoading ? <LoadingRow /> : recentAnalyses.length === 0 ? (
                        <EmptyNote msg="// no analyses yet — submit code to start" />
                    ) : recentAnalyses.map((a, i) => {
                        const lc = langColor(a.language);
                        return (
                            <div
                                key={a._id ?? i}
                                className="dash-row"
                                onClick={() => navigate(`/analysis/${a._id}`)}
                                style={{
                                    display: "flex", alignItems: "center", padding: "8px 4px", cursor: "pointer",
                                    borderBottom: i < recentAnalyses.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                                }}
                            >
                                <span style={{ ...mono(13, lc.text), background: lc.bg, padding: "2px 8px", borderRadius: 10, flexShrink: 0 }}>
                                    {langLabel(a.language)}
                                </span>
                                <span style={{ ...mono(14, "#7a8394"), marginLeft: 10, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {a.language ?? "unknown"}
                                </span>
                                <span style={{ ...mono(15, scoreColor(a.overallScore)), fontWeight: 500 }}>
                                    {a.overallScore?.toFixed(1)}
                                </span>
                                <span style={{ ...mono(12, "#777896"), marginLeft: 10 }}>{timeAgo(a.createdAt)}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Dimension bars */}
                <div className="dc" style={{ ...cardStyle, animationDelay: "0.15s" }}>
                    <CardTitle label="// avg_dimension_scores" />
                        
                    <div className="my-8">
                    {histLoading ? <LoadingRow /> : (
                        <>
                            {DIMS.map((dim) => {
                                const val = dimAvgs[dim];
                                return (
                                    <div key={dim} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10  }}>
                                        <span style={{ ...mono(13, "#7a8394"), width: 114, flexShrink: 0 }}>{dim}</span>
                                        <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                                            <div style={{ height: "100%", width: `${val}%`, background: scoreColor(val), borderRadius: 3, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
                                        </div>
                                        <span style={{ ...mono(14, "#7a8394"), width: 30, textAlign: "right" }}>{val}</span>
                                    </div>
                                );
                            })}
                            {weakestDim && (
                                <div style={{ marginTop: 18, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                    <span style={mono(10, "#3e4555")}>// weakest dim → </span>
                                    <span style={mono(11, "#f87171")}>{weakestDim} ({dimAvgs[weakestDim]})</span>
                                </div>
                            )}
                        </>
                    )}
                    </div>
                </div>
            </div>

            {/* ── Activity + Recommendations + Patterns ── */}
            <div 
            className="my-6"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

                {/* Sparkline */}
                <div className="dc" style={{ ...cardStyle, animationDelay: "0.2s" }}>
                    <CardTitle label="// activity_last_7d" action="timeline →" onAction={() => navigate("/timeline")} />

                    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 180 }}>
                        {last7.map((d, i) => {
                            const h = d.count === 0 ? 4 : Math.max(8, Math.round((d.count / maxCount) * 48));
                            return (
                                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                                    <div style={{
                                        width: "100%", height: h,
                                        background: d.count > 0 ? "rgba(0,217,192,0.4)" : "rgba(255,255,255,0.05)",
                                        borderRadius: "3px 3px 0 0",
                                    }} />
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                        {last7.map((d, i) => (
                            <div key={i} style={{ flex: 1, textAlign: "center", ...mono(12, "#abadcf") }}>{d.label}</div>
                        ))}
                    </div>
                    <div 
                    className=""
                    style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)", ...mono(12, "#575873") }}>
                        {thisWeekCount} analyses this week
                    </div>
                </div>

                {/* Recommendations */}
                <div className="dc" style={{ ...cardStyle, animationDelay: "0.25s" }}>
                    <CardTitle label="// recommendations" action="see all →" onAction={() => navigate("/recommendations")} />
                    {recLoading ? <LoadingRow /> : topRecs.length === 0 ? (
                        <EmptyNote msg="// no recommendations yet" />
                    ) : topRecs.map((rec, i) => {
                        const dc = diffColor(rec.difficulty);
                        return (
                            <div key={i} style={{
                                display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0",
                                borderBottom: i < topRecs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                            }}>
                                <span style={{ ...mono(12, dc.text), background: dc.bg, padding: "2px 7px", borderRadius: 8, flexShrink: 0, marginTop: 1 }}>
                                    {rec.difficulty}
                                </span>
                                <div>
                                    <div style={{ fontSize: 14, color: "#e8eaed", fontWeight: 500 }}>{rec.topic}</div>
                                    <div style={{ fontSize: 13, color: "#777896", marginTop: 2, lineHeight: 1.4 }}>{rec.reason}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
                {/* Patterns */}
                <div className="dc" style={{ ...cardStyle, animationDelay: "0.3s" }}>
                    <CardTitle label="// code_patterns" />
                    {patLoading ? <LoadingRow /> : patterns.length === 0 ? (
                        <EmptyNote msg="// patterns build up over time" />
                    ) : (
                        <>
                            <div style={{ marginBottom: 12 }}>
                                {patterns.map((p, i) => (
                                    <span key={i} style={{
                                        display: "inline-block",
                                        ...mono(10, "#7a8394"),
                                        padding: "3px 9px", borderRadius: 10,
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        margin: "6px 6px 6px 6xp",
                                        fontSize:12
                                    }}>
                                        {p}
                                    </span>
                                ))}
                            </div>
                            <div style={{ paddingTop: 10, borderTop: "2px solid rgba(255,255,255,0.05)", ...mono(12, "#777896") }}>
                                based on {patternData.basedOnCount} analyses
                            </div>
                        </>
                    )}
                </div>




        </div>

    </>)
}




