import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/userSlice";
import { persistor } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
  };

  return (
    <div>
      <p>USER Dashboard</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default UserDashboard;
