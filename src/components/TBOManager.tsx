import React, { useState } from "react";
import { 
  Target, 
  TrendingUp, 
  PieChart, 
  ArrowUpRight, 
  Briefcase, 
  DollarSign, 
  Users,
  BarChart3,
  ChevronRight,
  Plus,
  MoreVertical,
  Zap
} from "lucide-react";
import { TBOProductOpportunity, TBO_PRODUCT_CATEGORIES } from "../data/facilityMaster";

interface TBOManagerProps {
  initialOpportunities?: TBOProductOpportunity[];
}

export default function TBOManager({ initialOpportunities }: TBOManagerProps) {
  const [opportunities, setOpportunities] = useState<TBOProductOpportunity[]>(initialOpportunities || []);

  const totalOpportunity = opportunities.reduce((acc, curr) => acc + curr.opportunityAmount, 0);
  const totalCaptured = opportunities.reduce((acc, curr) => acc + curr.capturedAmount, 0);
  const walletShare = totalOpportunity > 0 ? (totalCaptured / totalOpportunity) * 100 : 0;
  const gap = totalOpportunity - totalCaptured;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Relationship Wallet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="carbon-card p-4 bg-primary text-white border-none">
          <p className="text-[9px] font-bold uppercase opacity-70 mb-1">Total Relationship Wallet</p>
          <p className="text-xl font-bold">${(totalOpportunity / 1000000).toFixed(1)}M</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] opacity-80">
            <Target className="w-3 h-3" /> Estimated Annual Potential
          </div>
        </div>
        
        <div className="carbon-card p-4 bg-white border-border">
          <p className="text-[9px] font-bold uppercase text-text-secondary mb-1">Captured Value</p>
          <p className="text-xl font-bold text-success">${(totalCaptured / 1000000).toFixed(1)}M</p>
          <div className="mt-2 w-full bg-surface h-1 rounded-full overflow-hidden">
            <div className="bg-success h-full" style={{ width: `${walletShare}%` }} />
          </div>
        </div>

        <div className="carbon-card p-4 bg-white border-border">
          <p className="text-[9px] font-bold uppercase text-text-secondary mb-1">Wallet Share</p>
          <p className="text-xl font-bold text-primary">{walletShare.toFixed(1)}%</p>
          <p className="text-[10px] text-text-secondary mt-2">Target: 45.0%</p>
        </div>

        <div className="carbon-card p-4 bg-white border-border">
          <p className="text-[9px] font-bold uppercase text-text-secondary mb-1">Uncaptured Gap</p>
          <p className="text-xl font-bold text-warning">${(gap / 1000000).toFixed(1)}M</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-warning font-bold">
            <Zap className="w-3 h-3" /> High Cross-sell Potential
          </div>
        </div>
      </div>

      {/* Business Profile Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="carbon-card p-0 overflow-hidden border border-border">
            <div className="bg-surface border-b border-border px-6 py-3 flex justify-between items-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Product Opportunity Matrix</h3>
              <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> ADD OPPORTUNITY
              </button>
            </div>
            
            <table className="carbon-table">
              <thead>
                <tr>
                  <th>Product Category</th>
                  <th className="text-right">Opportunity</th>
                  <th className="text-right">Captured</th>
                  <th className="text-right">Share</th>
                  <th className="text-center">Probability</th>
                  <th>Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {opportunities.map((opp, idx) => {
                  const share = (opp.capturedAmount / opp.opportunityAmount) * 100;
                  return (
                    <tr key={idx} className="hover:bg-surface/50">
                      <td className="font-bold text-text-primary">{opp.category}</td>
                      <td className="text-right font-mono">${(opp.opportunityAmount / 1000).toFixed(0)}K</td>
                      <td className="text-right font-mono text-success">${(opp.capturedAmount / 1000).toFixed(0)}K</td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] font-bold">{share.toFixed(0)}%</span>
                          <div className="w-12 bg-surface h-1 rounded-full overflow-hidden">
                            <div className="bg-primary h-full" style={{ width: `${share}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          opp.probability >= 70 ? 'bg-success/10 text-success' :
                          opp.probability >= 40 ? 'bg-warning/10 text-warning' :
                          'bg-text-secondary/10 text-text-secondary'
                        }`}>
                          {opp.probability}%
                        </span>
                      </td>
                      <td>
                        <span className="text-[10px] font-bold uppercase text-text-secondary">
                          {opp.status}
                        </span>
                      </td>
                      <td>
                        <button className="p-1 hover:bg-surface rounded">
                          <MoreVertical className="w-3.5 h-3.5 text-text-secondary" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Plan */}
          <div className="carbon-card bg-white">
            <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Strategic Action Plan
            </h3>
            <div className="space-y-3">
              <ActionItem 
                title="FX Hedging Bundling" 
                desc="Propose Forward contracts for import payments to capture $2M annual FX volume."
                date="Target: Q2 2024"
                priority="High"
              />
              <ActionItem 
                title="Payroll Migration" 
                desc="Onboard 450 employees to bank payroll system to boost CASA float by $1.2M."
                date="Target: Q3 2024"
                priority="Medium"
              />
              <ActionItem 
                title="Supply Chain Finance" 
                desc="Link 12 key suppliers to the anchor program to capture $5M trade volume."
                date="Target: Q4 2024"
                priority="High"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Business Profile Summary */}
          <div className="carbon-card bg-white">
            <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Business Flow Profile</h3>
            <div className="space-y-4">
              <ProfileItem label="Annual Sales" value="$45.0M" />
              <ProfileItem label="Annual Procurement" value="$32.5M" />
              <ProfileItem label="Import Volume" value="$12.0M" />
              <ProfileItem label="Export Volume" value="$8.5M" />
              <ProfileItem label="Monthly Payroll" value="$1.2M" />
              <ProfileItem label="Avg. CASA Float" value="$2.8M" />
            </div>
          </div>

          {/* Competitor Insight */}
          <div className="carbon-card bg-surface/30 border-dashed">
            <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Competitor Landscape</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-bold">Our Bank</span>
                </div>
                <span className="text-xs font-mono">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-xs font-bold">Bank ABC (Main)</span>
                </div>
                <span className="text-xs font-mono">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="text-xs font-bold">Bank XYZ</span>
                </div>
                <span className="text-xs font-mono">23%</span>
              </div>
              <div className="pt-2 border-t border-border mt-2">
                <p className="text-[10px] text-text-secondary italic leading-tight">
                  "Customer prefers Bank ABC for trade due to legacy pricing, but open to switching for better digital channel experience."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionItem({ title, desc, date, priority }: { title: string, desc: string, date: string, priority: string }) {
  return (
    <div className="p-3 bg-surface border border-border flex items-start gap-3 hover:border-primary/30 transition-colors cursor-pointer group">
      <div className={`w-1 h-10 rounded-full ${priority === 'High' ? 'bg-danger' : 'bg-warning'}`} />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">{title}</h4>
          <span className="text-[9px] font-bold text-text-secondary">{date}</span>
        </div>
        <p className="text-[10px] text-text-secondary mt-1 leading-tight">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-text-secondary mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function ProfileItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-surface last:border-0">
      <span className="text-[10px] text-text-secondary font-bold uppercase tracking-tight">{label}</span>
      <span className="text-xs font-bold text-text-primary">{value}</span>
    </div>
  );
}
