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

export const MOCK_FINANCIALS = {
  periods: ["FY 2021", "FY 2022", "FY 2023 (Audited)"],
  rows: [
    { label: "Revenue", values: [85000000, 92000000, 105000000], category: "Income Statement" },
    { label: "Cost of Goods Sold", values: [52000000, 55000000, 62000000], category: "Income Statement" },
    { label: "Gross Profit", values: [33000000, 37000000, 43000000], category: "Income Statement", isBold: true },
    { label: "Operating Expenses", values: [18000000, 20000000, 22000000], category: "Income Statement" },
    { label: "EBITDA", values: [15000000, 17000000, 21000000], category: "Income Statement", isBold: true },
    { label: "Net Income", values: [8500000, 9800000, 12400000], category: "Income Statement", isBold: true },
    { label: "Cash & Equivalents", values: [12000000, 14500000, 18200000], category: "Balance Sheet" },
    { label: "Total Assets", values: [120000000, 135000000, 150000000], category: "Balance Sheet", isBold: true },
    { label: "Total Liabilities", values: [75000000, 82000000, 88000000], category: "Balance Sheet" },
    { label: "Total Equity", values: [45000000, 53000000, 62000000], category: "Balance Sheet", isBold: true },
  ]
};

export const MOCK_TASKS_LIST = [
  { id: "TSK-001", title: "Review Financial Spreading", app: "APP-2024-001", customer: "Global Logistics Systems Corp.", due: "Today", priority: "High", status: "Pending" },
  { id: "TSK-002", title: "Verify Collateral Perfection", app: "APP-2024-003", customer: "Horizon Tech Solutions", due: "Tomorrow", priority: "Medium", status: "In Progress" },
  { id: "TSK-003", title: "Approve Pricing Deviation", app: "APP-2024-002", customer: "Apex Manufacturing Ltd.", due: "In 2 days", priority: "High", status: "Pending" },
  { id: "TSK-004", title: "KYC Refresh Required", app: "N/A", customer: "Starlight Retail Group", due: "In 5 days", priority: "Low", status: "Pending" },
  { id: "TSK-005", title: "Annual Review Submission", app: "APP-2023-998", customer: "North Real Estate Ventures", due: "In 1 week", priority: "Medium", status: "Pending" },
];

export const MOCK_PORTFOLIOS = [
  { id: "DEB-9920-X1", name: "Global Logistics Systems Corp.", sector: "Industrial", location: "Chicago", exposure: 42850000, rating: "A-", status: "Active" },
  { id: "DEB-8812-Y2", name: "Apex Manufacturing Ltd.", sector: "Manufacturing", location: "Detroit", exposure: 25400000, rating: "BBB+", status: "Active" },
  { id: "DEB-7734-Z3", name: "Horizon Tech Solutions", sector: "Technology", location: "San Francisco", exposure: 12800000, rating: "A", status: "Active" },
  { id: "DEB-6655-W4", name: "Starlight Retail Group", sector: "Retail", location: "New York", exposure: 18200000, rating: "BBB", status: "Under Review" },
];

export const MOCK_APPLICATION_HISTORY = [
  { id: "APP-2024-001", type: "Renewal & Enhancement", amount: 15000000, date: "Apr 10, 2024", status: "In Progress", stage: "Credit Analysis" },
  { id: "APP-2023-142", type: "Capex Term Loan", amount: 10000000, date: "Nov 15, 2023", status: "Approved", stage: "Booked" },
  { id: "APP-2023-088", type: "Working Capital Line", amount: 5000000, date: "Aug 22, 2023", status: "Approved", stage: "Booked" },
  { id: "APP-2023-012", type: "New Money", amount: 12000000, date: "Jan 05, 2023", status: "Cancelled", stage: "Withdrawn" },
  { id: "APP-2022-195", type: "Annual Review", amount: 0, date: "Dec 12, 2022", status: "Approved", stage: "Completed" },
];
