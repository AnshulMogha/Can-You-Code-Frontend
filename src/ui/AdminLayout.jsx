import { Outlet, useOutletContext } from "react-router-dom";

const AdminLayout = function () {
  const context = useOutletContext();
  return <Outlet context={context} />;
};

export default AdminLayout;
