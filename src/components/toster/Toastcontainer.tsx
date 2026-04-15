import { useEffect, useRef, useState, type JSX } from "react";
import type { Toast, ToastType } from "./Usetoast";

// ── Icons ────────────────────────────────────────────────────────────────────

const icons: Record<ToastType, JSX.Element> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14.5 13.5H1.5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    </svg>
  ),
};

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Config ───────────────────────────────────────────────────────────────────

const config: Record<ToastType, { accent: string; glow: string; bar: string; iconColor: string }> = {
  success: {
    accent: "rgba(74, 222, 128, 0.12)",
    glow: "rgba(74, 222, 128, 0.06)",
    bar: "#4ade80",
    iconColor: "#4ade80",
  },
  error: {
    accent: "rgba(248, 113, 113, 0.12)",
    glow: "rgba(248, 113, 113, 0.06)",
    bar: "#f87171",
    iconColor: "#f87171",
  },
  warning: {
    accent: "rgba(251, 191, 36, 0.12)",
    glow: "rgba(251, 191, 36, 0.06)",
    bar: "#fbbf24",
    iconColor: "#fbbf24",
  },
  info: {
    accent: "rgba(147, 197, 253, 0.12)",
    glow: "rgba(147, 197, 253, 0.06)",
    bar: "#93c5fd",
    iconColor: "#93c5fd",
  },
};

// ── Single Toast Item ─────────────────────────────────────────────────────────

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const duration = toast.duration ?? 4000;
  const c = config[toast.type];

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);

    if (duration > 0) {
      const start = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
        if (remaining === 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }, 30);
    }

    return () => {
      clearTimeout(enterTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration]);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600&display=swap');

        .toast-item {
          font-family: 'Syne', sans-serif;
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 340px;
          padding: 14px 16px 16px;
          border-radius: 10px;
          background: #0D1117;
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          overflow: hidden;
          cursor: default;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, box-shadow 0.3s ease;
          transform: translateX(60px);
          opacity: 0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .toast-item.visible {
          transform: translateX(0);
          opacity: 1;
        }

        .toast-item.leaving {
          transform: translateX(60px);
          opacity: 0;
        }

        .toast-item:hover {
          border-color: rgba(255,255,255,0.12);
        }

        .toast-accent-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
        }

        .toast-left-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          border-radius: 10px 0 0 10px;
        }

        .toast-icon {
          flex-shrink: 0;
          margin-top: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toast-body {
          flex: 1;
          min-width: 0;
        }

        .toast-title {
          font-size: 13px;
          font-weight: 600;
          color: #e6edf3;
          letter-spacing: 0.01em;
          line-height: 1.4;
        }

        .toast-message {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(230, 237, 243, 0.5);
          margin-top: 3px;
          line-height: 1.5;
          letter-spacing: 0.01em;
        }

        .toast-close {
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(230,237,243,0.3);
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
          margin-top: 1px;
        }

        .toast-close:hover {
          color: rgba(230,237,243,0.8);
          background: rgba(255,255,255,0.06);
        }

        .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          border-radius: 0 0 10px 10px;
          transition: width 0.03s linear;
        }
      `}</style>

      <div
        className={`toast-item ${visible ? "visible" : ""} ${leaving ? "leaving" : ""}`}
        style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)` }}
      >
        {/* Accent background */}
        <div className="toast-accent-bg" style={{ background: c.glow }} />

        {/* Left color bar */}
        <div className="toast-left-bar" style={{ background: c.bar }} />

        {/* Icon */}
        <div className="toast-icon" style={{ color: c.iconColor }}>
          {icons[toast.type]}
        </div>

        {/* Content */}
        <div className="toast-body">
          <div className="toast-title">{toast.title}</div>
          {toast.message && (
            <div className="toast-message">{toast.message}</div>
          )}
        </div>

        {/* Close */}
        <button className="toast-close" onClick={handleDismiss}>
          <CloseIcon />
        </button>

        {/* Progress bar */}
        {duration > 0 && (
          <div
            className="toast-progress"
            style={{ width: `${progress}%`, background: c.bar, opacity: 0.5 }}
          />
        )}
      </div>
    </>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <>
      <style>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }
        .toast-container > * {
          pointer-events: all;
        }
      `}</style>
      <div className="toast-container">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </div>
    </>
  );
}