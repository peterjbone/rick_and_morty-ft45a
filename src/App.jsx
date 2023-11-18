import { useState } from 'react'
import './App.css'
import Cards from './components/cards/Cards.jsx'
import About from './components/about/About.jsx'
import Detail from './components/detail/Detail.jsx'
import NotFound from './components/notfound/NotFound.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/nav/Nav.jsx'

const URL = 'https://rickandmortyapi.com/api/character'

function App() {
	//* Ruta actual
	const path = useLocation().pathname
	//* Buscando y agregando personajes
	const [characters, setCharacters] = useState([])

	function onSearch(id) {
		//? Si hay 1 coincidencia entonces hay un repetido
		const characterId = characters.filter(char => char.id === Number(id))
		if (characterId.length) {
			return alert(`${characterId[0].name} ya existe!`)
		}

		//prettier-ignore
		//!RESPALDO
		/* 	fetch(`${URL}/${id}`)
    .then(res =>res.ok ? res.json() : { errorMsg: '¡No hay personajes con este ID!' })
    .then(character =>
      setCharacters(oldChars => [...oldChars, character]))
			.catch(fail => window.alert(fail.errorMsg)) */

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

	//*Cerrar cartas
	function onClose(id) {
		setCharacters(characters.filter(char => char.id !== Number(id)))
	}

	return (
		<div className="App">
			{path === '/' ? <Nav onSearch={onSearch} /> : null}

			{/* prettier-ignore */}
			<Routes>
        <Route path="/" element={
          characters.length > 0 ?
          <Cards characters={characters} onClose={onClose} onSearch={onSearch} /> : null} />
				<Route path="/about" element={<About onSearch={onSearch} />} />
        <Route path="/detail/:id" element={<Detail onSearch={onSearch} characters={characters} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
