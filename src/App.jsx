import './App.css'
import Card from './components/Card.jsx'
import Cards from './components/Cards.jsx'
import SearchBar from './components/SearchBar.jsx'
import characters, { Rick } from './data.js'

function App() {
	return (
		<div className="App">
			<SearchBar onSearch={characterID => window.alert(characterID)} />
			<hr />
			<Cards characters={characters} />
			<hr />
			<div>
				<Card
					key={Rick.id}
					name={Rick.name}
					id={Rick.id}
					status={Rick.status}
					species={Rick.species}
					gender={Rick.gender}
					origin={Rick.origin.name}
					image={Rick.image}
					onClose={() => alert('Emulando el cierre de la Card de Rick')}
				/>
			</div>
		</div>
	)
}

export default App
