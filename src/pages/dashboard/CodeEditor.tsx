import Editor, { type OnMount } from "@monaco-editor/react";
import { useRef } from "react";
import * as monaco from "monaco-editor";

export default function CodeEditor(){
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    // Example: focus on mount
    editor.focus();

    // Example: add custom keybinding
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS,
      () => {
        
        console.log("Save triggered:", editor.getValue());
      }
    );
  };

  return (
    <Editor
      height="500px"
      defaultLanguage="typescript"
      onMount={handleMount}
      theme="vs-dark"
    />
  );
};