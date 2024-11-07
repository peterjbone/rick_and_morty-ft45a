import "./App.css";
import "animate.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { saveUser } from "./redux/actions.js";
import { useDispatch } from "react-redux";
import About from "./components/about/About.jsx";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/detail/Detail.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import Form from "./components/form/Form.jsx";
import Register from "./components/register/Register.jsx";
import NotFound from "./components/notfound/NotFound.jsx";
import Nav from "./components/nav/Nav.jsx";
const apiBackUrl = import.meta.env.VITE_BACK_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const dispacth = useDispatch();
	const path = useLocation().pathname;
	const navigate = useNavigate();
	const [access, setAccess] = useState(false);

	//* onSearch function (for nav)
	const [characters, setCharacters] = useState([]);

	async function onSearch(id) {
		//? Validación para no repetir personajes
		const repeatedCharacter = characters.find((char) => char.id === Number(id));
		if (repeatedCharacter) {
			return toast.warn(`${repeatedCharacter.name} is already added!`);
		}

		//? Axios GET request using try-catch / async await
		try {
			const { data } = await axios.get(`${apiBackUrl}/character/${id}`);
			setCharacters([data, ...characters]);
		} catch (error) {
			toast.warn(
				"There are no characters with this ID!, the minimum is 1 and the maximum is 826 :)"
			);
		}
	}

	//* onClose function (for cards)
	function onClose(id) {
		setCharacters(characters.filter((char) => char.id !== Number(id)));
		//dispacth(removeFav(id));
	}

	//* login function
	//? Archivos involucrados en Frontend: App.jsx, Form.jsx, validation.js(utils)
	//? Archivos involucrados en Backend: login.js(controller)
	async function login(userData) {
		const { email, password } = userData; // from the login form
		const { data } = await axios.get(
			`${apiBackUrl}/login?email=${email}&password=${password}`
		);
		const { access, detail, userId } = data; // from the response of the backend

		if (access) {
			setAccess(access);
			localStorage.setItem("savedAccess", JSON.stringify({ access: true }));

			dispacth(saveUser(userId));
			localStorage.setItem("savedUserId", JSON.stringify({ id: userId }));

			access && navigate("/home");
			toast.success("Login successfully!", {
				autoClose: "2000"
			});
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
				if ("block" === messageEmail.style.display) {
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
				if ("block" === messagePassword.style.display) {
					document.getElementById("password").className = "";
					messagePassword.style.display = "none";
				}
			});
		}
	}

	//* Logout function
	function logout() {
		setAccess(false);
		localStorage.setItem("savedAccess", JSON.stringify({ access: false }));

		dispacth(saveUser(""));
		localStorage.removeItem("savedUserId");

		window.location.reload();
	}

	//* to redirect to login form if "access" and "savedAccess" are false
	useEffect(() => {
		const savedAccess = JSON.parse(localStorage.getItem("savedAccess"));
		!access && !savedAccess?.access && navigate("/");
	}, [access]);

	//* setting the "userId" global state every time there is a reload
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("savedUserId"));
		if (user?.id) {
			dispacth(saveUser(user?.id));
		}
	}, []);

	//*********************************** APP COMPONENT
	return (
		<div className="App">
			{/* Cuando no es / y cuando sí es cualquiera de las otras páginas, SE MOSTRARA LA NAV*/}
			{path !== "/" &&
			path !== "/register" &&
			(path === "/home" ||
				path === "/about" ||
				path.startsWith("/detail") ||
				path === "/favorites") ? (
				<Nav logout={logout} />
			) : null}

			{/* LAS RUTAS */}
			{/* prettier-ignore */}
			<Routes>
          <Route path="/" element={<Form login={ login } />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Cards characters={characters} onSearch={onSearch} onClose={onClose} />} />
          <Route path="/about" element={<About onSearch={onSearch} />} />
          <Route path="/detail/:id" element={<Detail onSearch={onSearch}  logout={logout} />} />
          <Route path="/favorites" element={<Favorites onClose={onClose} />}></Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
			<ToastContainer
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</div>
	);
}

export default App;
