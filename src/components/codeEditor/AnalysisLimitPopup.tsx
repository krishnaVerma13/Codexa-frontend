// components/AnalysisLimitPopup.tsx

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface UserData {
    isLimitRiched: boolean;    // from DB
    tokenUsed: number;
    tokenLimit: number;
    resetLimiteAt: Date;     // ISO string from DB
}

interface AnalysisLimitPopupProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserData;
}

export default function AnalysisLimitPopup({
    isOpen,
    onClose,
    user,
}: AnalysisLimitPopupProps) {
    const [countdown, setCountdown] = useState({ h: "00", m: "00", s: "00" });
    const [mounted, setMounted] = useState(false);
    console.log("countdowm :",countdown);
    
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setMounted(true), 10);
        } else {
            setMounted(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const tick = () => {
            const diff = new Date(user.resetLimiteAt).getTime() - Date.now();
            console.log("user limit  :",user.resetLimiteAt);
            
            if (diff <= 0) {
                setCountdown({ h: "00", m: "00", s: "00" });
                return;
            }
            setCountdown({
                h: String(Math.floor(diff / 3600000)).padStart(2, "0"),
                m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
                s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
            });
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
        
    }, [isOpen, user.resetLimiteAt]);

    if (!isOpen && !mounted) return null;

    const pct = Math.min((user.tokenUsed / user.tokenLimit) * 100, 100);
    const resetTimeLabel = new Date(user.resetLimiteAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    // console.log("countdowm :",countdown);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
                background: "rgba(0,0,0,0.1)",
                backdropFilter: "blur(1px)",
                transition: "opacity 200ms ease",
                opacity: mounted ? 1 : 0,
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#0d0f12",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    width: "100%",
                    maxWidth: "560px",
                    margin: "0 16px",
                    transition: "transform 250ms ease, opacity 250ms ease",
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    opacity: mounted ? 1 : 0,
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "20px 20px 0",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            {/* Limit indicator dot */}
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "#ff5555",
                                    display: "inline-block",
                                    boxShadow: "0 0 6px #ff5555",
                                }}
                            />
                            <span
                                style={{
                                    fontSize: "10px",
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,85,85,0.8)",
                                }}
                            >
                                Limit Reached
                            </span>
                        </div>
                        <h2
                            style={{
                                fontSize: "17px",
                                fontWeight: 600,
                                color: "#e2e4ea",
                                margin: 0,
                                fontFamily: "'Syne', sans-serif",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Analysis unavailable
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "rgba(255,255,255,0.25)",
                            padding: "2px",
                            display: "flex",
                            alignItems: "center",
                            transition: "color 150ms",
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)")
                        }
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Divider */}
                <div
                    style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.05)",
                        margin: "16px 0",
                    }}
                />

                {/* Body */}
                <div className="my-10" style={{ padding: "0 40px 20px" }}>

                    {/* Usage row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "8px",
                        }}
                    >
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
                            TOKENS USED
                        </span>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
                            <span style={{ color: "#00d9c0", fontWeight: 600 }}>
                                {user.tokenUsed.toLocaleString()}
                            </span>
                            {" / "}
                            {user.tokenLimit.toLocaleString()}
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div
                        style={{
                            height: "3px",
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: "2px",
                            overflow: "hidden",
                            marginBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${pct}%`,
                                background: "#00d9c0",
                                borderRadius: "2px",
                                transition: "width 600ms ease",
                            }}
                        />
                    </div>

                    {/* Reset block */}
                    <div
                        style={{
                            background: "rgba(0,217,192,0.04)",
                            border: "1px solid rgba(0,217,192,0.1)",
                            borderRadius: "10px",
                            padding: "14px 16px",
                            marginBottom: "16px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "10px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "rgba(0,217,192,0.5)",
                                marginBottom: "10px",
                            }}
                        >
                            Resets at {resetTimeLabel}
                        </div>

                        {/* Countdown */}
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            {[
                                { val: countdown.h, label: "hr" },
                                { val: countdown.m, label: "min" },
                                { val: countdown.s, label: "sec" },
                            ].map(({ val, label }, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
                                    <span
                                        style={{
                                            fontSize: "22px",
                                            fontWeight: 700,
                                            color: "#00d9c0",
                                            letterSpacing: "0.04em",
                                            lineHeight: 1,
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {val}
                                    </span>
                                    <span style={{ fontSize: "10px", color: "rgba(0,217,192,0.4)" }}>{label}</span>
                                    {i < 2 && (
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                color: "rgba(0,217,192,0.2)",
                                                marginLeft: "2px",
                                                lineHeight: 1,
                                            }}
                                        >
                                            :
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={onClose}
                        style={{
                            width: "100%",
                            padding: "11px",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "12px",
                            letterSpacing: "0.08em",
                            cursor: "pointer",
                            fontFamily: "'JetBrains Mono', monospace",
                            transition: "all 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                            const b = e.currentTarget as HTMLButtonElement;
                            b.style.background = "rgba(255,255,255,0.07)";
                            b.style.color = "rgba(255,255,255,0.75)";
                        }}
                        onMouseLeave={(e) => {
                            const b = e.currentTarget as HTMLButtonElement;
                            b.style.background = "rgba(255,255,255,0.04)";
                            b.style.color = "rgba(255,255,255,0.5)";
                        }}
                    >
                        DISMISS
                    </button>
                </div>
            </div>
        </div>
    );
}