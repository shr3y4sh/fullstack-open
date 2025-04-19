import { useState, useEffect } from 'react';
import { getEntries } from './services/diary';
import { DiaryEntry, NonSensitiveDiaryEntry, isDiaryEntry } from './types';
import Entries from './components/Entries';
import AddNewEntry from './components/AddNewEntry';
import { AxiosError } from 'axios';

function App() {
	const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
		[]
	);

	useEffect(() => {
		getEntries().then((data) => {
			setDiaryEntries(data);
		});
	}, []);

	if (diaryEntries.length === 0) {
		return <div></div>;
	}

	function updateEntries(result: DiaryEntry | AxiosError) {
		if (isDiaryEntry(result)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { comment, ...others } = result;
			setDiaryEntries(diaryEntries.concat({ ...others }));
		} else {
			console.log(result.response?.data);
		}
	}

	return (
		<div>
			<AddNewEntry updateEntries={updateEntries} />
			<Entries entries={diaryEntries} />
		</div>
	);
}

export default App;
