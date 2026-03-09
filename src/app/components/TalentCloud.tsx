import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowLeft, 
  Users, 
  MapPin, 
  Briefcase, 
  Layers, 
  Star,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Activity,
  Zap,
  CheckCircle2,
  X,
  Plus
} from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';

interface TalentCloudProps {
  onBack: () => void;
  onViewCandidate: (candidateId: string) => void;
}

export function TalentCloud({ onBack, onViewCandidate }: TalentCloudProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>(['SAP EWM']);
  const [activeFilters, setActiveFilters] = useState({
    experience: '8+ Years',
    location: 'Europe',
    availability: 'Available Now'
  });

  const talent = [
    {
      id: 't-1',
      name: 'Marcus Chen',
      title: 'Lead SAP EWM Consultant',
      location: 'Munich, DE',
      experience: '12 Years',
      status: 'Available',
      modules: ['SAP EWM', 'SAP TM', 'SAP WM'],
      readiness: 96,
      trustIndex: 'High',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
      highlights: ['3 Greenfield S/4HANA Go-lives', 'MFS Specialist', 'Global Template Lead']
    },
    {
      id: 't-2',
      name: 'Elena Rodriguez',
      title: 'Senior SAP EWM / WM Expert',
      location: 'Madrid, ES',
      experience: '14 Years',
      status: 'In Engagement',
      modules: ['SAP EWM', 'SAP WM', 'SAP MM'],
      readiness: 92,
      trustIndex: 'Verified',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
      highlights: ['Legacy to S/4HANA Migration', 'Warehouse Automation', 'EMEA Rollout']
    },
    {
      id: 't-3',
      name: 'Siddharth Varma',
      title: 'SAP S/4HANA Logistics Lead',
      location: 'Bangalore, IN',
      experience: '9 Years',
      status: 'Available',
      modules: ['SAP TM', 'SAP SD', 'SAP LE'],
      readiness: 89,
      trustIndex: 'High',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
      highlights: ['BTP Integration Focus', 'S/4HANA Conversion', 'Transportation Mgmt Expert']
    },
    {
      id: 't-4',
      name: 'Sarah Jenkins',
      title: 'SAP EWM Technical Architect',
      location: 'London, UK',
      experience: '11 Years',
      status: 'Available',
      modules: ['SAP EWM', 'SAP ABAP', 'SAP BTP'],
      readiness: 94,
      trustIndex: 'Verified',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
      highlights: ['Custom WRICEF Architecture', 'Performance Tuning Specialist', 'EWM Cloud Experience']
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header Area */}
      <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back to Dashboard
              </button>
              <div className="h-4 w-px bg-slate-200 mx-2" />
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none tracking-tight">SAP Talent Cloud</h1>
                <p className="text-[11px] text-slate-500 font-medium mt-1.5 uppercase tracking-wide">
                  Explore 12,400+ validated SAP consultants in the DeepSAP network
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Directory
              </button>
              <button className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[13px] font-bold hover:bg-[#003A70] transition-all flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" />
                Invite Candidate
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-[500px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, module, or specific delivery keyword..."
                className="pl-10 h-10 bg-slate-50 border-none rounded-xl focus:bg-white transition-all text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Quick Filters:</span>
              {['Available Now', 'S/4HANA Ready', '8+ Years Exp', 'Europe'].map(filter => (
                <Badge 
                  key={filter} 
                  className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer py-1.5 px-3 rounded-lg text-[11px] font-bold"
                >
                  {filter}
                </Badge>
              ))}
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[#005AB5] font-bold text-[11px] hover:underline uppercase tracking-widest">
                <Filter className="w-3.5 h-3.5" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          
          <div className="grid grid-cols-[300px_1fr] gap-8">
            {/* Sidebar Filters */}
            <div className="space-y-8">
              <div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Modules</h3>
                <div className="space-y-2">
                  {['SAP EWM', 'SAP TM', 'SAP S/4HANA', 'SAP IBP', 'SAP BTP'].map(mod => (
                    <label key={mod} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedModules.includes(mod) ? 'bg-[#002A54] border-[#002A54]' : 'bg-slate-50 border-slate-200'}`}>
                        {selectedModules.includes(mod) && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm font-medium ${selectedModules.includes(mod) ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Project Experience</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">System Generation</span>
                    <Select defaultValue="s4hana">
                      <SelectTrigger className="h-10 bg-white border-slate-200 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s4hana">S/4HANA Verified</SelectItem>
                        <SelectItem value="ecc">ECC 6.0 Experience</SelectItem>
                        <SelectItem value="cloud">SAP Cloud Public Edition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Implementation Type</span>
                    <div className="flex flex-wrap gap-2">
                      {['Greenfield', 'Brownfield', 'Rollout', 'Template'].map(type => (
                        <Badge key={type} className="bg-slate-50 text-slate-600 border border-slate-100 py-1.5 px-2.5 rounded-lg text-[10px] font-bold cursor-pointer hover:bg-slate-100">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#EBF1F7] p-6 rounded-[20px] border border-[#005AB5]/10">
                <div className="flex items-start gap-3 mb-4">
                  <Zap className="w-5 h-5 text-[#005AB5]" />
                  <h4 className="text-sm font-bold text-[#002A54]">DeepSAP Intelligence</h4>
                </div>
                <p className="text-xs text-[#005AB5]/80 leading-relaxed font-medium mb-4">
                  Looking for high-impact talent? Our "Delivery Confidence" score analyzes 14+ signals including project duration and go-live frequency.
                </p>
                <button className="w-full py-2.5 bg-white text-[#002A54] font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-sm border border-white hover:border-[#005AB5]/20 transition-all">
                  Show Validated Only
                </button>
              </div>
            </div>

            {/* Talent Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Found {talent.length} Experts for your criteria</h2>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 font-medium">Sort by:</span>
                  <Select defaultValue="readiness">
                    <SelectTrigger className="w-[180px] h-9 border-none bg-white text-[11px] font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="readiness">Delivery Readiness</SelectItem>
                      <SelectItem value="experience">Experience (Yrs)</SelectItem>
                      <SelectItem value="availability">Recently Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {talent.map(candidate => (
                  <div 
                    key={candidate.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between hover:border-[#005AB5] hover:shadow-md transition-all group cursor-pointer"
                    onClick={() => onViewCandidate(candidate.id)}
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img 
                          src={candidate.avatar} 
                          alt={candidate.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${candidate.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005AB5] transition-colors">{candidate.name}</h3>
                          <Badge className="bg-blue-50 text-[#005AB5] border-none text-[9px] font-black uppercase tracking-[0.1em] py-0.5">
                            {candidate.trustIndex} TRUST
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {candidate.title}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {candidate.location}</span>
                          <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> {candidate.experience}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {candidate.modules.map(mod => (
                            <span key={mod} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{mod}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 pr-4">
                      <div className="text-center">
                        <div className="text-2xl font-black text-[#002A54] leading-none">{candidate.readiness}%</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Readiness</div>
                      </div>

                      <div className="hidden lg:block w-px h-10 bg-slate-100" />

                      <div className="hidden lg:block space-y-1">
                        {candidate.highlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                            <ShieldCheck className="w-3 h-3 text-[#005AB5]" />
                            {hl}
                          </div>
                        ))}
                      </div>

                      <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#EBF1F7] hover:text-[#002A54] transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 flex justify-center">
                <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  Load More Experts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
