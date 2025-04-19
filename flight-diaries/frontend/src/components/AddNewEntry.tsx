import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';
import { addEntry } from '../services/diary';
import { AxiosError } from 'axios';

function AddNewEntry({
	updateEntries
}: {
	updateEntries: (res: DiaryEntry | AxiosError) => void;
}) {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState(Visibility.good);
	const [weather, setWeather] = useState(Weather.cloudy);
	const [comment, setComment] = useState('');

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const newEntry: NewDiaryEntry = {
			date,
			visibility,
			weather,
			comment
		};

		const result = await addEntry(newEntry);

		updateEntries(result);
		setDate('');
		setComment('');
		setVisibility(Visibility.great);
		setWeather(Weather.sunny);
	};

	return (
		<>
			<h2>Add New Entry</h2>
			<form onSubmit={handleSubmit}>
				<div>
					{' '}
					Date:
					<input
						type='date'
						onChange={({ target }) => setDate(target.value)}
						value={date}
					/>
				</div>
				<div>
					{' '}
					Visibility:
					{Object.values(Visibility).map((visible) => (
						<span key={visible}>
							<input
								type='radio'
								value={visible}
								name='visibility'
								onClick={() => setVisibility(visible)}
							/>
							{visible} |
						</span>
					))}
				</div>
				<div>
					{' '}
					Weather:
					{Object.values(Weather).map((w) => (
						<span key={w}>
							<input
								type='radio'
								value={w}
								name='weather'
								onClick={() => setWeather(w)}
							/>
							{w} |
						</span>
					))}
				</div>
				<div>
					{' '}
					Comment:
					<input
						onChange={({ target }) => setComment(target.value)}
						value={comment}
					/>
				</div>
				<button type='submit'>add</button>
			</form>
		</>
	);
}

export default AddNewEntry;
