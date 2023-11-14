export default function SearchBar(props) {
	return (
		<div>
			<input type="search" id="inputSearch" />
			<button onClick={() => props.onSearch('ID: 1')}>Agregar</button>
		</div>
	)
}
