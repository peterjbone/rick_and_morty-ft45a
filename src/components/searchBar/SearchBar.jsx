import React from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
	const [id, setId] = React.useState('')

	const handleChange = event => {
		const { value } = event.target
		setId(value)
	}

	const handleClick = event => {
		event.preventDefault()
		props.onSearch(id)
		document.getElementById('search').value = ''
		setId('')
	}

	return (
		<div className="search-bar">
			<input
				type="search"
				id="search"
				name="search"
				onChange={handleChange}
				placeholder="Ingresa un ID"
			/>
			<button onClick={handleClick}>Agregar por ID</button>
		</div>
	)
}
