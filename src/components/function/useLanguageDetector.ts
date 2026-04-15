// useLanguageDetector.ts
import { useMemo } from "react";
import hljs from "highlight.js";
import { LANGUAGE_CONFIG } from "../constants/Monaco.constants";

const EXTENSION_MAP: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    rb: "ruby",
    java: "java",
    cpp: "cpp",
    c: "c",
    go: "go",
    rs: "rust",
    php: "php",
    swift: "swift",
    kt: "kotlin",
    html: "html",
    css: "css",
    scss: "scss",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    md: "markdown",
    sh: "bash",
    bash: "bash",
    sql: "sql",
    xml: "xml",
};

const MIN_RELEVANCE = 5;

export type DetectionResult =
    | { status: "detected"; language: string; source: "extension" | "content"; available: boolean }
    | { status: "plaintext"; message: string }
    | { status: "error"; message: string };

export function detectLanguage(fileName: string, code: string): DetectionResult {
    try {
        // 1. Try extension first
        const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
        if (ext && EXTENSION_MAP[ext]) {
            if (EXTENSION_MAP[ext] in LANGUAGE_CONFIG) {
                console.log("match");
                return {
                    status: "detected",
                    language: EXTENSION_MAP[ext],
                    source: "extension",
                    available: true,
                };
            }
            return {
                status: "detected",
                language: EXTENSION_MAP[ext],
                source: "extension",
                available: false,
            };
            console.log("not match");
        }

        // 2. Fallback to highlight.js auto detection
        if (!code || code.trim().length === 0) {
            return { status: "plaintext", message: "Empty code — treated as plain text." };
        }

        const result = hljs.highlightAuto(code.slice(0, 2000)); // limit for perf

        if (!result.language || result.relevance < MIN_RELEVANCE) {
            return {
                status: "plaintext",
                message: `Could not confidently detect language (score: ${result.relevance ?? 0}). Treating as plain text.`,
            };
        }
        if (result.language in LANGUAGE_CONFIG) {
            return {
                status: "detected",
                language: result.language,
                source: "content",
                available: true,
            };
        }
        return {
            status: "detected",
            language: result.language,
            source: "content",
            available: false,
        };
    } catch (err) {
        return {
            status: "error",
            message: `Detection failed: ${err instanceof Error ? err.message : "Unknown error"}. Treating as plain text.`,
        };
    }
}

// Hook version
export function useLanguageDetector(fileName: string, code: string): DetectionResult {
    return useMemo(() => detectLanguage(fileName, code), [fileName, code]);
}