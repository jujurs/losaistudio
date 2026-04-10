import React from "react";
import { 
  FilePlus, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  ArrowUpRight
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Active Applications", value: "24", icon: FilePlus, color: "text-primary", bg: "bg-primary/10" },
  { label: "Pending Review", value: "12", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  { label: "Critical Deviations", value: "5", icon: AlertCircle, color: "text-danger", bg: "bg-danger/10" },
  { label: "Approved (MTD)", value: "18", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
];

const pipeline = [
  { id: "APP-2024-001", customer: "Global Logistics Systems Corp.", type: "Renewal", amount: "$15.0M", stage: "Credit Analysis", status: "On Track", date: "2h ago" },
  { id: "APP-2024-002", customer: "Apex Manufacturing Ltd.", type: "New Money", amount: "$8.5M", stage: "Risk Approval", status: "Delayed", date: "5h ago" },
  { id: "APP-2024-003", customer: "Horizon Tech Solutions", type: "Extension", amount: "$4.2M", stage: "Legal Review", status: "On Track", date: "1d ago" },
  { id: "APP-2024-004", customer: "Starlight Retail Group", type: "Enhancement", amount: "$12.0M", stage: "RM Draft", status: "On Track", date: "2d ago" },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Commercial Banking Dashboard</h1>
          <p className="text-text-secondary text-sm">Welcome back, John. You have 5 tasks requiring immediate attention.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-primary-hover transition-colors">
          <FilePlus className="w-4 h-4" /> NEW APPLICATION
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="carbon-card flex items-center gap-4"
          >
            <div className={`p-3 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="carbon-label mb-0">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pipeline Table */}
      <div className="carbon-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide">Application Pipeline</h3>
          <div className="flex gap-2">
            <button className="p-1.5 text-text-secondary hover:bg-surface-hover border border-border">
              <Filter className="w-4 h-4" />
            </button>
            <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="carbon-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th>Stage</th>
                <th>Status</th>
                <th>Last Update</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pipeline.map((item, i) => (
                <tr key={i} className="hover:bg-surface-hover cursor-pointer group">
                  <td className="font-mono text-[11px]">{item.id}</td>
                  <td className="font-semibold">{item.customer}</td>
                  <td>{item.type}</td>
                  <td className="text-right font-medium">{item.amount}</td>
                  <td>
                    <span className="bg-surface px-2 py-1 rounded text-[11px] border border-border">
                      {item.stage}
                    </span>
                  </td>
                  <td>
                    <span className={`flex items-center gap-1.5 text-[11px] font-medium ${
                      item.status === 'Delayed' ? 'text-danger' : 'text-success'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Delayed' ? 'bg-danger' : 'bg-success'
                      }`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="text-text-secondary text-[11px]">{item.date}</td>
                  <td className="text-right">
                    <button className="opacity-0 group-hover:opacity-100 p-1 text-primary transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="carbon-card">
          <h3 className="text-xs font-semibold mb-4 uppercase tracking-wide">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: "Elena R.", action: "uploaded 3 financial documents", target: "Global Logistics", time: "10m ago" },
              { user: "Marcus T.", action: "approved deviation", target: "APP-2024-002", time: "1h ago" },
              { user: "Sarah J.", action: "submitted application", target: "APP-2024-004", time: "3h ago" },
            ].map((act, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="text-text-primary">
                    <span className="font-bold">{act.user}</span> {act.action} for <span className="text-primary font-medium">{act.target}</span>
                  </p>
                  <p className="text-text-secondary text-[10px]">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carbon-card">
          <h3 className="text-xs font-semibold mb-4 uppercase tracking-wide">My Tasks</h3>
          <div className="space-y-2">
            {[
              { task: "Review Financial Spreading", app: "APP-2024-001", due: "Today", priority: "High" },
              { task: "Verify Collateral Perfection", app: "APP-2024-003", due: "Tomorrow", priority: "Medium" },
              { task: "Approve Pricing Deviation", app: "APP-2024-002", due: "In 2 days", priority: "High" },
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white border border-border hover:border-primary transition-colors cursor-pointer">
                <div>
                  <p className="text-xs font-bold">{task.task}</p>
                  <p className="text-[10px] text-text-secondary">{task.app} • Due {task.due}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 ${
                  task.priority === 'High' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
