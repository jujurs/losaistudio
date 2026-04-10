import React from "react";
import { 
  FileSpreadsheet, 
  Download, 
  Upload, 
  Filter, 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { MOCK_FINANCIALS, MOCK_CUSTOMER } from "../constants";

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0 
  }).format(val);

export default function FinancialAnalysis() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Financial Spreading & Analysis</h1>
          <p className="text-text-secondary text-sm">Customer: {MOCK_CUSTOMER.name}</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-border px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-surface-hover transition-colors">
            <Upload className="w-4 h-4" /> IMPORT DATA
          </button>
          <button className="bg-white border border-border px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-surface-hover transition-colors">
            <Download className="w-4 h-4" /> EXPORT EXCEL
          </button>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="bg-white border border-border p-4 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="carbon-label">Template</label>
            <button className="bg-surface border border-border px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              Commercial Industrial <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label className="carbon-label">Currency</label>
            <button className="bg-surface border border-border px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              USD (Actuals) <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-text-secondary hover:bg-surface-hover border border-border">
            <Filter className="w-4 h-4" />
          </button>
          <button className="bg-primary text-white px-4 py-2 text-xs font-bold hover:bg-primary-hover transition-colors">
            RUN QUANTITATIVE ANALYSIS
          </button>
        </div>
      </div>

      {/* Spreading Table */}
      <div className="carbon-card overflow-hidden p-0">
        <table className="carbon-table">
          <thead>
            <tr>
              <th className="w-1/3">Line Item</th>
              {MOCK_FINANCIALS.periods.map((p, i) => (
                <th key={i} className="text-right">{p}</th>
              ))}
              <th className="text-center w-24">Trend</th>
            </tr>
          </thead>
          <tbody>
            {/* Income Statement Section */}
            <tr className="bg-surface/50">
              <td colSpan={5} className="py-2 px-4 text-[10px] font-bold uppercase tracking-widest text-primary">Income Statement</td>
            </tr>
            {MOCK_FINANCIALS.rows.filter(r => r.category === "Income Statement").map((row, i) => (
              <tr key={i} className={row.isBold ? "font-bold bg-surface/20" : ""}>
                <td className="pl-6">{row.label}</td>
                {row.values.map((v, j) => (
                  <td key={j} className="text-right font-mono">{formatCurrency(v)}</td>
                ))}
                <td className="flex justify-center py-3">
                  {row.values[2] > row.values[1] ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : row.values[2] < row.values[1] ? (
                    <TrendingDown className="w-4 h-4 text-danger" />
                  ) : (
                    <Minus className="w-4 h-4 text-text-secondary" />
                  )}
                </td>
              </tr>
            ))}

            {/* Balance Sheet Section */}
            <tr className="bg-surface/50">
              <td colSpan={5} className="py-2 px-4 text-[10px] font-bold uppercase tracking-widest text-primary">Balance Sheet</td>
            </tr>
            {MOCK_FINANCIALS.rows.filter(r => r.category === "Balance Sheet").map((row, i) => (
              <tr key={i} className={row.isBold ? "font-bold bg-surface/20" : ""}>
                <td className="pl-6">{row.label}</td>
                {row.values.map((v, j) => (
                  <td key={j} className="text-right font-mono">{formatCurrency(v)}</td>
                ))}
                <td className="flex justify-center py-3">
                  {row.values[2] > row.values[1] ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : row.values[2] < row.values[1] ? (
                    <TrendingDown className="w-4 h-4 text-danger" />
                  ) : (
                    <Minus className="w-4 h-4 text-text-secondary" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quantitative Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="carbon-card bg-primary/5 border-primary/20">
          <h3 className="carbon-label">Calculated DSCR</h3>
          <p className="text-3xl font-bold text-primary">1.42x</p>
          <p className="text-[10px] text-text-secondary mt-1">Policy Minimum: 1.25x</p>
        </div>
        <div className="carbon-card bg-success/5 border-success/20">
          <h3 className="carbon-label">Leverage Ratio</h3>
          <p className="text-3xl font-bold text-success">2.4x</p>
          <p className="text-[10px] text-text-secondary mt-1">Industry Benchmark: 3.0x</p>
        </div>
        <div className="carbon-card bg-warning/5 border-warning/20">
          <h3 className="carbon-label">Liquidity Index</h3>
          <p className="text-3xl font-bold text-warning">0.85</p>
          <p className="text-[10px] text-text-secondary mt-1">Stable Range: 0.8 - 1.2</p>
        </div>
      </div>
    </div>
  );
}
