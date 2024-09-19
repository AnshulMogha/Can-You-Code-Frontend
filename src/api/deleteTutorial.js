import Api from "./apiInstance";
async function deleteTutorial(tutorialId) {
  const data = await Api.delete(`/tutorials/${tutorialId}`, {
    withCredentials: true,
  });
  return data.data;
}
export default deleteTutorial;
