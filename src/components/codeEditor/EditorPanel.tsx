import { useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { selectCurrentCode, selectFontSize, selectLanguage, selectTheme, setCurrentCode, setExecutionResult, setFontSize } from "../../slices/editorSlice";
import { LANGUAGE_CONFIG, defineMonacoThemes } from "../constants/Monaco.constants";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";

import { Editor, type OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor"
import { RiFontSizeAi } from "react-icons/ri";
import { motion } from "framer-motion";

import { IoReload } from "react-icons/io5";
import RunCodeBtn from "./RunCodeBtn";

export default function EditorPanel() {

    const dispatch = useAppDispatch();
    const language = useAppSelector(selectLanguage)
    const theme = useAppSelector(selectTheme)
    const fontSize = useAppSelector(selectFontSize)
    const currentCode = useAppSelector(selectCurrentCode)

    // Monaco instance lives here — not in Redux
        const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    // helper — get current code from Monaco
    // const getCode = () => editorRef.current?.getValue() || "";

    // fires once when Monaco is ready
    const handleEditorMount: OnMount = (editor) => {
        editorRef.current = editor;
        // console.log(LANGUAGE_CONFIG[language].defaultCode);

        // restore saved code for the current language
        const savedCode = localStorage.getItem(`editor-code-${language}`);
        editor.setValue(savedCode || LANGUAGE_CONFIG[language].defaultCode);
    };

    const handleEditorChange = (value: string | undefined) => {
        // save code to localStorage on every change
        dispatch(setCurrentCode(value?.trim() || ""));
        localStorage.setItem(`editor-code-${language}`, value || "");   
    }

   

    const prevLanguageRef = useRef(language); // tracks previous language
    useEffect(() => {
        // console.log("current code :",currentCode);
        
        if (!editorRef.current) return;

        const prevLanguage = prevLanguageRef.current;

        // 1. save code of the OLD language before switching
        const currCode = editorRef.current.getValue();
        if (currentCode) {
            localStorage.setItem(`editor-code-${prevLanguage}`, currCode);
        }

        // 2. load code for the NEW language
        const newCode = localStorage.getItem(`editor-code-${language}`) || LANGUAGE_CONFIG[language].defaultCode;
            dispatch(setCurrentCode(newCode?.trim() )); // update Redux with the new code (optional, but keeps state in sync)
            dispatch(setExecutionResult(undefined))
        // 3. update Monaco model
        const model = editorRef.current.getModel();
        if (model) {
            editor.setModelLanguage(model, language);
            editorRef.current.setValue(newCode);
        }

        // 4. update the prev language tracker
        prevLanguageRef.current = language;

    }, [language]);



    const handleFontSizeChange = (newSize: number) => {
        const size = Math.min(Math.max(newSize, 12), 24);
        dispatch(setFontSize(size));
        localStorage.setItem("editor-font-size", size.toString());
    }

     const handleRefresh = () => {
        const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
        editorRef.current?.setValue(defaultCode);
        localStorage.removeItem(`editor-code-${language}`);
    };

     

    return (
        <div className="relative w-full">

            {/* Code Editor Panel */}
            <div className="flex-1 flex flex-col border-r border-[#1E2330]">
                {/* Editor Header */}
                <div className="h-14 border-b border-[#1E2330] flex items-center justify-between px-6">
                    <input
                        type="text"
                        placeholder="filename.js"
                        className="bg-transparent font-mono text-sm text-[#F0F2F5] outline-none"
                        defaultValue="analyzer.js"
                    />
                    <div className='space-x-2.5 flex'>

                        {/* Font Size button with slider */}
                        <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
                            <RiFontSizeAi className="size-4 text-gray-400" />
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="12"
                                    max="24"
                                    value={fontSize}
                                    onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                                    className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                                />
                                <span className="text-sm font-medium text-gray-400 min-w-8 text-center">
                                    {fontSize}
                                </span>
                            </div>
                        </div>

                        <ThemeSelector />
                        <LanguageSelector />

                        <div className="space-x-2 flex flex-row">
                            {/* Reload button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleRefresh}
                                className="p-3 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
                                aria-label="Reset to default code"
                            >
                                <IoReload className="size-4 text-gray-400" />
                            </motion.button>
                            <RunCodeBtn/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/5 p-6">
                <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/5">
                    {/* {clerk.loaded && ( */}
                    <Editor
                        height="600px"
                        language={LANGUAGE_CONFIG[language].monacoLanguage}
                        onChange={handleEditorChange}
                        theme={theme}
                        beforeMount={defineMonacoThemes}
                        onMount={handleEditorMount}
                        options={{
                            minimap: { enabled: true },
                            fontSize,
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            padding: { top: 16, bottom: 16 },
                            renderWhitespace: "selection",
                            fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                            fontLigatures: true,
                            cursorBlinking: "smooth",
                            smoothScrolling: true,
                            contextmenu: true,
                            renderLineHighlight: "all",
                            lineHeight: 1.6,
                            letterSpacing: 0.5,
                            roundedSelection: true,
                            scrollbar: {
                                verticalScrollbarSize: 8,
                                horizontalScrollbarSize: 8,
                            },
                        }}
                    />
                    {/* )} */}

                    {/* {!clerk.loaded && <EditorPanelSkeleton />} */}
                </div>
            </div>
        </div>
    )
}