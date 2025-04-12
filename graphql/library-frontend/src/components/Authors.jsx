/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries/queries';

const EditBirth = ({ authors, setError }) => {
	const [author, setAuthor] = useState(authors[0].name);
	const [year, setYear] = useState('');

	const [editAuthor] = useMutation(EDIT_BIRTH_YEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			const messages = error.graphQLErrors
				.map((e) => e.message)
				.join('\n');
			setError(messages);
		}
	});

	async function handleSubmit() {
		await editAuthor({
			variables: {
				name: author,
				born: Number(year)
			}
		});

		setYear('');
	}

	return (
		<>
			<h3>Set Birth year: </h3>

			<div>
				<label htmlFor='author'>Select Author</label>
				<select
					name='author'
					value={author}
					onChange={({ target }) => setAuthor(target.value)}>
					{authors.map((a) => (
						<option value={a.name} key={a.name}>
							{a.name}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor='birth-year'>Input Birth Year</label>
				<input
					type='text'
					value={year}
					onChange={({ target }) => setYear(target.value)}
					id='birth-year'
				/>
			</div>
			<div>
				<button onClick={handleSubmit}>edit</button>
			</div>
		</>
	);
};

const Authors = (props) => {
	const { loading, error, data } = useQuery(ALL_AUTHORS);

	if (!props.show) {
		return null;
	}

	if (loading) {
		return <div>loading..</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	const authors = [...data.allAuthors];
	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.booksCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div>
				<EditBirth authors={authors} setError={props.setError} />
			</div>
		</div>
	);
};

export default Authors;
