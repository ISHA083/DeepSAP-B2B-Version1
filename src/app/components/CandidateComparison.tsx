import React from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  User,
  Activity,
  Zap,
  Star,
  Plus
} from 'lucide-react';
import { Badge } from './ui/badge';

interface Candidate {
  id: string;
  name: string;
  module: string;
  overallFit: number;
  trustIndex: number;
  experience: string;
  location: string;
  title: string;
  whyFit: string[];
  signals: {
    systems: string[];
    phases: string[];
    integration: string[];
  };
}

interface CandidateComparisonProps {
  selectedCandidates: Candidate[];
  onClose: () => void;
  onViewCandidate: (id: string) => void;
}

export function CandidateComparison({ selectedCandidates, onClose, onViewCandidate }: CandidateComparisonProps) {
  if (selectedCandidates.length === 0) return null;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back to Results
              </button>
              <div className="h-4 w-px bg-slate-200 mx-2" />
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none tracking-tight">Side-by-Side Comparison</h1>
                <p className="text-[11px] text-slate-500 font-medium mt-1.5 uppercase tracking-wide">
                  Comparing {selectedCandidates.length} top-ranked candidates for SAP EWM Consultant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 text-[10px] text-slate-400 italic">
                <Activity className="w-3.5 h-3.5" />
                Delivery Intelligence Active
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span className="text-slate-900">Role:</span> SAP EWM Consultant 
            <span className="mx-2 text-slate-200">|</span> 
            <span className="text-slate-900">Batch:</span> Q1_Hiring_Drive
          </div>
        </div>
      </div>

      {/* Comparison Area */}
      <div className="flex-1 overflow-x-auto bg-[#F8FAFC]">
        <div className="p-10 min-h-full">
          <div className="flex gap-8 items-stretch pb-6">
            {/* Candidate Cards */}
            {selectedCandidates.map((candidate, idx) => (
              <div 
                key={candidate.id} 
                className="w-[450px] bg-white border border-slate-200 rounded-[40px] shadow-sm flex flex-col shrink-0 hover:shadow-xl hover:border-slate-300 transition-all duration-500 group"
              >
                {/* 1. Identity Header */}
                <div className="p-10 border-b border-slate-100 relative">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <User className="w-8 h-8 text-slate-300" />
                    </div>
                    <span className="text-[10px] font-black text-[#B7410E] bg-yellow-50 px-3 py-1.5 rounded-lg tracking-widest uppercase border border-[#B7410E]/20 shadow-sm">
                      Rank #{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 
                      className="text-2xl font-bold text-slate-900 group-hover:text-[#005AB5] transition-colors cursor-pointer" 
                      onClick={() => onViewCandidate(candidate.id)}
                    >
                      {candidate.name}
                    </h3>
                    <p className="text-[14px] text-slate-500 font-medium mt-2">{candidate.title}</p>
                    <div className="flex items-center gap-3 mt-5 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                      <span>{candidate.location}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span>{candidate.experience} Exp</span>
                    </div>
                  </div>
                </div>

                {/* 2. Fit Intelligence */}
                <div className="p-10 bg-slate-50/30 border-b border-slate-100">
                   <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fit Intelligence</span>
                      {candidate.overallFit >= 95 && <Zap className="w-4 h-4 text-emerald-500 fill-current" />}
                   </div>
                   <div className="flex items-center gap-12">
                      <div>
                        <div className="text-4xl font-black text-[#002A54] tracking-tighter">{candidate.overallFit}%</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Overall Fit</div>
                      </div>
                      <div className="w-px h-10 bg-slate-200" />
                      <div>
                        <div className="text-4xl font-black text-[#002A54] tracking-tighter">{candidate.trustIndex}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Trust Index</div>
                      </div>
                   </div>
                </div>

                {/* 3. Delivery Signals */}
                <div className="p-10 border-b border-slate-100 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-500">S/4HANA Readiness</span>
                        <span className="text-[#002A54]">High Match</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: candidate.overallFit > 90 ? '92%' : '84%' }} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Why This Candidate?</span>
                    <div className="space-y-3">
                      {candidate.whyFit.slice(0, 3).map((reason, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-600 font-medium leading-relaxed">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Technical Footprint */}
                <div className="p-10 flex-1 space-y-8">
                  <div className="space-y-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Systems & Modules</span>
                    <div className="flex flex-wrap gap-2">
                      {candidate.signals.systems.map(s => (
                        <Badge key={s} variant="outline" className="bg-white border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-sm">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Functional Integration</span>
                    <div className="flex flex-wrap gap-2">
                      {candidate.signals.integration.map(i => (
                        <Badge key={i} variant="outline" className="bg-white border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-sm">
                          {i}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Footer Actions */}
                <div className="p-10 pt-4 mt-auto">
                  <button className="w-full py-5 bg-[#002A54] text-white rounded-[24px] text-[13px] font-black uppercase tracking-widest hover:bg-[#003A70] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 group-hover:scale-[1.02] active:scale-[0.98]">
                    Shortlist Candidate
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                      onClick={() => onViewCandidate(candidate.id)}
                      className="w-full py-4 mt-4 bg-white border border-slate-200 text-slate-600 rounded-[24px] text-[12px] font-bold hover:bg-slate-50 transition-all"
                  >
                    View Full Dossier
                  </button>
                </div>
              </div>
            ))}

            {/* Add Candidate Placeholder */}
            {selectedCandidates.length < 4 && (
              <div 
                onClick={onClose}
                className="w-[450px] bg-white/40 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-12 text-center group/add hover:border-[#002A54]/20 hover:bg-blue-50/30 transition-all cursor-pointer shrink-0"
              >
                <div className="w-20 h-20 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover/add:text-[#002A54] group-hover/add:scale-110 transition-all shadow-sm">
                  <Plus className="w-10 h-10" />
                </div>
                <h4 className="mt-8 text-[14px] font-black text-slate-400 group-hover/add:text-slate-600 uppercase tracking-widest">Add Candidate</h4>
                <p className="mt-3 text-[12px] text-slate-400 max-w-[200px] leading-relaxed italic">
                  Select more profiles from the ranked list to compare side-by-side.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
