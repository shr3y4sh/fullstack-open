export default function Filter({ filter, changeFilter }) {
	return (
		<div>
			filter shown with
			<input type='text' onChange={changeFilter} value={filter} />
		</div>
	);
}
