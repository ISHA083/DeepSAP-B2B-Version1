import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Switch } from './ui/switch';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Plus, 
  X, 
  ChevronRight, 
  Info, 
  Search,
  Paperclip, 
  ClipboardList,
  CheckCircle2,
  Trash2,
  Mic,
  StopCircle,
  RotateCcw,
  Edit3,
  FileUp,
  MessageSquareText,
  GripVertical,
  Lock,
  Unlock,
  Settings2,
  Target,
  Zap,
  ShieldCheck,
  Cloud,
  Database,
  Users,
  Check,
  ChevronDown,
  ChevronUp,
  History,
  Star
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';

// Drag item type
const ItemType = {
  SUB_CRITERION: 'subCriterion'
};

// DraggableSubCriterion component for drag-and-drop
interface DraggableSubCriterionProps {
  sub: { id: string; pos: number; name: string; desc: string; contrib: number };
  index: number;
  criterionId: string;
  moveSubCriterion: (criterionId: string, dragIndex: number, hoverIndex: number) => void;
}

function DraggableSubCriterion({ sub, index, criterionId, moveSubCriterion }: DraggableSubCriterionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.SUB_CRITERION,
    item: { id: sub.id, index, criterionId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType.SUB_CRITERION,
    hover: (item: { id: string; index: number; criterionId: string }, monitor) => {
      if (!ref.current) return;
      
      // Only allow reordering within the same criterion
      if (item.criterionId !== criterionId) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      
      if (!clientOffset) return;
      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveSubCriterion(criterionId, dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 py-2 transition-opacity ${isDragging ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripVertical className="w-4 h-4 text-slate-300 cursor-grab active:cursor-grabbing" />
      <div className="w-6 h-6 rounded-full bg-[#002A54] text-white flex items-center justify-center text-xs font-bold">
        {sub.pos}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-900">{sub.name}</div>
        <div className="text-xs text-slate-500">{sub.desc}</div>
      </div>
      <span className="text-xs font-medium text-slate-500 tabular-nums">
        ≈ {sub.contrib}%
      </span>
    </div>
  );
}

interface ProfileShortlistingProps {
  onBack: () => void;
  onShortlist: () => void;
}

export function ProfileShortlisting({ onBack, onShortlist }: ProfileShortlistingProps) {
  const [currentStep, setCurrentStep] = useState<'initial' | 'define-role' | 'enrich-role' | 'validate-requirements' | 'add-candidates' | 'view-results' | 'resume-summary' | 'resume-project-details'>('initial');
  
  // Form State
  const [roleTitle, setRoleTitle] = useState('');
  const [sapModule, setSapModule] = useState('');
  const [projectType, setProjectType] = useState('');
  const [engagementType, setEngagementType] = useState('');
  const [yearsExp, setYearsExp] = useState('');
  
  // JD State
  const [jdText, setJdText] = useState('');
  const [isJdExpanded, setIsJdExpanded] = useState(false);
  
  // Custom Flow State
  const [selectedMethod, setSelectedMethod] = useState<'upload' | 'paste' | 'voice' | null>(null);
  const [uploadedJd, setUploadedJd] = useState<File | null>(null);
  const [pastedContent, setPastedContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  
  // Enrichment State
  const [snapshotRequirements, setSnapshotRequirements] = useState([
    'S/4HANA environment',
    'Greenfield implementation',
    'Integration exposure'
  ]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [expandedDimension, setExpandedDimension] = useState<number | null>(1);
  const [dimensionFilter, setDimensionFilter] = useState<'All' | 'Missing' | 'Partial' | 'Defined'>('All');
  const [dimensionSearch, setDimensionSearch] = useState('');

  // YoE badge state
  const [yoeValues, setYoeValues] = useState<Record<string, number | null>>({ 'S/4HANA': 3, 'EWM': 2 });
  const [openYoeKey, setOpenYoeKey] = useState<string | null>(null);
  const [yoePopoverPos, setYoePopoverPos] = useState({ top: 0, left: 0 });

  // Step 2: Validate Requirements State
  const [availableCriteria, setAvailableCriteria] = useState([
    {
      id: 'crit-1',
      category: 'Core Delivery Drivers',
      name: 'System Experience',
      descriptor: 'ECC, S/4HANA, Cloud experience',
      tag: 'JD-critical',
      rationale: 'Core system choice impacts cutover and delivery risk',
      signals: ['ECC', 'S/4HANA', 'Cloud', 'Greenfield', 'Brownfield'],
      selectedSignals: ['S/4HANA', 'Greenfield'],
      weight: 55,
      insight: 'This prioritizes S/4HANA-led implementations, even if ECC depth is lower.'
    },
    {
      id: 'crit-2',
      category: 'Core Delivery Drivers',
      name: 'Integration Experience',
      descriptor: 'OData, ALE/IDoc, PI/PO',
      tag: 'JD-critical',
      rationale: 'High complexity in landscape integration requires proven ownership',
      signals: ['OData', 'ALE/IDoc', 'PI/PO', 'API Management', 'BTP Integration'],
      selectedSignals: ['ALE/IDoc', 'PI/PO'],
      weight: 40,
      insight: 'Favors consultants with deep legacy integration experience.'
    },
    {
      id: 'crit-3',
      category: 'Core Delivery Drivers',
      name: 'Project Phases',
      descriptor: 'Build, Test, Cutover, Hypercare',
      tag: 'Important for this role',
      rationale: 'Focus on end-to-end delivery lifecycle',
      signals: ['Blueprint', 'Realization', 'UAT', 'Cutover', 'Hypercare'],
      selectedSignals: ['UAT', 'Cutover'],
      weight: 35,
      insight: 'Prioritizes execution-focused talent over advisory-only profiles.'
    },
    {
      id: 'crit-4',
      category: 'Execution Enhancers',
      name: 'Business Processes',
      descriptor: 'Procure-to-Pay, Order-to-Cash',
      tag: 'Module-specific',
      rationale: 'Aligns technical work with business outcomes',
      signals: ['P2P', 'O2C', 'Plan-to-Prod', 'Inventory Mgmt'],
      selectedSignals: ['P2P'],
      weight: 30,
      insight: 'Ensures functional alignment with core operational flows.'
    },
    {
      id: 'crit-5',
      category: 'Execution Enhancers',
      name: 'WRICEF',
      descriptor: 'Reports, Interfaces, Extensions',
      tag: 'Technical focus',
      rationale: 'Technical depth in custom object development',
      signals: ['Enhancements', 'Forms', 'Workflows', 'Reports'],
      selectedSignals: ['Forms'],
      weight: 25,
      insight: 'Focuses on extension capability for specialized needs.'
    },
    {
      id: 'crit-6',
      category: 'Contextual Signals',
      name: 'Deployment Experience',
      descriptor: 'Global rollout, Local implementation',
      tag: 'Strategic context',
      rationale: 'Scale complexity impacts delivery approach',
      signals: ['Global Rollout', 'Local Template', 'Rapid Deployment'],
      selectedSignals: ['Global Rollout'],
      weight: 20,
      insight: 'Favors consultants with experience in large-scale template management.'
    }
  ]);

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [lockedCriteria, setLockedCriteria] = useState<string[]>([]);

  // Ranked Results Redesign State
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [expandedProfiles, setExpandedProfiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('Best Overall Fit');
  const [sortBy, setSortBy] = useState('Role Fit');
  const [topN, setTopN] = useState('25');
  
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

  const toggleProfileSelection = (id: string) => {
    setSelectedProfiles(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleProfileAccordion = (id: string) => {
    setExpandedProfiles(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleWeightChangeLocal = (key: keyof typeof rankingWeights, val: number[]) => {
    setRankingWeights(prev => ({ ...prev, [key]: val[0] }));
  };

  // Step 3: Add Candidates State
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [rankingScope, setRankingScope] = useState('25');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [savedProfiles, setSavedProfiles] = useState([
    { id: 'sp-1', name: 'Marco Rossi', role: 'SAP EWM Lead', context: 'Former internal project' },
    { id: 'sp-2', name: 'Elena G', role: 'SAP TM Architect', context: 'Shortlisted for Austin' },
    { id: 'sp-3', name: 'Vikram S', role: 'SAP Basis Specialist', context: 'High match from Talent Cloud' }
  ]);
  const [selectedSavedProfiles, setSelectedSavedProfiles] = useState<string[]>([]);

  // Step 3: Configure Evaluation Strategy State
  const [isStrategyLocked, setIsStrategyLocked] = useState(false);
  const [autoBalance, setAutoBalance] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState<'balanced' | 'delivery' | 'integration' | 'specialist' | 'custom'>('balanced');
  const [expandedCriteria, setExpandedCriteria] = useState<string[]>([]);
  const [excludedCriteria, setExcludedCriteria] = useState<string[]>([]);
  const [strategyCriteria, setStrategyCriteria] = useState([
    { id: '1', name: 'System Experience', description: 'S/4HANA, EWM landscape, platform fit', dots: 5, weight: 22, subCount: 3 },
    { id: '2', name: 'Integration Experience', description: 'SAP & non-SAP integration proof', dots: 4, weight: 15, subCount: 3 },
    { id: '3', name: 'Modules Experience', description: 'Primary + adjacent modules', dots: 4, weight: 15, subCount: 2 },
    { id: '4', name: 'Project Phases', description: 'Build, test, cutover, hypercare', dots: 3, weight: 10, subCount: 0 },
    { id: '5', name: 'Business Processes', description: 'Warehouse flow ownership', dots: 3, weight: 10, subCount: 3 },
    { id: '6', name: 'WRICEF', description: 'Reports, interfaces, enhancements', dots: 3, weight: 10, subCount: 0 },
    { id: '7', name: 'Deployment Experience', description: 'Embedded vs decentralised', dots: 3, weight: 10, subCount: 2 },
    { id: '8', name: 'Tools & Technologies', description: 'Fiori, tooling signals', dots: 2, weight: 6, subCount: 0 },
    { id: '9', name: 'Soft Skills', description: 'Communication, workshops', dots: 1, weight: 2, subCount: 0 },
  ]);

  // Sub-criteria state for each criterion
  const [subCriteria, setSubCriteria] = useState<Record<string, Array<{ id: string; pos: number; name: string; desc: string; contrib: number }>>>({
    '1': [
      { id: 'sub-1-1', pos: 1, name: 'S/4HANA', desc: 'Core implementation depth', contrib: 11.4 },
      { id: 'sub-1-2', pos: 2, name: 'EWM / WM', desc: 'Warehouse module coverage', contrib: 6.8 },
      { id: 'sub-1-3', pos: 3, name: 'Platform & Landscape', desc: 'System architecture context', contrib: 3.7 },
    ],
    '2': [
      { id: 'sub-2-1', pos: 1, name: 'OData / APIs', desc: 'Modern integration patterns', contrib: 7.5 },
      { id: 'sub-2-2', pos: 2, name: 'ALE / IDoc', desc: 'Legacy integration knowledge', contrib: 5.0 },
      { id: 'sub-2-3', pos: 3, name: 'PI/PO', desc: 'Middleware experience', contrib: 2.5 },
    ],
    '3': [
      { id: 'sub-3-1', pos: 1, name: 'Primary Module', desc: 'Core functional expertise', contrib: 9.0 },
      { id: 'sub-3-2', pos: 2, name: 'Adjacent Modules', desc: 'Cross-module knowledge', contrib: 6.0 },
    ],
    '5': [
      { id: 'sub-5-1', pos: 1, name: 'Procure-to-Pay', desc: 'P2P process ownership', contrib: 5.0 },
      { id: 'sub-5-2', pos: 2, name: 'Order-to-Cash', desc: 'O2C flow mastery', contrib: 3.0 },
      { id: 'sub-5-3', pos: 3, name: 'Inventory Mgmt', desc: 'Stock management flows', contrib: 2.0 },
    ],
    '7': [
      { id: 'sub-7-1', pos: 1, name: 'Global Rollout', desc: 'Multi-country deployment', contrib: 6.0 },
      { id: 'sub-7-2', pos: 2, name: 'Local Template', desc: 'Single-site implementation', contrib: 4.0 },
    ],
  });

  const totalWeight = strategyCriteria
    .filter(c => !excludedCriteria.includes(c.id))
    .reduce((sum, c) => sum + c.weight, 0);
  
  const isBalanced = totalWeight === 100;

  const toggleCriterion = (id: string) => {
    if (excludedCriteria.includes(id)) {
      setExcludedCriteria(prev => prev.filter(cid => cid !== id));
    } else {
      setExcludedCriteria(prev => [...prev, id]);
    }
  };

  const toggleExpanded = (id: string) => {
    if (expandedCriteria.includes(id)) {
      setExpandedCriteria(prev => prev.filter(cid => cid !== id));
    } else {
      setExpandedCriteria(prev => [...prev, id]);
    }
  };

  const updateDots = (id: string, dots: number) => {
    if (isStrategyLocked) return;
    setStrategyCriteria(prev => {
      const updated = prev.map(c => {
        if (c.id === id) {
          // Calculate weight based on dots (rough approximation)
          const baseWeights = [2, 6, 10, 15, 22];
          return { ...c, dots, weight: baseWeights[dots - 1] || c.weight };
        }
        return c;
      });
      
      // If auto-balance is enabled, normalize weights after update
      if (autoBalance) {
        const activeWeights = updated.filter(c => !excludedCriteria.includes(c.id));
        const total = activeWeights.reduce((sum, c) => sum + c.weight, 0);
        if (total > 0) {
          return updated.map(c => {
            if (excludedCriteria.includes(c.id)) return c;
            return {
              ...c,
              weight: Math.round((c.weight / total) * 100)
            };
          });
        }
      }
      
      return updated;
    });
  };

  const normalizeWeights = () => {
    const activeWeights = strategyCriteria.filter(c => !excludedCriteria.includes(c.id));
    const total = activeWeights.reduce((sum, c) => sum + c.weight, 0);
    if (total === 0) return;
    setStrategyCriteria(prev => prev.map(c => {
      if (excludedCriteria.includes(c.id)) return c;
      return {
        ...c,
        weight: Math.round((c.weight / total) * 100)
      };
    }));
  };

  const resetToAiDefaults = () => {
    setSelectedStrategy('balanced');
    setExcludedCriteria([]);
    setStrategyCriteria([
      { id: '1', name: 'System Experience', description: 'S/4HANA, EWM landscape, platform fit', dots: 5, weight: 22, subCount: 3 },
      { id: '2', name: 'Integration Experience', description: 'SAP & non-SAP integration proof', dots: 4, weight: 15, subCount: 3 },
      { id: '3', name: 'Modules Experience', description: 'Primary + adjacent modules', dots: 4, weight: 15, subCount: 2 },
      { id: '4', name: 'Project Phases', description: 'Build, test, cutover, hypercare', dots: 3, weight: 10, subCount: 0 },
      { id: '5', name: 'Business Processes', description: 'Warehouse flow ownership', dots: 3, weight: 10, subCount: 3 },
      { id: '6', name: 'WRICEF', description: 'Reports, interfaces, enhancements', dots: 3, weight: 10, subCount: 0 },
      { id: '7', name: 'Deployment Experience', description: 'Embedded vs decentralised', dots: 3, weight: 10, subCount: 2 },
      { id: '8', name: 'Tools & Technologies', description: 'Fiori, tooling signals', dots: 2, weight: 6, subCount: 0 },
      { id: '9', name: 'Soft Skills', description: 'Communication, workshops', dots: 1, weight: 2, subCount: 0 },
    ]);
  };

  const applyPreset = (preset: 'balanced' | 'delivery' | 'integration' | 'specialist') => {
    setExcludedCriteria([]);
    const presetWeights = {
      balanced: [22, 15, 15, 10, 10, 10, 10, 6, 2],
      delivery: [18, 12, 14, 18, 12, 10, 12, 3, 1],
      integration: [16, 25, 12, 8, 10, 16, 8, 4, 1],
      specialist: [20, 10, 28, 8, 14, 10, 6, 3, 1]
    };
    const weights = presetWeights[preset];
    setStrategyCriteria([
      { id: '1', name: 'System Experience', description: 'S/4HANA, EWM landscape, platform fit', dots: 5, weight: weights[0], subCount: 3 },
      { id: '2', name: 'Integration Experience', description: 'SAP & non-SAP integration proof', dots: 4, weight: weights[1], subCount: 3 },
      { id: '3', name: 'Modules Experience', description: 'Primary + adjacent modules', dots: 4, weight: weights[2], subCount: 2 },
      { id: '4', name: 'Project Phases', description: 'Build, test, cutover, hypercare', dots: 3, weight: weights[3], subCount: 0 },
      { id: '5', name: 'Business Processes', description: 'Warehouse flow ownership', dots: 3, weight: weights[4], subCount: 3 },
      { id: '6', name: 'WRICEF', description: 'Reports, interfaces, enhancements', dots: 3, weight: weights[5], subCount: 0 },
      { id: '7', name: 'Deployment Experience', description: 'Embedded vs decentralised', dots: 3, weight: weights[6], subCount: 2 },
      { id: '8', name: 'Tools & Technologies', description: 'Fiori, tooling signals', dots: 2, weight: weights[7], subCount: 0 },
      { id: '9', name: 'Soft Skills', description: 'Communication, workshops', dots: 1, weight: weights[8], subCount: 0 },
    ]);
  };

  const tightenShortlist = () => {
    if (isStrategyLocked) return;
    // Increase weights on high-priority items (5 dots), decrease on low-priority
    setStrategyCriteria(prev => prev.map(c => {
      if (c.dots === 5) {
        return { ...c, weight: Math.min(c.weight + 5, 100) };
      } else if (c.dots <= 2) {
        return { ...c, weight: Math.max(c.weight - 3, 0) };
      } else {
        return { ...c, weight: Math.max(c.weight - 1, 0) };
      }
    }));
  };

  const widenShortlist = () => {
    if (isStrategyLocked) return;
    // Redistribute weights more evenly
    setStrategyCriteria(prev => prev.map(c => {
      if (c.dots === 5) {
        return { ...c, weight: Math.max(c.weight - 3, 0) };
      } else if (c.dots <= 2) {
        return { ...c, weight: Math.min(c.weight + 5, 100) };
      } else {
        return { ...c, weight: Math.min(c.weight + 2, 100) };
      }
    }));
  };

  // Sub-criteria reordering handler
  const moveSubCriterion = (criterionId: string, dragIndex: number, hoverIndex: number) => {
    setSubCriteria(prev => {
      const criterionSubs = prev[criterionId];
      if (!criterionSubs) return prev;
      
      const updatedSubs = [...criterionSubs];
      const [removed] = updatedSubs.splice(dragIndex, 1);
      updatedSubs.splice(hoverIndex, 0, removed);
      
      // Update positions
      const reorderedSubs = updatedSubs.map((sub, index) => ({
        ...sub,
        pos: index + 1
      }));
      
      return {
        ...prev,
        [criterionId]: reorderedSubs
      };
    });
  };

  // Step 4: Ranked Results State
  const [rankedCandidates, setRankedCandidates] = useState([
    {
      id: 'rc-1',
      name: 'Ankit Sharma',
      module: 'SAP EWM',
      overallFit: 94,
      trustIndex: 'High',
      deliveryConfidence: 'High',
      whyFit: [
        'Matches S/4HANA must-have (Decision Anchor)',
        'Strong integration depth aligned with priority weighting',
        'Experience across greenfield rollouts'
      ],
      readinessAvailable: true
    },
    {
      id: 'rc-2',
      name: 'Priya N',
      module: 'SAP TM / SD',
      overallFit: 88,
      trustIndex: 'Medium',
      deliveryConfidence: 'High',
      whyFit: [
        'Expertise in complex module integrations',
        'Proven delivery history in rollout projects',
        'Strong functional alignment with core processes'
      ],
      readinessAvailable: true
    },
    {
      id: 'rc-3',
      name: 'Rahul P',
      module: 'SAP EWM',
      overallFit: 82,
      trustIndex: 'High',
      deliveryConfidence: 'Medium',
      whyFit: [
        'Hands-on S/4HANA conversion experience',
        'Solid background in WRICEF developments',
        'Extensive knowledge of automated warehouse systems'
      ],
      readinessAvailable: false
    }
  ]);

  const toggleSource = (source: string) => {
    setActiveSources(prev => 
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const handleToggleCriterion = (id: string) => {
    if (selectedCriteria.includes(id)) {
      setSelectedCriteria(selectedCriteria.filter(c => c !== id));
    } else {
      setSelectedCriteria([...selectedCriteria, id]);
    }
  };

  const handleToggleSignal = (critId: string, signal: string) => {
    setAvailableCriteria(prev => prev.map(crit => {
      if (crit.id === critId) {
        const isSelected = crit.selectedSignals.includes(signal);
        const newSignals = isSelected 
          ? crit.selectedSignals.filter(s => s !== signal)
          : [...crit.selectedSignals, signal];
        return { ...crit, selectedSignals: newSignals };
      }
      return crit;
    }));
  };

  const handleWeightChange = (critId: string, value: number[]) => {
    setAvailableCriteria(prev => prev.map(crit => 
      crit.id === critId ? { ...crit, weight: value[0] } : crit
    ));
  };

  // Resumes State
  const [resumes, setResumes] = useState<{ id: string, name: string, size: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jdUploadRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      }));
      setResumes([...resumes, ...newFiles]);
    }
  };

  const handleJdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedJd(e.target.files[0]);
      setSelectedMethod('upload');
    }
  };

  const removeResume = (id: string) => {
    setResumes(resumes.filter(r => r.id !== id));
  };

  const isFormValid = roleTitle && sapModule && projectType && engagementType && yearsExp && resumes.length > 0;
  
  const isCustomStepValid = () => {
    if (selectedMethod === 'upload') return !!uploadedJd;
    if (selectedMethod === 'paste') return pastedContent.trim().length > 0;
    if (selectedMethod === 'voice') return transcript.trim().length > 0;
    return false;
  };

  if (currentStep === 'define-role') {
    const steps = [
      { id: 1, label: 'Define Role' },
      { id: 2, label: 'Refine Requirements' },
      { id: 3, label: 'Configure Evaluation Strategy' },
      { id: 4, label: 'Add candidates' },
      { id: 5, label: 'View Results' }
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Top Navigation Area */}
        <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={() => setCurrentStep('initial')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back
              </button>
              
              {/* Compact Stepper */}
              <div className="flex items-center gap-6">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      step.id === 1 
                        ? 'bg-[#002A54] text-white shadow-md shadow-blue-900/10 ring-4 ring-blue-50' 
                        : 'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                      {step.id}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      step.id === 1 ? 'text-[#002A54]' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    {step.id < 5 && <div className="w-3 h-px bg-slate-100 ml-1" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold text-slate-900">Define the Role</h1>
              <p className="text-slate-500 text-sm">
                Share the role details in the way that’s easiest for you. You’ll review and refine everything next.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="max-w-[1200px] mx-auto px-3 py-10">
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900">Choose one way to share the role details</h2>
              <p className="text-slate-500 text-sm mt-1">
                Select whichever option is easiest. You only need to use one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Upload JD */}
              <div 
                onClick={() => setSelectedMethod('upload')}
                className={`bg-white p-8 rounded-[20px] border transition-all cursor-pointer flex flex-col h-full relative ${
                  selectedMethod === 'upload' 
                    ? 'border-[#005AB5] shadow-lg ring-1 ring-[#005AB5]' 
                    : selectedMethod === null ? 'border-slate-200 hover:border-slate-300' : 'border-slate-100 opacity-60'
                }`}
              >
                {selectedMethod === 'upload' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#005AB5] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Selected
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    selectedMethod === 'upload' ? 'bg-[#005AB5] text-white' : 'bg-blue-50 text-[#005AB5]'
                  }`}>
                    <FileUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Upload a Job Description</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Upload an existing JD and we’ll extract and structure the role requirements.
                  </p>
                </div>
                
                <div className="mt-auto space-y-6">
                  <div 
                    onClick={(e) => { e.stopPropagation(); jdUploadRef.current?.click(); }}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all ${
                      uploadedJd ? 'bg-blue-50 border-[#005AB5] text-[#005AB5]' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {uploadedJd ? (
                      <div className="text-center">
                        <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-xs font-bold truncate max-w-[150px]">{uploadedJd.name}</p>
                        <button className="text-[10px] uppercase tracking-widest font-black mt-2 hover:underline">
                          Change File
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-600">Drop JD file here</span>
                        <span className="text-[10px] text-slate-400 font-medium">PDF, DOCX supported</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={jdUploadRef} 
                      className="hidden" 
                      onChange={handleJdUpload}
                      accept=".pdf,.docx"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 italic text-center leading-tight">
                    Use this if you already have a written job description.
                  </p>
                </div>
              </div>

              {/* Option 2: Paste / Type */}
              <div 
                onClick={() => setSelectedMethod('paste')}
                className={`bg-white p-8 rounded-[20px] border transition-all cursor-pointer flex flex-col h-full relative ${
                  selectedMethod === 'paste' 
                    ? 'border-[#005AB5] shadow-lg ring-1 ring-[#005AB5]' 
                    : selectedMethod === null ? 'border-slate-200 hover:border-slate-300' : 'border-slate-100 opacity-60'
                }`}
              >
                {selectedMethod === 'paste' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#005AB5] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Selected
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    selectedMethod === 'paste' ? 'bg-[#005AB5] text-white' : 'bg-blue-50 text-[#005AB5]'
                  }`}>
                    <Edit3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Paste or Type Role Details</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Paste a full JD or partial notes. The system will infer missing details.
                  </p>
                </div>
                
                <div className="mt-auto space-y-6">
                  <Textarea 
                    value={pastedContent}
                    onChange={(e) => {
                      setPastedContent(e.target.value);
                      if (selectedMethod !== 'paste') setSelectedMethod('paste');
                    }}
                    onFocus={() => setSelectedMethod('paste')}
                    placeholder="Paste the job description or describe the role here…"
                    className="min-h-[120px] bg-slate-50 border-slate-200 focus:bg-white resize-none text-sm"
                  />
                  <p className="text-[11px] text-slate-400 italic text-center leading-tight">
                    Use this if you want to quickly jot down or paste notes.
                  </p>
                </div>
              </div>

              {/* Option 3: Voice */}
              <div 
                onClick={() => setSelectedMethod('voice')}
                className={`bg-white p-8 rounded-[20px] border transition-all cursor-pointer flex flex-col h-full relative ${
                  selectedMethod === 'voice' 
                    ? 'border-[#005AB5] shadow-lg ring-1 ring-[#005AB5]' 
                    : selectedMethod === null ? 'border-slate-200 hover:border-slate-300' : 'border-slate-100 opacity-60'
                }`}
              >
                {selectedMethod === 'voice' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#005AB5] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Selected
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    selectedMethod === 'voice' ? (isRecording ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-[#005AB5] text-white') : 'bg-blue-50 text-[#005AB5]'
                  }`}>
                    {isRecording ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Describe the Role (Voice)</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Speak about the role, project context, and what matters most for success.
                  </p>
                </div>
                
                <div className="mt-auto space-y-6">
                  {transcript ? (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transcript</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsEditingTranscript(!isEditingTranscript); }}
                            className="text-[10px] font-black text-[#005AB5] uppercase hover:underline"
                          >
                            {isEditingTranscript ? 'Done' : 'Edit'}
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setTranscript(''); setIsRecording(false); }}
                            className="text-[10px] font-black text-slate-400 uppercase hover:text-red-500"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                      {isEditingTranscript ? (
                        <textarea 
                          value={transcript}
                          onChange={(e) => setTranscript(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:outline-none h-20"
                        />
                      ) : (
                        <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-2">"{transcript}"</p>
                      )}
                    </div>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isRecording) {
                          setIsRecording(false);
                          setTranscript('Looking for a Senior SAP EWM Consultant with experience in S/4HANA greenfield implementations, specifically focusing on warehouse automation and MFS integration.');
                        } else {
                          setSelectedMethod('voice');
                          setIsRecording(true);
                        }
                      }}
                      className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                        isRecording 
                          ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100' 
                          : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <StopCircle className="w-5 h-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          Start Recording
                        </>
                      )}
                    </button>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-slate-400">
                      <Info className="w-3 h-3 mt-0.5 shrink-0" />
                      <p className="text-[10px] italic leading-tight">
                        Voice input is converted into structured requirements. You’ll review everything next.
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 italic text-center leading-tight">
                      Use this if you prefer explaining the role instead of writing it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-10 py-5 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <div className="max-w-[1200px] mx-auto flex items-center justify-end gap-6">
            <div className="flex flex-col items-end">
              <p className="text-[12px] text-slate-400 italic">You can change this later.</p>
            </div>
            <button 
              onClick={() => setCurrentStep('enrich-role')}
              disabled={!isCustomStepValid()}
              className={`px-12 py-3.5 rounded-lg font-bold text-base transition-all flex items-center gap-2 shadow-sm ${
                isCustomStepValid() 
                  ? 'bg-[#002A54] hover:bg-[#003A70] text-white cursor-pointer active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'enrich-role') {
    const steps = [
      { id: 1, label: 'Define Role' },
      { id: 2, label: 'Refine Requirements' },
      { id: 3, label: 'Configure Evaluation Strategy' },
      { id: 4, label: 'Add candidates' },
      { id: 5, label: 'View Results' }
    ];

    const dimensions = [
      { id: 1, name: 'System Experience', status: 'Partially Defined', extracted: 2, missing: 2, tags: ['S/4HANA', 'EWM', 'ECC'] },
      { id: 2, name: 'Integration Experience', status: 'Missing', extracted: 0, missing: 3, tags: ['IDoc', 'OData', 'RFC'] },
      { id: 3, name: 'Modules Experience', status: 'Defined', extracted: 3, missing: 0, tags: ['MM', 'WM', 'SD'] },
      { id: 4, name: 'Project Phases', status: 'Partially Defined', extracted: 2, missing: 3, tags: ['Blueprint', 'Realization'] },
      { id: 5, name: 'Business Processes', status: 'Missing', extracted: 1, missing: 4, tags: ['P2P', 'O2C'] },
      { id: 6, name: 'WRICEF', status: 'Missing', extracted: 0, missing: 3, tags: ['Reports', 'Interfaces'] },
      { id: 7, name: 'Deployment Experience', status: 'Partially Defined', extracted: 1, missing: 2, tags: ['Global Rollout'] },
      { id: 8, name: 'Tools and Technologies', status: 'Defined', extracted: 4, missing: 1, tags: ['Fiori', 'Postman'] },
      { id: 9, name: 'Soft Skills and Others', status: 'Missing', extracted: 0, missing: 3, tags: ['Leadership', 'Communication'] },
    ];

    const filteredDimensions = dimensions.filter(dim => {
      const matchesSearch = dim.name.toLowerCase().includes(dimensionSearch.toLowerCase());
      const matchesFilter = dimensionFilter === 'All' || 
                           (dimensionFilter === 'Missing' && dim.status === 'Missing') ||
                           (dimensionFilter === 'Partial' && dim.status === 'Partially Defined') ||
                           (dimensionFilter === 'Defined' && dim.status === 'Defined');
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Top Navigation Area - LOCKED SECTION */}
        <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={() => setCurrentStep('define-role')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back
              </button>
              
              {/* Compact Stepper */}
              <div className="flex items-center gap-6">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      step.id === 2 
                        ? 'bg-[#002A54] text-white shadow-md shadow-blue-900/10 ring-4 ring-blue-50' 
                        : step.id < 2 ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                      {step.id < 2 ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      step.id === 2 ? 'text-[#002A54]' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    {step.id < 5 && <div className="w-3 h-px bg-slate-100 ml-1" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto px-3 py-10">
            {/* A) BODY HEADER AREA */}
            <div className="flex items-start justify-between mb-10">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">Review & Refine Role Requirements</h1>
                <p className="text-slate-500 text-sm">
                  Complete missing role details and prioritize what matters for better ranked results.
                </p>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-end cursor-help">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Role Definition Coverage</div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-3 h-5 rounded-sm ${i <= 4 ? 'bg-[#005AB5]' : 'bg-slate-200'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-[#002A54]">Well-defined</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[240px]">
                    <p>Based on clarity across system scope, delivery phases, and experience expectations.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* B) 2-COLUMN MAIN AREA */}
            <div className="grid grid-cols-[32%_1fr] gap-8 items-start">
              
              {/* LEFT STICKY RAIL CARDS */}
              <aside className="space-y-6 sticky top-0">
                {/* 1. Current Role Snapshot */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-[11px] font-black text-[#002A54] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-3.5 h-3.5" />
                    Current Role Snapshot
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Role Title</p>
                      <p className="text-sm font-bold text-slate-900 leading-tight">SAP EWM Functional Consultant</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary SAP Modules</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className="bg-blue-50 text-[#005AB5] border-transparent font-bold">SAP EWM</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Key inferred requirements</p>
                      <ul className="space-y-2">
                        {['S/4HANA environment', 'Greenfield implementation', 'Integration exposure'].map((req, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <div className="w-1.5 h-1.5 bg-[#005AB5] rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2. Requirement Completion */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-[11px] font-black text-[#002A54] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ClipboardList className="w-3.5 h-3.5" />
                    Requirement Completion
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Total</p>
                        <p className="text-xl font-black text-slate-900">9</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase mb-0.5">Defined</p>
                        <p className="text-xl font-black text-emerald-600">3</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-amber-500 uppercase mb-0.5">Partial</p>
                        <p className="text-xl font-black text-amber-600">2</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-300 uppercase mb-0.5">Missing</p>
                        <p className="text-xl font-black text-slate-300">4</p>
                      </div>
                    </div>
                    <div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                        <div className="h-full bg-emerald-500" style={{ width: '33%' }} />
                        <div className="h-full bg-amber-400" style={{ width: '22%' }} />
                      </div>
                      <p className="text-[10px] text-slate-400 italic mt-2">Fill missing details or ignore to keep moving.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Snapshot Note */}
                <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <Info className="w-3.5 h-3.5 text-amber-600 mt-0.5" />
                  <p className="text-[10px] text-amber-800 leading-relaxed italic">
                    This snapshot is the baseline identity used for shortlisting. Refinements improve ranking quality.
                  </p>
                </div>
              </aside>

              {/* RIGHT CONTENT AREA */}
              <div className="space-y-12">
                
                {/* SECTION 1: Dimensions */}
                <section className="space-y-6">
                  <div className="flex items-end justify-between border-b border-slate-200 pb-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-900">Complete role dimensions from JD parsing</h2>
                      <p className="text-xs text-slate-500">Fill gaps only where needed. Ignore dimensions if not relevant.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{filteredDimensions.length} items found</p>
                      <div className="flex items-center gap-3">
                        <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-500">
                          <button 
                            onClick={() => setDimensionFilter('All')}
                            className={`px-3 py-1 rounded-md transition-all ${dimensionFilter === 'All' ? 'bg-white shadow-sm text-slate-900' : 'hover:text-slate-900'}`}
                          >
                            All
                          </button>
                          <button 
                            onClick={() => setDimensionFilter('Missing')}
                            className={`px-3 py-1 rounded-md transition-all ${dimensionFilter === 'Missing' ? 'bg-white shadow-sm text-slate-900' : 'hover:text-slate-900'}`}
                          >
                            Missing
                          </button>
                          <button 
                            onClick={() => setDimensionFilter('Partial')}
                            className={`px-3 py-1 rounded-md transition-all ${dimensionFilter === 'Partial' ? 'bg-white shadow-sm text-slate-900' : 'hover:text-slate-900'}`}
                          >
                            Partial
                          </button>
                          <button 
                            onClick={() => setDimensionFilter('Defined')}
                            className={`px-3 py-1 rounded-md transition-all ${dimensionFilter === 'Defined' ? 'bg-white shadow-sm text-slate-900' : 'hover:text-slate-900'}`}
                          >
                            Defined
                          </button>
                        </div>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            value={dimensionSearch}
                            onChange={(e) => setDimensionSearch(e.target.value)}
                            placeholder="Search dimension…" 
                            className="pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] focus:bg-white focus:outline-none w-48"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredDimensions.map((dim) => (
                      <div 
                        key={dim.id}
                        className={`border rounded-xl transition-all overflow-hidden ${
                          expandedDimension === dim.id ? 'border-[#005AB5] ring-1 ring-[#005AB5]/10' : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div 
                          onClick={() => setExpandedDimension(expandedDimension === dim.id ? null : dim.id)}
                          className="px-5 py-4 flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{dim.name}</span>
                              <Badge className={`text-[9px] px-2 py-0.5 uppercase tracking-wider font-black ${
                                dim.status === 'Defined' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                dim.status === 'Partially Defined' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                'bg-slate-50 text-slate-400 border-slate-100'
                              }`}>
                                {dim.status}
                              </Badge>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium italic">
                              {dim.extracted} extracted | {dim.missing} missing
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              {dim.tags.slice(0, 2).map((t, idx) => (
                                <div key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[9px] text-slate-500 font-bold">{t}</div>
                              ))}
                              {dim.tags.length > 2 && <div className="px-2 py-0.5 text-[9px] text-slate-400 font-bold">+{dim.tags.length - 2}</div>}
                            </div>
                            <button className="text-slate-400 group-hover:text-slate-600 transition-colors">
                              {expandedDimension === dim.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          {expandedDimension === dim.id && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-5 pb-5 border-t border-slate-100 bg-slate-50/30"
                            >
                              <div className="pt-5 space-y-6">
                                <div className="space-y-3">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Extracted from JD with Priority</p>
                                  <div className="flex flex-wrap gap-2">
                                    {dim.tags.map((tag, idx) => (
                                      <div key={idx} className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                        <span className="px-3 py-1.5 text-xs font-bold text-slate-700">{tag}</span>
                                        <div className="w-px h-4 bg-slate-200 self-center" />
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                                            setYoePopoverPos({ top: rect.bottom + 6, left: rect.left });
                                            const key = `${dim.id}-${tag}`;
                                            setOpenYoeKey(prev => prev === key ? null : key);
                                          }}
                                          className={`px-2 py-1.5 text-[10px] font-bold transition-colors whitespace-nowrap ${
                                            yoeValues[tag] != null
                                              ? 'text-[#005AB5] hover:text-[#003A8C]'
                                              : 'text-slate-400 hover:text-slate-600'
                                          }`}
                                        >
                                          {yoeValues[tag] != null ? `${yoeValues[tag]}y+` : 'Add yrs'}
                                        </button>
                                        {openYoeKey === `${dim.id}-${tag}` && createPortal(
                                          <>
                                            <div
                                              className="fixed inset-0 z-40"
                                              onClick={() => setOpenYoeKey(null)}
                                            />
                                            <div
                                              className="fixed z-50 bg-white border border-slate-200 rounded-xl shadow-xl p-4 w-44"
                                              style={{ top: yoePopoverPos.top, left: yoePopoverPos.left }}
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Min. Years</p>
                                              <div className="flex items-center gap-2 mb-3">
                                                <button
                                                  onClick={() => setYoeValues(prev => ({ ...prev, [tag]: Math.max(0, (prev[tag] ?? 0) - 1) }))}
                                                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 font-bold text-sm"
                                                >−</button>
                                                <span className="text-sm font-bold text-slate-900 w-8 text-center">{yoeValues[tag] ?? 0}</span>
                                                <button
                                                  onClick={() => setYoeValues(prev => ({ ...prev, [tag]: (prev[tag] ?? 0) + 1 }))}
                                                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 font-bold text-sm"
                                                >+</button>
                                              </div>
                                              <button
                                                onClick={() => { setYoeValues(prev => { const next = { ...prev }; delete next[tag]; return next; }); setOpenYoeKey(null); }}
                                                className="text-[10px] text-slate-400 hover:text-red-500 font-bold transition-colors"
                                              >
                                                Clear
                                              </button>
                                            </div>
                                          </>,
                                          document.body
                                        )}
                                      </div>
                                    ))}
                                    <div className="flex items-center bg-white border border-dashed border-slate-300 rounded-lg px-3 py-1.5 text-slate-400 hover:border-slate-400 cursor-pointer">
                                      <Plus className="w-3 h-3 mr-2" />
                                      <span className="text-xs font-medium">Add item…</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested Quick Tags</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {['Embedded EWM', 'Decentral EWM', 'Brownfield', 'MFS integration', 'RF Scanning'].map((tag) => (
                                      <button key={tag} className="px-3 py-1 rounded-full border border-slate-200 bg-white text-[11px] font-medium text-slate-600 hover:border-[#005AB5] hover:text-[#005AB5] transition-all">
                                        + {tag}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                                  <div className="flex items-center gap-3">
                                    <button className="px-4 py-2 bg-[#002A54] text-white rounded-lg text-xs font-bold hover:bg-[#003A70] transition-all">
                                      Apply updates to role
                                    </button>
                                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
                                      Reset edits
                                    </button>
                                  </div>
                                  <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">
                                    Ignore dimension
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar - LOCKED SECTION */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-10 py-5 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <AnimatePresence>
                {showConfirmation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 text-emerald-600 text-sm font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Refinement applied · Evaluation precision improved
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex flex-col">
                <p className="text-[12px] text-slate-400 italic">These refinements improve evaluation accuracy without locking you into rigid criteria.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
                            <button 
                onClick={() => { setCurrentStep('validate-requirements'); }}
                className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
              >
                Skip Refinement
              </button>
                            <button 
                onClick={() => { setCurrentStep('validate-requirements'); }}
                className="px-10 py-3.5 bg-[#002A54] hover:bg-[#003A70] text-white rounded-lg font-bold text-base transition-all flex items-center gap-2 shadow-sm active:scale-[0.98]"
              >
                Configure Evaluation Strategy
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (currentStep === 'validate-requirements') {
    const steps = [
      { id: 1, label: 'Define Role' },
      { id: 2, label: 'Refine Requirements' },
      { id: 3, label: 'Configure Evaluation Strategy' },
      { id: 4, label: 'Add candidates' },
      { id: 5, label: 'View Results' }
    ];

    return (
      <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Top Navigation Area */}
        <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={() => setCurrentStep('enrich-role')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back
              </button>
              
              {/* Compact Stepper */}
              <div className="flex items-center gap-6">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      step.id === 3 
                        ? 'bg-[#002A54] text-white shadow-md shadow-blue-900/10 ring-4 ring-blue-50' 
                        : step.id < 3 ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                      {step.id < 3 ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      step.id === 3 ? 'text-[#002A54]' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    {step.id < 5 && <div className="w-3 h-px bg-slate-100 ml-1" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold text-slate-900">Configure Evaluation Strategy</h1>
              <p className="text-slate-500 text-sm">Adjust how the system evaluates candidates. Set criticality and relative weights for each requirement.</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-8">
            
            {/* Section 1: Pick a strategy Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="space-y-1 mb-5">
                <h3 className="text-base font-bold text-slate-900">Pick a strategy</h3>
                <p className="text-xs text-slate-500">AI presets are tuned for this role. Most users pick Recommended and continue. Custom gives full control.</p>
              </div>

              {/* 5 Strategy Cards in a Row */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {[
                  { id: 'balanced', label: 'Balanced', subtitle: 'Best fit for this role. AI-optimised.', recommended: true },
                  { id: 'delivery', label: 'Delivery-first', subtitle: 'Phases, deployment, stabilisation.', recommended: false },
                  { id: 'integration', label: 'Integration-heavy', subtitle: 'Interfaces, cross-system proof, WRICEF.', recommended: false },
                  { id: 'specialist', label: 'Module specialist', subtitle: 'Deep module and process mastery.', recommended: false },
                  { id: 'custom', label: 'Custom', subtitle: 'Set your own priorities. Full control.', recommended: false, icon: true },
                ].map((strat) => (
                  <div 
                    key={strat.id}
                    onClick={() => {
                      setSelectedStrategy(strat.id as typeof selectedStrategy);
                      if (strat.id !== 'custom') {
                        applyPreset(strat.id as 'balanced' | 'delivery' | 'integration' | 'specialist');
                      }
                    }}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-slate-300 ${
                      selectedStrategy === strat.id ? 'border-[#002A54] bg-blue-50/20' : 'border-slate-200'
                    }`}
                  >
                    {strat.recommended && (
                      <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <span>★</span> RECOMMENDED
                      </div>
                    )}
                    {selectedStrategy === strat.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#002A54] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {strat.icon && !strat.recommended && (
                      <div className="absolute top-2 left-2">
                        <Edit3 className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                    <div className="space-y-1 mt-6">
                      <div className="text-sm font-bold text-slate-900">{strat.label}</div>
                      <div className="text-xs text-slate-500 leading-snug">{strat.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 2: Weight Distribution Preview (only when preset is selected) */}
              {selectedStrategy !== 'custom' && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      WEIGHT DISTRIBUTION — {selectedStrategy.toUpperCase()}
                    </span>
                    <button 
                      onClick={() => setSelectedStrategy('custom')}
                      className="text-xs font-bold text-[#005AB5] hover:underline flex items-center gap-1"
                    >
                      Fine-tune →
                    </button>
                  </div>

                  {/* 3x3 Weight Bar Grid */}
                  <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                    {strategyCriteria.map((criterion) => {
                      const isExcluded = excludedCriteria.includes(criterion.id);
                      return (
                        <div key={criterion.id} className="space-y-1.5">
                          <div className="text-xs font-medium text-slate-600">{criterion.name}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#002A54] rounded-full transition-all"
                                style={{ width: `${isExcluded ? 0 : criterion.weight}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-600 w-8 text-right">
                              {isExcluded ? 0 : criterion.weight}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Criteria Priority Matrix (only when Custom is selected) */}
            {selectedStrategy === 'custom' && (
              <div className="space-y-4">
                {/* Matrix Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Criteria Priority Matrix</h3>
                    <p className="text-sm text-slate-500">Click a criterion name to exclude it. Set priority with the dots — drag to reorder sub-criteria.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-black ${isBalanced ? 'text-emerald-600' : 'text-slate-900'}`}>
                      Allocated {totalWeight}%
                    </span>
                    {isBalanced && (
                      <span className="text-xs font-black uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                        ✓ BALANCED
                      </span>
                    )}
                  </div>
                </div>

                {/* 9 Criterion Cards */}
                <div className="space-y-3">
                  {strategyCriteria.map((criterion) => {
                    const isExpanded = expandedCriteria.includes(criterion.id);
                    const isExcluded = excludedCriteria.includes(criterion.id);
                    
                    return (
                      <div 
                        key={criterion.id}
                        className={`bg-white rounded-xl border border-slate-200 p-5 transition-all ${
                          isExcluded ? 'opacity-35' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {/* Left: Criterion Name & Description */}
                          <div className="flex-1">
                            <button
                              onClick={() => toggleCriterion(criterion.id)}
                              className={`text-base font-bold text-slate-900 hover:text-[#005AB5] transition-colors ${
                                isExcluded ? 'line-through' : ''
                              }`}
                            >
                              {criterion.name}
                            </button>
                            <p className="text-xs text-slate-500 mt-0.5">{criterion.description}</p>
                          </div>

                          {/* Right: Dots + Weight + Expand */}
                          <div className="flex items-center gap-4">
                            {/* 5-dot dial */}
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((dotNum) => {
                                const isFilled = dotNum <= criterion.dots;
                                const isRed = dotNum <= 2;
                                return (
                                  <button
                                    key={dotNum}
                                    onClick={() => !isExcluded && updateDots(criterion.id, dotNum)}
                                    disabled={isExcluded}
                                    className={`w-3 h-3 rounded-full border-2 transition-all ${
                                      isFilled 
                                        ? (isRed ? 'bg-red-500 border-red-500' : 'bg-[#002A54] border-[#002A54]')
                                        : 'bg-transparent border-slate-300'
                                    } ${isExcluded ? 'opacity-30 cursor-not-allowed' : 'hover:border-slate-400 cursor-pointer'}`}
                                  />
                                );
                              })}
                            </div>

                            {/* Weight */}
                            <span className="text-sm font-bold text-slate-900 w-10 text-right">
                              {isExcluded ? 0 : criterion.weight}%
                            </span>

                            {/* Expand control (only if subCount > 0) */}
                            {criterion.subCount > 0 && (
                              <button
                                onClick={() => toggleExpanded(criterion.id)}
                                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                              >
                                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">
                                  {criterion.subCount}
                                </span>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Sub-criteria Expanded Panel */}
                        {isExpanded && criterion.subCount > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/30 -mx-5 -mb-5 px-5 py-4 rounded-b-xl">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                SUB-CRITERIA — DRAG TO REPRIORITISE
                              </span>
                              <span className="text-xs italic text-slate-400">
                                Order determines contribution within {criterion.name}
                              </span>
                            </div>

                            {/* Sub-criteria with drag-and-drop */}
                            {subCriteria[criterion.id] && (
                              <div className="space-y-2">
                                {subCriteria[criterion.id].map((sub, index) => (
                                  <DraggableSubCriterion
                                    key={sub.id}
                                    sub={sub}
                                    index={index}
                                    criterionId={criterion.id}
                                    moveSubCriterion={moveSubCriterion}
                                  />
                                ))}
                              </div>
                            )}

                            <div className="flex items-start gap-2 mt-3 pt-3 border-t border-slate-200">
                              <Info className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                              <p className="text-xs italic text-slate-400">
                                Position 1 carries most weight within {criterion.name} — drag to reorder by importance.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section 4: Bottom Utility Strip */}
            <div className="bg-white rounded-2xl border border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch 
                  checked={autoBalance} 
                  onCheckedChange={setAutoBalance}
                  disabled={isStrategyLocked}
                />
                <span className="text-sm font-medium text-slate-700">
                  Auto-balance — weights recalculate as you adjust priority
                </span>
              </div>

              <button 
                onClick={() => setIsStrategyLocked(!isStrategyLocked)}
                className="px-6 py-2.5 bg-[#002A54] text-white rounded-lg font-bold text-sm transition-all hover:bg-[#003A70] flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Lock strategy
              </button>
            </div>

          </div>
        </div>

        {/* Footer section - LOCKED SECTION */}
        <div className="bg-white border-t border-slate-200 px-10 py-5 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <p className="text-xs italic text-slate-400">
              {selectedStrategy === 'custom' ? 'Custom mode — set priority with the dots.' : 'Strategy set — ready to rank candidates.'}
            </p>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentStep('enrich-role')}
                className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all"
              >
                Back
              </button>
              <button 
                onClick={() => { setCurrentStep('add-candidates'); }}
                disabled={totalWeight !== 100}
                className={`px-12 py-3.5 bg-[#002A54] text-white rounded-lg font-bold text-base transition-all flex items-center gap-2 shadow-sm active:scale-[0.98] ${totalWeight !== 100 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#003A70]'}`}
              >
                Continue to Add Candidates
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      </DndProvider>
    );
  }

  if (currentStep === 'add-candidates') {
    const steps = [
      { id: 1, label: 'Define Role' },
      { id: 2, label: 'Refine Requirements' },
      { id: 3, label: 'Configure Evaluation Strategy' },
      { id: 4, label: 'Add candidates' },
      { id: 5, label: 'View Results' }
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Top Navigation Area */}
        <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={() => setCurrentStep('validate-requirements')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back
              </button>
              
              {/* Compact Stepper */}
              <div className="flex items-center gap-6">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      step.id === 4 
                        ? 'bg-[#002A54] text-white shadow-md shadow-blue-900/10 ring-4 ring-blue-50' 
                        : step.id < 4 ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                      {step.id < 4 ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      step.id === 4 ? 'text-[#002A54]' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    {step.id < 5 && <div className="w-3 h-px bg-slate-100 ml-1" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold text-slate-900">Add Candidates for Evaluation</h1>
              <p className="text-slate-500 text-sm">Select where candidates should come from. You can combine sources.</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-10 py-12 space-y-12">
            
            {/* Source Selection Cards */}
            <div className="grid grid-cols-3 gap-8">
              {/* Source 1: DeepSAP Talent Cloud */}
              <div 
                onClick={() => toggleSource('cloud')}
                className={`bg-white p-8 rounded-[32px] border-2 transition-all cursor-pointer relative group flex flex-col h-full order-last ${
                  activeSources.includes('cloud') 
                    ? 'border-[#005AB5] shadow-xl ring-1 ring-[#005AB5]/10 bg-blue-50/10' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Optional badge */}
                <span className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                  Optional
                </span>

                <div className="flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                    activeSources.includes('cloud') ? 'bg-[#005AB5] text-white' : 'bg-blue-50 text-[#005AB5]'
                  }`}>
                    <Cloud className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">DeepSAP Talent Cloud</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Search and evaluate pre-vetted SAP consultants with delivery and availability signals.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Pre-vetted profiles', 'Delivery history', 'Availability indicators'].map(signal => (
                      <span key={signal} className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeSources.includes('cloud') 
                    ? 'bg-[#002A54] text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 group-hover:bg-slate-50'
                }`}>
                  {activeSources.includes('cloud') ? <Check className="w-4 h-4" /> : null}
                  Browse Talent Cloud
                </button>
              </div>

              {/* Source 2: Upload */}
              <div 
                onClick={() => toggleSource('upload')}
                className={`bg-white p-8 rounded-[32px] border-2 transition-all cursor-pointer relative group flex flex-col h-full ${
                  activeSources.includes('upload') 
                    ? 'border-[#005AB5] shadow-xl ring-1 ring-[#005AB5]/10 bg-blue-50/10' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                    activeSources.includes('upload') ? 'bg-[#005AB5] text-white' : 'bg-blue-50 text-[#005AB5]'
                  }`}>
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Upload Candidate Profiles</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Upload resumes from your internal pipeline or recent applicants.
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Single or bulk upload
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ZIP supported
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    activeSources.includes('upload') 
                      ? 'bg-[#002A54] text-white' 
                      : 'bg-white border border-slate-200 text-slate-600 group-hover:bg-slate-50'
                  }`}>
                    {activeSources.includes('upload') ? <Check className="w-4 h-4" /> : null}
                    Upload Resumes
                  </button>
                  <p className="text-[10px] text-slate-400 italic text-center">Uploaded profiles remain in your private workspace.</p>
                </div>
              </div>

              {/* Source 3: Saved */}
              <div 
                onClick={() => toggleSource('saved')}
                className={`bg-white p-8 rounded-[32px] border-2 transition-all cursor-pointer relative group flex flex-col h-full ${
                  activeSources.includes('saved') 
                    ? 'border-[#005AB5] shadow-xl ring-1 ring-[#005AB5]/10 bg-blue-50/10' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                    activeSources.includes('saved') ? 'bg-[#005AB5] text-white' : 'bg-blue-50 text-[#005AB5]'
                  }`}>
                    <Database className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Your Saved Profiles</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Use candidates you’ve already uploaded or reviewed earlier.
                  </p>
                </div>

                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-8 ${
                  activeSources.includes('saved') 
                    ? 'bg-[#002A54] text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 group-hover:bg-slate-50'
                }`}>
                  {activeSources.includes('saved') ? <Check className="w-4 h-4" /> : null}
                  Select from Workspace
                </button>
              </div>
            </div>

            {/* PROGRESSIVE DISCLOSURE PANELS */}
            <AnimatePresence>
              {activeSources.length > 0 && (
                <div className="space-y-8">
                  {activeSources.includes('cloud') && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-lg"
                    >
                      <div className="px-10 py-8 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <h4 className="font-bold text-slate-900">Search DeepSAP Talent Cloud</h4>
                          <div className="flex gap-2">
                            {['SAP EWM', 'S/4HANA', 'Integration-heavy', 'Availability: 2–4 weeks'].map(chip => (
                              <Badge key={chip} variant="secondary" className="bg-white border-slate-200 text-slate-500 font-bold text-[10px] uppercase px-2 py-0.5">
                                {chip}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Search className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="p-10">
                        <div className="grid grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[3/4] rounded-2xl bg-slate-50 animate-pulse border border-slate-100 flex flex-col p-4">
                              <div className="w-12 h-12 bg-white rounded-full mb-4" />
                              <div className="h-4 w-2/3 bg-white rounded mb-2" />
                              <div className="h-3 w-1/2 bg-white rounded" />
                              <div className="mt-auto h-8 w-full bg-white rounded-lg" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSources.includes('upload') && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-lg"
                    >
                      <div 
                        onClick={() => {
                          setIsUploading(true);
                          setTimeout(() => {
                            setUploadCount(12);
                            setIsUploading(false);
                          }, 2000);
                        }}
                        className={`border-2 border-dashed rounded-[24px] py-16 flex flex-col items-center justify-center transition-all ${
                          uploadCount > 0 ? 'bg-emerald-50/30 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isUploading ? (
                          <div className="text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-[#002A54] border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="font-bold text-slate-600">Analyzing profiles...</p>
                          </div>
                        ) : uploadCount > 0 ? (
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                              <Check className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xl font-bold text-slate-900">✔ {uploadCount} profiles uploaded</p>
                              <p className="text-sm text-slate-500 font-medium">Resume Intelligence will be generated automatically</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                              <Upload className="w-7 h-7 text-[#005AB5]" />
                            </div>
                            <p className="text-lg font-bold text-slate-900 mb-2">Drag & drop resumes here</p>
                            <p className="text-sm text-slate-500 font-medium mb-8 text-center max-w-md">
                              We’ll extract skills, delivery history, and project context to align with your requirements.
                            </p>
                            <button className="px-8 py-3 bg-[#002A54] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all">
                              Select Files
                            </button>
                            <p className="text-xs text-slate-400 mt-6 font-medium">Accepts PDF, DOCX, and ZIP files</p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeSources.includes('saved') && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-lg space-y-8"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-lg">Select from Workspace</h4>
                        <span className="text-xs font-bold text-slate-400">{selectedSavedProfiles.length} of {savedProfiles.length} selected</span>
                      </div>
                      <div className="grid gap-3">
                        {savedProfiles.map(profile => (
                          <div 
                            key={profile.id}
                            onClick={() => setSelectedSavedProfiles(prev => 
                              prev.includes(profile.name) ? prev.filter(n => n !== profile.name) : [...prev, profile.name]
                            )}
                            className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              selectedSavedProfiles.includes(profile.name) 
                                ? 'bg-blue-50 border-[#005AB5] ring-1 ring-[#005AB5]/10' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                selectedSavedProfiles.includes(profile.name) 
                                  ? 'bg-[#002A54] border-[#002A54]' 
                                  : 'border-slate-300'
                              }`}>
                                {selectedSavedProfiles.includes(profile.name) && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900">{profile.name} — {profile.role}</span>
                                <span className="text-xs text-slate-400 font-medium italic">({profile.context})</span>
                              </div>
                            </div>
                            {selectedSavedProfiles.includes(profile.name) && (
                              <Badge className="bg-[#005AB5]/10 text-[#005AB5] border-none font-black text-[10px] uppercase">
                                Selected
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <button className="px-10 py-3 bg-[#002A54] text-white rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all">
                          Add selected profiles
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>

            {/* RANKING SCOPE SECTION */}
            <div className="space-y-8 pt-8 border-t border-slate-200">




              {/* Trust & Readiness Summary Strip */}
              <div className="bg-slate-100/50 rounded-2xl px-8 py-4 flex items-center justify-center gap-10 text-xs font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900">Profiles added:</span>
                  <span className="text-[#005AB5]">38</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="flex items-center gap-2">
                  <span className="text-slate-900">Delivery-ready signals available:</span>
                  <span className="text-[#005AB5]">22</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <div className="flex items-center gap-2">
                  <span className="text-slate-900">Availability known:</span>
                  <span className="text-[#005AB5]">15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="bg-white border-t border-slate-200 px-10 py-5 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] shrink-0">
          <div className="max-w-[1400px] mx-auto flex items-center justify-end gap-3">
            <button 
              onClick={() => setCurrentStep('validate-requirements')}
              className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all"
            >
              Back to Validation
            </button>
            <button 
              onClick={onShortlist}
              className="px-12 py-3.5 bg-[#002A54] text-white rounded-lg font-bold text-base transition-all flex items-center gap-2 hover:bg-[#003A70] shadow-sm active:scale-[0.98]"
            >
              View Ranked Results
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'view-results') {
    const steps = [
      { id: 1, label: 'Define Role' },
      { id: 2, label: 'Refine Requirements' },
      { id: 3, label: 'Configure Evaluation Strategy' },
      { id: 4, label: 'Add candidates' },
      { id: 5, label: 'View Results' }
    ];

    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Top Navigation Area */}
        <div className="px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={() => setCurrentStep('add-candidates')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back
              </button>
              
              {/* Compact Stepper */}
              <div className="flex items-center gap-6">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      step.id === 5 
                        ? 'bg-[#002A54] text-white shadow-md shadow-blue-900/10 ring-4 ring-blue-50' 
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {step.id < 5 ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      step.id === 5 ? 'text-[#002A54]' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    {step.id < 5 && <div className="w-3 h-px bg-slate-100 ml-1" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h1 className="text-2xl font-bold text-slate-900">Ranked Results</h1>
                <p className="text-slate-500 text-sm">Profiles ranked based on your validated delivery criteria</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#005AB5]" />
                <span className="text-[10px] font-black text-[#002A54] uppercase tracking-widest">
                  Ranked using locked delivery anchors
                </span>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                  <button className="text-[10px] font-bold text-[#005AB5] uppercase hover:underline">View locked criteria</button>
                  <button className="text-[10px] font-bold text-[#005AB5] uppercase hover:underline">View evaluation logic</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-[1440px] mx-auto h-full grid grid-cols-[minmax(320px,35%)_1fr] gap-0">
            
            {/* LEFT PANEL: Decision Layers */}
            <aside className="border-r border-slate-200 bg-white p-8 overflow-y-auto">
              <div className="space-y-10">
                {/* Section 1: Decision Anchors */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Decision Anchors (Locked)</h2>
                      <p className="text-xs text-slate-500 font-medium">These define eligibility and delivery fit</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-slate-300 hover:text-slate-500">
                            <Info className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Defined during requirement validation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="grid gap-3">
                    <div className="p-5 rounded-2xl bg-slate-50 border-l-4 border-l-[#002A54] border border-slate-100 flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900">System Experience</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Must-have: S/4HANA</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Influence</span>
                          <span className="text-xs font-black text-[#002A54]">High</span>
                        </div>
                        <Lock className="w-4 h-4 text-[#002A54]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Tuning Levers */}
                <div className="pt-10 border-t border-slate-100">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Tuning Levers (Adjustable)</h2>
                    <p className="text-xs text-slate-500 font-medium">Fine-tune ranking without changing eligibility</p>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">Integration Experience</span>
                        <span className="text-xs font-black text-[#005AB5]">35%</span>
                      </div>
                      <Slider defaultValue={[35]} max={100} step={1} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">Project Phases</span>
                        <span className="text-xs font-black text-[#005AB5]">25%</span>
                      </div>
                      <Slider defaultValue={[25]} max={100} step={1} />
                    </div>
                  </div>
                </div>

                {/* Section 3: Delivery Lens */}
                <div className="pt-10 border-t border-slate-100">
                  <div className="p-6 bg-[#002A54]/5 rounded-2xl border border-[#002A54]/10 space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#002A54]" />
                      <span className="text-xs font-black text-[#002A54] uppercase tracking-widest">Delivery Lens Insight</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                      This ranking favors candidates with strong S/4HANA implementation ownership and deep integration exposure.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL: Ranked Profiles */}
            <main className="bg-[#F8FAFC] p-8 overflow-y-auto">
              <div className="space-y-8">
                {/* Ranking Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Ranking Stability: High</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-emerald-400">
                              <Info className="w-3 h-3" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Rankings are stable because key delivery criteria are locked.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400">Show Top</span>
                      <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
                        {['1', '10', '25'].map(n => (
                          <button key={n} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${n === '10' ? 'bg-[#002A54] text-white' : 'text-slate-400 hover:text-slate-600'}`}>{n}</button>
                        ))}
                      </div>
                    </div>
                    <Select defaultValue="overall">
                      <SelectTrigger className="w-[180px] h-9 bg-white text-[11px] font-bold">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overall">Best Overall Fit</SelectItem>
                        <SelectItem value="confidence">Highest Confidence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Profile List */}
                <div className="space-y-4">
                  {rankedCandidates.map((candidate, idx) => (
                    <motion.div 
                      key={candidate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8 hover:border-[#005AB5]/30 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-xl">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{candidate.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-blue-50 text-[#005AB5] border-none font-bold text-[10px] uppercase">
                                {candidate.module}
                              </Badge>
                              {candidate.readinessAvailable && (
                                <div className="flex items-center gap-1 text-emerald-600">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Delivery readiness available</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-black text-[#002A54] leading-none">{candidate.overallFit}%</span>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Overall Fit</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Index</span>
                            <span className="text-xs font-black text-[#002A54]">{candidate.trustIndex}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Confidence</span>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${candidate.deliveryConfidence === 'High' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                              <span className="text-xs font-black text-[#002A54]">{candidate.deliveryConfidence}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/50">
                            <button className="flex items-center justify-between w-full group/acc">
                              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Why this is a good fit</span>
                              <Plus className="w-3.5 h-3.5 text-emerald-600" />
                            </button>
                            <ul className="mt-3 space-y-2">
                              {candidate.whyFit.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-emerald-800 font-medium">
                                  <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#005AB5] transition-colors">
                                  What would change this ranking?
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Reducing integration weight or unlocking S/4HANA would raise this profile’s rank.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setCurrentStep('resume-summary')}
                            className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                          >
                            View Resume Intelligence
                          </button>
                          <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">View Precision Match</button>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-5 py-2.5 bg-white border border-slate-200 text-[#002A54] rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Check Availability</button>
                          <button className="px-5 py-2.5 bg-[#002A54] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-[#003A70] transition-all">Check Delivery Readiness</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="bg-white border-t border-slate-200 px-10 py-5 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] shrink-0">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-[11px] font-black text-[#002A54] uppercase tracking-widest">Shortlist Confidence: <span className="text-emerald-500">High</span></span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-slate-300">
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Confidence reflects clarity of role definition and ranking stability.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentStep('add-candidates')}
                className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all"
              >
                Back to Add Candidates
              </button>
              <button 
                onClick={onShortlist}
                className="px-12 py-3.5 bg-[#002A54] text-white rounded-lg font-bold text-base transition-all flex items-center gap-2 hover:bg-[#003A70] shadow-sm active:scale-[0.98]"
              >
                Proceed with Shortlist
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESUME MD DASHBOARD (SUMMARY)
  if (currentStep === 'resume-summary') {
    const [activeSection, setActiveSection] = useState('overview');
    const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);
    const [expandedSkillMap, setExpandedSkillMap] = useState(false);

    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Top Bar */}
        <div className="px-7 py-4 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentStep('view-results')}
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
          <div className="space-y-3">
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
        </div>

        {/* Body Layout */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Left Panel (Sticky) */}
            <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto shrink-0">
              <div className="p-4 space-y-4">
                {/* Quick Actions Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</p>
                  <button 
                    onClick={() => setCurrentStep('resume-project-details')}
                    className="w-full px-3 py-2 bg-[#002A54] text-white rounded-lg text-xs font-bold hover:bg-[#003A70] transition-all"
                  >
                    Open Project Details
                  </button>
                </div>

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
                  <button 
                    onClick={() => setCurrentStep('resume-project-details')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 border-t border-slate-100 mt-2 pt-3"
                  >
                    Project Details →
                  </button>
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

  // RESUME MD DASHBOARD (PROJECT DETAILS)
  if (currentStep === 'resume-project-details') {
    const [selectedProject, setSelectedProject] = useState('project1');

    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Top Bar */}
        <div className="px-7 py-4 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentStep('resume-summary')}
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


  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Top Navigation Bar (Within Content) */}
      <div className="px-8 py-5 border-b border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back
            </button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => setCurrentStep('define-role')}
                    className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E8532F] to-[#D84315] text-white rounded-lg hover:from-[#D84315] hover:to-[#BF360C] transition-all text-[11px] font-black uppercase tracking-widest group active:scale-[0.98] overflow-hidden"
                  >
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md opacity-0 group-hover:opacity-100 animate-[shimmer_2.5s_linear_infinite] pointer-events-none"></span>
                    <span className="relative z-10">ADVANCED SHORTLISTING</span>
                    <ChevronRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px]">
                  <p>Review and fine-tune how candidates are evaluated across systems, integrations, and delivery phases.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-5 space-y-0.5">
            <h1 className="text-2xl font-bold text-slate-900">Quick Shortlisting</h1>
            <p className="text-slate-500 text-sm">
              Shortlist candidates using JD-driven, explainable evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-[1200px] mx-auto px-3 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN: Role Definition */}
            <div className="space-y-8">
              {/* Quick Role Details */}
              <div className="bg-white p-8 rounded-[12px] border border-slate-200 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">Quick Role Details</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    These details define how candidates are evaluated.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="role-title">Role Title*</Label>
                    <Input 
                      id="role-title" 
                      placeholder="e.g. SAP TM Functional Consultant"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sap-module">Primary SAP Module*</Label>
                    <Input 
                      id="sap-module" 
                      placeholder="e.g. SAP TM"
                      value={sapModule}
                      onChange={(e) => setSapModule(e.target.value)}
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-11"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Type*</Label>
                      <Select onValueChange={setProjectType} value={projectType}>
                        <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="greenfield">Greenfield</SelectItem>
                          <SelectItem value="rollout">Rollout</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="upgrade">Upgrade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Engagement Type*</Label>
                      <Select onValueChange={setEngagementType} value={engagementType}>
                        <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">Onsite</SelectItem>
                          <SelectItem value="offshore">Offshore</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Years of Experience*</Label>
                    <Select onValueChange={setYearsExp} value={yearsExp}>
                      <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-5">3–5 years</SelectItem>
                        <SelectItem value="5-8">5–8 years</SelectItem>
                        <SelectItem value="8+">8+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Job Description Accordion */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setIsJdExpanded(!isJdExpanded)}
                      className="w-full flex items-center justify-between py-3 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-900">Job Description (Optional)</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isJdExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isJdExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-4">
                            <p className="text-slate-500 text-xs">
                              Uploading a JD improves match accuracy and enables deeper validation.
                            </p>
                            
                            <div className="flex gap-3">
                              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                <Upload className="w-4 h-4" />
                                Upload JD
                              </button>
                              {jdText && (
                                <button 
                                  onClick={() => setJdText('')}
                                  className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors text-sm px-2"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                            
                            <textarea
                              value={jdText}
                              onChange={(e) => setJdText(e.target.value)}
                              placeholder="Paste job description here..."
                              className="w-full min-h-[160px] p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005AB5]/20 focus:border-[#005AB5] transition-all resize-none"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Job Description (Optional) - REMOVE THIS SECTION */}
            </div>

            {/* RIGHT COLUMN: Add Candidates */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[12px] border border-slate-200 shadow-sm h-full">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">Upload Resumes</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Add the candidates you want to evaluate for this role.
                  </p>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center gap-3 hover:border-[#005AB5] hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#005AB5] group-hover:bg-blue-50 transition-all">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-900">Drag and drop resumes</p>
                    <p className="text-xs text-slate-500 mt-1">Multiple files allowed (PDF, DOCX)</p>
                  </div>
                  <button className="mt-2 text-[#005AB5] text-sm font-semibold hover:underline">
                    Browse files
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    onChange={handleFileUpload}
                    accept=".pdf,.docx"
                  />
                </div>

                {resumes.length > 0 && (
                  <div className="mt-8 space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Uploaded ({resumes.length})</p>
                    <div className="space-y-2">
                      {resumes.map((resume) => (
                        <div key={resume.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-[#005AB5]">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-sm font-medium text-slate-700 truncate">{resume.name}</p>
                              <p className="text-[11px] text-slate-400">{resume.size}</p>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeResume(resume.id); }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                      <Search className="w-4 h-4" />
                      Choose from uploaded profiles
                    </button>
                    
                    <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                      <Cloud className="w-4 h-4" />
                      Choose from DeepSAP Talent Cloud
                    </button>
                  </div>
                  
                  <div className="flex items-start gap-2 text-slate-400">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <p className="text-[12px] italic">
                      Resumes are analyzed individually and ranked automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-10 py-5 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">Your progress is saved automatically.</span>
          </div>
          
          <button 
            onClick={onShortlist}
            disabled={!isFormValid}
            className={`px-8 py-3.5 rounded-lg font-bold text-base transition-all flex items-center gap-2 shadow-sm ${
              isFormValid 
                ? 'bg-[#002A54] hover:bg-[#003A70] text-white cursor-pointer active:scale-[0.98]' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            View Results
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
