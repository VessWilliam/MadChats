import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider'

const WithPrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default WithPrivateRoute;
