import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ userData, children }) => {
  const navigate = useNavigate();
  const [c, s, removeCookie] = useCookies();

  const handleLogout = () => {
    removeCookie('test_token');
    removeCookie('test_user');
    navigate('/login');
  }

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <img className="logo" src="logo.png"></img>
        <div className="sidebar-user-info">
          <button className="logout button-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};
  
export default DashboardLayout;