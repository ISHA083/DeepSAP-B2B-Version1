import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Search,
  Plus,
  X,
  Bookmark,
  CheckCircle2,
  Info,
  SlidersHorizontal,
  Activity,
  ShieldCheck,
  Layers,
  ExternalLink,
  FileText,
  Save,
  RotateCcw,
  Sparkles,
  Download,
  Check,
  Star,
  MoreVertical,
  Zap,
  TrendingUp,
  MapPin,
  Clock,
  Briefcase
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { CandidateComparison } from './CandidateComparison';

interface RankedResultsProps {
  onBack: () => void;
  onViewCandidate: (id: string) => void;
  onCheckReadiness?: (id: string) => void;
  onViewResumeIntelligence?: () => void;
  onGenerateSubmissionReport?: () => void;
  isComparing: boolean;
  setIsComparing: (val: boolean) => void;
  selectedProfiles: string[];
  setSelectedProfiles: (val: string[] | ((prev: string[]) => string[])) => void;
}

export function RankedResults({ 
  onBack, 
  onViewCandidate, 
  onCheckReadiness,
  onViewResumeIntelligence,
  onGenerateSubmissionReport,
  isComparing, 
  setIsComparing, 
  selectedProfiles, 
  setSelectedProfiles 
}: RankedResultsProps) {
  // State
  const [expandedProfiles, setExpandedProfiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('Best Overall Fit');
  const [sortBy, setSortBy] = useState('Role Fit');
  const [topN, setTopN] = useState('25');
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Suggestions' | 'Insights'>('Suggestions');
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);
  const [ignoredSuggestions, setIgnoredSuggestions] = useState<string[]>([]);
  const [isAppliedExpanded, setIsAppliedExpanded] = useState(false);

  const [processedIds, setProcessedIds] = useState<string[]>([]);

  const suggestions = [
    { id: 's1', label: 'Supply', title: 'Supply too tight', rationale: 'Allow ECC + strong EWM to expand pool ~18%.', variant: 'orange' as const, colorClass: 'border-orange-100 text-orange-600' },
    { id: 's2', label: 'Weights', title: 'Raise Integration influence', rationale: 'Improves separation for integration-heavy roles.', variant: 'blue' as const, colorClass: 'border-blue-100 text-blue-600' },
    { id: 's3', label: 'Filters', title: 'Add Warehouse Automation signal', rationale: 'Reduces false positives in MFS-heavy batches.', variant: 'purple' as const, colorClass: 'border-purple-100 text-purple-600' },
  ];

  const [rankingWeights, setRankingWeights] = useState({
    modules: 45,
    experience: 35,
    systemType: 55,
    projectPhases: 30,
    wricef: 25,
    linkedin: 15
  });

  const [filters, setFilters] = useState({
    minExp: 8,
    maxExp: 15,
    modules: ['SAP EWM', 'SAP TM'],
    systems: ['S/4HANA', 'ECC'],
    phases: ['Greenfield', 'Hypercare'],
    wricef: ['Enhancements', 'Interfaces', 'Reports']
  });

  // Mock Data
  const candidates = [
    {
      id: 'rc-1',
      name: 'Marcus Chen',
      module: 'SAP EWM',
      overallFit: 96,
      trustIndex: 98,
      experience: '12 Years',
      location: 'Munich, DE',
      title: 'Lead SAP EWM Consultant',
      whyFit: [
        'Matches S/4HANA must-have requirement',
        'Strong integration ownership aligned with weight settings',
        'Greenfield rollout experience'
      ],
      signals: {
        systems: ['S/4HANA', 'ECC'],
        phases: ['Greenfield', 'Deploy'],
        integration: ['SD', 'TM', 'GTS']
      }
    },
    {
      id: 'rc-2',
      name: 'Elena Rodriguez',
      module: 'SAP EWM / WM',
      overallFit: 92,
      trustIndex: 94,
      experience: '14 Years',
      location: 'Madrid, ES',
      title: 'Senior SAP EWM / WM Expert',
      whyFit: [
        'Expertise in complex module integrations',
        'Proven delivery history in rollout projects',
        'Strong functional alignment with core processes'
      ],
      signals: {
        systems: ['S/4HANA', 'ECC'],
        phases: ['Rollout', 'Legacy Migration'],
        integration: ['MM', 'PP']
      }
    },
    {
      id: 'rc-3',
      name: 'Siddharth Varma',
      module: 'SAP TM / SD',
      overallFit: 89,
      trustIndex: 91,
      experience: '9 Years',
      location: 'Bangalore, IN',
      title: 'SAP S/4HANA Logistics Lead',
      whyFit: [
        'Hands-on S/4HANA conversion experience',
        'Solid background in WRICEF developments',
        'Extensive knowledge of automated warehouse systems'
      ],
      signals: {
        systems: ['S/4HANA'],
        phases: ['Transformation', 'Testing'],
        integration: ['OData', 'ALE']
      }
    }
  ];

  const toggleProfileSelection = (id: string) => {
    setSelectedProfiles(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleProcessCandidate = (id: string, type: 'shortlisted' | 'rejected') => {
    toast.success(`DeepSAP is learning...`, {
      description: `${type === 'shortlisted' ? 'Prioritizing' : 'Excluding'} similar profiles to refine ranking.`,
      duration: 3000,
    });
    setProcessedIds(prev => [...prev, id]);
  };

  const handleWeightChangeLocal = (key: keyof typeof rankingWeights, val: number[]) => {
    setRankingWeights(prev => ({ ...prev, [key]: val[0] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {isComparing ? (
        <CandidateComparison 
          selectedCandidates={candidates.filter(c => selectedProfiles.includes(c.id))}
          onClose={() => setIsComparing(false)}
          onViewCandidate={onViewCandidate}
        />
      ) : (
        <>
          {/* Header */}
          <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
            <div className="max-w-[1400px] mx-auto w-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Back
                  </button>
                  <div className="h-4 w-px bg-slate-200 mx-2" />
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 leading-none tracking-tight">Ranked Results</h1>
                    <p className="text-[11px] text-slate-500 font-medium mt-1.5 uppercase tracking-wide">84 consultants ranked for SAP EWM Consultant — based on your evaluation logic</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold flex items-center gap-1.5 cursor-help mr-2 transition-all hover:bg-emerald-100">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Adaptive: On
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[200px] text-center bg-white border border-slate-200 shadow-lg p-3">
                        <p className="text-[11px] font-medium leading-relaxed">Learns from shortlist, rejection, and hiring outcomes to improve relevance.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all flex items-center gap-2"><Save className="w-4 h-4" /> Save Strategy</button>
                  <button className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[13px] font-bold hover:bg-[#003A70] transition-all flex items-center gap-2 shadow-sm"><Download className="w-4 h-4" /> Export Dossier</button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span className="text-slate-900">Role:</span> SAP EWM Consultant <span className="mx-2 text-slate-200">|</span> <span className="text-slate-900">Batch:</span> Q1_Hiring_Drive
              </div>
            </div>
          </div>

          {/* View Controls */}
          <div className="px-8 py-3 bg-white border-b border-slate-100 shrink-0">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">View:</span>
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="w-[180px] h-9 border-none bg-slate-50 font-bold text-slate-700 text-[11px] hover:bg-slate-100 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Best Overall Fit">Best Overall Fit</SelectItem>
                      <SelectItem value="Delivery Readiness">Delivery Readiness</SelectItem>
                      <SelectItem value="Market Availability">Market Availability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9 border-none bg-slate-50 font-bold text-slate-700 text-[11px] hover:bg-slate-100 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Role Fit">Role Fit</SelectItem>
                      <SelectItem value="Delivery Readiness Score">Delivery Readiness Score (High → Low)</SelectItem>
                      <SelectItem value="Experience">Experience (High → Low)</SelectItem>
                      <SelectItem value="Trust Index">Trust Index</SelectItem>
                      <SelectItem value="Recently Active">Recently Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Top:</span>
                  <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                    {['1', '5', '10', '25', '50', 'All'].map((n) => (
                      <button key={n} onClick={() => setTopN(n)} className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${topN === n ? 'bg-white text-[#002A54] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>84 matches</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span>2123ms</span>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <AnimatePresence>
            {selectedProfiles.length > 0 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#002A54] text-white shrink-0 overflow-hidden border-b border-[#003A70]">
                <div className="max-w-[1400px] mx-auto px-8 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                      <span className="text-[13px] font-bold">{selectedProfiles.length} Profiles Selected</span>
                      <button onClick={() => setSelectedProfiles([])} className="p-1 hover:bg-white/10 rounded-md transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all">Add to Shortlist</button>
                      <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all">Mark as Not Suitable</button>
                      <button className="px-4 py-1.5 bg-[#005AB5] hover:bg-blue-600 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all">Move to Delivery Workflow</button>
                      <button onClick={() => setIsComparing(true)} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all">Compare Selected</button>
                      <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all">Download Batch Dossier</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/60 italic"><Info className="w-3.5 h-3.5" /> Ranking adapts based on your shortlist and hiring outcomes.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto h-full grid grid-cols-[300px_1fr] gap-0 transition-all duration-300 ease-in-out">
              
              {/* Left Panel: Ranking Logic */}
              <div className="border-r border-slate-200 bg-white overflow-y-auto px-6 py-8 scrollbar-thin">
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 leading-none">Ranking Logic</h2>
                  <p className="text-[12px] text-slate-500 mt-2">Evaluation priorities for this batch.</p>
                  <p className="text-[10px] text-slate-400 mt-4 uppercase font-black tracking-widest leading-relaxed">Filters <span className="text-red-500">exclude</span>; weights <span className="text-[#005AB5]">influence</span> ranking.</p>
                </div>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Modules</h3>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input placeholder="Search modules..." className="pl-9 h-9 text-[11px] bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-[#005AB5]/20" />
                      <Plus className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filters.modules.map(m => (
                        <Badge key={m} className="bg-blue-50 text-[#005AB5] border-none py-1.5 px-2.5 rounded-md flex items-center gap-1.5 text-[10px] font-bold">{m}<X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, modules: f.modules.filter(x => x !== m) }))} /></Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between"><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Experience</h3><span className="text-[9px] font-black bg-orange-50 text-orange-600 px-2 py-0.5 rounded uppercase tracking-widest">FILTER</span></div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1"><Label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Min</Label><Input type="number" value={filters.minExp} onChange={(e) => setFilters(f => ({ ...f, minExp: parseInt(e.target.value) || 0 }))} className="h-9 text-[11px] bg-slate-50 border-none" /></div>
                      <div className="pt-5 text-slate-300 font-medium">to</div>
                      <div className="flex-1"><Label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Max</Label><Input placeholder="∞" className="h-9 text-[11px] bg-slate-50 border-none" /></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {filters.systems.map(s => (
                        <Badge key={s} className="bg-slate-50 text-slate-600 border border-slate-100 py-1.5 px-2.5 rounded-md flex items-center gap-1.5 text-[10px] font-bold">{s}<X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, systems: f.systems.filter(x => x !== s) }))} /></Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6 pt-8 border-t border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.1em]">Weights</h3>
                    <div className="space-y-8">
                      {(Object.entries(rankingWeights) as [keyof typeof rankingWeights, number][]).map(([key, val]) => (
                        <div key={key} className="space-y-3">
                          <div className="flex items-center justify-between"><span className="text-[11px] font-bold text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span><span className="text-[11px] font-black text-slate-900">{val}%</span></div>
                          <Slider value={[val]} onValueChange={(v) => handleWeightChangeLocal(key, v)} max={100} step={5} className="[&_[role=slider]]:h-3.5 [&_[role=slider]]:w-3.5 [&_[role=slider]]:border-[#002A54] [&_[role=slider]]:bg-white [&_.relative]:h-1" />
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100/50 flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-[#005AB5] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#002A54] leading-relaxed font-bold">“This configuration prioritizes integration-heavy specialists.”</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Panel: Profile Cards */}
              <div className="bg-[#F8FAFC] overflow-y-auto px-10 py-10 scrollbar-thin">
                <div className="space-y-6 max-w-[960px] mx-auto pb-12">
                  <AnimatePresence>
                    {appliedSuggestions.length > 0 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, marginBottom: 24 }} exit={{ height: 0, opacity: 0 }} className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center justify-between shadow-sm overflow-hidden">
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#005AB5]" /> Applied: <span className="text-slate-900">{appliedSuggestions.length}</span></span>
                          <div className="flex gap-2">{suggestions.filter(s => appliedSuggestions.includes(s.id)).map(s => (<Badge key={s.id} className="bg-slate-50 text-slate-600 border border-slate-100 text-[9px] font-bold px-2 py-0.5">{s.label}</Badge>))}</div>
                        </div>
                        <button onClick={() => { setActiveTab('Suggestions'); setIsDrawerOpen(true); setIsAppliedExpanded(true); }} className="text-[11px] font-black text-[#005AB5] uppercase tracking-widest hover:underline cursor-pointer">Manage</button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {candidates.filter(c => !processedIds.includes(c.id)).map((candidate, idx) => {
                      const isSelected = selectedProfiles.includes(candidate.id);
                      return (
                        <motion.div key={candidate.id} layout initial={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }} className={`bg-white rounded-2xl border transition-all duration-300 group ${isSelected ? 'border-[#005AB5] shadow-lg ring-1 ring-[#005AB5]/10' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}>
                          <div className="p-8 pb-7">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-6">
                                <div className="pt-1.5"><Checkbox checked={isSelected} onCheckedChange={() => toggleProfileSelection(candidate.id)} className="w-5 h-5 border-slate-300 data-[state=checked]:bg-[#002A54]" /></div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-3"><span className="text-[10px] font-black text-[#B7410E] bg-yellow-50 px-2.5 py-1 rounded-md tracking-widest uppercase border border-[#B7410E]/20">RANK {idx + 1}</span><h3 onClick={() => onViewCandidate(candidate.id)} className="text-xl font-bold text-slate-900 leading-none cursor-pointer hover:text-[#005AB5] transition-colors">{candidate.name}</h3></div>
                                  <p className="text-[14px] text-slate-500 font-medium flex items-center gap-2">{candidate.title} <span className="w-1 h-1 bg-slate-300 rounded-full" /> {candidate.experience} <span className="w-1 h-1 bg-slate-300 rounded-full" /> {candidate.location}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-12">
                                <div className="flex items-center gap-10 pr-4">
                                  <div className="text-center"><div className="text-3xl font-black text-[#002A54] leading-none tracking-tight">{candidate.overallFit}%</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Role Fit</div></div>
                                  <div className="text-center"><div className="text-3xl font-black text-[#002A54] leading-none tracking-tight">{candidate.trustIndex}</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 whitespace-nowrap">Trust Index</div></div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <TooltipProvider><Tooltip><TooltipTrigger asChild><button onClick={(e) => { e.stopPropagation(); handleProcessCandidate(candidate.id, 'shortlisted'); }} className="text-slate-300 hover:text-amber-500 transition-colors p-1"><Bookmark className="w-6 h-6" /></button></TooltipTrigger><TooltipContent side="top" className="bg-white border border-slate-200 shadow-lg px-2 py-1"><p className="text-[10px] font-bold">Shortlist</p></TooltipContent></Tooltip></TooltipProvider>
                                  <TooltipProvider><Tooltip><TooltipTrigger asChild><button onClick={(e) => { e.stopPropagation(); handleProcessCandidate(candidate.id, 'rejected'); }} className="text-slate-300 hover:text-rose-500 transition-colors p-1"><X className="w-6 h-6" /></button></TooltipTrigger><TooltipContent side="top" className="bg-white border border-slate-200 shadow-lg px-2 py-1"><p className="text-[10px] font-bold">Reject</p></TooltipContent></Tooltip></TooltipProvider>
                                </div>
                              </div>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-10">
                              <div className="flex flex-col gap-2.5"><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Systems</span><div className="flex gap-2">{candidate.signals.systems.map(s => (<Badge key={s} variant="outline" className="bg-slate-50 border-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg">{s}</Badge>))}</div></div>
                              <div className="flex flex-col gap-2.5"><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phases</span><div className="flex gap-2">{candidate.signals.phases.map(p => (<Badge key={p} variant="outline" className="bg-slate-50 border-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg">{p}</Badge>))}</div></div>
                            </div>
                            <div className="mt-6">
                              <button onClick={onViewResumeIntelligence} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest hover:text-slate-700 transition-all text-[#1368e8]">
                                <FileText className="w-3.5 h-3.5 text-slate-400" /> Resume Intelligence
                              </button>
                            </div>
                            <div className="mt-8 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-4">
                              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100"><Sparkles className="w-4 h-4 text-[#002A54]" /></div>
                              <button onClick={onGenerateSubmissionReport} className="ml-auto flex items-center gap-2 px-4 py-2.5 bg-white border border-[#002A54] text-slate-500 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 hover:text-slate-700 transition-all">Generate Submission Report</button>
                              <button onClick={() => onCheckReadiness?.(candidate.id)} className="flex items-center gap-2 px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-[#003A70] transition-all shadow-lg">Check Delivery Readiness<ChevronRight className="w-4 h-4" /></button>
                            </div>
                            <div className="mt-3 border border-slate-100 rounded-2xl overflow-hidden bg-white">
                              <button onClick={() => setExpandedProfiles(prev => prev.includes(candidate.id) ? prev.filter(p => p !== candidate.id) : [...prev, candidate.id])} className="w-full px-5 py-4 flex items-center justify-between text-[11px] font-black text-[#002A54] uppercase tracking-widest hover:bg-slate-50/50 transition-all group/acc"><div className="flex items-center gap-3"><Info className="w-4 h-4 text-[#005AB5]" /> Why this is a match</div><ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedProfiles.includes(candidate.id) ? 'rotate-180' : ''}`} /></button>
                              <AnimatePresence>{expandedProfiles.includes(candidate.id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="overflow-hidden"><div className="px-5 pb-5 pt-1 space-y-2">{candidate.whyFit.map((fit, i) => (<div key={i} className="flex items-start gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100/50"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[12px] text-slate-600 font-medium leading-relaxed">{fit}</span></div>))}</div></motion.div>)}</AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Pagination */}
                  <div className="flex items-center justify-between pt-10 border-t border-slate-200">
                    <div className="flex items-center gap-2"><span className="text-[11px] text-slate-500 font-medium">Page <span className="text-slate-900 font-bold">1</span> of 28</span></div>
                    <div className="flex items-center gap-1">
                      <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                      {[1, 2, 3, '...', 28].map((page, idx) => (<button key={idx} className={`w-9 h-9 flex items-center justify-center rounded-lg text-[11px] font-bold transition-all ${page === 1 ? 'border-2 border-[#002A54] text-[#002A54] bg-white' : page === '...' ? 'border-none bg-transparent cursor-default text-slate-400' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>{page}</button>))}
                      <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 bg-white hover:border-slate-300"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center gap-3"><span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">View:</span><Select defaultValue="3"><SelectTrigger className="w-20 h-9 border-slate-200 bg-white text-[11px] font-bold px-3"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="3">3</SelectItem><SelectItem value="10">10</SelectItem><SelectItem value="25">25</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Trigger */}
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setIsDrawerOpen(true)} className="mr-6 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center cursor-pointer group transition-all relative">
                    <Sparkles className="w-5 h-5 text-[#002A54]" />
                    {suggestions.filter(s => !appliedSuggestions.includes(s.id) && !ignoredSuggestions.includes(s.id)).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#005AB5] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{suggestions.filter(s => !appliedSuggestions.includes(s.id) && !ignoredSuggestions.includes(s.id)).length}</span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-white border border-slate-200 shadow-xl p-3"><p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">Decision Intelligence</p><p className="text-[12px] font-bold text-[#002A54]">{suggestions.filter(s => !appliedSuggestions.includes(s.id) && !ignoredSuggestions.includes(s.id)).length} suggestions, {appliedSuggestions.length} applied</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Right Drawer Overlay */}
          <AnimatePresence>
            {isDrawerOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40" />
                <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-[360px] bg-white shadow-2xl z-50 border-l border-slate-100 flex flex-col">
                  <div className="p-6 border-b border-slate-50 flex items-center justify-between shrink-0"><div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#005AB5]" /><h2 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.1em]">Decision Intelligence</h2></div><button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"><X className="w-4 h-4" /></button></div>
                  <div className="flex border-b border-slate-50 shrink-0">
                    <button onClick={() => setActiveTab('Suggestions')} className={`flex-1 py-3.5 text-[11px] font-black uppercase tracking-widest relative ${activeTab === 'Suggestions' ? 'text-[#005AB5]' : 'text-slate-400'}`}>Suggestions ({suggestions.filter(s => !appliedSuggestions.includes(s.id) && !ignoredSuggestions.includes(s.id)).length + appliedSuggestions.length}){activeTab === 'Suggestions' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005AB5]" />}</button>
                    <button onClick={() => setActiveTab('Insights')} className={`flex-1 py-3.5 text-[11px] font-black uppercase tracking-widest relative ${activeTab === 'Insights' ? 'text-[#005AB5]' : 'text-slate-400'}`}>Insights{activeTab === 'Insights' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005AB5]" />}</button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                    {activeTab === 'Suggestions' ? (
                      <div className="space-y-8">
                        {appliedSuggestions.length > 0 && (
                          <div className="space-y-4">
                            <button onClick={() => setIsAppliedExpanded(!isAppliedExpanded)} className="w-full flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">Applied ({appliedSuggestions.length})<ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAppliedExpanded ? 'rotate-180' : ''}`} /></button>
                            <AnimatePresence>{isAppliedExpanded && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">{suggestions.filter(s => appliedSuggestions.includes(s.id)).map(s => (<div key={s.id} className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 space-y-2"><Badge className={`bg-white ${s.colorClass} py-0.5 px-2 rounded-md text-[9px] font-black uppercase`}>{s.label}</Badge><h4 className="text-[12px] font-bold text-slate-900 leading-tight">{s.title}</h4><p className="text-[11px] text-slate-500 italic font-medium leading-relaxed">{s.rationale}</p><div className="flex items-center justify-between pt-1 border-t border-blue-100/50 mt-2"><Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black px-1.5 py-0.5 uppercase">Applied</Badge><button onClick={() => setAppliedSuggestions(prev => prev.filter(id => id !== s.id))} className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors">Remove</button></div></div>))}</motion.div>)}</AnimatePresence>
                          </div>
                        )}
                        <div className="space-y-4">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended ({suggestions.filter(s => !appliedSuggestions.includes(s.id) && !ignoredSuggestions.includes(s.id)).length})</h3>
                          <div className="space-y-3">{suggestions.filter(s => !appliedSuggestions.includes(s.id) && !ignoredSuggestions.includes(s.id)).map(s => (<div key={s.id} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2"><Badge className="bg-slate-50 text-slate-600 py-0.5 px-2 rounded-md text-[9px] font-black uppercase border border-slate-100">{s.label}</Badge><h4 className="text-[12px] font-bold text-slate-900 leading-tight">{s.title}</h4><p className="text-[11px] text-slate-500 italic font-medium leading-relaxed">{s.rationale}</p><div className="flex items-center gap-3 pt-3"><button onClick={() => setAppliedSuggestions(prev => [...prev, s.id])} className="px-4 py-1.5 bg-[#002A54] text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Apply</button><button onClick={() => setIgnoredSuggestions(prev => [...prev, s.id])} className="text-[10px] font-bold text-slate-400 hover:text-slate-600">Ignore</button></div></div>))}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="p-5 rounded-2xl border border-slate-100 bg-white space-y-4 shadow-sm"><div className="flex items-center justify-between"><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Scarcity</h3><Badge className="bg-rose-50 text-rose-600 border-rose-100 px-2.5 py-1 text-[9px] font-black uppercase">High</Badge></div><div className="h-1.5 w-full bg-slate-50 border border-slate-100 rounded-full overflow-hidden"><div className="h-full bg-rose-400 rounded-full" style={{ width: '4%' }} /></div><p className="text-[11px] text-slate-500 font-medium italic">EWM + S/4HANA is top 5% scarcity this quarter.</p></div>
                        <div className="p-5 rounded-2xl border border-slate-100 bg-white space-y-4 shadow-sm"><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Reliability</h3><div className="flex items-baseline gap-2"><span className="text-3xl font-black text-[#002A54]">92%</span><span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Confident</span></div><p className="text-[11px] text-slate-500 font-medium italic">Verified project history across 84 profiles.</p></div>
                        <div className="p-5 rounded-2xl border border-slate-100 bg-white space-y-5 shadow-sm"><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Common Signals</h3><div className="flex flex-wrap gap-2">{['S/4HANA', 'Greenfield', 'Integration-heavy', 'Warehouse Automation', 'MFS Integration', 'EWM Build'].map(tag => (<Badge key={tag} className="bg-slate-50 text-slate-500 border border-slate-100 py-1.5 px-2.5 rounded-lg text-[10px] font-bold">{tag}</Badge>))}</div></div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 border-t border-slate-50 shrink-0"><p className="text-[10px] text-slate-400 font-medium flex items-center gap-2"><Activity className="w-3 h-3" /> Decision logic updated: Today, 10:42 AM</p></div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}