import { useState } from 'react';

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	function handleGoodClick() {
		setGood(good + 1);
	}

	function handleNeutralClick() {
		setNeutral(neutral + 1);
	}

	function handleBadClick() {
		setBad(bad + 1);
	}
	return (
		<>
			<h1>give feedback</h1>
			<ReviewButton stateSetter={handleGoodClick} input={'good'} />
			<ReviewButton stateSetter={handleNeutralClick} input={'neutral'} />
			<ReviewButton stateSetter={handleBadClick} input={'bad'} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
}

function ReviewButton({ input, stateSetter }) {
	return (
		<button
			onClick={() => {
				stateSetter();
			}}>
			{input}
		</button>
	);
}

function Statistics({ good, neutral, bad }) {
	const total = good + neutral + bad;
	return (
		<>
			<h2>statistics</h2>
			{total > 0 ? (
				<table>
					<tbody>
						<StatisticLine text={'good'} value={good} />
						<StatisticLine text={'neutral'} value={neutral} />
						<StatisticLine text={'bad'} value={bad} />
						<StatisticLine text={'all'} value={total} />
						<StatisticLine
							text={'average'}
							value={roundToTwo((good - bad) / total)}
						/>
						<StatisticLine
							text={'positive'}
							value={roundToTwo((good / total) * 100)}
						/>
					</tbody>
				</table>
			) : (
				'No feedback given'
			)}
		</>
	);
}

function StatisticLine({ text, value }) {
	return (
		<tr>
			<td>{text}</td>
			<td>
				{value}
				{text === 'positive' && '%'}
			</td>
		</tr>
	);
}

function roundToTwo(number) {
	return Math.floor(number * 100) / 100;
}

export default App;
