import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ChevronRight,
  Target
} from 'lucide-react';

interface ChipProps {
  label: string;
  variant: 'blue' | 'teal' | 'orange' | 'purple' | 'green' | 'slate' | 'rose';
}

const Chip = ({ label, variant }: ChipProps) => {
  const styles = {
    blue: "bg-[#EAF2FF] border-[#B8D3FF] text-[#1F5FBF]",
    teal: "bg-[#E7FAF6] border-[#A7E8DA] text-[#117A65]",
    orange: "bg-[#FFF2E6] border-[#FFD0A6] text-[#B45309]",
    purple: "bg-[#F3EDFF] border-[#D8C7FF] text-[#6D28D9]",
    green: "bg-[#EAF9EE] border-[#BDEBCB] text-[#1F7A3A]",
    slate: "bg-[#EEF2F7] border-[#D3DCE8] text-[#334155]",
    rose: "bg-[#FFF1F2] border-[#FECDD3] text-[#E11D48]"
  };

  return (
    <span className={`px-3 py-1.5 rounded-full border text-[11px] font-bold ${styles[variant]} whitespace-nowrap inline-flex items-center`}>
      {label}
    </span>
  );
};

interface TechnicalFitReportProps {
  onBack: () => void;
  candidateId: string | null;
}

const NAV_ITEMS = [
  { id: 'OverallMatch', label: 'Overall Match Summary' },
  { id: 'Overview', label: 'Overview' },
  { id: 'EvaluationContext', label: 'Evaluation Context' },
  { id: 'MatchInterpretation', label: 'Match Interpretation' },
  { id: 'RiskSignals', label: 'Risk Signals & Evidence Gaps' },
  { id: 'TMExperience', label: 'SAP TM Functional Experience Match' },
  { id: 'GranularDetails', label: 'Granular Section-Wise Details' },
  { id: 'AdditionalJD', label: 'Additional JD Requirements Match' },
];

export function TechnicalFitReport({ onBack, candidateId }: TechnicalFitReportProps) {
  const [activeNav, setActiveNav] = useState('OverallMatch');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs = {
    OverallMatch: useRef<HTMLDivElement>(null),
    Overview: useRef<HTMLDivElement>(null),
    EvaluationContext: useRef<HTMLDivElement>(null),
    MatchInterpretation: useRef<HTMLDivElement>(null),
    RiskSignals: useRef<HTMLDivElement>(null),
    TMExperience: useRef<HTMLDivElement>(null),
    GranularDetails: useRef<HTMLDivElement>(null),
    AdditionalJD: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(id);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + 100;
      
      for (const item of NAV_ITEMS) {
        const ref = sectionRefs[item.id as keyof typeof sectionRefs];
        if (ref.current) {
          const { offsetTop } = ref.current;
          if (scrollPos >= offsetTop) {
            setActiveNav(item.id);
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F6F8FB]">
      {/* Top Bar - Fixed */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-[11px] font-black uppercase tracking-widest group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          <div className="h-8 w-px bg-slate-200" />
          <div className="space-y-0.5">
            <h1 className="text-xl font-semibold text-[#002A54] tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>JD–Profile Matching Checks</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technical Fit Report</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </header>

      {/* Main Body - Two Column */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN - Sticky Nav */}
        <aside className="w-[300px] bg-white border-r border-slate-200 overflow-y-auto py-8 px-4 shrink-0">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-[12px] font-black uppercase tracking-widest transition-all relative ${
                  activeNav === item.id 
                    ? 'text-[#002A54] bg-slate-50' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
                }`}
              >
                {activeNav === item.id && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#002A54] rounded-full" />
                )}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* RIGHT COLUMN - Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth bg-[#F6F8FB] relative"
        >
          <div className="w-full mx-auto py-10 px-[28px] space-y-10">
            
            {/* SECTION 1: Overall Match Summary */}
            <section ref={sectionRefs.OverallMatch} id="ANCHOR_OverallMatch" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 space-y-8">
                  <div className="w-full flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl font-black text-[#B45309]">82%</span>
                        <div className="h-10 w-px bg-slate-200" />
                        <span className="text-xl font-black text-[#002A54] uppercase tracking-widest">Technically Validated</span>
                      </div>
                      <div className="pt-2">
                        <Chip label="Confidence: High" variant="teal" />
                      </div>
                    </div>
                  </div>

                  <p className="w-full text-[15px] text-slate-600 leading-relaxed font-medium">
                    Candidate demonstrates validated SAP TM functional configuration depth and scenario-level reasoning beyond resume claims. AI and panel interview signals agree strongly on core FO/FU scope and integration troubleshooting. Advanced optimization depth and cutover tooling specifics show moderate evidence and should be validated for high-complexity programs.
                  </p>

                  <p className="w-full text-[11px] text-slate-400 italic font-medium">
                    Derived from: Resume evidence + AI technical interview + Panel technical interview + signal consistency checks
                  </p>

                  <div className="w-full space-y-4">
                    <h4 className="text-[11px] font-black text-[#002A54] uppercase tracking-widest">How this score was calculated</h4>
                    <div className="w-full border border-slate-100 rounded-xl overflow-hidden">
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-5 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Dimension</th>
                            <th className="px-5 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Weight</th>
                            <th className="px-5 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Score</th>
                            <th className="px-5 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Signal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { dim: "Scenario Validation", w: "30%", s: 84, sig: "Strong", v: "green" },
                            { dim: "Configuration Depth", w: "25%", s: 82, sig: "Strong", v: "green" },
                            { dim: "Integration Diagnosis", w: "20%", s: 83, sig: "Strong", v: "green" },
                            { dim: "Lifecycle Completeness (Design to Hypercare)", w: "15%", s: 78, sig: "Moderate", v: "orange" },
                            { dim: "Evidence Consistency (Resume vs AI vs Panel)", w: "10%", s: 80, sig: "Moderate-Strong", v: "teal" },
                          ].map((row, i) => (
                            <tr key={i}>
                              <td className="px-5 py-4 font-bold text-slate-700">{row.dim}</td>
                              <td className="px-5 py-4 text-center text-slate-500">{row.w}</td>
                              <td className="px-5 py-4 text-center font-black text-[#002A54]">{row.s}</td>
                              <td className={`px-5 py-4 text-right font-black uppercase ${row.v === 'green' ? 'text-emerald-600' : row.v === 'orange' ? 'text-[#B45309]' : 'text-[#1F5FBF]'}`}>{row.sig}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-slate-50/50">
                            <td colSpan={2} className="px-5 py-3 font-black text-[#002A54] uppercase tracking-widest text-[10px]">Total 100%</td>
                            <td colSpan={2} className="px-5 py-3 text-right font-black text-[#002A54] uppercase tracking-widest text-[10px]">Overall 82%</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Strengths / Key Matches</h4>
                      <ul className="space-y-2">
                        {[
                          "Strong scenario reasoning for FO/FU configuration and charge management",
                          "Clear, repeatable integration triage mindset (TM to EWM, SD, MM patterns)",
                          "Panel confirms delivery ownership, not just functional knowledge"
                        ].map((text, i) => (
                          <li key={i} className="text-[12px] text-slate-600 leading-relaxed flex gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black text-[#B45309] uppercase tracking-widest">Notable Gaps</h4>
                      <ul className="space-y-2">
                        {[
                          "Advanced optimization and edge-case handling has moderate evidence",
                          "Cutover validation and reconciliation specifics not deeply evidenced"
                        ].map((text, i) => (
                          <li key={i} className="text-[12px] text-slate-600 leading-relaxed flex gap-2">
                            <span className="text-[#B45309] font-bold">•</span>
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Key Mismatches</h4>
                      <ul className="space-y-2">
                        {[
                          "Middleware build ownership (CPI) not proven",
                          "Deep performance tuning examples not strongly supported"
                        ].map((text, i) => (
                          <li key={i} className="text-[12px] text-slate-600 leading-relaxed flex gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Overview */}
            <section ref={sectionRefs.Overview} id="ANCHOR_Overview" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Job Title: SAP TM Functional Consultant</h2>
                    <div className="flex gap-2">
                      <Chip label="Resume Evidence" variant="slate" />
                      <Chip label="AI Technical Interview" variant="blue" />
                      <Chip label="Panel Technical Interview" variant="teal" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Scenario-Based Handling", status: "Strong", v: "green" },
                      { label: "Configuration Depth", status: "Strong", v: "green" },
                      { label: "Integration Judgment", status: "Strong", v: "green" },
                      { label: "Cutover Discipline", status: "Moderate", v: "orange" },
                      { label: "Advanced Optimization", status: "Moderate", v: "orange" },
                      { label: "Signal Agreement", status: "High", v: "teal" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 flex flex-col gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black uppercase ${item.v === 'green' ? 'text-emerald-600' : item.v === 'orange' ? 'text-[#B45309]' : 'text-[#1F5FBF]'}`}>{item.status}</span>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${item.v === 'green' ? 'text-emerald-500' : 'text-slate-300'}`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lifecycle Completeness Summary Card */}
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-4 h-4 text-[#002A54]" />
                        <h4 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Lifecycle Completeness</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-[#B45309]">76</span>
                        <Chip label="Moderate" variant="orange" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "Design", status: "Strong", v: "green" },
                        { label: "Build", status: "Strong", v: "green" },
                        { label: "Go-live", status: "Moderate", v: "orange" },
                        { label: "Hypercare", status: "Moderate", v: "orange" }
                      ].map((p, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-100 rounded-lg">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{p.label}:</span>
                          <span className={`text-[10px] font-black uppercase ${p.v === 'green' ? 'text-emerald-600' : 'text-[#B45309]'}`}>{p.status}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      Go-live stabilization and hypercare depth show moderate evidence; validate incident triage, reconciliation controls, and post go-live ownership for high-intensity programs.
                    </p>
                    <div className="flex gap-4 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Resume:</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Partial</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">AI:</span>
                        <span className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">Moderate</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Panel:</span>
                        <span className="text-[9px] font-black text-[#B45309] uppercase tracking-widest">Moderate</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[14px] text-slate-600 italic font-medium border-l-2 border-slate-200 pl-4">
                    “Core SAP TM delivery scope is validated across interviews, with watch areas confined to advanced depth topics.”
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Evaluation Context */}
            <section ref={sectionRefs.EvaluationContext} id="ANCHOR_EvaluationContext" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col h-full">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest mb-6">Top Evaluation Criteria</h3>
                <div className="space-y-4">
                  {[
                    { label: "Hands-on functional reasoning for SAP TM configuration", tag: "High Priority" },
                    { label: "Scenario-based decision quality under delivery constraints", tag: "High Priority" },
                    { label: "Integration troubleshooting and ownership behavior", tag: "High Priority" },
                    { label: "Cutover readiness discipline and validation controls", tag: "Medium Priority" },
                    { label: "Evidence consistency across sources", tag: "Validation Signal" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/30">
                      <span className="text-[12px] font-bold text-slate-600">{item.label}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col h-full">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest mb-6">Scoring Logic and Weighting</h3>
                <div className="space-y-4">
                  {[
                    "AI interview validates scenario reasoning and configuration depth beyond resume claims",
                    "Panel interview validates delivery ownership, judgment, and credibility",
                    "Resume contributes evidence density and project-backed traceability",
                    "Evidence consistency adjusts score if sources diverge or examples are thin",
                  ].map((text, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">{i + 1}</div>
                      <p className="text-[12px] text-slate-500 leading-relaxed font-medium">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: Match Interpretation */}
            <section ref={sectionRefs.MatchInterpretation} id="ANCHOR_MatchInterpretation" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Match Confidence</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">HIGH</span>
                      </div>
                    </div>
                    <Chip label="Signal Agreement" variant="teal" />
                  </div>

                  <div className="space-y-4">
                    {[
                      "AI and panel align strongly on core SAP TM capabilities",
                      "Resume supports scope but is lighter on advanced optimization examples",
                      "Confidence high for core TM scope, moderate for advanced topics"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-[13px] font-bold text-slate-600">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6 flex gap-5">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-orange-100 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-[#B45309]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-black text-[#B45309] uppercase tracking-widest">Anomaly Detection</h4>
                      <p className="text-[13px] text-slate-600 leading-relaxed">
                        Near-perfect alignment was not assumed. Advanced-depth areas were scored down due to limited concrete examples and weaker evidence density.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Risk Signals & Evidence Gaps */}
            <section ref={sectionRefs.RiskSignals} id="ANCHOR_RiskSignals" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-[12px] font-black text-rose-500 uppercase tracking-widest mb-8">Risk Signals & Evidence Gaps</h3>
                
                <div className="space-y-10">
                  {[
                    {
                      title: "Advanced optimization depth",
                      claim: "Can handle complex optimization and tuning",
                      evidence: "Correct framing in AI/panel, limited project outcomes cited",
                      impact: "High-complexity programs may require deeper edge-case handling"
                    },
                    {
                      title: "Cutover validation and reconciliation discipline",
                      claim: "Comfortable with go-live readiness activities",
                      evidence: "Moderate depth on control checks and reconciliation examples",
                      impact: "Cutover errors can cause late-stage delivery risk"
                    },
                    {
                      title: "Middleware build ownership",
                      claim: "Integration exposure",
                      evidence: "Troubleshooting validated, build ownership not evidenced",
                      impact: "If CPI is must-have, validate build-level experience explicitly"
                    }
                  ].map((risk, i) => (
                    <div key={i} className="space-y-5">
                      <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {risk.title}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Claim</span>
                          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 text-[12px] font-bold text-slate-600 leading-relaxed">
                            {risk.claim}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Evidence</span>
                          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30 text-[12px] font-black text-rose-600 leading-relaxed">
                            {risk.evidence}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Role Impact</span>
                          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 text-[12px] font-bold text-slate-600 leading-relaxed">
                            {risk.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6: SAP TM Functional Experience Match */}
            <section ref={sectionRefs.TMExperience} id="ANCHOR_TMExperience" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Scenario-Level Validation</h3>
                </div>
                <div className="p-0">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Scenario</th>
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">What was tested</th>
                        <th className="px-8 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Source</th>
                        <th className="px-8 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { sc: "1) FO creation + charge logic consistency", test: "config reasoning, sequencing, failure points", src: "AI + Panel", v: "Strong" },
                        { sc: "2) FU planning constraints + carrier selection trade-offs", test: "decision logic, exception handling", src: "AI + Panel", v: "Strong" },
                        { sc: "3) TM to EWM integration break (IDoc/API)", test: "triage, monitoring, ownership boundaries", src: "AI + Panel + Res", v: "Strong" },
                        { sc: "4) Cutover readiness and reconciliation", test: "sequencing, validation checks, risk controls", src: "Panel + Res", v: "Moderate" },
                        { sc: "5) Optimization or performance topic", test: "depth of examples, constraints, tuning", src: "AI + Panel", v: "Moderate" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-900">{row.sc}</td>
                          <td className="px-8 py-4 font-medium text-slate-500">{row.test}</td>
                          <td className="px-8 py-4 text-center font-bold text-slate-400">{row.src}</td>
                          <td className="px-8 py-4 text-right">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${row.v === 'Strong' ? 'text-emerald-600' : 'text-[#B45309]'}`}>{row.v}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Configuration Depth Breakdown</h3>
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  {[
                    { label: "FO/FU Configuration", v: "Strong" },
                    { label: "Charge Management", v: "Strong" },
                    { label: "Planning and Constraints", v: "Strong" },
                    { label: "Integration Decision-Making", v: "Strong" },
                    { label: "Exception Handling Depth", v: "Moderate" },
                    { label: "Advanced Optimization Depth", v: "Moderate" },
                    { label: "Performance Tuning Examples", v: "Partial" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.label}</span>
                      <span className={`text-xs font-black uppercase tracking-widest ${item.v === 'Strong' ? 'text-emerald-600' : item.v === 'Moderate' ? 'text-[#B45309]' : 'text-slate-400'}`}>{item.v}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-slate-600 italic font-medium pt-4">
                  “Core SAP TM functional configuration depth is validated. Advanced optimization is competent but not deeply evidenced.”
                </p>
              </div>
            </section>

            {/* SECTION 7: Granular Section-Wise Details */}
            <section ref={sectionRefs.GranularDetails} id="ANCHOR_GranularDetails" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Evidence Coverage Matrix</h3>
                </div>
                <div className="p-0">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Area</th>
                        <th className="px-8 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Resume</th>
                        <th className="px-8 py-3 text-center font-black text-slate-400 uppercase tracking-widest">AI Interview</th>
                        <th className="px-8 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Panel Interview</th>
                        <th className="px-8 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { area: "FO/FU Config", res: "Moderate", ai: "Strong", p: "Strong", n: "Consistent across sources" },
                        { area: "Charge Mgmt", res: "Moderate", ai: "Strong", p: "Strong", n: "Solid reasoning demonstrated" },
                        { area: "Integration", res: "Partial", ai: "Strong", p: "Strong", n: "Strong triage mindset" },
                        { area: "Lifecycle (Design Build Go-live Hypercare)", res: "Partial", ai: "Moderate", p: "Moderate", n: "Go-live + hypercare controls to be validated" },
                        { area: "Cutover", res: "Partial", ai: "Moderate", p: "Moderate", n: "Validate controls and examples" },
                        { area: "Optimization", res: "Partial", ai: "Moderate", p: "Moderate", n: "Needs deeper project proof" },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="px-8 py-4 font-bold text-slate-700">{row.area}</td>
                          <td className="px-8 py-4 text-center text-slate-500 font-bold">{row.res}</td>
                          <td className="px-8 py-4 text-center text-emerald-600 font-black uppercase">{row.ai}</td>
                          <td className="px-8 py-4 text-center text-emerald-600 font-black uppercase">{row.p}</td>
                          <td className="px-8 py-4 text-right text-slate-500">{row.n}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Technical Evidence Notes</h3>
                <ul className="space-y-4">
                  {[
                    "AI responses were specific and repeatable, not generic theory",
                    "Panel confirmed delivery ownership and stakeholder maturity",
                    "Resume evidence density is lighter in advanced areas, not a blocker but a watch area"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4">
                      <Target className="w-5 h-5 text-slate-400 shrink-0" />
                      <span className="text-[14px] font-bold text-slate-600">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* SECTION 8: Additional JD Requirements Match */}
            <section ref={sectionRefs.AdditionalJD} id="ANCHOR_AdditionalJD" className="space-y-6 pb-20">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Additional JD Requirements Match</h3>
                
                <div className="divide-y divide-slate-100">
                  {[
                    { req: "Workshop leadership and training ability", status: "Strong", v: "green" },
                    { req: "Stakeholder communication and documentation", status: "Strong", v: "green" },
                    { req: "SAP CPI build ownership (if required)", status: "Missing", v: "rose" },
                    { req: "Go-live and hypercare ownership: Moderate (validate stabilization controls, incident triage, and reconciliation discipline)", status: "Moderate", v: "orange" },
                  ].map((row, i) => (
                    <div key={i} className="py-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${row.v === 'green' ? 'bg-emerald-500' : row.v === 'orange' ? 'bg-[#B45309]' : 'bg-rose-500'}`} />
                        <span className="text-[14px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{row.req}</span>
                      </div>
                      <Chip label={row.status} variant={row.v as any} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full bg-[#002A54] rounded-2xl p-8 space-y-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Target className="w-24 h-24" />
                </div>
                <div className="space-y-2 relative">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-300">Recommended Next Step</h3>
                  <p className="text-xl font-black">Proceed to next round, validate watch areas with targeted prompts.</p>
                </div>
                <div className="space-y-4 pt-4 relative">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 block">Suggested prompts</span>
                  <div className="space-y-3">
                    {[
                      "1) Walk through an integration failure between TM and EWM you owned end-to-end. What did you check first and why?",
                      "2) Explain your cutover validation and reconciliation controls for TM scope.",
                      "3) Share a real example where you optimized planning, settlement, or performance. What changed and what was the outcome?"
                    ].map((p, i) => (
                      <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl text-[13px] font-medium leading-relaxed">
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-10">
                <div className="flex items-center gap-3 text-slate-400">
                  <Info className="w-4 h-4" />
                  <span className="text-[11px] font-medium uppercase tracking-widest">Proprietary DeepSAP Delivery Readiness Model v2.4</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}