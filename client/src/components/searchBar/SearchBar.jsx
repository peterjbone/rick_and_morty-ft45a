import "./SearchBar.css"
import { useState } from "react"

export default function SearchBar(props) {
	const [id, setId] = useState("")
	const handleChange = (event) => {
		const { value } = event.target
		setId(value)
	}

	const handleClick = (event) => {
		event.preventDefault()
		props.onSearch(id)
		document.getElementById("search").value = ""
		setId("")
	}

	return (
		<div className="search-bar">
			<input
				type="search"
				id="search"
				name="search"
				onChange={handleChange}
				placeholder="Enter an ID"
			/>
			<button onClick={handleClick}>Add by ID</button>
		</div>
	)
}
