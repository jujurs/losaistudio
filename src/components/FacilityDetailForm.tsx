import React, { useState, useEffect } from "react";
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  Save, 
  Layers,
  Info,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { 
  PRODUCTS, 
  FACILITIES, 
  FIELD_DEFINITIONS, 
  FACILITY_FIELD_MAPPING,
  Facility,
  Product
} from "../data/facilityMaster";

interface FacilityFormProps {
  segment: 'SME' | 'COMBA' | 'COBA';
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function FacilityDetailForm({ segment, onClose, onSave }: FacilityFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const eligibleProducts = PRODUCTS.filter(p => 
    FACILITIES.some(f => f.productCode === p.code && f.segments.includes(segment))
  );

  const eligibleFacilities = selectedProduct 
    ? FACILITIES.filter(f => f.productCode === selectedProduct.code && f.segments.includes(segment))
    : [];

  const mappedFields = selectedFacility 
    ? (FACILITY_FIELD_MAPPING[selectedFacility.code] || FACILITY_FIELD_MAPPING['OD']) // Fallback to OD if mapping missing
    : [];

  const steps = [
    { label: "Product Selection", icon: Layers },
    { label: "Facility Selection", icon: Info },
    { label: "Facility Details", icon: Calendar },
    { label: "Review & Confirm", icon: CheckCircle },
  ];

  const handleNext = () => {
    if (currentStep === 0 && !selectedProduct) return;
    if (currentStep === 1 && !selectedFacility) return;
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderProductSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4">
      {eligibleProducts.map(p => (
        <button
          key={p.code}
          onClick={() => {
            setSelectedProduct(p);
            setSelectedFacility(null);
            handleNext();
          }}
          className={`p-6 border-2 text-left transition-all group ${
            selectedProduct?.code === p.code 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border hover:border-primary/50 bg-white"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <Layers className={`w-8 h-8 ${selectedProduct?.code === p.code ? "text-primary" : "text-text-secondary group-hover:text-primary"}`} />
            <span className="text-[10px] font-bold px-2 py-0.5 bg-surface rounded uppercase tracking-widest">{p.category}</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-tight">{p.name}</p>
          <p className="text-[10px] text-text-secondary mt-1 font-mono">{p.code}</p>
        </button>
      ))}
    </div>
  );

  const renderFacilitySelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4">
      {eligibleFacilities.map(f => (
        <button
          key={f.code}
          onClick={() => {
            setSelectedFacility(f);
            handleNext();
          }}
          className={`p-6 border-2 text-left transition-all group ${
            selectedFacility?.code === f.code 
              ? "border-primary bg-primary/5 shadow-md" 
              : "border-border hover:border-primary/50 bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold uppercase tracking-tight">{f.name}</p>
            <div className="flex gap-1">
              {f.revolving && <span className="text-[8px] font-bold bg-success/10 text-success px-1.5 py-0.5 rounded uppercase">Revolving</span>}
              {f.funded ? <span className="text-[8px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase">Funded</span> : <span className="text-[8px] font-bold bg-warning/10 text-warning px-1.5 py-0.5 rounded uppercase">Non-Funded</span>}
            </div>
          </div>
          <p className="text-[10px] text-text-secondary font-mono">{f.code}</p>
        </button>
      ))}
    </div>
  );

  const renderFacilityDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 pb-1">Core Information</h3>
        {mappedFields.slice(0, Math.ceil(mappedFields.length / 2)).map(fieldId => {
          const field = FIELD_DEFINITIONS[fieldId];
          if (!field) return null;
          return (
            <DynamicField 
              key={fieldId} 
              field={field} 
              value={formData[fieldId]} 
              onChange={(val) => setFormData({...formData, [fieldId]: val})} 
            />
          );
        })}
      </div>
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 pb-1">Additional Parameters</h3>
        {mappedFields.slice(Math.ceil(mappedFields.length / 2)).map(fieldId => {
          const field = FIELD_DEFINITIONS[fieldId];
          if (!field) return null;
          return (
            <DynamicField 
              key={fieldId} 
              field={field} 
              value={formData[fieldId]} 
              onChange={(val) => setFormData({...formData, [fieldId]: val})} 
            />
          );
        })}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-8 animate-in fade-in zoom-in-95">
      <div className="bg-primary/5 border border-primary/20 p-6 flex items-start gap-4">
        <div className="p-3 bg-primary rounded-full text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-primary uppercase tracking-tight">Facility Structure Review</h3>
          <p className="text-xs text-text-secondary mt-1">Please confirm the facility details for {segment} segment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase text-text-secondary border-b border-border pb-1">Facility Identity</h4>
          <SummaryItem label="Segment" value={segment} />
          <SummaryItem label="Product" value={selectedProduct?.name || ""} />
          <SummaryItem label="Facility" value={selectedFacility?.name || ""} />
          <SummaryItem label="Code" value={selectedFacility?.code || ""} />
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase text-text-secondary border-b border-border pb-1">Key Parameters</h4>
          {mappedFields.map(fieldId => (
            <SummaryItem 
              key={fieldId} 
              label={FIELD_DEFINITIONS[fieldId]?.label || fieldId} 
              value={formData[fieldId] || "-"} 
            />
          ))}
        </div>
      </div>

      <div className="p-4 bg-warning/5 border border-warning/20 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <p className="text-[10px] font-bold text-warning uppercase">Note: Final approval matrix will be determined by the proposed limit and risk rating.</p>
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
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary uppercase tracking-tight">Facility Master Builder</h2>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                Segment: <span className="text-primary">{segment}</span> | Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-full transition-colors">
            <X className="w-6 h-6 text-text-secondary" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="bg-white border-b border-border px-8 py-4 flex justify-between">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center gap-2 flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all z-10 ${
                i < currentStep ? "bg-success border-success text-white" :
                i === currentStep ? "bg-primary border-primary text-white scale-110 shadow-lg" :
                "bg-white border-border text-text-secondary"
              }`}>
                {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-tighter text-center ${
                i === currentStep ? "text-primary" : "text-text-secondary"
              }`}>
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 ${
                  i < currentStep ? "bg-success" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
          {currentStep === 0 && renderProductSelection()}
          {currentStep === 1 && renderFacilitySelection()}
          {currentStep === 2 && renderFacilityDetails()}
          {currentStep === 3 && renderReview()}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-border p-6 flex justify-between items-center">
          <button
            onClick={handlePrev}
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
            {currentStep === steps.length - 1 ? (
              <button
                onClick={() => onSave({ product: selectedProduct, facility: selectedFacility, details: formData })}
                className="px-8 py-2 bg-primary text-white text-xs font-bold hover:bg-primary-hover flex items-center gap-2 shadow-lg transition-all"
              >
                <Save className="w-4 h-4" /> CREATE FACILITY
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={(currentStep === 0 && !selectedProduct) || (currentStep === 1 && !selectedFacility)}
                className="px-8 py-2 bg-primary text-white text-xs font-bold hover:bg-primary-hover flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
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

interface DynamicFieldProps {
  key?: string | number;
  field: any;
  value: any;
  onChange: (val: any) => void;
}

function DynamicField({ field, value, onChange }: DynamicFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="carbon-label flex items-center gap-1">
        {field.label}
        {field.required && <span className="text-danger">*</span>}
      </label>
      {field.type === "select" ? (
        <select 
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
        >
          <option value="">Select {field.label}...</option>
          {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : field.type === "textarea" ? (
        <textarea 
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none min-h-[80px]"
          placeholder={`Enter ${field.label}...`}
        />
      ) : field.type === "lookup" ? (
        <div className="relative">
          <input 
            type="text" 
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-border p-2 pr-8 text-xs focus:ring-1 focus:ring-primary outline-none"
            placeholder="Search..."
          />
          <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
        </div>
      ) : (
        <div className="relative">
          <input 
            type={field.type === "currency" || field.type === "number" ? "number" : field.type} 
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
            placeholder={field.type === "currency" ? "0.00" : ""}
          />
          {field.type === "currency" && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary">USD</span>}
        </div>
      )}
    </div>
  );
}

interface SummaryItemProps {
  key?: string | number;
  label: string;
  value: any;
  className?: string;
}

function SummaryItem({ label, value, className = "" }: SummaryItemProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-surface">
      <span className="text-xs text-text-secondary">{label}</span>
      <span className={`text-xs font-medium ${className}`}>{value?.toString() || "-"}</span>
    </div>
  );
}
