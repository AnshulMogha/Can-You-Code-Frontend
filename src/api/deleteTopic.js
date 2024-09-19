import Api from "./apiInstance";
async function deleteTopic(tutorialId, topicId) {
  const data = await Api.delete(`/tutorials/${tutorialId}/topics/${topicId}`, {
    withCredentials: true,
  });
  return data.data;
}
export default deleteTopic;
