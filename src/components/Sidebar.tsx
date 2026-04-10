import React from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BarChart3, 
  CheckSquare, 
  Settings,
  ChevronRight
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Briefcase, label: "Portfolio", id: "portfolio", active: true },
  { icon: FileText, label: "Applications", id: "applications" },
  { icon: BarChart3, label: "Analysis", id: "analysis" },
  { icon: CheckSquare, label: "Tasks", id: "tasks" },
  { icon: Settings, label: "Admin", id: "admin" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border flex flex-col z-40">
      <div className="p-4 flex items-center gap-3 border-b border-border mb-4">
        <div className="w-8 h-8 bg-primary flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
        <div>
          <h2 className="text-text-primary font-bold text-xs leading-none">Carbon LOS</h2>
          <span className="text-[10px] text-text-secondary">Commercial Banking</span>
        </div>
      </div>

      <nav className="flex-grow">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center px-4 py-3 text-xs font-medium transition-colors ${
              item.active 
                ? "bg-white border-l-4 border-primary text-primary" 
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded hover:bg-surface-hover cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-border overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold text-text-primary truncate">John Doe</p>
            <p className="text-[10px] text-text-secondary truncate">Senior Credit Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
