import Api from "./apiInstance";
async function login(email, password) {
  return Api.post(
    "users/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
}
export default login;
