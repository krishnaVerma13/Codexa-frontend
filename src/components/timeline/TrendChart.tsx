import { useEffect, useRef } from "react";
import { DIM_COLORS, DIM_LABELS, DIMS, type Dim, type WeekData } from "./constants";

import {
    Chart,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler,
} from "chart.js";

Chart.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler
);



export function TrendChart({
    data,
    hiddenDims,
    onToggleDim,
}: {
    data: WeekData[];
    hiddenDims: Set<Dim>;
    onToggleDim: (d: Dim) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const labels = data.map((w) => w.period.replace(/^\d{4}-/, ""));

        const datasets = DIMS.filter((d) => !hiddenDims.has(d)).map((d) => ({
            label: d,
            data: data.map((w) => +w[d].toFixed(1)),
            borderColor: DIM_COLORS[d],
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: DIM_COLORS[d],
            tension: 0.35,
        }));

        if (chartRef.current) {
            chartRef.current.data.labels = labels;
            chartRef.current.data.datasets = datasets;
            chartRef.current.update();
            return;
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: "index", intersect: false },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: "#1a1d21",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderWidth: 1,
                        titleColor: "#7a8394",
                        bodyColor: "#e8eaed",
                        titleFont: {
                            family: "'JetBrains Mono', monospace",
                            size: 10,
                        },
                        bodyFont: {
                            family: "'JetBrains Mono', monospace",
                            size: 11,
                        },
                        padding: 10,
                        callbacks: {
                            label: (ctx) => {
                                const y = ctx.parsed?.y;
                                return `  ${DIM_LABELS[ctx.dataset.label as Dim] ?? ctx.dataset.label}: ${y != null ? y.toFixed(1) : "—"}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        grid: { color: "rgba(255,255,255,0.04)" },
                        ticks: {
                            color: "#3e4555",
                            font: { family: "'JetBrains Mono', monospace", size: 15 },
                        },
                    },
                    y: {
                        min: 10,
                        max: 100,
                        grid: { color: "rgba(255,255,255,0.04)" },
                        ticks: {
                            color: "#3e4555",
                            font: { family: "'JetBrains Mono', monospace", size: 18 },
                            stepSize: 10,
                        },
                    },
                },
            },
        });

        return () => {
            chartRef.current?.destroy();
            chartRef.current = null;
        };
    }, [data, hiddenDims]);

    return (
        <div
            style={{
                background: "#131618",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "1.25rem 1.5rem",
                marginBottom: "1.25rem",
            }}
        >
            {/* Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {DIMS.map((d) => (
                    <button
                        key={d}
                        onClick={() => onToggleDim(d)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: hiddenDims.has(d) ? "#3e4555" : "#7a8394",
                            cursor: "pointer",
                            padding: "3px 8px",
                            borderRadius: 20,
                            border: "1px solid transparent",
                            background: "transparent",
                            opacity: hiddenDims.has(d) ? 0.4 : 1,
                            transition: "all 0.15s",
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: DIM_COLORS[d],
                                flexShrink: 0,
                            }}
                        />
                        {DIM_LABELS[d]}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div style={{ height: 420, position: "relative" }}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}