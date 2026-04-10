export interface Customer {
  id: string;
  name: string;
  legalName: string;
  registrationDate: string;
  taxId: string;
  sector: string;
  location: string;
  keyPersonnel: string[];
  rm: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Exposure {
  total: number;
  funded: number;
  nonFunded: number;
  facilities: FacilityExposure[];
}

export interface FacilityExposure {
  type: string;
  limit: number;
  outstanding: number;
  utilization: number;
}

export interface FinancialRatio {
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
  change: string;
  status: "success" | "danger" | "neutral";
}

export interface RiskRating {
  rating: string;
  outlook: string;
  date: string;
  type: string;
  isCurrent?: boolean;
}

export interface GroupEntity {
  id: string;
  name: string;
  role: string;
  ownership: string;
  children?: GroupEntity[];
}
