import { selectError, selectExecutionResult, selectFontSize, selectIsRunning, selectOutput } from "../../slices/editorSlice"
import { useAppSelector } from "../../store/Store"

import { FaCode } from "react-icons/fa6";
import RunningCodeSkeleton from "./RunningCodeSkeleton";


export default function OutputPanel() {

    const isRunning = useAppSelector(selectIsRunning);
    const resStatus = useAppSelector(selectExecutionResult);
    const output = useAppSelector(selectOutput);
    const error = useAppSelector(selectError);
    const fontSize = useAppSelector(selectFontSize)

    // console.log('font size', typeof(fontSize));
    
    return (<>
        {!resStatus && !isRunning &&
            <div className="flex pt-32 justify-center items-center flex-col">
                <div className="w-16 h-16 rounded-full bg-[#1E2330] flex items-center justify-center mb-6">
                    <FaCode className="text-[#454C5E]" size={24} />
                </div>
                <div className="font-mono text-sm text-[#454C5E] mb-2">
                    Click Analyze to get results
                </div>
                <div className="font-mono text-xs text-[#454C5E]">
                    AI will evaluate your code across 5 dimensions
                </div>
            </div>
        }

        {isRunning ? <>
            <RunningCodeSkeleton />
        </> : <>
            {resStatus && resStatus === "Accepted" ?
                <div>
                    <div className="text-lg font-mono text-[#B8F5D4] mb-4">
                        {String(resStatus)}
                    </div>
                    <pre 
                     style={{ fontSize: `${fontSize}px` }}
                    className={`font-mono text-[#B8F5D4] mb-2`}>
                        {output}
                    </pre>
                </div>
                : <div>
                    <div className="text-lg font-mono text-[#f34343] mb-4">
                        {error ? String(resStatus) :""}
                    </div>
                    <pre 
                     style={{ fontSize: `${fontSize}px` ,wordBreak: "break-word", overflowWrap: "anywhere" , whiteSpace: "pre-wrap" }}
                    className="font-mono   text-[#f34343] w-full max-w-full">
                        {error}
                    </pre>
                </div>
            }
        </>}
    </>)
}