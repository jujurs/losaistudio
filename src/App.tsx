/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Customer360 from "./components/Customer360";
import ApplicationCase from "./components/ApplicationCase";
import BpmnModeler from "./components/BpmnModeler";
import FinancialAnalysis from "./components/FinancialAnalysis";
import Tasks from "./components/Tasks";
import PortfolioList from "./components/PortfolioList";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "dashboard";
      setCurrentView(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-grow ml-64">
        <Topbar />
        <main className="pt-12 min-h-screen">
          {currentView === "dashboard" && <Dashboard />}
          {currentView === "portfolio" && <PortfolioList />}
          {currentView === "portfolio-detail" && <Customer360 />}
          {currentView === "applications" && <ApplicationCase />}
          {currentView === "analysis" && <FinancialAnalysis />}
          {currentView === "tasks" && <Tasks />}
          {currentView === "admin" && <BpmnModeler />}
        </main>
      </div>
    </div>
  );
}
