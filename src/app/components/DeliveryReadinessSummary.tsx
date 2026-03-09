import React from 'react';
import { 
  ArrowLeft, 
  ChevronRight,
  Download, 
  CheckCircle2, 
  Info,
  Activity,
  Sparkles
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

interface DeliveryReadinessSummaryProps {
  onBack: () => void;
  onViewPrecisionMatch: () => void;
  onViewTechnicalReport: () => void;
  onViewCulturalReport: () => void;
  onViewPanelReport: () => void;
  onSwitchToDetailed?: () => void;
  onDownloadPDF?: () => void;
  candidateId: string | null;
}

export function DeliveryReadinessSummary({ 
  onBack, 
  onViewPrecisionMatch, 
  onViewTechnicalReport, 
  onViewCulturalReport, 
  onViewPanelReport, 
  onSwitchToDetailed,
  onDownloadPDF,
  candidateId 
}: DeliveryReadinessSummaryProps) {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#F6F8FB]">
      <div className="max-w-[1180px] mx-auto px-6 py-10 space-y-8">
        
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
              <button className="px-4 py-1.5 bg-white text-[#002A54] rounded-md text-[11px] font-black uppercase tracking-widest shadow-sm">
                Summary
              </button>
              <button 
                onClick={onSwitchToDetailed}
                className="px-4 py-1.5 text-slate-500 rounded-md text-[11px] font-black uppercase tracking-widest hover:text-slate-700 transition-colors"
              >
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

        {/* SECTION 1: HERO SUMMARY CARD */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* Left Side - Executive Narrative */}
              <div className="flex-[0.65] p-8 space-y-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">EXECUTIVE FIT SUMMARY</span>
                
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  Client-ready SAP TM functional profile with strong delivery-fit validation.
                </h2>
                
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  This candidate is ready for submission for SAP TM functional roles with strong core scope alignment and validated delivery behavior. Technical and panel signals confirm practical configuration depth, integration judgment, and stakeholder-ready execution. Watch areas are limited to advanced depth topics and high-complexity implementation ownership, with no blocking delivery risks identified.
                </p>

                <div className="bg-[#EBF1F7] border-l-4 border-[#005AB5] p-5 rounded-r-xl">
                  <p className="text-[14px] text-[#002A54] font-medium leading-relaxed">
                    <span className="font-black">Recommended submission positioning:</span> Present as a strong SAP TM functional consultant for implementation and support roles with validated integration judgment and delivery ownership. Position advanced optimization and full end-to-end program breadth as watch areas, not blockers.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Submission Readiness:</span>
                      <span className="font-black text-slate-900">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Client Confidence:</span>
                      <span className="font-black text-slate-900">Strong</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Risk Posture:</span>
                      <span className="font-black text-emerald-700">No Blocking Risks</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-slate-500 font-medium">Best Fit:</span>
                      <span className="font-black text-slate-900 text-right">SAP TM functional delivery, implementation and support</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Chip label="DELIVERY READY" variant="green" />
                  <Chip label="HIGH CONFIDENCE" variant="blue" />
                  <Chip label="NO BLOCKING RISKS" variant="teal" />
                  <Chip label="2 WATCH AREAS" variant="orange" />
                </div>
              </div>

              {/* Right Side - Decision Snapshot Panel */}
              <div className="flex-[0.35] bg-slate-50/50 p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">CORE FIT</h3>
                  <div className="flex flex-wrap gap-2">
                    <Chip label="SAP TM FUNCTIONAL" variant="blue" />
                    <Chip label="S/4HANA" variant="teal" />
                    <Chip label="IMPLEMENTATION + SUPPORT" variant="orange" />
                    <Chip label="LOGISTICS & TRANSPORTATION" variant="purple" />
                  </div>
                </div>

                <div className="h-px bg-slate-200" />

                <div className="space-y-4">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">VALIDATION COVERAGE</h3>
                  <div className="flex flex-wrap gap-2">
                    <Chip label="JD-BASED PRECISION MATCH" variant="green" />
                    <Chip label="SCENARIO-LEVEL TECHNICAL" variant="slate" />
                    <Chip label="DELIVERY BEHAVIOR SIGNALS" variant="blue" />
                    <Chip label="PANEL APPROVED" variant="teal" />
                  </div>
                </div>

                <div className="h-px bg-slate-200" />

                <div className="space-y-4">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">CONFIDENCE SNAPSHOT</h3>
                  <div className="space-y-2.5 text-[13px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Overall Confidence:</span>
                      <Chip label="High" variant="green" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Watch Areas:</span>
                      <span className="font-black text-slate-900">2 Areas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Risk Status:</span>
                      <div className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
                        <span className="text-[10px] font-black text-emerald-700">NO BLOCKING RISKS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-200" />

                <div className="space-y-3">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">WATCH AREAS</h3>
                  <div className="flex flex-wrap gap-2">
                    <Chip label="E2E IMPLEMENTATION DEPTH: PARTIAL" variant="orange" />
                    <Chip label="ADVANCED DEVELOPMENT: MODERATE" variant="purple" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed pt-1">
                    Visible watch areas are advisory and should be validated only if role complexity requires deeper coverage.
                  </p>
                  <div className="text-[10px] text-slate-400 leading-relaxed space-y-1">
                    <p>• E2E breadth examples should be validated for program-level ownership roles</p>
                    <p>• Advanced optimization depth should be validated for high-complexity programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COMPACT PROOF STRIP */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-[11px] font-black text-[#002A54] uppercase tracking-widest mb-4">WHY THIS CANDIDATE IS DEPLOYABLE</h3>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <Chip label="ROLE-CRITICAL EXPERIENCE" variant="green" />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <Chip label="HANDS-ON CAPABILITY" variant="blue" />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <Chip label="EXECUTION MINDSET" variant="teal" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-3">
              Validated across multiple sources and consistent with delivery-oriented interview signals.
            </p>
          </div>
        </section>

        {/* SECTION 3: VALIDATION SNAPSHOT */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">VALIDATION SNAPSHOT</h3>
              <p className="text-[13px] text-slate-500 font-medium">
                Multi-layer validation confirms deployability across role-fit, technical capability, communication behavior, and panel judgment. Open Detailed View for report-level evidence.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Precision Match</h4>
                <div className="text-3xl font-black text-[#B45309]">86%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Strong Match</div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Technical Fit</h4>
                <div className="text-3xl font-black text-[#B45309]">82%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Technically Validated</div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Cultural Fit</h4>
                <div className="text-3xl font-black text-[#B45309]">78%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Positive Delivery Fit</div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Panel Fit</h4>
                <div className="text-3xl font-black text-[#B45309]">80%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Panel Approved</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-medium pt-2">
              Detailed evidence and all linked report views are available in Detailed View.
            </p>
          </div>
        </section>

        {/* SECTION 4: SUBMISSION GUIDANCE */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#002A54] px-8 py-4">
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest">SUBMISSION GUIDANCE FOR CLIENT PRESENTATION</h3>
            </div>
            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* Left Column */}
              <div className="flex-1 p-8 space-y-5">
                <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-wider">Recommended positioning</h4>
                <ul className="space-y-2.5 text-[14px] text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-black mt-0.5">•</span>
                    <span>Lead with validated SAP TM functional configuration depth and delivery readiness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-black mt-0.5">•</span>
                    <span>Highlight integration judgment across TM to EWM, SD, and MM workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-black mt-0.5">•</span>
                    <span>Present as a strong fit for implementation plus support roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-black mt-0.5">•</span>
                    <span>Mention panel-confirmed ownership and stakeholder readiness</span>
                  </li>
                </ul>

                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mt-4">
                  <p className="text-[13px] text-[#002A54] font-bold leading-relaxed italic">
                    "Validated SAP TM functional candidate with strong delivery-fit signals across JD match, technical evaluation, and panel assessment, with no blocking risks and only moderate watch areas in advanced depth topics."
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 p-8 space-y-5">
                <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-wider">Final validation prompts</h4>
                <ul className="space-y-2.5 text-[14px] text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-black mt-0.5">•</span>
                    <span>Ask for one end-to-end cutover or go-live validation example owned by the candidate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-black mt-0.5">•</span>
                    <span>Validate advanced optimization or performance tuning depth if role complexity is high</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-black mt-0.5">•</span>
                    <span>Confirm middleware build ownership only if CPI build responsibility is a hard requirement</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 font-medium">
                This summary is designed for quick client-facing decision support. Use Detailed View only when deeper technical proof is required.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: RECOMMENDED NEXT STEP */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3">RECOMMENDED NEXT STEP</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              Proceed to client submission using the summary framing above, or use Detailed View if deeper evidence is required for technical depth, implementation ownership, or watch areas.
            </p>
          </div>
        </section>

        <div className="pt-6 flex justify-center">
          <div className="flex items-center gap-3 text-slate-400">
            <Info className="w-4 h-4" />
            <span className="text-[11px] font-medium uppercase tracking-widest">Proprietary DeepSAP Delivery Readiness Model v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}