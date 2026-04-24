export interface Recommendation {
  topic: string;
  reason: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  resourceType: "documentation" | "video" | "practice" | "book" | "article";
}

export interface RecommendationsData {
  _id: string;
  userId: string;
  generatedAt: string;
  patternVersion: string;
  recommendations: Recommendation[];
}

export interface PatternData {
  basedOnCount: number;
  lastUpdatedAt: string;
  patterns: string[];
}



export const DIFFICULTY_CONFIG = {
  beginner: { label: "Beginner", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)" },
  intermediate: { label: "Intermediate", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" },
  advanced: { label: "Advanced", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" },
};

export const RESOURCE_CONFIG = {
  documentation: { icon: "⬡", label: "Docs", color: "#60a5fa" },
  video: { icon: "▶", label: "Video", color: "#a78bfa" },
  practice: { icon: "◈", label: "Practice", color: "#00d9c0" },
  book: { icon: "▣", label: "Book", color: "#fbbf24" },
  article: { icon: "◉", label: "Article", color: "#4ade80" },
};