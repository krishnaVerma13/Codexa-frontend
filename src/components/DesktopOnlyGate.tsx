import { useState, useEffect, type ReactNode } from "react";
import { Monitor } from "lucide-react";
// ksk
const BREAKPOINT = 1024; // px — tweak to your cutoff

interface DesktopOnlyGateProps {
  children: ReactNode;
}

export default function DesktopOnlyGate({ children }: DesktopOnlyGateProps) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < BREAKPOINT : false
  );

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center bg-[#06070A]">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#A8F5D0]/10 mb-6">
          <Monitor className="w-8 h-8 text-[#A8F5D0]" strokeWidth={1.5} />
        </div>

        <h2 className="font-bebas text-3xl tracking-wide text-[#A8F5D0] mb-3">
          Better On A Bigger Screen
        </h2>

        <p className="font-dm-mono text-sm text-gray-400 max-w-xs leading-relaxed mb-1">
          Codexa is built for laptops, desktops, and tablets — the editor and
          dashboards need the extra space.
        </p>

        <p className="font-dm-mono text-sm text-[#C4B5FD] mt-4">
          Please switch devices to continue.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}