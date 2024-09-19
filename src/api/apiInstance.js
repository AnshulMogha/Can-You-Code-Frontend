import axios from "axios";
console.log(import.meta.env);
const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
});
export default Api;
