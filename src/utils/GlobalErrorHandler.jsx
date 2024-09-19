import { useRouteError } from "react-router-dom";
import NotFoundPage from "../components/404Page/NotFoundPage";

const GlobalErrorHandler = function () {
  const error = useRouteError();
  if (error.status === 404 && error.statusText === "Not Found")
    return (
      <NotFoundPage
        errorMessage={" Sorry, the page you’re looking for doesn’t exist."}
      />
    );
  console.log("Error From Global Error handler", error);
};

export default GlobalErrorHandler;
