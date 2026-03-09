import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FileSearch,
  Users, 
  Search, 
  UserSquare2,
  FileText,
  Star, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, isCollapsed, isActive = false, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group cursor-pointer
        ${isActive 
          ? 'bg-[#EBF1F7] text-[#002A54]' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#002A54]' : 'text-slate-400 group-hover:text-slate-600'}`} />
      {!isCollapsed && (
        <span className="text-[14px] font-medium whitespace-nowrap overflow-hidden text-left flex-1">
          {label}
        </span>
      )}
    </button>
  );
}

const Divider = () => <div className="h-px bg-slate-100 my-4 mx-2" />;

interface SidebarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(currentView !== 'home');

  useEffect(() => {
    setIsCollapsed(currentView !== 'home');
  }, [currentView]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '72px' : '240px' }}
      className="h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col z-50 transition-all duration-300"
    >
      {/* Brand / Logo Area */}
      <div className="h-[72px] flex items-center px-6 border-b border-slate-100">
        <div className="w-8 h-8 bg-[#002A54] rounded flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">SAP</span>
        </div>
        {!isCollapsed && (
          <span className="ml-3 font-semibold text-slate-800 text-[15px] truncate">
            DeepSAP
          </span>
        )}
      </div>

      <div className="flex-1 py-6 px-3 flex flex-col">
        <NavItem 
          icon={Home} 
          label="Home" 
          isCollapsed={isCollapsed} 
          isActive={currentView === 'home'} 
          onClick={() => onNavigate('home')}
        />
        
        <Divider />
        
        <div className="space-y-1">
          <NavItem 
            icon={FileSearch} 
            label="Precision Shortlisting" 
            isCollapsed={isCollapsed} 
            isActive={currentView === 'shortlisting' || currentView === 'results'}
            onClick={() => onNavigate('shortlisting')}
          />
          <NavItem 
            icon={Users} 
            label="SAP Talent Cloud" 
            isCollapsed={isCollapsed} 
            isActive={currentView === 'talent-cloud'}
            onClick={() => onNavigate('talent-cloud')}
          />
          <NavItem 
            icon={Search} 
            label="S/4HANA Readiness" 
            isCollapsed={isCollapsed} 
            isActive={currentView === 'readiness'}
            onClick={() => onNavigate('readiness')}
          />
        </div>

        <Divider />

        <div className="space-y-1">
          <NavItem icon={UserSquare2} label="Resumes" isCollapsed={isCollapsed} />
          <NavItem icon={FileText} label="Job Descriptions" isCollapsed={isCollapsed} />
        </div>

        <Divider />

        <div className="space-y-1">
          <NavItem icon={Star} label="Shortlists" isCollapsed={isCollapsed} />
          <NavItem icon={BarChart3} label="Reports" isCollapsed={isCollapsed} />
        </div>

        <div className="mt-auto">
          <Divider />
          <NavItem icon={Settings} label="Settings" isCollapsed={isCollapsed} />
        </div>
      </div>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-slate-100">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center h-10 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
