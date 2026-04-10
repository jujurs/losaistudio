import React, { useState, useEffect } from "react";
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  Save, 
  ShieldCheck, 
  Building2, 
  Cpu, 
  Truck, 
  Package, 
  FileText, 
  Coins, 
  BarChart3, 
  UserCheck,
  ClipboardCheck,
  AlertTriangle,
  Link as LinkIcon,
  Plus,
  Trash2
} from "lucide-react";

type CollateralType = "Land & Building" | "Machine" | "Vehicle" | "Inventory" | "Receivable" | "Cash" | "Shares" | "Guarantee";

interface CollateralFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const STEPS = [
  { id: "type", label: "Type Selection", icon: ShieldCheck },
  { id: "common", label: "Common Information", icon: InfoIcon },
  { id: "specific", label: "Specific Details", icon: Cpu },
  { id: "valuation", label: "Valuation", icon: BarChart3 },
  { id: "legal", label: "Legal Perfection", icon: ClipboardCheck },
  { id: "insurance", label: "Insurance", icon: ShieldCheck },
  { id: "summary", label: "Review & Save", icon: CheckCircleIcon },
];

import { Info as InfoIcon, CheckCircle as CheckCircleIcon } from "lucide-react";

export default function CollateralDetailForm({ onClose, onSave, initialData }: CollateralFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData || {
    type: "Land & Building",
    common: {
      status: "Active",
      ownershipType: "Borrower-owned",
      currency: "USD",
      haircut: 20,
    },
    specific: {},
    valuation: {
      valuerType: "External",
    },
    legal: {
      perfectionRequired: "Yes",
    },
    insurance: {
      required: "Yes",
    }
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderTypeSelection = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4">
      {[
        { id: "Land & Building", icon: Building2, desc: "Property, Factory, Warehouse" },
        { id: "Machine", icon: Cpu, desc: "Production Equipment, Tools" },
        { id: "Vehicle", icon: Truck, desc: "Fleet, Logistics, Heavy Equipment" },
        { id: "Inventory", icon: Package, desc: "Raw Material, WIP, Finished Goods" },
        { id: "Receivable", icon: FileText, desc: "Trade Invoices, Contracts" },
        { id: "Cash", icon: Coins, desc: "Deposits, Savings, Escrow" },
        { id: "Shares", icon: BarChart3, desc: "Listed/Unlisted Securities" },
        { id: "Guarantee", icon: UserCheck, desc: "Corporate or Personal" },
      ].map((t) => (
        <button
          key={t.id}
          onClick={() => {
            setFormData({ ...formData, type: t.id as CollateralType });
            nextStep();
          }}
          className={`p-6 border-2 transition-all text-left flex flex-col gap-3 group ${
            formData.type === t.id 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 bg-white"
          }`}
        >
          <t.icon className={`w-8 h-8 ${formData.type === t.id ? "text-primary" : "text-text-secondary group-hover:text-primary"}`} />
          <div>
            <p className="text-sm font-bold uppercase tracking-tight">{t.id}</p>
            <p className="text-[10px] text-text-secondary leading-tight mt-1">{t.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );

  const renderCommonInfo = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormField label="Collateral Type" type="text" readonly defaultValue={formData.type} />
        <FormField label="Collateral Subtype" type="select" options={["Main Asset", "Supporting Asset", "Additional Security"]} />
        <FormField label="Description" type="textarea" className="md:col-span-3" />
        <FormField label="Collateral Status" type="select" options={["Draft", "Active", "Released", "Expired", "Substituted"]} />
        <FormField label="Ownership Type" type="select" options={["Borrower-owned", "Third-party"]} />
        <FormField label="Collateral Provider / Owner" type="text" />
        <FormField label="Currency" type="select" options={["USD", "IDR", "EUR", "SGD"]} />
        <FormField label="Haircut (%)" type="number" defaultValue={formData.common.haircut} />
      </div>
      
      <div className="carbon-card bg-white border-l-4 border-primary">
        <h3 className="text-[10px] font-bold uppercase text-primary mb-4">Value Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField label="Market Value" type="currency" />
          <FormField label="Forced Sale Value" type="currency" />
          <FormField label="Eligible Value" type="currency" readonly placeholder="Calculated by system" />
        </div>
      </div>
    </div>
  );

  const renderSpecificDetails = () => {
    switch(formData.type) {
      case "Land & Building":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Certificate Type" type="select" options={["SHM", "HGB", "Strata Title", "HGU"]} />
            <FormField label="Certificate Number" type="text" />
            <FormField label="Land Area (sqm)" type="number" />
            <FormField label="Building Area (sqm)" type="number" />
            <FormField label="Address" type="textarea" className="md:col-span-3" />
            <FormField label="Zoning / Land Use" type="select" options={["Industrial", "Commercial", "Residential"]} />
            <FormField label="Occupancy Status" type="select" options={["Owner Occupied", "Tenanted", "Vacant"]} />
            <FormField label="Year Built" type="number" />
            <FormField label="IMB/PBG Number" type="text" />
          </div>
        );
      case "Machine":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Machine Type" type="text" />
            <FormField label="Brand" type="text" />
            <FormField label="Model" type="text" />
            <FormField label="Serial Number" type="text" />
            <FormField label="Year of Manufacture" type="number" />
            <FormField label="Condition" type="select" options={["New", "Good", "Fair", "Obsolete"]} />
            <FormField label="Installed Location" type="text" />
            <FormField label="Remaining Useful Life (Years)" type="number" />
          </div>
        );
      case "Vehicle":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Vehicle Type" type="select" options={["Truck", "Car", "Heavy Equipment", "Motorcycle"]} />
            <FormField label="Brand/Model" type="text" />
            <FormField label="Registration Number" type="text" />
            <FormField label="Chassis Number" type="text" />
            <FormField label="Engine Number" type="text" />
            <FormField label="Year" type="number" />
            <FormField label="BPKB Available?" type="select" options={["Yes", "No"]} />
          </div>
        );
      case "Inventory":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Inventory Type" type="select" options={["Raw Material", "WIP", "Finished Goods", "Commodity"]} />
            <FormField label="Quantity" type="number" />
            <FormField label="Unit of Measure" type="text" />
            <FormField label="Warehouse Location" type="text" />
            <FormField label="Stock Aging (Days)" type="number" />
            <FormField label="Controlled Warehouse?" type="select" options={["Yes", "No"]} />
          </div>
        );
      case "Receivable":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Receivable Type" type="select" options={["Trade", "Contract", "Progress Billing"]} />
            <FormField label="Debtor Name" type="text" />
            <FormField label="Invoice Number" type="text" />
            <FormField label="Invoice Date" type="date" />
            <FormField label="Due Date" type="date" />
            <FormField label="Aging Bucket" type="select" options={["Current", "1-30 Days", "31-60 Days", "61-90 Days", ">90 Days"]} />
          </div>
        );
      case "Cash":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Deposit Account Number" type="text" />
            <FormField label="Deposit Type" type="select" options={["Time Deposit", "Savings", "Giro"]} />
            <FormField label="Lien/Hold Status" type="select" options={["Active", "Inactive"]} />
            <FormField label="Maturity Date" type="date" />
            <FormField label="Auto-rollover?" type="select" options={["Yes", "No"]} />
          </div>
        );
      case "Shares":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Security Type" type="select" options={["Listed Shares", "Unlisted Shares", "Bonds", "Mutual Fund"]} />
            <FormField label="Issuer" type="text" />
            <FormField label="Ticker/ISIN" type="text" />
            <FormField label="Quantity" type="number" />
            <FormField label="Market Price" type="currency" />
            <FormField label="30-day Average Price" type="currency" />
          </div>
        );
      case "Guarantee":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4">
            <FormField label="Guarantee Type" type="select" options={["Corporate Guarantee", "Personal Guarantee"]} />
            <FormField label="Guarantor Name" type="text" />
            <FormField label="Guarantee Amount" type="currency" />
            <FormField label="Relationship to Borrower" type="text" />
            <FormField label="Expiry Date" type="date" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderValuation = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Valuer Type" type="select" options={["Internal", "External"]} />
        <FormField label="Valuer Name" type="text" />
        <FormField label="Report Number" type="text" />
        <FormField label="Inspection Date" type="date" />
        <FormField label="Valuation Date" type="date" />
        <FormField label="Valuation Expiry Date" type="date" />
        <FormField label="Valuation Approach" type="select" options={["Market Approach", "Cost Approach", "Income Approach"]} />
      </div>
      <FormField label="Assumptions / Limitations" type="textarea" />
    </div>
  );

  const renderLegal = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Charge Type" type="select" options={["Mortgage", "Fiduciary", "Pledge", "Assignment", "Lien", "Guarantee"]} />
        <FormField label="Perfection Required?" type="select" options={["Yes", "No"]} />
        <FormField label="Registration Completed?" type="select" options={["Yes", "No"]} />
        <FormField label="Registration Number" type="text" />
        <FormField label="Mortgage/Charge Rank" type="number" />
        <FormField label="Notary / Law Firm" type="text" />
        <FormField label="Legal Expiry Date" type="date" />
      </div>
      <FormField label="Legal Issue Remarks" type="textarea" />
    </div>
  );

  const renderInsurance = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Insurance Required?" type="select" options={["Yes", "No"]} />
        <FormField label="Insurance Provider" type="lookup" />
        <FormField label="Policy Number" type="text" />
        <FormField label="Coverage Amount" type="currency" />
        <FormField label="Expiry Date" type="date" />
        <FormField label="Banker's Clause?" type="select" options={["Yes", "No"]} />
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-8 animate-in fade-in zoom-in-95">
      <div className="bg-primary/5 border border-primary/20 p-6 flex items-start gap-4">
        <div className="p-3 bg-primary rounded-full text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-primary uppercase tracking-tight">Collateral Ready for Registration</h3>
          <p className="text-xs text-text-secondary mt-1">Please review the summary below before finalizing the record.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase text-text-secondary border-b border-border pb-1">Core Summary</h4>
          <SummaryItem label="Type" value={formData.type} />
          <SummaryItem label="Market Value" value="$12,000,000.00" />
          <SummaryItem label="Haircut" value="20%" />
          <SummaryItem label="Eligible Value" value="$9,600,000.00" className="text-primary font-bold" />
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase text-text-secondary border-b border-border pb-1">Risk & Compliance</h4>
          <SummaryItem label="Legal Perfection" value="Required / Pending" />
          <SummaryItem label="Insurance" value="Required / Not Linked" />
          <SummaryItem label="Valuation Expiry" value="2025-04-10" />
        </div>
      </div>

      <div className="p-4 bg-warning/5 border border-warning/20 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <p className="text-[10px] font-bold text-warning uppercase">Warning: Legal perfection must be completed before disbursement.</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border border-border">
        {/* Header */}
        <div className="bg-white border-b border-border p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary uppercase tracking-tight">Collateral Management</h2>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-full transition-colors">
            <X className="w-6 h-6 text-text-secondary" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="bg-white border-b border-border px-8 py-4 flex justify-between">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center gap-2 flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all z-10 ${
                i < currentStep ? "bg-success border-success text-white" :
                i === currentStep ? "bg-primary border-primary text-white scale-110 shadow-lg" :
                "bg-white border-border text-text-secondary"
              }`}>
                {i < currentStep ? <CheckCircleIcon className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-tighter text-center ${
                i === currentStep ? "text-primary" : "text-text-secondary"
              }`}>
                {step.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 ${
                  i < currentStep ? "bg-success" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
          {currentStep === 0 && renderTypeSelection()}
          {currentStep === 1 && renderCommonInfo()}
          {currentStep === 2 && renderSpecificDetails()}
          {currentStep === 3 && renderValuation()}
          {currentStep === 4 && renderLegal()}
          {currentStep === 5 && renderInsurance()}
          {currentStep === 6 && renderSummary()}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-border p-6 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-2 text-xs font-bold border border-border hover:bg-surface disabled:opacity-30 flex items-center gap-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> PREVIOUS
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors"
            >
              CANCEL
            </button>
            {currentStep === STEPS.length - 1 ? (
              <button
                onClick={() => onSave(formData)}
                className="px-8 py-2 bg-primary text-white text-xs font-bold hover:bg-primary-hover flex items-center gap-2 shadow-lg transition-all"
              >
                <Save className="w-4 h-4" /> FINALIZE & SAVE
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-8 py-2 bg-primary text-white text-xs font-bold hover:bg-primary-hover flex items-center gap-2 shadow-lg transition-all"
              >
                NEXT STEP <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, type, options, placeholder, readonly, defaultValue, className = "" }: any) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="carbon-label">{label}</label>
      {type === "select" ? (
        <select 
          disabled={readonly}
          defaultValue={defaultValue}
          className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none disabled:bg-surface"
        >
          {options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea 
          readOnly={readonly}
          defaultValue={defaultValue}
          className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none min-h-[80px]"
          placeholder={placeholder}
        />
      ) : type === "lookup" ? (
        <div className="relative">
          <input 
            readOnly={readonly}
            type="text" 
            defaultValue={defaultValue}
            className="w-full bg-white border border-border p-2 pr-8 text-xs focus:ring-1 focus:ring-primary outline-none"
            placeholder={placeholder || "Search..."}
          />
          <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
        </div>
      ) : (
        <div className="relative">
          <input 
            readOnly={readonly}
            type={type} 
            defaultValue={defaultValue}
            className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none disabled:bg-surface"
            placeholder={placeholder}
          />
          {type === "currency" && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary">USD</span>}
        </div>
      )}
    </div>
  );
}

function SummaryItem({ label, value, className = "" }: { label: string, value: string, className?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-surface">
      <span className="text-xs text-text-secondary">{label}</span>
      <span className={`text-xs font-medium ${className}`}>{value}</span>
    </div>
  );
}
