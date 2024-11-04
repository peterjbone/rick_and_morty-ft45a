import "./App.css";
import "animate.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { removeFav } from "./redux/actions.js";
import { useDispatch } from "react-redux";
import About from "./components/about/About.jsx";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/detail/Detail.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import Form from "./components/form/Form.jsx";
import NotFound from "./components/notfound/NotFound.jsx";
import Nav from "./components/nav/Nav.jsx";

//? Local link - Character request
const URLGetCharactersById = "http://localhost:3001/rickandmorty/character/";

function App() {
	const path = useLocation().pathname;
	const navigate = useNavigate();

	//* searching and addings characters in local state
	const [characters, setCharacters] = useState([]);

	async function onSearch(id) {
		//? Validación para no repetir personajes
		const repeatedCharacter = characters.find((char) => char.id === Number(id));
		if (repeatedCharacter) {
			return alert(`${repeatedCharacter.name} ya esta agregado/a!`);
		}

		//? Axios GET request using try-catch / async await
		try {
			const { data } = await axios.get(`${URLGetCharactersById}${id}`);
			setCharacters([data, ...characters]);
		} catch (error) {
			window.alert(
				"¡No hay personajes con este ID!, el mínimo es de 1 y el máximo es el 826 :)"
			);
		}
	}

	//* close cards handler function
	const dispacth = useDispatch();
	function onClose(id) {
		setCharacters(characters.filter((char) => char.id !== Number(id)));
		dispacth(removeFav(id));
	}

	//* login function
	//? Archivos involucrados en Frontend: App.jsx, Form.jsx, validation.js(utils)
	//? Archivos involucrados en Backend: login.js(controller)
	const [access, setAccess] = useState(false);

	async function login(userData) {
		const { email, password } = userData;
		const URLLogin = "http://localhost:3001/rickandmorty/login";
		const { data } = await axios.get(
			`${URLLogin}?email=${email}&password=${password}`
		);
		const { access, detail } = data;

		if (access) {
			setAccess(access);
			localStorage.setItem("savedAccess", JSON.stringify({ access: true }));
			access && navigate("/home");
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
	}

	//* Logout function
	function logout() {
		setAccess(false);
		localStorage.setItem("savedAccess", JSON.stringify({ access: false }));
		window.location.reload();
	}

	//* to redirect to login if "access" and "savedAccess" are false
	useEffect(() => {
		const savedAccess = JSON.parse(localStorage.getItem("savedAccess"));
		!access && !savedAccess?.access && navigate("/");
		//!access && navigate("/home");

		if (
			path !== "/" &&
			path !== "/home" &&
			path !== "/about" &&
			!path.startsWith("detail") &&
			path !== "/favorites"
		) {
			navigate("/notFound");
		}
	}, [access]);

	//*********************************** APP COMPONENT
	return (
		<div className="App">
			{/* Cuando no es / y cuando sí es cualquiera de las otras páginas, se mostrara el nav*/}
			{path !== "/" &&
			(path === "/home" ||
				path === "/about" ||
				path.startsWith("/detail") ||
				path === "/favorites") ? (
				<Nav onSearch={onSearch} characters={characters} logout={logout} />
			) : null}

			{/* LAS RUTAS */}
			{/* prettier-ignore */}
			<Routes>
          <Route path="/" element={<Form login={ login } />} />
          <Route path="/home" element={<Cards characters={characters} onClose={onClose} />} />
          <Route path="/about" element={<About onSearch={onSearch} />} />
          <Route path="/detail/:id" element={<Detail onSearch={onSearch}  logout={logout} />} />
          <Route path="/favorites" element={<Favorites onClose={onClose} />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
		</div>
	);
}

export default App;
