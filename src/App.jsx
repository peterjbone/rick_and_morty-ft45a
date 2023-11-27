import "./App.css"
import { useState, useEffect } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { removeFav } from "./redux/actions.js"
import { useDispatch } from "react-redux"
import "animate.css"
import About from "./components/about/About.jsx"
import Cards from "./components/cards/Cards.jsx"
import Detail from "./components/detail/Detail.jsx"
import Favorites from "./components/favorites/Favorites.jsx"
import Form from "./components/form/Form.jsx"
import NotFound from "./components/notfound/NotFound.jsx"
import Nav from "./components/nav/Nav.jsx"

const URL = "https://rickandmortyapi.com/api/character"

function App() {
	const path = useLocation().pathname
	const navigate = useNavigate()
	const dispacth = useDispatch()

	//* SEARCHING AND ADDING CHARACTERS
	const [characters, setCharacters] = useState([])
	function onSearch(id) {
		//? Si hay 1 coincidencia entonces hay un repetido
		const characterId = characters.filter(char => char.id === Number(id))
		if (characterId.length) {
			return alert(`${characterId[0].name} ya existe!`)
		}
		//prettier-ignore
		fetch(`${URL}/${id}`)
      .then(res => res.json())
      .then(character => {
        if (character.name) {
          setCharacters(oldChars => [character, ...oldChars])
        } else {
          window.alert('¡No hay personajes con este ID!, el mínimo es de 1 y el máximo es el 826 :)')
        }
      })
	}

	//*CLOSE CARDS
	function onClose(id) {
		setCharacters(characters.filter(char => char.id !== Number(id)))
		dispacth(removeFav(id))
	}

	//*LOGIN SUCCESS OR LOGIN DENIED
	const [access, setAccess] = useState(false)
	const EMAIL = "example@gmail.com"
	const PASSWORD = "123456"

	function login(userData) {
		if (userData.password === PASSWORD && userData.email === EMAIL) {
			setAccess(true)
			navigate("/home")
		}

		if (userData.email !== EMAIL) {
			if (document.getElementById("notifyEmail") === null) {
				const messageEmail = document.createElement("div")
				messageEmail.id = "notifyEmail"
				messageEmail.style.display = "none"
				document
					.getElementById("email")
					.insertAdjacentElement("beforebegin", messageEmail)
			}
			const messageEmail = document.getElementById("notifyEmail")
			messageEmail.textContent = "The entered email is incorrect!"
			messageEmail.className = "error animate__backInUp"
			messageEmail.style.display = "block"

			document
				.getElementById("email")
				.classList.add("invalid", "animate__animated", "animate__shakeX")

			document.getElementById("email").addEventListener("input", e => {
				if ("block" === document.getElementById("notifyEmail").style.display) {
					document.getElementById("email").className = ""
					messageEmail.style.display = "none"
				}
			})
		}

		if (userData.password !== PASSWORD) {
			if (document.getElementById("notifyPassword") === null) {
				const messagePassword = document.createElement("div")
				messagePassword.id = "notifyPassword"
				messagePassword.style.display = "none"
				document
					.getElementById("password")
					.insertAdjacentElement("beforebegin", messagePassword)
			}
			const messagePassword = document.getElementById("notifyPassword")
			messagePassword.textContent = "The entered password is incorrect!"
			messagePassword.className = "error animate__backInUp"
			messagePassword.style.display = "block"

			document
				.getElementById("password")
				.classList.add("invalid", "animate__animated", "animate__shakeX")

			document.getElementById("password").addEventListener("input", e => {
				if (
					"block" === document.getElementById("notifyPassword").style.display
				) {
					document.getElementById("password").className = ""
					messagePassword.style.display = "none"
				}
			})
		}
	}

	//* REDIRECTION TO LOGIN OR HOME
	useEffect(() => {
		!access && navigate("/")
		/* !access && navigate("/home") */

		if (
			path !== "/" &&
			path !== "/home" &&
			path !== "/about" &&
			!path.startsWith("detail")
		) {
			navigate("/notFound")
		}
	}, [access])

	//*LOGOUT
	function logout() {
		setAccess(false)
	}

	return (
		<div className="App">
			{path !== "/" &&
			(path === "/home" ||
				path === "/about" ||
				path.startsWith("/detail") ||
				path === "/favorites") ? (
				<Nav onSearch={onSearch} characters={characters} logout={logout} />
			) : null}
			{/* prettier-ignore */}
			<Routes>
          <Route path="/" element={<Form login={ login } />} />
          <Route path="/home" element={<Cards characters={characters} onClose={onClose} />} />
          <Route path="/about" element={<About onSearch={onSearch} />} />
          <Route path="/detail/:id" element={<Detail onSearch={onSearch} characters={characters} logout={logout} />} />
          <Route path="/favorites" element={<Favorites onClose={onClose} />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
		</div>
	)
}

export default App
