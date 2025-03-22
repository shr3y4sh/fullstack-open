export default function PhoneForm({ handleFormSubmit }) {
	return (
		<>
			<h2>add a new</h2>
			<form action={handleFormSubmit}>
				<div>
					name: <input name='name' type='text' />
				</div>
				<div>
					number: <input type='text' name='number' />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	);
}
