import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ScorePill } from '../../components/ScorePill';

import { Resizable } from 're-resizable'

import EditorPanel from '../../components/codeEditor/EditorPanel';
import OutputPanel from '../../components/codeEditor/OutputPanel';
import GithubRepo from '../../components/githubRepo/GithubRepo';
// import { useQueries } from '@tanstack/react-query';
import { useCodeEditorState, useSetCodeEditorState } from '../../routes/queryHooks/CodeEditor.Query';
import { IoHome } from 'react-icons/io5';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useAppSelector } from '../../store/Store';
import { selectCurrentCode, selectIsRunning, selectLanguage } from '../../slices/editorSlice';
import { GetAnalysisEditorCode } from '../../services/NwConfig';
import { useToast } from '../../components/toster/Usetoast';
import type { IAnalysisDocument, IAnalysisScores } from '../../services/service.Types';
import { useSelector } from 'react-redux';
import RunningCodeSkeleton from '../../components/codeEditor/RunningCodeSkeleton';

export default function CodeEditor() {

  // const location = useLocation()
  const navigator = useNavigate()
  // const [activeTab, setActiveTab] = useState<'write' | 'import'>( location?.state?.activeTab ||'write');
  const [analyzed, setAnalyzed] = useState(false);
  const [editorWidth, setEditorWidth] = useState(70);
  const activeTab = useCodeEditorState()?.data || 'write'
  const setActiveTab = useSetCodeEditorState()
  const { error } = useToast()
  const colors = ["lavender", "sky", "yellow", "peach", "mint"] as const;

 
  const [isLodingAnalysis, setLodingAnalysis] = useState(false)
  const [analysisResp , setAnalysisResp] = useState<IAnalysisDocument>()
  const currentCode = useAppSelector(selectCurrentCode)
  const language = useAppSelector(selectLanguage)
  const isRunning = useSelector(selectIsRunning)

  useEffect(() => {
    if (isRunning) {
      setAnalyzed(false)
    }
  }, [isRunning])


  const handleAnalysis = async () => {
    setLodingAnalysis(true)
    const responce = await GetAnalysisEditorCode({
      code: currentCode,
      language: language
    })
    console.log("responce :", responce);
    if (responce.success == true) {
      setAnalysisResp(responce.data)
      console.log("responce :", responce.data);
    }

    setLodingAnalysis(false)
    error("Analysis Fail", responce.message)
  }

  return (
    <div className="min-h-screen bg-[#06070A] flex flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b border-[#1E2330] flex items-center justify-between px-12">
        <div className="flex items-center gap-8">
          <div
            onClick={() => navigator("/dashboard")}
            className='flex text-xl text-gray-600 hover:text-gray-200 duration-300'>
            <MdArrowBackIosNew />
            <IoHome />
          </div>
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
              <div className='py-3  px-4  flex items-center space-x-4 border-b border-amber-50'>
                <button
                  onClick={() => setAnalyzed(false)}
                  className='bg-transparent text-base  border border-gray-400 text-gray-400 rounded-lg px-4 py-1 hover:bg-gray-800 hover:text-gray-200 duration-300 '>
                  OUTPUT
                </button>
                <button
                  onClick={() => { handleAnalysis(), setAnalyzed(true) }}
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

                    {isLodingAnalysis ? <RunningCodeSkeleton />
                      :
                      <div>
                        {/* Score Pills */}
                        <div>
                          <div className="font-mono text-base uppercase  mb-2">
                            OverallScore
                          </div>
                          <div className='flex justify-center items-center'>
                            <div className='bg-[#B8F5D4] w-28 h-28 rounded-full flex justify-center items-center'>
                              <p className="font-display flex justify-center items-center text-[46px] font-bold leading-none  text-[#6b28e6] font-mono" >
                                {analysisResp?.overallScore || 0}%</p>
                            </div>
                          </div>
                        </div>

                        <div className="font-mono text-sm uppercase mt-6 mb-2">
                          Analysis Results
                        </div>
                        {/* <div className="space-y-4 mb-8">
                      <ScorePill label="CleanCode" value={84} color="mint" />
                      <ScorePill label="Security" value={91} color="lavender" />
                      <ScorePill label="Performance" value={67} color="peach" />
                      <ScorePill label="Testing" value={55} color="yellow" />
                      <ScorePill label="Maintainability" value={78} color="sky" />
                    </div> */}

                        {Object.entries(analysisResp?.scores || {}).map(([key, value], index) => (
                          <ScorePill
                            key={key}
                            label={key}
                            value={value.score}
                            color={colors[index]}
                            text={value.reason}
                          />
                        ))}

                        {/* Issues */}
                        <div className="mb-8">
                          <div className="font-mono text-sm uppercase  mb-2">
                            Suggestions
                          </div>
                          <div className="space-y-3">
                            {analysisResp?.suggestions.map((text, i) => (
                              <div
                                key={i}
                                className="p-4 bg-[#06070A] border border-[#1E2330] rounded"
                              >
                                <div className="flex items-start gap-3">
                                  <p className='bg-[#ccf389] text-black px-2 rounded-full'>{i + 1}</p>
                                  <div className="font-mono text-xs text-[#F0F2F5] flex-1">
                                    {text}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Suggestions */}
                        {/* <div>
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
                        </div> */}
                      </div>}
                  </>
                )}
              </div>
            </div>

          </>
        ) : (
          // Github Import Tob 
          <div className="flex-1 p-12">
            {/* Search Bar */}
            <GithubRepo />
          </div>
        )}
      </div>
    </div >
  );
}


