import { FaRegFolderClosed, FaRegFileLines } from "react-icons/fa6";

import type { GithubFolderItem, TimeLine } from "../../interface/auth.type";



const  GithubFolders = ( { items , onItemClick } :  { items: GithubFolderItem[] , onItemClick : (path: TimeLine) => void } ) => {

    // console.log("items :", items);
    // console.log();
    
    return (<>
        <div className="p-4 border rounded-md space-y-2.5">

            {items?.map((item, index) => <div key={index}>
               
                    <div
                        onClick={()=> onItemClick({ name: item.name as string, path: item.path as string, fileType: item.type as string }) }
                        className="w-full h-12 px-6 bg-[#0D1117] border border-[#1E2330] cursor-pointer rounded-lg flex items-center justify-between hover:border-[#B8F5D4]/30 transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            {item.type === "dir" ? <FaRegFolderClosed className="text-[#454C5E] group-hover:text-[#B8F5D4] transition-colors" size={24} />
                             : <FaRegFileLines className="text-[#454C5E] group-hover:text-[#B8F5D4] transition-colors" size={24} />} 
                            <div className="text-left">
                                <div className="font-mono text-sm text-[#F0F2F5] mb-1">{item.name}</div>
                                <div className="flex items-center gap-2 font-mono text-xs text-[#454C5E]">
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-[#454C5E]">
                            {item.type}
                        </div>

                    </div>
                    
                   
               
            </div>)}
        </div>
    </>)
}

export default GithubFolders;