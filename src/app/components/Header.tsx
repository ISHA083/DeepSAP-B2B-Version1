import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  avatarUrl: string;
}

export function Header({ avatarUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto h-[72px] px-6 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-[20px] font-semibold text-slate-900 leading-tight">
            SAP Talent Intelligence Dashboard
          </h1>
          <p className="text-[14px] text-slate-500 font-normal">
            Plan, evaluate, and select SAP talent with clarity and confidence.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group">
            <span className="text-[14px] font-medium text-slate-700">Global Workspace</span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-2" />
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-sm">
              <ImageWithFallback
                src={avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
