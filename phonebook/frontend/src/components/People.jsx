export default function People({ person, onDelete }) {
	return (
		<div key={person.number}>
			{person.name} {person.number}{' '}
			<button
				onClick={() => {
					onDelete(person.id);
				}}>
				delete
			</button>
		</div>
	);
}
