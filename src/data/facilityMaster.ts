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
};

export const FACILITY_FIELD_MAPPING: Record<string, string[]> = {
  OD: ['proposed_limit', 'currency', 'tenor_month', 'facility_purpose', 'repayment_type', 'interest_frequency', 'secured_indicator'],
  TLF: ['proposed_limit', 'currency', 'tenor_month', 'grace_period', 'repayment_type', 'installment_option', 'secured_indicator'],
  PF: ['proposed_limit', 'currency', 'tenor_month', 'project_name', 'project_owner', 'grace_period', 'secured_indicator'],
  LCIMP: ['proposed_limit', 'currency', 'availability_period', 'beneficiary_name', 'secured_indicator'],
  'BG-PERF': ['proposed_limit', 'currency', 'beneficiary_name', 'underlying_contract', 'secured_indicator'],
  SUPF: ['proposed_limit', 'currency', 'anchor_name', 'tenor_month', 'secured_indicator'],
  FXLINE: ['proposed_limit', 'currency', 'hedging_purpose', 'secured_indicator'],
};
