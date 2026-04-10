import React, { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileUp, 
  ShieldCheck, 
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Ban,
  Plus,
  Trash2,
  Edit2,
  X
} from "lucide-react";
import { DRAWDOWN_CONDITION_MASTER, DrawdownConditionMaster } from "../data/facilityMaster";

interface ConditionInstance extends DrawdownConditionMaster {
  status: 'Pending' | 'Submitted' | 'Fulfilled' | 'Waived' | 'Rejected';
  targetDate?: string;
  fulfilledDate?: string;
  evidence?: string;
  remarks?: string;
}

interface DrawdownConditionManagerProps {
  facilityId: number;
  facilityType: string;
  initialConditions?: ConditionInstance[];
}

export default function DrawdownConditionManager({ facilityId, facilityType, initialConditions }: DrawdownConditionManagerProps) {
  const [conditions, setConditions] = useState<ConditionInstance[]>(initialConditions || []);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCondition, setEditingCondition] = useState<ConditionInstance | null>(null);

  const stats = {
    total: conditions.length,
    fulfilled: conditions.filter(c => c.status === 'Fulfilled').length,
    pending: conditions.filter(c => c.status === 'Pending').length,
    waived: conditions.filter(c => c.status === 'Waived').length,
    blocking: conditions.filter(c => c.blocking && c.status === 'Pending').length
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newCondition: ConditionInstance = {
      code: editingCondition?.code || `COND-${Date.now()}`,
      name: data.name as string,
      category: data.category as any,
      stage: data.stage as any,
      mandatory: data.mandatory === 'on',
      blocking: data.blocking === 'on',
      status: (data.status as any) || 'Pending',
      remarks: data.remarks as string,
      targetDate: data.targetDate as string,
    };

    if (editingCondition) {
      setConditions(conditions.map(c => c.code === editingCondition.code ? newCondition : c));
    } else {
      setConditions([...conditions, newCondition]);
    }
    setIsModalOpen(false);
    setEditingCondition(null);
  };

  const handleDelete = (code: string) => {
    if (window.confirm('Are you sure you want to delete this condition?')) {
      setConditions(conditions.filter(c => c.code !== code));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Fulfilled': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'Pending': return <Clock className="w-4 h-4 text-warning" />;
      case 'Waived': return <ShieldCheck className="w-4 h-4 text-primary" />;
      case 'Rejected': return <Ban className="w-4 h-4 text-danger" />;
      default: return <AlertCircle className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Legal': return 'bg-blue-100 text-blue-700';
      case 'Collateral': return 'bg-purple-100 text-purple-700';
      case 'Financial': return 'bg-green-100 text-green-700';
      case 'Compliance': return 'bg-orange-100 text-orange-700';
      case 'Utilization': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary Header */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total Conditions" value={stats.total} />
        <StatCard label="Fulfilled" value={stats.fulfilled} color="text-success" />
        <StatCard label="Pending" value={stats.pending} color="text-warning" />
        <StatCard label="Waived" value={stats.waived} color="text-primary" />
        <StatCard label="Blocking Items" value={stats.blocking} color="text-danger" isUrgent={stats.blocking > 0} />
      </div>

      {/* Condition List */}
      <div className="carbon-card p-0 overflow-hidden border border-border">
        <div className="bg-surface border-b border-border px-6 py-3 flex justify-between items-center">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Drawdown Condition Checklist</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setEditingCondition(null);
                setIsModalOpen(true);
              }}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> ADD CONDITION
            </button>
            <button className="text-[10px] font-bold text-primary hover:underline">RE-VALIDATE ALL</button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {conditions.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-8 h-8 text-text-secondary mx-auto mb-3 opacity-20" />
              <p className="text-xs text-text-secondary">No conditions mapped for this facility type.</p>
            </div>
          ) : (
            conditions.map((condition) => (
              <div key={condition.code} className={`transition-all ${expandedId === condition.code ? 'bg-primary/5' : 'hover:bg-surface'}`}>
                <div 
                  className="px-6 py-4 flex items-center gap-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === condition.code ? null : condition.code)}
                >
                  <div className="flex-shrink-0">{getStatusIcon(condition.status)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${getCategoryColor(condition.category)}`}>
                        {condition.category}
                      </span>
                      <span className="text-[8px] font-bold bg-surface border border-border px-1.5 py-0.5 rounded uppercase text-text-secondary">
                        {condition.stage}
                      </span>
                      {condition.blocking && (
                        <span className="text-[8px] font-bold bg-danger/10 text-danger px-1.5 py-0.5 rounded uppercase">
                          Blocking
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-text-primary truncate">{condition.name}</p>
                    <p className="text-[10px] text-text-secondary font-mono">{condition.code}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] text-text-secondary uppercase font-bold">Status</p>
                      <p className={`text-xs font-bold ${condition.status === 'Fulfilled' ? 'text-success' : 'text-warning'}`}>
                        {condition.status}
                      </p>
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] text-text-secondary uppercase font-bold">Target Date</p>
                      <p className="text-xs font-mono">{condition.targetDate || '2024-04-30'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCondition(condition);
                          setIsModalOpen(true);
                        }}
                        className="p-1 hover:bg-primary/10 rounded text-primary"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(condition.code);
                        }}
                        className="p-1 hover:bg-danger/10 rounded text-danger"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {expandedId === condition.code ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                  </div>
                </div>

                {expandedId === condition.code && (
                  <div className="px-16 pb-6 pt-2 animate-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-text-secondary mb-1">Description</h4>
                          <p className="text-xs text-text-primary leading-relaxed">
                            This condition must be satisfied {condition.stage.toLowerCase()} to ensure compliance with bank policy and legal requirements.
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-[10px] font-bold hover:bg-surface transition-colors">
                            <FileUp className="w-3.5 h-3.5" /> UPLOAD EVIDENCE
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-[10px] font-bold hover:bg-surface transition-colors">
                            <ShieldCheck className="w-3.5 h-3.5" /> REQUEST WAIVER
                          </button>
                        </div>
                      </div>

                      <div className="bg-white border border-border p-4 space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-text-secondary border-b border-border pb-1">Fulfillment Details</h4>
                        <DetailRow label="Evidence Type" value="Document Upload" />
                        <DetailRow label="Verified By" value={condition.status === 'Fulfilled' ? 'System (Auto)' : '-'} />
                        <DetailRow label="Fulfillment Date" value={condition.fulfilledDate || '-'} />
                        <div className="pt-2">
                          <h4 className="text-[10px] font-bold uppercase text-text-secondary mb-1">Remarks</h4>
                          <textarea 
                            className="w-full bg-surface border border-border p-2 text-[10px] outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Add internal notes..."
                            defaultValue={condition.remarks}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Blocking Alert */}
      {stats.blocking > 0 && (
        <div className="p-4 bg-danger/5 border border-danger/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-danger uppercase tracking-tight">Drawdown Blocked</p>
            <p className="text-[10px] text-danger/80 mt-1">
              There are {stats.blocking} mandatory blocking conditions that must be fulfilled before the first drawdown can be initiated.
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
                {editingCondition ? 'Edit Condition' : 'Add New Condition'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="carbon-label">Condition Name</label>
                  <input 
                    name="name" 
                    required 
                    defaultValue={editingCondition?.name}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="carbon-label">Category</label>
                  <select 
                    name="category" 
                    defaultValue={editingCondition?.category}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>Legal</option>
                    <option>Collateral</option>
                    <option>Financial</option>
                    <option>Compliance</option>
                    <option>Utilization</option>
                  </select>
                </div>
                <div>
                  <label className="carbon-label">Stage</label>
                  <select 
                    name="stage" 
                    defaultValue={editingCondition?.stage}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>Before Approval</option>
                    <option>Before First Drawdown</option>
                    <option>Before Each Drawdown</option>
                    <option>After Drawdown</option>
                  </select>
                </div>
                <div>
                  <label className="carbon-label">Status</label>
                  <select 
                    name="status" 
                    defaultValue={editingCondition?.status}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option>Pending</option>
                    <option>Submitted</option>
                    <option>Fulfilled</option>
                    <option>Waived</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="carbon-label">Target Date</label>
                  <input 
                    name="targetDate" 
                    type="date"
                    defaultValue={editingCondition?.targetDate}
                    className="w-full bg-white border border-border p-2 text-xs focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    name="mandatory" 
                    type="checkbox" 
                    defaultChecked={editingCondition?.mandatory}
                    className="w-4 h-4 accent-primary" 
                  />
                  <label className="text-xs font-bold">Mandatory</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    name="blocking" 
                    type="checkbox" 
                    defaultChecked={editingCondition?.blocking}
                    className="w-4 h-4 accent-primary" 
                  />
                  <label className="text-xs font-bold">Blocking</label>
                </div>
                <div className="col-span-2">
                  <label className="carbon-label">Remarks</label>
                  <textarea 
                    name="remarks" 
                    defaultValue={editingCondition?.remarks}
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
                  SAVE CONDITION
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
