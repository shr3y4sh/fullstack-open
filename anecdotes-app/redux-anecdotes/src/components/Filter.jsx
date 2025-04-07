import { useSelector, useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	return (
		<input
			type='text'
			name='filter'
			value={filter}
			onChange={(e) => dispatch(filterChange(e.target.value))}
			placeholder='type to filter'
		/>
	);
};

export default Filter;
