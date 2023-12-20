import "./Form.css";
import "animate.css";
import React, { useState } from "react";
import { IoKeySharp } from "react-icons/io5";
import { FaDoorClosed } from "react-icons/fa";
import validation from "../../utils/validation";

export default function Form(props) {
  //* MANAGE THE USER INPUT
  const { login } = props;

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "Enter your email",
    password: "Enter your password",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(
      validation({
        ...userData,
        [name]: value,
      })
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    login(userData);
  }

  return (
    <div className="loginForm-container">
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            key="email"
            type="text"
            id="email"
            name="email"
            value={userData.email}
            placeholder="Your email here"
            onChange={handleChange}
          />
          <p>{errors.email && errors.email}</p>
          <label htmlFor="password">Password:</label>
          <input
            key="password"
            type="password"
            id="password"
            name="password"
            value={userData.password}
            placeholder="Your password here"
            onChange={handleChange}
          />
          <p>{errors.password && errors.password}</p>
          <button
            type="submit"
            disabled={!errors.email && !errors.password ? false : true}
            className={errors.email || errors.password ? "disabled" : ""}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
