import React, { useState } from "react";
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight,
  X,
  Building2,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { MOCK_PORTFOLIOS } from "../constants";

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState(MOCK_PORTFOLIOS);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Corporate Portfolio</h1>
          <p className="text-text-secondary text-sm">Managing {portfolios.length} corporate relationships.</p>
        </div>
        <button 
          onClick={() => window.location.hash = "new-portfolio"}
          className="bg-primary text-white px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" /> NEW PORTFOLIO
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-border p-4 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or sector..." 
            className="bg-surface border-none h-9 pl-8 pr-4 text-xs w-80 focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-border px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-surface-hover">
            <Filter className="w-4 h-4" /> FILTERS
          </button>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="carbon-card p-0 overflow-hidden">
        <table className="carbon-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Sector</th>
              <th>Location</th>
              <th className="text-right">Total Exposure</th>
              <th className="text-center">Rating</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((p) => (
              <tr 
                key={p.id} 
                className="hover:bg-surface-hover cursor-pointer group"
                onClick={() => window.location.hash = `portfolio-detail`}
              >
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-text-primary">{p.name}</span>
                    <span className="text-[10px] font-mono text-text-secondary">{p.id}</span>
                  </div>
                </td>
                <td>
                  <span className="text-xs">{p.sector}</span>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </div>
                </td>
                <td className="text-right font-mono font-medium">
                  ${p.exposure.toLocaleString()}
                </td>
                <td className="text-center">
                  <span className="text-xs font-bold bg-surface px-2 py-0.5 border border-border">
                    {p.rating}
                  </span>
                </td>
                <td>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    p.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="opacity-0 group-hover:opacity-100 p-1 text-primary transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-text-secondary hover:text-text-primary">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
