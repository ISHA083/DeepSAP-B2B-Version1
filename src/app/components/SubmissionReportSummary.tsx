import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, CheckCircle2, AlertTriangle, Copy, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface SubmissionReportSummaryProps {
  onBack: () => void;
  onSwitchToDetailed: () => void;
  onOpenPDFPreview: () => void;
  candidateName?: string;
}

export function SubmissionReportSummary({
  onBack,
  onSwitchToDetailed,
  onOpenPDFPreview,
  candidateName = 'Marcus Chen'
}: SubmissionReportSummaryProps) {
  const [activeSection, setActiveSection] = useState('verdict');

  const sections = [
    { id: 'verdict', label: 'Submission Verdict' },
    { id: 'clientfit', label: 'Client Fit Summary' },
    { id: 'jdalign', label: 'JD Alignment Snapshot' },
    { id: 'scenario', label: 'Scenario Readiness' },
    { id: 'risk', label: 'Submission Risk Check' },
    { id: 'positioning', label: 'Recommended Positioning' },
    { id: 'clientsummary', label: 'Client Summary' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopy = (text: string, label: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          toast.success(`${label} copied to clipboard`);
        }).catch(() => {
          // Fallback if clipboard API fails
          fallbackCopy(text, label);
        });
      } else {
        // Use fallback immediately if clipboard API not available
        fallbackCopy(text, label);
      }
    } catch (err) {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text: string, label: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success(`${label} copied to clipboard`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
    textArea.remove();
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
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
                <h1 className="text-xl font-bold text-slate-900 leading-none tracking-tight">
                  Submission Intelligence Report
                </h1>
                <p className="text-[11px] text-slate-500 font-medium mt-1.5 uppercase tracking-wide">
                  JD-aligned client submission dossier for {candidateName}
                </p>
              </div>
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
                onClick={onOpenPDFPreview}
                className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[13px] font-bold hover:bg-[#003A70] transition-all flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            Mode: Client-ready summary for submission and sharing
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-[1600px] mx-auto h-full grid grid-cols-[280px_1fr] gap-0">
          {/* Left Navigation */}
          <div className="border-r border-slate-200 bg-white overflow-y-auto px-6 py-8">
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-[#002A54] text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="bg-[#F8FAFC] overflow-y-auto px-8 py-10">
            <div className="space-y-8">
              {/* Section 1: Submission Verdict */}
              <div id="verdict" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Verdict</h2>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-xs font-bold">
                          Strong Submit
                        </Badge>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-xs font-bold">
                          High Confidence
                        </Badge>
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1 text-xs font-bold">
                          Medium-Low Risk
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-[#B7410E] leading-none">84%</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                        Submission Readiness
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Submission-safe
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Risk-checked
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Client-ready
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Copy-ready
                      </Badge>
                    </div>

                    <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                      This candidate is a strong submission for the current SAP TM functional requirement based on
                      direct JD alignment, validated delivery evidence, and scenario-level technical reasoning. The
                      profile is submission-ready for staffing use with clear strengths in TM functional scope,
                      integration-aware execution, and stakeholder-facing delivery behavior. Watch areas are identified
                      transparently and can be addressed with targeted validation if needed.
                    </p>

                    <p className="text-[11px] text-slate-400 italic font-medium mt-4">
                      Built for submission acceptance, not just evaluation confidence.
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">
                        <span className="font-bold text-slate-500">Provenance:</span> Derived from JD requirements +
                        profile evidence + technical validation + delivery readiness signals + submission risk checks
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Client Fit Summary */}
              <div id="clientfit" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Client Fit Summary</h2>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-600">Role-critical fit</span>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black px-2 py-0.5">
                          Strong
                        </Badge>
                      </div>
                      <p className="text-[12px] text-slate-600 font-medium">
                        TM functional scope and configuration ownership validated
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-600">Integration readiness</span>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black px-2 py-0.5">
                          Strong
                        </Badge>
                      </div>
                      <p className="text-[12px] text-slate-600 font-medium">
                        TM to EWM and adjacent integration triage capability evident
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-600">Lifecycle coverage</span>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black px-2 py-0.5">
                          Moderate
                        </Badge>
                      </div>
                      <p className="text-[12px] text-slate-600 font-medium">
                        Build strong, go-live and hypercare depth moderate
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-600">Client-facing readiness</span>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black px-2 py-0.5">
                          Strong
                        </Badge>
                      </div>
                      <p className="text-[12px] text-slate-600 font-medium">
                        Clear communication, ownership posture, stakeholder maturity
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-600">Submission risk level</span>
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[9px] font-black px-2 py-0.5">
                          Medium-Low
                        </Badge>
                      </div>
                      <p className="text-[12px] text-slate-600 font-medium">
                        Watch areas are known and manageable
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[12px] text-slate-600 font-medium">
                        Strong match to JD core scope and delivery expectations
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[12px] text-slate-600 font-medium">
                        Good signal quality across resume, technical validation, and readiness checks
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[12px] text-slate-600 font-medium">
                        Packaging-ready with clear strengths and transparent caveats
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                    <p className="text-[12px] text-[#002A54] font-bold">
                      Staffing confidence: Safe to present with structured positioning and risk-aware framing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: JD Alignment Snapshot */}
              <div id="jdalign" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">JD Alignment Snapshot</h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="pb-3 pr-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            JD Requirement
                          </th>
                          <th className="pb-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Match
                          </th>
                          <th className="pb-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Evidence Source
                          </th>
                          <th className="pb-3 pl-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Submission Framing
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-[12px]">
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-4 font-medium text-slate-700">
                            SAP TM functional configuration
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black">
                              Strong
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-slate-600">Resume + Technical validation</td>
                          <td className="py-4 pl-4 text-slate-600 font-medium">Lead with this</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-4 font-medium text-slate-700">S/4HANA exposure</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black">
                              Strong
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-slate-600">Resume + Validation</td>
                          <td className="py-4 pl-4 text-slate-600 font-medium">Include in top summary</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-4 font-medium text-slate-700">TM integration experience</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black">
                              Strong
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-slate-600">Technical validation + Resume</td>
                          <td className="py-4 pl-4 text-slate-600 font-medium">Highlight with examples</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-4 font-medium text-slate-700">
                            Go-live and hypercare ownership
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-slate-600">Resume + Panel/Tech</td>
                          <td className="py-4 pl-4 text-slate-600 font-medium">
                            Frame honestly and validate if needed
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-4 font-medium text-slate-700">Advanced optimization depth</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-slate-600">Technical validation</td>
                          <td className="py-4 pl-4 text-slate-600 font-medium">Do not over-position</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[12px] text-slate-600 font-medium">
                        Strong for role-critical TM delivery scope
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[12px] text-slate-600 font-medium">
                        Strong for integration-aware execution roles
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[12px] text-slate-600 font-medium">
                        Moderate for advanced optimization-heavy expectations
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Scenario Readiness */}
              <div id="scenario" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Scenario Readiness</h2>

                  <div className="flex items-center gap-8 mb-6">
                    <div>
                      <div className="text-4xl font-black text-[#B7410E] leading-none">84</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                        Scenario Score
                      </div>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-xs font-bold mb-2">
                        High
                      </Badge>
                      <p className="text-[12px] text-slate-600 font-medium">
                        Scenario Type: TM Go-Live + Integration-heavy Delivery
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Built from: Technical fit + lifecycle coverage + integration exposure + evidence consistency
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">Functional scenario handling</span>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black px-2 py-0.5">
                          Strong
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">Integration incident triage</span>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black px-2 py-0.5">
                          Strong
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">Cutover discipline</span>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black px-2 py-0.5">
                          Moderate
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">Hypercare stabilization</span>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black px-2 py-0.5">
                          Moderate
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                    <p className="text-[12px] text-[#002A54] font-bold">
                      Position this candidate for TM functional and integration-aware delivery roles. Validate
                      stabilization ownership if the client program is cutover-heavy or high-intensity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Submission Risk Check */}
              <div id="risk" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Submission Risk Check</h2>

                  <div className="p-5 bg-amber-50/40 rounded-xl border border-amber-100 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span className="text-sm font-bold text-slate-900">Risk Level: Medium-Low</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black px-2 py-0.5">
                          Client trust risk: Controlled
                        </Badge>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black px-2 py-0.5">
                          Proceed: Yes
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[12px] text-slate-600 font-medium">
                      Submission mode: Safe with transparent framing
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="pb-3 pr-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Risk
                          </th>
                          <th className="pb-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Severity
                          </th>
                          <th className="pb-3 pl-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Mitigation
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-[12px]">
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-4 font-medium text-slate-700">
                            Advanced optimization depth not deeply evidenced
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 pl-4 text-slate-600">
                            Position as core-fit strong, not optimization specialist
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-4 font-medium text-slate-700">
                            Go-live and hypercare depth moderate
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 pl-4 text-slate-600">
                            Add one clarification note or prompt
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-4 font-medium text-slate-700">
                            Middleware build ownership not proven (if required)
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black">
                              Conditional
                            </Badge>
                          </td>
                          <td className="py-4 pl-4 text-slate-600">
                            State troubleshooting exposure vs build ownership clearly
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                    <p className="text-[12px] text-[#002A54] font-bold">
                      Use transparent framing. Do not overstate advanced depth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6: Recommended Positioning */}
              <div id="positioning" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Recommended Positioning</h2>

                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                    <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                      This candidate is best positioned as a strong SAP TM functional delivery consultant with
                      validated integration-aware execution, reliable delivery behavior, and client-ready
                      communication. Best fit is for implementation and support environments where functional depth and
                      structured triage matter more than deep optimization specialization.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 bg-emerald-50/30 rounded-xl border border-emerald-100">
                      <h3 className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-4">Do say</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Validated against JD and delivery signals
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Strong core-fit with clear evidence
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Submission-safe with known watch areas
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 bg-rose-50/30 rounded-xl border border-rose-100">
                      <h3 className="text-xs font-black text-rose-700 uppercase tracking-widest mb-4">Do not say</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Deep optimization expert, unless validated
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            End-to-end middleware build owner, unless proven
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Go-live lead, unless directly evidenced
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7: Client Summary */}
              <div id="clientsummary" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Client Summary</h2>

                  <div className="space-y-6">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest">
                          Short Summary (Copy-ready)
                        </h3>
                        <button
                          onClick={() =>
                            handleCopy(
                              'Strong SAP TM functional submission aligned to JD core scope with validated delivery-fit across technical reasoning, integration-aware execution, and stakeholder readiness. Recommended for role-critical execution needs. Watch areas are clearly identified and manageable.',
                              'Short Summary'
                            )
                          }
                          className="text-[#005AB5] hover:text-[#003A70] transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                        Strong SAP TM functional submission aligned to JD core scope with validated delivery-fit across
                        technical reasoning, integration-aware execution, and stakeholder readiness. Recommended for
                        role-critical execution needs. Watch areas are clearly identified and manageable.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest">
                          Detailed Summary (Copy-ready)
                        </h3>
                        <button
                          onClick={() =>
                            handleCopy(
                              'This profile aligns well to the JD for SAP TM functional delivery and is supported by multi-source validation. Core strengths include TM functional capability, integration triage logic, and client-facing execution behavior. Moderate watch areas exist in advanced optimization depth and go-live stabilization ownership, which can be validated with targeted prompts if required by the client program.',
                              'Detailed Summary'
                            )
                          }
                          className="text-[#005AB5] hover:text-[#003A70] transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                        This profile aligns well to the JD for SAP TM functional delivery and is supported by
                        multi-source validation. Core strengths include TM functional capability, integration triage
                        logic, and client-facing execution behavior. Moderate watch areas exist in advanced optimization
                        depth and go-live stabilization ownership, which can be validated with targeted prompts if
                        required by the client program.
                      </p>
                    </div>

                    <div className="p-5 bg-blue-50/40 rounded-xl border border-blue-100">
                      <h3 className="text-xs font-black text-[#002A54] uppercase tracking-widest mb-3">
                        Suggested Validation Prompts
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#B7410E] font-black text-[11px] mt-0.5">1.</span>
                          <span className="text-[12px] text-slate-700 font-medium">
                            Walk through a TM go-live stabilization issue you handled and the controls you used
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B7410E] font-black text-[11px] mt-0.5">2.</span>
                          <span className="text-[12px] text-slate-700 font-medium">
                            Describe an integration incident between TM and EWM and your triage steps
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B7410E] font-black text-[11px] mt-0.5">3.</span>
                          <span className="text-[12px] text-slate-700 font-medium">
                            Share an optimization or performance tuning decision and the delivery impact
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        onClick={() =>
                          handleCopy(
                            'Strong SAP TM functional submission aligned to JD core scope with validated delivery-fit across technical reasoning, integration-aware execution, and stakeholder readiness. Recommended for role-critical execution needs. Watch areas are clearly identified and manageable.',
                            'Client Summary'
                          )
                        }
                        className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-[#003A70] transition-all flex items-center gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Client Summary
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            'This profile aligns well to the JD for SAP TM functional delivery and is supported by multi-source validation. Core strengths include TM functional capability, integration triage logic, and client-facing execution behavior. Moderate watch areas exist in advanced optimization depth and go-live stabilization ownership, which can be validated with targeted prompts if required by the client program.',
                            'Detailed Summary'
                          )
                        }
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Detailed Summary
                      </button>
                      <button
                        onClick={onOpenPDFPreview}
                        className="ml-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Export Submission Dossier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}