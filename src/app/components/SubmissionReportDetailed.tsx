import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, CheckCircle2, AlertTriangle, Copy, ExternalLink, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface SubmissionReportDetailedProps {
  onBack: () => void;
  onSwitchToSummary: () => void;
  onOpenPDFPreview: () => void;
  candidateName?: string;
}

export function SubmissionReportDetailed({
  onBack,
  onSwitchToSummary,
  onOpenPDFPreview,
  candidateName = 'Marcus Chen'
}: SubmissionReportDetailedProps) {
  const [activeSection, setActiveSection] = useState('verdict');

  const sections = [
    { id: 'verdict', label: 'Submission Verdict' },
    { id: 'clientfit', label: 'Client Fit Summary' },
    { id: 'jdmatrix', label: 'JD Alignment Matrix' },
    { id: 'evidence', label: 'Delivery Evidence Pack' },
    { id: 'scenario', label: 'Scenario Readiness' },
    { id: 'risk', label: 'Submission Risk Check' },
    { id: 'resumeemphasis', label: 'Resume Emphasis Strategy' },
    { id: 'positioning', label: 'Positioning and Pitch' },
    { id: 'objections', label: 'Client Objections and Responses' },
    { id: 'actions', label: 'Submission Notes and Actions' }
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
                onClick={onOpenPDFPreview}
                className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[13px] font-bold hover:bg-[#003A70] transition-all flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            Mode: Recruiter workspace with evidence, risk controls, and positioning guidance
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
              {/* Section 1: Submission Verdict (reuse from Summary with recruiter label) */}
              <div id="verdict" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-slate-900">Submission Verdict</h2>
                        <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-2 py-0.5 text-[9px] font-black">
                          Recruiter-only
                        </Badge>
                      </div>
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

              {/* Section 2: Client Fit Summary (expanded) */}
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

                  <div className="border-t border-slate-100 pt-6 space-y-2 mb-6">
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

                  <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100 mb-4">
                    <p className="text-[12px] text-[#002A54] font-bold">
                      Staffing confidence: Safe to present with structured positioning and risk-aware framing.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100">
                    <h3 className="text-xs font-black text-purple-700 uppercase tracking-widest mb-2">
                      Why submit now
                    </h3>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Submission-safe framing available
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">Risk checks complete</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Copy-ready client summary generated
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3: JD Alignment Matrix (expanded with validation need column) */}
              <div id="jdmatrix" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">JD Alignment Matrix</h2>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="pb-3 pr-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            JD Requirement
                          </th>
                          <th className="pb-3 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Match
                          </th>
                          <th className="pb-3 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Evidence Source
                          </th>
                          <th className="pb-3 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Submission Framing
                          </th>
                          <th className="pb-3 pl-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Validation Need
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-[12px]">
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-3 font-medium text-slate-700">
                            SAP TM functional configuration
                          </td>
                          <td className="py-4 px-3">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black">
                              Strong
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">Resume + Technical validation</td>
                          <td className="py-4 px-3 text-slate-600 font-medium">Lead with this</td>
                          <td className="py-4 pl-3 text-slate-600">None</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-3 font-medium text-slate-700">S/4HANA exposure</td>
                          <td className="py-4 px-3">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black">
                              Strong
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">Resume + Validation</td>
                          <td className="py-4 px-3 text-slate-600 font-medium">Include in top summary</td>
                          <td className="py-4 pl-3 text-slate-600">None</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-3 font-medium text-slate-700">TM integration experience</td>
                          <td className="py-4 px-3">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-black">
                              Strong
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">Technical validation + Resume</td>
                          <td className="py-4 px-3 text-slate-600 font-medium">Highlight with examples</td>
                          <td className="py-4 pl-3 text-slate-600">Optional</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-3 font-medium text-slate-700">
                            Go-live and hypercare ownership
                          </td>
                          <td className="py-4 px-3">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">Resume + Panel/Tech</td>
                          <td className="py-4 px-3 text-slate-600 font-medium">
                            Frame honestly and validate if needed
                          </td>
                          <td className="py-4 pl-3 text-slate-600">Recommended if client asks</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 font-medium text-slate-700">Advanced optimization depth</td>
                          <td className="py-4 px-3">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">Technical validation</td>
                          <td className="py-4 px-3 text-slate-600 font-medium">Do not over-position</td>
                          <td className="py-4 pl-3 text-slate-600">Required if CPI build is must-have</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3">
                      Best client framing for this JD
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Strong for role-critical TM delivery scope
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Strong for integration-aware execution roles
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Suitable for stakeholder-facing delivery contexts
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Moderate for advanced optimization-heavy expectations
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4: Delivery Evidence Pack */}
              <div id="evidence" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Delivery Evidence Pack</h2>

                  <div className="space-y-6">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-4">
                        Evidence by source
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                            Resume evidence:
                          </p>
                          <ul className="space-y-1.5 ml-4">
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Relevant TM project history and role scope
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Module and integration references aligned to JD
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Delivery phase references available
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                            Technical validation evidence:
                          </p>
                          <ul className="space-y-1.5 ml-4">
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Scenario-level reasoning confirms practical TM capability
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Integration troubleshooting logic is clear and repeatable
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Responses show execution thinking, not generic theory
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                            Delivery readiness signals:
                          </p>
                          <ul className="space-y-1.5 ml-4">
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Confidence and risk posture already calibrated
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Watch areas identified with mitigation guidance
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Cross-source consistency supports credibility
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Evidence-backed
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Cross-source consistent
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Submission-safe
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1">
                        Client-ready narrative available
                      </Badge>
                    </div>

                    <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                      <p className="text-[12px] text-[#002A54] font-bold">
                        This profile is supported by multi-source delivery evidence and submission-safe framing, which
                        helps reduce end-client rejection risk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Scenario Readiness (reuse from Summary with additional notes) */}
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

                  <div className="grid grid-cols-2 gap-4 mb-6">
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

                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3">
                      Scenario fit notes
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Functional scenario handling validated strongly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Integration incident triage is a key strength
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] text-slate-700 font-medium">
                          Cutover and hypercare depth are watch areas for high-intensity programs
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 6: Submission Risk Check (expanded) */}
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

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="pb-3 pr-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Risk
                          </th>
                          <th className="pb-3 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Severity
                          </th>
                          <th className="pb-3 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            End-client impact
                          </th>
                          <th className="pb-3 pl-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Mitigation before submission
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-[12px]">
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-3 font-medium text-slate-700">
                            Advanced optimization depth not deeply evidenced
                          </td>
                          <td className="py-4 px-3">
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">May be questioned in final technical round</td>
                          <td className="py-4 pl-3 text-slate-600">
                            Position as core-fit strong, not optimization specialist
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-4 pr-3 font-medium text-slate-700">
                            Go-live and hypercare depth moderate
                          </td>
                          <td className="py-4 px-3">
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[9px] font-black">
                              Moderate
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">Client may probe stabilization ownership</td>
                          <td className="py-4 pl-3 text-slate-600">Add one clarification note or prompt</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 font-medium text-slate-700">
                            Middleware build ownership not proven
                          </td>
                          <td className="py-4 px-3">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] font-black">
                              Conditional
                            </Badge>
                          </td>
                          <td className="py-4 px-3 text-slate-600">Risk only if CPI build is must-have</td>
                          <td className="py-4 pl-3 text-slate-600">
                            State troubleshooting exposure vs build ownership clearly
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-100">
                    <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2">
                      Staffing protection guidance
                    </h3>
                    <p className="text-[12px] text-slate-700 font-bold">
                      Do not overstate advanced depth. This report is strongest when used to submit confidently with
                      clear strengths and transparent watch areas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue with remaining sections... Due to length, I'll create the remaining sections in the component */}
              {/* Section 7: Resume Emphasis Strategy */}
              <div id="resumeemphasis" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Resume Emphasis Strategy</h2>

                  <div className="space-y-6">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-4">
                        Client-optimized emphasis map
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[11px] font-black text-emerald-600 uppercase tracking-wider mb-2">
                            Highlight first:
                          </p>
                          <ol className="space-y-1.5 ml-4">
                            <li className="text-[12px] text-slate-700 font-medium">
                              1. SAP TM functional configuration and role-critical ownership
                            </li>
                            <li className="text-[12px] text-slate-700 font-medium">
                              2. Integration handling and troubleshooting depth
                            </li>
                            <li className="text-[12px] text-slate-700 font-medium">
                              3. Delivery readiness and validated scenario reasoning
                            </li>
                            <li className="text-[12px] text-slate-700 font-medium">
                              4. Stakeholder communication and execution discipline
                            </li>
                          </ol>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-blue-600 uppercase tracking-wider mb-2">
                            Keep visible but secondary:
                          </p>
                          <ul className="space-y-1.5 ml-4">
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Go-live and hypercare involvement
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">
                              • Advanced optimization contributions
                            </li>
                            <li className="text-[12px] text-slate-600 font-medium">• Adjacent module references</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                            De-emphasize unless asked:
                          </p>
                          <ul className="space-y-1.5 ml-4">
                            <li className="text-[12px] text-slate-500 font-medium">• Generic tools</li>
                            <li className="text-[12px] text-slate-500 font-medium">
                              • Broad non-relevant module references
                            </li>
                            <li className="text-[12px] text-slate-500 font-medium">
                              • Resume blocks not tied to current JD priorities
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-blue-50/40 rounded-xl border border-blue-100">
                      <h3 className="text-xs font-black text-[#002A54] uppercase tracking-widest mb-3">
                        End-client summary bullets (copy-ready)
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#005AB5] shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Strong SAP TM functional consultant aligned to JD core delivery scope
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#005AB5] shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Validated practical capability in integration-aware execution scenarios
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#005AB5] shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Suitable for stakeholder-facing delivery environments
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#005AB5] shrink-0 mt-0.5" />
                          <span className="text-[12px] text-slate-700 font-medium">
                            Transparent watch areas identified for advanced optimization and stabilization depth
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 8: Positioning and Pitch */}
              <div id="positioning" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Positioning and Pitch</h2>

                  <div className="space-y-6">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3">
                        Recommended positioning statement
                      </h3>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                        This candidate is best positioned as a strong SAP TM functional delivery consultant with
                        validated integration-aware execution, reliable delivery behavior, and client-ready
                        communication. Best fit is for implementation and support environments where functional depth
                        and structured triage matter more than deep optimization specialization.
                      </p>
                    </div>

                    <div className="p-5 bg-blue-50/40 rounded-xl border border-blue-100">
                      <h3 className="text-xs font-black text-[#002A54] uppercase tracking-widest mb-4">
                        Pitch variants by client type
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[11px] font-black text-slate-600 mb-1">SI / Implementation Partner:</p>
                          <p className="text-[12px] text-slate-700 font-medium">
                            Lead with TM functional delivery depth, integration troubleshooting, execution readiness
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-600 mb-1">End Client Program Team:</p>
                          <p className="text-[12px] text-slate-700 font-medium">
                            Lead with stakeholder-ready delivery behavior, role-critical TM fit, predictable execution
                            confidence
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-600 mb-1">GCC / Internal Delivery Team:</p>
                          <p className="text-[12px] text-slate-700 font-medium">
                            Lead with operational reliability, integration awareness, and manageable watch areas
                          </p>
                        </div>
                      </div>
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
                        <h3 className="text-xs font-black text-rose-700 uppercase tracking-widest mb-4">
                          Do not say
                        </h3>
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
              </div>

              {/* Section 9: Client Objections and Responses */}
              <div id="objections" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Client Objections and Responses</h2>

                  <div className="space-y-4">
                    <div className="p-5 bg-amber-50/30 rounded-xl border border-amber-100">
                      <h3 className="text-sm font-bold text-slate-900 mb-2">
                        "Do they have strong go-live ownership?"
                      </h3>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed">
                        Go-live and hypercare depth is moderate. Core fit and integration readiness are strong.
                        Recommend one focused validation on stabilization controls if the program is go-live intensive.
                      </p>
                    </div>

                    <div className="p-5 bg-amber-50/30 rounded-xl border border-amber-100">
                      <h3 className="text-sm font-bold text-slate-900 mb-2">
                        "Do they have deep optimization experience?"
                      </h3>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed">
                        Core TM functional and scenario reasoning are strong. Advanced optimization is a watch area and
                        should be positioned transparently unless validated further.
                      </p>
                    </div>

                    <div className="p-5 bg-amber-50/30 rounded-xl border border-amber-100">
                      <h3 className="text-sm font-bold text-slate-900 mb-2">
                        "How confident are you this profile is not overstated?"
                      </h3>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed">
                        This submission is supported by multi-source evidence, including technical validation and
                        delivery readiness signals, not resume claims alone.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                    <p className="text-[11px] text-[#002A54] font-bold italic">
                      Keep responses evidence-led and role-specific. Avoid generic superlatives.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 10: Submission Notes and Actions */}
              <div id="actions" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Submission Notes and Actions</h2>

                  <div className="space-y-6">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest">
                          Client submission summary (short)
                        </h3>
                        <button
                          onClick={() =>
                            handleCopy(
                              'Strong SAP TM functional submission aligned to JD core scope with validated delivery-fit across technical reasoning, integration-aware execution, and stakeholder readiness. Recommended for role-critical execution needs. Watch areas are clearly identified and manageable.',
                              'Client Summary'
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
                          Client submission summary (detailed)
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

                    <div className="p-5 bg-purple-50/40 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black text-purple-700 uppercase tracking-widest">
                          Internal recruiter note (copy-ready)
                        </h3>
                        <button
                          onClick={() =>
                            handleCopy(
                              'Position as core-fit strong. Lead with TM functional delivery and integration evidence. Be transparent on advanced depth. Use one clarification prompt if client asks about go-live stabilization ownership.',
                              'Recruiter Note'
                            )
                          }
                          className="text-[#005AB5] hover:text-[#003A70] transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                        Position as core-fit strong. Lead with TM functional delivery and integration evidence. Be
                        transparent on advanced depth. Use one clarification prompt if client asks about go-live
                        stabilization ownership.
                      </p>
                    </div>

                    <div className="p-5 bg-blue-50/40 rounded-xl border border-blue-100">
                      <h3 className="text-xs font-black text-[#002A54] uppercase tracking-widest mb-3">
                        Suggested validation prompts
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
                        onClick={onOpenPDFPreview}
                        className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-[#003A70] transition-all flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5" /> Export Submission Dossier
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            'Strong SAP TM functional submission aligned to JD core scope with validated delivery-fit across technical reasoning, integration-aware execution, and stakeholder readiness. Recommended for role-critical execution needs. Watch areas are clearly identified and manageable.',
                            'Client Summary'
                          )
                        }
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Client Summary
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            'Position as core-fit strong. Lead with TM functional delivery and integration evidence. Be transparent on advanced depth. Use one clarification prompt if client asks about go-live stabilization ownership.',
                            'Recruiter Note'
                          )
                        }
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Recruiter Note
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
