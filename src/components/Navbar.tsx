import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useUser } from "../routes/queryHooks/User.Query";
import { useHashNav } from "./function/Usehashnav";

interface NavbarProps {
  variant?: 'landing' | 'app';
}


export default function Navbar({ variant = 'landing' }: NavbarProps) {

  const go = useHashNav()
  const { data } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGo = (hash: string) => {
    go("/", hash);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06070A]/80 backdrop-blur-md border-b border-[#1E2330]">
      <div className="max-w-350 mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-display text-2xl tracking-wider text-[#F0F2F5]">
            CODEXA
          </span>

        </Link>

        {variant === 'landing' && (
          <>
            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8 font-mono text-sm text-[#F0F2F5]">
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

              {/* k */}
              <Link to="/pricing" className="hover:text-[#B8F5D4] transition-colors no-underline text-[#F0F2F5]">
                Pricing 
              </Link>

              {/* <button
                onClick={() => go("/", "pricing")}
                className="hover:text-[#B8F5D4] transition-colors bg-transparent border-none cursor-pointer font-mono text-sm text-[#F0F2F5] p-0"
              >
                Pricing
              </button> */}
            </div>

            {/* CTA Button - desktop */}
            <div className="hidden md:block">
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
            </div>

            {/* Hamburger toggle - mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden bg-transparent border-none cursor-pointer text-[#F0F2F5] p-0 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {variant === 'landing' && menuOpen && (
        <div className="md:hidden border-t border-[#1E2330] bg-[#06070A] px-4 pb-6 pt-4 flex flex-col gap-5 font-mono text-sm text-[#F0F2F5]">
          <button
            onClick={() => handleGo("features")}
            className="hover:text-[#B8F5D4] transition-colors bg-transparent border-none cursor-pointer font-mono text-sm text-[#F0F2F5] p-0 text-left"
          >
            Features
          </button>

          <button
            onClick={() => handleGo("process")}
            className="hover:text-[#B8F5D4] transition-colors bg-transparent border-none cursor-pointer font-mono text-sm text-[#F0F2F5] p-0 text-left"
          >
            Process
          </button>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#B8F5D4] transition-colors no-underline text-[#F0F2F5]"
          >
            About
          </Link>

          <button
            onClick={() => handleGo("pricing")}
            className="hover:text-[#B8F5D4] transition-colors bg-transparent border-none cursor-pointer font-mono text-sm text-[#F0F2F5] p-0 text-left"
          >
            Pricing
          </button>

          {data?._id ?
            <Link to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 bg-linear-to-br from-[#B8F5D4] to-[#D4BCFF] rounded-lg flex justify-center items-center text-xl font-mono text-black hover:text-gray-500 duration-300 hover:cursor-pointer">
              Let's Start <span>{` ->`}</span>
            </Link>
            :
            <Link
              to="/onboarding"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2.5 font-mono text-sm border border-[#B8F5D4] text-[#B8F5D4] rounded-sm hover:bg-[#B8F5D4]/10 transition-colors text-center"
            >
              Sign In
            </Link>
          }
        </div>
      )}
    </nav>
  )
}