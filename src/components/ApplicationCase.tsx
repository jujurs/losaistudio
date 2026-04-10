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
  AlertTriangle,
  X,
  Link as LinkIcon,
  Unlink
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

  const [collaterals, setCollaterals] = useState([
    { id: 1, type: "Real Estate", value: 12000000, description: "Warehouse in Chicago" },
    { id: 2, type: "Corporate Guarantee", value: 5000000, description: "Parent Co Guarantee" },
  ]);

  const [links, setLinks] = useState([
    { facilityId: 1, collateralId: 1 },
    { facilityId: 1, collateralId: 2 },
    { facilityId: 2, collateralId: 2 },
  ]);

  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [isCollateralModalOpen, setIsCollateralModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const [newFacility, setNewFacility] = useState({ type: "Term Loan", amount: "", tenor: "60 Months", pricing: "SOFR + 2.5%" });
  const [newCollateral, setNewCollateral] = useState({ type: "Real Estate", value: "", description: "" });
  const [linkData, setLinkData] = useState({ facilityId: "", collateralId: "" });

  const addFacility = () => {
    const id = facilities.length > 0 ? Math.max(...facilities.map(f => f.id)) + 1 : 1;
    setFacilities([...facilities, { ...newFacility, id, amount: Number(newFacility.amount), currency: "USD" }]);
    setIsFacilityModalOpen(false);
  };

  const addCollateral = () => {
    const id = collaterals.length > 0 ? Math.max(...collaterals.map(c => c.id)) + 1 : 1;
    setCollaterals([...collaterals, { ...newCollateral, id, value: Number(newCollateral.value) }]);
    setIsCollateralModalOpen(false);
  };

  const toggleLink = (fId: number, cId: number) => {
    const exists = links.find(l => l.facilityId === fId && l.collateralId === cId);
    if (exists) {
      setLinks(links.filter(l => !(l.facilityId === fId && l.collateralId === cId)));
    } else {
      setLinks([...links, { facilityId: fId, collateralId: cId }]);
    }
  };

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
              <button 
                onClick={() => setIsFacilityModalOpen(true)}
                className="text-primary text-[11px] font-bold flex items-center gap-1 hover:underline"
              >
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
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setLinkData({ ...linkData, facilityId: String(f.id) }); setIsLinkModalOpen(true); }}
                        className="text-primary text-[10px] font-bold flex items-center gap-1 hover:underline"
                      >
                        <LinkIcon className="w-3 h-3" /> LINK COLLATERAL
                      </button>
                      <button className="text-text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
                  {/* Linked Collaterals */}
                  <div className="mt-4 pt-3 border-t border-surface">
                    <label className="carbon-label mb-2">Linked Collaterals</label>
                    <div className="flex flex-wrap gap-2">
                      {links.filter(l => l.facilityId === f.id).map(l => {
                        const col = collaterals.find(c => c.id === l.collateralId);
                        return col ? (
                          <div key={col.id} className="bg-surface px-2 py-1 border border-border flex items-center gap-2 text-[10px]">
                            <ShieldCheck className="w-3 h-3 text-success" />
                            <span className="font-medium">{col.type} - ${col.value.toLocaleString()}</span>
                            <button onClick={() => toggleLink(f.id, col.id)} className="text-text-secondary hover:text-danger">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : null;
                      })}
                      {links.filter(l => l.facilityId === f.id).length === 0 && (
                        <p className="text-[10px] text-text-secondary italic">No collaterals linked</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collateral Management */}
          <div className="carbon-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Collateral Management
              </h3>
              <button 
                onClick={() => setIsCollateralModalOpen(true)}
                className="text-primary text-[11px] font-bold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" /> ADD COLLATERAL
              </button>
            </div>
            <div className="space-y-3">
              {collaterals.map((c) => (
                <div key={c.id} className="p-4 bg-white border border-border hover:border-primary transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-bold">{c.type}</p>
                      <p className="text-[10px] text-text-secondary">Collateral ID: COL-00{c.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setLinkData({ ...linkData, collateralId: String(c.id) }); setIsLinkModalOpen(true); }}
                        className="text-primary text-[10px] font-bold flex items-center gap-1 hover:underline"
                      >
                        <LinkIcon className="w-3 h-3" /> LINK FACILITIES
                      </button>
                      <button className="text-text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="carbon-label">Market Value</label>
                      <p className="font-medium">${c.value.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="carbon-label">Description</label>
                      <p className="font-medium">{c.description}</p>
                    </div>
                  </div>
                  {/* Linked Facilities */}
                  <div className="mt-4 pt-3 border-t border-surface">
                    <label className="carbon-label mb-2">Secures Facilities</label>
                    <div className="flex flex-wrap gap-2">
                      {links.filter(l => l.collateralId === c.id).map(l => {
                        const fac = facilities.find(f => f.id === l.facilityId);
                        return fac ? (
                          <div key={fac.id} className="bg-surface px-2 py-1 border border-border flex items-center gap-2 text-[10px]">
                            <Layers className="w-3 h-3 text-primary" />
                            <span className="font-medium">{fac.type} - ${fac.amount.toLocaleString()}</span>
                            <button onClick={() => toggleLink(fac.id, c.id)} className="text-text-secondary hover:text-danger">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : null;
                      })}
                      {links.filter(l => l.collateralId === c.id).length === 0 && (
                        <p className="text-[10px] text-text-secondary italic">Not linked to any facility</p>
                      )}
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

      {/* Modals */}
      {isFacilityModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider">Add New Facility</h2>
              <button onClick={() => setIsFacilityModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="carbon-label">Facility Type</label>
                <select 
                  value={newFacility.type}
                  onChange={(e) => setNewFacility({...newFacility, type: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                >
                  <option>Term Loan</option>
                  <option>Working Capital Line</option>
                  <option>Letter of Credit</option>
                  <option>Bank Guarantee</option>
                </select>
              </div>
              <div>
                <label className="carbon-label">Amount (USD)</label>
                <input 
                  type="number" 
                  value={newFacility.amount}
                  onChange={(e) => setNewFacility({...newFacility, amount: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="carbon-label">Tenor</label>
                  <input 
                    type="text" 
                    value={newFacility.tenor}
                    onChange={(e) => setNewFacility({...newFacility, tenor: e.target.value})}
                    className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                    placeholder="e.g. 60 Months"
                  />
                </div>
                <div>
                  <label className="carbon-label">Pricing</label>
                  <input 
                    type="text" 
                    value={newFacility.pricing}
                    onChange={(e) => setNewFacility({...newFacility, pricing: e.target.value})}
                    className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                    placeholder="e.g. SOFR + 2.5%"
                  />
                </div>
              </div>
              <button 
                onClick={addFacility}
                className="w-full bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover mt-4"
              >
                ADD FACILITY
              </button>
            </div>
          </div>
        </div>
      )}

      {isCollateralModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider">Add New Collateral</h2>
              <button onClick={() => setIsCollateralModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="carbon-label">Collateral Type</label>
                <select 
                  value={newCollateral.type}
                  onChange={(e) => setNewCollateral({...newCollateral, type: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                >
                  <option>Real Estate</option>
                  <option>Corporate Guarantee</option>
                  <option>Cash Deposit</option>
                  <option>Inventory & Receivables</option>
                  <option>Machinery & Equipment</option>
                </select>
              </div>
              <div>
                <label className="carbon-label">Market Value (USD)</label>
                <input 
                  type="number" 
                  value={newCollateral.value}
                  onChange={(e) => setNewCollateral({...newCollateral, value: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="carbon-label">Description</label>
                <textarea 
                  value={newCollateral.description}
                  onChange={(e) => setNewCollateral({...newCollateral, description: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none h-24"
                  placeholder="Details about the collateral..."
                />
              </div>
              <button 
                onClick={addCollateral}
                className="w-full bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover mt-4"
              >
                ADD COLLATERAL
              </button>
            </div>
          </div>
        </div>
      )}

      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider">Link Assets</h2>
              <button onClick={() => setIsLinkModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="carbon-label">Step 1: Select Collateral</label>
                <select 
                  value={linkData.collateralId}
                  onChange={(e) => setLinkData({...linkData, collateralId: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Select a collateral...</option>
                  {collaterals.map(c => (
                    <option key={c.id} value={c.id}>{c.type} - ${c.value.toLocaleString()}</option>
                  ))}
                </select>
              </div>
              
              {linkData.collateralId && (
                <div>
                  <label className="carbon-label">Step 2: Select Facilities to Secure</label>
                  <div className="space-y-2 mt-2 max-h-48 overflow-y-auto border border-border p-2 bg-surface">
                    {facilities.map(f => {
                      const isLinked = links.some(l => l.facilityId === f.id && l.collateralId === Number(linkData.collateralId));
                      return (
                        <label key={f.id} className="flex items-center gap-3 p-2 hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-border">
                          <input 
                            type="checkbox"
                            checked={isLinked}
                            onChange={() => toggleLink(f.id, Number(linkData.collateralId))}
                            className="w-4 h-4 accent-primary"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold">{f.type}</span>
                            <span className="text-[10px] text-text-secondary">FAC-00{f.id} • ${f.amount.toLocaleString()}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <button 
                onClick={() => setIsLinkModalOpen(false)}
                className="w-full bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover mt-4"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
