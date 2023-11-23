/* import { regexEmail, regexPassword } from "./constants" */

export default function validation(input) {
	const errors = {}
	const regexEmail = /\S+@\S+\.\S+/i
	const regexPassword = /\w+[0-9]/

	//*email
	if (!input.email) errors.email = "Enter your email"
	else {
		if (!regexEmail.test(input.email))
			errors.email = "You have to enter a valid email format!"
		if (input.email.length > 35) errors.email = "Less than 35 characters"
	}

	//*password
	if (!input.password) errors.password = "Enter your password"
	if (input.password && !regexPassword.test(input.password))
		errors.password = "It must has at least one number"
	if (input.password && input.password.length < 6)
		errors.password = "At least 6 characters"
	if (input.password && input.password.length > 10)
		errors.password = "Maximum 10 characters"

	return errors
}

/* console.log(
	validation({
		email: "peter@gmail.com",
		password: "1234567",
	}),
)

console.log("" && 1)
console.log(4 && "444")
console.log(0 && "444")
console.log(0 || "") */
