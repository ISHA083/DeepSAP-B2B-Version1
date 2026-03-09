import React from 'react';

const shortcuts = [
  "View Resume Intelligence",
  "Upload resumes",
  "Review shortlists",
  "Talent Analytics",
  "System Settings"
];

export function SecondaryShortcuts() {
  return (
    <div className="flex items-center gap-8 py-4">
      {shortcuts.map((shortcut, index) => (
        <button 
          key={index}
          className="text-slate-400 hover:text-slate-600 text-[13px] font-medium transition-colors"
        >
          {shortcut}
        </button>
      ))}
    </div>
  );
}
