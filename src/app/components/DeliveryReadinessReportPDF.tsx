import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

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

interface DeliveryReadinessReportPDFProps {
  onBack: () => void;
}

export function DeliveryReadinessReportPDF({ onBack }: DeliveryReadinessReportPDFProps) {
  return (
    <div className="h-full bg-slate-100 overflow-y-auto">
      {/* Top Prototype Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-300 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-[11px] font-black uppercase tracking-widest group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Report
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-[#003A70] transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* PDF Document Container */}
      <div className="py-10">
        <div className="max-w-[210mm] mx-auto space-y-6">
          
          {/* PAGE 1 */}
          <div className="bg-white shadow-lg rounded-sm p-16 space-y-10" style={{ minHeight: '297mm' }}>
            
            {/* SECTION 1: HEADER */}
            <header className="space-y-6 pb-8 border-b-2 border-slate-200">
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-[#002A54] tracking-tight">Delivery Readiness Report</h1>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mt-4">
                  <div className="flex gap-2">
                    <span className="text-slate-500 font-medium">Candidate:</span>
                    <span className="font-black text-slate-900">Rahul Verma</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 font-medium">Role:</span>
                    <span className="font-black text-slate-900">SAP TM Functional Consultant</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 font-medium">Client Context:</span>
                    <span className="font-black text-slate-900">Global Manufacturing Rollout</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 font-medium">Generated On:</span>
                    <span className="font-black text-slate-900">24 Feb 2026</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Chip label="DELIVERY READY" variant="green" />
                <Chip label="HIGH CONFIDENCE" variant="blue" />
                <Chip label="NO BLOCKING RISKS" variant="teal" />
                <Chip label="2 WATCH AREAS" variant="orange" />
              </div>
            </header>

            {/* SECTION 2: EXECUTIVE FIT SUMMARY */}
            <section className="space-y-5">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Executive Fit Summary</h2>
              
              <h3 className="text-xl font-bold text-slate-700 leading-tight">
                Client-ready SAP TM functional profile with strong delivery-fit validation.
              </h3>
              
              <div className="space-y-4 text-[15px] text-slate-700 leading-relaxed">
                <p>
                  This candidate is ready for submission for SAP TM functional roles with strong core scope alignment and validated delivery behavior. Technical and panel signals confirm practical configuration depth, integration judgment, and stakeholder-ready execution.
                </p>
                <p>
                  Watch areas are limited to advanced depth topics and high-complexity implementation ownership, with no blocking delivery risks identified. The profile is suitable for implementation and support environments where integration-aware execution and delivery ownership are important.
                </p>
              </div>

              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider pt-2">
                Derived from: JD + Resume evidence + AI technical interview + Panel interview + behavioral signals
              </p>
            </section>

            {/* SECTION 3: DECISION SNAPSHOT */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase text-[13px]">Decision Snapshot</h3>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl border border-slate-200 p-6">
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Submission Readiness</div>
                  <div className="text-lg font-black text-slate-900">High</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Client Confidence</div>
                  <div className="text-lg font-black text-slate-900">Strong</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Risk Posture</div>
                  <div className="text-lg font-black text-emerald-700">No Blocking Risks</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Best Fit</div>
                  <div className="text-sm font-black text-slate-900">SAP TM functional delivery, implementation/support</div>
                </div>
              </div>
            </section>

            {/* SECTION 4: CORE FIT + VALIDATION COVERAGE */}
            <section className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-[13px] font-black text-slate-900 tracking-tight uppercase">Core Fit</h3>
                <div className="flex flex-wrap gap-2">
                  <Chip label="SAP TM FUNCTIONAL" variant="blue" />
                  <Chip label="S/4HANA" variant="teal" />
                  <Chip label="IMPLEMENTATION + SUPPORT" variant="orange" />
                  <Chip label="LOGISTICS & TRANSPORTATION" variant="purple" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[13px] font-black text-slate-900 tracking-tight uppercase">Validation Coverage</h3>
                <div className="flex flex-wrap gap-2">
                  <Chip label="JD-BASED PRECISION MATCH" variant="green" />
                  <Chip label="SCENARIO-LEVEL TECHNICAL" variant="slate" />
                  <Chip label="DELIVERY BEHAVIOR SIGNALS" variant="blue" />
                  <Chip label="PANEL APPROVED" variant="teal" />
                </div>
              </div>
            </section>

            {/* SECTION 5: WATCH AREAS TABLE */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Watch Areas and Validation Guidance</h3>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-[11px] font-black text-slate-700 uppercase tracking-wider">Watch Area</th>
                      <th className="text-left px-4 py-3 text-[11px] font-black text-slate-700 uppercase tracking-wider">Current Signal</th>
                      <th className="text-left px-4 py-3 text-[11px] font-black text-slate-700 uppercase tracking-wider">Validation Guidance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 text-[13px] font-bold text-slate-900">E2E Implementation Depth</td>
                      <td className="px-4 py-3 text-[13px] text-slate-600">Partial</td>
                      <td className="px-4 py-3 text-[13px] text-slate-600">Validate if client expects end-to-end program ownership</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[13px] font-bold text-slate-900">Advanced Development Depth</td>
                      <td className="px-4 py-3 text-[13px] text-slate-600">Moderate</td>
                      <td className="px-4 py-3 text-[13px] text-slate-600">Validate if role requires advanced optimization or extension depth</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-slate-400 font-medium pt-2">
                Watch areas are advisory and role-dependent. They do not block submission for core TM functional roles.
              </p>
            </section>

            {/* Page Footer */}
            <div className="flex items-center justify-between pt-8 mt-auto border-t border-slate-200 text-[10px] text-slate-400 font-medium">
              <div>DeepSAP Delivery Readiness Summary</div>
              <div>Page 1 / 2</div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="bg-white shadow-lg rounded-sm p-16 space-y-10" style={{ minHeight: '297mm' }}>
            
            {/* SECTION 6: VALIDATION SNAPSHOT */}
            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Validation Snapshot</h2>
                <p className="text-[13px] text-slate-500 font-medium">
                  Multi-layer validation confirms deployability across role-fit, technical capability, communication behavior, and panel judgment.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                  <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Precision Match</h4>
                  <div className="text-4xl font-black text-[#B45309]">86%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Strong Match</div>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                  <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Technical Fit</h4>
                  <div className="text-4xl font-black text-[#B45309]">82%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Technically Validated</div>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                  <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Cultural Fit</h4>
                  <div className="text-4xl font-black text-[#B45309]">78%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Positive Delivery Fit</div>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
                  <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Panel Fit</h4>
                  <div className="text-4xl font-black text-[#B45309]">80%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Panel Approved</div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-medium pt-2">
                Detailed report-level evidence is available in the interactive Delivery Readiness screen.
              </p>
            </section>

            {/* SECTION 7: SUBMISSION GUIDANCE */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Submission Guidance for Client Presentation</h2>
              
              <div className="space-y-5">
                <div>
                  <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-wider mb-3">Recommended positioning</h3>
                  <ul className="space-y-2 text-[14px] text-slate-700">
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
                </div>

                <div className="bg-blue-50 border-l-4 border-[#005AB5] p-5 rounded-r-xl">
                  <p className="text-[14px] text-[#002A54] font-bold leading-relaxed italic">
                    "Validated SAP TM functional candidate with strong delivery-fit signals across JD match, technical evaluation, and panel assessment, with no blocking risks and only moderate watch areas in advanced depth topics."
                  </p>
                </div>

                <div>
                  <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-wider mb-3">Final validation prompts</h3>
                  <ul className="space-y-2 text-[14px] text-slate-700">
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
            </section>

            {/* SECTION 8: FOOTER */}
            <div className="flex items-center justify-between pt-8 mt-auto border-t border-slate-200">
              <div className="space-y-1">
                <div className="text-sm font-black text-slate-900">DeepSAP Delivery Readiness Summary</div>
                <div className="text-[11px] text-slate-400 font-medium">Evidence-based readiness summary for client-facing decision support</div>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Page 2 / 2</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}