import { useState, useRef , useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { selectFontSize, selectLanguage, selectTheme } from "../../slices/editorSlice";
import { LANGUAGE_CONFIG, defineMonacoThemes } from "../constants/Monaco.constants";

import { Editor, type OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor"

export default function EditorPanel() {

    const dispatch = useAppDispatch();
    const language = useAppSelector(selectLanguage)
    const theme = useAppSelector(selectTheme)
    const fontSize = useAppSelector(selectFontSize)

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
        localStorage.setItem(`editor-code-${language}`, value || "");
    }

    const prevLanguageRef = useRef(language); // tracks previous language


    useEffect(() => {
        if (!editorRef.current) return;

        const prevLanguage = prevLanguageRef.current;

        // 1. save code of the OLD language before switching
        const currentCode = editorRef.current.getValue();
        if (currentCode) {
            localStorage.setItem(`editor-code-${prevLanguage}`, currentCode);
        }

        // 2. load code for the NEW language
        const newCode = localStorage.getItem(`editor-code-${language}`) || LANGUAGE_CONFIG[language].defaultCode;
            

        // 3. update Monaco model
        const model = editorRef.current.getModel();
        if (model) {
           editor.setModelLanguage(model, language);
            editorRef.current.setValue(newCode);
        }

        // 4. update the prev language tracker
        prevLanguageRef.current = language;

    }, [language]);

    return (
        <div className="relative w-full">
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