import { Link, useNavigate } from "react-router-dom"
import { LuGithub } from "react-icons/lu";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
export default function OnBording() {
    const navigator = useNavigate()
    return (<>
        <div className="min-h-screen bg-[#06070A]  px-12 py-10">
            {/* Logo */}

            <div onClick={()=> navigator("/")} className="flex items-center gap-2 mb-12 hover:cursor-pointer">
                <span className="font-display text-3xl tracking-wider text-[#F0F2F5]">
                    CODEXA
                </span>
                <span className="px-2 py-0.5 text-[8px] font-mono border border-[#B8F5D4] text-[#B8F5D4] rounded">
                    Beta
                </span>
            </div>
            <div className="flex w-full ">
                <div className="flex justify-center w-full ">

                    {/* <div className=" grid md:grid-cols-2 gap-16 w-full"> */}
                    {/*  Github login section  */}
                    <div className="max-w-md text-center">


                        {/* GitHub Logo */}
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#0D1117] border border-[#1E2330] flex items-center justify-center">
                            <LuGithub size={40} className="text-[#F0F2F5]" />
                        </div>

                        <h1 className="font-display text-5xl text-[#F0F2F5] mb-4">
                            Connect your GitHub
                        </h1>

                        <p className="font-mono text-sm text-[#454C5E] font-light mb-8">
                            We'll analyze your repositories to generate your developer skill intelligence profile.
                            Your code stays private and secure.
                        </p>

                        <button
                            // onClick={() => setStep(2)}
                            className="w-full px-8 py-4 bg-[#B8F5D4] text-[#06070A] font-mono text-sm rounded-sm 
                            hover:bg-[#A5E5C1] transition-colors flex items-center justify-center gap-3 mb-6 hoveer:cursor-pointer"
                        >
                            <LuGithub size={20} />
                            Connect with GitHub
                        </button>
                        <div className="font-mono text-xs text-[#454C5E] font-light">
                            🔒 We never store your code. We only read metadata and commit patterns.
                            <br />
                            You can revoke access anytime from GitHub settings.
                        </div>
                    </div>
                </div>

                {/* Vertical Divider line  */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-[#B8F5D4]/30 to-transparent transform rotate-6" />

                <div className="flex justify-center items-center  w-full">

                    {/* <div className=" grid md:grid-cols-2 gap-16 w-full"> */}
                    {/*  Github login section  */}
                    <div className="max-w-md   text-center">


                        {/* GitHub Logo */}
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#0D1117] border border-[#1E2330] flex items-center justify-center">
                            <MdOutlineMail size={40} className="text-[#F0F2F5]" />
                        </div>

                        <h1 className="font-display text-5xl text-[#F0F2F5] mb-4">
                            Signup with Email
                        </h1>

                        <p className="font-mono text-sm text-[#454C5E] font-light mb-8">
                            Login and Signup with Email & Password
                        </p>

                        {/* Email login & Signup  */}
                        <div className="flex flex-col justify-center items-center">
                            <button
                                onClick={() => navigator("/login")}
                                className="w-full px-8 py-4 bg-[#B8F5D4] text-[#06070A] font-mono text-sm rounded-sm
                                 hover:bg-[#A5E5C1] transition-colors flex items-center justify-center gap-3 mb-2 hoveer:cursor-pointer"
                            >
                                <BiLogIn size={20} />
                                Login
                            </button>
                            <div className="flex w-full  items-center justify-center  ">
                                <p className="font-mono text-lg text-[#454C5E] font-light mb-2">
                                    ------ or ------
                                </p>
                            </div>
                            <button
                                onClick={() => navigator("/signup")}
                                className="w-full px-8 py-4 bg-[#B8F5D4] text-[#06070A] font-mono text-sm rounded-sm 
                                hover:bg-[#A5E5C1] transition-colors flex items-center justify-center gap-3 mb-6 hoveer:cursor-pointer"
                            >
                                <MdOutlineAssignmentInd size={20} />
                                Signup
                            </button>
                        </div>

                        {/* <div className="font-mono text-xs text-[#454C5E] font-light">
                            🔒 We never store your code. We only read metadata and commit patterns.
                            <br />
                            You can revoke access anytime from GitHub settings.
                        </div> */}
                    </div>
                </div>
            </div>
        </div>


    </>)

}