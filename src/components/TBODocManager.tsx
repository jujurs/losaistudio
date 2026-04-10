import React, { useState } from "react";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileUp, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  History,
  AlertTriangle,
  Info
} from "lucide-react";

interface TBODocument {
  id: string;
  name: string;
  category: 'Legal' | 'Financial' | 'Collateral' | 'Operational' | 'Compliance';
  scope: 'Customer' | 'Application' | 'Facility' | 'Collateral';
  requestedFrom: string;
  mandatory: boolean;
  blocking: boolean;
  status: 'Not Requested' | 'Requested' | 'Submitted' | 'Verified' | 'Rejected' | 'Expired' | 'Outstanding';
  dueDate?: string;
  submittedDate?: string;
  expiryDate?: string;
  verificationNotes?: string;
  deficiencyReason?: string;
}

const MOCK_DOCS: TBODocument[] = [
  { id: '1', name: 'Akta Pendirian & Perubahan Terakhir', category: 'Legal', scope: 'Customer', requestedFrom: 'Borrower', mandatory: true, blocking: true, status: 'Verified', submittedDate: '2024-04-01' },
  { id: '2', name: 'Audited Financial Statement FY2023', category: 'Financial', scope: 'Customer', requestedFrom: 'Borrower', mandatory: true, blocking: false, status: 'Submitted', submittedDate: '2024-04-05' },
  { id: '3', name: 'KTP Direksi & Komisaris', category: 'Legal', scope: 'Customer', requestedFrom: 'Directors', mandatory: true, blocking: true, status: 'Verified', submittedDate: '2024-04-01' },
  { id: '4', name: 'Appraisal Report - Ruko Kelapa Gading', category: 'Collateral', scope: 'Collateral', requestedFrom: 'External Appraiser', mandatory: true, blocking: true, status: 'Requested', dueDate: '2024-04-15' },
  { id: '5', name: 'Bank Statement (Last 6 Months)', category: 'Financial', scope: 'Customer', requestedFrom: 'Borrower', mandatory: true, blocking: false, status: 'Rejected', submittedDate: '2024-04-02', deficiencyReason: 'Pages 3-4 are unreadable/blurry.' },
  { id: '6', name: 'Board Resolution for Borrowing', category: 'Legal', scope: 'Application', requestedFrom: 'Borrower', mandatory: true, blocking: true, status: 'Not Requested' },
  { id: '7', name: 'Insurance Policy (All Risk)', category: 'Collateral', scope: 'Collateral', requestedFrom: 'Borrower', mandatory: true, blocking: true, status: 'Outstanding', dueDate: '2024-04-10' },
];

export default function TBODocManager() {
  const [docs, setDocs] = useState<TBODocument[]>(MOCK_DOCS);
  const [filter, setFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const stats = {
    total: docs.length,
    verified: docs.filter(d => d.status === 'Verified').length,
    pending: docs.filter(d => d.status === 'Submitted' || d.status === 'Requested').length,
    outstanding: docs.filter(d => d.status === 'Outstanding' || d.status === 'Rejected').length,
    blocking: docs.filter(d => d.blocking && (d.status === 'Not Requested' || d.status === 'Requested' || d.status === 'Rejected' || d.status === 'Outstanding')).length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'text-success bg-success/10';
      case 'Submitted': return 'text-primary bg-primary/10';
      case 'Requested': return 'text-warning bg-warning/10';
      case 'Rejected': return 'text-danger bg-danger/10';
      case 'Expired': return 'text-danger bg-danger/10';
      case 'Outstanding': return 'text-danger bg-danger/10 border-dashed border-danger/50';
      default: return 'text-text-secondary bg-surface border border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'Submitted': return <FileUp className="w-3.5 h-3.5" />;
      case 'Requested': return <Clock className="w-3.5 h-3.5" />;
      case 'Rejected': return <AlertCircle className="w-3.5 h-3.5" />;
      case 'Outstanding': return <AlertTriangle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total Requirements" value={stats.total} />
        <StatCard label="Verified" value={stats.verified} color="text-success" />
        <StatCard label="In Progress" value={stats.pending} color="text-primary" />
        <StatCard label="Outstanding" value={stats.outstanding} color="text-warning" />
        <StatCard label="Blocking Items" value={stats.blocking} color="text-danger" isUrgent={stats.blocking > 0} />
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex bg-surface p-1 rounded border border-border">
          {['All', 'Legal', 'Financial', 'Collateral', 'Compliance'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${filter === cat ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border text-[10px] font-bold hover:bg-surface transition-colors">
            <Filter className="w-3.5 h-3.5" /> ADVANCED FILTER
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-[10px] font-bold hover:bg-primary-hover transition-colors">
            <Download className="w-3.5 h-3.5" /> EXPORT CHECKLIST
          </button>
        </div>
      </div>

      {/* Document List */}
      <div className="carbon-card p-0 overflow-hidden border border-border">
        <div className="bg-surface border-b border-border px-6 py-3 flex justify-between items-center">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Required Documents & Data</h3>
          <span className="text-[10px] font-bold text-text-secondary bg-white px-2 py-0.5 border border-border rounded">
            COMPLETENESS: {Math.round((stats.verified / stats.total) * 100)}%
          </span>
        </div>

        <div className="divide-y divide-border">
          {docs.filter(d => filter === 'All' || d.category === filter).map((doc) => (
            <div key={doc.id} className={`transition-all ${expandedId === doc.id ? 'bg-primary/5' : 'hover:bg-surface'}`}>
              <div 
                className="px-6 py-4 flex items-center gap-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === doc.id ? null : doc.id)}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-text-primary truncate">{doc.name}</span>
                    {doc.mandatory && <span className="text-[8px] font-bold bg-danger/10 text-danger px-1 rounded uppercase">Mandatory</span>}
                    {doc.blocking && <span className="text-[8px] font-bold bg-danger text-white px-1 rounded uppercase">Blocking</span>}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-text-secondary">
                    <span className="uppercase font-bold">{doc.category}</span>
                    <span className="flex items-center gap-1"><Info className="w-3 h-3" /> {doc.scope}: {doc.requestedFrom}</span>
                  </div>
                </div>

                <div className="text-right hidden md:block">
                  <p className="text-[10px] text-text-secondary uppercase font-bold">Status</p>
                  <p className={`text-[10px] font-bold uppercase ${getStatusColor(doc.status).split(' ')[0]}`}>{doc.status}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-white rounded text-text-secondary hover:text-primary transition-colors">
                    <FileUp className="w-4 h-4" />
                  </button>
                  {expandedId === doc.id ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                </div>
              </div>

              {expandedId === doc.id && (
                <div className="px-6 pb-6 pt-2 border-t border-primary/10 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <DetailBlock label="Requirement Description" value="Standard legal requirement for corporate borrowers to verify legal standing and authorized signatories." />
                      <DetailBlock label="Requested From" value={doc.requestedFrom} />
                    </div>
                    <div className="space-y-4">
                      <DetailBlock label="Due Date" value={doc.dueDate || 'N/A'} />
                      <DetailBlock label="Submitted Date" value={doc.submittedDate || 'N/A'} />
                      <DetailBlock label="Expiry Date" value={doc.expiryDate || 'N/A'} />
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-white border border-border rounded">
                        <h4 className="text-[9px] font-bold uppercase text-text-secondary mb-2">Verification & Notes</h4>
                        {doc.status === 'Rejected' ? (
                          <div className="flex items-start gap-2 text-danger">
                            <AlertCircle className="w-3.5 h-3.5 mt-0.5" />
                            <p className="text-[10px] leading-relaxed font-bold">{doc.deficiencyReason}</p>
                          </div>
                        ) : doc.status === 'Verified' ? (
                          <div className="flex items-start gap-2 text-success">
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5" />
                            <p className="text-[10px] leading-relaxed font-bold">Document verified and accepted by Compliance Team.</p>
                          </div>
                        ) : (
                          <p className="text-[10px] text-text-secondary italic">No verification notes available.</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-surface border border-border text-[9px] font-bold uppercase hover:bg-border flex items-center justify-center gap-1">
                          <Eye className="w-3 h-3" /> PREVIEW
                        </button>
                        <button className="flex-1 py-1.5 bg-surface border border-border text-[9px] font-bold uppercase hover:bg-border flex items-center justify-center gap-1">
                          <History className="w-3 h-3" /> HISTORY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "text-text-primary", isUrgent = false }: any) {
  return (
    <div className={`carbon-card p-4 bg-white border ${isUrgent ? 'border-danger/30 bg-danger/5' : 'border-border'}`}>
      <p className="text-[9px] font-bold uppercase text-text-secondary mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <h4 className="text-[9px] font-bold uppercase text-text-secondary mb-1">{label}</h4>
      <p className="text-[10px] text-text-primary leading-relaxed">{value}</p>
    </div>
  );
}
