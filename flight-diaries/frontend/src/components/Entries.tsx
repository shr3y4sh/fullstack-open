import { NonSensitiveDiaryEntry } from '../types';

function Entries({ entries }: { entries: NonSensitiveDiaryEntry[] }) {
	return (
		<div>
			<h2>Diary Entries</h2>
			{entries.map((entry) => (
				<div key={entry.id}>
					<h3>{entry.date}</h3>
					<p>visibility: {entry.visibility}</p>
					<p>weather: {entry.weather}</p>
				</div>
			))}
		</div>
	);
}

export default Entries;
