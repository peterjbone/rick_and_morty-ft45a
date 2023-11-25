import "./App.css"
import { useState, useEffect } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { removeFav } from "./redux/actions.js"
import { useDispatch } from "react-redux"
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
				.then(res =>res.json() )
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

	//*LOGIN
	const [access, setAccess] = useState(false)
	const EMAIL = "example@gmail.com"
	const PASSWORD = "123456"

	function login(userData) {
		if (userData.password === PASSWORD && userData.email === EMAIL) {
			setAccess(true)
			navigate("/home")
		} else {
			alert("Wrong credentials :(")
		}
	}

	//* REDIRECTION TO LOGIN OR HOME
	useEffect(() => {
		/* !access && navigate("/") */
		!access && navigate("/home")

		if (path !== "/" && path !== "/home" && path !== "/about") {
			navigate("/notFound")
		}
	}, [access])

	//*LOGIN
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
        <Route path="/" element={<Form login={login} />} />
        <Route path="/home" element= {<Cards characters={characters} onClose={onClose}  /> } />
				<Route path="/about" element={<About onSearch={onSearch} />} />
        <Route path="/detail/:id" element={<Detail onSearch={onSearch} characters={characters} logout={logout} />} />
        <Route path="/favorites" element={<Favorites onClose={ onClose } />}></Route>
				<Route path="*" element={<NotFound />} />
      </Routes>
		</div>
	)
}

export default App
