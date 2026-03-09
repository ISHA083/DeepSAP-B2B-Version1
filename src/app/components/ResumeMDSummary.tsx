import React, { useState } from 'react';
import { ArrowLeft, X, Check } from 'lucide-react';

interface ResumeMDSummaryProps {
  onBack: () => void;
  onOpenProjectDetails: () => void;
}

export function ResumeMDSummary({ onBack, onOpenProjectDetails }: ResumeMDSummaryProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);
  const [expandedSkillMap, setExpandedSkillMap] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Top Bar */}
      <div className="px-7 py-4 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Ranked Results
          </button>
          <h1 className="text-lg font-bold text-slate-900">Resume MD Dashboard (Summary)</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
              Export
            </button>
            <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-xs font-bold hover:bg-[#E55A2B] transition-all">
              Request Interview
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Header */}
      <div className="px-7 py-5 bg-white border-b border-slate-100 shrink-0">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Nagi Reddy</h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">Sr. S/4 HANA DRC Consultant | 17+ years</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Bengaluru</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Availability: 30 days</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['12 yrs S/4 HANA & ECC', 'DRC / e-Invoicing', 'Tax Localization', 'CFIN', 'Group Reporting', 'Finance Closing'].map(chip => (
                <div key={chip} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                  {chip}
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={onOpenProjectDetails}
            className="px-4 py-2.5 bg-[#002A54] text-white rounded-lg text-xs font-bold hover:bg-[#003A70] transition-all whitespace-nowrap shrink-0"
          >
            Open Project Details
          </button>
        </div>
      </div>

      {/* Body Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel (Sticky) */}
          <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto shrink-0">
            <div className="p-4 space-y-4">
              {/* Navigation List */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Sections</p>
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'credibility', label: 'Credibility & Risk' },
                  { id: 'consistency', label: 'Experience Consistency' },
                  { id: 'skill-map', label: 'Skill Evidence Map' },
                  { id: 'strengths', label: 'Strengths & Value Proposition' },
                  { id: 'outcomes', label: 'Proven Project Outcomes' },
                  { id: 'module', label: 'Module Summary' },
                  { id: 'integration', label: 'Integration Experience' },
                  { id: 'phase', label: 'Project Phase' },
                  { id: 'development', label: 'Development Deliverables & Artifacts' },
                  { id: 'business', label: 'Business Process Expertise' },
                  { id: 'interview', label: 'Interview Focus' },
                  { id: 'artefacts', label: 'Artefact Requests' }
                ].map(section => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
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
          </div>

          {/* Right Panel (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-7 space-y-6">
            
            {/* CARD 1: OVERVIEW */}
            <div id="overview" className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">Overview</h3>
              
              {/* Metrics */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Total Years', value: '17+' },
                  { label: 'S/4 HANA years', value: '12' },
                  { label: 'DRC / e-Invoicing', value: '6+' },
                  { label: 'Global localization footprint', value: '✓' }
                ].map(metric => (
                  <div key={metric.label} className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#002A54]">{metric.value}</div>
                    <div className="text-xs text-slate-600 mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed">
                  S/4 HANA & ECC DRC / e-Invoicing, tax localization (India GST, Brazil, Mexico, Poland, Italy, France), CFIN & Group Reporting, data assessment and cleansing, and Advanced Finance Closing (AP-centric). Experience spans large rollouts, upgrades (S/4 1809, 2023), archive projects, FSCM collections and production support across multiple geographies.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-xs font-bold text-[#002A54] mb-2">ENGAGEMENT FIT SUMMARY</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Best suited for client engagements that require a senior finance transformation lead focused on compliance, tax automation and finance close optimization. Ideal for projects needing a blend of hands-on configuration, data-cleansing governance and regulatory submission expertise.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: CREDIBILITY & RISK */}
            <div id="credibility" className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">Credibility & Risk</h3>
              
              {/* Score tiles */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-700">78</div>
                  <div className="text-xs text-emerald-700 font-medium mt-1">Credibility Score</div>
                  <div className="text-[10px] text-slate-500 mt-1">0–100</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">82</div>
                  <div className="text-xs text-blue-700 font-medium mt-1">Consistency Score</div>
                  <div className="text-[10px] text-slate-500 mt-1">0–100</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-orange-700">Medium</div>
                  <div className="text-xs text-orange-700 font-medium mt-1">Delivery Risk</div>
                </div>
              </div>

              {/* Top Risks */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Top Risks Detected</p>
                <div className="space-y-2">
                  {[
                    { severity: 'High', text: 'Timeline overlap detected' },
                    { severity: 'Medium', text: 'Claimed S/4HANA years not fully supported by project timeline' },
                    { severity: 'Medium', text: 'DRC / EDOC claim appears in limited engagements' },
                    { severity: 'Low', text: 'Ownership scope unclear in key projects' },
                    { severity: 'Low', text: 'Handover evidence missing at exit points' }
                  ].map((risk, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          risk.severity === 'High' ? 'bg-red-100 text-red-700' :
                          risk.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-slate-200 text-slate-600'
                        }`}>
                          {risk.severity}
                        </span>
                        <span className="text-sm text-slate-700">{risk.text}</span>
                      </div>
                      <button 
                        onClick={() => setShowEvidenceDrawer(true)}
                        className="text-xs font-bold text-[#005AB5] hover:underline"
                      >
                        View evidence
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Strength */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Evidence Strength</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                    <div className="text-xl font-bold text-emerald-700">68%</div>
                    <div className="text-xs text-emerald-700 mt-1">Strongly evidenced</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                    <div className="text-xl font-bold text-orange-700">24%</div>
                    <div className="text-xs text-orange-700 mt-1">Partially evidenced</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                    <div className="text-xl font-bold text-slate-700">8%</div>
                    <div className="text-xs text-slate-600 mt-1">Needs verification</div>
                  </div>
                </div>
              </div>

              {/* Verification Pack */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-bold text-slate-900 mb-3">VERIFICATION PACK ACTIONS</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs font-medium hover:bg-slate-50">
                    Request artefacts
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs font-medium hover:bg-slate-50">
                    Request 60–75 min technical screen
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs font-medium hover:bg-slate-50">
                    Request project walkthrough
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3: EXPERIENCE CONSISTENCY */}
            <div id="consistency" className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Experience Consistency</h3>
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">
                  Consistent
                </span>
              </div>

              {/* Claimed vs Computed */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Area</th>
                      <th className="text-center py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Claimed</th>
                      <th className="text-center py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Computed</th>
                      <th className="text-center py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Delta</th>
                      <th className="text-center py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { area: 'Total Experience', claimed: '17+', computed: '16.8', delta: '-0.2', status: 'Match' },
                      { area: 'S/4HANA Experience', claimed: '12', computed: '11.2', delta: '-0.8', status: 'Close' },
                      { area: 'DRC / e-Invoicing', claimed: '6+', computed: '5.4', delta: '-0.6', status: 'Close' }
                    ].map(row => (
                      <tr key={row.area}>
                        <td className="py-3 font-medium text-slate-900">{row.area}</td>
                        <td className="py-3 text-center text-slate-700">{row.claimed}</td>
                        <td className="py-3 text-center text-slate-700">{row.computed}</td>
                        <td className="py-3 text-center text-slate-600">{row.delta}</td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            row.status === 'Match' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Timeline conflicts */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-bold text-slate-900 mb-3">TIMELINE CONFLICTS</p>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-orange-600">2.3</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Overlap months</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-600">0.8</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Gap months</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-600">1.2</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Unattributed period</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">3</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Conditional flags</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: SKILL EVIDENCE MAP */}
            <div id="skill-map" className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">Skill Evidence Map</h3>

              {/* Substantiation chips */}
              <div className="flex gap-3">
                <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-700">
                  Substantiated (3+ projects)
                </div>
                <div className="px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-medium text-orange-700">
                  Partially substantiated (1–2 projects)
                </div>
                <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                  Unsubstantiated (0 projects)
                </div>
              </div>

              <button 
                onClick={() => setExpandedSkillMap(!expandedSkillMap)}
                className="text-xs font-bold text-[#005AB5] hover:underline"
              >
                {expandedSkillMap ? 'Hide' : 'View'} evidence map
              </button>

              {expandedSkillMap && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-bold text-slate-600">Skill</th>
                        <th className="text-center py-2 font-bold text-slate-600">Project 1</th>
                        <th className="text-center py-2 font-bold text-slate-600">Project 2</th>
                        <th className="text-center py-2 font-bold text-slate-600">Project 3</th>
                        <th className="text-center py-2 font-bold text-slate-600">Project 4</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        'DRC / EDOC',
                        'Tax Localization',
                        'CFIN',
                        'Group Reporting',
                        'Archive & Migration',
                        'Data Assessment & Cleansing',
                        'FSCM Collections',
                        'Payments & EDI/ACH'
                      ].map(skill => (
                        <tr key={skill}>
                          <td className="py-2 font-medium text-slate-900">{skill}</td>
                          {[1, 2, 3, 4].map(proj => {
                            const status = Math.random() > 0.3 ? 'linked' : Math.random() > 0.5 ? 'mentioned' : 'not-found';
                            return (
                              <td key={proj} className="py-2 text-center">
                                <span className={`inline-block w-3 h-3 rounded-full ${
                                  status === 'linked' ? 'bg-emerald-500' :
                                  status === 'mentioned' ? 'bg-orange-400' :
                                  'bg-slate-200'
                                }`} />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* CARD 5: STRENGTHS & VALUE PROPOSITION */}
            <div id="strengths" className="bg-white rounded-lg border border-slate-200 p-6 space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Strengths & Value Proposition</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Deep domain expertise in SAP FICO combined with compliance-focused DRC/e-Invoicing delivery across multiple tax jurisdictions.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Proven ability to lead S/4 HANA finance transformations including archive, migration and CFIN readiness reduces run-time risk and ensures regulatory compliance.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Strong data assessment and cleansing experience delivers migration-ready datasets and minimizes cutover defects.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Practical experience with EDOC cockpit implementations and regulatory exports (FEC, DART, SAF-T), ensuring successful tax authority submissions.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  Experience driving measurable improvements in production support, demonstrating operational ownership.
                </li>
              </ul>
            </div>

            {/* CARD 6: PROVEN PROJECT OUTCOMES */}
            <div id="outcomes" className="bg-white rounded-lg border border-slate-200 p-6 space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Proven Project Outcomes</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Successfully delivered S/4 1809 and 2023 upgrades with archive planning and cutover governance.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Implemented DRC/e-Invoicing across 6+ countries including Brazil, Mexico, Poland, Italy, France, achieving 100% regulatory submission compliance.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Led data assessment and cleansing reducing migration defects by ~40% in large-scale finance transformation.
                </li>
              </ul>
            </div>

            {/* CARD 7: MODULE SUMMARY */}
            <div id="module" className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Module Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-xs font-bold text-slate-600">Module</th>
                      <th className="text-left py-2 text-xs font-bold text-slate-600">Expertise Level</th>
                      <th className="text-left py-2 text-xs font-bold text-slate-600">Role Type</th>
                      <th className="text-left py-2 text-xs font-bold text-slate-600">System Types</th>
                      <th className="text-center py-2 text-xs font-bold text-slate-600">Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { module: 'SAP TM', level: 'Expert', role: 'Functional', systems: 'S/4HANA, ECC' },
                      { module: 'SAP SD', level: 'View Insights', role: 'Functional', systems: 'S/4HANA' },
                      { module: 'SAP EWM', level: 'Advanced', role: 'Technical', systems: 'S/4HANA, ECC' }
                    ].map(row => (
                      <tr key={row.module}>
                        <td className="py-3 font-medium text-slate-900">{row.module}</td>
                        <td className="py-3 text-slate-700">{row.level}</td>
                        <td className="py-3 text-slate-700">{row.role}</td>
                        <td className="py-3 text-slate-700">{row.systems}</td>
                        <td className="py-3 text-center">
                          <button className="text-xs font-bold text-[#005AB5] hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CARD 8: INTEGRATION EXPERIENCE */}
            <div id="integration" className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Integration Experience</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-xs font-bold text-slate-600">System Integration</th>
                      <th className="text-left py-2 text-xs font-bold text-slate-600">Direction</th>
                      <th className="text-left py-2 text-xs font-bold text-slate-600">Technology</th>
                      <th className="text-left py-2 text-xs font-bold text-slate-600">Notes</th>
                      <th className="text-center py-2 text-xs font-bold text-slate-600">Projects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { sys: 'Bank EBS', dir: 'Bidirectional', tech: 'EDI/ACH', notes: 'Payment integration', projects: '3' },
                      { sys: 'EDOC Platform', dir: 'Outbound', tech: 'REST/XML', notes: 'Tax submission', projects: '4' },
                      { sys: 'Archive System', dir: 'Outbound', tech: 'ILM', notes: 'Data archival', projects: '2' }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-medium text-slate-900">{row.sys}</td>
                        <td className="py-3 text-slate-700">{row.dir}</td>
                        <td className="py-3 text-slate-700">{row.tech}</td>
                        <td className="py-3 text-slate-700">{row.notes}</td>
                        <td className="py-3 text-center text-slate-700">{row.projects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-xs font-bold text-[#002A54] mb-1">RECOMMENDED CLIENT FOCUS</p>
                <p className="text-xs text-slate-700">
                  EDOC payload mapping, ACH/EDI file layout & reconciliation approach, bank EBS/house bank configuration examples.
                </p>
              </div>
            </div>

            {/* CARD 9: PROJECT PHASE */}
            <div id="phase" className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Project Phase</h3>
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-900">Project Phase Activity Expertise</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {['Requirements gathering', 'Fit-gap analysis', 'Stakeholder workshops', 'Stakeholder sign-off'].map(phase => (
                    <div key={phase} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-slate-700">{phase}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <p className="text-sm font-bold text-slate-900">Module Experience by Phase</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-xs font-bold text-slate-600">Module</th>
                        <th className="text-center py-2 text-xs font-bold text-slate-600">Total Years</th>
                        <th className="text-center py-2 text-xs font-bold text-slate-600">Projects</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { module: 'SAP TM', years: '17 yrs', projects: '10+' },
                        { module: 'SAP SD', years: '4 yrs', projects: '5+' },
                        { module: 'SAP EWM', years: '6 yrs', projects: '4+' }
                      ].map(row => (
                        <tr key={row.module}>
                          <td className="py-3 font-medium text-slate-900">{row.module}</td>
                          <td className="py-3 text-center text-slate-700">{row.years}</td>
                          <td className="py-3 text-center text-slate-700">{row.projects}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* CARD 10: DEVELOPMENT DELIVERABLES & ARTIFACTS */}
            <div id="development" className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Development Deliverables & Artifacts</h3>
              <div className="flex gap-2 border-b border-slate-200">
                {['Workflows', 'Reports', 'Interfaces', 'Conversions', 'Enhancements', 'Forms'].map(tab => (
                  <button key={tab} className="px-3 py-2 text-xs font-medium text-slate-600 border-b-2 border-transparent hover:text-[#002A54] hover:border-[#002A54]">
                    {tab}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  'Data assessment & profiling',
                  'Tax & localization scanning',
                  'Workshops & user story capture'
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 11: BUSINESS PROCESS EXPERTISE */}
            <div id="business" className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Business Process Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['Advance Finance Closing', 'Tax Compliance & DRC', 'Group Reporting & CFIN'].map(chip => (
                  <div key={chip} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700">
                    {chip}
                  </div>
                ))}
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-slate-400">•</span>
                  AP-centric closing automation with EDOC reconciliation
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-400">•</span>
                  Multi-country tax compliance (GST, SAF-T, FEC, DART)
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-400">•</span>
                  CFIN mapping and I2R configuration for group reporting
                </li>
              </ul>
            </div>

            {/* CARD 12: INTERVIEW FOCUS */}
            <div id="interview" className="bg-white rounded-lg border border-slate-200 p-6 space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Interview Focus</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  60–75 minute deep technical call: EDOC payload mapping (choose one country Mexico or Brazil), sample rejection handling, and reconciliation approach.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  CFIN mapping discussion: request a 30-minute walkthrough of one I2R mapping example from the candidate.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  Archive & cutover: ask the candidate to describe the archive objects they handled and provide validation / reconciliation evidence.
                </li>
              </ul>
            </div>

            {/* CARD 13: ARTEFACT REQUESTS */}
            <div id="artefacts" className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Artefact Requests</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-[#002A54] font-bold">•</span>
                  Data assessment scorecard sample showing key data quality areas and remediation plan.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#002A54] font-bold">•</span>
                  EDOC mapping sheet for one country (Mexico or Brazil) with field-level notes and rejection examples.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#002A54] font-bold">•</span>
                  Archive plan or cutover runbook or a sample deliverable from prior projects.
                </li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm font-medium text-[#002A54]">
                  Prioritise Nagi for senior delivery-lead contracts requiring combined finance domain knowledge, DRC/e-Invoicing ownership and hands-on S/4 migration/archive experience.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Evidence Drawer (Placeholder overlay) */}
      {showEvidenceDrawer && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-end" onClick={() => setShowEvidenceDrawer(false)}>
          <div className="bg-white w-[500px] h-full shadow-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Evidence</h3>
              <button onClick={() => setShowEvidenceDrawer(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border-b border-slate-200 mb-4">
              <div className="flex gap-4">
                {['Snippets', 'Artefacts', 'Notes'].map(tab => (
                  <button key={tab} className="px-3 py-2 text-sm font-medium text-slate-600 border-b-2 border-transparent hover:text-[#002A54] hover:border-[#002A54]">
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Placeholder: Evidence snippets and links would appear here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}