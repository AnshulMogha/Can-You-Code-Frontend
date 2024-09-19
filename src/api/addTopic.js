import Api from "./apiInstance";

const addTopic = async (tutorialId, topic) => {
  try {
    const response = await Api.post(`/tutorials/${tutorialId}/topics`, topic, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create new topic", error);
    return null; // Return null or handle the error as needed
  }
};

export default addTopic;
