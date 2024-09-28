import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
  return (
    <div className="user-layout">
      <aside>
        <p>This is the user dashboard layout</p>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
