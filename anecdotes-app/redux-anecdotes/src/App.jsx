import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

function App() {
	return (
		<>
			<Filter />
			<h2>Anecdotes</h2>
			<AnecdoteList />
			<Notification />
			<AnecdoteForm />
		</>
	);
}

export default App;
