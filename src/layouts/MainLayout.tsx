import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "../sections/Footer";
import AppHeader from "../sections/AppHeader";
import QuickActionsPanel from "../components/QuickActionsPanel";
import {QuickActionsProvider} from "../components/QuickActionProvider";

const MainLayout: React.FC = () => {
  return (
    <QuickActionsProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <AppHeader />
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
        <QuickActionsPanel />
        <Footer />
      </div>
    </QuickActionsProvider>
  );
};

export default MainLayout;
