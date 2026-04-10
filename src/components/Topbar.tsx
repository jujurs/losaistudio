import React from "react";
import { Search, Bell, HelpCircle, Settings as SettingsIcon } from "lucide-react";

export default function Topbar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-12 bg-white border-b border-border flex items-center justify-between px-6 z-30">
      <div className="flex items-center gap-8 h-full">
        <span className="text-sm font-semibold text-text-primary">Carbon LOS</span>
        <nav className="flex h-full">
          <button className="px-4 h-full border-b-2 border-primary text-primary text-xs font-medium">
            Corporate Profile
          </button>
          <button className="px-4 h-full text-text-secondary text-xs font-medium hover:text-text-primary">
            Exposure Details
          </button>
          <button className="px-4 h-full text-text-secondary text-xs font-medium hover:text-text-primary">
            Financials
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search accounts..." 
            className="bg-surface border-none h-8 pl-8 pr-4 text-xs w-64 focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-text-secondary hover:bg-surface rounded transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-text-secondary hover:bg-surface rounded transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-text-secondary hover:bg-surface rounded transition-colors">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
