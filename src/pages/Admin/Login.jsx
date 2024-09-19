import { useState } from "react";
import style from "./login.module.css";
import { useQueryClient } from "@tanstack/react-query";
import login from "../../api/login";

const Login = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await login(email, password);
      queryClient.invalidateQueries({
        queryKey: ["userAuthStatus"],
        exact: true,
      });
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    }
  }

  return (
    <div className={style.main}>
      <div className={style["login-form"]}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={style["show-pass-btn"]}>
            <input
              type="checkbox"
              id="showpassword"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="showpassword">Show Password</label>
          </div>
          {error && <div className={style.error}>{error}</div>}
          <button type="submit" className={style["login-btn"]}>
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
