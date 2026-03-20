import { Link } from "react-router-dom";

interface NavbarProps {
  variant?: 'landing' | 'app';
}


export default function Navbar({ variant = 'landing' }: NavbarProps){
    return (
       <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06070A]/80 backdrop-blur-md border-b border-[#1E2330]">
      <div className="max-w-[1400px] mx-auto px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider text-[#F0F2F5]">
            CODEXA
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono border border-[#B8F5D4] text-[#B8F5D4] rounded">
            Beta
          </span>
        </Link>
        
        {variant === 'landing' && (
          <>
            {/* Center Links */}
            <div className="flex items-center gap-8 font-mono text-sm text-[#F0F2F5]">
              <a href="#features" className="hover:text-[#B8F5D4] transition-colors">
                Features
              </a>
              <a href="#process" className="hover:text-[#B8F5D4] transition-colors">
                Process
              </a>
              <a href="#pricing" className="hover:text-[#B8F5D4] transition-colors">
                Pricing
              </a>
            </div>
            
            {/* CTA Button */}
            <Link 
              to="/onboarding"
              className="px-6 py-2.5 font-mono text-sm border border-[#B8F5D4] text-[#B8F5D4] rounded-sm hover:bg-[#B8F5D4]/10 transition-colors"
            >
              Connect GitHub
            </Link>
          </>
        )}
      </div>
    </nav>
    )
}