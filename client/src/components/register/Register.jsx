import "animate.css";
import styles from "./Register.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validation from "../../utils/validation.js";
const apiBackUrl = import.meta.env.VITE_BACK_URL;
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();

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
	};

	//? register function
	const register = async (userData) => {
		const { email, password } = userData;
		const { data } = await axios.post(`${apiBackUrl}/register`, { email, password });
		const { message } = data;
		//console.log(message);

		if (message.includes("creado")) {
			navigate("/");
			toast("The user was created!");
			toast("Now log in.");
		} else if (message.includes("existe")) {
			toast("The user already exist!");
		}

		//todo: hacer 2 notificaciones, por si el correo ya existe o por si se creo con exito (necesita logearse)
		//todo: agg una notificación
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
					<label htmlFor="registerEmail">Email:</label>
					<input
						className={styles.emailInput}
						id="registerEmail"
						type="text"
						name="email"
						placeholder="Your email here"
						value={userData.email}
						onChange={handleChange}
					/>
					<p>{errors.email && errors.email}</p>
					<label htmlFor="registerPassword">Password:</label>
					<input
						className={styles.passwordInput}
						id="registerPassword"
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
						className={
							errors.email || errors.password ? `${styles.disabled}` : undefined
						}>
						Submit
					</button>
				</div>
				<span className={styles.linkLogin}>
					You already have an account? <Link to="/">Go to login</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
