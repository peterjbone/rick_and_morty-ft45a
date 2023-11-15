import React from 'react'

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
	}

	return (
		<div>
			<input type="search" id="search" name="search" onChange={handleChange} />
			<button onClick={handleClick}>Agregar</button>
		</div>
	)
}
