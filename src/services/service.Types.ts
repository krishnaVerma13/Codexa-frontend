export interface IAnalyzeEditorBody {
  code: string;
  language: string;
  fileName?: string | undefined;
}

export interface IAnalyzeGithubBody {
  code: string;
  language: string;
  repoName: string;
  fileName: string;
}

export type AnalysisSourceType = "editor" | "github";


export interface IDimensionScore {
  score: number;
  reason: string;
}

export interface IAnalysisScores {
  readability: IDimensionScore;
  efficiency: IDimensionScore;
  security: IDimensionScore;
  maintainability: IDimensionScore;
  bestPractices: IDimensionScore;
}

export interface IAnalysisDocument {
  _id: string;
  userId: string;
  language: string;
  sourceType: AnalysisSourceType;
  fileName?: string | undefined;
  repoName?: string;
  codeSnapshot: string;
  scores: IAnalysisScores;
  overallScore: number;
  suggestions: string[];
  createdAt: Date;
}