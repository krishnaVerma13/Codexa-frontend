import { useState, useRef, useCallback } from 'react';
import Editor, {type OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

const DEFAULT_FILES = [
  { path: 'src/App.tsx', lang: 'typescript', content: 'const App = () => <div>Hello</div>' },
  { path: 'src/index.css', lang: 'css', content: 'body { margin: 0; }' },
  { path: 'package.json', lang: 'json', content: '{ "name": "my-app" }' },
];

export default function VSCodeEditor() {
  const [openTabs, setOpenTabs] = useState([DEFAULT_FILES[0]]);
  const [activeTab, setActiveTab] = useState(DEFAULT_FILES[0].path);
  const [panelHeight, setPanelHeight] = useState(200);
  const [theme, setTheme] = useState('vs-dark');
  const [statusLine, setStatusLine] = useState({ line: 1, col: 1 });
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    // Define custom theme
    monacoInstance.editor.defineTheme('codexa', {
      base: 'vs-dark', inherit: true,
      rules: [
        { token: 'keyword',  foreground: 'C792EA', fontStyle: 'bold' },
        { token: 'string',   foreground: 'C3E88D' },
        { token: 'comment',  foreground: '546E7A', fontStyle: 'italic' },
        { token: 'function', foreground: '82AAFF' },
        { token: 'type',     foreground: 'FFCB6B' },
      ],
      colors: {
        'editor.background': '#0a0b0e',
        'editorCursor.foreground': '#00d4ff',
        'editorLineNumber.activeForeground': '#00d4ff',
      },
    });
    monacoInstance.editor.setTheme('codexa');

    // Track cursor for status bar
    editor.onDidChangeCursorPosition(e => {
      setStatusLine({ line: e.position.lineNumber, col: e.position.column });
    });

    // Ctrl+S to save
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS,
      () => console.log('Saved:', editor.getValue())
    );
  };

  const switchTab = (file: typeof DEFAULT_FILES[0]) => {
    const uri = monaco.Uri.parse(`file:///${file.path}`);
    let model = monaco.editor.getModel(uri);
    if (!model) model = monaco.editor.createModel(file.content, file.lang, uri);
    editorRef.current?.setModel(model);
    setActiveTab(file.path);
    if (!openTabs.find(t => t.path === file.path))
      setOpenTabs(prev => [...prev, file]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', background: '#0a0b0e' }}>
      {/* Title Bar */}
      <div style={{ height: 30, background: '#111318', borderBottom: '1px solid #1e2330' }}>
        Codexa IDE
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: '#111318', borderRight: '1px solid #1e2330', overflow: 'auto' }}>
          {DEFAULT_FILES.map(f => (
            <div key={f.path} onClick={() => switchTab(f)} style={{ padding: '6px 12px', cursor: 'pointer',
              color: f.path === activeTab ? '#00d4ff' : '#94a3b8' }}>
              📄 {f.path.split('/').pop()}
            </div>
          ))}
        </div>

        {/* Editor area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', background: '#0d1117', borderBottom: '1px solid #1e2330', height: 35 }}>
            {openTabs.map(t => (
              <div key={t.path} onClick={() => switchTab(t)}
                style={{ padding: '0 16px', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 13,
                  color: t.path === activeTab ? '#e2e8f0' : '#64748b',
                  borderBottom: t.path === activeTab ? '2px solid #00d4ff' : 'none' }}>
                {t.path.split('/').pop()}
              </div>
            ))}
          </div>

          {/* Monaco */}
          <div style={{ flex: 1 }}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              defaultValue={DEFAULT_FILES[0].content}
              onMount={handleMount}
              options={{
                automaticLayout: true,
                fontSize: 14,
                minimap: { enabled: true },
                fontFamily: 'JetBrains Mono, monospace',
                fontLigatures: true,
                bracketPairColorization: { enabled: true },
                guides: { bracketPairs: true },
                smoothScrolling: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ height: 22, background: '#007acc', display: 'flex', alignItems: 'center',
        padding: '0 12px', fontSize: 12, color: 'white', gap: 16 }}>
        <span>Ln {statusLine.line}, Col {statusLine.col}</span>
        <span>{openTabs.find(t => t.path === activeTab)?.lang}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};