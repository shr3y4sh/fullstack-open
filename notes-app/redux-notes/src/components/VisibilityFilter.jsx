import React from 'react';
import { filterChange } from '../reducers/filter-reducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = () => {
	const dispatch = useDispatch();

	return (
		<div>
			<div>
				all{' '}
				<input
					type='radio'
					name='filter'
					id='all'
					onChange={() => dispatch(filterChange('ALL'))}
				/>
			</div>
			<div>
				important{' '}
				<input
					type='radio'
					name='filter'
					id='important'
					onChange={() => dispatch(filterChange('IMPORTANT'))}
				/>
			</div>
			<div>
				not-important{' '}
				<input
					type='radio'
					name='filter'
					id='non-important'
					onChange={() => dispatch(filterChange('NOT_IMPORTANT'))}
				/>
			</div>
		</div>
	);
};

export default VisibilityFilter;
