import { Outlet, useLocation } from "react-router-dom";
import useWindowSize from "../Hooks/useWindowSize";
import ContentLayout from "./ContentLayout";
import DesktopOnly from "../components/DesktopOnly/DesktopOnly";
const AppLayout = function () {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname.startsWith("/login");

  const { width } = useWindowSize();
  if (isAdmin && width < 1024) return <DesktopOnly />;
  if (isLoginRoute) {
    return <Outlet />;
  }
  return <ContentLayout isAdmin={isAdmin} />;
};

export default AppLayout;
