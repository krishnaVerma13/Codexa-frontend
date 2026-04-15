import { useState } from 'react';
import { Link } from 'react-router';
import { ScorePill } from '../../components/ScorePill';

import { Resizable } from 're-resizable'

import EditorPanel from '../../components/codeEditor/EditorPanel';
import OutputPanel from '../../components/codeEditor/OutputPanel';
import GithubRepo from '../../components/githubRepo/GithubRepo';
// import { useQueries } from '@tanstack/react-query';
import { useCodeEditorState, useSetCodeEditorState } from '../../routes/queryHooks/CodeEditor.Query';

export default function CodeEditor() {

  // const location = useLocation()
  // const [activeTab, setActiveTab] = useState<'write' | 'import'>( location?.state?.activeTab ||'write');
  const [analyzed, setAnalyzed] = useState(false);
  const [editorWidth, setEditorWidth] = useState(70);

  const   activeTab = useCodeEditorState()?.data || 'write'
  const setActiveTab = useSetCodeEditorState()

  return (
    <div className="min-h-screen bg-[#06070A] flex flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b border-[#1E2330] flex items-center justify-between px-12">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-2xl text-[#F0F2F5]">
            CODEXA
          </Link>
          <span className="font-mono text-sm text-[#454C5E]">Code Analyzer</span>
        </div>

        <div className="border-b border-[#1E2330] flex px-12">
          <button
            onClick={() => setActiveTab('write')}
            className={`px-6 py-3 font-mono text-sm border-b-2 transition-colors ${activeTab === 'write'
              ? 'border-[#B8F5D4] text-[#B8F5D4]'
              : 'border-transparent text-[#454C5E] hover:text-[#F0F2F5]'
              }`}
          >
            Write Code
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-6 py-3 font-mono text-sm border-b-2 transition-colors ${activeTab === 'import'
              ? 'border-[#B8F5D4] text-[#B8F5D4]'
              : 'border-transparent text-[#454C5E] hover:text-[#F0F2F5]'
              }`}
          >
            Import from GitHub
          </button>

        </div>
      </div>


      {/* Tabs */}
      {/* Main Content */}
      <div className="flex-1 flex">
        {activeTab === 'write' ? (
          <>
            {/* Editor Area */}
            <Resizable
              size={{ width: `${editorWidth}%`, height: "100%" }}
              minWidth="20%"
              maxWidth="80%"
              enable={{ right: true }}
              className="bg-[#0D1117] overflow-hidden"
              onResizeStop={(_e, _dir, _ref, d) => {
                const newWidth = editorWidth + (d.width / window.innerWidth) * 100;
                setEditorWidth(Math.min(80, Math.max(20, newWidth)));
              }}
            >
              {/* <div className="w-full flex-1  bg-[#06070A] flex"> */}
              <EditorPanel />
              {/* </div> */}
            </Resizable>

            {/* Results Panel */}

            <div
              style={{ width: `${100 - editorWidth}%` }}
              className="bg-[#0D1117] overflow-y-auto scrollbar-hide h-screen min-w-0"
            >
              <div className='py-3  px-4 flex justify-end  border-b border-amber-50'>
                <button
                  onClick={() => setAnalyzed(!analyzed)}
                  className="px-8 py-1 bg-[#B8F5D4] text-[#06070A] font-display text-base rounded-sm hover:bg-[#A5E5C1] transition-colors"
                >
                  ANALYZE
                </button>
              </div>
              <div 
              style={{ maxWidth: "100%" }}
              className="p-4   w-full">
                {!analyzed ? (
                  // Code run output 
                  <div className=" h-full overflow-hidden min-w-0 scrollbar-hide">
                    <OutputPanel />
                  </div>
                ) : (
                  // Ai analysis result
                  <>
                    <div className="font-mono text-xs uppercase text-[#454C5E] mb-6">
                      Analysis Results
                    </div>

                    {/* Score Pills */}
                    <div className="space-y-4 mb-8">
                      <ScorePill label="Clean Code" value={84} color="mint" />
                      <ScorePill label="Security" value={91} color="lavender" />
                      <ScorePill label="Performance" value={67} color="peach" />
                      <ScorePill label="Testing" value={55} color="yellow" />
                      <ScorePill label="Maintainability" value={78} color="sky" />
                    </div>

                    {/* Issues */}
                    <div className="mb-8">
                      <div className="font-mono text-xs uppercase text-[#454C5E] mb-4">
                        Issues Found
                      </div>
                      <div className="space-y-3">
                        {[
                          { severity: 'high', message: 'Potential security vulnerability in line 8', color: '#FFD4B8' },
                          { severity: 'medium', message: 'Function complexity too high', color: '#FFF0A8' },
                          { severity: 'low', message: 'Missing error handling', color: '#B8E8FF' },
                        ].map((issue, i) => (
                          <div
                            key={i}
                            className="p-4 bg-[#06070A] border border-[#1E2330] rounded"
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="px-2 py-0.5 rounded text-[10px] font-mono uppercase"
                                style={{
                                  backgroundColor: `${issue.color}20`,
                                  color: issue.color,
                                  border: `1px solid ${issue.color}`
                                }}
                              >
                                {issue.severity}
                              </span>
                              <div className="font-mono text-xs text-[#F0F2F5] flex-1">
                                {issue.message}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    <div>
                      <div className="font-mono text-xs uppercase text-[#454C5E] mb-4">
                        AI Suggestions
                      </div>
                      <div className="space-y-3">
                        {[
                          { title: 'Add input validation', color: '#D4BCFF' },
                          { title: 'Implement error boundaries', color: '#B8F5D4' },
                          { title: 'Add unit tests for edge cases', color: '#FFF0A8' },
                        ].map((suggestion, i) => (
                          <div
                            key={i}
                            className="p-4 border rounded"
                            style={{
                              borderColor: suggestion.color,
                              backgroundColor: `${suggestion.color}10`
                            }}
                          >
                            <div
                              className="font-mono text-sm"
                              style={{ color: suggestion.color }}
                            >
                              {suggestion.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </>
        ) : (
          // Github Import Tob 
          <div className="flex-1 p-12">
            {/* Search Bar */}
            <GithubRepo/>
          </div>
        )}
      </div>
    </div>
  );
}


