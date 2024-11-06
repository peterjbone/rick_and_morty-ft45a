//* THIS THE LOGIN

import "./Form.css";
import React, { useState } from "react";
import validation from "../../utils/validation.js"; //? Validaciones para formularios controlados
import { Link } from "react-router-dom";

export default function Form({ login }) {
	//* Creando estados locales de datos de usuario y errores de validación
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	});

	const [errors, setErrors] = useState({
		email: "Enter your email",
		password: "Enter your password"
	});

	//* Seteando los valores de los estados-locales email y password
	//* Al mismo tiempo haciendo validaciones de ambas (formulario controlado)
	function handleChange(event) {
		const { name, value } = event.target;
		setUserData({
			...userData,
			[name]: value
		});
		setErrors(
			validation({
				...userData,
				[name]: value
			})
		);
	}

	//* Solo se ejecuta el login() y se envia el userData
	//* si no hay errores de formato en email y password
	function handleSubmit(event) {
		event.preventDefault();
		login(userData);
	}

	//***************************** FORM LOGIN COMPONENT (VIEW)
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
						className={errors.email || errors.password ? "disabled" : ""}>
						Submit
					</button>
				</div>
				<span className="linkRegister">
					You don’t have an account? <Link to="/register">Go to register</Link>
				</span>
			</form>
		</div>
	);
}
