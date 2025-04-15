const Genres = ({ books, changeGenre }) => {
	let genres = [];

	books.forEach((book) => {
		book.genres.forEach((genre) => {
			genres.push(genre);
		});
	});

	genres = [...new Set(genres)].sort();

	return genres.map((genre, idx) => (
		<button key={idx} onClick={() => changeGenre(genre)}>
			{genre}
		</button>
	));
};

export default Genres;

export function BooksTable({ books }) {
	return (
		<table>
			<tbody>
				<tr>
					<th></th>
					<th>{'     '}</th>
					<th>author</th>
					<th>published</th>
				</tr>
				{books.map((a) => (
					<tr key={a.title}>
						<td>{a.title}</td>
						<td>{'     '}</td>
						<td>{a.author.name}</td>
						<td>{a.published}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
