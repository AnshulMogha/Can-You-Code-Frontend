import Api from "./apiInstance";

const getAuthStatus = async () => {
  try {
    const response = await Api.get(`/users/auth`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log("Error to fetch authSatus", error);
    throw error;
    // if (error.code === "ERR_NETWORK") throw new Error();
  }
};

export default getAuthStatus;
