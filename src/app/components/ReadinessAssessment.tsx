import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Target, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Info,
  Layers,
  Activity,
  Award,
  Download,
  FileSearch,
  Users
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';

interface ReadinessAssessmentProps {
  onBack: () => void;
  onExploreTalent: () => void;
}

export function ReadinessAssessment({ onBack, onExploreTalent }: ReadinessAssessmentProps) {
  const [activeTab, setActiveTab] = useState<'bench' | 'program'>('bench');
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(true);

  const readinessMetrics = [
    { name: 'Technical Conversion', score: 92, status: 'Strong', description: 'Expertise in Greenfield & Brownfield migrations.' },
    { name: 'Cloud Integration', score: 85, status: 'Competent', description: 'Experience with BTP and Side-by-side extensibility.' },
    { name: 'Business Process Lead', score: 78, status: 'Growing', description: 'Focus on Fiori-led UX transformation.' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back
            </button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">S/4HANA Delivery Readiness</h1>
              <p className="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-wide">
                Benchmarking talent for transformation programs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Program Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-10 space-y-8">
          
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Overall Program Readiness', value: '84%', trend: '+5%', color: 'text-[#002A54]' },
              { label: 'Verified Experts', value: '142', trend: '+12', color: 'text-emerald-600' },
              { label: 'Critical Skill Gaps', value: '8', trend: '-2', color: 'text-amber-600' },
              { label: 'Avg. Trust Score', value: '91', trend: '+1%', color: 'text-[#005AB5]' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[20px] border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{stat.label}</span>
                <div className="flex items-end justify-between">
                  <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={`grid transition-all duration-300 ${isRightPanelCollapsed ? 'grid-cols-[1fr_48px]' : 'grid-cols-[1fr_400px]'} gap-8`}>
            {/* Left: Bench vs Program Assessment */}
            <div className="space-y-6">
              <div className="bg-white rounded-[24px] border border-slate-200 overflow-hidden shadow-sm">
                <div className="flex border-b border-slate-100">
                  <button 
                    onClick={() => setActiveTab('bench')}
                    className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'bench' ? 'border-[#002A54] text-[#002A54]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    Bench Readiness Assessment
                  </button>
                  <button 
                    onClick={() => setActiveTab('program')}
                    className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'program' ? 'border-[#002A54] text-[#002A54]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    Specific Program Matching
                  </button>
                </div>

                <div className="p-8">
                  {activeTab === 'bench' ? (
                    <div className="space-y-8">
                      <div className="flex items-start justify-between">
                        <div className="max-w-[500px]">
                          <h3 className="text-lg font-bold text-slate-900 mb-2">Internal Talent S/4HANA Benchmark</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            Evaluate your existing internal SAP bench against industry-standard S/4HANA delivery signals.
                          </p>
                        </div>
                        <button className="px-5 py-2 bg-[#002A54] text-white rounded-xl text-[12px] font-bold">Start Benchmark Run</button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {readinessMetrics.map((metric, i) => (
                          <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#002A54]">
                                {i === 0 ? <Zap className="w-6 h-6" /> : i === 1 ? <Layers className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800">{metric.name}</h4>
                                <p className="text-xs text-slate-500">{metric.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black text-[#002A54]">{metric.score}%</div>
                              <Badge className={`${metric.status === 'Strong' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'} border-none text-[9px] font-black uppercase tracking-widest`}>
                                {metric.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8 py-10 text-center">
                      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-[#005AB5]">
                        <Target className="w-10 h-10" />
                      </div>
                      <div className="max-w-[400px] mx-auto">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Project Readiness Matrix</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-8">
                          Map your consultants to a specific transformation program to identify delivery risks before kick-off.
                        </p>
                        <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                          Select Transformation Program
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Confidence Analysis */}
              <div className="bg-[#002A54] rounded-[24px] p-8 text-white">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#005AB5]" />
                    <h3 className="text-lg font-bold">Delivery Confidence Matrix</h3>
                  </div>
                  <Badge className="bg-white/10 text-white border-white/20 text-[10px] uppercase font-black tracking-widest">Global Q1 Analysis</Badge>
                </div>
                
                <div className="space-y-6">
                  <p className="text-white/70 text-sm leading-relaxed">
                    Based on recent project outcomes, your bench shows high proficiency in **Manufacturing Rollouts**, but faces a 22% capability gap in **Public Cloud integration**.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Top Capability</span>
                      <p className="font-bold">EWM Greenfield</p>
                    </div>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Top Gap</span>
                      <p className="font-bold">BTP Side-by-Side</p>
                    </div>
                  </div>

                  <button 
                    onClick={onExploreTalent}
                    className="w-full py-3 bg-[#005AB5] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Bridge Gaps with External Talent
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Delivery Intelligence */}
            <div className={`space-y-6 transition-all duration-300 ${isRightPanelCollapsed ? 'opacity-50' : ''}`}>
              <div className={`bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm relative ${isRightPanelCollapsed ? 'px-0 py-6 flex flex-col items-center' : ''}`}>
                <div className={`flex items-center justify-between mb-6 ${isRightPanelCollapsed ? 'flex-col gap-4 mb-0' : ''}`}>
                  {!isRightPanelCollapsed ? (
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Delivery Intelligence</h3>
                  ) : (
                    <Activity className="w-5 h-5 text-[#002A54]" />
                  )}
                  <button 
                    onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                    className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    title={isRightPanelCollapsed ? "Expand Panel" : "Collapse Panel"}
                  >
                    {isRightPanelCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {!isRightPanelCollapsed && (
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-slate-100">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Critical Risk Factors</h4>
                      <div className="space-y-6">
                        {[
                          { label: 'S/4HANA Go-live Exposure', risk: 'Medium', detail: '42% of consultants have only theoretical knowledge.' },
                          { label: 'Fiori Architecture Depth', risk: 'Low', detail: 'Strong proficiency in standard app extension.' },
                          { label: 'Data Migration Complexity', risk: 'High', detail: 'Lack of verified LSMW/LTMC experts on bench.' }
                        ].map((risk, i) => (
                          <div key={i} className="space-y-2 pb-6 border-b border-slate-100 last:border-0 last:pb-0 pt-4 first:pt-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-700">{risk.label}</span>
                              <Badge className={`text-[9px] font-black uppercase ${
                                risk.risk === 'High' ? 'bg-red-50 text-red-600' : 
                                risk.risk === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                              } border-none`}>
                                {risk.risk} Risk
                              </Badge>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">{risk.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-3 mb-6">
                        <BarChart3 className="w-5 h-5 text-[#005AB5]" />
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Bench Heatmap</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase">
                          <span>Skill Area</span>
                          <span>Density</span>
                        </div>
                        <div className="space-y-3">
                          {['EWM', 'TM', 'PP/DS', 'IBP', 'BTP'].map((skill, i) => (
                            <div key={skill} className="flex items-center gap-3">
                              <span className="text-xs font-bold text-slate-700 w-12">{skill}</span>
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex">
                                <div className="bg-[#002A54]" style={{ width: `${90 - i * 15}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
