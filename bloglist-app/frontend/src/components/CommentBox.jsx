import { useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getComments, postComment } from '../services/comments';

const CommentBox = ({ username, id, token }) => {
	const [comment, setComment] = useState('');

	const queryClient = useQueryClient();

	const commentMutation = useMutation({
		mutationFn: async (comment) => {
			return await postComment(comment, username, id, token);
		},
		onSuccess: () => {
			queryClient.setQueryData(['comments'], (oldComments) => {
				oldComments.concat(commentObject);
			});
		}
	});

	function handleAddComment() {
		commentMutation.mutate(comment);
		setComment('');
	}

	return (
		<div>
			<input
				type='text'
				value={comment}
				onChange={({ target }) => setComment(target.value)}
			/>
			<button onClick={handleAddComment}>comment</button>
		</div>
	);
};

export const CommentsList = ({ id, token }) => {
	const { data, isError, error } = useQuery({
		queryKey: ['comments'],
		queryFn: async () => {
			const { comment, username } = await getComments(id, token);
			return {
				comment,
				username
			};
		}
	});

	if (isError) {
		return (
			<div>
				<p>Error fetching comments</p>
				<p>{error.message}</p>
			</div>
		);
	}

	if (data.length === 0) {
		return null;
	}

	return (
		<ul>
			{data.map((c) => (
				<li key={{ comment: c.comment, userId: c.addedBy }}>
					<div>
						{c.comment}
						<span>{c.username}</span>
					</div>
				</li>
			))}
		</ul>
	);
};

export default CommentBox;
