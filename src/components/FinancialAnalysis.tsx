import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Download, 
  RefreshCw, 
  AlertCircle,
  CheckCircle2,
  Table as TableIcon,
  PieChart as PieChartIcon,
  Calculator
} from "lucide-react";

interface FinancialYear {
  year: string;
  type: 'Audited' | 'Management' | 'Projection';
  revenue: number;
  grossProfit: number;
  ebitda: number;
  netProfit: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  currentRatio: number;
  der: number;
  dscr: number;
}

const MOCK_FINANCIALS: FinancialYear[] = [
  {
    year: '2021',
    type: 'Audited',
    revenue: 35000000,
    grossProfit: 8500000,
    ebitda: 4200000,
    netProfit: 2100000,
    totalAssets: 45000000,
    totalLiabilities: 28000000,
    totalEquity: 17000000,
    currentRatio: 1.45,
    der: 1.65,
    dscr: 1.35
  },
  {
    year: '2022',
    type: 'Audited',
    revenue: 42000000,
    grossProfit: 10200000,
    ebitda: 5100000,
    netProfit: 2800000,
    totalAssets: 52000000,
    totalLiabilities: 31000000,
    totalEquity: 21000000,
    currentRatio: 1.55,
    der: 1.48,
    dscr: 1.42
  },
  {
    year: '2023',
    type: 'Audited',
    revenue: 48500000,
    grossProfit: 11800000,
    ebitda: 5800000,
    netProfit: 3200000,
    totalAssets: 58000000,
    totalLiabilities: 34000000,
    totalEquity: 24000000,
    currentRatio: 1.62,
    der: 1.42,
    dscr: 1.48
  }
];

export default function FinancialAnalysis() {
  const [data] = useState<FinancialYear[]>(MOCK_FINANCIALS);
  const [viewMode, setViewMode] = useState<'spreading' | 'ratios' | 'analysis'>('spreading');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getTrend = (curr: number, prev: number) => {
    if (curr > prev) return <TrendingUp className="w-3 h-3 text-success" />;
    if (curr < prev) return <TrendingDown className="w-3 h-3 text-danger" />;
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex bg-surface p-1 rounded border border-border">
          <button 
            onClick={() => setViewMode('spreading')}
            className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === 'spreading' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Financial Spreading
          </button>
          <button 
            onClick={() => setViewMode('ratios')}
            className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === 'ratios' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Ratio Analysis
          </button>
          <button 
            onClick={() => setViewMode('analysis')}
            className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === 'analysis' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
          >
            Credit Commentary
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border text-[10px] font-bold hover:bg-surface transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> RE-SPREAD
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-[10px] font-bold hover:bg-primary-hover transition-colors">
            <Download className="w-3.5 h-3.5" /> EXPORT REPORT
          </button>
        </div>
      </div>

      {viewMode === 'spreading' && (
        <div className="carbon-card p-0 overflow-hidden border border-border">
          <table className="carbon-table">
            <thead>
              <tr className="bg-surface">
                <th className="w-64">Financial Items (USD)</th>
                {data.map(y => (
                  <th key={y.year} className="text-right">
                    <div className="flex flex-col">
                      <span>FY {y.year}</span>
                      <span className="text-[8px] font-normal opacity-70">{y.type}</span>
                    </div>
                  </th>
                ))}
                <th className="text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="bg-surface/30 font-bold"><td colSpan={5}>Profit & Loss Statement</td></tr>
              <DataRow label="Total Revenue" values={data.map(y => y.revenue)} format={formatCurrency} />
              <DataRow label="Gross Profit" values={data.map(y => y.grossProfit)} format={formatCurrency} />
              <DataRow label="EBITDA" values={data.map(y => y.ebitda)} format={formatCurrency} />
              <DataRow label="Net Profit" values={data.map(y => y.netProfit)} format={formatCurrency} highlight />
              
              <tr className="bg-surface/30 font-bold"><td colSpan={5}>Balance Sheet Summary</td></tr>
              <DataRow label="Total Assets" values={data.map(y => y.totalAssets)} format={formatCurrency} />
              <DataRow label="Total Liabilities" values={data.map(y => y.totalLiabilities)} format={formatCurrency} />
              <DataRow label="Total Equity" values={data.map(y => y.totalEquity)} format={formatCurrency} highlight />
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'ratios' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RatioCard 
            title="Liquidity Ratios" 
            items={[
              { label: 'Current Ratio', values: data.map(y => y.currentRatio), target: '> 1.20' },
            ]} 
          />
          <RatioCard 
            title="Leverage Ratios" 
            items={[
              { label: 'Debt to Equity (DER)', values: data.map(y => y.der), target: '< 2.50' },
            ]} 
          />
          <RatioCard 
            title="Solvency Ratios" 
            items={[
              { label: 'DSCR', values: data.map(y => y.dscr), target: '> 1.25' },
            ]} 
          />
        </div>
      )}

      {viewMode === 'analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="carbon-card bg-white">
              <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Qualitative Analysis
              </h3>
              <div className="space-y-4">
                <AnalysisSection 
                  title="Revenue Growth Analysis" 
                  content="The company demonstrated a steady 15% YoY revenue growth, driven by expansion in the export market. Gross margins remained stable at ~24% despite rising raw material costs."
                />
                <AnalysisSection 
                  title="Liquidity & Working Capital" 
                  content="Current ratio improved from 1.45 to 1.62, indicating better management of accounts receivable and inventory turnover. Cash position remains strong to support debt servicing."
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="carbon-card bg-surface/30 border-dashed">
              <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">Credit Risk Rating</h3>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-primary mb-1">A-</div>
                <p className="text-[10px] font-bold uppercase text-text-secondary">Low-Medium Risk</p>
              </div>
              <div className="space-y-2 pt-4 border-t border-border">
                <RatingFactor label="Financial Strength" score={4} />
                <RatingFactor label="Industry Outlook" score={3} />
                <RatingFactor label="Management Quality" score={4} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DataRow({ label, values, format, highlight = false }: any) {
  const last = values[values.length - 1];
  const prev = values[values.length - 2];
  
  return (
    <tr className={highlight ? 'bg-primary/5 font-bold' : ''}>
      <td className="text-text-secondary">{label}</td>
      {values.map((v: number, i: number) => (
        <td key={i} className="text-right font-mono">{format(v)}</td>
      ))}
      <td className="text-right">
        <div className="flex justify-end">
          {last > prev ? <TrendingUp className="w-3.5 h-3.5 text-success" /> : <TrendingDown className="w-3.5 h-3.5 text-danger" />}
        </div>
      </td>
    </tr>
  );
}

function RatioCard({ title, items }: any) {
  return (
    <div className="carbon-card bg-white">
      <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4">{title}</h3>
      <div className="space-y-6">
        {items.map((item: any, idx: number) => (
          <div key={idx}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-text-primary">{item.label}</span>
              <span className="text-[10px] text-text-secondary">Target: {item.target}</span>
            </div>
            <div className="flex items-center gap-4">
              {item.values.map((v: number, i: number) => (
                <div key={i} className="flex-1 text-center">
                  <div className="text-xs font-mono font-bold">{v.toFixed(2)}</div>
                  <div className="text-[8px] text-text-secondary uppercase">FY{2021 + i}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisSection({ title, content }: { title: string, content: string }) {
  return (
    <div className="p-3 bg-surface border border-border">
      <h4 className="text-[10px] font-bold uppercase text-text-primary mb-1">{title}</h4>
      <p className="text-xs text-text-secondary leading-relaxed">{content}</p>
    </div>
  );
}

function RatingFactor({ label, score }: { label: string, score: number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] text-text-secondary">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`w-2 h-1 rounded-full ${i <= score ? 'bg-primary' : 'bg-border'}`} />
        ))}
      </div>
    </div>
  );
}
