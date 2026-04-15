import { useState, useCallback } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({
      type,
      title,
      message,
      duration = 4000,
    }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = (title: string, message?: string) =>
    toast({ type: "success", title, message });

  const error = (title: string, message?: string) =>
    toast({ type: "error", title, message });

  const warning = (title: string, message?: string) =>
    toast({ type: "warning", title, message });

  const info = (title: string, message?: string) =>
    toast({ type: "info", title, message });

  return { toasts, toast, dismiss, success, error, warning, info };
}