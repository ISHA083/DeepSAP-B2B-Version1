import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Info
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

interface PrecisionMatchReportProps {
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

export function PrecisionMatchReport({ onBack, candidateId }: PrecisionMatchReportProps) {
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

  // Update active nav based on scroll position within the right container
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
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Precision Match Report</p>
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
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl font-black text-[#B45309]">86%</span>
                        <div className="h-10 w-px bg-slate-200" />
                        <span className="text-xl font-black text-[#002A54] uppercase tracking-widest">Strong Match</span>
                      </div>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                        Overall Match Score: 86% | Strong Match
                      </p>
                    </div>
                  </div>

                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                    Candidate has solid SAP TM functional expertise with good FO/FU and charge management experience, but limited end-to-end implementation exposure.
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-[#002A54] uppercase tracking-widest">How this score was calculated</h4>
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-5 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Category</th>
                            <th className="px-5 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Weight</th>
                            <th className="px-5 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Score</th>
                            <th className="px-5 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="px-5 py-4 font-bold text-slate-700">Functional Capability</td>
                            <td className="px-5 py-4 text-center text-slate-500">35%</td>
                            <td className="px-5 py-4 text-center font-black text-[#002A54]">92</td>
                            <td className="px-5 py-4 text-right font-black text-emerald-600 uppercase">Strong</td>
                          </tr>
                          <tr>
                            <td className="px-5 py-4 font-bold text-slate-700">JD-Critical Experience</td>
                            <td className="px-5 py-4 text-center text-slate-500">30%</td>
                            <td className="px-5 py-4 text-center font-black text-[#002A54]">84</td>
                            <td className="px-5 py-4 text-right font-black text-emerald-600 uppercase">Strong</td>
                          </tr>
                          <tr>
                            <td className="px-5 py-4 font-bold text-slate-700">System & Integration</td>
                            <td className="px-5 py-4 text-center text-slate-500">20%</td>
                            <td className="px-5 py-4 text-center font-black text-[#002A54]">88</td>
                            <td className="px-5 py-4 text-right font-black text-emerald-600 uppercase">Strong</td>
                          </tr>
                          <tr>
                            <td className="px-5 py-4 font-bold text-slate-700">Evidence Confidence</td>
                            <td className="px-5 py-4 text-center text-slate-500">15%</td>
                            <td className="px-5 py-4 text-center font-black text-[#002A54]">78</td>
                            <td className="px-5 py-4 text-right font-black text-[#B45309] uppercase">Moderate</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Strengths / Key Matches</h4>
                      <ul className="space-y-2">
                        {[
                          "Strong SAP TM functional expertise with FO/FU configuration and charge management.",
                          "Hands-on S/4HANA exposure with multiple integrations (SD/MM/EWM)."
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
                          "Limited end-to-end implementation experience compared to JD requirement.",
                          "Lower S/4HANA duration than expected (2.3 yrs vs 8+ yrs required)."
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
                          "No explicit BRF+ or BOPF logic implementation mentioned.",
                          "Only partial WRICEF development experience relevant to FO/FU."
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

              {/* Conclusion Summary Table */}
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Conclusion Summary Table</h3>
                  <Chip label="Final Verdict" variant="blue" />
                </div>
                <div className="p-0">
                  <table className="w-full text-[12px]">
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { label: "Module", value: "SAP TM", status: "Must-have", v: 'blue' },
                        { label: "Role Type", value: "Functional Consultant", status: "Must-have", v: 'blue' },
                        { label: "Project Type", value: "Implementation (8+ yrs)", status: "Must-have", v: 'blue' },
                        { label: "System & Deployment", value: "S/4HANA (Cloud or On-Prem)", status: "Must-have", v: 'blue' },
                        { label: "Project Phase", value: "Full lifecycle involvement", status: "Must-have", v: 'blue' },
                        { label: "Business Processes", value: "FO/FU Config, Charge Mgmt, Carrier Selection", status: "Must-have", v: 'blue' },
                        { label: "Integration Experience", value: "SD, MM, EWM", status: "Must-have", v: 'blue' },
                        { label: "Development Experience", value: "WRICEF for FO/FU and charge mgmt", status: "Nice-to-have", v: 'slate' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-400 uppercase tracking-widest w-1/3">{row.label}</td>
                          <td className="px-8 py-4 font-bold text-slate-700">{row.value}</td>
                          <td className="px-8 py-4 text-right">
                            <Chip label={row.status} variant={row.v as any} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 2: Overview */}
            <section ref={sectionRefs.Overview} id="ANCHOR_Overview" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Job Title: SAP TM Functional Consultant</h2>
                    <Chip label="Role Overview" variant="slate" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "SAP TM Functional", variant: "green", status: "Strong" },
                      { label: "E2E Implementation", variant: "green", status: "Strong" },
                      { label: "S/4HANA On Premise", variant: "green", status: "Strong" },
                      { label: "Key Business Process", variant: "orange", status: "Partial" },
                      { label: "Key Integration Experience", variant: "green", status: "Strong" },
                      { label: "Key Project Phases", variant: "green", status: "Strong" },
                    ].map((chip, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 flex flex-col gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{chip.label}</span>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black uppercase ${chip.variant === 'green' ? 'text-emerald-600' : 'text-[#B45309]'}`}>{chip.status}</span>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${chip.variant === 'green' ? 'text-emerald-500' : 'text-slate-300'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Evaluation Context */}
            <section ref={sectionRefs.EvaluationContext} id="ANCHOR_EvaluationContext" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col h-full">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest mb-6">Top Evaluation Criteria</h3>
                <div className="space-y-4">
                  {[
                    { label: "End-to-End SAP TM Implementation", tag: "High Priority" },
                    { label: "Hands-on Functional Configuration", tag: "High Priority" },
                    { label: "S/4HANA Landscape Exposure", tag: "Medium Priority" },
                    { label: "Evidence Strength & Delivery Credibility", tag: "Validation Signal" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/30">
                      <span className="text-[12px] font-bold text-slate-600">{item.label}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col h-full">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest mb-6">Scoring Logic & Weighting</h3>
                <div className="space-y-4">
                  {[
                    "Role-critical priorities applied first to establish baseline.",
                    "JD must-have requirements checked next for core alignment.",
                    "Nice-to-have skills fine-tune score with limited impact.",
                    "Evidence confidence adjusts score based on support strength.",
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
                      <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Match Confidence Score</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-black text-[#002A54]">86</span>
                        <div className="h-6 w-px bg-slate-200" />
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">HIGH</span>
                      </div>
                    </div>
                    <Chip label="Analysis" variant="teal" />
                  </div>

                  <div className="space-y-4">
                    {[
                      "Multiple JD-critical skills show strong alignment.",
                      "Supporting resume evidence is lighter than expected for near-perfect match."
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
                        Near perfect alignment detected; some scores stand out and may benefit from additional validation.
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
                      title: "S/4HANA Experience Duration",
                      claim: "Extensive S/4HANA implementation experience",
                      evidence: "2.3 years across mixed roles",
                      expectation: "8+ years with full lifecycle exposure"
                    },
                    {
                      title: "End-to-End Implementation Exposure",
                      claim: "End-to-end implementation experience",
                      evidence: "No complete full-lifecycle project explicitly stated",
                      expectation: "Full lifecycle involvement"
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
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">JD Expectation</span>
                          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 text-[12px] font-bold text-slate-600 leading-relaxed">
                            {risk.expectation}
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
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">SAP TM Functional</h3>
                  <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">JD Requires: <span className="text-slate-900">8+ yrs</span></span>
                    <div className="h-3 w-px bg-slate-200" />
                    <span className="text-slate-400">Candidate: <span className="text-rose-500">4.5 yrs</span></span>
                  </div>
                </div>
                <div className="p-0">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Project Summary</th>
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Client</th>
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Duration</th>
                        <th className="px-8 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { proj: "TM Implementation", client: "DHL", dur: "2.0 yrs", role: "SAP TM Lead" },
                        { proj: "TM Rollout", client: "Maersk", dur: "1.5 yrs", role: "SAP TM Consultant" },
                        { proj: "TM Upgrade", client: "FedEx", dur: "0.8 yrs", role: "SAP TM Architect" },
                        { proj: "TM Support", client: "UPS", dur: "0.2 yrs", role: "SAP TM Consultant" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-900">{row.proj}</td>
                          <td className="px-8 py-4 font-bold text-slate-500">{row.client}</td>
                          <td className="px-8 py-4 font-bold text-slate-700">{row.dur}</td>
                          <td className="px-8 py-4 text-right">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.role}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 7: Granular Section-Wise Details */}
            <section ref={sectionRefs.GranularDetails} id="ANCHOR_GranularDetails" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">WRICEF Experience</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-[#B45309]">82%</span>
                      <div className="h-6 w-px bg-slate-200" />
                      <span className="text-xs font-black text-[#B45309] uppercase tracking-[0.2em]">Partial Match</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {["WRICEF Dev", "Project Phases", "Business Process", "Integration Experience"].map(s => (
                      <Chip key={s} label={s} variant="slate" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-[#002A54] uppercase tracking-widest">Object Evidence Table</h4>
                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-5 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Object / Area</th>
                          <th className="px-5 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Evidence ID</th>
                          <th className="px-5 py-3 text-center font-black text-slate-400 uppercase tracking-widest">JD Req</th>
                          <th className="px-5 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Resume</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { area: "TM Planning", id: "Z_FO_SETTLEMENT_REPORT", jd: "Expert", res: "Exp", v: 'blue' },
                          { area: "TM Execution", id: "TM_EWM_IDOC_INT", jd: "Expert", res: "Exp", v: 'blue' },
                          { area: "EWM", id: "Z_DELIVERY_NOTE_FOR", jd: "Adv", res: "Adv", v: 'green' },
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/30">
                            <td className="px-5 py-4 font-bold text-slate-700">{row.area}</td>
                            <td className="px-5 py-4 font-mono text-[11px] text-slate-500 uppercase">{row.id}</td>
                            <td className="px-5 py-4 text-center font-black text-slate-400 uppercase">{row.jd}</td>
                            <td className="px-5 py-4 text-right font-black text-emerald-600 uppercase">{row.res}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: Additional JD Requirements Match */}
            <section ref={sectionRefs.AdditionalJD} id="ANCHOR_AdditionalJD" className="space-y-6 pb-20">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
                <h3 className="text-[12px] font-black text-[#002A54] uppercase tracking-widest">Additional JD Requirements Match</h3>
                
                <div className="divide-y divide-slate-100">
                  {[
                    { req: "Ability to lead workshops and train users", status: "Strong", v: "green" },
                    { req: "Experience with SAP CPI for integration", status: "Missing", v: "rose" },
                    { req: "Stakeholder communication and documentation skills", status: "Strong", v: "green" },
                  ].map((row, i) => (
                    <div key={i} className="py-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${row.v === 'green' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="text-[14px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{row.req}</span>
                      </div>
                      <Chip label={row.status} variant={row.v as any} />
                    </div>
                  ))}
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