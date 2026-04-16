import { useEffect, useRef } from "react"
import { LuGithub } from "react-icons/lu"
import { LuUnlink } from "react-icons/lu"
import { RxCross2 } from "react-icons/rx"

interface DisconnectGithubPopupProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    username?: string
}

export default function DisconnectGithubPopup({
    isOpen,
    onConfirm,
    onCancel,
    username = "your GitHub account",
}: DisconnectGithubPopupProps) {
    const overlayRef = useRef<HTMLDivElement>(null)

    // Close on backdrop click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (e.target === overlayRef.current) onCancel()
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [onCancel])

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel()
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [onCancel])

    if (!isOpen) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#06070A]/80 backdrop-blur-sm"
            style={{ animation: "fadeIn 0.15s ease" }}
        >
            <div
                className="relative w-full max-w-xl mx-4 bg-[#0D1117] border border-[#1E2330] rounded-sm shadow-2xl"
                style={{ animation: "slideUp 0.2s ease" }}
            >
                {/* Close button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-[#454C5E] hover:text-[#F0F2F5] transition-colors"
                >
                    <RxCross2 size={16} />
                </button>

                <div className="p-8">
                    {/* Icon cluster */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-full bg-[#06070A] border border-[#1E2330] flex items-center justify-center">
                            <LuGithub size={22} className="text-[#F0F2F5]" />
                        </div>
                        <LuUnlink size={16} className="text-[#FF6B6B]" />
                        <div className="w-12 h-12 rounded-full bg-[#06070A] border border-[#FF6B6B]/20 flex items-center justify-center">
                            <span className="font-display text-lg text-[#FF6B6B]">✕</span>
                        </div>
                    </div>

                    {/* Text */}
                    <h2 className="font-display text-2xl text-[#F0F2F5] text-center tracking-wide mb-2">
                        Disconnect GitHub?
                    </h2>
                    <p className="font-mono text-base text-[#454C5E] text-center leading-relaxed mb-6">
                        This will unlink <span className="text-[#F0F2F5]">{username}</span> from Codexa.
                        Your skill profile and analysis history will be removed.
                    </p>

                    {/* Warning note */}
                    <div className="bg-[#FF6B6B]/5 border border-[#FF6B6B]/15 rounded-sm px-4 py-3 mb-6">
                        <p className="font-mono text-[13px] text-[#FF6B6B]/70 leading-relaxed">
                            ⚠ You can reconnect anytime, but your data will need to be re-analyzed.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-4 py-3 bg-transparent border border-[#1E2330] text-[#454C5E] font-mono text-xs rounded-sm
                            hover:border-[#F0F2F5]/20 hover:text-[#F0F2F5] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-3 bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 text-[#FF6B6B] font-mono text-xs rounded-sm
                            hover:bg-[#FF6B6B]/20 hover:border-[#FF6B6B]/50 transition-colors flex items-center justify-center gap-2"
                        >
                            <LuUnlink size={13} />
                            Disconnect
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
