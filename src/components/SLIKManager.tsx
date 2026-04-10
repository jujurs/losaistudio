import React, { useState } from "react";
import { 
  Search, 
  UserPlus, 
  FileSearch, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  MoreVertical,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  BarChart3,
  CreditCard,
  Building2,
  User,
  X
} from "lucide-react";
import { SLIKSubject, SLIKSummary } from "../data/facilityMaster";

interface SLIKManagerProps {
  initialSubjects?: SLIKSubject[];
}

export default function SLIKManager({ initialSubjects }: SLIKManagerProps) {
  const [subjects, setSubjects] = useState<SLIKSubject[]>(initialSubjects || [
    { id: '1', name: 'PT Maju Jaya (Borrower)', type: 'Corporate', relationship: 'Main Borrower', idType: 'TDP', idNo: '12345678', status: 'Success', lastInquiryDate: '2024-04-10' },
    { id: '2', name: 'Budi Santoso', type: 'Individual', relationship: 'Director', idType: 'KTP', idNo: '320123456789', status: 'Success', lastInquiryDate: '2024-04-10' },
    { id: '3', name: 'Siti Aminah', type: 'Individual', relationship: 'Commissioner', idType: 'KTP', idNo: '320987654321', status: 'Requested', lastInquiryDate: '2024-04-10' },
  ]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>('1');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManualAdd, setIsManualAdd] = useState(false);

  const availableRelatedParties: SLIKSubject[] = [
    { id: 'rp-1', name: 'Andi Wijaya', type: 'Individual', relationship: 'Director', idType: 'KTP', idNo: '320111222333', status: 'Draft' },
    { id: 'rp-2', name: 'PT Logistik Nusantara', type: 'Corporate', relationship: 'Group Company', idType: 'TDP', idNo: '99887766', status: 'Draft' },
    { id: 'rp-3', name: 'Hendra Kurniawan', type: 'Individual', relationship: 'Shareholder', idType: 'KTP', idNo: '320444555666', status: 'Draft' },
    { id: 'rp-4', name: 'Dewi Lestari', type: 'Individual', relationship: 'Personal Guarantor', idType: 'KTP', idNo: '320777888999', status: 'Draft' },
  ];

  const handleAddSubject = (subject: SLIKSubject) => {
    if (!subjects.find(s => s.id === subject.id)) {
      setSubjects([...subjects, { ...subject, status: 'Draft' }]);
    }
    setIsAddModalOpen(false);
  };

  const summaries: Record<string, SLIKSummary> = {
    '1': {
      subjectId: '1',
      totalLenders: 4,
      totalFacilities: 6,
      totalPlafond: 25000000000,
      totalOutstanding: 18500000000,
      totalPastDue: 0,
      totalInstallment: 450000000,
      worstCollectibility: 1,
      maxDPD: 0,
      restructuredCount: 0,
      writeOffCount: 0,
      riskFlag: 'Low'
    },
    '2': {
      subjectId: '2',
      totalLenders: 2,
      totalFacilities: 3,
      totalPlafond: 1500000000,
      totalOutstanding: 850000000,
      totalPastDue: 12500000,
      totalInstallment: 25000000,
      worstCollectibility: 2,
      maxDPD: 15,
      restructuredCount: 0,
      writeOffCount: 0,
      riskFlag: 'Medium'
    }
  };

  const selectedSummary = selectedSubjectId ? summaries[selectedSubjectId] : null;
  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="carbon-card p-0 overflow-hidden border border-border">
            <div className="bg-surface border-b border-border px-4 py-3 flex justify-between items-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">SLIK Subjects</h3>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="p-1 hover:bg-white rounded text-primary flex items-center gap-1 text-[10px] font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> ADD
              </button>
            </div>
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {subjects.map((subject) => (
                <div 
                  key={subject.id}
                  onClick={() => setSelectedSubjectId(subject.id)}
                  className={`p-4 cursor-pointer transition-colors ${selectedSubjectId === subject.id ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-surface'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      {subject.type === 'Corporate' ? <Building2 className="w-3.5 h-3.5 text-text-secondary" /> : <User className="w-3.5 h-3.5 text-text-secondary" />}
                      <span className="text-xs font-bold text-text-primary">{subject.name}</span>
                    </div>
                    <StatusBadge status={subject.status} />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-text-secondary uppercase font-bold">{subject.relationship}</span>
                    <span className="text-[10px] font-mono text-text-secondary">{subject.idNo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-hover flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" /> REQUEST BULK SLIK
          </button>
        </div>

        {/* Summary Detail */}
        <div className="lg:col-span-2 space-y-6">
          {selectedSubject && selectedSummary ? (
            <>
              {/* Top Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard label="Total Outstanding" value={formatCurrency(selectedSummary.totalOutstanding)} />
                <SummaryCard label="Worst Kolektibilitas" value={`Kol ${selectedSummary.worstCollectibility}`} color={selectedSummary.worstCollectibility > 1 ? 'text-warning' : 'text-success'} />
                <SummaryCard label="Max DPD" value={`${selectedSummary.maxDPD} Days`} color={selectedSummary.maxDPD > 0 ? 'text-danger' : 'text-text-primary'} />
                <SummaryCard label="Risk Level" value={selectedSummary.riskFlag} color={selectedSummary.riskFlag === 'High' ? 'text-danger' : selectedSummary.riskFlag === 'Medium' ? 'text-warning' : 'text-success'} />
              </div>

              {/* Detailed Exposure */}
              <div className="carbon-card bg-white">
                <h3 className="text-[10px] font-bold uppercase text-text-secondary mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" /> Exposure Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <DetailItem label="Total Lenders" value={selectedSummary.totalLenders.toString()} />
                  <DetailItem label="Total Facilities" value={selectedSummary.totalFacilities.toString()} />
                  <DetailItem label="Total Plafond" value={formatCurrency(selectedSummary.totalPlafond)} />
                  <DetailItem label="Total Past Due" value={formatCurrency(selectedSummary.totalPastDue)} />
                  <DetailItem label="Monthly Installment" value={formatCurrency(selectedSummary.totalInstallment)} />
                  <DetailItem label="Restructured" value={selectedSummary.restructuredCount > 0 ? 'YES' : 'NO'} />
                </div>
              </div>

              {/* Lender Table */}
              <div className="carbon-card p-0 overflow-hidden border border-border">
                <div className="bg-surface border-b border-border px-6 py-3 flex justify-between items-center">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Lender Breakdown</h3>
                  <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> VIEW FULL REPORT
                  </button>
                </div>
                <table className="carbon-table">
                  <thead>
                    <tr>
                      <th>Lender Name</th>
                      <th className="text-right">Plafond</th>
                      <th className="text-right">Outstanding</th>
                      <th className="text-center">Kol</th>
                      <th className="text-center">DPD</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="hover:bg-surface">
                      <td className="font-bold">Bank Mandiri</td>
                      <td className="text-right font-mono">10.000.000.000</td>
                      <td className="text-right font-mono">8.500.000.000</td>
                      <td className="text-center font-bold">1</td>
                      <td className="text-center">0</td>
                      <td><span className="text-[10px] font-bold text-success uppercase">Active</span></td>
                    </tr>
                    <tr className="hover:bg-surface">
                      <td className="font-bold">Bank BCA</td>
                      <td className="text-right font-mono">5.000.000.000</td>
                      <td className="text-right font-mono">3.200.000.000</td>
                      <td className="text-center font-bold">1</td>
                      <td className="text-center">0</td>
                      <td><span className="text-[10px] font-bold text-success uppercase">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Risk Flags */}
              {selectedSummary.riskFlag !== 'Low' && (
                <div className="p-4 bg-warning/5 border border-warning/20 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-warning uppercase tracking-tight">Adverse Findings Detected</p>
                    <p className="text-[10px] text-warning/80 mt-1 leading-relaxed">
                      Subject has a maximum DPD of {selectedSummary.maxDPD} days and worst collectibility of {selectedSummary.worstCollectibility}. 
                      Analyst must provide justification for these findings in the credit commentary.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : selectedSubject?.status === 'Requested' ? (
            <div className="carbon-card flex flex-col items-center justify-center py-24 text-center">
              <Clock className="w-12 h-12 text-warning mb-4 animate-pulse" />
              <h3 className="text-sm font-bold text-text-primary">SLIK Request in Progress</h3>
              <p className="text-xs text-text-secondary mt-2 max-w-xs">
                We are currently retrieving the credit report for <strong>{selectedSubject.name}</strong> from the bureau. This usually takes 1-2 minutes.
              </p>
              <button className="mt-6 px-6 py-2 bg-surface border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-border">
                CHECK STATUS
              </button>
            </div>
          ) : (
            <div className="carbon-card flex flex-col items-center justify-center py-24 text-center">
              <FileSearch className="w-12 h-12 text-text-secondary mb-4 opacity-20" />
              <h3 className="text-sm font-bold text-text-primary">No SLIK Data Available</h3>
              <p className="text-xs text-text-secondary mt-2 max-w-xs">
                Select a subject from the list or request a new SLIK check to view the credit summary.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Subject Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                {isManualAdd ? 'Create New Subject' : 'Add SLIK Subject'}
              </h2>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsManualAdd(false);
                }} 
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {!isManualAdd ? (
                <>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-text-secondary mb-3">Select from Related Parties</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {availableRelatedParties
                        .filter(rp => !subjects.find(s => s.id === rp.id))
                        .map(rp => (
                          <div 
                            key={rp.id}
                            onClick={() => handleAddSubject(rp)}
                            className="p-3 border border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-all group"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                {rp.type === 'Corporate' ? <Building2 className="w-3.5 h-3.5 text-text-secondary" /> : <User className="w-3.5 h-3.5 text-text-secondary" />}
                                <span className="text-xs font-bold text-text-primary">{rp.name}</span>
                              </div>
                              <Plus className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100" />
                            </div>
                            <div className="text-[10px] text-text-secondary mt-1 uppercase font-bold">{rp.relationship}</div>
                          </div>
                        ))}
                      {availableRelatedParties.filter(rp => !subjects.find(s => s.id === rp.id)).length === 0 && (
                        <p className="text-[10px] text-text-secondary text-center py-4">No more related parties available.</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-[10px] font-bold uppercase text-text-secondary mb-3">Manual Add</h4>
                    <button 
                      onClick={() => setIsManualAdd(true)}
                      className="w-full py-2 bg-surface border border-border text-[10px] font-bold uppercase hover:bg-border transition-colors flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> CREATE NEW SUBJECT
                    </button>
                  </div>
                </>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newSubject: SLIKSubject = {
                      id: Date.now().toString(),
                      name: formData.get('name') as string,
                      type: formData.get('type') as any,
                      relationship: formData.get('relationship') as string,
                      idType: formData.get('idType') as string,
                      idNo: formData.get('idNo') as string,
                      npwp: formData.get('npwp') as string,
                      status: 'Draft'
                    };
                    handleAddSubject(newSubject);
                    setIsManualAdd(false);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold uppercase text-text-secondary mb-1 block">Subject Name</label>
                      <input name="name" required className="w-full bg-surface border border-border p-2 text-xs focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-text-secondary mb-1 block">Type</label>
                      <select name="type" className="w-full bg-surface border border-border p-2 text-xs focus:border-primary outline-none">
                        <option value="Individual">Individual</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-text-secondary mb-1 block">Relationship</label>
                      <input name="relationship" required className="w-full bg-surface border border-border p-2 text-xs focus:border-primary outline-none" placeholder="e.g. Guarantor" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-text-secondary mb-1 block">ID Type</label>
                      <input name="idType" required className="w-full bg-surface border border-border p-2 text-xs focus:border-primary outline-none" placeholder="KTP / NPWP" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-text-secondary mb-1 block">ID Number</label>
                      <input name="idNo" required className="w-full bg-surface border border-border p-2 text-xs focus:border-primary outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsManualAdd(false)}
                      className="flex-1 py-2 bg-surface text-[10px] font-bold uppercase border border-border hover:bg-border"
                    >
                      BACK
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-2 bg-primary text-white text-[10px] font-bold uppercase hover:bg-primary-hover"
                    >
                      SAVE SUBJECT
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'Success':
      return <span className="flex items-center gap-1 text-[9px] font-bold text-success uppercase"><CheckCircle2 className="w-3 h-3" /> SUCCESS</span>;
    case 'Requested':
      return <span className="flex items-center gap-1 text-[9px] font-bold text-warning uppercase"><Clock className="w-3 h-3" /> PENDING</span>;
    case 'Failed':
      return <span className="flex items-center gap-1 text-[9px] font-bold text-danger uppercase"><AlertTriangle className="w-3 h-3" /> FAILED</span>;
    default:
      return <span className="text-[9px] font-bold text-text-secondary uppercase">DRAFT</span>;
  }
}

function SummaryCard({ label, value, color = "text-text-primary" }: any) {
  return (
    <div className="carbon-card p-4 bg-white border border-border">
      <p className="text-[9px] font-bold uppercase text-text-secondary mb-1">{label}</p>
      <p className={`text-sm font-bold truncate ${color}`}>{value}</p>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] text-text-secondary font-bold uppercase tracking-tight">{label}</span>
      <span className="text-xs font-bold text-text-primary">{value}</span>
    </div>
  );
}
