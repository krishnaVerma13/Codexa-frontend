import { useState, useRef, useCallback } from "react";
import { UploadProfilePhoto } from "../../services/NwConfig";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilePhotoUpload() {
    const queryClient = useQueryClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<{ msg: string; color: string } | null>(null);

    const handleFile = useCallback(async (file: File) => {
        if (!file.type.startsWith("image/")) {
            setStatus({ msg: "// only image files allowed", color: "#f87171" }); return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setStatus({ msg: "// file too large · max 5MB", color: "#f87171" }); return;
        }

        // preview
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
        setFileName(file.name);

        // upload
        setUploading(true);
        setProgress(0);
        setStatus({ msg: "// uploading...", color: "#00d9c0" });

        // fake progress tick
        const iv = setInterval(() => {
            setProgress((p) => { if (p >= 85) { clearInterval(iv); return p; } return p + Math.random() * 15; });
        }, 150);

        console.log("file :",file);
        
        const res = await UploadProfilePhoto(file);
        clearInterval(iv);
        setProgress(100);
        setUploading(false);

        if (res?.success) {
            setStatus({ msg: "// photo uploaded ✓", color: "#4ade80" });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        } else {
            setStatus({ msg: `// ${res?.message ?? "upload failed"}`, color: "#f87171" });
            setPreview(null);
        }
    }, [queryClient]);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const reset = () => {
        setPreview(null); setFileName(null);
        setStatus(null); setProgress(0);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">

            {/* drop zone */}
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`w-full flex flex-col items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all
          ${dragging
                        ? "border-[#00d9c0] bg-[#00d9c0]/5"
                        : "border-dashed border-[#00d9c0]/30 bg-[#141720] hover:border-[#00d9c0]/50"
                    }`}
            >
                {/* avatar preview */}
                <div className="w-20 h-20 rounded-full border-2 border-[#00d9c0]/20 bg-[#1e2230] overflow-hidden flex items-center justify-content">
                    {preview ? (
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                        <svg className="w-7 h-7 mx-auto" viewBox="0 0 24 24" fill="none"
                            stroke="rgba(0,217,192,0.4)" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    )}
                </div>

                <div className="text-center font-mono text-[11px] text-[#7a8394] leading-relaxed">
                    <span className="text-[#00d9c0]">Click to upload</span> or drag &amp; drop
                    <br />your profile photo
                </div>
                <div className="font-mono text-[10px] text-[#3e4555]">PNG, JPG, WEBP · max 5MB</div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />

            {/* progress bar */}
            {uploading && (
                <div className="w-full h-0.75 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#00d9c0] rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100).toFixed(0)}%` }}
                    />
                </div>
            )}

            {/* status + filename */}
            {status && (
                <span className="font-mono text-[10px]" style={{ color: status.color }}>
                    {status.msg}
                </span>
            )}
            {fileName && !uploading && (
                <span className="font-mono text-[10px] text-[#3e4555] truncate max-w-full">
                    {fileName}
                </span>
            )}

            {/* actions */}
            {!preview ? (
                <button
                    onClick={() => inputRef.current?.click()}
                    className="w-full font-mono text-[11px] py-2 rounded-full border border-[#00d9c0]/35 bg-[#00d9c0]/08 text-[#00d9c0] hover:bg-[#00d9c0]/15 transition-all cursor-pointer"
                >
          // choose photo
                </button>
            ) : (
                <button
                    onClick={reset}
                    className="w-full font-mono text-[11px] py-2 rounded-full border border-[#f87171]/30 bg-[#f87171]/06 text-[#f87171] hover:bg-[#f87171]/12 transition-all cursor-pointer"
                >
          // remove photo
                </button>
            )}
        </div>
     
    );
}