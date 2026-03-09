import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown,
  Download, 
  CheckCircle2, 
  Sparkles,
  Info,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${styles[variant]} whitespace-nowrap inline-flex items-center gap-1`}>
      {label}
    </span>
  );
};

const variants: ChipProps['variant'][] = ['blue', 'teal', 'orange', 'purple', 'green', 'slate'];
const getRandomVariant = (index: number) => variants[index % variants.length];

interface SignalCardProps {
  title: string;
  score: string;
  status: string;
  text: string;
  chips: string[];
  cta: string;
  onClick?: () => void;
}

const SignalCard = ({ title, score, status, text, chips, cta, onClick }: SignalCardProps) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">{title}</h3>
      <div className="text-right">
        <div className="text-xl font-black text-[#B45309]">{score}</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{status}</div>
      </div>
    </div>
    <p className="text-[14px] text-slate-600 leading-relaxed mb-6">
      {text}
    </p>
    <div className="flex flex-wrap gap-2 mb-8">
      {chips.map((chip, i) => (
        <Chip key={chip} label={chip} variant={getRandomVariant(i)} />
      ))}
    </div>
    <div className="mt-auto">
      <button 
        onClick={onClick}
        className="text-[12px] font-black text-[#B45309] uppercase tracking-widest flex items-center gap-1.5 hover:gap-2 transition-all cursor-pointer"
      >
        {cta}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

interface SubScoreTileProps {
  title: string;
  score: string;
  scoreLabel?: string;
  chips?: { label: string; variant: ChipProps['variant'] }[];
  microLine: string;
}

const SubScoreTile = ({ title, score, scoreLabel, chips, microLine }: SubScoreTileProps) => (
  <div className="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between">
      <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">{title}</h5>
      <div className="flex items-center gap-2">
        <span className="text-lg font-black text-[#B45309]">{score}</span>
        {scoreLabel && <Chip label={scoreLabel} variant="green" />}
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 min-h-[26px]">
      {chips?.map((chip, i) => (
        <Chip key={i} label={chip.label} variant={chip.variant} />
      ))}
    </div>
    <p className="text-[10px] text-slate-400 font-medium leading-tight">{microLine}</p>
  </div>
);

interface DeliveryReadinessCandidateProps {
  onBack: () => void;
  onViewPrecisionMatch: () => void;
  onViewTechnicalReport: () => void;
  onViewCulturalReport: () => void;
  onViewPanelReport: () => void;
  onSwitchToSummary?: () => void;
  onDownloadPDF?: () => void;
  candidateId: string | null;
}

export function DeliveryReadinessCandidate({ onBack, onViewPrecisionMatch, onViewTechnicalReport, onViewCulturalReport, onViewPanelReport, onSwitchToSummary, onDownloadPDF, candidateId }: DeliveryReadinessCandidateProps) {
  const [isDeployableExpanded, setIsDeployableExpanded] = useState(false);
  const [isSubScoresExpanded, setIsSubScoresExpanded] = useState(false);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#F6F8FB]">
      <div className="max-w-[1180px] mx-auto px-6 py-10 space-y-10">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/60">
          <div className="space-y-1">
            <button 
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-[11px] font-black uppercase tracking-widest mb-4 group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-[#002A54] tracking-tight">Delivery Readiness</h1>
              <Chip label="DELIVERY READY" variant="green" />
            </div>
            <p className="text-sm text-slate-500 font-medium">Executive-level deployability summary backed by multi-layered validation.</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
              Derived from: JD + Technical validation + Behavioral signals + Panel evaluation
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={onSwitchToSummary}
                className="px-4 py-1.5 text-slate-500 rounded-md text-[11px] font-black uppercase tracking-widest hover:text-slate-700 transition-colors"
              >
                Summary
              </button>
              <button className="px-4 py-1.5 bg-white text-[#002A54] rounded-md text-[11px] font-black uppercase tracking-widest shadow-sm">
                Detailed
              </button>
            </div>
            <button 
              onClick={onDownloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE FIT NARRATIVE (HERO CARD) */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative flex">
            {/* Orange vertical accent bar */}
            <div className="w-1.5 bg-[#B45309] shrink-0" />
            
            <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* Left Column Content - Wider */}
              <div className="flex-[0.7] p-8 lg:p-10 space-y-8">
                <div className="space-y-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">EXECUTIVE FIT NARRATIVE</span>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    This candidate is delivery-ready for the role, supported by multi-layered validation.
                  </h2>
                  <div className="space-y-4">
                    <p className="text-[15px] text-slate-600 leading-relaxed">
                      Role alignment and SAP TM functional depth are strong, with hands-on technical capability validated through scenario-level evaluation.
                    </p>
                    <p className="text-[15px] text-slate-600 leading-relaxed">
                      Behavioral and panel signals confirm delivery ownership and stakeholder readiness.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border-l-4 border-slate-300 p-6 rounded-r-xl">
                  <p className="text-[14px] text-slate-600 italic leading-relaxed">
                    “A small number of watch areas exist for high-complexity implementations, with no blocking risks identified.”
                  </p>
                </div>

                {/* Accordion row under the narrative */}
                <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button 
                    onClick={() => setIsDeployableExpanded(!isDeployableExpanded)}
                    className="w-full px-6 py-5 flex items-center justify-between text-[11px] font-black text-[#002A54] uppercase tracking-widest border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#B45309]" />
                      WHY THIS CANDIDATE IS DEPLOYABLE
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDeployableExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isDeployableExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              { 
                                title: "Role-critical experience", 
                                desc: "SAP TM functional scope and integrations align with must-have requirements." 
                              },
                              { 
                                title: "Hands-on capability", 
                                desc: "Scenario evaluation validates real decision-making and configuration depth." 
                              },
                              { 
                                title: "Execution mindset", 
                                desc: "Signals indicate reliable delivery behavior in stakeholder-facing environments." 
                              }
                            ].map((item, idx) => (
                              <div key={idx} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                                <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-wide">{item.title}</h4>
                                <p className="text-[12px] text-slate-500 leading-relaxed">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* READINESS SUB-SCORES ACCORDION */}
                <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button 
                    onClick={() => setIsSubScoresExpanded(!isSubScoresExpanded)}
                    className="w-full px-6 py-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 text-[#000000]">
                      <Sparkles className="w-4 h-4 text-[#B45309]" />
                      READINESS SUB-SCORES
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isSubScoresExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isSubScoresExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-2">
                          <div className="flex flex-col md:flex-row gap-4">
                            <SubScoreTile 
                              title="Scenario Readiness"
                              score="84"
                              scoreLabel="High"
                              chips={[{ label: "Scenario: TM Go-Live + Integrations", variant: "blue" }]}
                              microLine="Aggregated from sub-scores."
                            />
                            <SubScoreTile 
                              title="Lifecycle Completeness"
                              score="76"
                              chips={[
                                { label: "Design \u2713", variant: "green" },
                                { label: "Build \u2713", variant: "green" },
                                { label: "Go-live ~", variant: "orange" },
                                { label: "Hypercare ~", variant: "orange" }
                              ]}
                              microLine="Go-live and hypercare depth is moderate."
                            />
                            <SubScoreTile 
                              title="Integration Exposure"
                              score="81"
                              chips={[
                                { label: "SD/MM/EWM", variant: "teal" },
                                { label: "IDoc", variant: "purple" },
                                { label: "Middleware: Partial", variant: "slate" }
                              ]}
                              microLine="Ownership validated; confirm middleware depth if required."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* WATCH AREAS SECTION */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">WATCH AREAS</span>
                  <div className="flex flex-wrap gap-2">
                    <Chip label="E2E IMPLEMENTATION DEPTH: PARTIAL" variant="orange" />
                    <Chip label="ADVANCED DEVELOPMENT: MODERATE" variant="purple" />
                  </div>
                </div>
              </div>

              {/* Right Column Panel - Narrower */}
              <div className="flex-[0.3] bg-slate-50/30 p-8 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">EXECUTIVE FIT TAGS</h3>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Core Fit</span>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="SAP TM FUNCTIONAL" variant="blue" />
                      <Chip label="S/4HANA" variant="teal" />
                      <Chip label="IMPLEMENTATION + SUPPORT" variant="orange" />
                      <Chip label="LOGISTICS & TRANSPORTATION" variant="purple" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">VALIDATION COVERAGE</h3>
                  <div className="flex flex-wrap gap-2">
                    <Chip label="JD-BASED PRECISION MATCH" variant="green" />
                    <Chip label="SCENARIO-LEVEL TECHNICAL" variant="slate" />
                    <Chip label="DELIVERY BEHAVIOR SIGNALS" variant="blue" />
                    <Chip label="PANEL APPROVED" variant="teal" />
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="space-y-6">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">OVERALL CONFIDENCE</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 font-medium">Confidence Level</span>
                      <Chip label="High" variant="green" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 font-medium">Watch Areas</span>
                      <span className="text-sm font-black text-slate-900 uppercase tracking-widest">2 Areas</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">✓ NO BLOCKING RISKS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: READINESS SIGNALS */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Readiness Signals</h2>
            <p className="text-sm text-slate-500 font-medium">Each signal represents an independent dimension of delivery readiness. No single signal is sufficient on its own.</p>
          </div>

          {/* Adaptive Insight Alert Box */}
          <div className="bg-[#002A54] rounded-2xl p-6 border border-blue-500/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-16 h-16 text-blue-400" />
            </div>
            <div className="flex items-start gap-5 relative">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-blue-300 uppercase tracking-widest flex items-center gap-2">
                    Adaptive Insight
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                  </h3>
                  <Chip label="Context: High Relevance" variant="blue" />
                </div>
                <p className="text-[15px] font-bold text-white leading-relaxed max-w-[800px]">
                  This candidate is ranked #1 because they match your previous 3 successful SAP EWM hires for high-complexity Greenfield projects.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <p className="text-[10px] text-blue-300/60 font-black uppercase tracking-widest">
                    Refined from: Shortlist History + Project Success Patterns + Hiring Outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SignalCard 
              title="Precision Match"
              score="86%"
              status="Strong Match"
              text="Strong alignment with role-critical SAP TM responsibilities, core business processes, and integration expectations derived directly from the job description."
              chips={["SAP TM", "FO / FU Configuration", "Charge Management", "SD / MM / EWM Integration", "E2E Exposure: Partial"]}
              cta="View Precision Match Report"
              onClick={onViewPrecisionMatch}
            />
            <SignalCard 
              title="Technical Fit"
              score="82%"
              status="Technically Validated"
              text="Hands-on functional reasoning and real-world scenario handling validated beyond resume claims, with moderate depth in advanced development and optimization paths."
              chips={["Scenario-Based Validation", "Functional Configuration Depth", "Integration Decision-Making", "Advanced Development: Moderate"]}
              cta="View Technical Interview Report"
              onClick={onViewTechnicalReport}
            />
            <SignalCard 
              title="Cultural Fit"
              score="78%"
              status="Positive Delivery Fit"
              text="Communication and collaboration signals indicate reliable delivery behavior for stakeholder-facing SAP roles, with stable performance under ambiguity."
              chips={["Clear Communication", "Collaborative Delivery", "Ownership-Oriented", "Stable Under Ambiguity"]}
              cta="View Cultural Fit Report"
              onClick={onViewCulturalReport}
            />
            <SignalCard 
              title="Panel Fit"
              score="80%"
              status="Panel Approved"
              text="Structured panel evaluation confirms practical delivery readiness and decision maturity, with guidance noted for complex or large-scale program scenarios."
              chips={["Delivery Ownership", "Decision Maturity", "Complexity Handling: Moderate", "Panel Consensus Achieved"]}
              cta="View Panel Interview Report"
              onClick={onViewPanelReport}
            />
          </div>
        </section>

        <div className="pt-10 flex justify-center">
          <div className="flex items-center gap-3 text-slate-400">
            <Info className="w-4 h-4" />
            <span className="text-[11px] font-medium uppercase tracking-widest">Proprietary DeepSAP Delivery Readiness Model v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}