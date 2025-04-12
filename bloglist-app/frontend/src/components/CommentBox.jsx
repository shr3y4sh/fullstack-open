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
		onSuccess: (data) => {
			queryClient.setQueriesData(['comments'], (oldComments) =>
				oldComments.concat(data)
			);
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
	const { data, isError, error, isPending } = useQuery({
		queryKey: ['comments'],
		queryFn: async () => {
			return await getComments(id, token);
		}
	});

	if (isPending) {
		return <div>comments loading..</div>;
	}

	if (isError) {
		return (
			<div>
				<p>Error fetching comments</p>
				<p>{error.message}</p>
			</div>
		);
	}

	return (
		<>
			<h3>Comments</h3>
			<ul>
				{data.map((c) => (
					<li
						key={JSON.stringify({
							comment: c.comment,
							userId: c.addedBy
						})}>
						<div>
							{c.comment} :{' '}
							<span>
								<em>{c.username}</em>
							</span>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default CommentBox;
