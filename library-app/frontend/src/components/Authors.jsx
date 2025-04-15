/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries/queries';
import EditBirth from './EditBirthYear';

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

			{props.token && (
				<div>
					<EditBirth authors={authors} setError={props.setError} />
				</div>
			)}
		</div>
	);
};

export default Authors;
