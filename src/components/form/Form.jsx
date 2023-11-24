import React, { useState } from "react"
import "./Form.css"
import validation from "../../utils/validation"

export default function Form(props) {
	const { login } = props
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	})

	const [errors, setErrors] = useState({
		email: "Enter your email",
		password: "Enter your password"
	})

	function handleChange(event) {
		const { name, value } = event.target
		setUserData({
			...userData,
			[name]: value
		})
		setErrors(
			validation({
				...userData,
				[name]: value
			})
		)
	}

	function handleSubmit(event) {
		event.preventDefault()
		login(userData)
	}

	return (
		<div className="loginForm-container">
			<form className="loginForm" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						key="email"
						type="text"
						id="email"
						name="email"
						value={userData.email}
						placeholder=""
						onChange={handleChange}
					/>
					<p>{errors.email && errors.email}</p>
					<label htmlFor="email">Password:</label>
					<input
						key="password"
						type="password"
						id="password"
						name="password"
						value={userData.password}
						placeholder=""
						onChange={handleChange}
					/>
					<p>{errors.password && errors.password}</p>
					<button type="submit" disabled={errors.email || errors.password}>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}
