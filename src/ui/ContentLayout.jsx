import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import APIErrorHandler from "../utils/APIErrorHandler";
import OfflineIndicator from "../components/OfflineIndictor/OfflineIndicator";
import LoadingBlur from "../components/LoadingBlur/LoadingBlur";
import useTutorials from "../Hooks/useTutorials";
const ContentLayout = ({ isAdmin }) => {
  const { query } = useTutorials(isAdmin);

  const { isLoading, isError, isPaused, data, error } = query;
  if (isLoading) return <LoadingBlur />;
  if (isError) return <APIErrorHandler error={error} />;
  if (isPaused) return <OfflineIndicator />;
  const { tutorials } = data.data;
  return (
    <>
      <Navbar tutorials={tutorials} userType={isAdmin ? "admin" : "user"} />
      <Outlet context={tutorials} />
    </>
  );
};

export default ContentLayout;
