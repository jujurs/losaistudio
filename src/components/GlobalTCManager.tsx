import React, { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileUp, 
  ShieldCheck, 
  ChevronDown,
  ChevronUp,
  Activity,
  AlertTriangle,
  FileText,
  History,
  Plus,
  Trash2,
  Edit2,
  X
} from "lucide-react";
import { GLOBAL_TC_MASTER, GlobalTCMaster } from "../data/facilityMaster";

interface TCInstance extends GlobalTCMaster {
  status: 'Pending' | 'Fulfilled' | 'Active Monitoring' | 'Breached' | 'Waived';
  dueDate?: string;
  lastReviewDate?: string;
  evidence?: string;
  remarks?: string;
}

interface GlobalTCManagerProps {
  initialTCs?: TCInstance[];
}

export default function GlobalTCManager({ initialTCs }: GlobalTCManagerProps) {
  const [tcs, setTcs] = useState<TCInstance[]>(initialTCs || []);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTC, setEditingTC] = useState<TCInstance | null>(null);

  const stats = {
    total: tcs.length,
    monitoring: tcs.filter(t => t.status === 'Active Monitoring').length,
    breached: tcs.filter(t => t.status === 'Breached').length,
    pending: tcs.filter(t => t.status === 'Pending').length,
    waived: tcs.filter(t => t.status === 'Waived').length
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newTC: TCInstance = {
      code: editingTC?.code || `TC-${Date.now()}`,
      name: data.name as string,
      category: data.category as any,
      type: data.type as any,
      mandatory: data.mandatory === 'on',
      monitoringRequired: data.monitoringRequired === 'on',
      status: (data.status as any) || 'Pending',
      remarks: data.remarks as string,
      dueDate: data.dueDate as string,
    };

    if (editingTC) {
      setTcs(tcs.map(t => t.code === editingTC.code ? newTC : t));
    } else {
      setTcs([...tcs, newTC]);
    }
    setIsModalOpen(false);
    setEditingTC(null);
  };

  const handleDelete = (code: string) => {
    if (window.confirm('Are you sure you want to delete this T&C?')) {
      setTcs(tcs.filter(t => t.code !== code));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Fulfilled': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'Active Monitoring': return <Activity className="w-4 h-4 text-primary" />;
      case 'Pending': return <Clock className="w-4 h-4 text-warning" />;
      case 'Breached': return <AlertTriangle className="w-4 h-4 text-danger" />;
      case 'Waived': return <ShieldCheck className="w-4 h-4 text-text-secondary" />;
      default: return <AlertCircle className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Legal': return 'bg-blue-100 text-blue-700';
      case 'Compliance': return 'bg-orange-100 text-orange-700';
      case 'Financial': return 'bg-green-100 text-green-700';
      case 'Operational': return 'bg-cyan-100 text-cyan-700';
      case 'Security': return 'bg-purple-100 text-purple-700';
      case 'Covenant': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total T&C" value={stats.total} />
        <StatCard label="Active Monitoring" value={stats.monitoring} color="text-primary" />
        <StatCard label="Breached" value={stats.breached} color="text-danger" isUrgent={stats.breached > 0} />
        <StatCard label="Pending" value={stats.pending} color="text-warning" />
        <StatCard label="Waived" value={stats.waived} color="text-text-secondary" />
      </div>

      {/* T&C List */}
      <div className="carbon-card p-0 overflow-hidden border border-border">
        <div className="bg-surface border-b border-border px-6 py-3 flex justify-between items-center">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Global Terms & Conditions (Obligor Level)</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setEditingTC(null);
                setIsModalOpen(true);
              }}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> ADD T&C
            </button>
            <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
              <History className="w-3 h-3" /> VIEW HISTORY
            </button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {tcs.map((tc) => (
            <div key={tc.code} className={`transition-all ${expandedId === tc.code ? 'bg-primary/5' : 'hover:bg-surface'}`}>
              <div 
                className="px-6 py-4 flex items-center gap-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === tc.code ? null : tc.code)}
              >
                <div className="flex-shrink-0">{getStatusIcon(tc.status)}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${getCategoryColor(tc.category)}`}>
                      {tc.category}
                    </span>
                    <span className="text-[8px] font-bold bg-surface border border-border px-1.5 py-0.5 rounded uppercase text-text-secondary">
                      {tc.type}
                    </span>
                    {tc.monitoringRequired && (
                      <span className="text-[8px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase">
                        Monitoring
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-text-primary truncate">{tc.name}</p>
                  <p className="text-[10px] text-text-secondary font-mono">{tc.code}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] text-text-secondary uppercase font-bold">Status</p>
                    <p className={`text-xs font-bold ${
                      tc.status === 'Breached' ? 'text-danger' : 
                      tc.status === 'Active Monitoring' ? 'text-primary' : 
                      'text-text-primary'
                    }`}>
                      {tc.status}
                    </p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] text-text-secondary uppercase font-bold">Due Date</p>
                    <p className="text-xs font-mono">{tc.dueDate || 'N/A'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTC(tc);
                        setIsModalOpen(true);
                      }}
                      className="p-1 hover:bg-primary/10 rounded text-primary"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(tc.code);
                      }}
                      className="p-1 hover:bg-danger/10 rounded text-danger"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {expandedId === tc.code ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                </div>
              </div>

              {expandedId === tc.code && (
                <div className="px-16 pb-6 pt-2 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase text-text-secondary mb-1">T&C Requirement</h4>
                        <p className="text-xs text-text-primary leading-relaxed">
                          The borrower is obligated to {tc.name.toLowerCase()} as part of the global credit facility agreement. 
                          Failure to comply may result in a technical breach of covenant.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-[10px] font-bold hover:bg-surface transition-colors">
                          <FileUp className="w-3.5 h-3.5" /> SUBMIT EVIDENCE
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-[10px] font-bold hover:bg-surface transition-colors">
                          <ShieldCheck className="w-3.5 h-3.5" /> EXCEPTION REQUEST
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-border p-4 space-y-3">
                      <h4 className="text-[10px] font-bold uppercase text-text-secondary border-b border-border pb-1">Monitoring Metadata</h4>
                      <DetailRow label="Standard/Bespoke" value={tc.type} />
                      <DetailRow label="Mandatory?" value={tc.mandatory ? 'Yes' : 'No'} />
                      <DetailRow label="Last Review" value={tc.lastReviewDate || 'Never'} />
                      <div className="pt-2">
                        <h4 className="text-[10px] font-bold uppercase text-text-secondary mb-1">Compliance Notes</h4>
                        <textarea 
                          className="w-full bg-surface border border-border p-2 text-[10px] outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Add compliance notes or breach remarks..."
                          defaultValue={tc.remarks}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Breach Alert */}
      {stats.breached > 0 && (
        <div className="p-4 bg-danger/5 border border-danger/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-danger uppercase tracking-tight">Covenant Breach Detected</p>
            <p className="text-[10px] text-danger/80 mt-1">
              {stats.breached} global T&C/Covenants are currently in BREACHED status. This may impact further drawdowns or trigger a credit review.
            </p>
          </div>
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                {editingTC ? 'Edit T&C' : 'Add New T&C'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="carbon-label">T&C Name</label>
                  <input 
                    name="name" 
                    required 
                    defaultValue={editingTC?.name}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="carbon-label">Category</label>
                  <select 
                    name="category" 
                    defaultValue={editingTC?.category}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>Legal</option>
                    <option>Compliance</option>
                    <option>Financial</option>
                    <option>Operational</option>
                    <option>Security</option>
                    <option>Covenant</option>
                  </select>
                </div>
                <div>
                  <label className="carbon-label">Type</label>
                  <select 
                    name="type" 
                    defaultValue={editingTC?.type}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>Standard</option>
                    <option>Covenant</option>
                    <option>Affirmative</option>
                    <option>Negative</option>
                  </select>
                </div>
                <div>
                  <label className="carbon-label">Status</label>
                  <select 
                    name="status" 
                    defaultValue={editingTC?.status}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>Pending</option>
                    <option>Fulfilled</option>
                    <option>Active Monitoring</option>
                    <option>Breached</option>
                    <option>Waived</option>
                  </select>
                </div>
                <div>
                  <label className="carbon-label">Due Date</label>
                  <input 
                    name="dueDate" 
                    type="date"
                    defaultValue={editingTC?.dueDate}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    name="mandatory" 
                    type="checkbox" 
                    defaultChecked={editingTC?.mandatory}
                    className="w-4 h-4 accent-primary" 
                  />
                  <label className="text-xs font-bold">Mandatory</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    name="monitoringRequired" 
                    type="checkbox" 
                    defaultChecked={editingTC?.monitoringRequired}
                    className="w-4 h-4 accent-primary" 
                  />
                  <label className="text-xs font-bold">Monitoring Required</label>
                </div>
                <div className="col-span-2">
                  <label className="carbon-label">Remarks</label>
                  <textarea 
                    name="remarks" 
                    defaultValue={editingTC?.remarks}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none min-h-[60px]"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-surface text-text-primary py-2 text-xs font-bold border border-border hover:bg-border"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 text-xs font-bold hover:bg-primary-hover"
                >
                  SAVE T&C
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color = "text-text-primary", isUrgent = false }: any) {
  return (
    <div className={`carbon-card p-4 border ${isUrgent ? 'border-danger/30 bg-danger/5' : 'border-border bg-white'}`}>
      <p className="text-[9px] font-bold uppercase text-text-secondary mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-[10px]">
      <span className="text-text-secondary">{label}</span>
      <span className="font-bold text-text-primary">{value}</span>
    </div>
  );
}
