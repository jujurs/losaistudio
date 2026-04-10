export interface Product {
  code: string;
  name: string;
  category: 'Funded' | 'NonFunded' | 'Mixed';
}

export interface Facility {
  code: string;
  name: string;
  productCode: string;
  revolving: boolean;
  funded: boolean;
  nonFunded: boolean;
  segments: string[]; // SME, COMBA, COBA
}

export interface FieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'number' | 'currency' | 'date' | 'select' | 'textarea' | 'lookup' | 'checkbox';
  options?: string[];
  required?: boolean;
}

export interface FieldGroup {
  code: string;
  name: string;
  fields: string[]; // Array of field IDs
}

export const PRODUCTS: Product[] = [
  { code: 'WC', name: 'Working Capital', category: 'Funded' },
  { code: 'TL', name: 'Term Loan', category: 'Funded' },
  { code: 'TR', name: 'Trade Finance', category: 'Mixed' },
  { code: 'BG', name: 'Bank Guarantee', category: 'NonFunded' },
  { code: 'FX', name: 'Treasury / FX Line', category: 'NonFunded' },
  { code: 'SCF', name: 'Supply Chain Finance', category: 'Funded' },
  { code: 'BIL', name: 'Bilateral / Structured', category: 'Mixed' },
];

export const FACILITIES: Facility[] = [
  { code: 'OD', name: 'Overdraft', productCode: 'WC', revolving: true, funded: true, nonFunded: false, segments: ['SME', 'COMBA'] },
  { code: 'PRK', name: 'Pinjaman Rekening Koran', productCode: 'WC', revolving: true, funded: true, nonFunded: false, segments: ['SME', 'COMBA'] },
  { code: 'RCF', name: 'Revolving Credit Facility', productCode: 'WC', revolving: true, funded: true, nonFunded: false, segments: ['COMBA', 'COBA'] },
  { code: 'TLF', name: 'Term Loan Fixed', productCode: 'TL', revolving: false, funded: true, nonFunded: false, segments: ['SME', 'COMBA', 'COBA'] },
  { code: 'TLR', name: 'Term Loan Revolving Drawdown', productCode: 'TL', revolving: false, funded: true, nonFunded: false, segments: ['COMBA', 'COBA'] },
  { code: 'AF', name: 'Asset Financing', productCode: 'TL', revolving: false, funded: true, nonFunded: false, segments: ['SME', 'COMBA'] },
  { code: 'PF', name: 'Project Financing', productCode: 'TL', revolving: false, funded: true, nonFunded: false, segments: ['COBA'] },
  { code: 'LCIMP', name: 'Import LC', productCode: 'TR', revolving: false, funded: false, nonFunded: true, segments: ['COMBA', 'COBA'] },
  { code: 'BG-PERF', name: 'Performance Bond', productCode: 'BG', revolving: false, funded: false, nonFunded: true, segments: ['SME', 'COMBA', 'COBA'] },
  { code: 'FXLINE', name: 'FX Line', productCode: 'FX', revolving: true, funded: false, nonFunded: true, segments: ['COMBA', 'COBA'] },
  { code: 'SUPF', name: 'Supplier Financing', productCode: 'SCF', revolving: true, funded: true, nonFunded: false, segments: ['COMBA', 'COBA'] },
  { code: 'UMB', name: 'Umbrella Line', productCode: 'BIL', revolving: true, funded: true, nonFunded: true, segments: ['COBA'] },
];

export const FIELD_DEFINITIONS: Record<string, FieldDefinition> = {
  proposed_limit: { id: 'proposed_limit', label: 'Proposed Limit', type: 'currency', required: true },
  currency: { id: 'currency', label: 'Currency', type: 'select', options: ['USD', 'IDR', 'EUR', 'SGD'], required: true },
  tenor_month: { id: 'tenor_month', label: 'Tenor (Months)', type: 'number', required: true },
  facility_purpose: { id: 'facility_purpose', label: 'Facility Purpose', type: 'textarea', required: true },
  repayment_type: { id: 'repayment_type', label: 'Repayment Type', type: 'select', options: ['Installment', 'Bullet', 'Interest Only'], required: true },
  interest_frequency: { id: 'interest_frequency', label: 'Interest Repayment Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Semi-Annually'], required: true },
  secured_indicator: { id: 'secured_indicator', label: 'Secured Indicator', type: 'select', options: ['Secured', 'Unsecured', 'Partially Secured'], required: true },
  drawdown_media: { id: 'drawdown_media', label: 'Drawdown Media', type: 'select', options: ['Transfer', 'Check', 'Internal Account'] },
  availability_period: { id: 'availability_period', label: 'Availability Period (Months)', type: 'number' },
  grace_period: { id: 'grace_period', label: 'Grace Period (Months)', type: 'number' },
  installment_option: { id: 'installment_option', label: 'Installment Option', type: 'select', options: ['Fixed', 'Step-up', 'Step-down'] },
  project_name: { id: 'project_name', label: 'Project Name', type: 'text', required: true },
  project_owner: { id: 'project_owner', label: 'Project Owner', type: 'text', required: true },
  beneficiary_name: { id: 'beneficiary_name', label: 'Beneficiary Name', type: 'text', required: true },
  underlying_contract: { id: 'underlying_contract', label: 'Underlying Contract No.', type: 'text', required: true },
  hedging_purpose: { id: 'hedging_purpose', label: 'Hedging Purpose', type: 'select', options: ['Trade', 'Investment', 'Debt Service'] },
  anchor_name: { id: 'anchor_name', label: 'Anchor Name', type: 'lookup', required: true },
  agreement_no: { id: 'agreement_no', label: 'Agreement / Waad No.', type: 'text' },
  agreement_date: { id: 'agreement_date', label: 'Agreement Signed Date', type: 'date' },
  takeover_non_bank: { id: 'takeover_non_bank', label: 'Take Over Non Bank?', type: 'select', options: ['Yes', 'No'] },
  acquisition_cost: { id: 'acquisition_cost', label: 'Acquisition Cost', type: 'currency' },
  down_payment: { id: 'down_payment', label: 'Down Payment', type: 'currency' },
};

export const FACILITY_FIELD_MAPPING: Record<string, string[]> = {
  OD: ['proposed_limit', 'currency', 'tenor_month', 'facility_purpose', 'repayment_type', 'interest_frequency', 'secured_indicator'],
  TLF: ['proposed_limit', 'currency', 'tenor_month', 'grace_period', 'repayment_type', 'installment_option', 'secured_indicator', 'agreement_no', 'agreement_date'],
  AF: ['proposed_limit', 'currency', 'tenor_month', 'acquisition_cost', 'down_payment', 'secured_indicator', 'agreement_no'],
  PF: ['proposed_limit', 'currency', 'tenor_month', 'project_name', 'project_owner', 'grace_period', 'secured_indicator'],
  LCIMP: ['proposed_limit', 'currency', 'availability_period', 'beneficiary_name', 'secured_indicator'],
  'BG-PERF': ['proposed_limit', 'currency', 'beneficiary_name', 'underlying_contract', 'secured_indicator'],
  SUPF: ['proposed_limit', 'currency', 'anchor_name', 'tenor_month', 'secured_indicator'],
  FXLINE: ['proposed_limit', 'currency', 'hedging_purpose', 'secured_indicator'],
};

export interface DrawdownConditionMaster {
  code: string;
  name: string;
  category: 'Legal' | 'Collateral' | 'Financial' | 'Compliance' | 'Utilization' | 'Deferred';
  stage: 'Before Approval' | 'Before First Drawdown' | 'Before Each Drawdown' | 'After Drawdown';
  mandatory: boolean;
  blocking: boolean;
}

export const DRAWDOWN_CONDITION_MASTER: DrawdownConditionMaster[] = [
  { code: 'AGR_SIGNED', name: 'Signed Credit Agreement', category: 'Legal', stage: 'Before First Drawdown', mandatory: true, blocking: true },
  { code: 'SEC_DOCS', name: 'Signed Security Documents', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true },
  { code: 'COL_LINK', name: 'Collateral Linkage Completed', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true },
  { code: 'APP_VALID', name: 'Appraisal Report Valid', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true },
  { code: 'INS_ACTIVE', name: 'Insurance Policy Active', category: 'Collateral', stage: 'Before First Drawdown', mandatory: true, blocking: true },
  { code: 'DP_PAID', name: 'Down Payment Evidence', category: 'Financial', stage: 'Before First Drawdown', mandatory: true, blocking: true },
  { code: 'INV_AVAIL', name: 'Invoice / Purchase Order Available', category: 'Utilization', stage: 'Before Each Drawdown', mandatory: true, blocking: true },
  { code: 'KYC_CLR', name: 'KYC & AML Screening Clear', category: 'Compliance', stage: 'Before Approval', mandatory: true, blocking: true },
  { code: 'APHT_FIN', name: 'APHT Final Registration', category: 'Deferred', stage: 'After Drawdown', mandatory: true, blocking: false },
  { code: 'PRO_NOTE', name: 'Promissory Note Signed', category: 'Legal', stage: 'Before Each Drawdown', mandatory: true, blocking: true },
];

export const FACILITY_CONDITION_TEMPLATE: Record<string, string[]> = {
  OD: ['AGR_SIGNED', 'KYC_CLR', 'INS_ACTIVE'],
  TLF: ['AGR_SIGNED', 'SEC_DOCS', 'COL_LINK', 'APP_VALID', 'INS_ACTIVE', 'KYC_CLR'],
  AF: ['AGR_SIGNED', 'DP_PAID', 'INV_AVAIL', 'INS_ACTIVE', 'KYC_CLR'],
  'BG-PERF': ['AGR_SIGNED', 'KYC_CLR'],
  PF: ['AGR_SIGNED', 'SEC_DOCS', 'COL_LINK', 'KYC_CLR', 'INS_ACTIVE'],
};

export interface GlobalTCMaster {
  code: string;
  name: string;
  category: 'Legal' | 'Compliance' | 'Financial' | 'Operational' | 'Security' | 'Covenant';
  type: 'Standard' | 'Covenant' | 'Affirmative' | 'Negative';
  mandatory: boolean;
  monitoringRequired: boolean;
}

export const GLOBAL_TC_MASTER: GlobalTCMaster[] = [
  { code: 'AUD_FS_ANN', name: 'Submit Audited Financial Statements Annually', category: 'Financial', type: 'Affirmative', mandatory: true, monitoringRequired: true },
  { code: 'MGT_ACC_QTR', name: 'Submit Management Accounts Quarterly', category: 'Financial', type: 'Affirmative', mandatory: true, monitoringRequired: true },
  { code: 'OWN_CHG_NOT', name: 'Notify Bank of Change in Ownership/Control', category: 'Legal', type: 'Negative', mandatory: true, monitoringRequired: false },
  { code: 'MAIN_ACC_BNK', name: 'Maintain Main Operating Account with Bank', category: 'Operational', type: 'Affirmative', mandatory: true, monitoringRequired: true },
  { code: 'DER_MAX_3', name: 'Maintain Debt to Equity Ratio (DER) Max 3.0x', category: 'Covenant', type: 'Covenant', mandatory: true, monitoringRequired: true },
  { code: 'DSCR_MIN_1.2', name: 'Maintain Debt Service Coverage Ratio (DSCR) Min 1.25x', category: 'Covenant', type: 'Covenant', mandatory: true, monitoringRequired: true },
  { code: 'INS_COV_ASSET', name: 'Maintain Insurance Coverage for Secured Assets', category: 'Security', type: 'Affirmative', mandatory: true, monitoringRequired: true },
  { code: 'NO_DIV_STRESS', name: 'No Dividend Distribution if DSCR < 1.1x', category: 'Covenant', type: 'Negative', mandatory: false, monitoringRequired: true },
  { code: 'KYC_RE_VET', name: 'Periodic KYC Re-Vetting Compliance', category: 'Compliance', type: 'Standard', mandatory: true, monitoringRequired: true },
  { code: 'NEG_LST_CLR', name: 'Borrower Must Not Be in Negative List', category: 'Compliance', type: 'Standard', mandatory: true, monitoringRequired: false },
];

export interface TBOProductOpportunity {
  category: string;
  opportunityAmount: number;
  capturedAmount: number;
  probability: number;
  status: 'Identified' | 'Proposed' | 'Won' | 'Lost';
}

export const TBO_PRODUCT_CATEGORIES = [
  'Lending',
  'Trade Finance',
  'Bank Guarantee',
  'Cash Management',
  'FX & Treasury',
  'Payroll',
  'Supply Chain Finance',
  'Fee Based Income'
];

export interface SLIKSubject {
  id: string;
  name: string;
  type: 'Individual' | 'Corporate';
  relationship: string;
  idType: string;
  idNo: string;
  npwp?: string;
  status: 'Draft' | 'Ready' | 'Requested' | 'Success' | 'Failed';
  lastInquiryDate?: string;
}

export interface SLIKSummary {
  subjectId: string;
  totalLenders: number;
  totalFacilities: number;
  totalPlafond: number;
  totalOutstanding: number;
  totalPastDue: number;
  totalInstallment: number;
  worstCollectibility: number;
  maxDPD: number;
  restructuredCount: number;
  writeOffCount: number;
  riskFlag: 'Low' | 'Medium' | 'High';
}
