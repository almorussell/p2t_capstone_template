import { useUserStore } from "../store/UserStore";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // clear user from store
    navigate("/login");    // redirect
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;