import { CiSearch } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import { FiRefreshCw } from "react-icons/fi";
import { PiFolderSimpleMinus } from "react-icons/pi";

import {
    GetAllGithubRepos,
    GetGithubRepoContents,
    //  GetGithubRepoTree 
} from "../../services/NwConfig";

import { useUser } from "../../routes/queryHooks/User.Query";
import { useQuery } from "@tanstack/react-query";
import type { GithubFolderItem, GithubRepoResponce, TimeLine } from "../../interface/auth.type";
import { useEffect, useState } from "react";
import OnBording from "../../pages/OnBording";
import GitRepoSkeleton from "./GitRepoSkeletion";
import GithubFolders from "./GithubFolders";
// import { time } from "framer-motion";
import { useAppDispatch } from "../../store/Store";
import { setCurrentCode, setLanguage } from "../../slices/editorSlice";
import { useNavigate } from "react-router-dom";
import { detectLanguage } from "../function/useLanguageDetector";
import { useSetCodeEditorState } from "../../routes/queryHooks/CodeEditor.Query";
import { useToastContext } from "../toster/ToastContext";
// import { MdArrowBackIosNew } from "react-icons/md";
// import { IoHome } from "react-icons/io5";
// import { useToast } from "../toster/Usetoast";

export default function GithubRepo() {

    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const { data } = useUser()
    const [isGithubConnected, setIsGithubConnected] = useState(false)
    const [isRepoOpen, setIsRepoOpen] = useState(false)
    const [selectedRepoContent, setSelectedRepoContent] = useState<GithubFolderItem[] | null>(null)
    const setCodeEditorState = useSetCodeEditorState()
    const { error, warning } = useToastContext()


    // Fetching all github repos of the user 
    const { data: repos, isLoading } = useQuery({
        queryKey: ["repos", data?.githubUsername],
        queryFn: () => GetAllGithubRepos(data?.githubUsername || ""),
        enabled: !!data?.githubUsername,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    console.log("repo responce :", repos);


    // This use Effect check github is connected or not through the user data
    useEffect(() => {
        if (data?.githubUsername) {
            setIsGithubConnected(true)
        }
    }, [data])

    // this function format the date 
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

    const removeItemFromTimeline = (key: string, value: string) => {
        const timeLine = localStorage.getItem("timeLine")
        console.log("remove item in time line :", timeLine);
        const KEY: string = key
        if (timeLine) {
            const timeline = JSON.parse(timeLine)
            const updatedTimeline = timeline[timeline?.length - 1]?.[KEY] == value ? timeline?.slice(0, -1) : timeline
            // console.log( "update time line :",updatedTimeline);

            localStorage.setItem("timeLine", updatedTimeline)
            setTimeLineValue(updatedTimeline)
        }

    }

    // This function handel Starting Repos click and get the content of the repo
    const handelRepoCliick = async (full_name: string, path: string | null): Promise<void> => {
        console.log("full name :", full_name);

        const selectedRepo = await GetGithubRepoContents(full_name, path)
        // const selectedRepo = await GetGithubRepoTree(full_name, "main?recursive=1" , "tree")
        console.log("repo content :", selectedRepo);
        if (selectedRepo.success === true) {
            setIsRepoOpen(true)
            selectedRepo.data && setSelectedRepoContent(selectedRepo.data)
            return;
        }
        warning("Failed to load repository content", selectedRepo?.message)
        removeItemFromTimeline("path", full_name)
    }

    const [timeLineValue, setTimeLineValue] = useState<TimeLine[]>([])
    // handel time line item (name , path , fileType) 
    const handelTimeLine = (addPath: boolean, item: TimeLine | null) => {

        if (addPath && item) {
            if (item.fileType === "file") {
                return
            }
            if (item.path === timeLineValue[timeLineValue.length - 1]?.path) {
                return
            }
            localStorage.setItem("timeLine", JSON.stringify([...timeLineValue, { name: item.name, path: item.path, fileType: item.fileType }]))
            setTimeLineValue(prev => [...prev, { name: item.name, path: item.path, fileType: item.fileType }])

        }
        else {
            if (item === null) {
                // reset time line and close repo view
                localStorage.removeItem("timeLine")
                setTimeLineValue([])
                setIsRepoOpen(false)
                return
            }

            // trim the time line value to the clicked item and remove the rest
            const index = timeLineValue.indexOf(item)
            let updateTimeLine = timeLineValue.slice(0, index + 1)
            localStorage.setItem("timeLine", JSON.stringify(updateTimeLine))
            handelFolderClick(item)
            setTimeLineValue(updateTimeLine)
            console.log("index :", index);

        }
        console.log("time line ", timeLineValue);

    }

    // this function handel click on folder and file and get the Content......
    const handelFolderClick = async (item: TimeLine, repoPath: string | null = null) => {

        //    handelTimeLine(true , item)
        const fullName = timeLineValue ? timeLineValue?.length > 0 ? timeLineValue[0]?.path : repoPath : repoPath
        if (timeLineValue?.length > 0) { }

        const path = timeLineValue.length > 0 ? (timeLineValue[0]?.path == item.path ? null : item.path) : (fullName == item.path ? null : item.path)

        // console.log("timeLineValue :", timeLineValue[0]?.path == item.path ? null : item.path);
        // console.log("handelFolderClick full_name :", fullName == item.path ? null : item.path);
        // console.log("item.path :", typeof(item.path) ,item.path );
        console.log("handelFolderClick final path :", path);


        const selectedRepoContent = await GetGithubRepoContents(fullName as string, path)

        console.log("selected repo content :", selectedRepoContent);

        if (selectedRepoContent.success === true) {
            // success("Content loaded successfully")
            if (item.fileType === "dir") {
                setIsRepoOpen(true)
                selectedRepoContent.data && setSelectedRepoContent(selectedRepoContent.data)
            }
            console.log("file data :", selectedRepoContent.data);
            if (item.fileType === "file" && selectedRepoContent.data) {
                let code = atob(selectedRepoContent.data.content.replace(/\n/g, ''))
                const codeLanguage = detectLanguage(selectedRepoContent.data.name, code)

                if (codeLanguage.status === "detected") {
                    let storeName = codeLanguage.available ? codeLanguage.language : "text"
                    localStorage.setItem(`editor-code-${storeName}`, code)
                    dispatch(setLanguage(codeLanguage.available ? codeLanguage.language : "text"))
                    dispatch(setCurrentCode(code))
                    setCodeEditorState("write")
                    navigator('/codeEditor')
                }
                if (codeLanguage.status === "plaintext") {
                    localStorage.setItem(`editor-code-text`, code)
                    dispatch(setLanguage("text"))
                    dispatch(setCurrentCode(code))
                    setCodeEditorState("write")
                    navigator('/codeEditor')
                }
                if (codeLanguage.status === "error") {
                    error(codeLanguage?.message)
                }
                // console.log("code language : ", codeLanguage);
                // console.log("code : ", code);
            }

            return;
        }

        error(selectedRepoContent?.message)
    }

    useEffect(() => {
        // here we are restoring the time line state from localStorage when the component mounts
        const storedTimeLine = localStorage.getItem("timeLine")
        if (storedTimeLine) {
            const timeLineArray = JSON.parse(storedTimeLine)
            console.log("timeline array :", timeLineArray);
            setTimeLineValue(timeLineArray)
            const callItem = timeLineArray[timeLineArray.length - 1]
            let repoPath = timeLineArray.length >= 0 ? timeLineArray[0].path.toString() : null
            console.log("repo path :", repoPath);
            handelFolderClick(callItem, repoPath)

        }
    }, [])



    return (<>
        {/* <div className=" flex items-center text-2xl p-2 space-x-2 relative bottom-6">
            <MdArrowBackIosNew
            onClick={()=> navigator('/dashboard')}
            className="text-gray-600 hover:text-gray-200 duration-300"/>
            <IoHome className="text-gray-600 hover:text-gray-200 duration-300"/>
            <MdArrowBackIosNew className="rotate-180"/>
        </div> */}
        {/* Time line for github repo component */}
        <div className={`flex space-x-2  ${!repos ?  "hidden" : ""} `}>
            <div className={`w-full text-sm bg-[#0D1117] border border-[#1E2330] rounded-lg h-10 flex items-center  mb-4 overflow-x-scroll scrollbar-hide text-nowrap 
               `}>
                <PiFolderSimpleMinus className="m-2" />
                <p
                    onClick={() => handelTimeLine(false, null)}
                    className="text-gray-600 hover:text-gray-300 cursor-pointer duration-500">
                    {data?.githubUsername}
                </p>
                {timeLineValue && timeLineValue.map((item, index) => <div key={index}>
                    <p
                        onClick={() => handelTimeLine(false, item)}
                        className="text-gray-600 hover:text-gray-300 duration-500 cursor-pointer">/{item.name}</p>
                </div>)}
            </div>
            <div>
                <button
                    onClick={() => setIsRepoOpen(false)}
                    className="bg-[#B8F5D4] text-black px-4 h-10 rounded-lg font-mono text-sm hover:bg-[#A0E6B8] transition-colors flex items-center justify-center  ">
                    <FiRefreshCw className="mr-2 text-lg" />
                    Refresh
                </button>
            </div>
        </div>

        {/* If user are not connected to Gihub show Github Connection panel  */}
        {!isLoading && <div>
            {!isGithubConnected &&
                <div className="relative ">
                    <OnBording SignUp="github" />
                </div>}
        </div>
        }


        <div className={`mb-8   ${!repos ?  "hidden" : ""} `}>
            {/* Search Input field */}
            <div className="relative">
                <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#454C5E]" size={20} />
                <input
                    type="text"
                    placeholder="Search your repositories..."
                    className="w-full h-14 pl-12 pr-4 bg-[#0D1117] border border-[#1E2330] rounded-lg font-mono text-sm text-[#F0F2F5] outline-none focus:border-[#B8F5D4] transition-colors"
                />
            </div>
        </div>

        {isLoading ? <div><GitRepoSkeleton /></div> : repos?.success === false ? <div> Server Error</div> : <div>
            {isRepoOpen ? <div>

                {/* Github Folders and files */}
                <GithubFolders items={selectedRepoContent ? selectedRepoContent : []} onItemClick={(e) => { handelFolderClick(e), handelTimeLine(true, e) }} />
            </div> :
                <div className="space-y-2">

                    {/* Github Repositories */}

                    {repos?.length == 0 ? <div>
                        <div
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 22,
                                color: "#3e4555",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 48, marginBottom: 12 }}>⌀</div>
                            Repos not found
                        </div>
                    </div> : <div>

                        {repos?.map((repo: GithubRepoResponce) => (
                            <button
                                onClick={() => { handelRepoCliick(repo?.full_name, null), handelTimeLine(true, { name: repo.name, path: repo.full_name, fileType: "dir" }) }}
                                key={repo.name}
                                className="w-full h-18 px-6 bg-[#0D1117] border border-[#1E2330] rounded-lg flex items-center justify-between hover:border-[#B8F5D4]/30 transition-colors group hover:cursor-pointer"
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
                    </div>}
                </div>
            }
        </div>
        }

    </>)
}
