import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  MessageSquare,
  AlertTriangle
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

interface CulturalFitReportProps {
  onBack: () => void;
  candidateId: string | null;
}

const NAV_ITEMS = [
  { id: 'Verdict', label: 'Cultural Readiness Verdict' },
  { id: 'Signals', label: 'Signal Dashboard' },
  { id: 'Stability', label: 'Sentiment Stability' },
  { id: 'Evidence', label: 'Evidence Ladder' },
  { id: 'RiskRegister', label: 'Culture Risk Register' },
  { id: 'TeamFit', label: 'Team Fit Profile' },
  { id: 'Recommendation', label: 'Recommendation' },
  { id: 'Confidence', label: 'Confidence and Limits' },
];

export function CulturalFitReport({ onBack, candidateId }: CulturalFitReportProps) {
  const [activeNav, setActiveNav] = useState('Verdict');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs = {
    Verdict: useRef<HTMLDivElement>(null),
    Signals: useRef<HTMLDivElement>(null),
    Stability: useRef<HTMLDivElement>(null),
    Evidence: useRef<HTMLDivElement>(null),
    RiskRegister: useRef<HTMLDivElement>(null),
    TeamFit: useRef<HTMLDivElement>(null),
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
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cultural Fit Report (Sentiment Intelligence)</p>
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
          <div className="w-full mx-auto space-y-10 px-[28px] py-[40px]">
            
            {/* SECTION 1: Cultural Readiness Verdict */}
            <section ref={sectionRefs.Verdict} id="ANCHOR_Verdict" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 space-y-8">
                  <div className="w-full flex items-center justify-between">
                    <h3 className="text-xl font-black text-[#002A54] uppercase tracking-widest">Delivery Culture Fit</h3>
                    <div className="flex gap-2">
                      <Chip label="Delivery Ready" variant="green" />
                      <Chip label="Low red-flag risk" variant="green" />
                      <Chip label="2 watch areas" variant="orange" />
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-[#B45309]">78%</span>
                      <span className="text-xl font-black text-[#002A54] uppercase tracking-widest">Positive Delivery Fit</span>
                    </div>
                    <div className="h-10 w-px bg-slate-200" />
                    <div className="flex gap-2">
                      <Chip label="Confidence: Medium–High" variant="blue" />
                      <Chip label="Evidence-backed" variant="purple" />
                    </div>
                  </div>

                  <p className="w-full text-[15px] text-slate-600 leading-relaxed font-medium">
                    Signals indicate stable communication, collaborative delivery behavior, and ownership-oriented responses under ambiguity. Candidate appears safe for stakeholder-facing programs with low volatility. Two watch areas exist around pushback strength and sustained pressure resilience in intense delivery windows.
                  </p>

                  <p className="w-full text-[11px] text-slate-400 italic font-medium">
                    Derived from: sentiment polarity + tone stability + intent markers + escalation posture cues + cross-question consistency
                  </p>

                  <div className="w-full bg-slate-50 rounded-xl p-4 flex items-center gap-4 border border-slate-100">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#002A54]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-[#002A54] uppercase tracking-widest block mb-0.5">Decision guidance</span>
                      <p className="text-[13px] text-slate-600 font-medium">
                        Proceed for most programs. Validate watch areas if the environment is conflict-heavy or go-live intense.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Signal Dashboard */}
            <section ref={sectionRefs.Signals} id="ANCHOR_Signals" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="mb-8">
                  <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest">Cultural Signal Dashboard</h3>
                  <p className="text-sm text-slate-400 font-medium mt-1">Signals reflect delivery behavior predictability in real stakeholder environments.</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { name: "Communication Clarity", strength: "Strong", conf: "High", val: 90, desc: "Structured, low-noise responses, explains steps and trade-offs clearly." },
                    { name: "Ownership Posture", strength: "Strong", conf: "High", val: 88, desc: "First-responder language, accountability orientation." },
                    { name: "Collaboration Operating Style", strength: "Strong", conf: "High", val: 85, desc: "Clear handoffs, alignment-first execution patterns." },
                    { name: "Stakeholder Maturity", strength: "Medium–High", conf: "Medium–High", val: 78, desc: "Calm negotiation tone, practical expectation setting." },
                    { name: "Ambiguity Handling", strength: "Medium–High", conf: "Medium–High", val: 75, desc: "Stays stable when requirements are unclear, asks clarifying questions." },
                    { name: "Conflict Posture", strength: "Moderate", conf: "Medium", val: 62, desc: "Consensus-first posture, validate ability to push back firmly." },
                    { name: "Resilience Under Pressure", strength: "Moderate", conf: "Medium", val: 60, desc: "Stable tone, but limited extreme-pressure narratives." },
                  ].map((sig, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-black text-slate-700 uppercase tracking-tight">{sig.name}</span>
                          <Chip label={sig.strength} variant={sig.strength.includes('Strong') ? 'green' : sig.strength.includes('High') ? 'teal' : 'orange'} />
                          <Chip label={`Confidence: ${sig.conf}`} variant="slate" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${sig.val >= 80 ? 'bg-emerald-500' : sig.val >= 70 ? 'bg-teal-500' : 'bg-[#B45309]'}`} 
                            style={{ width: `${sig.val}%` }} 
                          />
                        </div>
                        <span className="text-[11px] font-black text-slate-400 w-8">{sig.val}%</span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic">{sig.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-[13px] text-slate-600 font-bold">
                    Overall: <span className="text-[#002A54]">Strong delivery-fit signals with two moderate watch areas that matter most in high-pressure programs.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Sentiment Stability */}
            <section ref={sectionRefs.Stability} id="ANCHOR_Stability" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest mb-8">Sentiment Integrity and Stability</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    {[
                      { label: "Tone stability", value: "High", v: "green" },
                      { label: "Volatility", value: "Low", v: "green" },
                      { label: "Defensiveness markers", value: "Low", v: "green" },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-[13px] text-slate-500 font-medium">{m.label}</span>
                        <span className={`text-[13px] font-black uppercase tracking-widest ${m.v === 'green' ? 'text-emerald-600' : 'text-[#B45309]'}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Negativity spikes", value: "None detected", v: "green" },
                      { label: "Response coherence", value: "High", v: "green" },
                      { label: "Consistency across prompts", value: "High", v: "green" },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-[13px] text-slate-500 font-medium">{m.label}</span>
                        <span className={`text-[13px] font-black uppercase tracking-widest ${m.v === 'green' ? 'text-emerald-600' : 'text-[#B45309]'}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    <span className="font-black text-[#002A54] uppercase tracking-widest text-[11px] block mb-1">Interpretation</span>
                    Low volatility and low defensiveness indicate predictable delivery behavior under typical stakeholder pressure.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: Evidence Ladder */}
            <section ref={sectionRefs.Evidence} id="ANCHOR_Evidence" className="space-y-6">
              <div className="w-full grid grid-cols-1 gap-6">
                {/* Evidence Card A */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Chip label="Ownership posture (Strong)" variant="green" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">What it indicates</span>
                    <p className="text-[13px] font-bold text-slate-700">Outcome accountability, first-responder mindset</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Representative excerpts</span>
                    <div className="space-y-2">
                      <p className="text-[12px] text-slate-500 italic leading-relaxed pl-3 border-l-2 border-slate-100">“I would own triage first, isolate root cause, then communicate options.”</p>
                      <p className="text-[12px] text-slate-500 italic leading-relaxed pl-3 border-l-2 border-slate-100">“If blocked, I escalate with impact, timeline, and recommended actions.”</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] font-black text-[#002A54] uppercase tracking-widest block mb-1">Implication for delivery</span>
                    <p className="text-[12px] text-slate-600 font-medium bg-[#F0F7FF] p-3 rounded-lg border border-[#D0E6FF]">Safe for client-facing execution roles.</p>
                  </div>
                </div>

                {/* Evidence Card B */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <Chip label="Stakeholder tone (Medium–High)" variant="teal" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">What it indicates</span>
                    <p className="text-[13px] font-bold text-slate-700">Calm alignment, expectation-setting discipline</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Representative excerpts</span>
                    <div className="space-y-2">
                      <p className="text-[12px] text-slate-500 italic leading-relaxed pl-3 border-l-2 border-slate-100">“I align expectations early and share risk transparently before it becomes urgent.”</p>
                    </div>
                  </div>
                  <div className="pt-2 mt-auto">
                    <span className="text-[10px] font-black text-[#002A54] uppercase tracking-widest block mb-1">Implication for delivery</span>
                    <p className="text-[12px] text-slate-600 font-medium bg-[#F0F7FF] p-3 rounded-lg border border-[#D0E6FF]">Suitable for governance-driven programs.</p>
                  </div>
                </div>

                {/* Evidence Card C */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Chip label="Pushback behavior (Moderate)" variant="orange" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">What it indicates</span>
                    <p className="text-[13px] font-bold text-slate-700">May delay challenging unrealistic scope</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Representative excerpts</span>
                    <div className="space-y-2">
                      <p className="text-[12px] text-slate-500 italic leading-relaxed pl-3 border-l-2 border-slate-100">“I try to keep alignment and avoid friction when possible.”</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] font-black text-[#B45309] uppercase tracking-widest block mb-1">Implication for delivery</span>
                    <p className="text-[12px] text-slate-600 font-medium bg-[#FFF7ED] p-3 rounded-lg border border-[#FFEDD5]">Validate firm pushback under delivery risk.</p>
                  </div>
                </div>

                {/* Evidence Card D */}
                <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <Chip label="Stress load cues (Moderate)" variant="orange" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">What it indicates</span>
                    <p className="text-[13px] font-bold text-slate-700">Stable tone, but limited extreme-pressure evidence</p>
                  </div>
                  <div className="pt-2 mt-auto">
                    <span className="text-[10px] font-black text-[#B45309] uppercase tracking-widest block mb-1">Implication for delivery</span>
                    <p className="text-[12px] text-slate-600 font-medium bg-[#FFF7ED] p-3 rounded-lg border border-[#FFEDD5]">Validate behavior during go-live intensity and escalations.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Culture Risk Register */}
            <section ref={sectionRefs.RiskRegister} id="ANCHOR_RiskRegister" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest">Culture Risk Register</h3>
                </div>
                <div className="p-0">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">Risk</th>
                        <th className="px-4 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Likelihood</th>
                        <th className="px-4 py-3 text-center font-black text-slate-400 uppercase tracking-widest">Impact</th>
                        <th className="px-8 py-3 text-left font-black text-slate-400 uppercase tracking-widest">What it means</th>
                        <th className="px-8 py-3 text-right font-black text-slate-400 uppercase tracking-widest">How to validate fast</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { 
                          risk: "Pushback strength under conflict", 
                          like: "Medium", likeV: "orange", 
                          imp: "Medium–High", impV: "orange",
                          mean: "May accept unrealistic asks too long",
                          val: "Ask for a real stakeholder pushback example and outcome"
                        },
                        { 
                          risk: "Sustained pressure resilience", 
                          like: "Medium", likeV: "orange", 
                          imp: "Medium", impV: "orange",
                          mean: "Unknown in intense delivery weeks",
                          val: "Ask for worst go-live week story, priorities, communication"
                        },
                        { 
                          risk: "Escalation posture clarity", 
                          like: "Low", likeV: "green", 
                          imp: "Medium", impV: "teal",
                          mean: "Likely fine, confirm mechanics",
                          val: "Ask “how do you escalate without creating conflict”"
                        },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-900">{row.risk}</td>
                          <td className="px-4 py-4 text-center"><Chip label={row.like} variant={row.likeV as any} /></td>
                          <td className="px-4 py-4 text-center"><Chip label={row.imp} variant={row.impV as any} /></td>
                          <td className="px-8 py-4 font-medium text-slate-500">{row.mean}</td>
                          <td className="px-8 py-4 text-right font-bold text-[#002A54] italic">{row.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-8 py-3 bg-slate-50/30 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 italic">Risk register is not a rejection list. It defines targeted validation areas.</p>
                </div>
              </div>
            </section>

            {/* SECTION 6: Team Fit Profile */}
            <section ref={sectionRefs.TeamFit} id="ANCHOR_TeamFit" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-lg font-black text-[#002A54] uppercase tracking-widest mb-8">Team Fit Profile</h3>
                
                <div className="grid grid-cols-1 gap-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <Users className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h4 className="text-[13px] font-black text-emerald-600 uppercase tracking-tight">Works best in</h4>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Structured teams with clear ownership and handoffs",
                        "Stakeholder-facing programs with governance rituals",
                        "Cultures valuing clarity, accountability, and predictable execution"
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-[13px] text-slate-600 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center border border-rose-100">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      </div>
                      <h4 className="text-[13px] font-black text-rose-600 uppercase tracking-tight">Potential mismatch risk in</h4>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "High-conflict environments with constant political escalation",
                        "Chaotic programs with low process discipline and unclear ownership"
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-[13px] text-slate-600 font-medium">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
                  <Chip label="Environment suitability: Best in structured delivery cultures" variant="teal" />
                </div>
              </div>
            </section>

            {/* SECTION 7: Recommendation */}
            <section ref={sectionRefs.Recommendation} id="ANCHOR_Recommendation" className="space-y-6">
              <div className="w-full bg-white rounded-2xl border border-[#D1FAE5] shadow-xl p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                  <TrendingUp className="w-32 h-32 text-[#10B981]" />
                </div>

                <div className="flex items-center justify-between relative">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] block">Decision Verdict</span>
                    <h3 className="text-2xl font-black text-slate-900">Recommendation: Proceed</h3>
                  </div>
                  <div className="flex gap-2">
                    <Chip label="Proceed" variant="green" />
                    <Chip label="Validate watch areas" variant="orange" />
                  </div>
                </div>

                <div className="space-y-4 relative">
                  <p className="text-[15px] text-slate-600 leading-relaxed font-bold">
                    “Proceed for most programs. Validate conflict pushback and sustained pressure resilience if the environment is escalation-heavy or go-live intense.”
                  </p>
                </div>

                <div className="bg-[#002A54] rounded-xl p-6 space-y-6 relative">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-300" />
                    <h4 className="text-[11px] font-black text-blue-300 uppercase tracking-widest">10-minute validation prompts</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      "“Tell me about a time you pushed back on a senior stakeholder. What did you say and what happened?”",
                      "“Describe your worst go-live week. How did you manage priorities, pressure, and communication?”",
                      "“When a dependency blocks you, how do you escalate without creating conflict?”"
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
                      <span className="text-[14px] font-black text-emerald-600 uppercase tracking-widest">Medium–High</span>
                    </div>
                    <div className="h-8 w-px bg-slate-100" />
                    <div className="flex-1 space-y-0.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Why</span>
                      <p className="text-[13px] font-bold text-slate-600">Tone stability + ownership language + coherent stakeholder posture</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[12px] text-slate-500 italic leading-relaxed">
                      <span className="font-bold text-slate-700 not-italic">Limits:</span> Sentiment signals reflect interview context and should be combined with panel judgment and delivery evidence.
                    </p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <div className="flex gap-2">
                      <Chip label="Use with: Precision Match" variant="blue" />
                      <Chip label="Technical Fit" variant="purple" />
                      <Chip label="Panel Fit" variant="slate" />
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