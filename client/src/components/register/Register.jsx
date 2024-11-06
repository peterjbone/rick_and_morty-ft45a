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

	//*************************************** REGISTER COMPONENT (VIEW)
	return (
		<div className={styles.register}>
			<h2>Register</h2>
			<form className={styles.registerFormContainer} onSubmit={handleSubmit}>
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
					{<p>{errors.password && errors.password}</p>}
					<button
						type="submit"
						disabled={!errors.email && !errors.password ? false : true}
						className={errors.email || errors.password ? "disabled" : ""}>
						Submit
					</button>
				</div>
				<span className="linkRegister">
					You already have an account? <Link to="/login">Go to login</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
