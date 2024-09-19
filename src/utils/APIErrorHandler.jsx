// /* eslint-disable react/prop-types */

import NotFoundPage from "../components/404Page/NotFoundPage";
const APIErrorHandler = function ({ error, userType }) {
  //   const { response } = error;
  console.log("user =", userType);
  const err = error.response?.data.error;
  const message = error.response?.data.message;
  if (err.isOperational && err.statusCode === 404)
    return <NotFoundPage errorMessage={message} userType={userType} />;
  console.log("Api Error", error);
};

export default APIErrorHandler;
