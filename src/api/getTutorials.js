import Api from "./apiInstance";

const getTutorials = async (isAdmin) => {
  const config = isAdmin ? { withCredentials: true } : {};
  const url = isAdmin ? "/admin/tutorials" : "/tutorials";
  try {
    const response = await Api.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tutorials:", error);
    return null; // Return null or handle the error as needed
  }
};

export default getTutorials;
