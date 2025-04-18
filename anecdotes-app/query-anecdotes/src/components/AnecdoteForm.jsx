import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../contexts/notification-context';
import { setNotification } from '../contexts/notification-context';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();

	const dispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (anecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote));
		},
		onError: () => {
			setNotification(
				dispatch,
				'too short anecdote, must have length 5 or more'
			);
		}
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		setNotification(dispatch, `new anecdote '${content}' created`);
		newAnecdoteMutation.mutate({
			content,
			votes: 0
		});
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
