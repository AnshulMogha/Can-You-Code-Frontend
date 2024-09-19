import Api from "./apiInstance";

const getTutorial = async (tutorialIdentifier, isAdmin) => {
  const config = isAdmin ? { withCredentials: true } : {};
  const response = await Api.get(`/tutorials/${tutorialIdentifier}`, config);
  return response.data;
};

export default getTutorial;
