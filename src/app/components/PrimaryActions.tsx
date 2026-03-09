import React from 'react';
import { motion } from 'motion/react';
import { FileText, Users, Search, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';

interface ActionCardProps {
  title: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  icon: React.ReactNode;
  tag: string;
  onClick?: () => void;
}

function ActionCard({ title, description, primaryCTA, secondaryCTA, icon, tag, onClick }: ActionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      className="flex-1 bg-white p-8 rounded-[12px] border border-slate-200 shadow-sm transition-all duration-300 flex flex-col relative"
    >
      <div className="mb-6 w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">
        {icon}
      </div>
      
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[#005AB5] text-[11px] font-bold uppercase tracking-wider">
          {tag}
        </span>
      </div>
      <h2 className="text-[22px] font-semibold text-slate-900 mb-2">{title}</h2>
      <p className="text-[15px] text-slate-500 mb-8 leading-relaxed">
        {description}
      </p>

      <div className="mt-auto flex flex-col gap-4">
        <button 
          onClick={onClick}
          className="w-full py-3 px-4 rounded-md font-medium text-[15px] transition-colors shadow-sm bg-[#002A54] hover:bg-[#003A70] text-white cursor-pointer active:scale-[0.98]"
        >
          {primaryCTA}
        </button>
        
        <button 
          className="text-[14px] font-medium text-left flex items-center gap-1 transition-colors group text-slate-600 hover:text-slate-900"
        >
          {secondaryCTA}
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

interface PrimaryActionsProps {
  onShortlist: () => void;
  onDiscover: () => void;
  onAssess: () => void;
}

export function PrimaryActions({ onShortlist, onDiscover, onAssess }: PrimaryActionsProps) {
  const actions = [
    {
      title: "JD-Driven Precision Shortlisting",
      description: "Shortlist candidates using role-specific, explainable matching aligned to your job description and delivery expectations.",
      primaryCTA: "Shortlist Candidates",
      secondaryCTA: "Continue saved work",
      icon: <FileText className="w-6 h-6" />,
      tag: "Precision Shortlisting",
      onClick: onShortlist
    },
    {
      title: "Delivery-Ready SAP Talent",
      description: "Search SAP consultants validated for real project delivery across systems, phases, and integration complexity.",
      primaryCTA: "Discover Talent",
      secondaryCTA: "Continue saved work",
      icon: <Users className="w-6 h-6" />,
      tag: "Talent Discovery",
      onClick: onDiscover
    },
    {
      title: "S/4HANA Delivery Readiness",
      description: "Evaluate consultant readiness for S/4HANA implementations, upgrades, and transformation programs.",
      primaryCTA: "Assess Readiness",
      secondaryCTA: "Continue saved work",
      icon: <Search className="w-6 h-6" />,
      tag: "Readiness Assessment",
      onClick: onAssess
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <ActionCard key={index} {...action} />
      ))}
    </div>
  );
}
