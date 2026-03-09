import React from 'react';
import { FileText, Users, Search, ArrowRight } from 'lucide-react';

interface WorkItem {
  type: 'Shortlisting' | 'Validation' | 'Readiness';
  title: string;
  subtitle: string;
  status: 'Draft' | 'Completed';
}

const recentItems: WorkItem[] = [
  {
    type: 'Shortlisting',
    title: 'Precision Shortlisting – SAP TM Functional Consultant',
    subtitle: 'Analyzed on Feb 3, 2026',
    status: 'Completed',
  },
  {
    type: 'Validation',
    title: 'Talent Discovery – SAP EWM Delivery Lead',
    subtitle: '12 profiles ranked for delivery readiness',
    status: 'Draft',
  },
  {
    type: 'Readiness',
    title: 'Readiness Assessment – S/4HANA Finance Transformation',
    subtitle: 'Saved criteria for Austin project',
    status: 'Completed',
  },
  {
    type: 'Shortlisting',
    title: 'Precision Shortlisting – SAP Basis Administrator',
    subtitle: 'Waiting for stakeholder feedback',
    status: 'Draft',
  },
];

const TypeBadge = ({ type }: { type: WorkItem['type'] }) => {
  const configs = {
    Shortlisting: { label: 'Shortlisting', bg: 'bg-blue-50', text: 'text-blue-700', icon: FileText },
    Validation: { label: 'Search', bg: 'bg-purple-50', text: 'text-purple-700', icon: Users },
    Readiness: { label: 'Readiness', bg: 'bg-amber-50', text: 'text-amber-700', icon: Search },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${config.bg} ${config.text} border border-current/10`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[12px] font-medium leading-none">{config.label}</span>
    </div>
  );
};

const StatusBadge = ({ status }: { status: WorkItem['status'] }) => {
  const isDraft = status === 'Draft';
  return (
    <span className={`text-[12px] font-medium px-2 py-0.5 rounded ${isDraft ? 'bg-slate-100 text-slate-600' : 'bg-green-50 text-green-700'}`}>
      {status}
    </span>
  );
};

export function RecentWork() {
  if (recentItems.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-[12px] p-12 text-center">
        <p className="text-slate-500 mb-4">
          You have no active projects yet. Start by shortlisting candidates or exploring delivery-ready SAP talent.
        </p>
        <div className="flex justify-center gap-4">
          <button className="text-[#002A54] font-medium text-[14px] hover:underline">ADVANCED SHORTLISTING</button>
          <div className="w-1 h-1 bg-slate-300 rounded-full mt-2" />
          <button className="text-[#002A54] font-medium text-[14px] hover:underline">Search Talent</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-[18px] font-semibold text-slate-900 mb-4">My Recent Work</h3>
      <div className="bg-white border border-slate-200 rounded-[12px] overflow-hidden shadow-sm">
        {recentItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer ${index !== recentItems.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <div className="flex items-center gap-6">
              <div className="w-24 flex-shrink-0">
                <TypeBadge type={item.type} />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-slate-900 leading-tight mb-0.5">{item.title}</h4>
                <p className="text-[13px] text-slate-500">{item.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <StatusBadge status={item.status} />
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-[#002A54] font-medium text-[14px] transition-colors group">
                Continue
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
