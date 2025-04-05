import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

function App() {
	return (
		<>
			<h2>Anecdotes</h2>
			<AnecdoteList />
			<AnecdoteForm />
		</>
	);
}

export default App;
