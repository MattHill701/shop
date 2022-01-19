import React, { useState } from "react";
import { registerUser, registerSeller } from "../api";

const Register = ({ setIsLoggedIn, setIsLoading }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [who, setWho] = useState("");
  return (
    <div className="auth-component-main-container">
      <form
        id="register"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            if (who === "" || who === "user") {
              await registerUser(userName, password);
            }
            if (who === "seller") {
              await registerSeller(userName, password);
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
        </select>
        <fieldset className="auth-component-input">
          <label htmlFor="userName">Create Username :</label>
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
          <label htmlFor="password">Create Password :</label>
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
        <button>register</button>
      </form>
    </div>
  );
};
export default Register;
