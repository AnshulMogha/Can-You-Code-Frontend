import Api from "./apiInstance";
async function updateTutorial(tutorialData, tutorialId) {
  return await Api.patch(`tutorials/${tutorialId}`, tutorialData, {
    withCredentials: true,
  });
}
export default updateTutorial;
