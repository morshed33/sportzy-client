import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div className="public-layout">
      <nav>{/* Public Navigation */}</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
