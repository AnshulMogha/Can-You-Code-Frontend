import Api from "./apiInstance";
async function updateTopic(topicData, tutorialId, topicId) {
  return await Api.patch(
    `tutorials/${tutorialId}/topics/${topicId}`,
    topicData,
    {
      withCredentials: true,
    }
  );
}
export default updateTopic;
