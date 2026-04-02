import { useState } from 'react';
import { Link } from 'react-router';
import { ScorePill } from '../../components/ScorePill';
import { LuGithub } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

import EditorPanel from '../../components/codeEditor/EditorPanel';

export default function CodeEditor() {

  const [activeTab, setActiveTab] = useState<'write' | 'import'>('write');
  const [analyzed, setAnalyzed] = useState(false);

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
            <div className="w-full flex-1  bg-[#06070A] flex">
              <EditorPanel />
            </div>

            {/* Results Panel */}
            <div className="w-[30%] h-screen bg-[#0D1117] overflow-y-auto scrollbar-hide">
              <div className='py-3 px-4 flex justify-end  border-b border-amber-50'>
                <button
                  onClick={() => setAnalyzed(true)}
                  className="px-8 py-1 bg-[#B8F5D4] text-[#06070A] font-display text-base rounded-sm hover:bg-[#A5E5C1] transition-colors"
                >
                  ANALYZE
                </button>
              </div>
              <div className="p-8">
                {!analyzed ? (
                  // Code run output 
                  <div className="flex flex-col items-center justify-center h-full text-center pt-32">
                    <div className="w-16 h-16 rounded-full bg-[#1E2330] flex items-center justify-center mb-6">
                      <CiSearch className="text-[#454C5E]" size={24} />
                    </div>
                    <div className="font-mono text-sm text-[#454C5E] mb-2">
                      Click Analyze to get results
                    </div>
                    <div className="font-mono text-xs text-[#454C5E]">
                      AI will evaluate your code across 5 dimensions
                    </div>
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
            <div className="mb-8">
              <div className="relative">
                <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#454C5E]" size={20} />
                <input
                  type="text"
                  placeholder="Search your repositories..."
                  className="w-full h-14 pl-12 pr-4 bg-[#0D1117] border border-[#1E2330] rounded-lg font-mono text-sm text-[#F0F2F5] outline-none focus:border-[#B8F5D4] transition-colors"
                />
              </div>
            </div>

            {/* Repo List */}
            <div className="space-y-2">
              {[
                { name: 'react-portfolio', lang: 'TypeScript', updated: '2 days ago', stars: 24 },
                { name: 'api-backend', lang: 'Node.js', updated: '5 days ago', stars: 12 },
                { name: 'e-commerce-shop', lang: 'React', updated: '1 week ago', stars: 45 },
                { name: 'chat-application', lang: 'Python', updated: '2 weeks ago', stars: 8 },
                { name: 'portfolio-site', lang: 'Next.js', updated: '3 weeks ago', stars: 15 },
                { name: 'ml-experiments', lang: 'Python', updated: '1 month ago', stars: 32 },
              ].map((repo) => (
                <button
                  key={repo.name}
                  className="w-full h-18 px-6 bg-[#0D1117] border border-[#1E2330] rounded-lg flex items-center justify-between hover:border-[#B8F5D4]/30 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <LuGithub className="text-[#454C5E] group-hover:text-[#B8F5D4] transition-colors" size={24} />
                    <div className="text-left">
                      <div className="font-mono text-sm text-[#F0F2F5] mb-1">{repo.name}</div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#454C5E]">
                        <span>{repo.lang}</span>
                        <span>·</span>
                        <span>{repo.updated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#454C5E]">
                    <span>⭐</span>
                    <span>{repo.stars}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


