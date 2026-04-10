import React from "react";
import { Play, Pause, RotateCcw, Save, Settings } from "lucide-react";

export default function BpmnModeler() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-text-primary">BPMN Process Modeler</h1>
          <p className="text-text-secondary text-xs">Editing: los-application-origination.bpmn (v2.4)</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-border px-3 py-1.5 text-[11px] font-bold flex items-center gap-2 hover:bg-surface-hover">
            <RotateCcw className="w-3.5 h-3.5" /> RESET
          </button>
          <button className="bg-primary text-white px-3 py-1.5 text-[11px] font-bold flex items-center gap-2 hover:bg-primary-hover">
            <Save className="w-3.5 h-3.5" /> PUBLISH VERSION
          </button>
        </div>
      </div>

      <div className="relative h-[600px] bg-white border border-border overflow-hidden flex">
        {/* Modeler Canvas Mock */}
        <div className="flex-grow relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
          {/* Mock BPMN Elements */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 flex items-center">
            <div className="w-8 h-8 rounded-full border-2 border-text-primary bg-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-success" />
            </div>
            <div className="w-12 h-0.5 bg-text-primary" />
            <div className="w-32 h-16 border-2 border-text-primary bg-white flex items-center justify-center text-[10px] font-bold text-center px-2">
              RM DRAFT APPLICATION
            </div>
            <div className="w-12 h-0.5 bg-text-primary" />
            <div className="w-12 h-12 border-2 border-text-primary rotate-45 bg-white flex items-center justify-center">
              <span className="-rotate-45 text-[10px] font-bold">?</span>
            </div>
            <div className="w-12 h-0.5 bg-text-primary" />
            <div className="w-32 h-16 border-2 border-text-primary bg-primary text-white flex items-center justify-center text-[10px] font-bold text-center px-2">
              CREDIT ANALYST REVIEW
            </div>
            <div className="w-12 h-0.5 bg-text-primary" />
            <div className="w-8 h-8 rounded-full border-4 border-text-primary bg-white" />
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button className="p-2 bg-white border border-border shadow-sm hover:bg-surface-hover">
              <Play className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white border border-border shadow-sm hover:bg-surface-hover">
              <Pause className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-72 border-l border-border bg-surface p-4 space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Properties</h3>
          <div className="space-y-3">
            <div>
              <label className="carbon-label">Task Name</label>
              <input type="text" defaultValue="Credit Analyst Review" className="w-full bg-white border border-border p-2 text-xs" />
            </div>
            <div>
              <label className="carbon-label">Assignee Type</label>
              <select className="w-full bg-white border border-border p-2 text-xs">
                <option>Candidate Group</option>
                <option>Specific User</option>
              </select>
            </div>
            <div>
              <label className="carbon-label">Candidate Group</label>
              <input type="text" defaultValue="CREDIT_ANALYST_POOL" className="w-full bg-white border border-border p-2 text-xs" />
            </div>
            <div>
              <label className="carbon-label">SLA Duration</label>
              <input type="text" defaultValue="48h" className="w-full bg-white border border-border p-2 text-xs" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <button className="w-full flex items-center justify-between text-[10px] font-bold text-text-secondary hover:text-text-primary">
              ADVANCED CONFIG <Settings className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
