import React from "react";
import { 
  MapPin, 
  Download, 
  Edit3, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  Info,
  Building2,
  Network
} from "lucide-react";
import { motion } from "motion/react";
import { 
  MOCK_CUSTOMER, 
  MOCK_EXPOSURE, 
  MOCK_RATIOS, 
  MOCK_RATINGS, 
  MOCK_GROUP 
} from "../constants";
import { GroupEntity } from "../types";

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

export default function Customer360() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
              Corporate Debtor
            </span>
            <span className="text-text-secondary text-xs">ID: {MOCK_CUSTOMER.id}</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">{MOCK_CUSTOMER.name}</h1>
          <p className="text-text-secondary mt-1 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            {MOCK_CUSTOMER.location} — {MOCK_CUSTOMER.sector}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface border border-border px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-surface-hover transition-colors">
            <Download className="w-4 h-4" /> EXPORT REPORT
          </button>
          <button className="bg-primary text-white px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-primary-hover transition-colors">
            <Edit3 className="w-4 h-4" /> MODIFY RECORD
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* General Info */}
        <div className="col-span-12 lg:col-span-4 carbon-card">
          <h3 className="text-xs font-semibold mb-4 border-b border-border pb-2 uppercase tracking-wide">General Information</h3>
          <div className="space-y-4">
            <div>
              <label className="carbon-label">Legal Name</label>
              <p className="carbon-value">{MOCK_CUSTOMER.legalName}</p>
            </div>
            <div>
              <label className="carbon-label">Registration Date</label>
              <p className="carbon-value">{MOCK_CUSTOMER.registrationDate}</p>
            </div>
            <div>
              <label className="carbon-label">Tax ID / EIN</label>
              <p className="carbon-value">{MOCK_CUSTOMER.taxId}</p>
            </div>
            <div>
              <label className="carbon-label">Key Personnel</label>
              <p className="carbon-value">{MOCK_CUSTOMER.keyPersonnel.join(", ")}</p>
            </div>
            <div className="pt-2">
              <label className="carbon-label mb-2">Primary Relationship Manager</label>
              <div className="flex items-center gap-3">
                <img 
                  src={MOCK_CUSTOMER.rm.avatar} 
                  alt={MOCK_CUSTOMER.rm.name} 
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-sm font-bold">{MOCK_CUSTOMER.rm.name}</p>
                  <p className="text-[10px] text-text-secondary">{MOCK_CUSTOMER.rm.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exposure Summary */}
        <div className="col-span-12 lg:col-span-8 carbon-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide">Total Exposure</h3>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(MOCK_EXPOSURE.total)}
              <span className="text-xs text-text-secondary font-normal uppercase ml-1">USD</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 border-l-4 border-primary">
              <label className="carbon-label">Funded Exposure</label>
              <p className="text-xl font-bold">{formatCurrency(MOCK_EXPOSURE.funded)}</p>
              <div className="w-full bg-surface h-1 mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "66%" }}
                  className="bg-primary h-1" 
                />
              </div>
              <p className="text-[10px] text-text-secondary mt-1">Term Loans, Working Capital</p>
            </div>
            <div className="bg-white p-4 border-l-4 border-border">
              <label className="carbon-label">Non-Funded Exposure</label>
              <p className="text-xl font-bold">{formatCurrency(MOCK_EXPOSURE.nonFunded)}</p>
              <div className="w-full bg-surface h-1 mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "34%" }}
                  className="bg-text-secondary h-1" 
                />
              </div>
              <p className="text-[10px] text-text-secondary mt-1">Letters of Credit, Guarantees</p>
            </div>
          </div>
          <table className="carbon-table">
            <thead>
              <tr>
                <th>Facility Type</th>
                <th className="text-right">Limit</th>
                <th className="text-right">Outstanding</th>
                <th className="text-center">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_EXPOSURE.facilities.map((f, i) => (
                <tr key={i}>
                  <td className="font-medium">{f.type}</td>
                  <td className="text-right">{formatCurrency(f.limit)}</td>
                  <td className="text-right">{formatCurrency(f.outstanding)}</td>
                  <td className="text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      f.utilization > 90 ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
                    }`}>
                      {f.utilization}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Health */}
        <div className="col-span-12 lg:col-span-7 carbon-card">
          <h3 className="text-xs font-semibold mb-6 border-b border-border pb-2 uppercase tracking-wide">Financial Health & Key Ratios</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {MOCK_RATIOS.map((r, i) => (
                <div key={i}>
                  <label className="carbon-label">{r.label}</label>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">{r.value}</span>
                    <div className="flex-grow h-6 flex items-end">
                      {/* Simple Sparkline Mock */}
                      <div className="flex items-end gap-0.5 h-full w-full">
                        {[40, 60, 45, 70, 55, 80].map((h, j) => (
                          <div 
                            key={j} 
                            style={{ height: `${h}%` }} 
                            className={`flex-grow ${r.status === 'danger' ? 'bg-danger/30' : 'bg-primary/30'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={`text-[10px] font-medium flex items-center gap-1 ${
                    r.status === 'danger' ? 'text-danger' : r.status === 'success' ? 'text-success' : 'text-text-secondary'
                  }`}>
                    {r.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : r.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {r.change}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 border border-border">
              <h4 className="text-[10px] font-bold uppercase mb-3">Auditor's Sentiment</h4>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-[11px] font-semibold">Unqualified Opinion</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                Financials present fairly in all material respects for FY 2023.
              </p>
              <div className="mt-4 pt-4 border-t border-surface">
                <label className="carbon-label">EBITDA (TTM)</label>
                <p className="text-sm font-bold">$12.4M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Rating */}
        <div className="col-span-12 lg:col-span-5 carbon-card">
          <h3 className="text-xs font-semibold mb-6 border-b border-border pb-2 uppercase tracking-wide">Risk Rating History</h3>
          <div className="relative pl-6 border-l border-border space-y-8">
            {MOCK_RATINGS.map((r, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[31px] top-0 w-3 h-3 rounded-full border-2 border-white ${
                  r.isCurrent ? "bg-success" : "bg-text-secondary"
                }`} />
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-xs font-bold ${r.isCurrent ? "text-text-primary" : "text-text-secondary"}`}>
                      {r.rating} ({r.outlook})
                    </p>
                    <p className="text-[10px] text-text-secondary">{r.type} - {r.date}</p>
                  </div>
                  {r.isCurrent && (
                    <span className="text-[10px] bg-success/10 text-success px-2 py-0.5 font-bold uppercase">Current</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-primary/5 p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-bold text-primary">UPGRADE TRIGGERED</span>
            </div>
            <p className="text-[10px] text-text-secondary">
              Rating was upgraded following the successful $50M capital infusion and reduction of short-term debt.
            </p>
          </div>
        </div>

        {/* Group Structure */}
        <div className="col-span-12 carbon-card">
          <h3 className="text-xs font-semibold mb-6 border-b border-border pb-2 uppercase tracking-wide">Group Structure</h3>
          <div className="bg-white border border-border p-4">
            <GroupNode node={MOCK_GROUP} />
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupNode({ node, depth = 0 }: { node: GroupEntity; depth?: number }) {
  const isBorrower = node.role === "BORROWER";
  
  return (
    <div className="space-y-2">
      <div 
        className={`flex items-center gap-3 p-3 border ${
          isBorrower ? "bg-primary text-white border-primary" : "bg-surface border-border"
        }`}
        style={{ marginLeft: `${depth * 24}px` }}
      >
        {depth === 0 ? <Building2 className="w-4 h-4" /> : <Network className="w-4 h-4" />}
        <div className="flex-grow">
          <p className="text-xs font-bold">
            {node.name} 
            <span className={`text-[10px] font-normal ml-2 ${isBorrower ? "text-white/80" : "text-text-secondary"}`}>
              ({node.role})
            </span>
          </p>
        </div>
        <span className={`text-[10px] font-semibold ${isBorrower ? "text-white" : "text-text-secondary"}`}>
          {node.ownership}
        </span>
      </div>
      {node.children?.map((child) => (
        <div key={child.id}>
          <GroupNode node={child} depth={depth + 1} />
        </div>
      ))}
    </div>
  );
}
