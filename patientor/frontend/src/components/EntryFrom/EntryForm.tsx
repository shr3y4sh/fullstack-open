import {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useContext,
	useRef,
	useState
} from 'react';
import {
	EntryFormType,
	EntryWithoutId,
	HealthCheckRating,
	HospitalEntry,
	OccupationalHealthcareEntry,
	Patient
} from '../../types';
import TypeDifferentiator from './TypeDiff';
import { Button } from '@mui/material';
import { DiagnoseContext } from '../../services/diagnose-context';
import patients from '../../services/patients';

type EntryFormProps = {
	type: EntryFormType;
	id: string;
	patientsState: [
		patient: Patient,
		setPatient: Dispatch<SetStateAction<Patient | undefined>>
	];
};

function EntryForm({ type, id, patientsState }: EntryFormProps) {
	const [showCodes, setShowCodes] = useState(false);

	const [codesEntry, setCodesEntry] = useState<string[]>([]);

	const healthRating = useRef<HealthCheckRating>();
	const occupation =
		useRef<
			Pick<OccupationalHealthcareEntry, 'sickLeave' | 'employerName'>
		>();
	const discharge = useRef<Pick<HospitalEntry, 'discharge'>>();

	const diagnosisCodes = useContext(DiagnoseContext);

	async function handleFromSubmit(e: SyntheticEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			description: { value: string };
			date: { value: string };
			specialist: { value: string };
		};

		const baseEntryObject: Partial<EntryWithoutId> = {
			description: target.description.value,
			date: target.date.value,
			specialist: target.specialist.value,
			diagnosisCodes: codesEntry,
			type
		};

		let finalEntry: EntryWithoutId;

		switch (type) {
			case EntryFormType.healthCheckRating:
				finalEntry = {
					...baseEntryObject,
					healthCheckRating: healthRating.current
				} as EntryWithoutId;
				break;
			case EntryFormType.occupationalHealthcare:
				finalEntry = {
					...baseEntryObject,
					employerName: occupation.current?.employerName,
					sickLeave: occupation.current?.sickLeave
				} as EntryWithoutId;
				break;
			case EntryFormType.hospital:
				finalEntry = {
					...baseEntryObject,
					discharge: discharge.current?.discharge
				} as EntryWithoutId;
				break;
		}

		if (!finalEntry) {
			return;
		}

		const response = await patients.createNewEntry(finalEntry, id);
		if (response.status >= 400) return;

		const [patient, setPatient] = patientsState;

		setPatient({
			...patient,
			entries: patient.entries.concat(response.data)
		});
	}

	return (
		<div>
			<form onSubmit={handleFromSubmit}>
				<div>
					<label htmlFor='description'>Description</label>
					<div>
						<input
							type='text'
							id='description'
							name='description'
						/>
					</div>
				</div>
				<div>
					<label htmlFor='date'>Date</label>
					<div>
						<input type='date' id='date' name='date' />
					</div>
				</div>
				<div>
					<label htmlFor='specialist'>Specialist</label>
					<div>
						<input type='text' id='specialist' name='specialist' />
					</div>
				</div>
				<div>
					<label htmlFor='diagnosisCodes'>Diagnosis Codes?</label>
					<input
						type='checkbox'
						checked={showCodes}
						onChange={() => setShowCodes((s) => !s)}
					/>
					{showCodes && (
						<>
							{diagnosisCodes.map((d) => (
								<div key={d.code}>
									<input
										type='checkbox'
										name='diagnosisCodes'
										checked={codesEntry.includes(d.code)}
										value={d.code}
										onChange={({ target }) => {
											setCodesEntry(
												codesEntry.concat(target.value)
											);
											console.log(codesEntry);
										}}
									/>
									{d.name} {'=>'} {d.code}
								</div>
							))}
						</>
					)}
				</div>

				<TypeDifferentiator
					type={type}
					healthCheck={healthRating}
					occupation={occupation}
					discharge={discharge}
				/>

				<Button type='submit' variant='contained'>
					Submit
				</Button>
			</form>
		</div>
	);
}

export default EntryForm;
