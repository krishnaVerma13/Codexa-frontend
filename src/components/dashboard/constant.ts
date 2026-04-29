// ── Types ─────────────────────────────────────────────────────────────────────

export interface APIResponce {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export interface Analysis {
  _id: string;
  language: string;
  overallScore: number;
  createdAt: string;
  scores: {
    readability: { score: number };
    efficiency: { score: number };
    security: { score: number };
    maintainability: { score: number };
    bestPractices: { score: number };
  };
}

export interface PatternData {
  basedOnCount: number;
  patterns: string[];
}

export interface Recommendation {
  topic: string;
  reason: string;
  difficulty: string;
  resourceType: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export const scoreColor = (s: number) => {
  if (s >= 80) return "#4ade80";
  if (s >= 60) return "#fbbf24";
  if (s >= 40) return "#fb923c";
  return "#f87171";
};

export const diffColor = (d: string) => {
  if (d === "easy") return { bg: "rgba(74,222,128,0.12)", text: "#4ade80" };
  if (d === "hard") return { bg: "rgba(248,113,113,0.12)", text: "#f87171" };
  return { bg: "rgba(251,191,36,0.12)", text: "#fbbf24" };
};

export const langColor = (lang: string) => {
  const l = lang?.toLowerCase();
  if (l === "typescript" || l === "ts") return { bg: "rgba(0,122,204,0.15)", text: "#4da3ff" };
  if (l === "javascript" || l === "js") return { bg: "rgba(247,223,30,0.12)", text: "#f7df1e" };
  if (l === "python" || l === "py")     return { bg: "rgba(3,136,3,0.15)", text: "#4caf50" };
  if (l === "go")                        return { bg: "rgba(0,173,216,0.15)", text: "#00add8" };
  if (l === "rust")                      return { bg: "rgba(222,165,132,0.15)", text: "#dea584" };
  return { bg: "rgba(255,255,255,0.08)", text: "#7a8394" };
};

export const langLabel = (lang: string) => {
  const map: Record<string, string> = {
    typescript: "TS", javascript: "JS", python: "PY",
    go: "GO", rust: "RS", java: "JV", cpp: "C++", c: "C",
  };
  return map[lang?.toLowerCase()] ?? lang?.slice(0, 2).toUpperCase() ?? "??";
};

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return `${Math.floor(d / 7)}w`;
};