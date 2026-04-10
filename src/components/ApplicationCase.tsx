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
  Unlink,
  Info,
  CheckSquare,
  Activity,
  Search,
  History,
  CheckCircle2,
  FileSearch,
  LayoutList,
  BarChart3,
  Calculator
} from "lucide-react";
import { motion } from "motion/react";

import CollateralDetailForm from "./CollateralDetailForm";
import FacilityDetailForm from "./FacilityDetailForm";
import DrawdownConditionManager from "./DrawdownConditionManager";
import GlobalTCManager from "./GlobalTCManager";
import TBOManager from "./TBOManager";
import FinancialAnalysis from "./FinancialAnalysis";
import SLIKManager from "./SLIKManager";
import TBODocManager from "./TBODocManager";

const stages = [
  { id: "origination", label: "Origination", status: "completed" },
  { id: "analysis", label: "Credit Analysis", status: "current" },
  { id: "risk", label: "Risk Review", status: "pending" },
  { id: "committee", label: "Committee", status: "pending" },
  { id: "legal", label: "Legal Doc", status: "pending" },
  { id: "booking", label: "Booking", status: "pending" },
];

const TABS = [
  { id: "setup", label: "Application Setup", icon: FileText },
  { id: "compliance", label: "Compliance & Exposure", icon: ShieldCheck },
  { id: "facilities", label: "Facility Builder", icon: Layers },
  { id: "collaterals", label: "Collateral Builder", icon: Scale },
  { id: "verification", label: "Verification & Routing", icon: ClipboardCheck },
  { id: "summary", label: "Facility Summary", icon: LayoutList },
  { id: "drawdown", label: "Drawdown Conditions", icon: CheckSquare },
  { id: "global-tc", label: "Global T&C & Covenants", icon: FileSearch },
  { id: "tbo", label: "TBO (Relationship Wallet)", icon: BarChart3 },
  { id: "tbo-docs", label: "To Be Obtained (Docs)", icon: FileText },
  { id: "financials", label: "Financial Spreading", icon: Calculator },
];

export default function ApplicationCase() {
  const [activeTab, setActiveTab] = useState("setup");
  
  // Existing state from previous implementation
  const [facilities, setFacilities] = useState([
    { id: 1, type: "Term Loan", amount: 10000000, currency: "USD", tenor: "60 Months", pricing: "SOFR + 2.5%", status: "Proposed" },
    { id: 2, type: "Working Capital Line", amount: 5000000, currency: "USD", tenor: "12 Months", pricing: "SOFR + 2.0%", status: "Proposed" },
  ]);

  const [collaterals, setCollaterals] = useState([
    { id: 1, type: "Real Estate", value: 12000000, description: "Warehouse in Chicago", code: "RE-001", appraisalStatus: "Completed", lastAppraisalDate: "2024-01-15" },
    { id: 2, type: "Corporate Guarantee", value: 5000000, description: "Parent Co Guarantee", code: "CG-002", appraisalStatus: "Not Requested", lastAppraisalDate: "-" },
  ]);

  const requestAppraisal = (id: number) => {
    setCollaterals(collaterals.map(c => 
      c.id === id ? { ...c, appraisalStatus: "In Progress" } : c
    ));
    
    // Simulate surrounding system response after 3 seconds
    setTimeout(() => {
      setCollaterals(prev => prev.map(c => 
        c.id === id ? { 
          ...c, 
          appraisalStatus: "Completed", 
          value: c.value * (0.9 + Math.random() * 0.2), // Randomly adjust value
          lastAppraisalDate: new Date().toISOString().split('T')[0] 
        } : c
      ));
    }, 3000);
  };

  const [links, setLinks] = useState([
    { facilityId: 1, collateralId: 1 },
    { facilityId: 1, collateralId: 2 },
    { facilityId: 2, collateralId: 2 },
  ]);

  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [isCollateralModalOpen, setIsCollateralModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [appSegment, setAppSegment] = useState<'SME' | 'COMBA' | 'COBA'>('COMBA');

  const toggleLink = (fId: number, cId: number) => {
    const exists = links.find(l => l.facilityId === fId && l.collateralId === cId);
    if (exists) {
      setLinks(links.filter(l => !(l.facilityId === fId && l.collateralId === cId)));
    } else {
      setLinks([...links, { facilityId: fId, collateralId: cId }]);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Workflow Stepper */}
      <div className="bg-white border-b border-border p-4 flex items-center justify-between sticky top-12 z-10 shadow-sm px-8">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                stage.status === 'completed' ? 'bg-success border-success text-white' :
                stage.status === 'current' ? 'bg-primary border-primary text-white' :
                'bg-white border-border text-text-secondary'
              }`}>
                {stage.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
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

      <div className="flex flex-1 overflow-hidden">
        {/* Tab Navigation Sidebar */}
        <div className="w-64 bg-white border-r border-border overflow-y-auto hidden lg:block">
          <div className="p-4 border-b border-border bg-surface/50">
            <h2 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Application</h2>
            <p className="text-sm font-bold text-primary">APP-2024-001</p>
          </div>
          <nav className="p-4 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold transition-all border-l-4 ${
                  activeTab === tab.id 
                    ? "bg-surface border-primary text-primary" 
                    : "border-transparent text-text-secondary hover:bg-surface hover:text-text-primary"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="uppercase tracking-wider text-left">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-surface">
          <div className="max-w-5xl mx-auto space-y-8 pb-24">
            
            {activeTab === "setup" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Application Header */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <Info className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Application Header</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormField label="Customer Name" type="text" readonly defaultValue="Global Logistics Systems Corp." />
                    <FormField label="ID Type" type="text" readonly defaultValue="NPWP" />
                    <FormField label="Customer Type" type="text" readonly defaultValue="Corporate" />
                    <FormField label="ID No." type="text" readonly defaultValue="88-2940219-X" />
                  </div>
                </section>

                {/* Application Purpose */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Application Purpose</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "New", "Additional Plafond", "Changes Beyond Additional Plafond",
                      "Partial Permanent Settlement", "Extension / Term Loan Review",
                      "Restructure and Reschedule", "Loan Application (Without Changes)",
                      "Cancellation for All Facility - Permanent", "Collateral Release",
                      "Block Renewal", "Update Supporting Document"
                    ].map(purpose => (
                      <label key={purpose} className="flex items-center gap-3 p-3 bg-white border border-border hover:border-primary cursor-pointer transition-colors">
                        <input type="checkbox" className="w-4 h-4 accent-primary" />
                        <span className="text-xs font-medium">{purpose}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Application Control Fields */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Application Control Fields</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <FormField label="Application Category" type="select" options={["Standard", "Express", "Fast Track"]} />
                      <FormField label="Consent Product Owner (Non-RLP Product)?" type="select" options={["Yes", "No"]} />
                      <FormField label="Is Term Loan?" type="select" options={["Yes", "No"]} />
                      <FormField label="Approving Level" type="select" options={["Board", "Committee A", "Committee B"]} />
                      <FormField label="Date Applied" type="date" />
                      <FormField label="Appeal?" type="select" options={["No", "Yes"]} />
                      <FormField label="Syariah Compliance?" type="text" readonly defaultValue="Non-Syariah" />
                      <FormField label="Channel" type="text" readonly defaultValue="Direct" />
                      <FormField label="Account Officer" type="text" readonly defaultValue="Sarah Jenkins" />
                      <FormField label="BOC Approval" type="select" options={["Required", "Not Required"]} />
                      <FormField label="Secured Indicator" type="select" options={["Secured", "Unsecured"]} />
                      <FormField label="Take Over Customer?" type="select" options={["No", "Yes"]} />
                      <FormField label="Applicant Not Listed in Negative List?" type="select" options={["Yes", "No"]} />
                      <FormField label="Has Cost Submitted to Bank?" type="select" options={["Yes", "No"]} />
                      <FormField label="Community Checking Completed?" type="select" options={["Yes", "No"]} />
                      <FormField label="Checking Result" type="select" options={["Pass", "Fail"]} />
                      <FormField label="Program Tagging" type="select" options={["None", "SME Special"]} />
                    </div>
                    <div className="space-y-4">
                      <FormField label="Portfolio Update" type="select" options={["Yes", "No"]} />
                      <FormField label="Lending Model / Program" type="select" options={["Corporate General", "SME Special"]} />
                      <FormField label="Sust. Finance Risk" type="select" options={["Low", "Medium", "High"]} />
                      <FormField label="Date Complete Document Received" type="date" />
                      <FormField label="Account Strategy" type="select" options={["Retain", "Grow", "Exit"]} />
                      <FormField label="RAC Block Renewal" type="text" readonly defaultValue="N/A" />
                      <FormField label="Originating Unit" type="lookup" defaultValue="Main Branch Chicago" readonly />
                      <FormField label="Call Report Ref No" type="text" readonly defaultValue="CR-2024-991" />
                      <FormField label="Prescreening Required (For CRDE)?" type="select" options={["Yes", "No"]} />
                      <div className="grid grid-cols-3 gap-2">
                        <FormField label="Ongoing Facility" type="number" />
                        <FormField label="Year(s)" type="number" />
                        <FormField label="Month(s)" type="number" />
                      </div>
                      <FormField label="Applicant Listed in Restricted Industry?" type="select" options={["No", "Yes"]} />
                      <FormField label="Community Checking Source Name" type="text" />
                      <FormField label="Name of Manager/UBO" type="lookup" />
                    </div>
                  </div>
                </section>

                {/* Remarks & Referral */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Remarks & Referral</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Collateral Remarks" type="textarea" />
                    <FormField label="General Remarks" type="textarea" />
                    <FormField label="Referral Source" type="select" options={["Internal", "External"]} />
                    <FormField label="Referral Region" type="lookup" />
                    <FormField label="Referral Branch" type="lookup" />
                    <FormField label="Referral Code" type="text" />
                    <FormField label="Referral Name" type="text" />
                  </div>
                </section>

                {/* BMPK Details */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">BMPK Details (IDR Million)</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField label="BMPK Calculated - Debtor" type="number" />
                    <FormField label="Date BMPK Calculated - Debtor" type="date" />
                    <FormField label="BMPK Calculated - Debtor Group" type="number" />
                    <FormField label="Date BMPK Calculated - Debtor Group" type="date" />
                    <FormField label="BMPK Calculated - Related / Not Related Party" type="select" options={["Not Related", "Related"]} />
                    <FormField label="Date BMPK Calculated - Related / Not Related Party" type="date" />
                  </div>
                </section>

                {/* Industry MAT */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <LayoutList className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Industry MAT</h2>
                  </div>
                  <div className="carbon-card p-0 overflow-hidden">
                    <table className="carbon-table">
                      <thead>
                        <tr>
                          <th className="w-12">No.</th>
                          <th>Industry MAT</th>
                          <th>Date</th>
                          <th>Entity</th>
                          <th className="text-right">Available Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center font-mono text-[10px]">1</td>
                          <td><select className="w-full bg-transparent border-none text-xs"><option>Logistics & Transport</option></select></td>
                          <td><input type="month" className="w-full bg-transparent border-none text-xs" /></td>
                          <td><select className="w-full bg-transparent border-none text-xs"><option>Global Logistics Corp</option></select></td>
                          <td><input type="text" className="w-full bg-transparent border-none text-xs text-right" placeholder="0.00" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Sector Exposure Industry */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Sector Exposure Industry</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="carbon-card p-0 overflow-hidden">
                      <table className="carbon-table">
                        <thead>
                          <tr>
                            <th className="w-12">No.</th>
                            <th>Exposure Industry Debtor</th>
                            <th>Date (As Of)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center font-mono text-[10px]">1</td>
                            <td><input type="text" className="w-full bg-transparent border-none text-xs" /></td>
                            <td><input type="month" className="w-full bg-transparent border-none text-xs" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="carbon-card p-0 overflow-hidden">
                      <table className="carbon-table">
                        <thead>
                          <tr>
                            <th className="w-12">No.</th>
                            <th>Exposure Industry After Enhancement</th>
                            <th>Date (As Of)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center font-mono text-[10px]">1</td>
                            <td><input type="text" className="w-full bg-transparent border-none text-xs" /></td>
                            <td><input type="month" className="w-full bg-transparent border-none text-xs" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "compliance" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* SLIK Checking Module */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <Search className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">SLIK Checking & Credit Result</h2>
                  </div>
                  
                  <SLIKManager />
                </section>

                {/* Policy Checklist */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Policy Monitoring Checklist</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <FormField label="Debtor Name" type="text" readonly defaultValue="Global Logistics Systems Corp." />
                    <FormField label="CF No." type="text" readonly defaultValue="CF-99201" />
                    <FormField label="Group" type="text" readonly defaultValue="Logistics Global Group" />
                    <FormField label="ICR" type="text" readonly defaultValue="BBB+" />
                    <FormField label="Currency" type="text" readonly defaultValue="USD" />
                    <FormField label="Total Plafond" type="currency" readonly defaultValue="15,000,000" />
                    <FormField label="Total Plafond Fully Secured" type="currency" readonly defaultValue="12,000,000" />
                    <FormField label="Initiator Name" type="text" readonly defaultValue="Sarah Jenkins" />
                    <FormField label="BCT Name" type="text" />
                    <FormField label="Originating Unit" type="text" readonly defaultValue="Main Branch Chicago" />
                    <FormField label="Approved Date" type="date" />
                    <FormField label="Approving Authority" type="lookup" />
                    <FormField label="Approved By" type="lookup" />
                  </div>

                  <div className="space-y-6">
                    <div className="carbon-card bg-white">
                      <h3 className="text-[10px] font-bold uppercase text-primary mb-4">Credit Policy Exceptions</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["Pricing Below Floor", "LTV Breach", "Tenor Extension", "Financial Covenant Waiver"].map(item => (
                            <label key={item} className="flex items-center gap-3 text-xs">
                              <input type="checkbox" className="w-4 h-4 accent-primary" /> {item}
                            </label>
                          ))}
                        </div>
                        <FormField label="Justification" type="textarea" placeholder="Provide justification for exceptions..." />
                      </div>
                    </div>

                    <div className="carbon-card bg-white">
                      <h3 className="text-[10px] font-bold uppercase text-primary mb-4">High Risk Credits</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["Sensitive Industry", "Negative Equity", "High Leverage", "Political Exposed Person"].map(item => (
                            <div key={item} className="flex items-center justify-between gap-4">
                              <label className="flex items-center gap-3 text-xs">
                                <input type="checkbox" className="w-4 h-4 accent-primary" /> {item}
                              </label>
                              <input type="text" className="bg-surface border border-border text-[10px] p-1 w-24 text-right" placeholder="IDR 0.00" />
                            </div>
                          ))}
                        </div>
                        <FormField label="Justification" type="textarea" placeholder="Provide justification for high risk..." />
                      </div>
                    </div>

                    <div className="carbon-card bg-white">
                      <h3 className="text-[10px] font-bold uppercase text-primary mb-4">Special Consideration Credits</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["Strategic Importance", "Cross-Sell Potential", "New Market Entry"].map(item => (
                            <label key={item} className="flex items-center gap-3 text-xs">
                              <input type="checkbox" className="w-4 h-4 accent-primary" /> {item}
                            </label>
                          ))}
                        </div>
                        <FormField label="Justification" type="textarea" placeholder="Provide justification for special consideration..." />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Deviasi RAC */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Deviasi RAC Matrix</h2>
                  </div>
                  <div className="carbon-card p-0 overflow-hidden">
                    <table className="carbon-table">
                      <thead>
                        <tr>
                          <th>RAC Criteria</th>
                          <th>Business Unit Input</th>
                          <th>Business Unit Remark</th>
                          <th>BCM Input</th>
                          <th>CRDE Deviation</th>
                          <th>CRDE Remark</th>
                          <th>Final Deviation</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr>
                          <td className="font-bold">Current Ratio {'>'} 1.2x</td>
                          <td>1.15x</td>
                          <td>Seasonal dip in receivables</td>
                          <td>1.15x</td>
                          <td><span className="text-danger font-bold">DEVIATED</span></td>
                          <td>Accepted based on group support</td>
                          <td><span className="text-warning font-bold">WAIVED</span></td>
                        </tr>
                        <tr>
                          <td className="font-bold">Years in Business {'>'} 5</td>
                          <td>15 Years</td>
                          <td>Established market leader</td>
                          <td>15 Years</td>
                          <td><span className="text-success font-bold">MATCH</span></td>
                          <td>Verified</td>
                          <td><span className="text-success font-bold">MATCH</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "facilities" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 border-b border-border pb-2 flex-1">
                    <Layers className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Facility Listing</h2>
                    <div className="ml-4 flex items-center gap-2 bg-surface px-3 py-1 rounded border border-border">
                      <span className="text-[10px] font-bold text-text-secondary uppercase">Segment:</span>
                      <select 
                        value={appSegment}
                        onChange={(e) => setAppSegment(e.target.value as any)}
                        className="bg-transparent text-[10px] font-bold text-primary outline-none"
                      >
                        <option value="SME">SME</option>
                        <option value="COMBA">COMBA</option>
                        <option value="COBA">COBA</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsFacilityModalOpen(true)}
                    className="ml-4 bg-primary text-white px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-primary-hover transition-colors"
                  >
                    <Plus className="w-4 h-4" /> ADD FACILITY
                  </button>
                </div>

                <div className="carbon-card p-0 overflow-hidden">
                  <table className="carbon-table">
                    <thead>
                      <tr>
                        <th className="w-12">No.</th>
                        <th>Customer Name</th>
                        <th>Product</th>
                        <th>Facility</th>
                        <th>Abbr.</th>
                        <th>Entity</th>
                        <th>B2B?</th>
                        <th>Account No.</th>
                        <th>Currency</th>
                        <th className="text-right">Proposed Limit</th>
                        <th className="text-right">Approved Limit</th>
                        <th>Status</th>
                        <th>Linkage</th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {facilities.map((f, i) => (
                        <tr key={f.id}>
                          <td className="text-center font-mono text-[10px]">{i + 1}</td>
                          <td className="text-xs">Global Logistics</td>
                          <td className="font-bold">{f.type}</td>
                          <td>{f.type} - {f.id}</td>
                          <td className="font-mono text-[10px]">TL-00{f.id}</td>
                          <td>Global Logistics Corp</td>
                          <td>No</td>
                          <td>1234567890</td>
                          <td>{f.currency}</td>
                          <td className="text-right font-bold">{f.amount.toLocaleString()}</td>
                          <td className="text-right font-bold text-success">{f.amount.toLocaleString()}</td>
                          <td><span className="bg-warning/10 text-warning px-2 py-0.5 rounded text-[10px] font-bold uppercase">{f.status}</span></td>
                          <td className="text-center">
                            <button className="text-primary hover:underline text-[10px] font-bold">VIEW</button>
                          </td>
                          <td>
                            <button className="text-text-secondary hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Account Outstanding Update History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="carbon-card bg-white">
                    <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Account Outstanding Update History</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-surface py-1">
                        <span className="text-text-secondary">Last Triggered By</span>
                        <span className="font-bold">SYSTEM</span>
                      </div>
                      <div className="flex justify-between border-b border-surface py-1">
                        <span className="text-text-secondary">Triggered Date</span>
                        <span className="font-bold">2024-04-10 09:00</span>
                      </div>
                      <div className="flex justify-between border-b border-surface py-1">
                        <span className="text-text-secondary">Status</span>
                        <span className="text-success font-bold">SUCCESS</span>
                      </div>
                    </div>
                  </div>
                  <div className="carbon-card bg-white">
                    <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Credit Limit Check</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">Counter</span>
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <button className="w-full mt-4 bg-surface border border-border py-2 text-xs font-bold hover:bg-white transition-colors">
                      RUN LIMIT CHECK
                    </button>
                  </div>
                </div>

                {/* Credit Limit Check Listing */}
                <div className="carbon-card p-0 overflow-hidden">
                  <h3 className="p-4 text-[10px] font-bold uppercase text-text-secondary border-b border-border">Credit Limit Check Listing</h3>
                  <table className="carbon-table">
                    <thead>
                      <tr>
                        <th className="w-12">No.</th>
                        <th>Fac. Abbr.</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Remark</th>
                        <th>Triggered By</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr>
                        <td className="text-center font-mono text-[10px]">1</td>
                        <td>TL-LOG</td>
                        <td>Limit Check</td>
                        <td><span className="text-success font-bold">PASS</span></td>
                        <td>Within group limit</td>
                        <td>Sarah Jenkins</td>
                        <td>2024-04-10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Collateral Linkage Preview */}
                <div className="carbon-card p-0 overflow-hidden">
                  <h3 className="p-4 text-[10px] font-bold uppercase text-text-secondary border-b border-border">Collateral Linkage Preview</h3>
                  <table className="carbon-table">
                    <thead>
                      <tr>
                        <th className="w-12">No.</th>
                        <th>Customer Name</th>
                        <th>Fac. Abbr.</th>
                        <th>Coll. Abbr.</th>
                        <th>Coll. Code</th>
                        <th className="text-right">Coll. Value</th>
                        <th>Rank</th>
                        <th className="text-right">Coverage Value</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {links.map((link, i) => {
                        const fac = facilities.find(f => f.id === link.facilityId);
                        const col = collaterals.find(c => c.id === link.collateralId);
                        return fac && col ? (
                          <tr key={i}>
                            <td className="text-center font-mono text-[10px]">{i + 1}</td>
                            <td>Global Logistics</td>
                            <td>TL-00{fac.id}</td>
                            <td>{col.type.substring(0, 3).toUpperCase()}</td>
                            <td>{col.code}</td>
                            <td className="text-right">${col.value.toLocaleString()}</td>
                            <td className="text-center">1</td>
                            <td className="text-right font-bold">${(col.value * 0.8).toLocaleString()}</td>
                          </tr>
                        ) : null;
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Facility Creation Control */}
                <div className="carbon-card bg-white">
                  <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Facility Creation Control</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <FormField label="Select Product" type="select" options={["Term Loan", "Working Capital", "Trade Finance"]} />
                    <FormField label="Select Facility" type="select" options={["Revolving", "Non-Revolving"]} />
                    <button className="bg-surface border border-border py-2 text-xs font-bold hover:bg-white transition-colors">
                      ADD TO LISTING
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "collaterals" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 border-b border-border pb-2 flex-1">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Collateral Listing</h2>
                  </div>
                  <button 
                    onClick={() => setIsCollateralModalOpen(true)}
                    className="ml-4 bg-primary text-white px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-primary-hover transition-colors"
                  >
                    <Plus className="w-4 h-4" /> ADD COLLATERAL
                  </button>
                </div>

                <div className="carbon-card p-0 overflow-hidden">
                  <table className="carbon-table">
                    <thead>
                      <tr>
                        <th className="w-12">No.</th>
                        <th>SIBS ID</th>
                        <th>Abbr.</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Ownership</th>
                        <th className="text-right">Market Value</th>
                        <th className="text-right">Eligible Value</th>
                        <th>Appraisal Status</th>
                        <th>Last Appraisal</th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {collaterals.map((c, i) => (
                        <tr key={c.id}>
                          <td className="text-center font-mono text-[10px]">{i + 1}</td>
                          <td className="font-mono text-[10px]">SIBS-{c.id}</td>
                          <td className="font-bold text-[10px]">{c.type.substring(0, 3).toUpperCase()}</td>
                          <td className="text-xs font-bold">{c.type}</td>
                          <td><span className="bg-success/10 text-success px-2 py-0.5 rounded text-[10px] font-bold uppercase">Active</span></td>
                          <td className="text-[10px]">Borrower</td>
                          <td className="text-right font-bold">${c.value.toLocaleString()}</td>
                          <td className="text-right font-bold text-primary">${(c.value * 0.8).toLocaleString()}</td>
                          <td>
                            <div className="flex flex-col gap-1">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase w-fit ${
                                c.appraisalStatus === 'Completed' ? 'bg-success/10 text-success' :
                                c.appraisalStatus === 'In Progress' ? 'bg-warning/10 text-warning animate-pulse' :
                                'bg-surface text-text-secondary border border-border'
                              }`}>
                                {c.appraisalStatus}
                              </span>
                              {c.appraisalStatus === 'Not Requested' && (
                                <button 
                                  onClick={() => requestAppraisal(c.id)}
                                  className="text-primary text-[9px] font-bold hover:underline text-left flex items-center gap-1"
                                >
                                  <Activity className="w-3 h-3" /> REQUEST
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="text-[10px] text-text-secondary">{c.lastAppraisalDate}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <button className="text-text-secondary hover:text-primary"><Info className="w-4 h-4" /></button>
                              <button className="text-text-secondary hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Collateral Action Control */}
                <div className="carbon-card bg-white">
                  <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Collateral Action Control</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <FormField label="Select Collateral Type" type="select" options={["Real Estate", "Vehicle", "Cash", "Guarantee"]} className="lg:col-span-2" />
                    <button className="bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover">ADD</button>
                    <button className="bg-white border border-border py-2 text-xs font-bold hover:bg-surface">INQUIRY</button>
                    <button className="bg-white border border-border py-2 text-xs font-bold hover:bg-surface">CREATE ORDER</button>
                  </div>
                </div>

                {/* Collateral Transaction History */}
                <div className="carbon-card p-0 overflow-hidden">
                  <h3 className="p-4 text-[10px] font-bold uppercase text-text-secondary border-b border-border">Transaction History Listing</h3>
                  <table className="carbon-table">
                    <thead>
                      <tr>
                        <th className="w-12">No.</th>
                        <th>Appraisal No.</th>
                        <th>SIBS ID</th>
                        <th>Abbr.</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Triggered By</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr>
                        <td className="text-center font-mono text-[10px]">1</td>
                        <td>APR-99201</td>
                        <td>SIBS-1</td>
                        <td>REA</td>
                        <td>Real Estate</td>
                        <td>Initial Valuation</td>
                        <td>Sarah Jenkins</td>
                        <td>2024-04-10</td>
                        <td><span className="text-success font-bold">COMPLETED</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Collateral Linkage & Coverage */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <LinkIcon className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Collateral Linkage & Coverage</h2>
                  </div>
                  
                  <div className="carbon-card bg-white">
                    <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Linkage Control</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                      <FormField label="Select Own Collateral" type="select" options={collaterals.map(c => c.type)} />
                      <FormField label="Select Cross Collateral" type="lookup" />
                      <button className="bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover">ADD LINKAGE</button>
                    </div>
                  </div>

                  <div className="carbon-card p-0 overflow-hidden">
                    <table className="carbon-table">
                      <thead>
                        <tr>
                          <th>Facility</th>
                          <th>Collateral</th>
                          <th className="text-right">Coll. Value</th>
                          <th className="text-center">Rank</th>
                          <th className="text-right">Coverage Value</th>
                          <th className="text-right">Haircut Value</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {links.map((link, i) => {
                          const fac = facilities.find(f => f.id === link.facilityId);
                          const col = collaterals.find(c => c.id === link.collateralId);
                          return fac && col ? (
                            <tr key={i}>
                              <td className="font-bold text-xs">{fac.type}</td>
                              <td className="text-xs">{col.type} ({col.code})</td>
                              <td className="text-right font-mono text-xs">${col.value.toLocaleString()}</td>
                              <td className="text-center text-xs">1</td>
                              <td className="text-right font-mono text-xs">${(col.value * 0.8).toLocaleString()}</td>
                              <td className="text-right font-mono text-xs text-danger">${(col.value * 0.2).toLocaleString()}</td>
                              <td className="text-center">
                                <button onClick={() => toggleLink(fac.id, col.id)} className="text-danger hover:underline text-[10px] font-bold">UNLINK</button>
                              </td>
                            </tr>
                          ) : null;
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Coverage Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="carbon-card bg-white">
                      <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Collateral Coverage Summary</h3>
                      <div className="space-y-2 text-xs">
                        {["Real Estate", "Machine / Vehicle", "Receivables", "Inventory", "Cash Collateral", "Others"].map(item => (
                          <div key={item} className="flex justify-between border-b border-surface py-1">
                            <span className="text-text-secondary">{item} (%)</span>
                            <span className="font-bold">{item === "Real Estate" ? "80%" : "0%"}</span>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-border mt-2">
                          <span className="font-bold text-primary">Total (%)</span>
                          <span className="font-bold text-primary">80%</span>
                        </div>
                      </div>
                    </div>
                    <div className="carbon-card p-0 overflow-hidden">
                      <h3 className="p-4 text-[10px] font-bold uppercase text-text-secondary border-b border-border">Coverage Company Group</h3>
                      <table className="carbon-table">
                        <thead>
                          <tr>
                            <th>Debitur</th>
                            <th className="text-right">RE (%)</th>
                            <th className="text-right">Total (%)</th>
                          </tr>
                        </thead>
                        <tbody className="text-[10px]">
                          <tr>
                            <td>Global Logistics</td>
                            <td className="text-right">80%</td>
                            <td className="text-right font-bold">80%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "verification" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Field Investigation */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <FileSearch className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Field Investigation</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <FormField label="Result Verified?" type="select" options={["Yes", "No"]} />
                    <FormField label="Located in Jabodetabek" type="select" options={["Yes", "No"]} />
                    <FormField label="Distance from Branch (Km)" type="number" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="carbon-card bg-white">
                      <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Input by Account Officer</h3>
                      <div className="space-y-4">
                        <FormField label="Result Verified?" type="select" options={["Yes", "No"]} />
                        <FormField label="Located in Jabodetabek" type="select" options={["Yes", "No"]} />
                        <FormField label="Distance from Branch (Km)" type="number" />
                        <button className="text-primary text-[10px] font-bold hover:underline">VIEW INVESTIGATION FORM</button>
                      </div>
                    </div>
                    <div className="carbon-card bg-white">
                      <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Input by CIAS</h3>
                      <div className="space-y-4">
                        <FormField label="Result Verified?" type="select" options={["Yes", "No"]} />
                        <FormField label="Located in Jabodetabek" type="select" options={["Yes", "No"]} />
                        <FormField label="Distance from Branch (Km)" type="number" />
                        <button className="text-primary text-[10px] font-bold hover:underline">VIEW INVESTIGATION FORM</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="px-4 py-2 bg-primary text-white text-xs font-bold hover:bg-primary-hover">UPDATE</button>
                    <button className="px-4 py-2 bg-white border border-border text-xs font-bold hover:bg-surface">INQUIRY</button>
                    <button className="px-4 py-2 bg-white border border-border text-xs font-bold hover:bg-surface">CREATE ORDER</button>
                    <button className="px-4 py-2 bg-white border border-border text-xs font-bold hover:bg-surface">UPDATE TO NAG</button>
                  </div>

                  <div className="carbon-card p-0 overflow-hidden">
                    <h3 className="p-4 text-[10px] font-bold uppercase text-text-secondary border-b border-border">Transaction History Listing</h3>
                    <table className="carbon-table">
                      <thead>
                        <tr>
                          <th className="w-12">No.</th>
                          <th>Appraisal No.</th>
                          <th>Customer Name</th>
                          <th>Description</th>
                          <th>Triggered By</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Reason</th>
                          <th>Final?</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr>
                          <td className="text-center font-mono text-[10px]">1</td>
                          <td>APR-99201</td>
                          <td>Global Logistics</td>
                          <td>Initial Appraisal</td>
                          <td>Sarah Jenkins</td>
                          <td>2024-04-01</td>
                          <td><span className="text-success font-bold">COMPLETED</span></td>
                          <td>-</td>
                          <td>Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Decision - Prescreening */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <History className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Decision - Prescreening</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <FormField label="Prescreening Counter" type="text" readonly defaultValue="1" />
                    <FormField label="Prescreening Date" type="text" readonly defaultValue="2024-04-10 14:22" />
                    <FormField label="Checked By" type="text" readonly defaultValue="SYSTEM" />
                    <FormField label="Result" type="text" readonly defaultValue="PROCEED" className="text-success font-bold" />
                    <button className="text-primary text-[10px] font-bold hover:underline self-end pb-2">VIEW XML</button>
                  </div>

                  <div className="carbon-card p-0 overflow-hidden">
                    <h3 className="p-4 text-[10px] font-bold uppercase text-text-secondary border-b border-border">Prescreening Business Rules</h3>
                    <table className="carbon-table">
                      <thead>
                        <tr>
                          <th className="w-12">No.</th>
                          <th>Rule No</th>
                          <th>CRDE Decision</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr>
                          <td className="text-center font-mono text-[10px]">1</td>
                          <td>BR-001</td>
                          <td><span className="text-success font-bold">PASS</span></td>
                          <td>Customer not in negative list</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="carbon-card bg-white">
                    <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Flow Routing Reasons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Officer Flow Routing Reason" type="text" readonly defaultValue="Standard Route" />
                      <FormField label="Flow Routing Category" type="select" options={["Normal", "Urgent", "Special"]} />
                      <FormField label="Flow Routing Reason" type="lookup" />
                      <FormField label="Other Flow Routing Reason" type="textarea" />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <LayoutList className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Facility Information Summary</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormField label="Product" type="text" readonly defaultValue="Term Loan" />
                        <FormField label="SIBS Facility ID" type="text" readonly defaultValue="FAC-99201" />
                        <FormField label="Facility Abbreviation" type="text" readonly defaultValue="TL-LOG" />
                        <FormField label="Facility Package" type="text" readonly defaultValue="Logistics Growth" />
                        <FormField label="Campaign" type="text" readonly defaultValue="None" />
                        <FormField label="Existing Facility?" type="text" readonly defaultValue="No" />
                        <FormField label="Industry Type" type="text" readonly defaultValue="Transport" />
                        <FormField label="Term Of Payment" type="text" readonly defaultValue="Monthly" />
                        <FormField label="Loan Characteristic" type="text" readonly defaultValue="Standard" />
                        <FormField label="Facility Account No." type="text" readonly defaultValue="1234567890" />
                        <FormField label="Currency" type="text" readonly defaultValue="USD" />
                        <FormField label="Maturity" type="text" readonly defaultValue="2029-04-10" />
                        <FormField label="Program Tagging" type="text" readonly defaultValue="SME Special" />
                        <FormField label="Agreement / Waad No." type="text" readonly defaultValue="AGR-2024-001" />
                      </div>

                      <div className="carbon-card bg-white">
                        <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Facility Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <FormField label="Repayment Type" type="text" readonly defaultValue="Installment" />
                          <FormField label="Installment Commencement" type="text" readonly defaultValue="Month 1" />
                          <FormField label="Installment Option" type="text" readonly defaultValue="Fixed" />
                          <FormField label="Grace Period" type="text" readonly defaultValue="6 Months" />
                          <FormField label="Interest Frequency" type="text" readonly defaultValue="Monthly" />
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                      <div className="carbon-card bg-white">
                        <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Drawdown Information</h3>
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between border-b border-surface py-1">
                            <span className="text-text-secondary">Islamic Financing?</span>
                            <span className="font-bold">No</span>
                          </div>
                          <div className="flex justify-between border-b border-surface py-1">
                            <span className="text-text-secondary">Pricing Option</span>
                            <span className="font-bold">Floating</span>
                          </div>
                          <div className="flex justify-between border-b border-surface py-1">
                            <span className="text-text-secondary">Principal</span>
                            <span className="font-bold">$10,000,000</span>
                          </div>
                          <div className="flex justify-between border-b border-surface py-1">
                            <span className="text-text-secondary">Product Program</span>
                            <span className="font-bold">Corporate General</span>
                          </div>
                        </div>
                      </div>

                      <div className="carbon-card bg-white">
                        <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Financing Amount Details</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b border-surface">
                            <span className="text-xs text-text-secondary">Original Limit</span>
                            <span className="text-sm font-bold">$10,000,000.00</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-surface">
                            <span className="text-xs text-text-secondary">Existing Limit</span>
                            <span className="text-sm font-bold">$0.00</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-surface">
                            <span className="text-xs text-text-secondary">Proposed Limit</span>
                            <span className="text-sm font-bold text-primary">$10,000,000.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "drawdown" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Drawdown Conditions Checklist</h2>
                  </div>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="bg-white border border-border p-4 flex-1">
                      <p className="text-[10px] font-bold text-text-secondary uppercase mb-1">Active Facility</p>
                      <p className="text-sm font-bold text-primary">TL-LOG - Term Loan Logistics</p>
                    </div>
                    <div className="bg-white border border-border p-4 flex-1">
                      <p className="text-[10px] font-bold text-text-secondary uppercase mb-1">Proposed Limit</p>
                      <p className="text-sm font-bold">$10,000,000.00</p>
                    </div>
                  </div>

                  <DrawdownConditionManager 
                    facilityId={1} 
                    facilityType="TLF" 
                    initialConditions={[
                      { code: 'AGR_SIGNED', name: 'Signed Credit Agreement', category: 'Legal', stage: 'Before First Drawdown', mandatory: true, blocking: true, status: 'Fulfilled', fulfilledDate: '2024-04-10' },
                      { code: 'SEC_DOCS', name: 'Signed Security Documents', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true, status: 'Pending' },
                      { code: 'COL_LINK', name: 'Collateral Linkage Completed', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true, status: 'Fulfilled', fulfilledDate: '2024-04-09' },
                      { code: 'APP_VALID', name: 'Appraisal Report Valid', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true, status: 'Fulfilled', fulfilledDate: '2024-04-08' },
                      { code: 'INS_ACTIVE', name: 'Insurance Policy Active', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true, status: 'Pending' },
                      { code: 'KYC_CLR', name: 'KYC & AML Screening Clear', category: 'Compliance', stage: 'Before Approval', mandatory: true, blocking: true, status: 'Fulfilled', fulfilledDate: '2024-04-05' },
                    ]}
                  />
                </section>
              </div>
            )}
            {activeTab === "global-tc" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <FileSearch className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Global Terms & Conditions (Obligor Level)</h2>
                  </div>

                  <GlobalTCManager 
                    initialTCs={[
                      { code: 'AUD_FS_ANN', name: 'Submit Audited Financial Statements Annually', category: 'Financial', type: 'Affirmative', mandatory: true, monitoringRequired: true, status: 'Active Monitoring', dueDate: '2024-06-30', lastReviewDate: '2023-06-15' },
                      { code: 'OWN_CHG_NOT', name: 'Notify Bank of Change in Ownership/Control', category: 'Legal', type: 'Negative', mandatory: true, monitoringRequired: false, status: 'Fulfilled' },
                      { code: 'DER_MAX_3', name: 'Maintain Debt to Equity Ratio (DER) Max 3.0x', category: 'Covenant', type: 'Covenant', mandatory: true, monitoringRequired: true, status: 'Active Monitoring', lastReviewDate: '2024-03-31' },
                      { code: 'DSCR_MIN_1.2', name: 'Maintain Debt Service Coverage Ratio (DSCR) Min 1.25x', category: 'Covenant', type: 'Covenant', mandatory: true, monitoringRequired: true, status: 'Breached', lastReviewDate: '2024-03-31', remarks: 'Current DSCR at 1.18x due to temporary working capital pressure.' },
                      { code: 'INS_COV_ASSET', name: 'Maintain Insurance Coverage for Secured Assets', category: 'Security', type: 'Affirmative', mandatory: true, monitoringRequired: true, status: 'Fulfilled', lastReviewDate: '2024-01-10' },
                      { code: 'NEG_LST_CLR', name: 'Borrower Must Not Be in Negative List', category: 'Compliance', type: 'Standard', mandatory: true, monitoringRequired: false, status: 'Fulfilled' },
                    ]}
                  />
                </section>
              </div>
            )}
            {activeTab === "tbo" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Total Business Opportunity (TBO)</h2>
                  </div>

                  <TBOManager 
                    initialOpportunities={[
                      { category: 'Lending', opportunityAmount: 15000000, capturedAmount: 10000000, probability: 100, status: 'Won' },
                      { category: 'Trade Finance', opportunityAmount: 5000000, capturedAmount: 1500000, probability: 60, status: 'Proposed' },
                      { category: 'Cash Management', opportunityAmount: 2000000, capturedAmount: 800000, probability: 80, status: 'Proposed' },
                      { category: 'FX & Treasury', opportunityAmount: 3500000, capturedAmount: 1200000, probability: 45, status: 'Identified' },
                      { category: 'Payroll', opportunityAmount: 1200000, capturedAmount: 0, probability: 30, status: 'Identified' },
                      { category: 'Fee Based Income', opportunityAmount: 800000, capturedAmount: 250000, probability: 90, status: 'Won' },
                    ]}
                  />
                </section>
              </div>
            )}
            {activeTab === "tbo-docs" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">To Be Obtained (Docs & Data)</h2>
                  </div>

                  <TBODocManager />
                </section>
              </div>
            )}
            {activeTab === "financials" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Financial Spreading & Analysis</h2>
                  </div>

                  <FinancialAnalysis />
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals - Reusing previous logic */}
      {isFacilityModalOpen && (
        <FacilityDetailForm 
          segment={appSegment}
          onClose={() => setIsFacilityModalOpen(false)}
          onSave={(data) => {
            const newFacility = {
              id: facilities.length + 1,
              name: data.facility.name,
              amount: Number(data.details.proposed_limit) || 0,
              outstanding: 0,
              currency: data.details.currency || "USD",
              type: data.facility.code,
              status: "Draft"
            };
            setFacilities([...facilities, newFacility]);
            setIsFacilityModalOpen(false);
          }}
        />
      )}

      {isCollateralModalOpen && (
        <CollateralDetailForm 
          onClose={() => setIsCollateralModalOpen(false)}
          onSave={(data) => {
            const newCollateral = {
              id: collaterals.length + 1,
              type: data.type,
              value: 12000000, // Mock value
              description: "New collateral added",
              code: `COL-${collaterals.length + 1}`
            };
            setCollaterals([...collaterals, newCollateral]);
            setIsCollateralModalOpen(false);
          }}
        />
      )}

      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider">Manage Linkages</h2>
              <button onClick={() => setIsLinkModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <FormField label="Select Collateral" type="select" options={collaterals.map(c => `${c.type} (${c.code})`)} />
              <div className="space-y-2 mt-2 max-h-48 overflow-y-auto border border-border p-2 bg-surface">
                {facilities.map(f => (
                  <label key={f.id} className="flex items-center gap-3 p-2 hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-border">
                    <input type="checkbox" className="w-4 h-4 accent-primary" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{f.type}</span>
                      <span className="text-[10px] text-text-secondary">FAC-00{f.id} • ${f.amount.toLocaleString()}</span>
                    </div>
                  </label>
                ))}
              </div>
              <button onClick={() => setIsLinkModalOpen(false)} className="w-full bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover mt-4">
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
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
          {type === "currency" && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary">IDR</span>}
        </div>
      )}
    </div>
  );
}
