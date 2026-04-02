import {motion } from "framer-motion";
import { HiPlay } from "react-icons/hi2";

import { selectCurrentCode, selectLanguage } from "../../slices/editorSlice";
import { useAppSelector } from "../../store/Store";
import { RunCodeApi } from "../../services/NwConfig";
import { LANGUAGE_CONFIG } from "../constants/Monaco.constants";


export default function RunCodeBtn() {
        const currentCode = useAppSelector(selectCurrentCode)
        const language = useAppSelector(selectLanguage)
        
       

    const handleRunCode = async() => {
       if(!currentCode.trim()) {
        alert("Code editor is empty! Please write some code to run.")
        return;
        
    }
    console.log("current code :",currentCode);
    console.log("current language :",language);
       const payload = {
           body: JSON.stringify({
               language: LANGUAGE_CONFIG[language].pistonRuntime.language,
               version: LANGUAGE_CONFIG[language].pistonRuntime.version,
               files: [{ content: currentCode }],
            }),
            headers: {
               "Content-Type": "application/json",
             }
       }
       const responce = await RunCodeApi(payload)
        console.log("run code responce :",responce);
        
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