import { useContext } from 'react';
import { Box } from '@mui/material';
import { LocalHospital, Healing, Masks } from '@mui/icons-material';
import { Entry, Diagnosis } from '../../../types';
import { DiagnoseContext } from '../../../services/diagnose-context';
import { HealthCheckRating } from '../../../types';

const EntryDetail = ({ entry }: { entry: Entry }) => {
	const diagnosisData = useContext(DiagnoseContext);

	const getDiagnosisData = (code: string) => {
		const data = diagnosisData.find((d) => d.code === code) as Diagnosis;

		if (!data) return null;

		return (
			<li key={data.code}>
				{data.code} {data.name}
			</li>
		);
	};

	const chooseType = (entry: Entry) => {
		switch (entry.type) {
			case 'HealthCheck':
				const display =
					Object.keys(HealthCheckRating)[entry.healthCheckRating + 4];
				return (
					<>
						<Healing />
						<div>Health check: {display}</div>
					</>
				);
			case 'OccupationalHealthcare':
				return (
					<>
						<Masks />
						<span>{entry.employerName}</span>
					</>
				);
			case 'Hospital':
				return (
					<>
						<LocalHospital />
						<div>Discharge on: {entry.discharge.date}</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<Box
			sx={{
				border: '1px black solid',
				padding: '5px 1rem',
				marginBlockEnd: '8px'
			}}>
			<div>
				<strong>{entry.date}</strong> {chooseType(entry)}
			</div>
			<div>
				<em>{entry.description}</em>
			</div>
			{entry.diagnosisCodes && (
				<ul>
					{entry.diagnosisCodes.map((code) => getDiagnosisData(code))}
				</ul>
			)}
			<div>
				<em>diagnosed by</em> {entry.specialist}
			</div>
		</Box>
	);
};

export default EntryDetail;
