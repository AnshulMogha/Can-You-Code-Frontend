import Api from "./apiInstance";
async function createTutorial(tutorialData) {
  const data = await Api.post(`/tutorials/`, tutorialData, {
    withCredentials: true,
  });
  return data.data;
}
export default createTutorial;
