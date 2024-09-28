import { Button } from "@/components/ui/button";
import { logout } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { persistor } from "@/redux/store";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
  };

  return (
    <div>
      <p>Admin Dashboard</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default AdminDashboard;
