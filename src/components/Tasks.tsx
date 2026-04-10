import React from "react";
import { 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  Filter, 
  Search,
  MoreVertical,
  ArrowUpRight
} from "lucide-react";
import { MOCK_TASKS_LIST } from "../constants";

export default function Tasks() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Task Management</h1>
          <p className="text-text-secondary text-sm">You have {MOCK_TASKS_LIST.length} active tasks across your portfolio.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-white border border-border h-9 pl-8 pr-4 text-xs w-64 focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="bg-white border border-border px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-surface-hover">
            <Filter className="w-4 h-4" /> FILTERS
          </button>
        </div>
      </div>

      {/* Task Tabs */}
      <div className="flex border-b border-border">
        <button className="px-6 py-3 text-xs font-bold text-primary border-b-2 border-primary">
          MY TASKS ({MOCK_TASKS_LIST.length})
        </button>
        <button className="px-6 py-3 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors">
          TEAM QUEUE (14)
        </button>
        <button className="px-6 py-3 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors">
          COMPLETED
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {MOCK_TASKS_LIST.map((task) => (
          <div 
            key={task.id} 
            className="bg-white border border-border p-4 flex items-center justify-between hover:border-primary transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-grow">
              <div className={`p-2 rounded-full ${
                task.priority === 'High' ? 'bg-danger/10 text-danger' : 
                task.priority === 'Medium' ? 'bg-warning/10 text-warning' : 
                'bg-success/10 text-success'
              }`}>
                {task.priority === 'High' ? <AlertCircle className="w-5 h-5" /> : <CheckSquare className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-text-primary truncate">{task.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-text-secondary mt-1">
                  <span className="font-mono bg-surface px-1.5 py-0.5 border border-border">{task.id}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due {task.due}</span>
                  <span className="font-medium text-primary">{task.customer}</span>
                  {task.app !== "N/A" && <span>App: {task.app}</span>}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right hidden md:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Status</p>
                <p className={`text-xs font-bold ${
                  task.status === 'In Progress' ? 'text-primary' : 'text-warning'
                }`}>{task.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-text-secondary hover:bg-surface-hover rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button className="p-2 text-text-secondary hover:bg-surface-hover rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="carbon-card">
          <h3 className="carbon-label">SLA Performance</h3>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-bold text-success">94%</span>
            <span className="text-[10px] text-text-secondary mb-1">On-time completion</span>
          </div>
          <div className="w-full bg-surface h-1.5 mt-2 rounded-full overflow-hidden">
            <div className="bg-success h-full w-[94%]" />
          </div>
        </div>
        <div className="carbon-card">
          <h3 className="carbon-label">Average TAT</h3>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-bold text-text-primary">3.2 Days</span>
            <span className="text-[10px] text-text-secondary mb-1">Per application</span>
          </div>
        </div>
        <div className="carbon-card">
          <h3 className="carbon-label">Bottleneck Alert</h3>
          <div className="mt-2 flex items-center gap-2 text-danger">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold">Risk Approval Stage</span>
          </div>
          <p className="text-[10px] text-text-secondary mt-1">+1.5 days delay vs benchmark</p>
        </div>
      </div>
    </div>
  );
}
