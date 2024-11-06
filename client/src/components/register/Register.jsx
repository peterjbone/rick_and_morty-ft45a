import styles from "./Register.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import validation from "../../utils/validation.js";

const Register = () => {
	//? info del usuario y errores
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	});

	const [errors, setErrors] = useState({
		email: "Enter your email",
		password: "Enter your password"
	});

	//? captar los inputs y manejar errores
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prev) => ({
			...prev,
			[name]: value
		}));
		setErrors(
			validation({
				...userData,
				[name]: value
			})
		);
	};

	//? register function
	const register = async (userData) => {
		const { email, password } = userData;
		const { data } = await axios.post(`${apiBackUrl}/register`, { email, password });
		const { access, detail } = data;

		if (access) {
			access && navigate("/login");
		} else if (detail === "email") {
			if (document.getElementById("notifyEmail") === null) {
				const messageEmail = document.createElement("div");
				messageEmail.id = "notifyEmail";
				messageEmail.style.display = "none";
				document
					.getElementById("email")
					.insertAdjacentElement("beforebegin", messageEmail);
			}
			const messageEmail = document.getElementById("notifyEmail");
			messageEmail.textContent = "The entered email is incorrect!";
			messageEmail.className = "error animate__backInUp";
			messageEmail.style.display = "block";

			document
				.getElementById("email")
				.classList.add("invalid", "animate__animated", "animate__shakeX");

			document.getElementById("email").addEventListener("input", (e) => {
				if ("block" === document.getElementById("notifyEmail").style.display) {
					document.getElementById("email").className = "";
					messageEmail.style.display = "none";
				}
			});
		} else if (detail === "password") {
			if (document.getElementById("notifyPassword") === null) {
				const messagePassword = document.createElement("div");
				messagePassword.id = "notifyPassword";
				messagePassword.style.display = "none";
				document
					.getElementById("password")
					.insertAdjacentElement("beforebegin", messagePassword);
			}
			const messagePassword = document.getElementById("notifyPassword");
			messagePassword.textContent = "The entered password is incorrect!";
			messagePassword.className = "error";
			messagePassword.style.display = "block";

			document
				.getElementById("password")
				.classList.add("invalid", "animate__animated", "animate__shakeX");

			document.getElementById("password").addEventListener("input", (e) => {
				if ("block" === document.getElementById("notifyPassword").style.display) {
					document.getElementById("password").className = "";
					messagePassword.style.display = "none";
				}
			});
		}
	};

	//? submit function
	function handleSubmit(e) {
		e.preventDefault();
		register(userData);
	}

	//*************************************** REGISTER COMPONENT (VIEW)
	return (
		<div className={styles.register}>
			<h2>Register</h2>
			<form className={styles.registerForm} onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						className="emailInput"
						id="email"
						type="text"
						name="email"
						placeholder="Your email here"
						value={userData.email}
						onChange={handleChange}
					/>
					<p>{errors.email && errors.email}</p>
					<label htmlFor="password">Password:</label>
					<input
						className="passwordInput"
						id="password"
						type="password"
						name="password"
						placeholder="Your password here"
						value={userData.password}
						onChange={handleChange}
					/>
					{<p>{errors.password && errors.password}</p>}
					<button
						type="submit"
						disabled={!errors.email && !errors.password ? false : true}
						className={errors.email || errors.password ? "disabled" : ""}>
						Submit
					</button>
				</div>
				<span className={styles.linkLogin}>
					You already have an account? <Link to="/login">Go to login</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
