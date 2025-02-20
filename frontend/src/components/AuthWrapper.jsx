import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children, authenticate = true }) => {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticate && !status) {
      navigate("/login");
    } else if (!authenticate && status) {
      navigate("/");
    }
  }, [status, navigate, authenticate]);

  return <>{children}</>;
};

export default AuthWrapper;
