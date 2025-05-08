import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
const Logout = () => {
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    window.location.href = "/AdminLogin"; // Redirect to the login page
  };
  
  useEffect(() => {
    localStorage.removeItem("adminToken"); // Remove token
    navigate("/"); // Redirect to login page
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
