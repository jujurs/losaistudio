import { Customer, Exposure, FinancialRatio, RiskRating, GroupEntity } from "./types";

export const MOCK_CUSTOMER: Customer = {
  id: "DEB-9920-X1",
  name: "Global Logistics Systems Corp.",
  legalName: "Global Logistics Systems Corp.",
  registrationDate: "October 14, 2008",
  taxId: "88-2940219-X",
  sector: "Industrial Sector",
  location: "Chicago, Illinois",
  keyPersonnel: ["Elena Rodriguez (CFO)", "Marcus Thorne (CEO)"],
  rm: {
    name: "Sarah Jenkins",
    role: "Senior Director, Logistics Division",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&auto=format&fit=crop",
  },
};

export const MOCK_EXPOSURE: Exposure = {
  total: 42850000,
  funded: 28500000,
  nonFunded: 14350000,
  facilities: [
    { type: "Revolving Credit Facility", limit: 15000000, outstanding: 12450000, utilization: 83 },
    { type: "Capex Term Loan", limit: 10000000, outstanding: 9800000, utilization: 98 },
    { type: "Import LCs", limit: 8000000, outstanding: 4200000, utilization: 52 },
  ],
};

export const MOCK_RATIOS: FinancialRatio[] = [
  { label: "Current Ratio", value: "1.84", trend: "up", change: "4.2% YoY", status: "success" },
  { label: "Debt to Equity", value: "2.1x", trend: "down", change: "Warning Zone", status: "danger" },
  { label: "Net Profit Margin", value: "12.5%", trend: "up", change: "1.1% YoY", status: "success" },
  { label: "Asset Turnover", value: "0.92", trend: "stable", change: "Stable", status: "neutral" },
];

export const MOCK_RATINGS: RiskRating[] = [
  { rating: "A-", outlook: "Stable", date: "Dec 2023", type: "Annual Review", isCurrent: true },
  { rating: "BBB+", outlook: "Positive", date: "June 2023", type: "Mid-Year Review" },
  { rating: "BBB", outlook: "Stable", date: "Dec 2022", type: "Annual Review" },
];

export const MOCK_GROUP: GroupEntity = {
  id: "G-001",
  name: "Global Holding Group LLC",
  role: "Ultimate Parent",
  ownership: "100% OWNERSHIP",
  children: [
    {
      id: "G-002",
      name: "Global Logistics Systems Corp.",
      role: "BORROWER",
      ownership: "100% OWNERSHIP",
      children: [
        { id: "G-003", name: "Euro-Logistics Terminal Gmbh", role: "SUBSIDIARY", ownership: "85% SUBSIDIARY" },
        { id: "G-004", name: "GLS Asia-Pacific Holdings", role: "SUBSIDIARY", ownership: "100% SUBSIDIARY" },
      ],
    },
    { id: "G-005", name: "North Real Estate Ventures", role: "SISTER COMPANY", ownership: "40% OWNERSHIP" },
  ],
};
