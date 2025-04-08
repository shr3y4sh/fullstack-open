import React from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			anecdotes: [],
			current: 0
		};
	}

	componentDidMount = () => {
		axios.get(BASE_URL).then((res) => {
			this.setState({ anecdotes: res.data });
		});
	};

	handleClick() {
		const current = Math.floor(Math.random() * this.state.anecdotes.length);
		this.setState({ current });
	}

	render() {
		if (this.state.anecdotes.length === 0) {
			return <div>no anecdotes...</div>;
		}

		return (
			<div>
				<h1>Anecdote of the day</h1>
				<div>{this.state.anecdotes[this.state.current].content}</div>
				<button onClick={this.handleClick}>next</button>
			</div>
		);
	}
}

export default App;
