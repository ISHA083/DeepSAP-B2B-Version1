import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface ResumeMDProjectDetailsProps {
  onBack: () => void;
}

export function ResumeMDProjectDetails({ onBack }: ResumeMDProjectDetailsProps) {
  const [selectedProject, setSelectedProject] = useState('project1');

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
            Back to Summary
          </button>
          <h1 className="text-lg font-bold text-slate-900">Resume MD Dashboard (Project Details)</h1>
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

      {/* Compact Candidate Header */}
      <div className="px-7 py-3 bg-white border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Nagi Reddy</h2>
            <p className="text-xs text-slate-600">Sr. S/4 HANA DRC Consultant | 17+ years</p>
          </div>
          <div className="flex gap-2">
            {['12 yrs S/4 HANA & ECC', 'DRC / e-Invoicing'].map(chip => (
              <div key={chip} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-700">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel (Project Selector) */}
          <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto shrink-0">
            <div className="p-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Projects</p>
              {[
                { id: 'project1', name: 'Project 1' },
                { id: 'project2', name: 'Project 2' },
                { id: 'project3', name: 'Project 3' },
                { id: 'project4', name: 'Project 4' }
              ].map(project => (
                <button
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project.id);
                    document.getElementById(project.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedProject === project.id 
                      ? 'bg-[#002A54] text-white' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel (Project Cards) */}
          <div className="flex-1 overflow-y-auto p-7 space-y-6">
            
            {/* PROJECT 1 */}
            <div id="project1" className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">S/4HANA Finance Transformation - Brazil</h3>
                <p className="text-sm text-slate-500 mt-1">Project ID: P2021-BR-FINTR</p>
              </div>

              {/* KPI Tiles */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#002A54]">18 mo</div>
                  <div className="text-xs text-slate-600 mt-1">Duration</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#002A54]">Lead</div>
                  <div className="text-xs text-slate-600 mt-1">Role</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#002A54]">S/4 1809</div>
                  <div className="text-xs text-slate-600 mt-1">System</div>
                </div>
              </div>

              {/* Overview & Engagement Context */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Overview & Engagement Context</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { label: 'Client', value: 'Large Manufacturing (Confidential)' },
                        { label: 'Geography', value: 'Brazil' },
                        { label: 'Project Type', value: 'Greenfield S/4HANA' },
                        { label: 'Team Size', value: '12 members' },
                        { label: 'Role', value: 'DRC/EDOC Lead Consultant' }
                      ].map(row => (
                        <tr key={row.label}>
                          <td className="py-2 font-medium text-slate-600 w-1/3">{row.label}</td>
                          <td className="py-2 text-slate-900">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Business Processes Experience */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Business Processes Experience</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-xs font-bold text-slate-600">Process</th>
                        <th className="text-left py-2 text-xs font-bold text-slate-600">Scope</th>
                        <th className="text-center py-2 text-xs font-bold text-slate-600">Evidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { process: 'Brazil NFe (EDOC)', scope: 'Full implementation' },
                        { process: 'Tax Localization', scope: 'Configuration & testing' },
                        { process: 'AP Closing', scope: 'Process design' }
                      ].map(row => (
                        <tr key={row.process}>
                          <td className="py-3 font-medium text-slate-900">{row.process}</td>
                          <td className="py-3 text-slate-700">{row.scope}</td>
                          <td className="py-3 text-center">
                            <button className="text-xs font-bold text-[#005AB5] hover:underline">View evidence</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Integration Experience */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Integration Experience</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-xs font-bold text-slate-600">Integration</th>
                        <th className="text-left py-2 text-xs font-bold text-slate-600">Technology</th>
                        <th className="text-left py-2 text-xs font-bold text-slate-600">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { integration: 'SEFAZ (Tax Authority)', tech: 'REST/XML', role: 'Design & implementation' },
                        { integration: 'Bank EBS', tech: 'EDI', role: 'Configuration' }
                      ].map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-3 font-medium text-slate-900">{row.integration}</td>
                          <td className="py-3 text-slate-700">{row.tech}</td>
                          <td className="py-3 text-slate-700">{row.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Module Specific Experience */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Module Specific Experience</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { phase: 'Requirements', confidence: 'High' },
                    { phase: 'Design', confidence: 'High' },
                    { phase: 'Build', confidence: 'Medium' },
                    { phase: 'Testing', confidence: 'High' }
                  ].map(item => (
                    <div key={item.phase} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">{item.phase}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          item.confidence === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.confidence}
                        </span>
                      </div>
                      <button className="text-xs font-bold text-[#005AB5] hover:underline mt-2">View evidence</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Tools & Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {['EDOC Cockpit', 'SAP CFIN', 'SAP ILM', 'Solution Manager', 'JIRA'].map(tool => (
                    <div key={tool} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-700">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PROJECT 2, 3, 4 - Similar structure (placeholders) */}
            {['project2', 'project3', 'project4'].map((projId, idx) => (
              <div key={projId} id={projId} className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900">Project {idx + 2}</h3>
                <p className="text-sm text-slate-500 mt-2">Project details placeholder. Similar structure to Project 1.</p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
