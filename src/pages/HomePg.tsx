import { Link } from "react-router-dom"
import { FiPlay } from "react-icons/fi";
import { ScorePill } from "../components/ScorePill";
import { IoMdTrendingUp } from "react-icons/io";
import { LuSparkles } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import FeatureCard from "../components/pageComponents/FeatureCard";
import ProcessStep from "../components/pageComponents/ProcessStepProps";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

const HomePg = () => 
{
    
    return (
        <div>
          <Navbar/>
            {/* Hero Section */}
      <section className="min-h-screen pt-24 flex items-center px-12">
        <div className="max-w-350 mx-auto w-full grid grid-cols-2 gap-12 relative">
          {/* Vertical Text */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16">
            <div className="transform -rotate-90 origin-center whitespace-nowrap font-mono text-xs text-[#454C5E]">
              Developer Intelligence Platform · v1.0
            </div>
          </div>
          
          {/* Left Panel */}
          <div className="flex flex-col justify-center">
            <div className="font-mono text-xs text-[#B8F5D4] mb-6 tracking-wider">
              AI-POWERED · SKILL INTELLIGENCE
            </div>
            
            <h1 className="font-display text-[10vw] leading-none mb-8 text-[#F0F2F5]">
              YOUR /<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #F0F2F5' }}>
                CODE
              </span><br />
              SPEAKS.
            </h1>
            
            <p className="font-mono text-sm text-[#454C5E] mb-10 max-w-md font-light">
              Turn your repositories into a comprehensive skill intelligence report. 
              Know exactly where you excel and where to level up.
            </p>
            
            <div className="flex gap-4">
              <Link 
                to="/onboarding"
                className="px-8 py-4 bg-[#B8F5D4] text-[#06070A] font-mono text-sm rounded-sm hover:bg-[#A5E5C1] transition-colors"
              >
                Analyze My Code
              </Link>
              <button className="px-8 py-4 border border-[#1E2330] text-[#F0F2F5] font-mono text-sm rounded-sm hover:border-[#B8F5D4] transition-colors flex items-center gap-2">
                <FiPlay />
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Right Panel - Score Ring */}
          <div className="flex items-center justify-center relative">
            <div className="relative w-100 h-100">
              {/* Main Circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="#1E2330"
                  strokeWidth="2"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="20"
                  strokeDasharray="942"
                  strokeDashoffset="188"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B8F5D4" />
                    <stop offset="100%" stopColor="#D4BCFF" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Score */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display text-7xl text-[#B8F5D4]">79</div>
                <div className="font-mono text-xs text-[#454C5E] uppercase">Overall Score</div>
              </div>
              
              {/* Floating Pills */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <ScorePill label="Security" value={91} color="lavender" showBar={false} />
              </div>
              <div className="absolute top-1/2 -right-8 -translate-y-1/2">
                <ScorePill label="Clean Code" value={84} color="mint" showBar={false} />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <ScorePill label="Performance" value={67} color="peach" showBar={false} />
              </div>
              <div className="absolute top-1/2 -left-8 -translate-y-1/2">
                <ScorePill label="Testing" value={55} color="yellow" showBar={false} />
              </div>
            </div>
          </div>
          
          {/* Diagonal Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-[#B8F5D4]/30 to-transparent transform rotate-6" />
        </div>
        
        
      </section>

      {/* Marquee Section */}
      <section className="border-y mt-10 border-[#1E2330] py-6 overflow-hidden bg-[#0D1117]">
        <div className="animate-marquee whitespace-nowrap font-display text-2xl text-[#454C5E]">
          <span className="inline-flex items-center gap-6 px-6">
            Clean Code <span className="w-2 h-2 rounded-full bg-[#B8F5D4]" />
            Security Analysis <span className="w-2 h-2 rounded-full bg-[#D4BCFF]" />
            Performance <span className="w-2 h-2 rounded-full bg-[#FFD4B8]" />
            Maintainability <span className="w-2 h-2 rounded-full bg-[#B8E8FF]" />
            Testing Coverage <span className="w-2 h-2 rounded-full bg-[#FFF0A8]" />
            GitHub OAuth <span className="w-2 h-2 rounded-full bg-[#B8F5D4]" />
            Skill Timeline <span className="w-2 h-2 rounded-full bg-[#D4BCFF]" />
            AI Recommendations <span className="w-2 h-2 rounded-full bg-[#FFD4B8]" />
            Behavioral Patterns <span className="w-2 h-2 rounded-full bg-[#B8E8FF]" />
          </span>
          <span className="inline-flex items-center gap-6 px-6">
            Clean Code <span className="w-2 h-2 rounded-full bg-[#B8F5D4]" />
            Security Analysis <span className="w-2 h-2 rounded-full bg-[#D4BCFF]" />
            Performance <span className="w-2 h-2 rounded-full bg-[#FFD4B8]" />
            Maintainability <span className="w-2 h-2 rounded-full bg-[#B8E8FF]" />
            Testing Coverage <span className="w-2 h-2 rounded-full bg-[#FFF0A8]" />
            GitHub OAuth <span className="w-2 h-2 rounded-full bg-[#B8F5D4]" />
            Skill Timeline <span className="w-2 h-2 rounded-full bg-[#D4BCFF]" />
            AI Recommendations <span className="w-2 h-2 rounded-full bg-[#FFD4B8]" />
            Behavioral Patterns <span className="w-2 h-2 rounded-full bg-[#B8E8FF]" />
          </span>
        </div>
      </section>

       {/* Features Section */}
      <section id="features" className="py-40 px-12">
        <div className="max-w-350 mx-auto">
          <div className="grid grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-display text-6xl text-[#F0F2F5] leading-tight">
                Intelligence /<br />
                <span className="font-accent italic text-[#D4BCFF]">beyond syntax</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="font-mono text-sm text-[#454C5E] font-light max-w-md">
                Most code analysis tools check syntax. Codexa reads your code like a senior engineer would — 
                understanding patterns, detecting bad habits, and measuring real skill growth over time.
              </p>
            </div>
          </div>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* Big Card */}
            <div className="col-span-2 row-span-2 bg-[#0D1117] border border-[#1E2330] rounded-xl p-12 hover:border-[#B8F5D4]/30 transition-all relative group">
              <div className="absolute top-8 right-8 font-display text-[120px] text-[#1E2330] leading-none">
                01
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-[#B8F5D4]/10 flex items-center justify-center mb-6">
                  <IoMdTrendingUp className="text-[#B8F5D4]" size={24}/>
                </div>
                <h3 className="font-display text-3xl text-[#F0F2F5] mb-4">
                  5-Dimension Skill Score
                </h3>
                <p className="font-mono text-sm text-[#454C5E] font-light mb-8">
                  Clean Code · Security · Performance · Testing · Maintainability
                </p>
                {/* Mini Bar Chart */}
                <div className="space-y-3">
                  {[
                    { label: 'Clean Code', value: 84, color: '#B8F5D4' },
                    { label: 'Security', value: 91, color: '#D4BCFF' },
                    { label: 'Performance', value: 67, color: '#FFD4B8' },
                    { label: 'Testing', value: 55, color: '#FFF0A8' },
                    { label: 'Maintainability', value: 78, color: '#B8E8FF' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="font-mono text-xs text-[#454C5E] w-32">{item.label}</div>
                      <div className="flex-1 h-2 bg-[#1E2330] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${item.value}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <div className="font-mono text-xs text-[#F0F2F5] w-8">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#B8F5D4] to-[#D4BCFF] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Small Cards */}
            <FeatureCard 
              number="02"
              icon={<LuSparkles className="text-[#D4BCFF]" size={24} />}
              title="Behavioral Patterns"
              description="Discover your coding habits and patterns that define your engineering style."
              accentColor="lavender"
            />
            
            <FeatureCard 
              number="03"
              icon={<IoMdTrendingUp className="text-[#B8E8FF]" size={24} />}
              title="Skill Growth Timeline"
              description="Track how your skills evolve across every commit and pull request."
              accentColor="sky"
            />
            
            <FeatureCard 
              number="04"
              icon={<LuSparkles className="text-[#FFD4B8]" size={24} />}
              title="AI Recommendations"
              description="Get personalized learning paths powered by Gemini AI analysis."
              accentColor="peach"
            />
            
            <FeatureCard 
              number="05"
              icon={<LuGithub  className="text-[#FFF0A8]" size={24} />}
              title="GitHub Native"
              description="Seamlessly connects to your repositories with OAuth authentication."
              accentColor="yellow"
            />
          </div>
        </div>
      </section>

       {/* Statement Section */}
      <section className="py-40 px-12 relative">
        <div className="max-w-350 mx-auto">
          <h2 className="font-display text-[8vw] leading-none text-[#F0F2F5]">
            YOUR COMMITS /<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #F0F2F5' }}>
              TELL THE TRUTH
            </span><br />
            ABOUT YOUR SKILLS.
          </h2>
          
          <div className="absolute bottom-40 right-12">
            <p className="font-mono text-xs text-[#454C5E] max-w-xs text-right font-light">
              Most developers don't know how they're perceived by the code they ship.
            </p>
          </div>
        </div>
      </section>

       {/* How It Works Section */}
      <section id="process" className="py-40 px-12 bg-[#0D1117]">
        <div className="max-w-350 mx-auto">
          <div className="grid grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="font-display text-6xl text-[#F0F2F5]">
                From repo to report
              </h2>
            </div>
            <div className="flex items-end">
              <p className="font-mono text-sm text-[#454C5E] font-light">
                Four simple steps to unlock your developer intelligence profile.
              </p>
            </div>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-linear-to-r from-[#B8F5D4] via-[#B8E8FF] to-[#FFD4B8]" />
            
            <ProcessStep
              number="01"
              title="Connect GitHub"
              description="Securely link your GitHub account with OAuth"
              color="#B8F5D4"
            />
            <ProcessStep 
              number="02"
              title="Pick Repos"
              description="Select which repositories you want analyzed"
              color="#D4BCFF"
            />
            <ProcessStep 
              number="03"
              title="AI Reads Code"
              description="Gemini AI analyzes patterns and quality metrics"
              color="#B8E8FF"
            />
            <ProcessStep 
              number="04"
              title="Get Report"
              description="Receive your comprehensive skill intelligence profile"
              color="#FFD4B8"
            />
           
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-12">
        <div className="max-w-350 mx-auto grid grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-7xl text-[#F0F2F5] mb-6">
              Know your<br />real level.
            </h2>
            <p className="font-mono text-sm text-[#454C5E] mb-10 font-light">
              Stop guessing. Start knowing. Get the data-driven insights that help you 
              grow as a developer.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/onboarding"
                className="px-8 py-4 bg-[#B8F5D4] text-[#06070A] font-mono text-sm rounded-sm hover:bg-[#A5E5C1] transition-colors flex items-center gap-2"
              >
                Start Analysis <FaArrowRight  size={16} />
              </Link>
              <Link 
                to="/dashboard"
                className="px-8 py-4 border border-[#1E2330] text-[#F0F2F5] font-mono text-sm rounded-sm hover:border-[#B8F5D4] transition-colors"
              >
                View Demo Dashboard
              </Link>
            </div>
          </div>
          
          {/* Sample Repo Card */}
          <div className="bg-[#0D1117] border border-[#1E2330] rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="font-mono text-xs uppercase text-[#454C5E]">
                Sample Analysis
              </div>
              <div className="font-display text-4xl text-[#B8F5D4]">79</div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'react-portfolio', score: 84, color: '#B8F5D4' },
                { name: 'api-backend', score: 91, color: '#D4BCFF' },
                { name: 'e-commerce-shop', score: 67, color: '#FFD4B8' },
                { name: 'chat-application', score: 55, color: '#FFF0A8' },
              ].map((repo) => (
                <div 
                  key={repo.name}
                  className="h-13 px-4 bg-[#06070A] border border-[#1E2330] rounded flex items-center justify-between hover:border-[#B8F5D4]/20 transition-colors"
                >
                  <div className="font-mono text-xs text-[#F0F2F5]">{repo.name}</div>
                  <div 
                    className="font-display text-lg"
                    style={{ color: repo.color }}
                  >
                    {repo.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
           <Footer/>
        </div>
    )
}

export default HomePg



