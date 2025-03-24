export default function personReducer(persons, action) {
	switch (action.type) {
		case 'get_all':
			return [...action.persons];

		case 'add_person':
			return [...persons, action.postPerson];

		case 'update_person': {
			action.person.number = action.number;
			const nextList = persons.map((p) =>
				p.id === action.person.id ? action.person : p
			);
			return nextList;
		}

		case 'delete_person': {
			const nextList = persons.filter((p) => p.id !== action.id);
			return nextList;
		}
		default:
			throw new Error('invalid action type');
	}
}
