import React from "react";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
