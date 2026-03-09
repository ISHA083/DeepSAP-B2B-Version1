import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  Download, 
  Share2, 
  Bookmark,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  Award,
  FileText,
  Star
} from 'lucide-react';
import { Badge } from './ui/badge';

interface CandidateDossierProps {
  candidateId: string | null;
  onBack: () => void;
}

export function CandidateDossier({ candidateId, onBack }: CandidateDossierProps) {
  // Mock detailed data
  const candidate = {
    name: 'Marcus Chen',
    title: 'Lead SAP EWM Consultant',
    location: 'Munich, Germany',
    experience: '12 Years',
    rate: '€1,250/day',
    availability: 'Available April 2026',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80',
    summary: 'Seasoned SAP Logistics Architect specializing in complex S/4HANA EWM implementations. Proven track record in leading global templates and greenfield rollouts for Tier-1 automotive and manufacturing clients.',
    readinessScore: 96,
    trustIndex: 'Elite',
    modules: [
      { name: 'SAP EWM', level: 'Expert', years: 10 },
      { name: 'SAP TM', level: 'Advanced', years: 4 },
      { name: 'SAP WM', level: 'Expert', years: 12 },
      { name: 'SAP MM', level: 'Intermediate', years: 6 }
    ],
    projectHistory: [
      {
        client: 'Global Automotive OEM',
        role: 'Lead EWM Architect',
        period: '2022 - 2025',
        type: 'S/4HANA Greenfield',
        description: 'End-to-end implementation of EWM for a new EV production facility. Managed team of 12 functional consultants.',
        outcome: 'Go-live achieved on schedule with zero P1 issues in hypercare.'
      },
      {
        client: 'Pharma Logistics Leader',
        role: 'Senior EWM Consultant',
        period: '2019 - 2022',
        type: 'Template Rollout',
        description: 'Global rollout of SAP EWM to 8 distribution centers across EMEA and APAC.',
        outcome: 'Standardized 85% of processes, reducing maintenance costs by 20%.'
      }
    ],
    technicalSkills: ['ABAP OO', 'OData Services', 'SAP BTP', 'RF Framework', 'MFS (Material Flow System)'],
    certifications: ['SAP Certified Application Associate - Extended Warehouse Management with SAP S/4HANA', 'PMP Certified']
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Top Header */}
      <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Comparison
            </button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Talent Dossier</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-[#005AB5] transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Full Profile
            </button>
            <button className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[13px] font-bold hover:bg-[#003A70] transition-all flex items-center gap-2 shadow-sm">
              <Calendar className="w-4 h-4" />
              Schedule Interview
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto p-10 space-y-8">
          
          {/* Hero Section */}
          <div className="bg-white rounded-[24px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-10 flex items-start gap-10">
              <img 
                src={candidate.avatar} 
                alt={candidate.name}
                className="w-40 h-40 rounded-[32px] object-cover border-4 border-slate-50 shadow-inner"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-3xl font-bold text-slate-900">{candidate.name}</h2>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 py-1 px-3 text-[10px] font-black uppercase tracking-widest">
                    {candidate.trustIndex} VALIDATED
                  </Badge>
                </div>
                
                <p className="text-lg text-slate-500 font-medium mb-6">{candidate.title}</p>
                
                <div className="grid grid-cols-3 gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</span>
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#005AB5]" /> {candidate.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</span>
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#005AB5]" /> {candidate.experience} Total
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Availability</span>
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#005AB5]" /> {candidate.availability}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-48 flex flex-col items-center justify-center p-8 bg-[#EBF1F7] rounded-3xl border border-[#005AB5]/10">
                <div className="text-5xl font-black text-[#002A54] tracking-tighter mb-2">{candidate.readinessScore}%</div>
                <div className="text-[10px] font-black text-[#005AB5] uppercase tracking-widest text-center leading-tight">Delivery Readiness Score</div>
                <div className="mt-6 flex flex-col gap-2 w-full">
                  <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#005AB5]" style={{ width: `${candidate.readinessScore}%` }} />
                  </div>
                  <p className="text-[10px] font-bold text-[#002A54]/60 text-center">Top 2% of Network</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_350px] gap-8">
            {/* Left Column: Details */}
            <div className="space-y-8">
              {/* Summary */}
              <section className="bg-white rounded-[24px] border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#005AB5]" />
                  Executive Summary
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {candidate.summary}
                </p>
              </section>

              {/* Delivery History */}
              <section className="bg-white rounded-[24px] border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#005AB5]" />
                  Verified Project Delivery
                </h3>
                <div className="space-y-10">
                  {candidate.projectHistory.map((project, i) => (
                    <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-slate-100 before:rounded-full">
                      <div className="absolute left-[-4px] top-0 w-3 h-3 rounded-full bg-[#005AB5] border-2 border-white shadow-sm" />
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">{project.client}</h4>
                          <p className="text-sm text-[#005AB5] font-bold">{project.role} • {project.period}</p>
                        </div>
                        <Badge className="bg-slate-50 text-slate-500 border-slate-100 text-[10px] font-bold">
                          {project.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                      <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Validated Outcome</span>
                            <p className="text-xs font-bold text-emerald-800 leading-snug">{project.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Skills & Badges */}
            <div className="space-y-8">
              {/* Modules Scorecard */}
              <section className="bg-white rounded-[24px] border border-slate-200 p-8">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Module Proficiency</h3>
                <div className="space-y-6">
                  {candidate.modules.map((mod, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">{mod.name}</span>
                        <span className="text-[10px] font-black text-[#005AB5] uppercase">{mod.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#002A54]" 
                          style={{ width: mod.level === 'Expert' ? '100%' : mod.level === 'Advanced' ? '75%' : '50%' }} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">{mod.years} Years dedicated focus</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Technical Stack */}
              <section className="bg-[#002A54] rounded-[24px] p-8 text-white">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#005AB5]" />
                  Technical Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.technicalSkills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-bold border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section className="bg-white rounded-[24px] border border-slate-200 p-8">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Certifications</h3>
                <div className="space-y-4">
                  {candidate.certifications.map((cert, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-amber-500 shrink-0" />
                      <p className="text-xs font-bold text-slate-700 leading-snug">{cert}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
