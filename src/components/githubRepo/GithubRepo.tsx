

import { CiSearch } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import { GetAllGithubRepos } from "../../services/NwConfig";
import { useUser } from "../../routes/queryHooks/User.Query";
import { useQuery } from "@tanstack/react-query";
import type { GithubRepoResponce } from "../../interface/auth.type";
import { useEffect, useState } from "react";
import OnBording from "../../pages/OnBording";

export default function GithubRepo() {

    const { data } = useUser()
    const [isGithubConnected, setIsGithubConnected] = useState(false)
    const { data: repos, isLoading } = useQuery({
        queryKey: ["repos", data?.githubUsername],
        queryFn: () => GetAllGithubRepos(data?.githubUsername || ""),
        enabled: !!data?.githubUsername
    })

    console.log("repo :", repos);

    useEffect(() => {
        if (data?.githubUsername) {
            setIsGithubConnected(true)
        }
    }, [data])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        // Invalid date check
        if (isNaN(date.getTime())) return "Invalid date"

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    const handleRepoClick = (full_name: string): void => {
        console.log("full name :", full_name);

    }

   


    return (<>
        {!isLoading && <div>
        {!isGithubConnected &&
            <div className="relative ">
                <OnBording SignUp="github" />
            </div>}
        </div>}
        <div className="mb-8">
            <div className="relative">
                <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#454C5E]" size={20} />
                <input
                    type="text"
                    placeholder="Search your repositories..."
                    className="w-full h-14 pl-12 pr-4 bg-[#0D1117] border border-[#1E2330] rounded-lg font-mono text-sm text-[#F0F2F5] outline-none focus:border-[#B8F5D4] transition-colors"
                />
            </div>
        </div>
        
        {isLoading ? <div>Loading...</div> : repos?.success === false ? <div> Server Error</div> :

            <div className="space-y-2">
                {repos?.map((repo: GithubRepoResponce) => (
                    <button
                        onClick={() => handleRepoClick(repo?.full_name)}
                        key={repo.name}
                        className="w-full h-18 px-6 bg-[#0D1117] border border-[#1E2330] rounded-lg flex items-center justify-between hover:border-[#B8F5D4]/30 transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <LuGithub className="text-[#454C5E] group-hover:text-[#B8F5D4] transition-colors" size={24} />
                            <div className="text-left">
                                <div className="font-mono text-sm text-[#F0F2F5] mb-1">{repo.name}</div>
                                <div className="flex items-center gap-2 font-mono text-xs text-[#454C5E]">
                                    <span>{repo.language}</span>
                                    <span>·</span>
                                    <span>{formatDate(repo.updated_at)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-[#454C5E]">
                            <span>⭐</span>
                            <span>{repo.stargazers_count}</span>
                        </div>
                    </button>
                ))}
            </div>
        }
    </>)
}