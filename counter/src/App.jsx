import { useDispatch, useSelector } from 'react-redux';

import {
	increment,
	amountAdd
	// decrement,
	// zero
} from './features/counter/counter-slice.js';

function App() {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<>
			<button
				onClick={() => {
					dispatch(increment());
				}}>
				Counter
			</button>
			<button
				onClick={() => {
					dispatch(amountAdd(3));
				}}>
				Increment 3
			</button>{' '}
			{count}
		</>
	);
}

export default App;
