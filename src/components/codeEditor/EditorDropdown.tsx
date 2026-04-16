import { useEffect, useRef, useState } from "react"
import { HiOutlineDotsVertical } from "react-icons/hi"

interface EditorDropdownProps {
    children: React.ReactNode
    align?: "left" | "right"
}

export default function EditorDropdown({ children, align = "right" }: EditorDropdownProps) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [])

    return (
        <div ref={menuRef} className="relative inline-block ">
            <button
                onClick={() => setOpen((p) => !p)}
                className={`
                    w-10 h-12 flex items-center justify-center rounded-sm border transition-all duration-150
                    ${open
                        ? "bg-[#1E2330] border-[#B8F5D4]/30 text-[#F0F2F5]"
                        : "bg-[#0D1117] border-[#1E2330] text-[#454C5E] hover:text-[#F0F2F5] hover:border-[#2E3445]"
                    }
                `}
            >
                <HiOutlineDotsVertical size={20} />
            </button>

            {open && (
                <div
                    className={`absolute mt-1 z-50 w-60 space-y-2 px-4 py-2 bg-[#0D1117] border border-[#1E2330] rounded-sm shadow-2xl ${align === "right" ? "right-0" : "left-0"}`}
                    style={{ animation: "menuIn 0.12s ease" }}
                >
                    {children}
                </div>
            )}

            <style>{`
                @keyframes menuIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
