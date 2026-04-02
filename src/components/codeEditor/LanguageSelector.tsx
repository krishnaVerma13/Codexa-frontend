import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { selectLanguage, setLanguage } from "../../slices/editorSlice";
import { LANGUAGE_CONFIG } from "../constants/Monaco.constants";
import { AnimatePresence, motion } from "framer-motion"
import { RiArrowDropDownLine } from "react-icons/ri";


import { editor } from "monaco-editor";




export default function LanguageSelector() {
    const dispatch = useAppDispatch()
    const language = useAppSelector(selectLanguage)

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const currentLanguage = LANGUAGE_CONFIG[language];

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const getCode = () => editorRef.current?.getValue() || "";



    const handleLanguageChange = (langId: string) => {
        const currentCode = getCode();
        if (currentCode) {
            localStorage.setItem(`editor-code-${language}`, currentCode);
        }
        // console.log("current code :", currentCode);

        dispatch(setLanguage(langId));

        // setTimeout(() => {
        //     const newCode = localStorage.getItem(`editor-code-${langId}`) || LANGUAGE_CONFIG[langId].defaultCode;


        //     const model = editorRef.current?.getModel();
        //     console.log("model:", model);

        //     if (model) {
        //         editor.setModelLanguage(model, langId); // ← switches syntax highlighting
        //         editorRef.current?.setValue(newCode);   // ← shows new code
        //     }
        // }, 0)

        setIsOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])


   

    return (<>
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-48 group relative flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e]/80 hover:bg-[#262637] 
                 rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
            >
                {/* hover state bg decorator */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                    src={`${currentLanguage?.logoPath}`}
                    alt="programming language logo"
                    width={20}
                    height={20}
                    className="object-contain relative z-10"
                />
                <span className="text-gray-300 min-w-20 text-left group-hover:text-white transition-colors">
                    {currentLanguage?.label}
                </span>
                <RiArrowDropDownLine className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${isOpen ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e2e]/95 backdrop-blur-xl
                        rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
                    >
                        <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
                            <p className="text-xs font-medium text-gray-400">Select Language</p>
                        </div>

                        <div className="max-h-70 overflow-y-auto overflow-x-hidden">
                            {Object.values(LANGUAGE_CONFIG).map((lang, index) => {


                                return (
                                    <motion.div
                                        key={lang.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group px-2"
                                    >
                                        <button
                                            className={` relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                                             ${language === lang.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                                             `}
                                            onClick={() => handleLanguageChange(lang.id)}

                                        >
                                            {/* decorator */}
                                            <div
                                                className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                                                 opacity-0 group-hover:opacity-100 transition-opacity"
                                            />

                                            <div
                                                className={`
                                                relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform
                                                    ${language === lang.id ? "bg-blue-500/10" : "bg-gray-800/50"}
                                    `}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
                                                    opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                                <img
                                                    width={24}
                                                    height={24}
                                                    src={lang.logoPath}
                                                    alt={`${lang.label} logo`}
                                                    className=" object-contain relative z-10"
                                                />
                                            </div>

                                            <span className="flex-1 text-left group-hover:text-white transition-colors">
                                                {lang.label}
                                            </span>


                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
        <div>
           
        </div>
    </>
    )
}