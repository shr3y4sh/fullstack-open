export default function People({ persons, filter }) {
	return persons.map((person) => {
		return (
			person.name.toLowerCase().includes(filter.toLowerCase()) && (
				<div key={person.number}>
					{person.name} {person.number}
				</div>
			)
		);
	});
}
