import { Link } from "react-router-dom";
import { useUser } from "../routes/queryHooks/User.Query";
import { useHashNav } from "./function/Usehashnav";

interface NavbarProps {
  variant?: 'landing' | 'app';
}


export default function Navbar({ variant = 'landing' }: NavbarProps) {
  
  const go = useHashNav()
  const { data } = useUser();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06070A]/80 backdrop-blur-md border-b border-[#1E2330]">
      <div className="max-w-350 mx-auto px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider text-[#F0F2F5]">
            CODEXA
          </span>

        </Link>

        {variant === 'landing' && (
          <>
            {/* Center Links */}
            <div className="flex items-center gap-8 font-mono text-sm text-[#F0F2F5]">
              <button
                onClick={() => go("/", "features")}
                className="hover:text-[#B8F5D4] transition-colors bg-transparent border-none cursor-pointer font-mono text-sm text-[#F0F2F5] p-0"
              >
                Features
              </button>

              <button
                onClick={() => go("/", "process")}
                className="hover:text-[#B8F5D4] transition-colors bg-transparent border-none cursor-pointer font-mono text-sm text-[#F0F2F5] p-0"
              >
                Process
              </button>

              <Link to="/about" className="hover:text-[#B8F5D4] transition-colors no-underline text-[#F0F2F5]">
                About
              </Link>

              <button
                onClick={() => go("/", "pricing")}
                className="hover:text-[#B8F5D4] transition-colors bg-transparent border-none cursor-pointer font-mono text-sm text-[#F0F2F5] p-0"
              >
                Pricing
              </button>
            </div>

            {/* CTA Button */}
            {data?._id ?
              <div>
                <div >
                  <Link to="/dashboard"
                    className=" px-3 py-2 bg-linear-to-br from-[#B8F5D4] to-[#D4BCFF] rounded-lg flex justify-center items-center text-xl font-mono text-black hover:text-gray-500 duration-300 hover:cursor-pointer">
                    Let's Start <span>{` ->`}</span>
                  </Link>
                </div>
              </div>
              :
              <Link
                to="/onboarding"
                className="px-6 py-2.5 font-mono text-sm border border-[#B8F5D4] text-[#B8F5D4] rounded-sm hover:bg-[#B8F5D4]/10 transition-colors"
              >
                Sign In
              </Link>
            }
          </>
        )}
      </div>
    </nav>
  )
}