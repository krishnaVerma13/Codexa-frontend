import { Link } from 'react-router';
import { LuGithub } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="border-t border-[#1E2330] py-12 px-12">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="font-display text-xl text-[#F0F2F5]">
          CODEXA
        </div>
        
        {/* Copyright */}
        <div className="font-mono text-xs text-[#454C5E]">
          © 2026 Codexa. All rights reserved.
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-6">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#454C5E] hover:text-[#B8F5D4] transition-colors"
          >
            <BsTwitterX />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#454C5E] hover:text-[#B8F5D4] transition-colors"
          >
            <LuGithub />
          </a>
          <Link 
            to="/docs" 
            className="text-[#454C5E] hover:text-[#B8F5D4] transition-colors"
          >
            <FiFileText />
          </Link>
        </div>
      </div>
    </footer>
  );
}
