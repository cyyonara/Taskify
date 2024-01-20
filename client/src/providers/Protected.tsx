import { useAuth } from "@/state/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const Protected: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to={"/"} replace />;

  return <Outlet />;
};

export default Protected;
