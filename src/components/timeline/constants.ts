
export interface WeekData {
  period: string; // "YYYY-Www"
  readability: number;
  efficiency: number;
  security: number;
  maintainability: number;
  bestPractices: number;
  overallScore: number;
  // optional fields (add to API if needed)
  count?: number;
  topLanguage?: string;
  improved?: boolean;
}

export const DIMS = [
  "readability",
  "efficiency",
  "security",
  "maintainability",
  "bestPractices",
] as const;

export type Dim = (typeof DIMS)[number];

export const DIM_LABELS: Record<Dim, string> = {
  readability: "Readability",
  efficiency: "Efficiency",
  security: "Security",
  maintainability: "Maintainability",
  bestPractices: "Best Practices",
};

export const DIM_COLORS: Record<Dim, string> = {
  readability: "#00d9c0",
  efficiency: "#60a5fa",
  security: "#a78bfa",
  maintainability: "#4ade80",
  bestPractices: "#fbbf24",
};