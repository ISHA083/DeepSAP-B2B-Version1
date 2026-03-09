import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  MessageSquare,
  AlertTriangle,
  FileText,
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

interface PanelFitReportProps {
  onBack: () => void;
  candidateId: string | null;
}

const NAV_ITEMS = [
  { id: 'Verdict', label: 'Panel Verdict' },
  { id: 'Scorecard', label: 'Panel Scorecard' },
  { id: 'Rationale', label: 'Decision Rationale' },
  { id: 'Evidence', label: 'Evidence Highlights' },
  { id: 'RiskConditions', label: 'Risk and Conditions' },
  { id: 'Simulation', label: 'Role Simulation Notes' },
  { id: 'Recommendation', label: 'Final Recommendation' },
  { id: 'Confidence', label: 'Confidence and Limits' },
];

export function PanelFitReport({ onBack, candidateId }: PanelFitReportProps) {
  const [activeNav, setActiveNav] = useState('Verdict');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs = {
    Verdict: useRef<HTMLDivElement>(null),
    Scorecard: useRef<HTMLDivElement>(null),
    Rationale: useRef<HTMLDivElement>(null),
    Evidence: useRef<HTMLDivElement>(null),
    RiskConditions: useRef<HTMLDivElement>(null),
    Simulation: useRef<HTMLDivElement>(null),
    Recommendation: useRef<HTMLDivElement>(null),
    Confidence: useRef<HTMLDivElement>(null),
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
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Panel Fit Report (Panel Interview)</p>
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
            
            {/* SECTION 1: Panel Verdict */}
            <section ref={sectionRefs.Verdict} id="ANCHOR_Verdict" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-[#002A54] uppercase tracking-widest">Panel Verdict</h3>
                    <div className="flex gap-2">
                      <Chip label="Panel Approved" variant="green" />
                      <Chip label="High alignment" variant="teal" />
                      <Chip label="2 watch areas" variant="orange" />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-[#B45309]">80%</span>
                      <span className="text-xl font-black text-[#002A54] uppercase tracking-widest">Strong Panel Fit</span>
                    </div>
                    <div className="h-10 w-px bg-slate-200" />
                    <div className="flex gap-2">
                      <Chip label="Confidence: High" variant="blue" />
                    </div>
                  </div>

                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                    Panel confirms delivery ownership, credible decision-making, and stakeholder readiness for the role. Candidate demonstrates structured problem framing and practical execution behavior rather than theoretical responses. Approval is strong with light conditions for advanced complexity and sustained go-live pressure scenarios.
                  </p>

                  <p className="text-[11px] text-slate-400 italic font-medium">
                    Derived from: panel rubric scoring + interviewer agreement + scenario responses + credibility and ownership cues
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: Panel Scorecard */}
            <section ref={sectionRefs.Scorecard} id="ANCHOR_Scorecard" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest">Panel Scorecard</h3>
                </div>
                <div className="p-0">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Dimension</th>
                        <th className="px-4 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Weight</th>
                        <th className="px-4 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Score</th>
                        <th className="px-8 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Panel Signal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { dim: "Delivery Ownership", w: "20%", s: 85, sig: "Strong" },
                        { dim: "Problem Framing and Decision Quality", w: "15%", s: 82, sig: "Strong" },
                        { dim: "Execution Discipline", w: "15%", s: 80, sig: "Medium–High" },
                        { dim: "Stakeholder Management", w: "15%", s: 80, sig: "Medium–High" },
                        { dim: "Communication Clarity", w: "10%", s: 78, sig: "Medium–High" },
                        { dim: "Risk Management", w: "10%", s: 76, sig: "Medium–High" },
                        { dim: "Collaboration and Team Operating Style", w: "10%", s: 78, sig: "Medium–High" },
                        { dim: "Role Readiness Confidence", w: "5%", s: 80, sig: "Medium–High" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-900">{row.dim}</td>
                          <td className="px-4 py-4 text-center text-slate-500 font-medium">{row.w}</td>
                          <td className="px-4 py-4 text-center font-black text-[#B45309]">{row.s}</td>
                          <td className="px-8 py-4 text-right">
                            <Chip 
                              label={row.sig} 
                              variant={row.sig === 'Strong' ? 'green' : 'teal'} 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: Decision Rationale */}
            <section ref={sectionRefs.Rationale} id="ANCHOR_Rationale" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-10">
                <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest">Decision Rationale</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Strengths confirmed
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Credible SAP TM functional depth",
                        "Outcome-oriented decision making",
                        "Structured stakeholder alignment"
                      ].map((item, i) => (
                        <li key={i} className="text-[13px] text-slate-600 font-medium leading-relaxed">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-[#B45309] uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Watch areas
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "High-pressure sustained resilience",
                        "Extreme complexity trade-offs"
                      ].map((item, i) => (
                        <li key={i} className="text-[13px] text-slate-600 font-medium leading-relaxed">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-[#002A54] uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Key conditions
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Validate conflict pushback style",
                        "Confirm go-live triage logic"
                      ].map((item, i) => (
                        <li key={i} className="text-[13px] text-slate-600 font-medium leading-relaxed">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: Evidence Highlights */}
            <section ref={sectionRefs.Evidence} id="ANCHOR_Evidence" className="space-y-6">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    comp: "Delivery Ownership",
                    ind: "Accountability for integration outcomes",
                    excerpts: ["“I own the cutover sequence from ERP to TM. If we slip, I manage the triage.”"],
                    imp: "Safe for lead functional roles.",
                    v: "green"
                  },
                  {
                    comp: "Problem Framing",
                    ind: "Logical decomposition of complex issues",
                    excerpts: ["“First I isolate the data layer, then the config. I don't guess based on UI errors.”"],
                    imp: "Reliable troubleshooting in production.",
                    v: "teal"
                  },
                  {
                    comp: "Stakeholder Management",
                    ind: "Practical expectation setting",
                    excerpts: ["“I align with the business lead on the risk before committing to the fix timeline.”"],
                    imp: "Professional stakeholder interaction.",
                    v: "teal"
                  },
                  {
                    comp: "Watch area: Pressure Resilience",
                    ind: "Consistency during high-stakes failure scenarios",
                    excerpts: ["“I tend to focus on the fix; I might need support on the broadcast communication.”"],
                    imp: "Ensure strong comms lead is paired for go-live.",
                    v: "orange"
                  }
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col">
                    <div className="flex items-center justify-between">
                      <Chip label={card.comp} variant={card.v as any} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">What it indicates</span>
                      <p className="text-[13px] font-bold text-slate-700">{card.ind}</p>
                    </div>
                    <div className="space-y-3 flex-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Representative excerpts</span>
                      <div className="space-y-2">
                        {card.excerpts.map((exc, j) => (
                          <p key={j} className="text-[12px] text-slate-500 italic leading-relaxed pl-3 border-l-2 border-slate-100">{exc}</p>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 mt-auto border-t border-slate-50">
                      <span className="text-[10px] font-black text-[#002A54] uppercase tracking-widest block mb-1">Implication for delivery</span>
                      <p className={`text-[12px] font-medium p-3 rounded-lg border ${card.v === 'orange' ? 'bg-[#FFF7ED] text-[#B45309] border-[#FFEDD5]' : 'bg-[#F0F7FF] text-slate-600 border-[#D0E6FF]'}`}>
                        {card.imp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: Risk and Conditions */}
            <section ref={sectionRefs.RiskConditions} id="ANCHOR_RiskConditions" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest">Risk and Conditions Register</h3>
                </div>
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-[12px] min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Risk</th>
                        <th className="px-4 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Likelihood</th>
                        <th className="px-4 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Impact</th>
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Condition</th>
                        <th className="px-8 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Validation method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { 
                          risk: "Sustained go-live pressure behavior", 
                          like: "Medium", likeV: "orange", 
                          imp: "Medium", impV: "orange",
                          cond: "Paired with experienced lead",
                          val: "Detailed go-live story review"
                        },
                        { 
                          risk: "Advanced complexity handling", 
                          like: "Low", likeV: "green", 
                          imp: "High", impV: "teal",
                          cond: "Design review for core architecture",
                          val: "Scenario-based technical deep dive"
                        },
                        { 
                          risk: "Stakeholder conflict pushback", 
                          like: "Medium", likeV: "orange", 
                          imp: "Medium–High", impV: "orange",
                          cond: "Early alignment rituals enforced",
                          val: "Pushback simulation or reference"
                        },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-900">{row.risk}</td>
                          <td className="px-4 py-4 text-center"><Chip label={row.like} variant={row.likeV as any} /></td>
                          <td className="px-4 py-4 text-center"><Chip label={row.imp} variant={row.impV as any} /></td>
                          <td className="px-8 py-4 font-medium text-slate-500">{row.cond}</td>
                          <td className="px-8 py-4 text-right font-bold text-[#002A54] italic">{row.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 6: Role Simulation Notes */}
            <section ref={sectionRefs.Simulation} id="ANCHOR_Simulation" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest">Role Simulation Notes</h3>
                </div>
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-[12px] min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Scenario</th>
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">What panel looked for</th>
                        <th className="px-8 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Response quality</th>
                        <th className="px-8 py-3 text-right font-black text-slate-400 uppercase tracking-widest">Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { 
                          scen: "Integration failure ownership", 
                          look: "Root cause logic + comms plan", 
                          qual: "Structured, calm, sequence-driven",
                          verd: "Strong", v: "green"
                        },
                        { 
                          scen: "Cutover triage discipline", 
                          look: "Priority setting under time constraint", 
                          qual: "Practical, focused on business continuity",
                          verd: "Moderate", v: "orange"
                        },
                        { 
                          scen: "Stakeholder pushback posture", 
                          look: "Ability to say 'no' with rationale", 
                          qual: "Respectful but slightly tentative",
                          verd: "Moderate", v: "orange"
                        },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-900">{row.scen}</td>
                          <td className="px-8 py-4 text-slate-500 font-medium">{row.look}</td>
                          <td className="px-8 py-4 text-center font-medium text-slate-600 italic">“{row.qual}”</td>
                          <td className="px-8 py-4 text-right">
                            <Chip label={row.verd} variant={row.v as any} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 7: Final Recommendation */}
            <section ref={sectionRefs.Recommendation} id="ANCHOR_Recommendation" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-[#D1FAE5] shadow-xl p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                  <Target className="w-32 h-32 text-[#10B981]" />
                </div>

                <div className="flex items-center justify-between relative">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] block">Final Verdict</span>
                    <h3 className="text-2xl font-black text-slate-900">Recommendation: Proceed</h3>
                  </div>
                  <div className="flex gap-2">
                    <Chip label="Proceed" variant="green" />
                  </div>
                </div>

                <div className="space-y-4 relative">
                  <p className="text-[15px] text-slate-600 leading-relaxed font-bold">
                    “Proceed for most programs. Validate conflict pushback and sustained pressure resilience if the environment is escalation-heavy or go-live intense.”
                  </p>
                </div>

                <div className="bg-[#002A54] rounded-xl p-6 space-y-6 relative shadow-inner">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-300" />
                    <h4 className="text-[11px] font-black text-blue-300 uppercase tracking-widest">10-minute validation prompts</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      "“Describe your worst go-live week. How did you manage priorities, pressure, and communication?”",
                      "“Tell me about a time you pushed back on a senior stakeholder. What did you say and what happened?”",
                      "“Can you give me an example of an edge-case trade-off decision you made? Why did you pick that path?”"
                    ].map((p, i) => (
                      <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl text-[13px] font-medium text-white/90 leading-relaxed">
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: Confidence and Limits */}
            <section ref={sectionRefs.Confidence} id="ANCHOR_Confidence" className="space-y-6 pb-20">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
                <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest">Confidence and Limits</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Confidence</span>
                      <span className="text-[14px] font-black text-emerald-600 uppercase tracking-widest">High</span>
                    </div>
                    <div className="h-8 w-px bg-slate-100" />
                    <div className="flex-1 space-y-0.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Why</span>
                      <p className="text-[13px] font-bold text-slate-600">Interviewer agreement + ownership cues + consistent decision quality</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[12px] text-slate-500 italic leading-relaxed">
                      <span className="font-bold text-slate-700 not-italic">Limits:</span> Panel signals reflect interview context and should be paired with delivery evidence when required.
                    </p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <div className="flex gap-2">
                      <Chip label="Use with: Precision Match" variant="blue" />
                      <Chip label="Technical Fit" variant="purple" />
                      <Chip label="Cultural Fit" variant="teal" />
                    </div>
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