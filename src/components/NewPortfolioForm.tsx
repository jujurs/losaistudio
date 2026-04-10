import React, { useState } from "react";
import { 
  X, 
  ChevronRight, 
  Save, 
  ArrowLeft,
  Plus,
  Trash2,
  Building2,
  Globe,
  Star,
  Home,
  UserCircle,
  History,
  Briefcase,
  Target
} from "lucide-react";

const SECTIONS = [
  { id: "customer-info", label: "Customer Information", icon: Building2 },
  { id: "business-orientation", label: "Business Orientation", icon: Globe },
  { id: "external-rating", label: "External Rating", icon: Star },
  { id: "internal-rating", label: "Internal Rating", icon: ShieldCheck },
  { id: "bank-relationship", label: "Relationship with Bank", icon: Briefcase },
  { id: "addresses", label: "Addresses", icon: Home },
  { id: "contacts", label: "Contact Persons", icon: UserCircle },
  { id: "history", label: "History & Operational", icon: History },
  { id: "other-banks", label: "Other Bank Relationships", icon: Network },
  { id: "prospecting", label: "Prospecting Outcome", icon: Target },
];

import { ShieldCheck, Network } from "lucide-react";

export default function NewPortfolioForm() {
  const [activeSection, setActiveSection] = useState("customer-info");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-border px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.hash = "portfolio"}
            className="p-2 hover:bg-surface rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-text-primary uppercase tracking-tight">Onboard New Corporate Portfolio</h1>
            <p className="text-[10px] text-text-secondary font-bold uppercase">Enterprise Loan Origination System</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.hash = "portfolio"}
            className="px-6 py-2 text-xs font-bold border border-border hover:bg-surface transition-colors"
          >
            CANCEL
          </button>
          <button className="px-6 py-2 text-xs font-bold bg-primary text-white hover:bg-primary-hover flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" /> SAVE PORTFOLIO
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-border overflow-y-auto hidden lg:block">
          <nav className="p-4 space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold transition-all border-l-4 ${
                  activeSection === section.id 
                    ? "bg-surface border-primary text-primary" 
                    : "border-transparent text-text-secondary hover:bg-surface hover:text-text-primary"
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="uppercase tracking-wider text-left">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Form Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-surface">
          <div className="max-w-4xl mx-auto space-y-12 pb-24">
            
            {/* Section: Customer Information */}
            <section id="customer-info" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Customer Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField label="Customer Type" type="select" options={["Corporate", "SME", "Individual"]} readonly />
                <FormField label="SIBS CIF No" type="text" placeholder="Enter CIF Number" />
                <FormField label="Owning Branch" type="lookup" placeholder="Search Branch..." />
                <FormField label="Business Source" type="select" options={["Direct", "Referral", "Broker"]} />
                <FormField label="Other Business Source" type="text" />
                <FormField label="Referral Source" type="select" options={["Internal", "External"]} />
                <FormField label="Referral Region" type="lookup" />
                <FormField label="Referral Branch" type="lookup" />
                <FormField label="Referral Code" type="text" />
                <FormField label="Referral Name" type="text" />
                <FormField label="Customer Full Name" type="text" className="md:col-span-2" />
                <FormField label="SIBS Customer Name" type="text" />
                <FormField label="Formerly Known As" type="text" />
                <FormField label="ID Type" type="select" options={["NPWP", "KTP", "Passport"]} />
                <FormField label="Sust. Finance Risk" type="select" options={["Low", "Medium", "High"]} />
                <FormField label="Alternate ID Type" type="select" options={["NPWP", "KTP", "Passport"]} />
                <FormField label="ID No." type="text" />
                <FormField label="Alternate ID No." type="text" />
                <FormField label="Date of Incorporation" type="date" />
                <FormField label="Type of Company" type="select" options={["PT", "CV", "Firm"]} />
                <FormField label="Country of Incorporation" type="lookup" />
                <FormField label="Type of Company Activity" type="select" options={["Trading", "Manufacturing", "Services"]} />
                <FormField label="Years in Industry" type="number" />
                <FormField label="Startup Company?" type="select" options={["Yes", "No"]} />
                <FormField label="No of Permanent Employees" type="number" />
                <FormField label="Citizen Code" type="select" options={["WNI", "WNA"]} />
                <FormField label="Watch List" type="select" options={["No", "Yes"]} />
                <FormField label="Authorized Capital (IDR)" type="currency" />
                <FormField label="Paid Up Capital (IDR)" type="currency" />
                <FormField label="Indonesian Ownership (%)" type="number" />
                <FormField label="Financial Year End Date" type="select" options={["December", "June", "March"]} />
                <FormField label="Listed Company?" type="select" options={["No", "Yes"]} />
                <FormField label="Related to Listed Company?" type="select" options={["No", "Yes"]} />
                <FormField label="Line of Business" type="textarea" className="md:col-span-3" />
                <FormField label="Debtor Type" type="select" options={["New", "Existing"]} />
                <FormField label="Debtor Since" type="date" />
                <div className="flex flex-col gap-2">
                  <label className="carbon-label">Bank Related?</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input type="radio" name="bank-related" className="w-4 h-4 accent-primary" /> Yes
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input type="radio" name="bank-related" className="w-4 h-4 accent-primary" /> No
                    </label>
                  </div>
                </div>
                <FormField label="Name of Connected Party" type="text" />
                <FormField label="Relationship to Connected Party" type="select" options={["Parent", "Subsidiary", "Director"]} />
                <FormField label="Export Orientation" type="select" options={["Non-Export", "Export"]} />
                <FormField label="Current Account Number" type="text" />
                <FormField label="Debtor Classification" type="lookup" />
                <FormField label="Debtor Status" type="select" options={["Active", "Inactive"]} />
                <FormField label="Total Asset" type="currency" />
                <FormField label="Total Sales" type="currency" />
                <FormField label="Total Asset as of" type="date" />
                <FormField label="Total Sales as of" type="date" />
                <FormField label="Sales Volume Category" type="select" options={["Large", "Medium", "Small"]} />
                <FormField label="Sales Badan Usaha (IDR)" type="currency" />
                <FormField label="Debtor Category" type="select" options={["Corporate", "SME"]} />
                <FormField label="Credit Behavior" type="select" options={["Good", "Fair", "Poor"]} />
                <FormField label="Sector L1" type="lookup" />
                <FormField label="Sector L2 - L3" type="lookup" />
                <FormField label="BI Industrial Code" type="lookup" />
                <FormField label="Funded Sector" type="lookup" />
                <FormField label="SEKOM LBU" type="lookup" />
                <FormField label="SEKOM SD" type="text" />
                <FormField label="Industry RAC Exception" type="select" options={["None", "Approved"]} />
                <FormField label="Collectability" type="select" options={["1 - Pass", "2 - Special Mention", "3 - Substandard"]} />
                <FormField label="Sector Appetite" type="select" options={["High", "Medium", "Low"]} />
                <FormField label="RORA/RAROC" type="number" placeholder="Calculated field" />
              </div>
            </section>

            {/* Section: Business Orientation */}
            <section id="business-orientation" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Business Orientation</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Sales of Product / Services</h3>
                  <RepeaterRow count={3} labels={["Country", "Sub Region / Region", "Continent"]} />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Purchase of Raw Material</h3>
                  <RepeaterRow count={3} labels={["Country", "Sub Region / Region", "Continent"]} />
                </div>
              </div>
            </section>

            {/* Section: External Rating */}
            <section id="external-rating" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <Star className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">External Rating</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField label="Rating" type="text" />
                <FormField label="Rated By" type="text" />
                <FormField label="Date Rating" type="date" />
                <FormField label="Last 3 Years Rating Behavior" type="select" options={["Improving", "Stable", "Declining"]} />
              </div>
            </section>

            {/* Section: Internal Rating */}
            <section id="internal-rating" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Internal Rating</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="Customer Rating" type="text" readonly placeholder="System Generated" />
                <FormField label="Facility Rating" type="text" readonly placeholder="System Generated" />
                <FormField label="Date Rating" type="date" />
              </div>
            </section>

            {/* Section: Existing Relationship with Bank */}
            <section id="bank-relationship" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Existing Relationship with Bank</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField label="Banking Relationship Type" type="select" options={["New", "Existing"]} />
                <FormField label="Banking Relationship Since" type="date" />
                <FormField label="Borrowing Relationship Since" type="date" />
                <FormField label="Total FD Amount (IDR)" type="currency" />
              </div>
            </section>

            {/* Section: Addresses */}
            <section id="addresses" className="space-y-8">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <Home className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Addresses</h2>
              </div>
              
              <div className="space-y-8">
                <div className="carbon-card bg-white">
                  <h3 className="text-[10px] font-bold uppercase text-primary mb-6 border-b border-surface pb-2">Business Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField label="Address Line 1" type="text" className="md:col-span-3" />
                    <FormField label="Address Line 2" type="text" className="md:col-span-3" />
                    <FormField label="Address Line 3" type="text" className="md:col-span-3" />
                    <FormField label="RT / RW" type="text" />
                    <FormField label="District" type="lookup" />
                    <FormField label="Village" type="lookup" />
                    <FormField label="Province" type="lookup" />
                    <FormField label="City" type="lookup" />
                    <FormField label="Country" type="lookup" />
                    <FormField label="Postcode" type="text" />
                    <FormField label="Telephone No. 1" type="text" />
                    <FormField label="Ext" type="text" />
                    <FormField label="Telephone No. 2" type="text" />
                    <FormField label="Ext" type="text" />
                    <FormField label="Fax No." type="text" />
                    <FormField label="Foreign Tel No." type="text" />
                    <FormField label="Premise Type" type="select" options={["Owned", "Rented"]} />
                    <FormField label="Years at Address" type="number" />
                    <FormField label="Mailing Address Indicator" type="select" options={["Yes", "No"]} />
                  </div>
                </div>

                <div className="carbon-card bg-white">
                  <h3 className="text-[10px] font-bold uppercase text-primary mb-6 border-b border-surface pb-2">Other Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField label="Address Line 1" type="text" className="md:col-span-3" />
                    <FormField label="Address Line 2" type="text" className="md:col-span-3" />
                    <FormField label="Address Line 3" type="text" className="md:col-span-3" />
                    <FormField label="RT / RW" type="text" />
                    <FormField label="District" type="lookup" />
                    <FormField label="Village" type="lookup" />
                    <FormField label="Province" type="lookup" />
                    <FormField label="City" type="lookup" />
                    <FormField label="Country" type="lookup" />
                    <FormField label="Postcode" type="text" />
                    <FormField label="Years at Address" type="number" />
                    <FormField label="Telephone No. 1" type="text" />
                    <FormField label="Ext" type="text" />
                    <FormField label="Telephone No. 2" type="text" />
                    <FormField label="Ext" type="text" />
                    <FormField label="Fax No." type="text" />
                    <FormField label="Foreign Tel No." type="text" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Contact Persons */}
            <section id="contacts" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <UserCircle className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Contact Persons</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="carbon-card bg-white p-6">
                    <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Contact Person {i}</h3>
                    <div className="space-y-4">
                      <FormField label="Full Name" type="text" />
                      <FormField label="Salutation" type="select" options={["Mr.", "Ms.", "Mrs.", "Dr."]} />
                      <FormField label="Telephone No" type="text" />
                      <FormField label="Mobile Phone No" type="text" />
                      <FormField label="Designation" type="text" />
                      <FormField label="Email" type="email" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: History & Operational */}
            <section id="history" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <History className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Company Background & Operational</h2>
              </div>
              <div className="space-y-6">
                <FormField label="Company Background / History" type="textarea" className="h-48" />
                <FormField label="Line of Business and Operational" type="textarea" className="h-48" />
              </div>
            </section>

            {/* Section: Other Bank Relationships */}
            <section id="other-banks" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <Network className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Relationship with Other Banks</h2>
              </div>
              <div className="carbon-card p-0 overflow-hidden">
                <table className="carbon-table">
                  <thead>
                    <tr>
                      <th className="w-12">No.</th>
                      <th>Bank Name</th>
                      <th className="text-right">Plafond</th>
                      <th>Facility</th>
                      <th>Collectibility</th>
                      <th>Collateral</th>
                      <th className="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2].map((i) => (
                      <tr key={i}>
                        <td className="text-center font-mono text-[10px]">{i}</td>
                        <td><input type="text" className="w-full bg-surface border-none text-xs p-1" placeholder="Search Bank..." /></td>
                        <td><input type="text" className="w-full bg-surface border-none text-xs p-1 text-right" placeholder="0.00" /></td>
                        <td><input type="text" className="w-full bg-surface border-none text-xs p-1" /></td>
                        <td><input type="text" className="w-full bg-surface border-none text-xs p-1" /></td>
                        <td><textarea className="w-full bg-surface border-none text-xs p-1 h-8" /></td>
                        <td><button className="text-text-secondary hover:text-danger"><Trash2 className="w-3.5 h-3.5" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="w-full py-2 bg-surface text-primary text-[10px] font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-3 h-3" /> ADD BANK RELATIONSHIP
                </button>
              </div>
            </section>

            {/* Section: Prospecting Outcome */}
            <section id="prospecting" className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Prospecting Outcome</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Prospecting Outcome" type="select" options={["Interested", "Not Interested", "Follow Up"]} />
                <FormField label="Follow Up Date" type="date" />
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, type, options, placeholder, readonly, className = "" }: any) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="carbon-label">{label}</label>
      {type === "select" ? (
        <select 
          disabled={readonly}
          className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none disabled:bg-surface"
        >
          {options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea 
          readOnly={readonly}
          className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none min-h-[80px]"
          placeholder={placeholder}
        />
      ) : type === "lookup" ? (
        <div className="relative">
          <input 
            readOnly={readonly}
            type="text" 
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
            className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none disabled:bg-surface"
            placeholder={placeholder}
          />
          {type === "currency" && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary">IDR</span>}
        </div>
      )}
    </div>
  );
}

function RepeaterRow({ count, labels }: { count: number, labels: string[] }) {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-white border border-border relative group">
          {labels.map(label => (
            <FormField key={label} label={label} type="text" />
          ))}
          <button className="absolute -right-2 -top-2 bg-white border border-border p-1 rounded-full text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity hover:text-danger">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ))}
      <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
        <Plus className="w-3 h-3" /> ADD ROW
      </button>
    </div>
  );
}
