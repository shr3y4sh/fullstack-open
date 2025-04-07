/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/hooks';

const CreateNew = (props) => {
	const navigate = useNavigate();

	const content = useField('text');
	const author = useField('text');
	const info = useField('text');

	// eslint-disable-next-line no-unused-vars
	const removeReset = ({ reset, ...others }) => {
		return others;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		});
		props.showNotification(`A new anecdote "${content.value}" added`);
		navigate('/');
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...removeReset(content)} name='content' />
				</div>
				<div>
					author
					<input {...removeReset(author)} name='author' />
				</div>
				<div>
					url for more info
					<input {...removeReset(info)} name='info' />
				</div>
				<button type='submit'>create</button>
				<button
					type='button'
					onClick={() => {
						content.reset();
						author.reset();
						info.reset();
					}}>
					reset
				</button>
			</form>
		</div>
	);
};

export default CreateNew;
