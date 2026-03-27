import { Link, useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { LuFolderGit2 } from "react-icons/lu";
import { IoCodeSlash } from "react-icons/io5";
import { HiTrendingUp } from "react-icons/hi";
import { FaRegLightbulb } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { LuGithub } from "react-icons/lu";
import { CiBellOn } from "react-icons/ci";
import { useUser } from "../../routes/queryHooks/User.Query";
import { useEffect } from "react";

export default function UserDashboard() {
    const navigator = useNavigate();

    const {data , isLoading , isError} =  useUser()

    const navItems = [
        { icon: FaHome, label: 'Dashboard', path: '/dashboard', active: true },
        { icon: LuFolderGit2, label: 'My Repos', path: '/repos' },
        { icon: IoCodeSlash, label: 'Code Editor', path: '/editor' },
        { icon: HiTrendingUp, label: 'Timeline', path: '/timeline' },
        { icon: FaRegLightbulb, label: 'Recommendations', path: '/recommendations' },
        { icon: IoSettings, label: 'Settings', path: '/settings' },
    ];
    useEffect(()=>{
        // console.log("userData", data);
        
    },[])
    return (
        <div className="min-h-screen bg-[#06070A] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0D1117] border-r border-[#1E2330] flex flex-col">
                {/* Logo */}
                <div 
                onClick={()=> navigator('/')}
                className="h-20 flex items-center px-6 border-b border-[#1E2330] hover:cursor-pointer">
                    <span className="font-display text-2xl text-[#F0F2F5]">CODEXA</span>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-6 py-3 font-mono text-sm transition-colors relative ${item.active
                                ? 'text-[#B8F5D4]'
                                : 'text-[#454C5E] hover:text-[#F0F2F5]'
                                }`}
                        >
                            {item.active && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B8F5D4]" />
                            )}
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* User */}
                <div 
                onClick={()=> navigator("/userProfile")}
                className="p-6 border-t border-[#1E2330] flex items-center gap-3 hover:cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#B8F5D4] to-[#D4BCFF] flex justify-center items-center text-3xl font-mono text-black hover:text-gray-500 duration-300 hover:cursor-pointer" >
                        {data?.name?.split("")[0]}    
                        </div>
                    <div>
                        <div className="font-mono text-sm text-[#F0F2F5]">{isLoading ? "Loding...": data?.name! }</div>
                        <div className="font-mono text-xs text-[#454C5E]">{data?.authType == "email" ? "" : `${isLoading? "Loding..." : data?.githubUsername} ` }</div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-auto">
                {/* Top Bar */}
                <div className="h-20 border-b border-[#1E2330] flex items-center justify-between px-12">
                    <div>
                        <div className="font-mono text-xs text-[#454C5E] mb-1">Hello </div>
                        <div className="font-display text-2xl text-[#F0F2F5]">{data?.name?.split(" ")[0]}</div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <button className="px-4 py-2 border border-[#B8F5D4] text-[#B8F5D4] font-mono text-sm rounded-sm hover:bg-[#B8F5D4]/10 transition-colors flex items-center gap-2">
                            <LuGithub  size={16} />
                            Connect GitHub
                        </button> */}
                        <button className="w-10 h-10 rounded-full bg-[#0D1117] border border-[#1E2330] flex items-center justify-center hover:border-[#B8F5D4] transition-colors">
                            <CiBellOn size={18} className="text-[#454C5E]" />
                        </button>
                
                    </div>
                </div>
            </main>
        </div>
    )
}