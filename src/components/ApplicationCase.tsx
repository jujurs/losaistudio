import React, { useState } from "react";
import { 
  FileText, 
  Layers, 
  ShieldCheck, 
  Scale, 
  ClipboardCheck,
  ChevronRight,
  Plus,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { motion } from "motion/react";

const stages = [
  { id: "origination", label: "Origination", status: "completed" },
  { id: "analysis", label: "Credit Analysis", status: "current" },
  { id: "risk", label: "Risk Review", status: "pending" },
  { id: "committee", label: "Committee", status: "pending" },
  { id: "legal", label: "Legal Doc", status: "pending" },
  { id: "booking", label: "Booking", status: "pending" },
];

export default function ApplicationCase() {
  const [facilities, setFacilities] = useState([
    { id: 1, type: "Term Loan", amount: 10000000, currency: "USD", tenor: "60 Months", pricing: "SOFR + 2.5%" },
    { id: 2, type: "Working Capital Line", amount: 5000000, currency: "USD", tenor: "12 Months", pricing: "SOFR + 2.0%" },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Workflow Stepper */}
      <div className="bg-white border border-border p-4 flex items-center justify-between">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                stage.status === 'completed' ? 'bg-success border-success text-white' :
                stage.status === 'current' ? 'bg-primary border-primary text-white' :
                'bg-white border-border text-text-secondary'
              }`}>
                {stage.status === 'completed' ? <ClipboardCheck className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                stage.status === 'current' ? 'text-primary' : 'text-text-secondary'
              }`}>
                {stage.label}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div className="h-px bg-border flex-grow mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Details & Structuring */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Application Header */}
          <div className="carbon-card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary">APP-2024-001</h2>
                <p className="text-text-secondary text-sm">Renewal & Enhancement — Global Logistics Systems Corp.</p>
              </div>
              <span className="bg-warning/10 text-warning text-[10px] px-2 py-1 font-bold uppercase border border-warning/20">
                Priority: High
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <label className="carbon-label">Requested Amount</label>
                <p className="font-bold text-lg text-primary">$15,000,000.00</p>
              </div>
              <div>
                <label className="carbon-label">Total Exposure (Post-App)</label>
                <p className="font-bold text-lg">$42,850,000.00</p>
              </div>
              <div>
                <label className="carbon-label">RM Owner</label>
                <p className="font-bold">Sarah Jenkins</p>
              </div>
            </div>
          </div>

          {/* Facility Structuring */}
          <div className="carbon-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-4 h-4" /> Facility Structuring
              </h3>
              <button className="text-primary text-[11px] font-bold flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> ADD FACILITY
              </button>
            </div>
            <div className="space-y-3">
              {facilities.map((f) => (
                <div key={f.id} className="p-4 bg-white border border-border hover:border-primary transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-bold">{f.type}</p>
                      <p className="text-[10px] text-text-secondary">Facility ID: FAC-00{f.id}</p>
                    </div>
                    <button className="text-text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div>
                      <label className="carbon-label">Amount</label>
                      <p className="font-medium">{f.currency} {f.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="carbon-label">Tenor</label>
                      <p className="font-medium">{f.tenor}</p>
                    </div>
                    <div>
                      <label className="carbon-label">Pricing</label>
                      <p className="font-medium">{f.pricing}</p>
                    </div>
                    <div>
                      <label className="carbon-label">Repayment</label>
                      <p className="font-medium">Bullet at Maturity</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deviations & Exceptions */}
          <div className="carbon-card border-l-4 border-danger">
            <h3 className="text-xs font-semibold mb-4 uppercase tracking-wide flex items-center gap-2 text-danger">
              <AlertTriangle className="w-4 h-4" /> Policy Deviations (2)
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-danger/5 border border-danger/10 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold">Pricing Floor Breach</p>
                  <p className="text-[10px] text-text-secondary">Proposed SOFR + 2.0% is below the policy floor of SOFR + 2.25%</p>
                </div>
                <span className="text-[10px] font-bold text-danger">Level 2 Approval Required</span>
              </div>
              <div className="p-3 bg-danger/5 border border-danger/10 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold">Collateral Shortfall</p>
                  <p className="text-[10px] text-text-secondary">LTV of 85% exceeds the maximum policy limit of 80%</p>
                </div>
                <span className="text-[10px] font-bold text-danger">Risk Head Approval Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Checklist */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="carbon-card">
            <h3 className="text-xs font-semibold mb-4 uppercase tracking-wide">Case Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover transition-colors">
                SUBMIT FOR RISK REVIEW
              </button>
              <button className="w-full bg-white border border-border text-text-primary py-2 text-xs font-bold hover:bg-surface-hover transition-colors">
                RETURN TO RM
              </button>
              <button className="w-full bg-white border border-border text-danger py-2 text-xs font-bold hover:bg-danger/5 transition-colors">
                DECLINE APPLICATION
              </button>
            </div>
          </div>

          <div className="carbon-card">
            <h3 className="text-xs font-semibold mb-4 uppercase tracking-wide">Document Checklist</h3>
            <div className="space-y-3">
              {[
                { label: "Audited Financials FY23", status: "verified" },
                { label: "Interim Financials Q1-24", status: "verified" },
                { label: "Appraisal Report - Warehouse", status: "pending" },
                { label: "Board Resolution", status: "missing" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{doc.label}</span>
                  <span className={`font-bold uppercase text-[9px] px-1.5 py-0.5 ${
                    doc.status === 'verified' ? 'bg-success/10 text-success' :
                    doc.status === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-danger/10 text-danger'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-primary text-[11px] font-bold flex items-center justify-center gap-1 hover:underline">
              <Plus className="w-3 h-3" /> UPLOAD DOCUMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
