import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi2";

import { selectCurrentCode, selectLanguage, setRunning , setOutput , selectError , setExecutionResult, selectExecutionResult, setError } from "../../slices/editorSlice";
import { useAppSelector, useAppDispatch } from "../../store/Store";
import { RunCodeApi } from "../../services/CodeRunApi";
import { LANGUAGE_CONFIG } from "../constants/Monaco.constants";


export default function RunCodeBtn() {

    const dispatch = useAppDispatch();
    const currentCode = useAppSelector(selectCurrentCode)
    const language = useAppSelector(selectLanguage)




    const handleRunCode = async () => {
        if (!currentCode.trim()) {
            alert("Code editor is empty! Please write some code to run.")
            return;
        }

        // console.log("current code :",currentCode);
        // console.log("current language :",language);
        const languageId = LANGUAGE_CONFIG[language]?.judgeO_Id;
        // console.log("language id :",typeof( languageId));

        if (!languageId) {
            alert("Selected language is not supported for code execution.");
            return;
        }
        dispatch(setRunning(true))
        const responce = await RunCodeApi(currentCode, languageId)
        console.log("run code responce :", responce);

        if(responce.status === "Accepted"){
            dispatch(setOutput(responce.output || ""))
            dispatch(setExecutionResult(responce.status))
        }else{
            dispatch(setError(responce.error || responce.compileError || "Unknown error occurred"))
            dispatch(setExecutionResult(responce.status));
        }

        dispatch(setRunning(false))
    }

    return (<>
        {/* code run button */}
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            className="p-3 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
            aria-label="Reset to default code"
        >
            <HiPlay className="size-4 text-gray-400" />
        </motion.button>
    </>)
}