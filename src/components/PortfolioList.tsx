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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    name: "",
    sector: "Industrial",
    location: "",
    exposure: "",
    rating: "BBB"
  });

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `DEB-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)}`;
    const portfolio = {
      id,
      name: newPortfolio.name,
      sector: newPortfolio.sector,
      location: newPortfolio.location,
      exposure: Number(newPortfolio.exposure) || 0,
      rating: newPortfolio.rating,
      status: "Active"
    };
    setPortfolios([portfolio, ...portfolios]);
    setIsModalOpen(false);
    setNewPortfolio({ name: "", sector: "Industrial", location: "", exposure: "", rating: "BBB" });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Corporate Portfolio</h1>
          <p className="text-text-secondary text-sm">Managing {portfolios.length} corporate relationships.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
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

      {/* New Portfolio Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider">Create New Portfolio</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddPortfolio} className="p-6 space-y-4">
              <div>
                <label className="carbon-label">Customer Legal Name</label>
                <input 
                  required
                  type="text" 
                  value={newPortfolio.name}
                  onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  placeholder="e.g. Acme Corp Industries"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="carbon-label">Sector</label>
                  <select 
                    value={newPortfolio.sector}
                    onChange={(e) => setNewPortfolio({...newPortfolio, sector: e.target.value})}
                    className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>Industrial</option>
                    <option>Technology</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Energy</option>
                  </select>
                </div>
                <div>
                  <label className="carbon-label">Risk Rating</label>
                  <select 
                    value={newPortfolio.rating}
                    onChange={(e) => setNewPortfolio({...newPortfolio, rating: e.target.value})}
                    className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>A+</option>
                    <option>A</option>
                    <option>A-</option>
                    <option>BBB+</option>
                    <option>BBB</option>
                    <option>BBB-</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="carbon-label">Location (City, State)</label>
                <input 
                  required
                  type="text" 
                  value={newPortfolio.location}
                  onChange={(e) => setNewPortfolio({...newPortfolio, location: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  placeholder="e.g. Houston, TX"
                />
              </div>
              <div>
                <label className="carbon-label">Initial Exposure (USD)</label>
                <input 
                  required
                  type="number" 
                  value={newPortfolio.exposure}
                  onChange={(e) => setNewPortfolio({...newPortfolio, exposure: e.target.value})}
                  className="w-full bg-surface border border-border p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0.00"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-surface border border-border py-2 text-xs font-bold hover:bg-surface-hover"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover"
                >
                  CREATE PORTFOLIO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
