import { regexEmail, regexPassword } from "./constants.js"

function validation(input) {
	const errors = {}

	//*email
	if (!input.email) errors.email = "Enter your email"
	else {
		if (!regexEmail.test(input.email)) errors.email = "Enter a valid email format!"
		if (input.email.length > 35)
			errors.email = "Email has to be Less than 35 characters"
	}

	//*password
	if (!input.password) errors.password = "Enter your password"
	if (input.password && !regexPassword.test(input.password))
		errors.password = "Only number are allowed"
	if (input.password && input.password.length < 6)
		errors.password = "At least 6 characters"
	if (input.password && input.password.length > 10)
		errors.password = "Maximum 10 characters"

	return errors
}

export default validation
