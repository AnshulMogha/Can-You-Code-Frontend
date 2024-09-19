import Api from "./apiInstance";
async function logout() {
  return Api.get("users/logout", {
    withCredentials: true,
  });
}
export default logout;
