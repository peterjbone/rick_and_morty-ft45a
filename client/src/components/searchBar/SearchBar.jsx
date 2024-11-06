import "./SearchBar.css";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
	const [id, setId] = useState("");

	const handleChange = (event) => {
		const { value } = event.target;
		setId(value);
	};

	const handleClick = (event) => {
		event.preventDefault();
		onSearch(id);
		document.getElementById("search").value = "";
		setId("");
	};

	//**************************************** SEARCH COMPONENT
	return (
		<div>
			<input
				type="search"
				id="search"
				name="search"
				placeholder="Enter an ID"
				onChange={handleChange}
				value={id}
			/>
			<button onClick={handleClick}>Add by ID</button>
		</div>
	);
}
