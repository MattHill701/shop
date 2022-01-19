import React, { useState } from "react";
import { loginUser, loginSeller, loginAdmin } from "../api";

const Login = ({ setIsLoggedIn, setIsLoading }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [who, setWho] = useState("");
  return (
    <div className="auth-component-main-container">
      <form
        id="login"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            if (who === "" || who === "user") {
              await loginUser(userName, password);
            }
            if (who === "seller") {
              await loginSeller(userName, password);
            }
            if (who === "admin") {
              await loginAdmin(userName, password);
            }
            setIsLoggedIn(true);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <select
          onChange={(e) => {
            setWho(e.target.value);
          }}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <fieldset className="auth-component-input">
          <label htmlFor="userName">UserName: </label>
          <input
            id="userName"
            type="text"
            placeholder="Enter UserName"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          ></input>
        </fieldset>
        <fieldset className="auth-component-input">
          <label htmlFor="password">User Password: </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </fieldset>
        <button typeof="submit">login</button>
      </form>
    </div>
  );
};
export default Login;
