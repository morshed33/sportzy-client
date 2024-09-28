import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <aside>{/* Admin Dashboard Sidebar */}</aside>
      <main>
        <Outlet /> {/* Render nested routes here */}
      </main>
    </div>
  );
};

export default AdminLayout;
