import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAll, updateAnecdote } from './requests';
import { setNotification } from './contexts/notification-context';
import { useNotificationDispatch } from './contexts/notification-context';

const App = () => {
	const queryClient = useQueryClient();

	const dispatch = useNotificationDispatch();

	const updateAnecdoteMutation = useMutation({
		mutationFn: updateAnecdote,

		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(
				['anecdotes'],
				anecdotes.map((anecdote) =>
					anecdote.id === updatedAnecdote.id
						? updatedAnecdote
						: anecdote
				)
			);
		}
	});

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAll,
		retry: 1
	});

	if (result.isPending) {
		return <div>Loading...</div>;
	}

	const anecdotes = result.data;

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1
		});

		setNotification(dispatch, `you voted '${anecdote.content}'`);
	};

	return (
		<>
			<h3>Anecdote app</h3>

			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
			<Notification />
		</>
	);
};

export default App;
