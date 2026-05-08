import { createContext, useContext, type ReactNode } from "react";
import { useToast } from "./useToast";
import { ToastContainer } from "./Toastcontainer";
import type { Toast, ToastType } from "./useToast";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ToastContextValue {
  toast: (opts: Omit<Toast, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  dismiss: (id: string) => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, toast, dismiss, success, error, warning, info } = useToast();

  return (
    <ToastContext.Provider value={{ toast, dismiss, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be used inside <ToastProvider>");
  return ctx;
}

export type { ToastContextValue, ToastType };
