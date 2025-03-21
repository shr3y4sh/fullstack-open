export function Note({ notes, toggleImportance }) {
	const label = notes.important ? 'make not important' : 'make important';

	return (
		<li key={notes.id} className='note'>
			{notes.content} <button onClick={toggleImportance}>{label}</button>
		</li>
	);
}

export function NotesRender({ notes, showAll, toggleImportance }) {
	return (
		<ul>
			{notes.map((note) => {
				{
					return !showAll ? (
						note.important && (
							<Note
								key={note.id}
								notes={note}
								toggleImportance={() =>
									toggleImportance(note.id)
								}
							/>
						)
					) : (
						<Note
							key={note.id}
							notes={note}
							toggleImportance={() => toggleImportance(note.id)}
						/>
					);
				}
			})}
		</ul>
	);
}

export function NoteForm({ formSubmit }) {
	return (
		<form action={formSubmit}>
			<input type='text' name='notes' />
			<button type='submit'>save</button>
		</form>
	);
}
